import { motion, useMotionValue, useSpring } from "motion/react";
import { FileText, Images, List, Music } from "lucide-react";
import { RefObject, useState } from "react";
import { useAtom } from "jotai";
import { toggleThemeAtom } from "../../jotai/atoms/appAtoms";

import "./nav.css";
import NavButton from "./NavButton";
import NavFan, { NavFanItem } from "./nav-fan";
import { WindowKey } from "../../pages/Home";

interface NavProps {
  buttonRef?: RefObject<HTMLButtonElement | null>;
  openWindow: (window: WindowKey) => void;
  isAllClosed: boolean;
}

export default function Nav({ buttonRef, isAllClosed, openWindow }: NavProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [, toggleTheme] = useAtom(toggleThemeAtom);

  // Track mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Apply spring animation to mouse movement for smooth following
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Projects menu items
  const projectItems: NavFanItem[] = [
    {
      id: "amazon",
      label: "Amazon",
      onClick: () => openWindow("amazon-window"),
    },
    {
      id: "light-drawing",
      label: "Light Drawing",
      onClick: () => openWindow("light-window"),
    },
    {
      id: "radiosity",
      label: "Radiosity",
      onClick: () => openWindow("radiosity-window"),
    },
    {
      id: "pantonify",
      label: "Pantonify",
      onClick: () => openWindow("pantonify-window"),
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.div
      className="relative center-x"
      style={{
        position: "absolute",
        top: 0,
        zIndex: 1000,
      }}
      initial={{
        opacity: 1,
        y: "calc(50vh - 50%)",
        scale: 1.5,
      }}
      animate={{
        opacity: 1,
        scale: isAllClosed ? 1.5 : 1,
        y: isAllClosed ? "calc(50vh - 50%)" : "calc(100vh - 66px)",
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
      <div className="nav-container flex items-center gap-3 sm:gap-4 md:gap-5 justify-center max-w-2xl mx-auto bg-black/30 backdrop-blur-sm rounded-4xl p-2 border border-white/10 pointer-events-auto center-x h-[50px]">
        <NavButton
          buttonRef={buttonRef}
          onClick={() => openWindow("resume-window")}
          hoverBackgroundColor="rgba(120, 144, 156, 0.6)"
          popoverContent="Resume"
          popoverPosition="top"
        >
          <FileText className="w-5 h-5" />
        </NavButton>
        <NavButton
          buttonRef={buttonRef}
          onClick={() => openWindow("spotify-player-window")}
          hoverBackgroundColor="rgba(0, 225, 0, 0.6)"
          popoverContent="Spotify"
          popoverPosition="top"
        >
          <Music className="w-5 h-5" />
        </NavButton>
        <motion.svg
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white/95 m-auto relative z-10 cursor-pointer"
          style={{ height: "1.125rem", width: "auto" }}
          viewBox="0 0 259.57 158.05"
          fill="currentColor"
          onClick={() => toggleTheme()}
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
          onClick={() => openWindow("flickr-gallery-window")}
          hoverBackgroundColor="rgba(0, 0, 255, 0.6)"
          popoverContent="Photo Gallery"
          popoverPosition="top"
        >
          <Images className="w-5 h-5" />
        </NavButton>
        <NavFan
          items={projectItems}
          direction="right"
          hoverBackgroundColor="rgba(251, 192, 45, 0.6)"
          radius={100}
          maxArcAngle={45}
          isNavAtBottom={!isAllClosed}
        >
          <List className="w-5 h-5" />
        </NavFan>
      </div>
    </motion.div>
  );
}
