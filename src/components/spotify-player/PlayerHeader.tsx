import { LogOut } from "lucide-react";

interface PlayerHeaderProps {
  onLogout: () => void;
}

export default function PlayerHeader({ onLogout }: PlayerHeaderProps) {
  return (
    <div className="flex justify-end mb-2">
      <button
        onClick={onLogout}
        className="text-gray-600 hover:text-gray-800 transition-colors"
        title="Disconnect Spotify"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
}
