interface SpotifyTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

interface SpotifyApiResponse {
  data?: any;
  error?: string;
  cookies?: Array<{
    name: string;
    value: string;
    options: {
      httpOnly: boolean;
      secure: boolean;
      sameSite: string;
      maxAge: number;
    };
  }>;
}

/**
 * Exchange authorization code for access and refresh tokens
 */
async function exchangeCodeForTokens(
  code: string,
  clientId: string,
  clientSecret: string,
  redirectUri: string
): Promise<SpotifyTokenResponse> {
  // Validate inputs
  if (!code || code.trim() === "") {
    throw new Error("Authorization code is required");
  }
  if (!clientId || clientId.trim() === "") {
    throw new Error("Client ID is required");
  }
  if (!clientSecret || clientSecret.trim() === "") {
    throw new Error("Client secret is required");
  }
  if (!redirectUri || redirectUri.trim() === "") {
    throw new Error("Redirect URI is required");
  }

  const tokenUrl = "https://accounts.spotify.com/api/token";
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret,
  });

  console.log("Exchanging code for tokens:", {
    hasCode: !!code,
    codeLength: code.length,
    hasClientId: !!clientId,
    hasClientSecret: !!clientSecret,
    redirectUri,
  });

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `Failed to exchange code: ${response.status} ${errorText}`;

    // Provide more helpful error messages
    if (errorText.includes("invalid_client")) {
      if (errorText.includes("Invalid client secret")) {
        errorMessage =
          "Invalid client secret. Please check that SPOTIFY_API_SECRET is set correctly in Amplify secrets. Verify it matches your Spotify app's Client Secret.";
      } else if (errorText.includes("Invalid client")) {
        errorMessage =
          "Invalid client ID or secret. Please verify both SPOTIFY_CLIENT_ID and SPOTIFY_API_SECRET are set correctly in Amplify secrets.";
      }
    } else if (errorText.includes("invalid_grant")) {
      errorMessage =
        "Invalid authorization code. The code may have expired or already been used. Please try connecting again.";
    } else if (errorText.includes("redirect_uri_mismatch")) {
      errorMessage = `Redirect URI mismatch. The redirect URI used (${redirectUri}) must exactly match what's configured in your Spotify app settings.`;
    }

    console.error("Spotify token exchange error:", {
      status: response.status,
      statusText: response.statusText,
      error: errorText,
    });

    throw new Error(errorMessage);
  }

  return await response.json();
}

/**
 * Refresh access token using refresh token
 */
