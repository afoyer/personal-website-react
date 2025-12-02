import { Suspense } from "react";
import DraggableWindow, {
  DraggableWindowProps,
} from "../../components/draggable-window";
import ImageFetcher from "../../components/image-fetcher";
import Spinner from "../../components/spinner";
import { motion } from "motion/react";
import { Code } from "lucide-react";
import { Popover } from "@/components/popover";

function RadiosityWindow(
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
      title="Radiosity"
      id="radiosity-window"
      initial={{
        opacity: 0,
        scale: props.originPosition ? 0 : 1,
      }}
      className="bg-linear-to-b from-blue-400 to-red-400 dark:from-blue-800 dark:to-red-800 text-gray-800 dark:text-gray-100"
    >
      <RadiosityWindowContent />
    </DraggableWindow>
  );
}

function RadiosityWindowContent() {
  return (
    <div className="flex flex-col items-center justify-center py-4 px-8 gap-4">
      <h1 className="superscore-vf text-4xl ">Radiosity</h1>
      <h3 className="superscore-vf text-xs text-gray-300 dark:text-gray-200">
        Aymeric Foyer and Kon Aoki
      </h3>
      <div className="container flex flex-col items-center gap-4 max-w-[600px]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2, ease: "easeInOut" }} className="w-full">
          <h2 className="superscore-vf text-xl pt-4">Introduction</h2>
        </motion.div>
        <div className="flex flex-col justify-center gap-4 px-0 futura-regular">
          <p className="text-sm">
            My teammate and I were trying to brainstorm what a good project for
            our computer graphics course would be until we both stumbled on{" "}
            <a
              className="linkhover"
              rel="noopener noreferrer"
              href="https://en.wikipedia.org/wiki/Global_illumination"
              target="_blank"
            >
              Global Illumination
            </a>
            . So we had to try this out and figure out how to build it.
          </p>
          <p className="text-sm pt-4">
            The{" "}
            <a
              className="text-blue-500 hover:text-blue-600"
              rel="noopener noreferrer"
              href="https://www.coloradocollege.edu/basics/blockplan/"
              target="_blank"
            >
              block plan
            </a>{" "}
            makes everything faster pace, which means we had 5 days from coming
            up with this project to finishing this project.
          </p>
        </div>
      </div>
      <div className="container flex flex-col items-center gap-4 max-w-[600px]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2, ease: "easeInOut" }} className="w-full">
          <h2 className="superscore-vf text-xl pt-4">Rendering</h2>
        </motion.div>
        <div className="flex flex-col justify-center gap-4 px-0 futura-regular">
          <p className="text-sm">
            Each point on the scene can emit its own light, which is initially fed from the light source. As each generation is rendered
            ,the light is recalculated based on the light emitted by every previous point and how they affect other points in the scene, but with a {" "}
            <Popover trigger="click" content={<p>The ratio of energy (in this case, light) emitted by a point to how much light it currently contains</p>}>flux value</Popover> to diminish
            the amount of light emitted by each point.
          </p>

        </div>
      </div>
      <Suspense fallback={<Spinner />}>
        <div className="flex items-center justify-center flex-wrap gap-4 px-0 @md:px-10 w-full">
          <ImageFetcher
            suspense
            folder="radiosity"
            fileName="dotpanesketch.jpg"
            className="rounded-lg shadow-2xl w-full max-w-[600px] grow shrink basis-[200px]"
            description="A sketch of the dot pane design."
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }}
          />

          <ImageFetcher
            suspense
            folder="radiosity"
            fileName="codesnippet.png"
            className="rounded-lg shadow-2xl w-full max-w-[600px] grow shrink basis-[200px]"
            description="A code snippet describing light calculations."
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }}
          />
        </div>
      </Suspense>

      <h2 className="superscore-vf text-xl pt-4">Video Demo</h2>
      <iframe
        className="w-full h-full min-h-[315px] max-w-3xl"
        src="https://www.youtube-nocookie.com/embed/HUUy67lb5YA?si=MDOeI5VCiuOW2a2C"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <div className="flex flex-col justify-center gap-4 px-0 futura-regular max-w-[600px]">
        <p className="text-sm pt-4">
          We learned a lot from this project. We learned how to implement
          global illumination and how to use it to create a realistic image,
          all while keeping our single threaded application running fast. This was at a cost though,
          as pre-rendering this scene would take a significant amount of time, depending on
          how many generation steps we wanted to take.
        </p>
      </div>
      <div className="flex flex-col justify-center gap-4 px-0 futura-regular max-w-[600px]">
        <motion.a whileHover={{ scale: 1.1 }} href="https://github.com/afoyer/GlobalIllumination-Radiosity" target="_blank" rel="noopener noreferrer">
          <Code className="w-6 h-6" />
        </motion.a>
      </div>
    </div>
  );
}

export default RadiosityWindow;
