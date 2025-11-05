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
import { useFlickrGallery } from "../jotai/hooks";
import { useWindowAnimations } from "../hooks/useWindowAnimation";
import { useWindowUrlSync } from "../hooks/useWindowUrlSync";
import FlickrGallery from "../windows/flickr-gallery";
import Alert from "../components/alert";
import Nav from "../components/nav";
import SpotifyNowPlaying from "../components/spotify-window";
import Resume from "../windows/resume";
import { CONTAINER_PADDING } from "../App";
import AmazonWindow from "../windows/amazon";
import PantonifyWindow from "../windows/pantonify";
import RadiosityWindow from "../windows/radiosity";
import LightWindow from "../windows/light";

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
  light: "light-drawing-window",
  radiosity: "radiosity-window",
  pantonify: "pantonify-window",
};

function Home() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Track window dimensions for fullscreen windows
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  // Update dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
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

  // Calculate final position for flickr gallery
  const flickrFinalPosition = useMemo(
    () => ({
      x: 16,
      y: 16,
    }),
    []
  );
  const spotifyFinalPosition = useMemo(
    () => ({
      x: 16,
      y: 32,
    }),
    []
  );
  // Fullscreen windows: 16px padding on all sides (handled by container padding)
  // Position at 0,0 to fill container, which already has 16px padding from viewport
  const resumeFinalPosition = useMemo(
    () => ({
      x: 0,
      y: 0,
    }),
    []
  );
  const amazonFinalPosition = useMemo(
    () => ({
      x: 0,
      y: 0,
    }),
    []
  );
  const radiosityFinalPosition = useMemo(
    () => ({
      x: 16,
      y: 80,
    }),
    []
  );
  const pantonifyFinalPosition = useMemo(
    () => ({
      x: 0,
      y: 0,
    }),
    []
  );
  const lightFinalPosition = useMemo(
    () => ({
      x: 0,
      y: 0,
    }),
    []
  );

  // Manage draggable window positions and z-indices
  const { handleDragEnd, bringWindowToFront, getWindowZIndex, zIndices } =
    useDraggableWindows({
      "flickr-gallery-window": flickrFinalPosition,
      "spotify-player-window": spotifyFinalPosition,
      "resume-window": resumeFinalPosition,
      "amazon-window": amazonFinalPosition,
      "radiosity-window": radiosityFinalPosition,
      "pantonify-window": pantonifyFinalPosition,
      "light-window": lightFinalPosition,
    });

  // Get Flickr gallery state from atoms
  const { flickrError } = useFlickrGallery();

  // Use window animation hook for all windows
  const { windows, openWindow, closeWindow, updatePosition } =
    useWindowAnimations({
      "flickr-gallery-window": { finalPosition: flickrFinalPosition },
      "spotify-player-window": { finalPosition: spotifyFinalPosition },
      "resume-window": { finalPosition: resumeFinalPosition },
      "amazon-window": { finalPosition: amazonFinalPosition },
      "radiosity-window": { finalPosition: radiosityFinalPosition },
      "pantonify-window": { finalPosition: pantonifyFinalPosition },
      "light-window": { finalPosition: lightFinalPosition },
    });

  // Extract window states for easier access
  const flickrWindow = windows["flickr-gallery-window"] || {
    isOpen: false,
    originPosition: null,
    currentPosition: flickrFinalPosition,
  };
  const spotifyWindow = windows["spotify-player-window"] || {
    isOpen: false,
    originPosition: null,
    currentPosition: spotifyFinalPosition,
  };
  const resumeWindow = windows["resume-window"] || {
    isOpen: false,
    originPosition: null,
    currentPosition: resumeFinalPosition,
  };
  const amazonWindow = windows["amazon-window"] || {
    isOpen: false,
    originPosition: null,
    currentPosition: amazonFinalPosition,
  };
  const radiosityWindow = windows["radiosity-window"] || {
    isOpen: false,
    originPosition: null,
    currentPosition: radiosityFinalPosition,
  };
  const pantonifyWindow = windows["pantonify-window"] || {
    isOpen: false,
    originPosition: null,
    currentPosition: pantonifyFinalPosition,
  };
  const lightWindow = windows["light-window"] || {
    isOpen: false,
    originPosition: null,
    currentPosition: lightFinalPosition,
  };
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

  const openWindowByKey = (window: WindowKey) => {
    openWindow(window, buttonRef);
    bringWindowToFront(window);
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
        const minX = 0;
        const minY = 0;
        // Container dimensions = viewport - padding on each side
        const containerWidth = window.innerWidth - CONTAINER_PADDING * 2;
        const containerHeight = window.innerHeight - CONTAINER_PADDING * 2;
        const maxX = containerWidth - windowWidth;
        const maxY = containerHeight - windowHeight;

        // Apply constraints
        newX = Math.max(minX, Math.min(newX, maxX));
        newY = Math.max(minY, Math.min(newY, maxY));

        const newPosition = { x: newX, y: newY };
        updatePosition(windowKey, newPosition);
      }
    },
    [handleDragEnd, windows, updatePosition]
  );

  return (
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
        />
        {/* Render gallery only when open */}
        {flickrWindow.isOpen && (
          <FlickrGallery
            position={flickrWindow.currentPosition}
            zIndex={getWindowZIndex("flickr-gallery-window")}
            onFocus={() => handleWindowFocus("flickr-gallery-window")}
            onClose={() => closeWindowByKey("flickr-gallery-window")}
            originPosition={flickrWindow.originPosition}
          />
        )}

        {/* Render Spotify player */}
        {spotifyWindow.isOpen && (
          <SpotifyNowPlaying
            position={spotifyWindow.currentPosition}
            zIndex={getWindowZIndex("spotify-player-window")}
            onFocus={() => handleWindowFocus("spotify-player-window")}
            onClose={() => closeWindowByKey("spotify-player-window")}
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
          <Resume
            position={resumeWindow.currentPosition}
            zIndex={getWindowZIndex("resume-window")}
            onFocus={() => handleWindowFocus("resume-window")}
            onClose={() => closeWindowByKey("resume-window")}
            originPosition={resumeWindow.originPosition}
            width={`${windowDimensions.width}px`}
            height={`${windowDimensions.height}px`}
          />
        )}

        {/* Render amazon window */}
        {amazonWindow.isOpen && (
          <AmazonWindow
            position={amazonWindow.currentPosition}
            zIndex={getWindowZIndex("amazon-window")}
            onFocus={() => handleWindowFocus("amazon-window")}
            onClose={() => closeWindowByKey("amazon-window")}
            originPosition={amazonWindow.originPosition}
          />
        )}

        {/* Render radiosity window */}
        {radiosityWindow.isOpen && (
          <RadiosityWindow
            position={radiosityWindow.currentPosition}
            zIndex={getWindowZIndex("radiosity-window")}
            onFocus={() => handleWindowFocus("radiosity-window")}
            onClose={() => closeWindowByKey("radiosity-window")}
            originPosition={radiosityWindow.originPosition}
          />
        )}

        {/* Render pantonify window */}
        {pantonifyWindow.isOpen && (
          <PantonifyWindow
            position={pantonifyWindow.currentPosition}
            zIndex={getWindowZIndex("pantonify-window")}
            onFocus={() => handleWindowFocus("pantonify-window")}
            onClose={() => closeWindowByKey("pantonify-window")}
            originPosition={pantonifyWindow.originPosition}
          />
        )}
        {/* Render light window */}
        {lightWindow.isOpen && (
          <LightWindow
            position={lightWindow.currentPosition}
            zIndex={getWindowZIndex("light-window")}
            onFocus={() => handleWindowFocus("light-window")}
            onClose={() => closeWindowByKey("light-window")}
            originPosition={lightWindow.originPosition}
          />
        )}
      </div>
    </DndContext>
  );
}

export default Home;
