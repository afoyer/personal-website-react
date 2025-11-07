import DraggableWindow, {
  DraggableWindowProps,
} from "../../components/draggable-window";
import LightSvg from "./svg";
import "./index.css";
import { motion } from "motion/react";
import { Suspense, useRef, useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchLightDrawingImages } from "../../utils/lightDrawingApi";
import Spinner from "../../components/spinner";
import { ArrowDown, ArrowDownNarrowWide } from "lucide-react";

function LightWindow(
  props: DraggableWindowProps & {
    originPosition?: { x: number; y: number } | null;
  }
) {
  return (
    <DraggableWindow
      {...props}
      title="Light"
      id="light-window"
      initial={{
        opacity: 0,
        scale: props.originPosition ? 0 : 1,
      }}
      className="bg-linear-to-b from-black/80 to-gray-700 dark:from-gray-700 dark:to-gray-900 text-gray-800 dark:text-gray-100"
    >
      <LightWindowContent />
    </DraggableWindow>
  );
}

function LightWindowContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateHeight = () => {
      if (containerRef.current) {
        // Get the scrollable content area height (parent of this component)
        const scrollableParent = containerRef.current.closest(
          ".window-content-scrollable"
        ) as HTMLElement;
        if (scrollableParent) {
          setContentHeight(scrollableParent.clientHeight);
        }
      }
    };

    let resizeObserver: ResizeObserver | null = null;
    let scrollableParent: HTMLElement | null = null;

    // Use a small delay to ensure the parent is rendered
    const timeout = setTimeout(() => {
      updateHeight();

      // Set up ResizeObserver after initial render
      scrollableParent = containerRef.current?.closest(
        ".window-content-scrollable"
      ) as HTMLElement;

      if (scrollableParent) {
        resizeObserver = new ResizeObserver(() => {
          updateHeight();
        });
        resizeObserver.observe(scrollableParent);
        window.addEventListener("resize", updateHeight);
      }
    }, 0);

    return () => {
      clearTimeout(timeout);
      if (resizeObserver && scrollableParent) {
        resizeObserver.unobserve(scrollableParent);
      }
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Fixed SVG and images section - takes 100% of window content area height */}
      <div
        className="relative w-full"
        style={{
          height: contentHeight ? `${contentHeight}px` : "100%",
          minHeight: contentHeight ? `${contentHeight}px` : "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Suspense
          fallback={
            <div className="flex items-center justify-center w-full h-full">
              <Spinner />
            </div>
          }
        >
          <LightDrawingImages />
        </Suspense>
        <motion.div
          className="absolute bottom-8 flex justify-center items-center"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <ArrowDown stroke="white" />
        </motion.div>
      </div>
      {/* Scrollable content below */}
      <div className="w-full  bg-blend-screen pb-32">
        {/* Add your additional content here */}
        <div className="flex flex-col justify-center items-center w-full h-full mt-32">
          <motion.p
            className="text-white text-2xl pb-32"
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut", delay: 0.5 }}
          >
            A presence of light
          </motion.p>
          <motion.p
            className="text-white text-2xl"
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut", delay: 0.8 }}
          >
            A moment in time
          </motion.p>
        </div>
        <div className="flex flex-col p-8 items-center w-full h-full">
          <p className="text-white text-2xl pb-8">
            This photography project was inspired by Reuben Wu's light painting
            through the use of drones. While his capture nature in a grand sense
            and the presence of technology within them, I tried to scale the
            project down to reflect the idea of presence as an ephemeral state.
          </p>
          <p className="text-white text-2xl">
            Many of these images capture a simple shape within the urban spaces
            of Saint Louis, Missouri. The addition of water was important to
            truly ground these drawings as physical objects that exist in the
            world rather than appended to the space.
          </p>
        </div>
      </div>
    </div>
  );
}

function LightDrawingImages() {
  const { data: images } = useSuspenseQuery({
    queryKey: ["light-drawing-images"],
    queryFn: fetchLightDrawingImages,
  });

  // Rotation angles for each card (between -75 and 75 degrees to avoid upside down)
  const rotations = [-45, 30, -60, 45, -30, 60];

  return (
    <motion.div
      whileHover={"hovered"}
      initial="hidden"
      variants={{
        hidden: {},
        hovered: {},
      }}
      className="light-container w-full h-full flex flex-col items-center justify-center relative"
    >
      <LightSvg />
      {/* Images that spread out from center on hover */}
      {images.slice(0, 6).map((image, index) => {
        const angle = index * 60 * (Math.PI / 180); // Convert to radians, 60 degrees apart
        const distance = 150; // Distance to spread out

        return (
          <motion.img
            key={image.key}
            src={image.url}
            alt={`Light drawing ${index + 1}`}
            variants={{
              hidden: {
                x: 0,
                y: 0,
                opacity: 0,
                scale: 0,
                rotate: 0,
              },
              hovered: {
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                opacity: 1,
                scale: 1,
                rotate: rotations[index] || 0,
              },
            }}
            transition={{
              type: "tween",
              stiffness: 200,
              damping: 15,
            }}
            className="absolute drop-shadow-lg rounded-lg"
            style={{
              zIndex: 10,
              width: "100px",
              height: "150px",
              left: "50%",
              top: "50%",
              marginLeft: "-50px",
              marginTop: "-75px",
              objectFit: "cover",
            }}
          />
        );
      })}
    </motion.div>
  );
}

export default LightWindow;
