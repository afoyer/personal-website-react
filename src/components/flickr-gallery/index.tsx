import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import DraggableWindow from "../draggable-window";
import PhotoModal from "./PhotoModal";
import { useFlickrGallery } from "../../jotai/hooks";
import { fetchFlickrPhotos } from "../../utils/flickrApi";

import type { FlickrPhoto } from "../../utils/flickrApi";
import { Images } from "lucide-react";

interface FlickrGalleryProps {
  position: { x: number; y: number };
  zIndex?: number;
  onFocus?: () => void;
  onClose?: () => void;
  originPosition?: { x: number; y: number } | null;
}

export default function FlickrGallery({
  position,
  zIndex,
  onFocus,
  onClose,
  originPosition,
}: FlickrGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<FlickrPhoto | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);

  const { setFlickrError, setFlickrHasGallery } = useFlickrGallery();

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
    const observer = observerRef.current;
    if (!observer || !hasNextPage || isFetchingNextPage) return;

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        // When the observer element is visible and we have more pages
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null, // Use viewport as root
        rootMargin: "100px", // Trigger 100px before reaching the bottom
        threshold: 0.1,
      }
    );

    intersectionObserver.observe(observer);

    return () => {
      intersectionObserver.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

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
          width="600px"
          height="500px"
          zIndex={zIndex}
          onFocus={onFocus}
          initial={{
            opacity: 0,
            scale: originPosition ? 0 : 1,
          }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClose={handleClose}
        >
          <motion.div
            ref={galleryRef}
            className="p-4 flex flex-wrap gap-2"
            id="flickr-gallery-images"
            transition={{ duration: 0.2, delayChildren: 0.2 }}
          >
            {/* Initial loading state */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20 w-full">
                <span className="relative flex h-8 w-8 mb-4">
                  <span className="animate-spin absolute inline-flex h-full w-full rounded-full border-4 border-solid border-black/70 border-r-transparent"></span>
                </span>
                <p className="text-black">Loading photos...</p>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="flex flex-col items-center justify-center py-20">
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
                  initial={{ opacity: 0, scale: 0.8 }}
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
                  className="overflow-hidden rounded-lg cursor-pointer"
                  style={{
                    flex: "0 0 auto",
                    width: "calc(33.333% - 0.5rem)",
                    minWidth: "150px",
                    aspectRatio: "1",
                  }}
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
            {hasNextPage && <div ref={observerRef} className="w-full h-5" />}

            {/* Loading indicator */}
            {isFetchingNextPage && (
              <div className="w-full flex justify-center p-4">
                <span className="relative flex h-6 w-6">
                  <span className="animate-spin absolute inline-flex h-full w-full rounded-full border-2 border-solid border-black/70 border-r-transparent"></span>
                </span>
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
