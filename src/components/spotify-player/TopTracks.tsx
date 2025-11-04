import { useState, useEffect } from "react";
import {
  getTopTracks,
  getValidAccessToken,
  type TopTrack,
} from "../../utils/spotifyApi";

type TimeRange = "short_term" | "medium_term" | "long_term";

interface TopTracksProps {
  onTrackClick?: (track: TopTrack) => void;
}

export default function TopTracks({ onTrackClick }: TopTracksProps) {
  const [selectedTab, setSelectedTab] = useState<TimeRange>("short_term");
  const [tracks, setTracks] = useState<TopTrack[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const timeRangeLabels: Record<TimeRange, string> = {
    short_term: "Month",
    medium_term: "6 Months",
    long_term: "Year",
  };

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);
        setError(null);
        const accessToken = await getValidAccessToken();
        if (!accessToken) {
          setError("Not authenticated");
          return;
        }

        const response = await getTopTracks(accessToken, selectedTab, 50);
        setTracks(response.items);
      } catch (err) {
        console.error("Error fetching top tracks:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch top tracks"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [selectedTab]);

  const formatDuration = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-green-300 mb-2">
        {(Object.keys(timeRangeLabels) as TimeRange[]).map((range) => (
          <button
            key={range}
            onClick={() => setSelectedTab(range)}
            className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
              selectedTab === range
                ? "text-green-700 border-b-2 border-green-600 bg-green-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-green-50/50"
            }`}
          >
            {timeRangeLabels[range]}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mx-auto mb-2"></div>
              <p className="text-gray-600 text-sm">Loading tracks...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-600 text-sm text-center px-4">{error}</p>
          </div>
        ) : tracks.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600 text-sm text-center px-4">
              No tracks found
            </p>
          </div>
        ) : (
          <div className="space-y-1 pr-1">
            {tracks.map((track, index) => (
              <div
                key={track.id}
                onClick={() => onTrackClick?.(track)}
                className={`flex items-center gap-3 p-2 rounded hover:bg-green-100 transition-colors cursor-pointer ${
                  onTrackClick ? "" : "cursor-default"
                }`}
              >
                {/* Rank */}
                <span className="text-gray-500 text-xs font-medium w-6 text-center">
                  {index + 1}
                </span>

                {/* Album Art */}
                <div className="shrink-0">
                  {track.album.images && track.album.images.length > 0 ? (
                    <img
                      src={
                        track.album.images[track.album.images.length - 1]?.url
                      }
                      alt={track.album.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">🎵</span>
                    </div>
                  )}
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {track.name}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {track.artists.map((a) => a.name).join(", ")}
                  </p>
                </div>

                {/* Duration */}
                <span className="text-xs text-gray-500 shrink-0">
                  {formatDuration(track.duration_ms)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
