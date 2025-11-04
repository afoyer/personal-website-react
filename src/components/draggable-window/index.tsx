import { motion } from "motion/react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { ReactNode, useState, useRef, useEffect } from "react";

interface DraggableWindowProps {
  id: string;
  title: string;
  children: ReactNode;
  position?: { x: number; y: number };
  width?: string;
  height?: string;
  minWidth?: number;
  minHeight?: number;
  className?: string;
  contentClassName?: string;
  initial?: { opacity?: number; y?: number };
  animate?: { opacity?: number; y?: number };
  exit?: { opacity?: number };
  zIndex?: number;
  onFocus?: () => void;
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
  zIndex = 50,
  onFocus,
}: DraggableWindowProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  const [dimensions, setDimensions] = useState({
    width: parseInt(width) || 600,
    height: parseInt(height) || 500,
  });
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

  const style = {
    transform: CSS.Translate.toString(transform),
    position: "absolute" as const,
    left: position.x + positionOffset.x,
    top: position.y + positionOffset.y,
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
    zIndex: zIndex,
  };

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

  return (
    <motion.div
      ref={(node) => {
        setNodeRef(node);
        if (node) {
          windowRef.current = node;
        }
      }}
      style={style}
      onClick={handleWindowClick}
      className={`pointer-events-auto bg-white/95 backdrop-blur-sm shadow-2xl rounded-lg border border-gray-200 flex flex-col overflow-hidden ${className}`}
      initial={initial}
      animate={animate}
      exit={exit}
    >
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

      {/* Window Title Bar - Drag Handle */}
      <div
        {...(!resizeState?.isResizing ? { ...listeners, ...attributes } : {})}
        className={`flex items-center justify-between px-4 py-3 bg-gray-100/80 border-b border-gray-200 cursor-move select-none transition-colors ${
          isDragging ? "bg-gray-200/80 cursor-grabbing" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <GripVertical className="w-5 h-5 text-gray-400" />
          <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
        </div>
      </div>

      {/* Window Content */}
      <div
        className={`flex-1 overflow-auto position-relative ${contentClassName}`}
      >
        {children}
      </div>
    </motion.div>
  );
}
