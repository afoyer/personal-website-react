import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import DraggableWindow from "../draggable-window";

import type { FlickrPhoto } from "../../utils/flickrApi";

interface FlickrGalleryProps {
  photos: FlickrPhoto[];
  position?: { x: number; y: number };
  zIndex?: number;
  onFocus?: () => void;
}

export default function FlickrGallery({
  photos,
  position = { x: 0, y: 0 },
  zIndex,
  onFocus,
}: FlickrGalleryProps) {
  const [numColumns, setNumColumns] = useState(2);
  const [selectedPhoto, setSelectedPhoto] = useState<FlickrPhoto | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const galleryContainer = galleryRef.current;
    if (!galleryContainer) return;

    const updateColumns = () => {
      // Get the actual width of the gallery container (accounting for padding)
      const containerWidth = galleryContainer.offsetWidth;
      const padding = 32; // 16px padding on each side (p-4 = 1rem = 16px)
      const availableWidth = containerWidth - padding;

      // Calculate optimal number of columns for masonry layout
      const minColumnWidth = 120; // Minimum width per column
      const gap = 8; // Gap between items in masonry layout

      // Calculate how many columns fit: (availableWidth + gap) / (minColumnWidth + gap)
      const calculatedColumns = Math.floor(
        (availableWidth + gap) / (minColumnWidth + gap)
      );

      // Ensure at least 1 column, and cap at a reasonable maximum (e.g., 8)
      const columns = Math.max(1, Math.min(calculatedColumns, 8));
      setNumColumns(columns);
    };

    // Initial calculation
    updateColumns();

    // Use ResizeObserver to track container size changes
    const resizeObserver = new ResizeObserver(() => {
      updateColumns();
    });

    resizeObserver.observe(galleryContainer);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;

      if (e.key === "Escape") {
        setSelectedPhoto(null);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
        const prevIndex =
          currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
        const prevPhoto = photos[prevIndex];
        if (prevPhoto) setSelectedPhoto(prevPhoto);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
        const nextIndex =
          currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
        const nextPhoto = photos[nextIndex];
        if (nextPhoto) setSelectedPhoto(nextPhoto);
      }
    };

    if (selectedPhoto) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedPhoto, photos]);

  return (
    <>
      <DraggableWindow
        id="flickr-gallery-window"
        title="Gallery"
        position={position}
        width="600px"
        height="500px"
        zIndex={zIndex}
        onFocus={onFocus}
      >
        <div
          ref={galleryRef}
          className="p-4"
          style={{
            columnCount: numColumns,
            columnGap: "8px",
            columnFill: "balance" as const,
            overflow: "visible",
            position: "relative",
          }}
          id="flickr-gallery-images"
        >
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.2,
                delayChildren: 0.02,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.4,
                overflow: "visible",
                zIndex: 1000,
                boxSizing: "border-box",
              }}
              className="group overflow-hidden rounded-lg flex items-center justify-center mb-2 break-inside-avoid"
              style={{
                transformOrigin: "center center",
                display: "inline-block",
                width: "100%",
              }}
            >
              <motion.img
                src={photo.medium}
                alt={photo.title}
                loading="lazy"
                className="w-full h-auto rounded-lg shadow-lg object-contain pointer-events-auto cursor-pointer"
                style={{
                  transformOrigin: "center center",
                }}
                onClick={() => setSelectedPhoto(photo)}
              />
            </motion.div>
          ))}
        </div>
      </DraggableWindow>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedPhoto && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-9999 bg-black/80 flex items-center justify-center p-4"
                onClick={() => setSelectedPhoto(null)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.img
                    key={selectedPhoto.id}
                    src={
                      selectedPhoto.large ||
                      selectedPhoto.original ||
                      selectedPhoto.medium
                    }
                    alt={selectedPhoto.title}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  />
                  {selectedPhoto.title && (
                    <motion.div
                      key={`title-${selectedPhoto.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: 0.1 }}
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg"
                    >
                      <p className="text-sm font-medium">
                        {selectedPhoto.title}
                      </p>
                    </motion.div>
                  )}

                  {/* Previous Button */}
                  {photos.length > 1 && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: 0.1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        const currentIndex = photos.findIndex(
                          (p) => p.id === selectedPhoto.id
                        );
                        const prevIndex =
                          currentIndex > 0
                            ? currentIndex - 1
                            : photos.length - 1;
                        const prevPhoto = photos[prevIndex];
                        if (prevPhoto) setSelectedPhoto(prevPhoto);
                      }}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-black/90 transition-colors"
                      aria-label="Previous photo"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </motion.button>
                  )}

                  {/* Next Button */}
                  {photos.length > 1 && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: 0.1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        const currentIndex = photos.findIndex(
                          (p) => p.id === selectedPhoto.id
                        );
                        const nextIndex =
                          currentIndex < photos.length - 1
                            ? currentIndex + 1
                            : 0;
                        const nextPhoto = photos[nextIndex];
                        if (nextPhoto) setSelectedPhoto(nextPhoto);
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/70 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-black/90 transition-colors"
                      aria-label="Next photo"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </motion.button>
                  )}

                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => setSelectedPhoto(null)}
                    className="absolute top-4 right-4 bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/90 transition-colors"
                    aria-label="Close modal"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
