import { generateClient } from "aws-amplify/api";

// Create client with API key authentication
const client = generateClient({
  authMode: "apiKey",
});

export interface SpotifyTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface CurrentlyPlaying {
  is_playing: boolean;
  item: {
    id: string;
    name: string;
    artists: Array<{ name: string }>;
    album: {
      name: string;
      images: Array<{ url: string; height: number; width: number }>;
    };
    duration_ms: number;
  };
  progress_ms: number;
}

/**
 * Get Spotify Client ID from backend
 */
export async function getSpotifyClientId(): Promise<string> {
  const query = /* GraphQL */ `
    query SpotifyClientId {
      spotifyClientId
    }
  `;

  const response = await client.graphql({
    query,
  });

  const clientId =
    "data" in response ? response.data?.spotifyClientId : undefined;

  if (!clientId || typeof clientId !== "string" || clientId.trim() === "") {
    console.error("Spotify Client ID response:", response);
    throw new Error(
      "Failed to get Spotify Client ID from backend. Please ensure SPOTIFY_CLIENT_ID is set in your Amplify secrets."
    );
  }

  return clientId;
}

/**
 * Get Spotify OAuth authorization URL
 */
export function getSpotifyAuthUrl(
  redirectUri: string,
  clientId: string
): string {
  if (!clientId || clientId.trim() === "") {
    throw new Error("Spotify Client ID is required but was not provided");
  }

  if (!redirectUri || redirectUri.trim() === "") {
    throw new Error("Redirect URI is required but was not provided");
  }

  // Validate redirect URI format
  try {
    const url = new URL(redirectUri);
    if (!url.protocol.startsWith("http")) {
      throw new Error("Redirect URI must use http:// or https://");
    }
  } catch (err) {
    throw new Error(
      `Invalid redirect URI format: ${redirectUri}. Must be a full URL (e.g., http://localhost:5173/spotify-callback)`
    );
  }

  const scopes = [
    "user-read-currently-playing",
    "user-modify-playback-state",
    "user-read-playback-state",
    "user-read-private",
    "user-top-read",
  ].join(" ");

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: scopes,
    show_dialog: "false",
  });

  const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;

  // Log for debugging (remove in production if needed)
  console.log("Spotify OAuth URL generated with redirect URI:", redirectUri);
  console.log("Make sure this EXACTLY matches your Spotify app settings");

  return authUrl;
}

/**
 * Exchange authorization code for access and refresh tokens
 */
