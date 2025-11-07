import DraggableWindow, {
  DraggableWindowProps,
} from "../../components/draggable-window";
import LightSvg from "./svg";
import "./index.css";
import { motion } from "motion/react";

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
          {/* 6 images that spread out from center on hover */}
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const angle = index * 60 * (Math.PI / 180); // Convert to radians, 60 degrees apart
            const distance = 200; // Distance to spread out
            // Rotation angles for each card (between -75 and 75 degrees to avoid upside down)
            const rotations = [-45, 30, -60, 45, -30, 60];
            const imageSources = [
              "https://via.placeholder.com/24/FF6B6B/FFFFFF?text=1",
              "https://via.placeholder.com/24/4ECDC4/FFFFFF?text=2",
              "https://via.placeholder.com/24/45B7D1/FFFFFF?text=3",
              "https://via.placeholder.com/24/FFA07A/FFFFFF?text=4",
              "https://via.placeholder.com/24/98D8C8/FFFFFF?text=5",
              "https://via.placeholder.com/24/F7DC6F/FFFFFF?text=6",
            ];

            return (
              <motion.img
                key={index}
                src={imageSources[index]}
                alt={`Square ${index + 1}`}
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
                    rotate: rotations[index],
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
      </div>
    </>
  );
}

export default LightWindow;
