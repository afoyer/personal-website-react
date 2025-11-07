import { list, getUrl } from "aws-amplify/storage";

export interface LightDrawingImage {
  key: string;
  url: string;
}

/**
 * Fetch all images from the light-drawing folder in Amplify Storage
 */
export async function fetchLightDrawingImages(): Promise<LightDrawingImage[]> {
  try {
    // List all files in the light-drawing folder
    const result = await list({
      path: "light-drawing/",
    });

    // Handle both 'items' and 'results' properties (depending on Amplify version)
    const items = result.items || (result as any).results || [];

    // Filter for image files (common image extensions)
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
    const imageItems = items.filter((item: any) => {
      const path = item.path || item.key;
      if (!path) return false;
      const extension = path.toLowerCase().split(".").pop();
      return extension && imageExtensions.includes(`.${extension}`);
    });

    if (imageItems.length === 0) {
      console.warn("No images found in light-drawing folder");
      return [];
    }

    // Get URLs for each image
    const imageUrls = await Promise.all(
      imageItems.map(async (item: any) => {
        const path = item.path || item.key;
        if (!path) {
          throw new Error("Item path is undefined");
        }
        const urlResult = await getUrl({
          path: path,
        });
        return {
          key: path,
          url: urlResult.url.toString(),
        };
      })
    );

    return imageUrls;
  } catch (error) {
    console.error("Error fetching light drawing images:", error);
    throw error;
  }
}
