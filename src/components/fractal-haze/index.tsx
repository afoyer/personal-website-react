import { motion } from "framer-motion";
import { styles } from "./styles";
import { useTheme } from "../../jotai/hooks";

const FractalHaze = ({
  children,
  backgroundNodeColors = {
    first: "rgba(255, 0, 128, 1)",
    second: "rgba(121, 40, 202, 1)",
    third: "rgba(0, 112, 243, 1)",
  },
}: {
  children: React.ReactNode;
  backgroundNodeColors?: { first: string; second: string; third: string };
}) => {
  const { theme } = useTheme();
  return (
    <motion.div
      style={styles.container}
      initial={{ backgroundColor: theme === "dark" ? "#000" : "#fff" }}
      animate={{ backgroundColor: theme === "dark" ? "#000" : "#fff" }}
      transition={{ duration: 0.2 }}
    >
      {/* 1. The Fractal Filter Definition */}
      {/* This SVG is hidden but defines the filter we will use in CSS */}
      <svg style={{ position: "absolute", width: "100%", height: "100%" }}>
        <defs>
          <filter id="fractal-noise-glass">
            {/* Generate the noise texture. 
                  baseFrequency: Controls the 'zoom' of the crystals (lower = larger chunks).
                  numOctaves: Controls the detail/grain. */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.0015"
              numOctaves="3"
              result="noise"
            />
            {/* Use the noise to distort the background image (SourceGraphic).
                  scale: Controls the intensity of the distortion. */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* 2. Animated Background Blobs */}
      <div style={styles.background}>
        <motion.div
          style={{
            ...styles.blob,
            top: "0%",
            left: "20%",
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.2, 0.9, 1],
            background: backgroundNodeColors.first,
          }}
          transition={{
            x: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 20, repeat: Infinity, ease: "linear" },
            background: { duration: 1.5, ease: "easeInOut" },
          }}
        />
        <motion.div
          style={{
            ...styles.blob,
            top: "20%",
            right: "20%",
          }}
          animate={{
            x: [0, -70, 30, 0],
            y: [0, 80, -40, 0],
            scale: [1, 1.1, 0.8, 1],
            background: backgroundNodeColors.second,
          }}
          transition={{
            x: { duration: 25, repeat: Infinity, ease: "linear" },
            y: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 25, repeat: Infinity, ease: "linear" },
            background: { duration: 1.5, ease: "easeInOut" },
          }}
        />
        <motion.div
          style={{
            ...styles.blob,
            bottom: "20%",
            left: "30%",
          }}
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.3, 0.9, 1],
            background: backgroundNodeColors.third,
          }}
          transition={{
            x: { duration: 22, repeat: Infinity, ease: "linear" },
            y: { duration: 22, repeat: Infinity, ease: "linear" },
            scale: { duration: 22, repeat: Infinity, ease: "linear" },
            background: { duration: 1.5, ease: "easeInOut" },
          }}
        />
      </div>

      {/* 3. The Fractal Glass Overlay */}
      <div style={styles.glassOverlay}>{children}</div>
    </motion.div>
  );
};

export default FractalHaze;
