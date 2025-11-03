import { useQuery } from "@tanstack/react-query";
import { fetchFlickrPhotos } from "../utils/flickrApi";
import { motion } from "motion/react";
import FlickrGallery from "../components/FlickrGallery";
import Alert from "../components/alert";

function Home() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["flickr-photos"],
    queryFn: () =>
      fetchFlickrPhotos({
        per_page: 50,
        sort: "date-posted-desc",
      }),
  });

  return (
    <>
      {/* Content overlay */}
      <div id="home-content" className="w-full">
        <motion.div
          className="mb-12 text-center pointer-events-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-3 text-white drop-shadow-lg">
            Welcome
          </h1>
          <p className="text-xl text-white/90 drop-shadow-md">
            Your portfolio with a beautiful Flickr photo background
          </p>
        </motion.div>
        <Alert title="Error loading photos" variant="error">
          Hello
        </Alert>
        {/* Render gallery as background */}
        {data && data.photos && data.photos.length > 0 && (
          <FlickrGallery photos={data.photos} />
        )}
        {isLoading && (
          <div className="flex items-center justify-center py-20 pointer-events-auto">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent mb-4"></div>
              <p className="text-white">Loading photos...</p>
            </div>
          </div>
        )}

        {error && (
          <Alert title="Error loading photos" variant="error">
            <p>
              {error instanceof Error
                ? error.message
                : "An unexpected error occurred"}
            </p>
          </Alert>
        )}

        <motion.div
          className="max-w-2xl mx-auto bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-lg text-white/95 leading-relaxed">
            This is your home page with a dynamic Flickr gallery background. The
            photos create an immersive dark mode experience while maintaining
            excellent readability for your content.
          </p>
        </motion.div>
      </div>
    </>
  );
}

export default Home;
