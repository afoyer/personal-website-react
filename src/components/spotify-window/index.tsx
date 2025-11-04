import { useQuery } from "@tanstack/react-query";
import { getSpotifyClientId } from "../../utils/spotifyApi";
import SpotifyPlayer from "../spotify-player";
import Alert from "../alert";

interface SpotifyWindowProps {
  position: { x: number; y: number };
  zIndex?: number;
  onFocus?: () => void;
}

/**
 * Container component that handles Spotify authentication setup
 * and renders the Spotify player when ready
 */
export default function SpotifyWindow({
  position,
  zIndex,
  onFocus,
}: SpotifyWindowProps) {
  const {
    data: spotifyClientId,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["spotify-client-id"],
    queryFn: getSpotifyClientId,
    retry: 2,
  });

  if (isLoading) {
    // Don't render anything while loading - keeps UI clean
    return null;
  }

  if (error) {
    return (
      <Alert title="Spotify configuration error" variant="error">
        <p>
          {error instanceof Error
            ? error.message
            : "Failed to load Spotify configuration"}
        </p>
      </Alert>
    );
  }

  if (
    !spotifyClientId ||
    typeof spotifyClientId !== "string" ||
    spotifyClientId.trim() === ""
  ) {
    return (
      <Alert title="Spotify configuration error" variant="error">
        <p>
          Invalid Spotify Client ID received from backend. Please check your
          Amplify secrets configuration.
        </p>
      </Alert>
    );
  }

  return (
    <SpotifyPlayer
      position={position}
      clientId={spotifyClientId}
      zIndex={zIndex}
      onFocus={onFocus}
    />
  );
}
