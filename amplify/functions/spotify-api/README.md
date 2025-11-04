# Spotify API Function

This Amplify function handles Spotify OAuth authentication and proxies Spotify Web API requests.

## Setup

### 1. Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click "Create App"
3. Fill in app details:
   - App name: Your app name
   - App description: Description of your app
   - Redirect URI: `http://localhost:5173/spotify-callback` (for development)
   - For production, add your production URL
4. Save the **Client ID** and **Client Secret**

### 2. Configure Secrets

You need to set your Spotify API credentials. You have two options:

#### Option A: Using Amplify CLI (Recommended)

```bash
# Set secrets for your sandbox environment
npx ampx sandbox secret set SPOTIFY_CLIENT_ID
npx ampx sandbox secret set SPOTIFY_API_SECRET
npx ampx sandbox secret set SPOTIFY_REDIRECT_URI
```

When prompted, enter your Spotify credentials:

- `SPOTIFY_CLIENT_ID`: Your Spotify app Client ID
- `SPOTIFY_API_SECRET`: Your Spotify app Client Secret
- `SPOTIFY_REDIRECT_URI`: Your redirect URI (e.g., `http://localhost:5173/spotify-callback`)

#### Option B: Using Amplify Console

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Select your app and environment
3. Navigate to **Environment variables** or **Secrets**
4. Add:
   - `SPOTIFY_CLIENT_ID` - Your Spotify app Client ID
   - `SPOTIFY_API_SECRET` - Your Spotify app Client Secret
   - `SPOTIFY_REDIRECT_URI` - Your redirect URI

### 3. Deploy the Function

```bash
# Deploy your Amplify backend
npx ampx sandbox
```

## Usage

The function supports three operations:

### 1. Exchange Authorization Code for Tokens

```typescript
// Called internally by the frontend after OAuth redirect
const response = await client.graphql({
  query: spotifyAuth,
  variables: {
    code: "authorization_code_from_spotify",
  },
});
```

### 2. Refresh Access Token

```typescript
const response = await client.graphql({
  query: spotifyRefreshToken,
  variables: {
    refreshToken: "refresh_token_from_cookie",
  },
});
```

### 3. Make Spotify API Requests

```typescript
const response = await client.graphql({
  query: spotifyApi,
  variables: {
    endpoint: "/me/player/currently-playing",
    accessToken: "access_token_from_cookie",
  },
});
```

### 4. Get Spotify Client ID

```typescript
// Called automatically by the frontend to get Client ID for OAuth
const response = await client.graphql({
  query: spotifyClientId,
});
// Returns: "your_client_id_string"
```

## OAuth Scopes

The function requests the following scopes:

- `user-read-currently-playing` - Read currently playing track
- `user-modify-playback-state` - Control playback (play, pause, skip)
- `user-read-playback-state` - Read playback state
- `user-read-private` - Read user profile information

## Security Notes

- Tokens are stored in HTTP-only cookies for security
- Access tokens expire after 1 hour and need to be refreshed
- Refresh tokens are valid for 30 days
- Never expose client secret in frontend code
- Client ID is fetched from the backend via GraphQL (it's safe to expose as it's public information used in OAuth URLs)

## Frontend Configuration

**No environment variables needed!** The Client ID is automatically fetched from the backend when the app loads. The frontend will query `spotifyClientId` to get the Client ID for OAuth URL generation.
