import { useState, useEffect, useRef } from "react";
import DraggableWindow from "../../components/draggable-window";
import {
  getSpotifyClientId,
  getSpotifyAuthUrl,
  exchangeAuthCode,
  isSpotifyAuthenticated,
  clearSpotifyTokens,
  setSpotifyToken,
} from "../../utils/spotifyApi";
import { useQuery } from "@tanstack/react-query";
import TopTracks from "./TopTracks";
import AuthScreen from "./AuthScreen";
import { useAtom } from "jotai";
import {
  getWindowDimensionsAtom,
  updateWindowDimensionsAtom,
} from "../../jotai/atoms/appAtoms";

interface SpotifyPlayerProps {
  position?: { x: number; y: number };
  clientId?: string;
  redirectUri?: string;
  zIndex?: number;
  onFocus?: () => void;
  onClose: () => void;
  originPosition?: { x: number; y: number };
  initialDimensions?: { width: number; height: number };
  onDimensionChange?: (dimensions: { width: number; height: number }) => void;
  onPositionChange?: (position: { x: number; y: number }) => void;
}

export default function SpotifyWindowContent({
  position = { x: 0, y: 0 },
  redirectUri,
  zIndex,
  onFocus,
  onClose,
  originPosition,
  initialDimensions,
  onDimensionChange: externalDimensionChange,
  onPositionChange,
}: SpotifyPlayerProps) {
  // Fetch Spotify Client ID
  const {
    data: spotifyClientId,
    isLoading: isConfigLoading,
    error: configError,
  } = useQuery({
    queryKey: ["spotify-client-id"],
    queryFn: getSpotifyClientId,
    retry: 2,
  });

  // Get redirect URI from prop or default to current origin
  // IMPORTANT: This must EXACTLY match the redirect URI configured in your Spotify app
  // Go to: https://developer.spotify.com/dashboard -> Your App -> Edit Settings
  // Add redirect URI: http://localhost:5173/spotify-callback (for development)
  const defaultRedirectUri =
    typeof window !== "undefined"
      ? `${window.location.origin}/spotify-callback`
      : "/spotify-callback";
  const finalRedirectUri = redirectUri || defaultRedirectUri;

  // Log the redirect URI for debugging (helps verify it matches Spotify settings)
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Spotify redirect URI:", finalRedirectUri);
      
      // Check for insecure origin (http on non-localhost)
      const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      const isHttps = window.location.protocol === "https:";
      
      if (!isLocalhost && !isHttps) {
        console.error("CRITICAL: Spotify requires HTTPS for non-localhost domains. Your redirect URI is insecure:", finalRedirectUri);
        setError("Security Error: Spotify requires HTTPS for non-localhost domains. Please use localhost or enable HTTPS.");
      }

      if (!redirectUri) {
        console.log(
          "Make sure this EXACTLY matches your Spotify app settings at:"
        );
        console.log("https://developer.spotify.com/dashboard");
      }
    }
  }, [finalRedirectUri, redirectUri]);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const popupRef = useRef<Window | null>(null);
  const processingCodeRef = useRef<string | null>(null); // Track codes being processed

  // Get saved dimensions and updater
  const [getWindowDimensions] = useAtom(getWindowDimensionsAtom);
  const [, updateWindowDimensions] = useAtom(updateWindowDimensionsAtom);

  // Use initialDimensions (from localStorage via useDraggableWindows) if provided
  // Otherwise fall back to jotai state
  const savedDimensions =
    initialDimensions || getWindowDimensions("spotify-player-window");
  const windowWidth = savedDimensions?.width
    ? `${savedDimensions.width}px`
    : "450px";
  const windowHeight = savedDimensions?.height
    ? `${savedDimensions.height}px`
    : "600px";

  const handleDimensionChange = (dimensions: {
    width: number;
    height: number;
  }) => {
    // Call the new onDimensionChange prop if provided
    if (externalDimensionChange) {
      externalDimensionChange(dimensions);
    }

    // Also update jotai state for backward compatibility
    updateWindowDimensions({
      windowId: "spotify-player-window",
      dimensions,
    });
  };

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuth = isSpotifyAuthenticated();
        setAuthenticated(isAuth);
      } catch (err) {
        console.error("Error checking auth:", err);
        setError("Failed to check authentication status");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);
  const handleClose = () => {
    onClose?.();
  };

  // Listen for messages from OAuth popup window
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      // Verify origin for security
      if (event.origin !== window.location.origin) {
        return;
      }

      if (event.data.type === "SPOTIFY_AUTH_CODE") {
        const code = event.data.code;
        if (code) {
          // Prevent duplicate processing of the same code
          if (processingCodeRef.current === code) {
            console.log(
              "Code already being processed, ignoring duplicate message"
            );
            return;
          }

          try {
            processingCodeRef.current = code;
            setLoading(true);
            setError(null);
            // IMPORTANT: Use the EXACT redirect URI that was used in the auth request
            // This must match exactly or Spotify will reject the code
            console.log("Exchanging code with redirect URI:", finalRedirectUri);
            const tokens = await exchangeAuthCode(code, finalRedirectUri);

            // Only set authenticated state if we successfully got tokens
            if (tokens && tokens.access_token) {
              setSpotifyToken(tokens.access_token, tokens.expires_in);
              setAuthenticated(true);
              setError(null); // Clear any previous errors
              // Close popup if still open
              if (popupRef.current && !popupRef.current.closed) {
                popupRef.current.close();
              }
            } else {
              throw new Error("Invalid token response from server");
            }
          } catch (err) {
            console.error("Error exchanging code:", err);
            setError(
              err instanceof Error
                ? err.message
                : "Failed to authenticate with Spotify"
            );
            setAuthenticated(false);
          } finally {
            processingCodeRef.current = null; // Clear after processing
            setLoading(false);
          }
        }
      } else if (event.data.type === "SPOTIFY_AUTH_ERROR") {
        setError(event.data.error || "Authentication failed");
        setLoading(false);
        // Close popup if still open
        if (popupRef.current && !popupRef.current.closed) {
          popupRef.current.close();
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleLogout = () => {
    clearSpotifyTokens();
    setAuthenticated(false);
    setError(null);
  };

  // Monitor popup window closure
  useEffect(() => {
    if (!popupRef.current) return;

    const checkPopupClosed = setInterval(() => {
      if (popupRef.current && popupRef.current.closed) {
        clearInterval(checkPopupClosed);
        setLoading(false);
        popupRef.current = null;
      }
    }, 500);

    return () => {
      clearInterval(checkPopupClosed);
    };
  }, [popupRef.current]);

  const handleConnect = () => {
    if (!spotifyClientId || typeof spotifyClientId !== "string" || spotifyClientId.trim() === "") {
      setError(
        "Spotify Client ID not configured. Please check your backend configuration."
      );
      return;
    }

    try {
      // Log the redirect URI being used for auth request
      console.log(
        "Initiating Spotify auth with redirect URI:",
        finalRedirectUri
      );
      const authUrl = getSpotifyAuthUrl(finalRedirectUri, spotifyClientId);
      setError(null);
      setLoading(true);

      // Open auth in popup window (Spotify blocks iframe embedding)
      const width = 500;
      const height = 700;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const popup = window.open(
        authUrl,
        "Spotify Login",
        `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=yes,status=yes`
      );

      if (!popup) {
        setError("Popup blocked. Please allow popups for this site.");
        setLoading(false);
        return;
      }

      popupRef.current = popup;
    } catch (err) {
      console.error("Error creating auth URL:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create authentication URL"
      );
      setLoading(false);
    }
  };

  if (isConfigLoading) {
    return null;
  }

  if (configError) {
    return (
      <DraggableWindow
        id="spotify-player-window"
        title="Spotify Player"
        position={position}
        width={windowWidth}
        height={windowHeight}
        zIndex={zIndex}
        onFocus={onFocus}
        onClose={handleClose}
        initial={{ opacity: 0, scale: originPosition ? 0 : 1 }}
      >
        <div className="p-4">
          <div className="bg-red-100 text-red-700 p-4 rounded">
            <p className="font-bold">Configuration Error</p>
            <p>{configError instanceof Error ? configError.message : "Failed to load Spotify configuration"}</p>
          </div>
        </div>
      </DraggableWindow>
    );
  }

  if (!spotifyClientId || typeof spotifyClientId !== "string" || spotifyClientId.trim() === "") {
     return (
      <DraggableWindow
        id="spotify-player-window"
        title="Spotify Player"
        position={position}
        width={windowWidth}
        height={windowHeight}
        zIndex={zIndex}
        onFocus={onFocus}
        onClose={handleClose}
        initial={{ opacity: 0, scale: originPosition ? 0 : 1 }}
      >
        <div className="p-4">
          <div className="bg-red-100 text-red-700 p-4 rounded">
            <p className="font-bold">Configuration Error</p>
            <p>Invalid Spotify Client ID received from backend.</p>
          </div>
        </div>
      </DraggableWindow>
    );
  }

  return (
    <DraggableWindow
      id="spotify-player-window"
      title="Spotify Player"
      position={position}
      width={windowWidth}
      height={windowHeight}
      minWidth={400}
      minHeight={500}
      zIndex={zIndex}
      onFocus={onFocus}
      onClose={handleClose}
      onDimensionChange={handleDimensionChange}
      onPositionChange={onPositionChange}
      initial={{
        opacity: 0,
        scale: originPosition ? 0 : 1,
      }}
    >
      <div className="flex flex-col h-full bg-gradient-to-b from-green-400 to-green-200 dark:from-green-600 dark:to-green-800">
        {loading && !authenticated ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        ) : !authenticated ? (
          <AuthScreen onConnect={handleConnect} error={error} />
        ) : (
          <div className="flex flex-col h-full p-4">
            <div className="flex-1 min-h-0 mt-2">
              <TopTracks />
            </div>

            {error && (
              <div className="mt-4 p-2 bg-red-100 text-red-700 text-xs rounded">
                {error}
              </div>
            )}
          </div>
        )}
      </div>
    </DraggableWindow>
  );
}
