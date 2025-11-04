import { motion, useMotionValue, useSpring } from "motion/react";
import { FileText, Images, List, Music } from "lucide-react";
import { RefObject, useState } from "react";

import "./nav.css";
import NavButton from "./NavButton";

interface NavProps {
  buttonRef?: RefObject<HTMLButtonElement | null>;
  onGalleryClick: () => void;
  isAllClosed: boolean;
  onSpotifyClick: () => void;
}

export default function Nav({
  buttonRef,
  onGalleryClick,
  isAllClosed,
  onSpotifyClick,
}: NavProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Track mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Apply spring animation to mouse movement for smooth following
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.div
      className="relative"
      style={{ position: "absolute" }}
      initial={{
        opacity: 1,
        top: isAllClosed ? "50%" : "auto",
        bottom: isAllClosed ? "auto" : 16,
        y: isAllClosed ? "-50%" : 0,
      }}
      animate={{
        opacity: 1,
        scale: isAllClosed ? 1.5 : 1,
        top: isAllClosed ? "50%" : "auto",
        bottom: isAllClosed ? "auto" : 16,
        y: isAllClosed ? "-50%" : 0,
      }}
      transition={{ duration: 0.4, ease: [0.1, 1, 0.3, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Backdrop layer with overflow hidden */}
      <div className="nav-backdrop-container absolute inset-0 overflow-hidden rounded-4xl pointer-events-none">
        {/* Background effect */}
        <motion.div
          className="nav-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{
            duration: 0.3,
          }}
        />

        {/* Backdrop shape */}
        <motion.div
          className="nav-backdrop-shape"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            x: springX,
            y: springY,
          }}
        />
      </div>

      {/* Content layer with overflow visible */}
      <div className="nav-container flex items-center gap-4 justify-center max-w-2xl mx-auto bg-black/30 backdrop-blur-sm rounded-4xl p-2 border border-white/10 pointer-events-auto center-x h-[50px]">
        <NavButton
          buttonRef={buttonRef}
          onClick={onGalleryClick}
          hoverBackgroundColor="rgba(120, 144, 156, 1)"
          popoverContent="Resume"
          popoverPosition="top"
        >
          <FileText className="w-5 h-5" />
        </NavButton>
        <NavButton
          buttonRef={buttonRef}
          onClick={onSpotifyClick}
          hoverBackgroundColor="rgba(0, 225, 0, 1)"
          popoverContent="Spotify"
          popoverPosition="top"
        >
          <Music className="w-5 h-5" />
        </NavButton>
        <motion.svg
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white/95 m-auto relative z-10"
          style={{ height: "1.125rem", width: "auto" }}
          viewBox="0 0 259.57 158.05"
          fill="currentColor"
        >
          <polyline points="104.42 1.11 259.57 0 225.92 29.63 136.84 29.63 136.84 69.13 179.84 69.13 157.06 98.77 137.1 98.77 137.1 157.19 104.42 157.19" />
          <path
            d="M35.55,238.22H62.12l12.09-14.68L140,200.42V81.28Zm93.08-59.11c-6.59,2.35-36.51,14.37-44.34,17-1.21.42-1.18-.47-.73-1.15l45.91-71.81c-.15.21.51.46.44,1v53.13A1.92,1.92,0,0,1,128.63,179.11Z"
            transform="translate(-35.55 -80.17)"
          />
          <polygon points="187.61 69.13 164.82 98.77 194.34 98.77 216.6 69.13 187.61 69.13" />
        </motion.svg>
        <NavButton
          buttonRef={buttonRef}
          onClick={onGalleryClick}
          hoverBackgroundColor="rgba(0, 0, 255, 1)"
          popoverContent="Photo Gallery"
          popoverPosition="top"
        >
          <Images className="w-5 h-5" />
        </NavButton>
        <NavButton
          buttonRef={buttonRef}
          onClick={onGalleryClick}
          hoverBackgroundColor="rgba(0, 0, 255, 1)"
          popoverContent="Projects"
          popoverPosition="top"
        >
          <List className="w-5 h-5" />
        </NavButton>
      </div>
    </motion.div>
  );
}
