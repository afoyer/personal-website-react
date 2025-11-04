import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { flickrApi } from "./functions/flickr-api/resource";
import { spotifyApi } from "./functions/spotify-api/resource";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
defineBackend({
  auth,
  data,
  flickrApi,
  spotifyApi,
});
