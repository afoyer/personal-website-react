import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * Spotify OAuth callback page
 * This page handles the OAuth redirect from Spotify and posts the authorization code
 * back to the parent window (if in iframe) or processes it directly
 */
export default function SpotifyCallback() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  useEffect(() => {
    // If opened in a popup, communicate with opener window
    if (window.opener && !window.opener.closed) {
      if (code) {
        // Send code immediately - don't delay as codes expire quickly
        window.opener.postMessage(
          {
            type: "SPOTIFY_AUTH_CODE",
            code,
          },
          window.location.origin
        );
        // Close popup after a short delay to show success message
        setTimeout(() => {
          window.close();
        }, 500);
      } else if (error) {
        window.opener.postMessage(
          {
            type: "SPOTIFY_AUTH_ERROR",
            error,
          },
          window.location.origin
        );
        // Close popup after showing error
        setTimeout(() => {
          window.close();
        }, 2000);
      }
    } else if (window.self !== window.top) {
      // If we're in an iframe (fallback), post message to parent
      if (code) {
        window.parent.postMessage(
          {
            type: "SPOTIFY_AUTH_CODE",
            code,
          },
          window.location.origin
        );
      } else if (error) {
        window.parent.postMessage(
          {
            type: "SPOTIFY_AUTH_ERROR",
            error,
          },
          window.location.origin
        );
      }
    } else {
      // If opened directly (shouldn't happen normally), redirect to home
      if (code) {
        window.location.href = `/?spotify_code=${code}`;
      } else if (error) {
        window.location.href = `/?spotify_error=${error}`;
      }
    }
  }, [code, error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        {code ? (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-700">Authenticating with Spotify...</p>
          </>
        ) : error ? (
          <>
            <p className="text-red-600 mb-4">Authentication failed</p>
            <p className="text-gray-600 text-sm">{error}</p>
          </>
        ) : (
          <p className="text-gray-600">Processing...</p>
        )}
      </div>
    </div>
  );
}
