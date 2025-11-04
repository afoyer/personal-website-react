import { useState, useEffect, useRef } from "react";
import DraggableWindow from "../draggable-window";
import {
  getSpotifyAuthUrl,
  exchangeAuthCode,
  isSpotifyAuthenticated,
  clearSpotifyTokens,
  setSpotifyToken,
} from "../../utils/spotifyApi";
import TopTracks from "./TopTracks";
import AuthScreen from "./AuthScreen";
import PlayerHeader from "./PlayerHeader";

interface SpotifyPlayerProps {
  position?: { x: number; y: number };
  clientId?: string;
  redirectUri?: string;
  zIndex?: number;
  onFocus?: () => void;
}

export default function SpotifyPlayer({
  position = { x: 0, y: 0 },
  clientId,
  redirectUri,
  zIndex,
  onFocus,
}: SpotifyPlayerProps) {
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
    if (typeof window !== "undefined" && !redirectUri) {
      console.log("Spotify redirect URI:", finalRedirectUri);
      console.log(
        "Make sure this EXACTLY matches your Spotify app settings at:"
      );
      console.log("https://developer.spotify.com/dashboard");
    }
  }, [finalRedirectUri, redirectUri]);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const popupRef = useRef<Window | null>(null);
  const processingCodeRef = useRef<string | null>(null); // Track codes being processed

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
    if (!clientId || clientId.trim() === "") {
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
      const authUrl = getSpotifyAuthUrl(finalRedirectUri, clientId);
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

  return (
    <DraggableWindow
      id="spotify-player-window"
      title="Spotify Player"
      position={position}
      width="450px"
      height="600px"
      minWidth={400}
      minHeight={500}
      zIndex={zIndex}
      onFocus={onFocus}
    >
      <div className="flex flex-col h-full bg-gradient-to-b from-green-50 to-green-100">
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
            <PlayerHeader onLogout={handleLogout} />

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
