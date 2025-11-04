import { useEffect, useRef } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  getCurrentlyPlaying,
  getValidAccessToken,
  clearSpotifyTokens,
  isSpotifyAuthenticated,
} from "../utils/spotifyApi";
import {
  currentlyPlayingAtom,
  isPlayingAtom,
  playbackProgressAtom,
  setCurrentlyPlayingAtom,
  setIsPlayingAtom,
  setPlaybackProgressAtom,
} from "../jotai/atoms/playbackAtoms";

export function useSpotifyPlayback() {
  const currentlyPlaying = useAtomValue(currentlyPlayingAtom);
  const isPlaying = useAtomValue(isPlayingAtom);
  const progress = useAtomValue(playbackProgressAtom);
  const setCurrentlyPlaying = useSetAtom(setCurrentlyPlayingAtom);
  const setIsPlaying = useSetAtom(setIsPlayingAtom);
  const setProgress = useSetAtom(setPlaybackProgressAtom);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchCurrentlyPlaying = async () => {
    try {
      const accessToken = await getValidAccessToken();
      if (!accessToken) {
        return;
      }

      const playing = await getCurrentlyPlaying(accessToken);
      setCurrentlyPlaying(playing);
    } catch (err) {
      console.error("Error fetching currently playing:", err);
      // If token is invalid, clear auth
      if (err instanceof Error && err.message.includes("401")) {
        clearSpotifyTokens();
      }
    }
  };

  useEffect(() => {
    const isAuth = isSpotifyAuthenticated();
    if (!isAuth) {
      return;
    }

    // Initial fetch
    fetchCurrentlyPlaying();

    // Poll every 3 seconds
    pollIntervalRef.current = setInterval(fetchCurrentlyPlaying, 3000);

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    };
  }, []);

  // Update progress every second while playing
  useEffect(() => {
    if (!isPlaying || !currentlyPlaying) {
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1000;
        // Don't exceed track duration
        return Math.min(newProgress, currentlyPlaying.item.duration_ms);
      });
    }, 1000);

    return () => {
      clearInterval(progressInterval);
    };
  }, [isPlaying, currentlyPlaying, setProgress]);

  return {
    currentlyPlaying,
    isPlaying,
    progress,
    setIsPlaying,
    fetchCurrentlyPlaying,
  };
}
