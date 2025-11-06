import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import type { NavFanItem } from "./index";

interface HorizontalMenuProps {
  items: NavFanItem[];
  showFan: boolean;
  setShowFan: (show: boolean) => void;
}

export function HorizontalMenu({
  items,
  showFan,
  setShowFan,
}: HorizontalMenuProps) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {showFan && (
        <>
          {/* Click-away backdrop */}
          <motion.div
            className="fixed inset-0 z-999"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFan(false)}
          />

          <motion.div
            className="fixed left-0 right-0 flex items-center justify-center gap-4 z-1001"
            style={{ bottom: "120px" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {items.map((item, index) => (
              <motion.button
                key={item.id}
                className="flex items-center justify-center gap-2 px-3 py-1 bg-grey/10 backdrop-blur-3xl dark:hover:bg-white/20 hover:bg-black/20 rounded-3xl border dark:border-white/20 border-black/20 dark:text-white text-sm pointer-events-auto transition-colors duration-200 w-40"
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                  y: 20,
                }}
                transition={{
                  duration: 0.25,
                  delay: index * 0.05,
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
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
