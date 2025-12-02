import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { styles } from "./styles";
import { useTheme } from "../../jotai/hooks";

const AnimatedBlob = ({
  initialPosition,
  color,
}: {
  initialPosition: React.CSSProperties;
  color: string;
}) => {
  const controls = useAnimation();

  // Handle random movement
  useEffect(() => {
    const moveRandomly = async () => {
      const randomX = Math.random() * 100 - 50; // -50% to 50%
      const randomY = Math.random() * 100 - 50; // -50% to 50%
      const randomScale = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
      const duration = 5 + Math.random() * 5; // 20s to 40s

      await controls.start({
        x: `${randomX}%`,
        y: `${randomY}%`,
        scale: randomScale,
        transition: {
          duration: duration,
          ease: "easeInOut",
        },
      });

      moveRandomly();
    };

    moveRandomly();
  }, [controls]);

  return (
    <motion.div
      style={{
        ...styles.blob,
        ...initialPosition,
      }}
      animate={controls}
      whileHover={{ scale: 1.1 }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
        }}
        animate={{ backgroundColor: color }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

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
        <AnimatedBlob
          initialPosition={{ top: "0%", left: "20%" }}
          color={backgroundNodeColors.first}
        />
        <AnimatedBlob
          initialPosition={{ top: "20%", right: "20%" }}
          color={backgroundNodeColors.second}
        />
        <AnimatedBlob
          initialPosition={{ bottom: "20%", left: "30%" }}
          color={backgroundNodeColors.third}
        />
        <AnimatedBlob
          initialPosition={{ bottom: "50%", left: "70%" }}
          color={backgroundNodeColors.third}
        />
      </div>

      {/* 3. The Fractal Glass Overlay */}
      <div style={styles.glassOverlay}>{children}</div>
    </motion.div>
  );
};

export default FractalHaze;
