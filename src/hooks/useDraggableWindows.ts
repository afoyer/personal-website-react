import { useState, useCallback, useRef } from "react";
import { DragEndEvent } from "@dnd-kit/core";

interface WindowPosition {
  x: number;
  y: number;
}

interface WindowPositions {
  [windowId: string]: WindowPosition;
}

interface WindowZIndices {
  [windowId: string]: number;
}

/**
 * Custom hook to manage positions and z-indices of multiple draggable windows
 */
export function useDraggableWindows(initialPositions: WindowPositions = {}) {
  const [positions, setPositions] = useState<WindowPositions>(initialPositions);
  const zIndexCounter = useRef(0);
  const [zIndices, setZIndices] = useState<WindowZIndices>(() => {
    // Initialize z-indices for all windows
    const initial: WindowZIndices = {};
    Object.keys(initialPositions).forEach((windowId, index) => {
      initial[windowId] = 100 + index; // Start at z-100, increment by 1
      zIndexCounter.current = Math.max(zIndexCounter.current, 100 + index);
    });
    return initial;
  });

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    if (!event.delta || !event.active.id) return;

    const windowId = event.active.id as string;
    setPositions((prev) => {
      const currentPosition = prev[windowId] || { x: 0, y: 0 };
      return {
        ...prev,
        [windowId]: {
          x: currentPosition.x + event.delta.x,
          y: currentPosition.y + event.delta.y,
        },
      };
    });
  }, []);

  const bringWindowToFront = useCallback((windowId: string) => {
    setZIndices((prev) => {
      const newZIndices = { ...prev };
      // Increment counter and assign to clicked window
      zIndexCounter.current += 1;
      newZIndices[windowId] = zIndexCounter.current;

      // Ensure all other windows have lower z-index
      Object.keys(newZIndices).forEach((id) => {
        if (id !== windowId && newZIndices[id]! >= zIndexCounter.current) {
          // Keep other windows at their current z-index if it's lower,
          // or adjust if they were higher (shouldn't happen, but safety check)
        }
      });

      return newZIndices;
    });
  }, []);

  const setWindowPosition = useCallback(
    (windowId: string, position: WindowPosition) => {
      setPositions((prev) => ({
        ...prev,
        [windowId]: position,
      }));
    },
    []
  );

  const getWindowPosition = useCallback(
    (windowId: string, defaultPosition: WindowPosition = { x: 0, y: 0 }) => {
      return positions[windowId] || defaultPosition;
    },
    [positions]
  );

  const getWindowZIndex = useCallback(
    (windowId: string) => {
      return zIndices[windowId] || 100;
    },
    [zIndices]
  );

  return {
    positions,
    handleDragEnd,
    setWindowPosition,
    getWindowPosition,
    bringWindowToFront,
    getWindowZIndex,
  };
}
