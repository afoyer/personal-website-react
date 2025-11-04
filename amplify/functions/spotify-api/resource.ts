import { defineFunction, secret } from "@aws-amplify/backend";

/**
 * Define a function to interact with Spotify API
 * Secrets should be configured in the Amplify console
 *
 * To set secrets:
 * 1. Go to Amplify Console -> Your App -> Environment Variables
 * 2. Add SPOTIFY_CLIENT_ID, SPOTIFY_API_SECRET, and SPOTIFY_REDIRECT_URI
 * Or use: npx ampx sandbox secret set SPOTIFY_CLIENT_ID
 */
export const spotifyApi = defineFunction({
  name: "spotify-api",
  entry: "./handler.ts",
  environment: {
    SPOTIFY_CLIENT_ID: secret("SPOTIFY_CLIENT_ID"),
    SPOTIFY_API_SECRET: secret("SPOTIFY_API_SECRET"),
    SPOTIFY_REDIRECT_URI: secret("SPOTIFY_REDIRECT_URI"),
  },
  timeoutSeconds: 30,
});
