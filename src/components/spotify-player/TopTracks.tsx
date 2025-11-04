import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getTopTracks,
  getValidAccessToken,
  type TopTrack,
} from "../../utils/spotifyApi";
import { AnimatePresence, motion } from "motion/react";

type TimeRange = "short_term" | "medium_term" | "long_term";

interface TopTracksProps {
  onTrackClick?: (track: TopTrack) => void;
}

interface TrackSwatch {
  track: TopTrack;
  color: string;
  pantoneCode: string;
  albumArtUrl: string | null;
}

// Convert RGB to hex
const rgbToHex = (r: number, g: number, b: number): string => {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
};

// Extract the fetching logic into a separate function
const fetchTracksAndGenerateSwatches = async (
  timeRange: TimeRange
): Promise<TrackSwatch[]> => {
  const accessToken = await getValidAccessToken();
  if (!accessToken) {
    throw new Error("Not authenticated");
  }

  const response = await getTopTracks(accessToken, timeRange, 5);
  const top5Tracks = response.items.slice(0, 5);

  // Generate swatches for each track
  const swatchPromises = top5Tracks.map(async (track) => {
    const albumArtUrl =
      track.album.images && track.album.images.length > 0
        ? (track.album.images[0]?.url ?? null)
        : null;

    if (!albumArtUrl) {
      return {
        track,
        color: "#808080",
        pantoneCode: "N/A",
        albumArtUrl: null,
      };
    }

    try {
      // Import fast-average-color dynamically
      const { FastAverageColor } = await import("fast-average-color");
      const fac = new FastAverageColor();

      // Create image element to load the album art
      const img = new window.Image();
      img.crossOrigin = "Anonymous";
      img.src = albumArtUrl;

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
      });

      const colorResult = await fac.getColorAsync(img);
      const [r, g, b] = colorResult.value;
      const hexColor = rgbToHex(r, g, b);

      // Convert hex to Pantone
      let pantoneCode = "N/A";
      try {
        const { hex2pantone } = await import("hex2pantone");
        const result = hex2pantone(hexColor);
        if (result.match?.code) {
          // Extract numeric part (e.g., "19-4013" from "PANTONE 19-4013 TPX")
          const match = result.match.code.match(/(\d+-\d+)/);
          pantoneCode = match && match[1] ? match[1] : result.match.code;
        }
      } catch (err) {
        console.error("Error converting to Pantone:", err);
      }

      return {
        track,
        color: hexColor,
        pantoneCode,
        albumArtUrl,
      };
    } catch (err) {
      console.error("Error processing track color:", err);
      return {
        track,
        color: "#808080",
        pantoneCode: "N/A",
        albumArtUrl,
      };
    }
  });

  return Promise.all(swatchPromises);
};

export default function TopTracks({ onTrackClick }: TopTracksProps) {
  const [selectedTab, setSelectedTab] = useState<TimeRange>("short_term");

  const timeRangeLabels: Record<TimeRange, string> = {
    short_term: "Month",
    medium_term: "6 Months",
    long_term: "All Time",
  };

  // Use React Query to manage the data fetching
  const {
    data: swatches = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["topTracks", selectedTab],
    queryFn: () => fetchTracksAndGenerateSwatches(selectedTab),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Get current date for footer
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <AnimatePresence mode="wait">
      <div className="flex flex-col h-full">
        {/* Tabs */}
        <div className="flex border-b border-gray-300 mb-4">
          {(Object.keys(timeRangeLabels) as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setSelectedTab(range)}
              className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                selectedTab === range
                  ? "text-gray-900 border-b-2 border-gray-900 bg-gray-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50/50"
              }`}
            >
              {timeRangeLabels[range]}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex-1 overflow-y-auto"
        >
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600 mx-auto mb-2"></div>
                <p className="text-gray-600 text-sm">Loading tracks...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-red-600 text-sm text-center px-4">
                {error instanceof Error
                  ? error.message
                  : "Failed to fetch top tracks"}
              </p>
            </div>
          ) : swatches.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-600 text-sm text-center px-4">
                No tracks found
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{
                minHeight: "500px",
              }}
            >
              {/* Main Card */}
              <motion.div className="bg-gray-100 rounded-2xl m-4 overflow-hidden shadow-xl">
                {/* Header */}
                <div className="bg-gray-100 px-6 py-4 text-center border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 tracking-wide">
                    PANTONIFY©
                  </h2>
                </div>

                {/* Swatches */}
                <div className="divide-y divide-gray-300">
                  {swatches.map((swatch) => (
                    <div
                      key={swatch.track.id}
                      onClick={() => onTrackClick?.(swatch.track)}
                      className={`${
                        onTrackClick ? "cursor-pointer hover:opacity-95" : ""
                      } transition-opacity`}
                    >
                      {/* Color Swatch with Album Art */}
                      <div
                        className="relative h-32 overflow-hidden"
                        style={{ backgroundColor: swatch.color }}
                      >
                        {swatch.albumArtUrl && (
                          <img
                            src={swatch.albumArtUrl}
                            alt={swatch.track.album.name}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-24 h-24 object-cover opacity-50"
                          />
                        )}
                      </div>

                      {/* Text Area */}
                      <div className="bg-gray-100 px-6 py-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-1">
                              {swatch.track.artists
                                .map((a) => a.name)
                                .join(", ")
                                .toUpperCase()}
                            </p>
                            <p className="text-xs font-medium text-gray-700">
                              {swatch.pantoneCode}
                            </p>
                          </div>
                          <div className="shrink-0">
                            <p className="text-sm font-normal text-gray-900">
                              {swatch.track.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="bg-gray-100 px-6 py-3 border-t border-gray-200 flex items-center justify-between">
                  <p className="text-xs text-gray-700">
                    Made for Aymeric, {currentDate}
                  </p>
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-gray-400 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-700">AF</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
