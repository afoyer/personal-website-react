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
import { ArrowDown } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/carousel";
import ImageFetcher from "@/components/image-fetcher";

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
  const { data: images } = useSuspenseQuery({
    queryKey: ["light-drawing-images"],
    queryFn: fetchLightDrawingImages,
  });
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
    <div
      ref={containerRef}
      className="container futura-regular relative w-full"
    >
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
            className="text-white text-2xl pb-32 tracking-[0.5em]"
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut", delay: 0.5 }}
          >
            A PRESENCE OF LIGHT
          </motion.p>
        </div>
        <div className="flex flex-col p-8 items-center w-full h-full">
          <p className="text-white text-2xl pb-8">
            The initial goal of this project was to explore how light can be a
            real presence within our world, as well as being a physical and
            mathematical constant.
          </p>
          <p className="text-white text-2xl">
            By exploring the interactions of light through reflections, this
            thought led to experimentation through long exposures to reveal
            light trails and its effects on the environment using reflections
            and highlights.
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <motion.p
          className="text-white text-2xl pb-8 tracking-[0.5em]"
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut", delay: 0.5 }}
        >
          PROCESS
        </motion.p>
      </div>
      <div className="flex flex-row justify-center items-center w-full h-full gap-4 p-8 flex-wrap">
        <div className="flex flex-col gap-4 grow shrink basis-[200px]">
          <p>
            LED strips, power banks, and tripods were set up to frame shots over
            twilight to show a sense of setting mood while making the creations
            rise from the setting light.
          </p>
          <p>
            Thirty second exposures would be created to ensure the vanishing
            human presence within each frame, allowing for the shapes to fully
            take presence.
          </p>
        </div>
        <div className="w-full max-w-md pb-16 grow shrink basis-[200px]">
          <ImageFetcher
            suspense
            folder="light-drawing/materials"
            fileName="test-pic.jpg"
            className="w-full max-w-md"
            description="Test picture of the light drawing process."
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <motion.p
          className="text-white text-2xl pb-8 tracking-[0.5em]"
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut", delay: 0.5 }}
        >
          RESULT
        </motion.p>
      </div>
      <div className="w-full pb-16 flex flex-col justify-center items-center">
        <ImageFetcher
          folder="light-drawing/materials"
          fileName="prints.jpg"
          className="w-full max-w-md"
          suspense
          description="Prints of the light drawing process."
        />
        <p className="text-white p-8">
          Ten prints 16x20 prints were created to show the process of the light
          drawing in various sections of Saint Louis, Missouri.
        </p>
      </div>
      {images.length > 0 && (
        <div className="flex flex-col items-center justify-center gap-4">
          <Carousel className="w-full max-w-md pb-16">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <img
                    src={image.url}
                    alt={image.key}
                    height={200}
                    className="w-full"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
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
      className="futura-regular light-container w-full h-full flex flex-col items-center justify-center relative"
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
