import { motion } from "motion/react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X } from "lucide-react";
import { ReactNode, useState, useRef, useEffect } from "react";

export interface DraggableWindowProps {
  position?: { x: number; y: number };
  width?: string;
  height?: string;
  minWidth?: number;
  minHeight?: number;
  className?: string;
  contentClassName?: string;
  initial?: { opacity?: number; y?: number; scale?: number; x?: number };
  animate?: { opacity?: number; y?: number; scale?: number; x?: number };
  exit?: { opacity?: number; scale?: number };
  zIndex?: number;
  onFocus?: () => void;
  onClose?: () => void;
  variant?: "normal" | "fullscreen";
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
  animate = { opacity: 1 },
  exit = { opacity: 0 },
  zIndex = 100,
  onFocus,
  onClose,
  variant = "normal",
}: DraggableWindowContentProps) {
  const isFullscreen = variant === "fullscreen";

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      disabled: isFullscreen,
    });

  const [dimensions, setDimensions] = useState({
    width: parseInt(width) || 600,
    height: parseInt(height) || 500,
  });

  const [hasAnimated, setHasAnimated] = useState(false);
  const [positionOffset, setPositionOffset] = useState({ x: 0, y: 0 });
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

  // Parse initial width/height on mount
  useEffect(() => {
    const w = parseInt(width) || 600;
    const h = parseInt(height) || 500;
    setDimensions({ width: w, height: h });
  }, [width, height]);

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

      // Handle horizontal resizing
      if (handle.includes("e")) {
        // Right edge
        newWidth = Math.max(minWidth, resizeState.startWidth + deltaX);
      } else if (handle.includes("w")) {
        // Left edge - adjust width and position
        newWidth = Math.max(minWidth, resizeState.startWidth - deltaX);
        newPositionOffset.x = resizeState.startPositionOffset.x + deltaX;
      }

      // Handle vertical resizing
      if (handle.includes("s")) {
        // Bottom edge
        newHeight = Math.max(minHeight, resizeState.startHeight + deltaY);
      } else if (handle.includes("n")) {
        // Top edge - adjust height and position
        newHeight = Math.max(minHeight, resizeState.startHeight - deltaY);
        newPositionOffset.y = resizeState.startPositionOffset.y + deltaY;
      }

      setDimensions({ width: newWidth, height: newHeight });
      setPositionOffset(newPositionOffset);
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
  }, [resizeState, minWidth, minHeight]);

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

  const style = isFullscreen
    ? ({
        position: "fixed" as const,
        width: "calc(100vw - 64px)",
        height: "calc(100vh - 64px)",
        borderRadius: "16px",
        left: "32px",
        top: "16px",
        zIndex: zIndex,
        transformOrigin: "center",
      } as React.CSSProperties)
    : ({
        transform: dragTransform,
        position: "absolute" as const,
        left: position.x + positionOffset.x,
        top: position.y + positionOffset.y,
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        zIndex: zIndex,
        transformOrigin: "center",
      } as React.CSSProperties);

  const getResizeCursor = (handle: ResizeHandle) => {
    if (handle === "n" || handle === "s") return "ns-resize";
    if (handle === "e" || handle === "w") return "ew-resize";
    if (handle === "ne" || handle === "sw") return "nesw-resize";
    if (handle === "nw" || handle === "se") return "nwse-resize";
    return "default";
  };

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

  const commonProps = {
    ref: (node: HTMLDivElement | null) => {
      setNodeRef(node);
      if (node) {
        windowRef.current = node;
      }
    },
    style,
    onClick: handleWindowClick,
    onMouseDown: (_e: React.MouseEvent) => {
      if (onFocus && !resizeState?.isResizing) {
        onFocus();
      }
    },
    className: `pointer-events-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-2xl ${
      isFullscreen ? "" : "rounded-lg"
    } border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden ${className}`,
  };

  const content = (
    <>
      {/* Resize Handles - Only show in normal mode */}
      {!isFullscreen && (
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
          <ResizeHandle
            handle="s"
            className="bottom-0 left-4 right-4 h-2 -mb-1"
          />
          <ResizeHandle
            handle="e"
            className="right-0 top-4 bottom-4 w-2 -mr-1"
          />
          <ResizeHandle
            handle="w"
            className="left-0 top-4 bottom-4 w-2 -ml-1"
          />
        </>
      )}

      {/* Window Title Bar - Drag Handle */}
      <div
        className={`flex items-center justify-between px-4 py-3 bg-gray-100/80 border-b border-gray-200 select-none transition-colors
          ${isDragging ? "bg-gray-200/80" : ""}
          dark:bg-gray-900/80 dark:border-gray-700
          ${isDragging ? "dark:bg-gray-800/80" : ""}
        `}
      >
        <div
          {...(!isFullscreen && !resizeState?.isResizing
            ? { ...listeners, ...attributes }
            : {})}
          onMouseDown={() => {
            if (onFocus && !resizeState?.isResizing) {
              onFocus();
            }
          }}
          className={`flex items-center gap-2 flex-1 ${
            !isFullscreen
              ? `cursor-move ${isDragging ? "cursor-grabbing" : ""}`
              : ""
          }`}
        >
          {!isFullscreen && (
            <GripVertical className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          )}
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
      <div className={`flex-1 overflow-auto relative ${contentClassName}`}>
        {children}
      </div>
    </>
  );

  // Use motion.div only for initial animation, then switch to regular div
  return hasAnimated || isDragging ? (
    <div {...commonProps}>{content}</div>
  ) : (
    <motion.div
      {...commonProps}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      onAnimationComplete={() => setHasAnimated(true)}
    >
      {content}
    </motion.div>
  );
}
