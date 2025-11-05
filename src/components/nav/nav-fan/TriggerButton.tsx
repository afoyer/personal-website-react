import { motion } from "motion/react";
import { ReactNode } from "react";

interface TriggerButtonProps {
  children: ReactNode;
  onClick: () => void;
  hoverBackgroundColor: string;
  backgroundColor: string;
  delay: number;
  className: string;
  isActive: boolean;
}

export function TriggerButton({
  children,
  onClick,
  hoverBackgroundColor,
  backgroundColor,
  delay,
  className,
  isActive,
}: TriggerButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center gap-2 px-2 sm:px-3 md:px-4 py-2 bg-white/10 hover:bg-white/20 rounded-4xl border border-white/20 text-white transition-all duration-200 relative z-10 ${className}`}
      whileHover={{
        scale: 1.05,
        backgroundColor: hoverBackgroundColor,
      }}
      animate={{
        backgroundColor: isActive ? hoverBackgroundColor : backgroundColor,
        opacity: 1,
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.1, delay }}
    >
      {children}
    </motion.button>
  );
}
