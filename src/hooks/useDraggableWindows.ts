import { useState, useCallback, useRef, useEffect } from "react";
import { DragEndEvent } from "@dnd-kit/core";

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowState extends WindowPosition {
  width?: number;
  height?: number;
}

interface WindowPositions {
  [windowId: string]: WindowPosition;
}

interface WindowStates {
  [windowId: string]: WindowState;
}

interface WindowZIndices {
  [windowId: string]: number;
}

// Local storage key for window states
const WINDOW_STATES_STORAGE_KEY = "portfolio-window-states";

/**
 * Custom hook to manage positions and z-indices of multiple draggable windows
 */
export function useDraggableWindows(initialPositions: WindowPositions = {}) {
  // Load saved window states from localStorage
  const loadSavedWindowStates = (): WindowStates => {
    try {
      const savedStates = localStorage.getItem(WINDOW_STATES_STORAGE_KEY);
      if (savedStates) {
        return JSON.parse(savedStates);
      }
    } catch (error) {
      console.error("Failed to load window states from localStorage:", error);
    }
    return {};
  };

  // Get initial positions from localStorage or use provided defaults
  const getSavedPositions = (): WindowPositions => {
    const savedStates = loadSavedWindowStates();
    const savedPositions: WindowPositions = {};

    // First use any saved positions
    Object.keys(savedStates).forEach((windowId) => {
      const state = savedStates[windowId];
      if (state && typeof state.x === "number" && typeof state.y === "number") {
        savedPositions[windowId] = {
          x: state.x,
          y: state.y,
        };
      }
    });

    // Then fill in any missing positions with initialPositions
    Object.keys(initialPositions).forEach((windowId) => {
      if (!savedPositions[windowId] && initialPositions[windowId]) {
        savedPositions[windowId] = initialPositions[windowId];
      }
    });

    return savedPositions;
  };

  const [positions, setPositions] =
    useState<WindowPositions>(getSavedPositions());
  const [windowStates, setWindowStates] = useState<WindowStates>(
    loadSavedWindowStates()
  );
  const zIndexCounter = useRef(0);
  const [zIndices, setZIndices] = useState<WindowZIndices>(() => {
    // Initialize z-indices for all windows
    const initial: WindowZIndices = {};
    Object.keys(positions).forEach((windowId, index) => {
      initial[windowId] = 100 + index; // Start at z-100, increment by 1
      zIndexCounter.current = Math.max(zIndexCounter.current, 100 + index);
    });
    return initial;
  });

  // Save window states to localStorage
  const saveWindowStates = useCallback((states: WindowStates) => {
    try {
      localStorage.setItem(WINDOW_STATES_STORAGE_KEY, JSON.stringify(states));
    } catch (error) {
      console.error("Failed to save window states to localStorage:", error);
    }
  }, []);

  // Update window states when positions change
  useEffect(() => {
    // Update window states with new positions
    const updatedStates = { ...windowStates };

    Object.keys(positions).forEach((windowId) => {
      const position = positions[windowId];
      if (position) {
        updatedStates[windowId] = {
          ...updatedStates[windowId],
          x: position.x,
          y: position.y,
        };
      }
    });

    setWindowStates(updatedStates);
    saveWindowStates(updatedStates);
  }, [positions, saveWindowStates]);

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

  // Update window dimensions (for resizing)
  const setWindowDimensions = useCallback(
    (windowId: string, dimensions: { width: number; height: number }) => {
      setWindowStates((prev) => {
        const updatedState = {
          ...prev,
          [windowId]: {
            ...(prev[windowId] || { x: 0, y: 0 }),
            width: dimensions.width,
            height: dimensions.height,
          },
        };

        // Save to localStorage
        saveWindowStates(updatedState);
        return updatedState;
      });
    },
    [saveWindowStates]
  );

  // Get window dimensions from saved state
  const getWindowDimensions = useCallback(
    (windowId: string, defaultDimensions = { width: 600, height: 500 }) => {
      const state = windowStates[windowId];
      if (!state || state.width === undefined || state.height === undefined) {
        return defaultDimensions;
      }
      return {
        width: state.width,
        height: state.height,
      };
    },
    [windowStates]
  );

  return {
    positions,
    windowStates,
    zIndices,
    handleDragEnd,
    setWindowPosition,
    getWindowPosition,
    bringWindowToFront,
    getWindowZIndex,
    setWindowDimensions,
    getWindowDimensions,
  };
}
