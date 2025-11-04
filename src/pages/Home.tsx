import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { DndContext } from "@dnd-kit/core";
import { fetchFlickrPhotos } from "../utils/flickrApi";
import { useDraggableWindows } from "../hooks/useDraggableWindows";
import FlickrGallery from "../components/flickr-gallery";
import SpotifyWindow from "../components/spotify-window";
import Alert from "../components/alert";

function Home() {
  // Manage draggable window positions and z-indices
  const {
    handleDragEnd,
    getWindowPosition,
    bringWindowToFront,
    getWindowZIndex,
  } = useDraggableWindows({
    "flickr-gallery-window": { x: 0, y: 0 },
    "spotify-player-window": { x: 100, y: 100 },
  });

  // Fetch Flickr photos
  const { data, isLoading, error } = useQuery({
    queryKey: ["flickr-photos"],
    queryFn: () =>
      fetchFlickrPhotos({
        per_page: 50,
        sort: "date-posted-desc",
      }),
  });

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* Content overlay */}
      <div
        id="home-content"
        className="w-full h-screen flex flex-col items-center justify-center relative"
      >
        <motion.div
          className="max-w-2xl mx-auto bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-lg text-white/95 leading-relaxed">
            This is your home page with a dynamic Flickr gallery background. The
            photos create an immersive dark mode experience while maintaining
            excellent readability for your content.
          </p>
        </motion.div>
        {/* Render gallery as background */}
        {data && data.photos && data.photos.length > 0 && (
          <FlickrGallery
            photos={data.photos}
            position={getWindowPosition("flickr-gallery-window", {
              x: 0,
              y: 0,
            })}
            zIndex={getWindowZIndex("flickr-gallery-window")}
            onFocus={() => bringWindowToFront("flickr-gallery-window")}
          />
        )}
        {/* Render Spotify player */}
        <SpotifyWindow
          position={getWindowPosition("spotify-player-window", {
            x: 100,
            y: 100,
          })}
          zIndex={getWindowZIndex("spotify-player-window")}
          onFocus={() => bringWindowToFront("spotify-player-window")}
        />
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 pointer-events-auto">
            <span className="relative flex h-8 w-8 mb-4">
              <span className="animate-spin absolute inline-flex h-full w-full rounded-full border-4 border-solid border-white/70 border-r-transparent"></span>
            </span>
            <p className="text-white">Loading photos...</p>
          </div>
        )}

        {error && (
          <Alert title="Error loading photos" variant="error">
            <p>
              {error instanceof Error
                ? error.message
                : "An unexpected error occurred"}
            </p>
          </Alert>
        )}
      </div>
    </DndContext>
  );
}

export default Home;
