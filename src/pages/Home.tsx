import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useRef, useMemo, useCallback } from "react";
import { useDraggableWindows } from "../hooks/useDraggableWindows";
import { useFlickrGallery } from "../jotai/hooks";
import { useWindowAnimations } from "../hooks/useWindowAnimation";
import FlickrGallery from "../windows/flickr-gallery";
import Alert from "../components/alert";
import Nav from "../components/nav";
import SpotifyNowPlaying from "../components/spotify-window";
import Projects from "../windows/flickr-gallery/projects";

export type WindowKey =
  | "flickr-gallery-window"
  | "spotify-player-window"
  | "projects-window"
  | "resume-window";

function Home() {
  const buttonRef = useRef<HTMLButtonElement>(null);

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
  const projectsFinalPosition = useMemo(
    () => ({
      x: 16,
      y: 48,
    }),
    []
  );
  const resumeFinalPosition = useMemo(
    () => ({
      x: 16,
      y: 64,
    }),
    []
  );

  // Manage draggable window positions and z-indices
  const { handleDragEnd, bringWindowToFront, getWindowZIndex } =
    useDraggableWindows({
      "flickr-gallery-window": flickrFinalPosition,
      "spotify-player-window": spotifyFinalPosition,
      "projects-window": projectsFinalPosition,
      "resume-window": resumeFinalPosition,
    });

  // Get Flickr gallery state from atoms
  const { flickrError } = useFlickrGallery();

  // Use window animation hook for all windows
  const { windows, openWindow, closeWindow, updatePosition } =
    useWindowAnimations({
      "flickr-gallery-window": { finalPosition: flickrFinalPosition },
      "spotify-player-window": { finalPosition: spotifyFinalPosition },
      "projects-window": { finalPosition: projectsFinalPosition },
      "resume-window": { finalPosition: resumeFinalPosition },
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
  const projectsWindow = windows["projects-window"] || {
    isOpen: false,
    originPosition: null,
    currentPosition: projectsFinalPosition,
  };
  const isAllClosed =
    !flickrWindow.isOpen && !spotifyWindow.isOpen && !projectsWindow.isOpen;

  const openWindowByKey = (window: WindowKey) => {
    openWindow(window, buttonRef);
    bringWindowToFront(window);
  };

  // Custom drag end handler that updates both systems
  const handleWindowDragEnd = useCallback(
    (event: DragEndEvent) => {
      handleDragEnd(event);

      // Update the window animation position after drag
      const windowKey = event.active.id as string;
      if (event.delta && windows[windowKey]) {
        const currentPos = windows[windowKey].currentPosition;
        const newPosition = {
          x: currentPos.x + event.delta.x,
          y: currentPos.y + event.delta.y,
        };
        updatePosition(windowKey, newPosition);
      }
    },
    [handleDragEnd, windows, updatePosition]
  );

  return (
    <DndContext onDragEnd={handleWindowDragEnd}>
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
            onFocus={() => bringWindowToFront("flickr-gallery-window")}
            onClose={() => closeWindow("flickr-gallery-window")}
            originPosition={flickrWindow.originPosition}
          />
        )}

        {/* Render Spotify player */}
        {spotifyWindow.isOpen && (
          <SpotifyNowPlaying
            position={spotifyWindow.currentPosition}
            zIndex={getWindowZIndex("spotify-player-window")}
            onFocus={() => bringWindowToFront("spotify-player-window")}
            onClose={() => closeWindow("spotify-player-window")}
            originPosition={spotifyWindow.originPosition || undefined}
          />
        )}

        {/* Display error alert if there's an error */}
        {flickrError && (
          <Alert title="Error loading photos" variant="error">
            <p>{flickrError.message}</p>
          </Alert>
        )}

        {/* Render Projects window */}
        {projectsWindow.isOpen && (
          <Projects
            position={projectsWindow.currentPosition}
            zIndex={getWindowZIndex("projects-window")}
            onFocus={() => bringWindowToFront("projects-window")}
            onClose={() => closeWindow("projects-window")}
            originPosition={projectsWindow.originPosition}
          />
        )}
      </div>
    </DndContext>
  );
}

export default Home;
