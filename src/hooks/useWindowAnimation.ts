import { useRef, useEffect, useCallback, useState } from "react";

interface WindowPosition {
  x: number;
  y: number;
}

interface WindowState {
  isOpen: boolean;
  originPosition: WindowPosition | null;
  currentPosition: WindowPosition;
}

interface WindowConfig {
  finalPosition: WindowPosition;
  animationDuration?: number;
}

/**
 * Hook for managing multiple window animations by key.
 * Handles animating from a button/element position to final positions.
 *
 * @example
 * ```typescript
 * const { windows, openWindow, closeWindow, updatePosition } = useWindowAnimations({
 *   'flickr-gallery-window': { finalPosition: { x: 16, y: 16 } },
 *   'spotify-player-window': { finalPosition: { x: 16, y: 32 } },
 * });
 *
 * // Open a window: openWindow('flickr-gallery-window', buttonRef)
 * // Close a window: closeWindow('flickr-gallery-window')
 * // Check if open: windows['flickr-gallery-window'].isOpen
 * // Get position: windows['flickr-gallery-window'].currentPosition
 * ```
 */
export function useWindowAnimations(
  windowConfigs: Record<string, WindowConfig>
) {
  const [windows, setWindows] = useState<Record<string, WindowState>>(() =>
    Object.entries(windowConfigs).reduce(
      (acc, [key, config]) => ({
        ...acc,
        [key]: {
          isOpen: false,
          originPosition: null,
          currentPosition: config.finalPosition,
        },
      }),
      {}
    )
  );

  const animationFrameRefs = useRef<Record<string, number>>({});
  const previousOpenStateRef = useRef<Record<string, boolean>>({});

  // Open window with animation from a specific origin
  const openWindow = useCallback(
    (windowKey: string, buttonRef: React.RefObject<HTMLElement | null>) => {
      const config = windowConfigs[windowKey];
      if (!config) return;

      const currentWindow = windows[windowKey];
      if (currentWindow?.isOpen) return;

      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const origin = { x: centerX, y: centerY };

        setWindows((prev) => ({
          ...prev,
          [windowKey]: {
            isOpen: true,
            originPosition: origin,
            currentPosition: {
              x: centerX - 300, // Half of default window width
              y: centerY - 250, // Half of default window height
            },
          },
        }));
      } else {
        // Open without origin animation
        setWindows((prev) => ({
          ...prev,
          [windowKey]: {
            isOpen: true,
            originPosition: null,
            currentPosition: config.finalPosition,
          },
        }));
      }
    },
    [windowConfigs, windows]
  );

  // Close window
  const closeWindow = useCallback((windowKey: string) => {
    setWindows((prev) => {
      const window = prev[windowKey];
      if (!window) return prev;
      return {
        ...prev,
        [windowKey]: {
          isOpen: false,
          originPosition: window.originPosition,
          currentPosition: window.currentPosition,
        },
      };
    });
  }, []);

  // Update position (used for dragging)
  const updatePosition = useCallback(
    (windowKey: string, position: WindowPosition) => {
      setWindows((prev) => {
        const window = prev[windowKey];
        if (!window) return prev;
        return {
          ...prev,
          [windowKey]: {
            isOpen: window.isOpen,
            originPosition: window.originPosition,
            currentPosition: position,
          },
        };
      });
    },
    []
  );

  // Animate each window to its final position when opened
  useEffect(() => {
    Object.entries(windows).forEach(([windowKey, windowState]) => {
      const config = windowConfigs[windowKey];
      if (!config || !windowState) return;

      const { isOpen, originPosition, currentPosition } = windowState;
      const wasOpen = previousOpenStateRef.current[windowKey];

      // Only animate if window just opened (transition from closed to open)
      const justOpened = isOpen && !wasOpen;

      // Update the previous state
      previousOpenStateRef.current[windowKey] = isOpen;

      if (!justOpened || !originPosition) {
        // Cancel any existing animation for this window if it closed
        if (!isOpen && animationFrameRefs.current[windowKey]) {
          cancelAnimationFrame(animationFrameRefs.current[windowKey]);
          delete animationFrameRefs.current[windowKey];
        }
        return;
      }

      // Cancel any existing animation before starting a new one
      if (animationFrameRefs.current[windowKey]) {
        cancelAnimationFrame(animationFrameRefs.current[windowKey]);
      }

      const startTime = Date.now();
      const startPos = currentPosition;
      const endPos = config.finalPosition;
      const duration = config.animationDuration ?? 300;
      let isCancelled = false;

      const animate = () => {
        if (isCancelled) return;

        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (easeOut cubic)
        const eased = 1 - Math.pow(1 - progress, 3);

        setWindows((prev) => {
          const window = prev[windowKey];
          if (!window) return prev;
          return {
            ...prev,
            [windowKey]: {
              isOpen: window.isOpen,
              originPosition: window.originPosition,
              currentPosition: {
                x: startPos.x + (endPos.x - startPos.x) * eased,
                y: startPos.y + (endPos.y - startPos.y) * eased,
              },
            },
          };
        });

        if (progress < 1) {
          animationFrameRefs.current[windowKey] =
            requestAnimationFrame(animate);
        } else {
          delete animationFrameRefs.current[windowKey];
        }
      };

      animationFrameRefs.current[windowKey] = requestAnimationFrame(animate);

      return () => {
        isCancelled = true;
        if (animationFrameRefs.current[windowKey]) {
          cancelAnimationFrame(animationFrameRefs.current[windowKey]);
          delete animationFrameRefs.current[windowKey];
        }
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    Object.keys(windows)
      .map((key) => windows[key]?.isOpen)
      .join(","),
  ]);

  // Cancel all animations on unmount
  useEffect(() => {
    return () => {
      Object.values(animationFrameRefs.current).forEach((frameId) => {
        cancelAnimationFrame(frameId);
      });
    };
  }, []);

  return {
    windows,
    openWindow,
    closeWindow,
    updatePosition,
  };
}

interface UseWindowAnimationOptions {
  finalPosition: WindowPosition;
  animationDuration?: number;
}

/**
 * @deprecated Use useWindowAnimations for better multi-window management
 * Hook for managing window opening/closing animations with local state.
 */
export function useWindowAnimation(options: UseWindowAnimationOptions) {
  const { finalPosition, animationDuration = 300 } = options;

  const [isOpen, setIsOpen] = useState(false);
  const [originPosition, setOriginPosition] = useState<WindowPosition | null>(
    null
  );
  const [currentPosition, setCurrentPosition] =
    useState<WindowPosition>(finalPosition);
  const animationFrameRef = useRef<number>(0);

  // Open window with animation from a specific origin
  const openWindow = useCallback(
    (buttonRef: React.RefObject<HTMLElement | null>) => {
      if (buttonRef.current && !isOpen) {
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const origin = { x: centerX, y: centerY };

        setOriginPosition(origin);
        setCurrentPosition({
          x: centerX - 300, // Half of default window width
          y: centerY - 250, // Half of default window height
        });
        setIsOpen(true);
      } else if (!isOpen) {
        // Open without origin animation
        setOriginPosition(null);
        setCurrentPosition(finalPosition);
        setIsOpen(true);
      }
    },
    [isOpen, finalPosition]
  );

  // Close window
  const closeWindow = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Update position (used for dragging)
  const updatePosition = useCallback((position: WindowPosition) => {
    setCurrentPosition(position);
  }, []);

  // Animate to final position when window opens
  useEffect(() => {
    if (!isOpen || !originPosition) return;

    const startTime = Date.now();
    const startPos = currentPosition;
    const endPos = finalPosition;
    let isCancelled = false;

    const animate = () => {
      if (isCancelled) return;

      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      // Easing function (easeOut cubic)
      const eased = 1 - Math.pow(1 - progress, 3);

      setCurrentPosition({
        x: startPos.x + (endPos.x - startPos.x) * eased,
        y: startPos.y + (endPos.y - startPos.y) * eased,
      });

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup: cancel animation if component unmounts or user starts dragging
    return () => {
      isCancelled = true;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
    // Only run animation on initial open
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, originPosition]);

  // Cancel animation on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return {
    isOpen,
    originPosition,
    currentPosition,
    openWindow,
    closeWindow,
    updatePosition,
  };
}
