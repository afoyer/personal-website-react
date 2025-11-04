import { Play, Pause, SkipForward, SkipBack } from "lucide-react";

interface PlaybackControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onSkipNext: () => void;
  onSkipPrevious: () => void;
}

export default function PlaybackControls({
  isPlaying,
  onPlayPause,
  onSkipNext,
  onSkipPrevious,
}: PlaybackControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={onSkipPrevious}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        title="Previous track"
      >
        <SkipBack className="w-5 h-5 text-gray-700" />
      </button>
      <button
        onClick={onPlayPause}
        className="p-3 rounded-full bg-green-600 hover:bg-green-700 text-white transition-colors"
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6" />
        ) : (
          <Play className="w-6 h-6" />
        )}
      </button>
      <button
        onClick={onSkipNext}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        title="Next track"
      >
        <SkipForward className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
}

