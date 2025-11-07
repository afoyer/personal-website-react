import { motion } from "motion/react";
import { Suspense } from "react";
import DraggableWindow, {
  DraggableWindowProps,
} from "../../components/draggable-window";
import { getUrl } from "aws-amplify/storage";
import { useSuspenseQuery } from "@tanstack/react-query";
import Spinner from "../../components/spinner";
import { Code } from "lucide-react";
import ImageFetcher from "../../components/image-fetcher";

function PantonifyWindow(
  props: DraggableWindowProps & {
    originPosition?: { x: number; y: number } | null;
  }
) {
  return (
    <DraggableWindow
      {...props}
      title="Pantonify"
      id="pantonify-window"
      initial={{
        opacity: 0,
        scale: props.originPosition ? 0 : 1,
      }}
      className="bg-linear-to-b from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 text-gray-800 dark:text-gray-100"
    >
      <PantonifyWindowContent />
    </DraggableWindow>
  );
}

// Image components that use Suspense
function EarlyImage() {
  const { data: earlyImageUrl } = useSuspenseQuery({
    queryKey: ["pantonify-early-image"],
    queryFn: async () => {
      const result = await getUrl({
        path: "pantonify/early.png",
      });
      return result.url.toString();
    },
  });

  return (
    <>
      <motion.img
        src={earlyImageUrl}
        alt="Early version of Pantonify"
        loading="lazy"
        className="relative object-contain px-4 sm:px-6 md:px-8 pt-4 pb-1 w-full max-w-2xl shadow-2xl rounded-lg"
        style={{ zIndex: 2 }}
        initial={{ rotate: 8, x: "10%" }}
        animate={{ rotate: 8, x: "10%" }}
        whileHover={{ rotate: 5, x: "8%", scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </>
  );
}

function SplashImage() {
  const { data: earlyImageUrl } = useSuspenseQuery({
    queryKey: ["pantonify-splash-image"],
    queryFn: async () => {
      const result = await getUrl({
        path: "pantonify/splash.png",
      });
      return result.url.toString();
    },
  });

  return (
    <>
      <motion.img
        src={earlyImageUrl}
        alt="Pantonify splash screen"
        loading="lazy"
        className="relative object-contain px-4 sm:px-6 md:px-8 pt-4 pb-1 w-full max-w-2xl shadow-2xl rounded-lg"
        style={{ zIndex: 1 }}
        initial={{ rotate: -8, x: "-10%" }}
        animate={{ rotate: -8, x: "-10%" }}
        whileHover={{ rotate: -5, x: "-8%", scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </>
  );
}

function ExampleCardImage() {
  const { data: exampleCardUrl } = useSuspenseQuery({
    queryKey: ["pantonify-example-card-image"],
    queryFn: async () => {
      const result = await getUrl({
        path: "pantonify/example-card.png",
      });
      return result.url.toString();
    },
  });

  return (
    <motion.img
      className="rounded-lg shadow-2xl max-w-1/2"
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.1, rotate: 2 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      src={exampleCardUrl}
      alt="Example swatch card"
    />
  );
}

function CurrentImage() {
  const { data: currentImageUrl } = useSuspenseQuery({
    queryKey: ["pantonify-current-image"],
    queryFn: async () => {
      const result = await getUrl({
        path: "pantonify/current.png",
      });
      return result.url.toString();
    },
  });

  return (
    <motion.img
      className="rounded-lg shadow-2xl max-w-md"
      src={currentImageUrl}
      loading="lazy"
      alt="Current version of Pantonify"
    />
  );
}

function PantonifyWindowContent() {
  return (
    <div className="helvetica-neue flex flex-col justify center m-auto items-center overflow-hidden">
      <div className="flex flex-col justify-center items-center w-full mx-8 gap-8 max-w-3xl pb-[25%]">
        <motion.h1
          className="neue-helvetica-bq text-2xl font-semibold mb-4 flex justify-center items-center py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
        >
          Pantonify
        </motion.h1>
        <motion.div
          className="flex flex-col gap-2 mx-4 sm:mx-8 md:mx-16"
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.p>
            Pantonify came from a similar website called{" "}
            <a
              href="https://receiptify.herokuapp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              Receiptify
            </a>{" "}
            that allows you to view your top songs in the look of a receipt. I
            wanted to create a similar website for my own use, but with a
            different twist.
          </motion.p>
          <motion.p>
            After stumbling upon a{" "}
            <a
              href="https://www.youtube.com/watch?v=JF8UziDHqZo"
              target="_blank"
              className="text-blue-500 hover:text-blue-600"
              rel="noopener noreferrer"
            >
              Linus Tech Tips video
            </a>{" "}
            about the Pantone color swatch book they just bought to showcase
            (and the exhorbitant price that came with it), I realized I could
            create something that mimics the swatch card look.
          </motion.p>
          <motion.p>
            Starting off with an initial design through Figma, I knew two main
            things: I needed the make this site simple and I needed for it to be
            responsive. On top of that, I needed a way for users to save their
            favorite swatches created by them.
          </motion.p>
        </motion.div>
        <motion.div
          className="flex justify-center items-center flex-col gap-0 overflow-visible"
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.div className="flex justify-center items-center gap-0 w-full overflow-visible py-8">
            <Suspense
              fallback={
                <div className="flex items-center justify-center">
                  <Spinner />
                </div>
              }
            >
              <SplashImage />
              <EarlyImage />
            </Suspense>
          </motion.div>
          <motion.p className="text-center text-sm text-gray-500 dark:text-gray-400">
            The initial splash screen
          </motion.p>
        </motion.div>
        <motion.div className="flex flex-wrap md:flex-row items-center justify-center gap-4 md:gap-2 px-4">
          <motion.div
            className="flex justify-center items-center flex-col flex-wrap flex-1"
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <motion.p className="grow shrink basis-1/2 min-w-[200px]">
              After finding a set of libraries{" "}
              <a
                href="https://next-auth.js.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent hover:from-purple-500 hover:to-blue-500"
              >
                next-auth
              </a>
              ,{" "}
              <a
                href="https://github.com/alexgabe-dev/hex2pantone"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                hex2pantone
              </a>
              , and{" "}
              <a
                href="https://github.com/fast-average-color/fast-average-color"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                fast-average-color
              </a>
              , that could find the nearest Pantone color to a given hex code, I
              was able to create a simple way to generate swatches based off the
              album art of a track. With the help of the Spotify API, I was able
              to get a users top tracks from different time ranges.
            </motion.p>
          </motion.div>
          <motion.div className="flex justify-center flex-wrap items-center basis-1/2 gap-4 min-w-[200px]">
            <motion.div className="flex justify-center items-center flex-col grow flex-basis-2/3">
              <Suspense fallback={<Spinner />}>
                <ExampleCardImage />
              </Suspense>
              <motion.p className="text-center text-xs text-gray-500 dark:text-gray-400">
                An example of a generated swatch card
              </motion.p>
            </motion.div>
            <Suspense fallback={<Spinner />}>
              <ImageFetcher
                folder="pantonify"
                fileName="real-swatch.jpg"
                className="rounded-lg shadow-2xl "
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                alt="A real Pantone swatch"
                description={
                  <div>
                    <p>A real Pantone swatch.</p>
                  </div>
                }
              />
            </Suspense>
          </motion.div>
        </motion.div>
        <motion.div className="flex flex-col md:flex-row justify-center flex-wrap items-center gap-4">
          <motion.div
            variants={{ hovered: { scale: 1.1 }, hidden: { scale: 1 } }}
            whileHover={"hovered"}
            animate={"hidden"}
            className="flex justify-center flex-col items-center shrink-0"
          >
            <motion.div>
              <Suspense fallback={<Spinner />}>
                <CurrentImage />
              </Suspense>
            </motion.div>
            <motion.p className="text-center text-xs text-gray-500 dark:text-gray-400">
              A screenshot of the simplified version within this website
            </motion.p>
          </motion.div>
          <motion.p className="grow-2 px-4">
            While the original website is no longer existing to due new changes
            from the Spotify API, limiting how many users can have access to it,
            I managed to recreate a simplified version of it within this
            website.
          </motion.p>
        </motion.div>
        <motion.a
          whileHover={{ scale: 1.1 }}
          href="https://github.com/afoyer/pantonify"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Code />
        </motion.a>
      </div>
    </div>
  );
}

export default PantonifyWindow;