async function refreshAccessToken(
  refreshToken: string,
  clientId: string,
  clientSecret: string
): Promise<{ access_token: string; expires_in: number }> {
  const tokenUrl = "https://accounts.spotify.com/api/token";
  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
  });

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to refresh token: ${response.status} ${error}`);
  }

  return await response.json();
}

/**
 * Make authenticated request to Spotify API
 */
async function makeSpotifyRequest(
  endpoint: string,
  accessToken: string,
  method: string = "GET",
  body?: any
): Promise<any> {
  const url = `https://api.spotify.com/v1${endpoint}`;
  const options: RequestInit = {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  if (body && method !== "GET") {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Spotify API error: ${response.status} ${error}`);
  }

  return await response.json();
}

/**
 * Lambda handler for Amplify Data custom queries/mutations
 * Each GraphQL operation calls this handler with different arguments
 * Returns data directly - Amplify will handle JSON serialization
 */
export const handler = async (event: any) => {
  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_API_SECRET;
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

    // Validate credentials are set
    if (!clientId || clientId.trim() === "") {
      throw new Error(
        "SPOTIFY_CLIENT_ID secret is not set or is empty. Set it using: npx ampx sandbox secret set SPOTIFY_CLIENT_ID"
      );
    }

    if (!clientSecret || clientSecret.trim() === "") {
      throw new Error(
        "SPOTIFY_API_SECRET secret is not set or is empty. Set it using: npx ampx sandbox secret set SPOTIFY_API_SECRET"
      );
    }

    if (!redirectUri || redirectUri.trim() === "") {
      throw new Error(
        "SPOTIFY_REDIRECT_URI secret is not set or is empty. Set it using: npx ampx sandbox secret set SPOTIFY_REDIRECT_URI"
      );
    }

    // Log for debugging (remove sensitive info in production)
    console.log("Spotify credentials check:", {
      hasClientId: !!clientId,
      hasClientSecret: !!clientSecret,
      hasRedirectUri: !!redirectUri,
      clientIdLength: clientId?.length,
      clientSecretLength: clientSecret?.length,
      redirectUri,
    });

    const args = event.arguments || {};
    const info = event.info || {};

    // Log event structure for debugging (remove in production if needed)
    console.log(
      "Event structure:",
      JSON.stringify(
        {
          hasArguments: !!event.arguments,
          argumentsKeys: Object.keys(args),
          hasInfo: !!event.info,
          infoKeys: event.info ? Object.keys(event.info) : [],
          eventKeys: Object.keys(event),
        },
        null,
        2
      )
    );

    // Try multiple ways to get the field name
    // Amplify Data passes field name in different locations depending on version
    let fieldName =
      info?.fieldName ||
      event.info?.fieldName ||
      event.fieldName ||
      event.selectionSetList?.[0]?.name ||
      event.selection?.name?.value;

    // Fallback: detect based on arguments (when fieldName is not available)
    if (!fieldName) {
      if (args.code) {
        fieldName = "spotifyAuth";
      } else if (args.refreshToken) {
        fieldName = "spotifyRefreshToken";
      } else if (args.endpoint) {
        fieldName = "spotifyApi";
      } else if (Object.keys(args).length === 0) {
        // spotifyClientId has no arguments - this is the only query with no args
        fieldName = "spotifyClientId";
      }
    }

    // Handle spotifyClientId first (no arguments, so it's safe to check early)
    // This handles the case where fieldName might be undefined but we know it's spotifyClientId
    if (
      fieldName === "spotifyClientId" ||
      (!fieldName && Object.keys(args).length === 0)
    ) {
      // Validate that clientId is actually set and not empty
      if (!clientId || clientId.trim() === "") {
        throw new Error(
          "SPOTIFY_CLIENT_ID secret is not set or is empty. Please set it using: npx ampx sandbox secret set SPOTIFY_CLIENT_ID"
        );
      }

      // Return the actual client ID string (not a secret reference)
      return String(clientId);
    }

    // Route based on GraphQL field name
    if (fieldName === "spotifyAuth") {
      const { code, redirectUri: providedRedirectUri } = args;
      if (!code) {
        throw new Error("Authorization code is required");
      }

      // Use the redirect URI from the request if provided, otherwise fall back to env var
      // This ensures the redirect URI matches what was used in the authorization request
      // IMPORTANT: The redirect URI MUST match exactly what was used in the auth request
      const finalRedirectUri = providedRedirectUri || redirectUri;

      if (!finalRedirectUri) {
        throw new Error(
          "Redirect URI is required. Either provide it in the request or set SPOTIFY_REDIRECT_URI."
        );
      }

      console.log("Using redirect URI for token exchange:", finalRedirectUri);

      console.log("Exchanging auth code with redirect URI:", finalRedirectUri);

      const tokens = await exchangeCodeForTokens(
        code,
        clientId,
        clientSecret,
        finalRedirectUri
      );

      // Return object - Amplify will serialize to JSON
      return {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_in: tokens.expires_in,
      };
    }

    if (fieldName === "spotifyRefreshToken") {
      const { refreshToken } = args;
      if (!refreshToken) {
        throw new Error("Refresh token is required");
      }

      const tokens = await refreshAccessToken(
        refreshToken,
        clientId,
        clientSecret
      );

      return {
        access_token: tokens.access_token,
        expires_in: tokens.expires_in,
      };
    }

    if (fieldName === "spotifyApi") {
      const { endpoint, method = "GET", body: bodyString, accessToken } = args;
      if (!accessToken) {
        throw new Error("Access token is required");
      }
      if (!endpoint) {
        throw new Error("API endpoint is required");
      }

      // Parse body from JSON string if provided
      let body = undefined;
      if (
        bodyString &&
        typeof bodyString === "string" &&
        bodyString.trim() !== ""
      ) {
        try {
          body = JSON.parse(bodyString);
        } catch (err) {
          throw new Error(
            `Invalid JSON in body parameter: ${err instanceof Error ? err.message : String(err)}`
          );
        }
      }

      const data = await makeSpotifyRequest(
        endpoint,
        accessToken,
        method,
        body
      );

      return data;
    }

    // If we still don't have a field name, log the event structure for debugging
    if (!fieldName) {
      console.error(
        "Unable to determine field name. Full event:",
        JSON.stringify(event, null, 2)
      );
      // As a last resort, if there are no args and we can't determine the field,
      // assume it's spotifyClientId (the only query with no args)
      if (Object.keys(args).length === 0) {
        console.warn("Falling back to spotifyClientId based on empty args");
        return clientId;
      }
      throw new Error(
        `Unknown field: fieldName is undefined. Event keys: ${Object.keys(event).join(", ")}`
      );
    }

    throw new Error(`Unknown field: ${fieldName}`);
  } catch (error) {
    console.error("Error in Spotify API handler:", error);
    throw error;
  }
};
