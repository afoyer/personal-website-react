import { motion } from "motion/react";

export default function Spinner() {
  return (
    <motion.div
      style={{
        border: "4px solid #e5e7eb",
        borderTop: "4px solid #6366f1",
        borderRadius: "50%",
        width: 36,
        height: 36,
        margin: "auto",
        display: "block",
      }}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        ease: "linear",
        duration: 1,
      }}
      aria-label="Loading"
    />
  );
}
