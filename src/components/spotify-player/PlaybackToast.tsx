import { useState } from "react";
import { ChevronDown, ChevronUp, Play, Pause } from "lucide-react";
import { type CurrentlyPlaying } from "../../utils/spotifyApi";
import TrackInfo from "./TrackInfo";
import ProgressBar from "./ProgressBar";
import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface PlaybackToastProps {
  currentlyPlaying: CurrentlyPlaying | null;
  isPlaying: boolean;
  progress: number;
  onPlayPause: () => void;
}

export default function PlaybackToast({
  currentlyPlaying,
  isPlaying,
  progress,
  onPlayPause,
}: PlaybackToastProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  // Only load FastAverageColor client-side
  const [avgColor, setAvgColor] = useState<string | undefined>(undefined);

  // Extract average color from album art image URL whenever it changes
  React.useEffect(() => {
    let cancelled = false;
    async function getAverage() {
      if (!currentlyPlaying?.item.album.images[0]?.url) return;
      let FastAverageColor;
      try {
        FastAverageColor = (await import("fast-average-color"))
          .FastAverageColor;
      } catch (e) {
        return;
      }
      const fac = new FastAverageColor();
      // Create a new <img> so fastaveragecolor can read cross-origin images
      const img = new window.Image();
      img.crossOrigin = "Anonymous";
      img.src = currentlyPlaying.item.album.images[0].url;
      img.onload = async () => {
        if (cancelled) return;
        try {
          const color = await fac.getColorAsync(img);
          // Slightly fade/blurr the color for a subtle bg (low alpha)
          setAvgColor(
            `rgba(${color.value[0]},${color.value[1]},${color.value[2]},0.7)`
          );
        } catch {
          setAvgColor(undefined);
        }
      };
      img.onerror = () => setAvgColor(undefined);
    }
    getAverage();
    return () => {
      cancelled = true;
    };
  }, [currentlyPlaying?.item.album.images[0]?.url]);

  if (!currentlyPlaying) {
    return null;
  }

  const progressPercentage = currentlyPlaying
    ? (progress / currentlyPlaying.item.duration_ms) * 100
    : 0;
  // Use fastaveragecolor to get the average color of the album art image,
  // then set the background color of the toast to a blurred/faded version of that color.

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden"
      layout
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            layoutId="toast-content"
            animate={{ backgroundColor: avgColor ?? "transparent" }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
              backgroundColor: { duration: 0.3 },
            }}
            className="p-4 backdrop-blur-sm overflow-hidden"
          >
            {/* Header with collapse button */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-between items-center mb-3"
            >
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Now Playing
              </h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 rounded hover:bg-green-200 transition-colors"
                aria-label="Collapse"
              >
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
            </motion.div>

            {/* Album Art - smaller in toast */}
            <div className="flex justify-center mb-3">
              <motion.img
                layoutId="album-art"
                src={currentlyPlaying.item.album.images[0]?.url || ""}
                alt={currentlyPlaying.item.album.name}
                className="w-24 h-24 rounded-lg shadow-md object-cover"
                transition={{
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </div>

            {/* Track Info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TrackInfo
                trackName={currentlyPlaying.item.name}
                artists={currentlyPlaying.item.artists.map((a) => a.name)}
                albumName={currentlyPlaying.item.album.name}
              />
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProgressBar
                currentTime={progress}
                duration={currentlyPlaying.item.duration_ms}
                progressPercentage={progressPercentage}
              />
            </motion.div>

            {/* Play/Pause Button */}
            <div className="flex justify-center mt-3">
              <motion.button
                layoutId="playback-button"
                onClick={onPlayPause}
                className="p-2 rounded-full bg-green-600 hover:bg-green-700 text-white transition-colors"
                title={isPlaying ? "Pause" : "Play"}
                transition={{
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            layoutId="toast-content"
            animate={{ backgroundColor: avgColor ?? "transparent" }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
              backgroundColor: { duration: 0.3 },
            }}
            className="p-3 cursor-pointer backdrop-blur-sm"
            onClick={() => setIsExpanded(true)}
          >
            <div className="flex items-center gap-3">
              {/* Small album art */}
              <motion.img
                layoutId="album-art"
                src={currentlyPlaying.item.album.images[0]?.url || ""}
                alt={currentlyPlaying.item.album.name}
                className="w-12 h-12 rounded object-cover shrink-0"
                transition={{
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />

              {/* Track info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {currentlyPlaying.item.name}
                </p>
                <p className="text-xs text-gray-600 truncate">
                  {currentlyPlaying.item.artists.map((a) => a.name).join(", ")}
                </p>
              </div>

              {/* Play/Pause and expand button */}
              <div className="flex items-center gap-2">
                <motion.button
                  layoutId="playback-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayPause();
                  }}
                  className="p-1.5 rounded-full bg-green-600 hover:bg-green-700 text-white transition-colors"
                  title={isPlaying ? "Pause" : "Play"}
                  transition={{
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5" />
                  )}
                </motion.button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(true);
                  }}
                  className="p-1 rounded hover:bg-green-200 transition-colors"
                  aria-label="Expand"
                >
                  <ChevronUp className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
