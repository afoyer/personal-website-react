import { atom } from "jotai";
import type { CurrentlyPlaying } from "../../utils/spotifyApi";

// Playback state atoms
export const currentlyPlayingAtom = atom<CurrentlyPlaying | null>(null);
export const isPlayingAtom = atom(false);
export const playbackProgressAtom = atom(0);

// Derived atoms
export const hasActivePlaybackAtom = atom(
  (get) => get(currentlyPlayingAtom) !== null
);

// Action atoms
export const setCurrentlyPlayingAtom = atom(
  null,
  (get, set, playing: CurrentlyPlaying | null) => {
    set(currentlyPlayingAtom, playing);
    if (playing) {
      set(isPlayingAtom, playing.is_playing);
      set(playbackProgressAtom, playing.progress_ms);
    } else {
      set(isPlayingAtom, false);
      set(playbackProgressAtom, 0);
    }
  }
);

export const setIsPlayingAtom = atom(null, (get, set, playing: boolean) => {
  set(isPlayingAtom, playing);
});

export const setPlaybackProgressAtom = atom(
  null,
  (get, set, progress: number | ((prev: number) => number)) => {
    if (typeof progress === "function") {
      const current = get(playbackProgressAtom);
      set(playbackProgressAtom, progress(current));
    } else {
      set(playbackProgressAtom, progress);
    }
  }
);

export const clearPlaybackAtom = atom(null, (get, set) => {
  set(currentlyPlayingAtom, null);
  set(isPlayingAtom, false);
  set(playbackProgressAtom, 0);
});
