import { useSpotifyPlayback } from "../../hooks/useSpotifyPlayback";
import PlaybackToast from "./PlaybackToast";
import { getValidAccessToken, controlPlayback } from "../../utils/spotifyApi";

export default function PlaybackToastContainer() {
  const { currentlyPlaying, isPlaying, progress, setIsPlaying } =
    useSpotifyPlayback();

  const handlePlayPause = async () => {
    try {
      const accessToken = await getValidAccessToken();
      if (!accessToken) return;

      const action = isPlaying ? "pause" : "play";
      await controlPlayback(accessToken, action);
      setIsPlaying(!isPlaying);
    } catch (err) {
      console.error("Error controlling playback:", err);
    }
  };

  return (
    <PlaybackToast
      currentlyPlaying={currentlyPlaying}
      isPlaying={isPlaying}
      progress={progress}
      onPlayPause={handlePlayPause}
    />
  );
}
