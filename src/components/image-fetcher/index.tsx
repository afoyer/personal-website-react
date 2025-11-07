import { type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { getUrl } from "aws-amplify/storage";
import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";

export interface ImageFetcherProps extends Omit<HTMLMotionProps<"img">, "src"> {
  folder: string;
  fileName: string;
  className?: string;
  /**
   * Optional description/caption to display below the image
   */
  description?: ReactNode;
  /**
   * Tailwind CSS classes for the description element
   * @default "text-center text-sm text-gray-500 dark:text-gray-400"
   */
  descriptionClassName?: string;
  /**
   * Tailwind CSS classes for the container wrapping image and description
   * @default "flex flex-col"
   */
  containerClassName?: string;
  /**
   * If true, uses useSuspenseQuery (requires Suspense boundary).
   * If false, uses useQuery with loading/error states.
   * @default true
   */
  suspense?: boolean;
  /**
   * Custom loading component (only used when suspense is false)
   */
  loadingComponent?: ReactNode;
  /**
   * Custom error component (only used when suspense is false)
   */
  errorComponent?: ReactNode;
}

/**
 * ImageFetcher component that fetches and displays an image from Amplify Storage.
 *
 * Supports both Suspense and non-Suspense fetching patterns.
 *
 * @param folder - The folder directory in Amplify Storage (e.g., "pantonify", "amazon")
 * @param fileName - The file name with extension (e.g., "image.png", "photo.jpg")
 * @param className - Tailwind CSS classes for the image
 * @param description - Optional description/caption to display below the image
 * @param descriptionClassName - Tailwind CSS classes for the description (default: "text-center text-sm text-gray-500 dark:text-gray-400")
 * @param containerClassName - Tailwind CSS classes for the container wrapping image and description (default: "flex flex-col")
 * @param suspense - Whether to use Suspense fetching (default: true). When false, handles loading/error states internally.
 * @param loadingComponent - Custom loading component (only used when suspense is false)
 * @param errorComponent - Custom error component (only used when suspense is false)
 * @param ...motionProps - Any motion props (initial, animate, whileHover, etc.)
 *
 * @example
 * ```tsx
 * // With Suspense (default - requires Suspense boundary)
 * <Suspense fallback={<Spinner />}>
 *   <ImageFetcher
 *     folder="pantonify"
 *     fileName="splash.png"
 *     className="rounded-lg shadow-2xl"
 *     initial={{ opacity: 0 }}
 *     animate={{ opacity: 1 }}
 *     whileHover={{ scale: 1.1 }}
 *     alt="Splash screen"
 *   />
 * </Suspense>
 *
 * // Without Suspense (handles loading/error internally)
 * <ImageFetcher
 *   folder="pantonify"
 *   fileName="splash.png"
 *   suspense={false}
 *   className="rounded-lg shadow-2xl"
 *   initial={{ opacity: 0 }}
 *   animate={{ opacity: 1 }}
 *   alt="Splash screen"
 * />
 *
 * // With description
 * <ImageFetcher
 *   folder="pantonify"
 *   fileName="splash.png"
 *   className="rounded-lg shadow-2xl"
 *   description="The initial splash screen"
 *   alt="Splash screen"
 * />
 * ```
 */
function ImageFetcher({
  folder,
  fileName,
  className,
  description,
  descriptionClassName = "text-center text-sm text-gray-500 dark:text-gray-400",
  containerClassName = "flex flex-col",
  suspense = true,
  loadingComponent,
  errorComponent,
  ...motionProps
}: ImageFetcherProps) {
  // Construct the path: ensure folder doesn't end with / and fileName doesn't start with /
  const path = `${folder.replace(/\/$/, "")}/${fileName.replace(/^\//, "")}`;

  const queryFn = async () => {
    const result = await getUrl({
      path: path,
    });
    return result.url.toString();
  };

  // Use Suspense query by default
  if (suspense) {
    const { data: imageUrl } = useSuspenseQuery({
      queryKey: [`image-${path}`],
      queryFn,
    });

    const image = <motion.img src={imageUrl} className={className} />;

    if (description) {
      return (
        <motion.div className={containerClassName} {...motionProps}>
          <div className="flex flex-col gap-4 items-center justify-center">
            {image}
            <p className={descriptionClassName}>{description}</p>
          </div>
        </motion.div>
      );
    }

    return image;
  }

  // Use regular query with loading/error states
  const {
    data: imageUrl,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`image-${path}`],
    queryFn,
  });

  if (isLoading) {
    return loadingComponent ? (
      <>{loadingComponent}</>
    ) : (
      <div className={className}>
        <Spinner />
      </div>
    );
  }

  if (isError || !imageUrl) {
    return errorComponent ? (
      <>{errorComponent}</>
    ) : (
      <div className={className}>
        <p className="text-red-500 text-sm">
          Failed to load image:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }

  const image = (
    <motion.img src={imageUrl} className={className} {...motionProps} />
  );

  if (description) {
    return (
      <motion.div className={containerClassName} {...motionProps}>
        <div className="flex flex-col gap-4 items-center justify-center">
          {image}
          <p className={descriptionClassName}>{description}</p>
        </div>
      </motion.div>
    );
  }

  return image;
}

export default ImageFetcher;