export async function exchangeAuthCode(
  code: string,
  redirectUri: string // Make it required - we should always pass it
): Promise<SpotifyTokens> {
  // GraphQL mutation will be auto-generated, but we'll use the field name directly
  // Include redirectUri to ensure it matches the one used in the authorization request
  const mutation = /* GraphQL */ `
    mutation SpotifyAuth($code: String!, $redirectUri: String) {
      spotifyAuth(code: $code, redirectUri: $redirectUri)
    }
  `;

  try {
    console.log("Exchanging auth code with:", {
      code: code?.substring(0, 10) + "...",
      redirectUri,
    });
    let response;
    try {
      response = await client.graphql({
        query: mutation,
        variables: { code, redirectUri },
      });
    } catch (graphqlError: any) {
      // GraphQL client might throw errors directly
      console.error("GraphQL client error:", graphqlError);
      if (graphqlError?.errors && Array.isArray(graphqlError.errors)) {
        const errorMessage = graphqlError.errors[0]?.message || "GraphQL error";
        throw new Error(errorMessage);
      }
      if (
        graphqlError?.data?.errors &&
        Array.isArray(graphqlError.data.errors)
      ) {
        const errorMessage =
          graphqlError.data.errors[0]?.message || "GraphQL error";
        throw new Error(errorMessage);
      }
      // If it's already an Error, re-throw it
      if (graphqlError instanceof Error) {
        throw graphqlError;
      }
      // Otherwise, stringify what we can
      throw new Error(
        typeof graphqlError === "string"
          ? graphqlError
          : graphqlError?.message || "GraphQL request failed"
      );
    }

    console.log("GraphQL response received:", {
      hasData: "data" in response,
      hasErrors: "errors" in response,
    });

    // Check for GraphQL errors in response
    if ("errors" in response && response.errors && response.errors.length > 0) {
      const firstError = response.errors[0];
      // Extract message from error object
      const errorMessage = firstError?.message || "GraphQL error";
      console.error("GraphQL error in response:", errorMessage, firstError);
      throw new Error(errorMessage);
    }

    // Check if response has data property and spotifyAuth is not null
    if (!("data" in response) || !response.data?.spotifyAuth) {
      throw new Error(
        "Failed to exchange authorization code: No data returned"
      );
    }

    // Amplify may return JSON string or object, handle both cases
    let data: SpotifyTokens;
    try {
      const rawData = response.data.spotifyAuth;

      if (typeof rawData === "string") {
        // Parse JSON string
        data = JSON.parse(rawData);
      } else if (typeof rawData === "object" && rawData !== null) {
        // Already an object, use directly
        data = rawData as SpotifyTokens;
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (parseError) {
      console.error(
        "Parse error:",
        parseError,
        "Raw data:",
        response.data.spotifyAuth
      );
      throw new Error(
        parseError instanceof Error
          ? `Failed to parse token response: ${parseError.message}`
          : "Failed to parse token response from server"
      );
    }

    // Validate the token response has required fields
    if (!data || typeof data !== "object") {
      throw new Error("Invalid token response: Response is not an object");
    }

    if (!data.access_token || !data.refresh_token) {
      console.error("Invalid token response:", data);
      throw new Error(
        "Invalid token response: Missing required fields (access_token or refresh_token)"
      );
    }

    return data;
  } catch (error) {
    console.error("Error in exchangeAuthCode:", error);

    // If it's already an Error with a message, just re-throw it
    if (error instanceof Error) {
      // Don't wrap it again if it already has a meaningful message
      if (error.message && !error.message.includes("{")) {
        throw error;
      }
      // If the error message looks like JSON, try to extract the actual message
      if (
        error.message.includes("errors") &&
        error.message.includes("message")
      ) {
        try {
          const parsed = JSON.parse(error.message);
          if (
            parsed.errors &&
            Array.isArray(parsed.errors) &&
            parsed.errors[0]?.message
          ) {
            throw new Error(parsed.errors[0].message);
          }
        } catch {
          // If parsing fails, continue with original error
        }
      }
      throw error;
    }

    // Handle case where error is an object with GraphQL errors
    if (error && typeof error === "object") {
      // Check if it's a GraphQL response object
      if (
        "errors" in error &&
        Array.isArray(error.errors) &&
        error.errors.length > 0
      ) {
        const errorMessage = error.errors[0]?.message || "GraphQL error";
        throw new Error(errorMessage);
      }
      // Check if it has a message property
      if ("message" in error) {
        throw new Error(String(error.message));
      }
    }

    // Last resort: try to create a meaningful error message
    const errorMessage =
      typeof error === "string" ? error : JSON.stringify(error);
    throw new Error(`Failed to exchange authorization code: ${errorMessage}`);
  }
}

/**
 * Refresh access token using refresh token
 */
export async function refreshAccessToken(
  refreshToken: string
): Promise<{ access_token: string; expires_in: number }> {
  const mutation = /* GraphQL */ `
    mutation SpotifyRefreshToken($refreshToken: String!) {
      spotifyRefreshToken(refreshToken: $refreshToken)
    }
  `;

  const response = await client.graphql({
    query: mutation,
    variables: { refreshToken },
  });

  if (!("data" in response) || !response.data?.spotifyRefreshToken) {
    throw new Error("Failed to refresh access token");
  }

  // Amplify returns JSON string, parse it
  const data =
    typeof response.data.spotifyRefreshToken === "string"
      ? JSON.parse(response.data.spotifyRefreshToken)
      : response.data.spotifyRefreshToken;
  return data;
}

/**
 * Get currently playing track
 * Calls Spotify API directly from frontend
 */
export async function getCurrentlyPlaying(
  accessToken: string
): Promise<CurrentlyPlaying | null> {
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  // Spotify returns 204 No Content when nothing is playing
  if (response.status === 204 || !response.ok) {
    return null;
  }

  const data = await response.json();
  // Spotify returns 204 No Content when nothing is playing
  if (!data || !data.item) {
    return null;
  }

  return data;
}

/**
 * Control playback (play, pause, skip)
 * Calls Spotify API directly from frontend
 */
export async function controlPlayback(
  accessToken: string,
  action: "play" | "pause" | "next" | "previous",
  uri?: string
): Promise<void> {
  let endpoint = "";
  let method: "GET" | "POST" | "PUT" = "PUT";
  let body: any = undefined;

  switch (action) {
    case "play":
      endpoint = "https://api.spotify.com/v1/me/player/play";
      method = "PUT";
      if (uri) {
        body = { uris: [uri] };
      }
      break;
    case "pause":
      endpoint = "https://api.spotify.com/v1/me/player/pause";
      method = "PUT";
      break;
    case "next":
      endpoint = "https://api.spotify.com/v1/me/player/next";
      method = "POST";
      break;
    case "previous":
      endpoint = "https://api.spotify.com/v1/me/player/previous";
      method = "POST";
      break;
  }

  const options: RequestInit = {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(endpoint, options);

  if (!response.ok && response.status !== 204) {
    const errorText = await response.text();
    throw new Error(`Spotify API error: ${response.status} ${errorText}`);
  }
}

/**
 * Get Spotify access token from cookie
 */
export function getSpotifyToken(): string | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) =>
    cookie.startsWith("spotify_access_token=")
  );

  if (!tokenCookie) return null;

  return tokenCookie.split("=")[1] ?? null;
}

