import { motion } from "motion/react";
import DraggableWindow, {
  DraggableWindowProps,
} from "../../components/draggable-window";
import "./index.css";

function AmazonWindow(
  props: DraggableWindowProps & {
    originPosition?: { x: number; y: number } | null;
  }
) {
  // Fetch resume from Amplify Storage using React Query
  // Assumes `Storage` from aws-amplify is available in the global import scope
  // and react-query's `useQuery` is available in global import scope.

  return (
    <DraggableWindow
      {...props}
      title="Amazon"
      id="amazon-window"
      initial={{
        opacity: 0,
        scale: props.originPosition ? 0 : 1,
      }}
    >
      <AmazonWindowContent />
    </DraggableWindow>
  );
}

function AmazonWindowContent() {
  return (
    <div>
      <div className="flex justify-center items-center py-8 w-full">
        <motion.h1
          className="ember text-7xl font-bold text-amber-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          Amazon
        </motion.h1>
      </div>
      <motion.div
        className="items-center px-8 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.p className="text-2xl font-bold mb-4">
          A journey of discovery
        </motion.p>
        <motion.p className="text-2xl font-bold ">
          A journey of discovery
        </motion.p>
        <motion.p className="text-2xl font-bold ">
          A journey of discovery
        </motion.p>
      </motion.div>
    </div>
  );
}

export default AmazonWindow;
