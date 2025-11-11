import { Suspense } from "react";
import DraggableWindow, {
  DraggableWindowProps,
} from "../../components/draggable-window";
import ImageFetcher from "../../components/image-fetcher";
import Spinner from "../../components/spinner";

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
      <div className="container flex flex-col items-center justify-center gap-4">
        <h2 className="superscore-vf text-xl pt-4">Introduction</h2>
        <div className="flex flex-col justify-center gap-4 px-0 ">
          <p className="futura-regular text-sm">
            My partner and I were trying to brainstorm what a good project for
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
          <p className="futura-regular text-sm pt-4">
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

        <iframe
          className="w-full h-full min-h-[315px] max-w-3xl"
          src="https://www.youtube-nocookie.com/embed/HUUy67lb5YA?si=MDOeI5VCiuOW2a2C"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </Suspense>
    </div>
  );
}

export default RadiosityWindow;
