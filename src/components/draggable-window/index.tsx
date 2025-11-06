import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X } from "lucide-react";
import { ReactNode, useState, useRef, useEffect } from "react";
import { CONTAINER_PADDING } from "../../App";
import "./draggable-window.css";

export interface DraggableWindowProps {
  position?: { x: number; y: number };
  width?: string;
  height?: string;
  minWidth?: number;
  minHeight?: number;
  className?: string;
  contentClassName?: string;
  initial?: { opacity?: number; y?: number; scale?: number; x?: number };
  zIndex?: number;
  onFocus?: () => void;
  onClose?: () => void;
  onDimensionChange?: (dimensions: { width: number; height: number }) => void;
  initialDimensions?: { width: number; height: number };
}

export interface DraggableWindowContentProps extends DraggableWindowProps {
  id: string;
  title: ReactNode;
  children: ReactNode;
}

type ResizeHandle =
  | "n" // north (top)
  | "s" // south (bottom)
  | "e" // east (right)
  | "w" // west (left)
  | "ne" // northeast (top-right)
  | "nw" // northwest (top-left)
  | "se" // southeast (bottom-right)
  | "sw"; // southwest (bottom-left)

export default function DraggableWindow({
  id,
  title,
  children,
  position = { x: 0, y: 0 },
  width = "600px",
  height = "500px",
  minWidth = 200,
  minHeight = 150,
  className = "",
  contentClassName = "",
  initial = { opacity: 0 },
  zIndex = 100,
  onFocus,
  onClose,
  onDimensionChange,
  initialDimensions,
}: DraggableWindowContentProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  const [dimensions, setDimensions] = useState(() => {
    // Use initialDimensions if provided (from localStorage), otherwise use props
    if (initialDimensions) {
      return {
        width: initialDimensions.width,
        height: initialDimensions.height,
      };
    }
    return {
      width: parseInt(width as string) || 600,
      height: parseInt(height as string) || 500,
    };
  });

  const [positionOffset, setPositionOffset] = useState({ x: 0, y: 0 });
  const [isAnimatingIn, setIsAnimatingIn] = useState(true);
  const [resizeState, setResizeState] = useState<{
    isResizing: boolean;
    handle: ResizeHandle | null;
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    startLeft: number;
    startTop: number;
    startPositionOffset: { x: number; y: number };
  } | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  // Parse initial width/height on mount and constrain to viewport
  // Only run once on mount, not when props change
  useEffect(() => {
    if (hasInitialized.current) return;

    // If initialDimensions were provided, we already set them in useState
    if (!initialDimensions) {
      const w = parseInt(width as string) || 600;
      const h = parseInt(height as string) || 500;

      // Get viewport dimensions and account for container padding
      const maxWidth = window.innerWidth - CONTAINER_PADDING * 2; // padding left + padding right
      const maxHeight = window.innerHeight - CONTAINER_PADDING * 2; // padding top + padding bottom

      // Constrain dimensions to fit within viewport
      const constrainedWidth = Math.min(w, maxWidth);
      const constrainedHeight = Math.min(h, maxHeight);

      setDimensions({ width: constrainedWidth, height: constrainedHeight });
    } else {
      // Still constrain initialDimensions to viewport
      const maxWidth = window.innerWidth - CONTAINER_PADDING * 2;
      const maxHeight = window.innerHeight - CONTAINER_PADDING * 2;

      setDimensions((prev) => ({
        width: Math.min(prev.width, maxWidth),
        height: Math.min(prev.height, maxHeight),
      }));
    }

    hasInitialized.current = true;
  }, [width, height, initialDimensions]);

  // Remove animation class after animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimatingIn(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Handle window resize to keep draggable window within bounds
  useEffect(() => {
    const handleResize = () => {
      setDimensions((prevDimensions) => {
        const maxWidth = window.innerWidth - CONTAINER_PADDING * 2; // padding left + padding right
        const maxHeight = window.innerHeight - CONTAINER_PADDING * 2; // padding top + padding bottom

        return {
          width: Math.min(prevDimensions.width, maxWidth),
          height: Math.min(prevDimensions.height, maxHeight),
        };
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResizeStart = (e: React.MouseEvent, handle: ResizeHandle) => {
    e.preventDefault();
    e.stopPropagation();

    if (!windowRef.current) return;

    const rect = windowRef.current.getBoundingClientRect();
    setResizeState({
      isResizing: true,
      handle,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: rect.width,
      startHeight: rect.height,
      startLeft: rect.left,
      startTop: rect.top,
      startPositionOffset: { ...positionOffset },
    });
  };

  useEffect(() => {
    if (!resizeState || !resizeState.handle) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!windowRef.current || !resizeState || !resizeState.handle) return;

      const deltaX = e.clientX - resizeState.startX;
      const deltaY = e.clientY - resizeState.startY;
      const handle = resizeState.handle;

      let newWidth = resizeState.startWidth;
      let newHeight = resizeState.startHeight;
      let newPositionOffset = { ...resizeState.startPositionOffset };

      // Get current window bounds
      const currentLeft = position.x + resizeState.startPositionOffset.x;
      const currentTop = position.y + resizeState.startPositionOffset.y;

      // Account for main container padding
      // Positions are relative to container, so we need the container dimensions
      // Container has CONTAINER_PADDING on each side
      const containerWidth = window.innerWidth - CONTAINER_PADDING * 2; // viewport - padding left - padding right
      const containerHeight = window.innerHeight - CONTAINER_PADDING * 2; // viewport - padding top - padding bottom

      // Handle horizontal resizing
      if (handle.includes("e")) {
        // Right edge - constrain to container width
        const maxWidth = Math.max(minWidth, containerWidth - currentLeft);
        newWidth = Math.max(
          minWidth,
          Math.min(maxWidth, resizeState.startWidth + deltaX)
        );
      } else if (handle.includes("w")) {
        // Left edge - constrain to not go past left boundary (0) and right viewport edge
        // deltaX is positive when dragging right (shrinking), negative when dragging left (expanding)
        // Constrain so that (currentLeft + deltaX) >= 0
        const constrainedDeltaX = Math.max(deltaX, -currentLeft);
        let potentialWidth = resizeState.startWidth - constrainedDeltaX;

        // Ensure width respects minimum
        potentialWidth = Math.max(minWidth, potentialWidth);

        // Calculate where the left edge would be after this resize
        const actualDelta = resizeState.startWidth - potentialWidth;
        const newLeft =
          position.x + resizeState.startPositionOffset.x + actualDelta;

        // Ensure the right edge doesn't extend beyond container width
        const rightEdge = newLeft + potentialWidth;
        if (rightEdge > containerWidth) {
          potentialWidth = Math.max(minWidth, containerWidth - newLeft);
        }

        newWidth = potentialWidth;
        const finalDelta = resizeState.startWidth - newWidth;
        newPositionOffset.x = resizeState.startPositionOffset.x + finalDelta;
      }

      // Handle vertical resizing
      if (handle.includes("s")) {
        // Bottom edge - constrain to viewport height
        const maxHeight = Math.max(minHeight, containerHeight - currentTop);
        newHeight = Math.max(
          minHeight,
          Math.min(maxHeight, resizeState.startHeight + deltaY)
        );
      } else if (handle.includes("n")) {
        // Top edge - constrain to not go past top boundary (0) and bottom viewport edge
        // deltaY is positive when dragging down (shrinking), negative when dragging up (expanding)
        // Constrain so that (currentTop + deltaY) >= 0
        const constrainedDeltaY = Math.max(deltaY, -currentTop);
        let potentialHeight = resizeState.startHeight - constrainedDeltaY;

        // Ensure height respects minimum
        potentialHeight = Math.max(minHeight, potentialHeight);

        // Calculate where the top edge would be after this resize
        const actualDelta = resizeState.startHeight - potentialHeight;
        const newTop =
          position.y + resizeState.startPositionOffset.y + actualDelta;

        // Ensure the bottom edge doesn't extend beyond container height
        const bottomEdge = newTop + potentialHeight;
        if (bottomEdge > containerHeight) {
          potentialHeight = Math.max(minHeight, containerHeight - newTop);
        }

        newHeight = potentialHeight;
        const finalDelta = resizeState.startHeight - newHeight;
        newPositionOffset.y = resizeState.startPositionOffset.y + finalDelta;
      }

      const newDimensions = { width: newWidth, height: newHeight };
      setDimensions(newDimensions);
      setPositionOffset(newPositionOffset);

      // Call onDimensionChange during resize to update constraints in real-time
      // and save to localStorage
      if (onDimensionChange) {
        onDimensionChange(newDimensions);
      }
    };

    const handleMouseUp = () => {
      setResizeState(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizeState, minWidth, minHeight, onDimensionChange, dimensions]);

  const handleWindowClick = (_e: React.MouseEvent) => {
    // Don't trigger focus if we're currently resizing
    if (resizeState?.isResizing) {
      return;
    }

    // Bring window to front on any click within the window
    // Resize handles stop propagation, so clicks on them won't reach here
    if (onFocus) {
      onFocus();
    }
  };

  const dragTransform = transform
    ? CSS.Translate.toString(transform)
    : undefined;

  const style = {
    transform: dragTransform,
    position: "absolute" as const,
    left: position.x + positionOffset.x,
    top: position.y + positionOffset.y,
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
    zIndex: zIndex,
    transformOrigin: "center",
  } as React.CSSProperties;

  const getResizeCursor = (handle: ResizeHandle) => {
    if (handle === "n" || handle === "s") return "ns-resize";
    if (handle === "e" || handle === "w") return "ew-resize";
    if (handle === "ne" || handle === "sw") return "nesw-resize";
    if (handle === "nw" || handle === "se") return "nwse-resize";
    return "default";
  };

  // Build animation class based on initial prop
  let animationClass = "";
  if (isAnimatingIn) {
    if (initial.scale === 0) {
      animationClass = "animate-scale-in";
    } else if (initial.opacity === 0) {
      animationClass = "animate-fade-in";
    }
  }

  return (
    <div
      id={id}
      ref={(node: HTMLDivElement | null) => {
        setNodeRef(node);
        if (node) {
          windowRef.current = node;
        }
      }}
      style={style}
      onClick={handleWindowClick}
      onMouseDown={(_e: React.MouseEvent) => {
        if (onFocus && !resizeState?.isResizing) {
          onFocus();
        }
      }}
      className={`pointer-events-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-2xl rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden ${animationClass} ${className}`}
    >
      {/* Resize Handles */}
      <ResizeHandleSet
        handleResizeStart={handleResizeStart}
        getResizeCursor={getResizeCursor}
        resizeState={resizeState}
      />

      {/* Window Title Bar - Drag Handle */}
      <div
        className={`flex items-center justify-between px-4 py-3 bg-gray-100/80 border-b border-gray-200 select-none transition-colors
          ${isDragging ? "bg-gray-200/80" : ""}
          dark:bg-gray-900/80 dark:border-gray-700
          ${isDragging ? "dark:bg-gray-800/80" : ""}
        `}
      >
        <div
          {...(!resizeState?.isResizing ? { ...listeners, ...attributes } : {})}
          onMouseDown={() => {
            if (onFocus && !resizeState?.isResizing) {
              onFocus();
            }
          }}
          className={`flex items-center gap-2 flex-1 cursor-move ${
            isDragging ? "cursor-grabbing" : ""
          }`}
        >
          <GripVertical className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
            {title}
          </h3>
        </div>
        {onClose && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        )}
      </div>

      {/* Window Content */}
      <div
        className={`flex-1 overflow-auto relative window-content-scrollable ${contentClassName}`}
      >
        {children}
      </div>
    </div>
  );
}

function ResizeHandleSet({
  handleResizeStart,
  getResizeCursor,
  resizeState,
}: {
  handleResizeStart: (e: React.MouseEvent, handle: ResizeHandle) => void;
  getResizeCursor: (handle: ResizeHandle) => string;
  resizeState:
    | {
        isResizing: boolean;
        handle: ResizeHandle | null;
        startX: number;
        startY: number;
        startWidth: number;
        startHeight: number;
        startLeft: number;
        startTop: number;
        startPositionOffset: { x: number; y: number };
      }
    | null
    | undefined;
}) {
  const ResizeHandle = ({
    handle,
    className,
  }: {
    handle: ResizeHandle;
    className: string;
  }) => (
    <div
      onMouseDown={(e) => handleResizeStart(e, handle)}
      onClick={(e) => e.stopPropagation()}
      className={`absolute ${className} z-10 ${getResizeCursor(handle)} ${
        resizeState?.isResizing ? "bg-blue-200/50" : "hover:bg-blue-100/30"
      } transition-colors`}
      style={{
        cursor: getResizeCursor(handle),
      }}
    />
  );
  return (
    <>
      {/* Resize Handles - Corners */}
      <ResizeHandle
        handle="nw"
        className="top-0 left-0 w-4 h-4 -ml-1 -mt-1 rounded-tl-lg"
      />
      <ResizeHandle
        handle="ne"
        className="top-0 right-0 w-4 h-4 -mr-1 -mt-1 rounded-tr-lg"
      />
      <ResizeHandle
        handle="sw"
        className="bottom-0 left-0 w-4 h-4 -ml-1 -mb-1 rounded-bl-lg"
      />
      <ResizeHandle
        handle="se"
        className="bottom-0 right-0 w-4 h-4 -mr-1 -mb-1 rounded-br-lg"
      />

      {/* Resize Handles - Edges */}
      <ResizeHandle handle="n" className="top-0 left-4 right-4 h-2 -mt-1" />
      <ResizeHandle handle="s" className="bottom-0 left-4 right-4 h-2 -mb-1" />
      <ResizeHandle handle="e" className="right-0 top-4 bottom-4 w-2 -mr-1" />
      <ResizeHandle handle="w" className="left-0 top-4 bottom-4 w-2 -ml-1" />
    </>
  );
}
