import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import DraggableWindow from "../../components/draggable-window";
import PhotoModal from "./PhotoModal";
import { useFlickrGallery } from "../../jotai/hooks";
import { fetchFlickrPhotos } from "../../utils/flickrApi";
import { useAtom } from "jotai";
import {
  getWindowDimensionsAtom,
  updateWindowDimensionsAtom,
} from "../../jotai/atoms/appAtoms";

import type { FlickrPhoto } from "../../utils/flickrApi";
import { Images } from "lucide-react";
import Spinner from "../../components/spinner";

interface FlickrGalleryProps {
  position: { x: number; y: number };
  zIndex?: number;
  onFocus?: () => void;
  onClose?: () => void;
  originPosition?: { x: number; y: number } | null;
  initialDimensions?: { width: number; height: number };
  onDimensionChange?: (dimensions: { width: number; height: number }) => void;
}

export default function FlickrGallery({
  position,
  zIndex,
  onFocus,
  onClose,
  originPosition,
  initialDimensions,
  onDimensionChange,
}: FlickrGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<FlickrPhoto | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);
  const [shouldAnimatePhotos, setShouldAnimatePhotos] = useState(true);

  const { setFlickrError, setFlickrHasGallery } = useFlickrGallery();

  // Get saved dimensions and updater
  const [getWindowDimensions] = useAtom(getWindowDimensionsAtom);
  const [, updateWindowDimensions] = useAtom(updateWindowDimensionsAtom);

  // Use initialDimensions (from localStorage via useDraggableWindows) if provided
  // Otherwise fall back to jotai state
  const savedDimensions =
    initialDimensions || getWindowDimensions("flickr-gallery-window");
  const windowWidth = savedDimensions?.width
    ? `${savedDimensions.width}px`
    : "600px";
  const windowHeight = savedDimensions?.height
    ? `${savedDimensions.height}px`
    : "500px";

  const handleDimensionChange = (dimensions: {
    width: number;
    height: number;
  }) => {
    // Call the new onDimensionChange prop if provided
    if (onDimensionChange) {
      onDimensionChange(dimensions);
    }

    // Also update jotai state for backward compatibility
    updateWindowDimensions({
      windowId: "flickr-gallery-window",
      dimensions,
    });
  };

  // Fetch Flickr photos with infinite scrolling
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["flickr-photos"],
    queryFn: ({ pageParam = 1 }) =>
      fetchFlickrPhotos({
        per_page: 50,
        sort: "date-posted-desc",
        page: pageParam,
      }),
    getNextPageParam: (lastPage) => {
      // Return the next page number if there are more pages
      if (lastPage.page < lastPage.pages) {
        return lastPage.page + 1;
      }
      return undefined; // No more pages
    },
    initialPageParam: 1,
  });

  // Flatten all pages into a single array of photos
  const photos = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page.photos);
  }, [data]);

  // Check if data is already cached on mount (don't animate if so)
  useEffect(() => {
    if (!isLoading && photos.length > 0) {
      setShouldAnimatePhotos(false);
    }
  }, []); // Run only on mount

  // Update atoms when error or data changes
  useEffect(() => {
    if (error) {
      setFlickrError(
        error instanceof Error ? error : new Error("Failed to load photos")
      );
      setFlickrHasGallery(false);
    } else if (photos.length > 0) {
      setFlickrError(null);
      setFlickrHasGallery(true);
    } else if (!isLoading) {
      setFlickrHasGallery(false);
    }
  }, [error, photos.length, isLoading, setFlickrError, setFlickrHasGallery]);

  // Intersection Observer for infinite scrolling
  useEffect(() => {
    const observerElement = observerRef.current;
    if (!observerElement) return;

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "400px",
      }
    );

    intersectionObserver.observe(observerElement);

    return () => {
      intersectionObserver.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleClose = () => {
    onClose?.();
  };

  return (
    <>
      <AnimatePresence>
        <DraggableWindow
          id="flickr-gallery-window"
          title={
            <div className="flex items-center gap-2">
              Gallery <Images className="w-4 h-4" />
            </div>
          }
          position={position}
          width={windowWidth}
          height={windowHeight}
          zIndex={zIndex}
          onFocus={onFocus}
          onDimensionChange={handleDimensionChange}
          initial={{
            opacity: 0,
            scale: originPosition ? 0 : 1,
          }}
          onClose={handleClose}
        >
          <motion.div
            ref={galleryRef}
            className="pb-20 sm:pb-6 px-4 grid gap-2"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            }}
            id="flickr-gallery-images"
            transition={{ duration: 0.2, delayChildren: 0.2 }}
          >
            {/* Initial loading state */}
            {isLoading && (
              <div
                className="flex flex-col items-center justify-center py-20"
                style={{ gridColumn: "1 / -1" }}
              >
                <Spinner label="Loading photos..." />
              </div>
            )}

            {/* Error state */}
            {error && (
              <div
                className="flex flex-col items-center justify-center py-20"
                style={{ gridColumn: "1 / -1" }}
              >
                <p className="text-red-400 mb-2">Error loading photos</p>
                <p className="text-white/70 text-sm">
                  {error instanceof Error
                    ? error.message
                    : "An unexpected error occurred"}
                </p>
              </div>
            )}

            {/* Photos grid */}
            {!error &&
              photos.map((photo) => (
                <motion.div
                  key={photo.id}
                  initial={
                    shouldAnimatePhotos ? { opacity: 0, scale: 0.8 } : false
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.05,
                    zIndex: 10,
                  }}
                  className="overflow-hidden rounded-lg cursor-pointer aspect-square"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    src={photo.medium}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full rounded-lg shadow-lg object-cover"
                  />
                </motion.div>
              ))}

            {/* Intersection observer target - positioned at the end of the list */}
            {hasNextPage && (
              <div
                ref={observerRef}
                className="h-5"
                style={{ gridColumn: "1 / -1" }}
              />
            )}

            {/* Loading indicator */}
            {isFetchingNextPage && (
              <div
                className="flex justify-center p-4"
                style={{ gridColumn: "1 / -1" }}
              >
                <Spinner label="Loading more photos..." />
              </div>
            )}
          </motion.div>
        </DraggableWindow>
      </AnimatePresence>

      <PhotoModal
        selectedPhoto={selectedPhoto}
        photos={photos}
        onClose={() => setSelectedPhoto(null)}
        onNavigate={setSelectedPhoto}
      />
    </>
  );
}
