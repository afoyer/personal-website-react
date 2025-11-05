import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import type { NavFanItem } from "./index";

interface FullScreenMenuProps {
  items: NavFanItem[];
  showFan: boolean;
  setShowFan: (show: boolean) => void;
  calculateItemPosition: (
    index: number,
    total: number
  ) => { x: number; y: number };
}

export function FullScreenMenu({
  items,
  showFan,
  setShowFan,
  calculateItemPosition,
}: FullScreenMenuProps) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {showFan && (
        <>
          {/* Backdrop blur layer */}
          <motion.div
            className="fixed inset-0 backdrop-blur-3xl z-9998"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Dark overlay with content */}
          <motion.div
            className="fixed inset-0 bg-black/80 z-9999 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowFan(false)}
          >
            {/* Close button */}
            <motion.button
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setShowFan(false);
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </motion.button>

            <div className="relative flex items-center justify-center">
              {items.map((item, index) => {
                const { y } = calculateItemPosition(index, items.length);

                return (
                  <motion.button
                    key={item.id}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-3xl border border-white/20 text-white text-lg pointer-events-auto transition-colors duration-200 w-64 absolute left-1/2 -translate-x-1/2"
                    style={{
                      transformOrigin: "center center",
                    }}
                    initial={{
                      y: y + 50,
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      y,
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      y: y + 50,
                      opacity: 0,
                      scale: 0.8,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      item.onClick?.();
                      setShowFan(false);
                    }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon && <span className="shrink-0">{item.icon}</span>}
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
