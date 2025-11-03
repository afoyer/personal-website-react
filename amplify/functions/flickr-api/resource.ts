import { defineFunction, secret } from "@aws-amplify/backend";

/**
 * Define a function to fetch photos from Flickr
 * Secrets should be configured in the Amplify console
 *
 * To set secrets:
 * 1. Go to Amplify Console -> Your App -> Environment Variables
 * 2. Add FLICKR_API_KEY and FLICKR_API_SECRET
 * Or use: npx ampx sandbox secret set FLICKR_API_KEY
 */
export const flickrApi = defineFunction({
  name: "flickr-api",
  entry: "./handler.ts",
  environment: {
    FLICKR_API_KEY: secret("FLICKR_API_KEY"),
    FLICKR_API_SECRET: secret("FLICKR_API_SECRET"),
    FLICKR_USER_ID: secret("FLICKR_USER_ID"),
  },
  timeoutSeconds: 30,
});
