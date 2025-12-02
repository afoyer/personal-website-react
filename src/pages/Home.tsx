import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useRef, useMemo, useCallback, useState, useEffect } from "react";
import { useDraggableWindows } from "../hooks/useDraggableWindows";
import { useFlickrGallery, useFractalColors } from "../jotai/hooks";
import { useWindowAnimations } from "../hooks/useWindowAnimation";
import { useWindowUrlSync } from "../hooks/useWindowUrlSync";
import FlickrGallery from "../windows/flickr-gallery";
import Alert from "../components/alert";
import Nav from "../components/nav";
import SpotifyPlayer from "../windows/spotify-player";
import Resume from "../windows/resume";
import { CONTAINER_PADDING } from "../App";
import AmazonWindow from "../windows/amazon";
import PantonifyWindow from "../windows/pantonify";
import RadiosityWindow from "../windows/radiosity";
import LightWindow from "../windows/light";
import FractalHaze from "../components/fractal-haze";
import { RotateCcwSquare } from "lucide-react";
import { motion } from "motion/react";

export type WindowKey =
  | "flickr-gallery-window"
  | "spotify-player-window"
  | "resume-window"
  | "amazon-window"
  | "light-drawing-window"
  | "radiosity-window"
  | "pantonify-window"
  | "light-window";

// Map URL-friendly names to window keys
const WINDOW_URL_MAP: Record<string, WindowKey> = {
  flickr: "flickr-gallery-window",
  spotify: "spotify-player-window",
  resume: "resume-window",
  amazon: "amazon-window",
  light: "light-window",
  radiosity: "radiosity-window",
  pantonify: "pantonify-window",
};

