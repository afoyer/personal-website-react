import DraggableWindow, {
  DraggableWindowProps,
} from "../../components/draggable-window";
import LightSvg from "./svg";
import "./index.css";
import { motion } from "motion/react";
import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchLightDrawingImages } from "../../utils/lightDrawingApi";
import Spinner from "../../components/spinner";

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
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
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
      </div>
    </>
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
      className="light-container w-full h-full flex items-center justify-center relative"
    >
      <LightSvg />
      {/* Images that spread out from center on hover */}
      {images.slice(0, 6).map((image, index) => {
        const angle = index * 60 * (Math.PI / 180); // Convert to radians, 60 degrees apart
        const distance = 200; // Distance to spread out

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
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="absolute"
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "4px",
              left: "50%",
              top: "50%",
              marginLeft: "-12px",
              marginTop: "-12px",
              objectFit: "cover",
            }}
          />
        );
      })}
    </motion.div>
  );
}

export default LightWindow;
