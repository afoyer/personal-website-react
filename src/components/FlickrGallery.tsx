import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import type { FlickrPhoto } from "../utils/flickrApi";

interface FlickrGalleryProps {
  photos: FlickrPhoto[];
}

interface PhotoWithDimensions extends FlickrPhoto {
  aspectRatio?: number;
  width?: number;
  height?: number;
}

export default function FlickrGallery({ photos }: FlickrGalleryProps) {
  return (
    <motion.div
      className="inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {photos.map((photo) => (
        <img
          key={photo.id}
          src={photo.medium}
          alt={photo.title}
          loading="lazy"
          className="pointer-events-auto object-contain max-w-full max-h-full absolute m-auto inset-0 rounded-lg"
        />
      ))}
    </motion.div>
  );
}
