import { generateClient } from "aws-amplify/api";
import { flickrPhotos } from "../graphql/queries";
import type { FlickrPhotosQueryVariables } from "../graphql/API";

export interface FlickrPhoto {
  id: string;
  title: string;
  owner: string;
  url: string;
  thumbnail: string;
  medium: string;
  large?: string;
  original?: string;
  description?: string;
  tags?: string[];
}

export interface FlickrPhotosResponse {
  photos: FlickrPhoto[];
  page: number;
  pages: number;
  perpage: number;
  total: number;
}

// Create client with API key authentication
const client = generateClient({
  authMode: "apiKey",
});

/**
 * Fetch photos from Flickr using the Amplify function
 * Uses generated GraphQL types for type safety
 */
export async function fetchFlickrPhotos(
  params: FlickrPhotosQueryVariables = {}
): Promise<FlickrPhotosResponse> {
  const response = await client.graphql({
    query: flickrPhotos,
    variables: params,
  });

  // The response is a JSON string, parse it
  if (!response.data.flickrPhotos) {
    throw new Error("No data returned from Flickr API");
  }

  const data: FlickrPhotosResponse = JSON.parse(response.data.flickrPhotos);
  return data;
}
