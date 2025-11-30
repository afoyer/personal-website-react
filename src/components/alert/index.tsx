import { motion } from "motion/react";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

interface AlertProps {
  title?: string;
  children: React.ReactNode;
  variant?: "warning" | "error" | "info" | "success";
  className?: string;
}

const Alert = ({
  title,
  children,
  variant = "error",
  className = "",
}: AlertProps) => {
  const [showHeader, setShowHeader] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show header after container animation starts
    const headerTimer = setTimeout(() => setShowHeader(true), 200);
    // Show content after header appears
    const contentTimer = setTimeout(() => setShowContent(true), 500);

    return () => {
      clearTimeout(headerTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  const variantStyles = {
    warning: {
      bg: "bg-amber-50 dark:bg-amber-900/20",
      border: "border-amber-200 dark:border-amber-800",
      text: "text-grey-800 dark:text-grey-200",
      icon: "text-grey-600 dark:text-grey-400",
    },
    error: {
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-200 dark:border-red-800",
      text: "text-red-200 dark:text-red-800",
      icon: "text-red-400 dark:text-red-600",
    },
    info: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-800 dark:text-blue-200",
      icon: "text-blue-600 dark:text-blue-400",
    },
    success: {
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
      text: "text-green-400 dark:text-green-800",
      icon: "text-green-200 dark:text-green-600",
    },
  };

  const styles = variantStyles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1], // Custom easing for smooth flow
      }}
      className={`rounded-lg border ${styles.bg} ${styles.border} ${styles.text} p-4 shadow-lg backdrop-blur-sm w-fit max-w-md ${className} rounded-lg`}
    >
      <div className="flex gap-3">
        {/* Warning Icon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.1,
            duration: 0.5,
            ease: [0.34, 1.56, 0.64, 1], // Bounce effect
          }}
          className={`flex-shrink-0 ${styles.icon}`}
        >
          <AlertTriangle className="h-5 w-5" />
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          {title && (
            <motion.h3
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: showHeader ? 1 : 0, x: showHeader ? 0 : -10 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              className="font-semibold text-sm mb-1.5"
            >
              {title}
            </motion.h3>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: showContent ? 1 : 0, x: showContent ? 0 : -10 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            className="text-sm leading-relaxed"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Alert;
