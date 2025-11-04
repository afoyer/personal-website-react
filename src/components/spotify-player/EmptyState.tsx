import { Play } from "lucide-react";

interface EmptyStateProps {
  onPlay: () => void;
}

export default function EmptyState({ onPlay }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <p className="text-gray-600 mb-4">No track currently playing</p>
      <button
        onClick={onPlay}
        className="p-3 rounded-full bg-green-600 hover:bg-green-700 text-white transition-colors"
        title="Play"
      >
        <Play className="w-6 h-6" />
      </button>
    </div>
  );
}
