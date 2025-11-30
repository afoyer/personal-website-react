export const styles: Record<string, React.CSSProperties> = {
  // 1. The Main Wrapper
  container: {
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden", // Prevents blobs from creating scrollbars
  },

  // 2. The Layer Holding the Blobs
  background: {
    position: "absolute",
    inset: 0, // Shorthand for top:0, right:0, bottom:0, left:0
    opacity: 0.8, // Slight transparency to blend with black bg
  },

  // 3. The Animated Color Circles
  blob: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    filter: "blur(80px)", // Critical: creates the soft gradient look
    mixBlendMode: "screen", // Critical: makes overlapping colors brighter
  },

  // 4. The "Fractal Glass" Layer
  glassOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10, // Ensures this sits ON TOP of the blobs

    // The Magic: Combines standard blur with the SVG distortion map
    backdropFilter: "blur(10px) url(#fractal-noise-glass)",
    WebkitBackdropFilter: "blur(10px) url(#fractal-noise-glass)",
  },

  // 5. The Title Text
  text: {
    fontFamily: "sans-serif",
    fontSize: "4rem",
    fontWeight: "bold",
    color: "white",
    textShadow: "0 4px 30px rgba(0,0,0,0.5)", // Adds depth to text
    zIndex: 20,
    pointerEvents: "none", // Clicks pass through to elements behind
  },
};
