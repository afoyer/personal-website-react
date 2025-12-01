import { ReactNode, useState, useRef, useEffect } from "react";
import { TriggerButton } from "./TriggerButton";
import { ArcMenu } from "./ArcMenu";
import { HorizontalMenu } from "./HorizontalMenu";
import { FullScreenMenu } from "./FullScreenMenu";
import { calculateArcMenuPosition, calculateFullScreenPosition } from "./utils";

// Export types for external use
export interface NavFanItem {
  id: string;
  label: React.ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  hoverBackgroundColor?: string;
}

interface NavFanProps {
  children: ReactNode;
  items: NavFanItem[];
  direction?: "left" | "right";
  hoverBackgroundColor?: string;
  backgroundColor?: string;
  radius?: number;
  maxArcAngle?: number;
  delay?: number;
  className?: string;
  isNavAtBottom?: boolean;
}

export default function NavFan({
  children,
  items,
  direction = "right",
  hoverBackgroundColor = "rgba(0, 0, 255, 1)",
  backgroundColor = "rgba(0, 0, 0, 0.1)",
  radius = 120,
  maxArcAngle = 60,
  delay = 0.1,
  className = "",
  isNavAtBottom = false,
}: NavFanProps) {
  const [showFan, setShowFan] = useState(false);
  const [useFullScreen, setUseFullScreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if there's enough space for hover menu on the right
  useEffect(() => {
    const checkSpace = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const spaceNeeded = radius + 200; // radius + button width + some padding
      const spaceAvailable = window.innerWidth - rect.right;

      setUseFullScreen(spaceAvailable < spaceNeeded);
    };

    checkSpace();
    window.addEventListener("resize", checkSpace);
    return () => window.removeEventListener("resize", checkSpace);
  }, [radius]);

  const handleClick = () => {
    setShowFan(!showFan);
  };

  // Position calculator that determines which layout to use
  const calculateItemPosition = (index: number, total: number) => {
    if (useFullScreen) {
      return calculateFullScreenPosition(index, total);
    }

    if (isNavAtBottom) {
      // Horizontal layout - no positioning needed (uses flexbox)
      return { x: 0, y: 0 };
    }

    // Arc menu layout
    return calculateArcMenuPosition(
      index,
      total,
      radius,
      maxArcAngle,
      direction
    );
  };

  return (
    <>
      <div ref={containerRef} className="relative inline-block">
        <TriggerButton
          onClick={handleClick}
          hoverBackgroundColor={hoverBackgroundColor}
          backgroundColor={backgroundColor}
          delay={delay}
          className={className}
          isActive={showFan}
        >
          {children}
        </TriggerButton>

        {/* Arc Menu - shows to the side when nav is centered */}
        {!useFullScreen && !isNavAtBottom && (
          <ArcMenu
            items={items}
            showFan={showFan}
            setShowFan={setShowFan}
            calculateItemPosition={calculateItemPosition}
          />
        )}

        {/* Horizontal Menu - shows at bottom when nav is at bottom */}
        {!useFullScreen && isNavAtBottom && (
          <HorizontalMenu
            items={items}
            showFan={showFan}
            setShowFan={setShowFan}
          />
        )}
      </div>

      {/* Full-Screen Menu - shows when viewport is too small */}
      {useFullScreen && (
        <FullScreenMenu
          items={items}
          showFan={showFan}
          setShowFan={setShowFan}
          calculateItemPosition={calculateItemPosition}
        />
      )}
    </>
  );
}