/**
 * Get Spotify refresh token from cookie
 */
export function getSpotifyRefreshToken(): string | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) =>
    cookie.startsWith("spotify_refresh_token=")
  );

  if (!tokenCookie) return null;

  return tokenCookie.split("=")[1] ?? null;
}

/**
 * Set Spotify access token in cookie (for frontend use)
 * Note: Backend should set HTTP-only cookies, but this is a fallback
 */
export function setSpotifyToken(token: string, expiresIn: number): void {
  if (typeof document === "undefined") return;

  const expires = new Date();
  expires.setTime(expires.getTime() + expiresIn * 1000);

  document.cookie = `spotify_access_token=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

/**
 * Clear Spotify tokens from cookies
 */
export function clearSpotifyTokens(): void {
  if (typeof document === "undefined") return;

  document.cookie =
    "spotify_access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie =
    "spotify_refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

/**
 * Check if user is authenticated with Spotify
 */
export function isSpotifyAuthenticated(): boolean {
  return getSpotifyToken() !== null;
}

/**
 * Get access token, refreshing if necessary
 */
export async function getValidAccessToken(): Promise<string | null> {
  let accessToken = getSpotifyToken();

  if (!accessToken) {
    const refreshToken = getSpotifyRefreshToken();
    if (!refreshToken) {
      return null;
    }

    try {
      const tokens = await refreshAccessToken(refreshToken);
      setSpotifyToken(tokens.access_token, tokens.expires_in);
      accessToken = tokens.access_token;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      clearSpotifyTokens();
      return null;
    }
  }

  return accessToken;
}

export interface TopTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
  };
  duration_ms: number;
  external_urls: {
    spotify: string;
  };
}

export interface TopTracksResponse {
  items: TopTrack[];
  total: number;
  limit: number;
  offset: number;
}

/**
 * Get user's top tracks
 * Calls Spotify API directly from frontend
 */
export async function getTopTracks(
  accessToken: string,
  timeRange: "short_term" | "medium_term" | "long_term" = "medium_term",
  limit: number = 50
): Promise<TopTracksResponse> {
  const params = new URLSearchParams({
    time_range: timeRange,
    limit: limit.toString(),
  });

  const response = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Spotify API error: ${response.status} ${errorText}`);
  }

  return await response.json();
}
