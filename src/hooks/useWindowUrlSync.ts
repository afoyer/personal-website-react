import { useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";

export type WindowKey = string;

interface WindowState {
  isOpen: boolean;
}

interface WindowUrlSyncOptions {
  windows: Record<string, WindowState>;
  zIndices: Record<string, number>;
  urlMap: Record<string, WindowKey>;
  openWindow: (
    windowKey: WindowKey,
    buttonRef: React.RefObject<HTMLElement | null>
  ) => void;
  bringWindowToFront: (windowKey: WindowKey) => void;
}

/**
 * Hook to synchronize window states with URL query parameters.
 *
 * Features:
 * - Reads windows from URL on mount and opens them
 * - Updates URL whenever windows open/close or z-index changes
 * - Maintains window order in URL matching their z-index (topmost first)
 *
 * @example
 * ```typescript
 * const { getOpenWindowsSortedByZIndex } = useWindowUrlSync({
 *   windows,
 *   zIndices,
 *   urlMap: WINDOW_URL_MAP,
 *   openWindow,
 *   bringWindowToFront,
 * });
 * ```
 */
export function useWindowUrlSync({
  windows,
  zIndices,
  urlMap,
  openWindow,
  bringWindowToFront,
}: WindowUrlSyncOptions) {
  const [searchParams, setSearchParams] = useSearchParams();
  const hasInitialized = useRef(false);

  // Create reverse map for converting window keys to URL names
  const reverseUrlMap = useCallback(() => {
    return Object.entries(urlMap).reduce(
      (acc, [urlName, windowKey]) => ({ ...acc, [windowKey]: urlName }),
      {} as Record<WindowKey, string>
    );
  }, [urlMap]);

  // Helper function to get currently open windows sorted by z-index (highest first)
  const getOpenWindowsSortedByZIndex = useCallback((): WindowKey[] => {
    const openWindows: WindowKey[] = [];

    Object.entries(windows).forEach(([windowKey, windowState]) => {
      if (windowState.isOpen) {
        openWindows.push(windowKey);
      }
    });

    // Sort by z-index (highest first = topmost window first)
    return openWindows.sort((a, b) => {
      const zIndexA = zIndices[a] || 0;
      const zIndexB = zIndices[b] || 0;
      return zIndexB - zIndexA; // Descending order
    });
  }, [windows, zIndices]);

  // Helper function to update URL with all open windows in z-index order
  const updateURLWithOpenWindows = useCallback(() => {
    const openWindows = getOpenWindowsSortedByZIndex();
    const urlToWindowMap = reverseUrlMap();

    if (openWindows.length === 0) {
      setSearchParams({});
    } else {
      const urlNames = openWindows
        .map((key) => urlToWindowMap[key])
        .filter(Boolean)
        .join(",");
      setSearchParams({ windows: urlNames });
    }
  }, [getOpenWindowsSortedByZIndex, setSearchParams, reverseUrlMap]);

  // On mount, read URL and open the specified windows
  useEffect(() => {
    if (hasInitialized.current) return;

    const windowsParam = searchParams.get("windows");
    if (windowsParam) {
      const windowNames = windowsParam.split(",").map((name) => name.trim());
      // Open in reverse order so the first one in URL ends up on top
      const reversedNames = [...windowNames].reverse();

      reversedNames.forEach((urlName, index) => {
        const windowKey = urlMap[urlName];
        if (windowKey) {
          // Wait for nav to render (300ms), then cascade windows with 150ms between each
          setTimeout(
            () => {
              openWindow(windowKey, { current: null });
              bringWindowToFront(windowKey);
            },
            300 + index * 150
          );
        }
      });
    }

    hasInitialized.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Sync URL whenever windows open/close or z-index changes
  useEffect(() => {
    if (!hasInitialized.current) return; // Don't update URL during initialization

    updateURLWithOpenWindows();
  }, [windows, zIndices, updateURLWithOpenWindows]);

  return {
    getOpenWindowsSortedByZIndex,
    updateURLWithOpenWindows,
  };
}