function Home() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Track window dimensions for fullscreen windows
  const [viewportDimensions, setViewportDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setViewportDimensions({
        width: window.innerWidth,
        height: window.innerHeight - CONTAINER_PADDING * 2,
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize); // Update dimensions on phone rotation

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  // Update dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      setViewportDimensions({
        width: window.innerWidth,
        height: window.innerHeight - CONTAINER_PADDING * 2,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Configure sensors for better touch and mouse support
  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  // Fullscreen windows: 16px padding on all sides (handled by container padding)
  // Position at 0,0 to fill container, which already has 16px padding from viewport

  const baseFinalPosition = useMemo(
    () => ({
      x: 16,
      y: 16,
    }),
    []
  );
  const baseLocation = {
    isOpen: false,
    originPosition: null,
    currentPosition: baseFinalPosition,
  };

  // Manage draggable window positions and z-indices
  const {
    handleDragEnd,
    bringWindowToFront,
    getWindowZIndex,
    zIndices,
    setWindowDimensions,
    getWindowDimensions,
  } = useDraggableWindows({
    "flickr-gallery-window": baseFinalPosition,
    "spotify-player-window": baseFinalPosition,
    "resume-window": baseFinalPosition,
    "amazon-window": baseFinalPosition,
    "radiosity-window": baseFinalPosition,
    "pantonify-window": baseFinalPosition,
    "light-window": baseFinalPosition,
  });

  // Get Flickr gallery state from atoms
  const { flickrError } = useFlickrGallery();

  // Get fractal colors from atoms
  const { colors: fractalColors, updateColors } = useFractalColors();

  // Color map for each window
  const windowColorMap: Record<
    WindowKey,
    { first: string; second: string; third: string }
  > = {
    "flickr-gallery-window": {
      first: "rgba(0, 0, 255, 1)",
      second: "rgba(65, 105, 225, 1)",
      third: "rgba(30, 144, 255, 1)",
    },
    "spotify-player-window": {
      first: "rgba(0, 225, 0, 1)",
      second: "rgba(29, 185, 84, 1)",
      third: "rgba(30, 215, 96, 1)",
    },
    "resume-window": {
      first: "rgba(120, 144, 156, 1)",
      second: "rgba(144, 164, 174, 1)",
      third: "rgba(176, 190, 197, 1)",
    },
    "amazon-window": {
      first: "rgba(255, 160, 0, 1)",
      second: "rgba(255, 152, 0, 1)",
      third: "rgba(255, 143, 0, 1)",
    },
    "light-drawing-window": {
      first: "rgba(25, 118, 210, 1)",
      second: "rgba(33, 150, 243, 1)",
      third: "rgba(66, 165, 245, 1)",
    },
    "radiosity-window": {
      first: "rgba(96, 125, 139, 1)",
      second: "rgba(120, 144, 156, 1)",
      third: "rgba(144, 164, 174, 1)",
    },
    "pantonify-window": {
      first: "rgba(76, 175, 80, 1)",
      second: "rgba(102, 187, 106, 1)",
      third: "rgba(129, 199, 132, 1)",
    },
    "light-window": {
      first: "rgba(25, 118, 210, 1)",
      second: "rgba(33, 150, 243, 1)",
      third: "rgba(66, 165, 245, 1)",
    },
  };

  // Helper function to update colors based on window key
  const updateFractalColorsForWindow = useCallback(
    (windowKey: WindowKey) => {
      const colors = windowColorMap[windowKey] || {
        first: "rgba(255, 0, 128, 1)",
        second: "rgba(121, 40, 202, 1)",
        third: "rgba(0, 112, 243, 1)",
      };
      updateColors(colors);
    },
    [updateColors]
  );

  // Use window animation hook for all windows
  const { windows, openWindow, closeWindow, updatePosition } =
    useWindowAnimations({
      "flickr-gallery-window": { finalPosition: baseFinalPosition },
      "spotify-player-window": { finalPosition: baseFinalPosition },
      "resume-window": { finalPosition: baseFinalPosition },
      "amazon-window": { finalPosition: baseFinalPosition },
      "radiosity-window": { finalPosition: baseFinalPosition },
      "pantonify-window": { finalPosition: baseFinalPosition },
      "light-window": { finalPosition: baseFinalPosition },
    });

  // Extract window states for easier access
  const flickrWindow = windows["flickr-gallery-window"] || baseLocation;
  const spotifyWindow = windows["spotify-player-window"] || baseLocation;
  const resumeWindow = windows["resume-window"] || baseLocation;
  const amazonWindow = windows["amazon-window"] || baseLocation;
  const radiosityWindow = windows["radiosity-window"] || baseLocation;
  const pantonifyWindow = windows["pantonify-window"] || baseLocation;
  const lightWindow = windows["light-window"] || baseLocation;
  const isAllClosed =
    !flickrWindow.isOpen &&
    !spotifyWindow.isOpen &&
    !resumeWindow.isOpen &&
    !amazonWindow.isOpen &&
    !radiosityWindow.isOpen &&
    !pantonifyWindow.isOpen &&
    !lightWindow.isOpen;

  // Sync window states with URL
  useWindowUrlSync({
    windows,
    zIndices,
    urlMap: WINDOW_URL_MAP,
    openWindow,
    bringWindowToFront,
  });

  // Update fractal colors when windows change (including URL changes)
  useEffect(() => {
    // Find the topmost open window (highest z-index)
    const openWindows = Object.entries(windows)
      .filter(([_, state]) => state.isOpen)
      .map(([key, _]) => key as WindowKey);

    if (openWindows.length > 0) {
      // Sort by z-index to get the topmost window
      const sortedWindows = openWindows.sort((a, b) => {
        const zIndexA = zIndices[a] || 0;
        const zIndexB = zIndices[b] || 0;
        return zIndexB - zIndexA; // Descending order
      });
      const topmostWindow = sortedWindows[0];
      if (topmostWindow) {
        updateFractalColorsForWindow(topmostWindow);
      }
    }
  }, [windows, zIndices, updateFractalColorsForWindow]);

  const openWindowByKey = (window: WindowKey) => {
    openWindow(window, buttonRef);

    bringWindowToFront(window);
    if (viewportDimensions.width < 1000) {
      setWindowDimensions(window, {
        width: viewportDimensions.width,
        height: viewportDimensions.height,
      });
    }
  };

  const handleWindowFocus = useCallback(
    (windowKey: WindowKey) => {
      bringWindowToFront(windowKey);
    },
    [bringWindowToFront]
  );

  const closeWindowByKey = useCallback(
    (windowKey: WindowKey) => {
      closeWindow(windowKey);
    },
    [closeWindow]
  );

  // Handler to save window dimensions to localStorage
  const handleDimensionChange = useCallback(
    (windowKey: WindowKey) =>
      (dimensions: { width: number; height: number }) => {
        setWindowDimensions(windowKey, dimensions);
      },
    [setWindowDimensions]
  );

  // Handler to update window position after resize
  const handlePositionChange = useCallback(
    (windowKey: WindowKey) => (newPosition: { x: number; y: number }) => {
      updatePosition(windowKey, newPosition);
    },
    [updatePosition]
  );

  // Helper to get common window props
  const getWindowProps = useCallback(
    (windowKey: WindowKey, windowState: typeof flickrWindow) => ({
      position: windowState.currentPosition,
      zIndex: getWindowZIndex(windowKey),
      onFocus: () => handleWindowFocus(windowKey),
      onClose: () => closeWindowByKey(windowKey),
      originPosition: windowState.originPosition,
      initialDimensions: getWindowDimensions(windowKey),
      onDimensionChange: handleDimensionChange(windowKey),
      onPositionChange: handlePositionChange(windowKey),
    }),
    [
      getWindowZIndex,
      handleWindowFocus,
      closeWindowByKey,
      getWindowDimensions,
      handleDimensionChange,
      handlePositionChange,
    ]
  );

  // Custom drag end handler that updates both systems
  const handleWindowDragEnd = useCallback(
    (event: DragEndEvent) => {
      handleDragEnd(event);

      // Update the window animation position after drag
      const windowKey = event.active.id as string;
      if (event.delta && windows[windowKey]) {
        const currentPos = windows[windowKey].currentPosition;

        // Get the window element to check its dimensions
        const windowElement = document.getElementById(windowKey);

        // If we can't get the element, use default values
        if (!windowElement) {
          updatePosition(windowKey, {
            x: currentPos.x + event.delta.x,
            y: currentPos.y + event.delta.y,
          });
          return;
        }

        // Get actual current dimensions from the DOM element
        const rect = windowElement.getBoundingClientRect();
        const windowWidth = rect.width;
        const windowHeight = rect.height;

        // Calculate new position with boundary constraints
        let newX = currentPos.x + event.delta.x;
        let newY = currentPos.y + event.delta.y;

        // Constrain to viewport boundaries (all sides)
        // Positions are in viewport coordinates, so we need to account for container padding
        const minX = CONTAINER_PADDING;
        const minY = CONTAINER_PADDING;
        // Right edge should not exceed viewport width minus padding
        const maxX = window.innerWidth - CONTAINER_PADDING - windowWidth;
        const maxY = window.innerHeight - CONTAINER_PADDING - windowHeight;

        // Apply constraints
        newX = Math.max(minX, Math.min(newX, maxX));
        newY = Math.max(minY, Math.min(newY, maxY));

        const newPosition = { x: newX, y: newY };
        updatePosition(windowKey, newPosition);
      }
    },
    [handleDragEnd, windows, updatePosition]
  );
  if (viewportDimensions.width < 1000 && viewportDimensions.height < viewportDimensions.width) {
    return <FractalHaze>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.2, ease: "easeOut" }} className="flex flex-col justify-center items-center h-screen gap-4">
        <p className="text-2xl">Please rotate your device to portrait mode</p>
        <RotateCcwSquare />
      </motion.div>
    </FractalHaze>
  }
  return (
    <FractalHaze backgroundNodeColors={fractalColors}>
      <DndContext sensors={sensors} onDragEnd={handleWindowDragEnd}>
        {/* Content overlay */}
        <div
          id="home-content"
          className="w-full h-screen flex flex-col items-center justify-center relative"
        >
          <Nav
            buttonRef={buttonRef}
            openWindow={openWindowByKey}
            isAllClosed={isAllClosed}
            onNavItemClick={updateFractalColorsForWindow}
          />
          {/* Render gallery only when open */}
          {flickrWindow.isOpen && (
            <FlickrGallery
              {...getWindowProps("flickr-gallery-window", flickrWindow)}
            />
          )}

          {/* Render Spotify player */}
          {spotifyWindow.isOpen && (
            <SpotifyPlayer
              {...getWindowProps("spotify-player-window", spotifyWindow)}
              originPosition={spotifyWindow.originPosition || undefined}
            />
          )}

          {/* Display error alert if there's an error */}
          {flickrError && (
            <Alert title="Error loading photos" variant="error">
              <p>{flickrError.message}</p>
            </Alert>
          )}

          {/* Render resume window */}
          {resumeWindow.isOpen && (
            <Resume {...getWindowProps("resume-window", resumeWindow)} />
          )}

          {/* Render amazon window */}
          {amazonWindow.isOpen && (
            <AmazonWindow {...getWindowProps("amazon-window", amazonWindow)} />
          )}

          {/* Render radiosity window */}
          {radiosityWindow.isOpen && (
            <RadiosityWindow
              {...getWindowProps("radiosity-window", radiosityWindow)}
            />
          )}

          {/* Render pantonify window */}
          {pantonifyWindow.isOpen && (
            <PantonifyWindow
              {...getWindowProps("pantonify-window", pantonifyWindow)}
            />
          )}
          {/* Render light window */}
          {lightWindow.isOpen && (
            <LightWindow {...getWindowProps("light-window", lightWindow)} />
          )}
        </div>
      </DndContext>
    </FractalHaze>
  );
}

export default Home;
