import { motion, AnimatePresence } from "motion/react";
import type { NavFanItem } from "./index";

interface ArcMenuProps {
  items: NavFanItem[];
  showFan: boolean;
  setShowFan: (show: boolean) => void;
  calculateItemPosition: (
    index: number,
    total: number
  ) => { x: number; y: number };
}

export function ArcMenu({
  items,
  showFan,
  setShowFan,
  calculateItemPosition,
}: ArcMenuProps) {
  return (
    <>
      {/* Click-away backdrop */}
      <AnimatePresence>
        {showFan && (
          <div
            className="fixed inset-0 z-999"
            onClick={() => setShowFan(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        transition={{ delayChildren: 0.1 }}
        className="absolute top-1/2 left-[-20px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <AnimatePresence>
          {showFan &&
            items.map((item, index) => {
              const { x, y } = calculateItemPosition(index, items.length);

              return (
                <motion.button
                  key={item.id}
                  className="absolute bottom-[-20px] left-0 flex items-center justify-center gap-2 px-3 py-1 bg-grey/10 backdrop-blur-3xl dark:hover:bg-white/20 hover:bg-black/20 rounded-3xl border dark:border-white/20 border-black/20 dark:text-white text-sm pointer-events-auto transition-colors duration-200 w-40"
                  style={{
                    transformOrigin: "center center",
                  }}
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 0,
                    scale: 0.5,
                  }}
                  animate={{
                    x,
                    y,
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    x: 0,
                    y: 0,
                    opacity: 0,
                    scale: 0.5,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    item.onClick?.();
                    setShowFan(false);
                  }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor:
                      item.hoverBackgroundColor || "rgba(255, 255, 255, 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </motion.button>
              );
            })}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
