interface FlickrPhoto {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
}

interface FlickrApiResponse {
  photos: {
    page: number;
    pages: number;
    perpage: number;
    total: number;
    photo: FlickrPhoto[];
  };
  stat: string;
  message?: string;
}

/**
 * Construct photo URLs from Flickr photo data
 * @see https://www.flickr.com/services/api/misc.urls.html
 */
function buildPhotoUrls(photo: FlickrPhoto) {
  const base = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`;
  return {
    id: photo.id,
    title: photo.title,
    owner: photo.owner,
    url: `https://www.flickr.com/photos/${photo.owner}/${photo.id}`,
    thumbnail: `${base}_t.jpg`, // 100x75
    medium: `${base}_z.jpg`, // 640px on longest side
    large: `${base}_b.jpg`, // 1024px on longest side
    original: `${base}_o.jpg`, // Original
  };
}

/**
 * Lambda handler for Amplify Data custom query
 */
export const handler = async (event: any) => {
  try {
    // Get environment variables (secrets)
    const apiKey = process.env.FLICKR_API_KEY;
    const apiSecret = process.env.FLICKR_API_SECRET;
    const flickrUserId = process.env.FLICKR_USER_ID; // Optional: your Flickr user ID

    if (!apiKey || !apiSecret) {
      throw new Error(
        "Flickr API credentials not configured. Please set FLICKR_API_KEY and FLICKR_API_SECRET secrets."
      );
    }

    // Get arguments from Amplify Data query
    const args = event.arguments || {};
    const {
      text = "",
      tags = "",
      page = 1,
      per_page = 20,
      sort = "date-posted-desc",
    } = args;

    // Build Flickr API URL
    const flickrParams = new URLSearchParams({
      method: "flickr.photos.search",
      api_key: apiKey,
      format: "json",
      nojsoncallback: "1",
      page: String(page),
      per_page: String(Math.min(Number(per_page), 500)), // Cap at 500
      sort,
      extras: "owner_name,url_o,url_b,url_z,url_t",
    });

    // Add user_id if configured (to search only your photos)
    if (flickrUserId) {
      flickrParams.append("user_id", flickrUserId);
    }

    // Add optional search parameters
    if (text) {
      flickrParams.append("text", text);
    }
    if (tags) {
      flickrParams.append("tags", tags);
    }

    const flickrUrl = `https://api.flickr.com/services/rest/?${flickrParams.toString()}`;

    // Fetch from Flickr API
    const response = await fetch(flickrUrl);

    if (!response.ok) {
      throw new Error(`Flickr API error: ${response.statusText}`);
    }

    const data: FlickrApiResponse = await response.json();

    // Check for Flickr API errors
    if (data.stat !== "ok") {
      throw new Error(data.message || "Flickr API returned an error");
    }

    // Transform photos to a cleaner format
    const photos = data.photos.photo.map(buildPhotoUrls);

    return {
      photos,
      page: data.photos.page,
      pages: data.photos.pages,
      perpage: data.photos.perpage,
      total: Number(data.photos.total),
    };
  } catch (error) {
    console.error("Error fetching Flickr photos:", error);
    throw error;
  }
};
