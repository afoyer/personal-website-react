import { motion, AnimatePresence } from "motion/react";
import { ReactNode, RefObject, useState } from "react";

interface NavButtonProps {
  children: ReactNode;
  onClick?: () => void;
  buttonRef?: RefObject<HTMLButtonElement | null>;
  hoverBackgroundColor?: string;
  backgroundColor?: string;
  popoverContent?: ReactNode;
  popoverPosition?: "top" | "bottom" | "left" | "right";
  delay?: number;
  className?: string;
}

export default function NavButton({
  children,
  onClick,
  buttonRef,
  hoverBackgroundColor = "rgba(0, 0, 255, 1)",
  backgroundColor = "rgba(0, 0, 0, 0.1)",
  popoverContent,
  popoverPosition = "top",
  delay = 0.4,
  className = "",
}: NavButtonProps) {
  const [showPopover, setShowPopover] = useState(false);

  const popoverPositionStyles: Record<
    string,
    {
      bottom?: string;
      top?: string;
      left?: string;
      right?: string;
      marginBottom?: string;
      marginTop?: string;
      marginLeft?: string;
      marginRight?: string;
      translateX?: string;
      translateY?: string;
    }
  > = {
    top: {
      bottom: "100%",
      left: "50%",
      marginBottom: "8px",
      translateX: "-50%",
    },
    bottom: {
      top: "100%",
      left: "50%",
      marginTop: "8px",
      translateX: "-50%",
    },
    left: {
      right: "100%",
      top: "50%",
      marginRight: "8px",
      translateY: "-50%",
    },
    right: {
      left: "100%",
      top: "50%",
      marginLeft: "8px",
      translateY: "-50%",
    },
  };

  const arrowStyles = {
    top: {
      top: "100%",
      left: "50%",
      transform: "translateX(-50%) translateY(-50%) rotate(45deg)",
      borderRight: "1px solid rgba(255, 255, 255, 0.2)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    },
    bottom: {
      bottom: "100%",
      left: "50%",
      transform: "translateX(-50%) translateY(50%) rotate(45deg)",
      borderLeft: "1px solid rgba(255, 255, 255, 0.2)",
      borderTop: "1px solid rgba(255, 255, 255, 0.2)",
    },
    left: {
      left: "100%",
      top: "50%",
      transform: "translateX(-50%) translateY(-50%) rotate(45deg)",
      borderRight: "1px solid rgba(255, 255, 255, 0.2)",
      borderTop: "1px solid rgba(255, 255, 255, 0.2)",
    },
    right: {
      right: "100%",
      top: "50%",
      transform: "translateX(50%) translateY(-50%) rotate(45deg)",
      borderLeft: "1px solid rgba(255, 255, 255, 0.2)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    },
  };

  const position = popoverPositionStyles[popoverPosition];
  const arrow = arrowStyles[popoverPosition];

  // Build transform string
  const transforms = [];
  if (position?.translateX)
    transforms.push(`translateX(${position.translateX})`);
  if (position?.translateY)
    transforms.push(`translateY(${position.translateY})`);
  const transformString =
    transforms.length > 0 ? transforms.join(" ") : undefined;

  return (
    <div className="relative inline-block">
      <motion.button
        ref={buttonRef}
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-4xl border border-white/20 text-white transition-all duration-200 relative z-10 ${className}`}
        whileHover={{
          scale: 1.05,
          backgroundColor: hoverBackgroundColor,
        }}
        animate={{
          backgroundColor: backgroundColor,
          opacity: 1,
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.2, delay }}
        onMouseEnter={() => setShowPopover(true)}
        onMouseLeave={() => setShowPopover(false)}
      >
        {children}
      </motion.button>

      {/* Popover */}
      <AnimatePresence>
        {showPopover && popoverContent && (
          <motion.div
            className="absolute z-50 px-3 py-2 bg-black/90 backdrop-blur-md border border-white/20 rounded-lg text-white text-sm whitespace-nowrap pointer-events-none"
            style={{
              ...position,
              transform: transformString,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            {popoverContent}
            {/* Arrow */}
            <div className="absolute w-2 h-2 bg-black/90" style={arrow} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
