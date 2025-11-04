# Spotify Integration Setup Guide

## Common Errors and Solutions

### "INVALID_CLIENT: Invalid redirect URI"

This error means the redirect URI in your code doesn't match what's configured in your Spotify app.

#### Solution:

1. **Check your current redirect URI:**
   - Open your browser console
   - Look for the log message: "Spotify redirect URI: ..."
   - Copy the exact URI shown (e.g., `http://localhost:5173/spotify-callback`)

2. **Configure in Spotify Dashboard:**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Click on your app
   - Click "Edit Settings"
   - Scroll to "Redirect URIs"
   - Add the EXACT URI from step 1 (must match exactly, including protocol and port)
   - Click "Add" and then "Save"

3. **Common Issues:**
   - ❌ `http://localhost/spotify-callback` (missing port)
   - ✅ `http://localhost:5173/spotify-callback` (correct)
   - ❌ `https://localhost:5173/spotify-callback` (wrong protocol)
   - ✅ `http://localhost:5173/spotify-callback` (correct)
   - ❌ `http://localhost:5173/spotify-callback/` (trailing slash)
   - ✅ `http://localhost:5173/spotify-callback` (correct)

4. **For Production:**
   - Add your production URL: `https://yourdomain.com/spotify-callback`
   - Make sure to update the `SPOTIFY_REDIRECT_URI` secret in Amplify

### "INVALID_CLIENT: Invalid client"

This means your Spotify Client ID is not set or is incorrect.

#### Solution:

1. **Verify the secret is set:**

   ```bash
   npx ampx sandbox secret list
   ```

2. **Set the secret if missing:**

   ```bash
   npx ampx sandbox secret set SPOTIFY_CLIENT_ID
   ```

   When prompted, enter your Client ID from the Spotify Dashboard.

3. **Redeploy:**
   ```bash
   npx ampx sandbox
   ```

## Complete Setup Checklist

- [ ] Create Spotify app at https://developer.spotify.com/dashboard
- [ ] Copy Client ID and Client Secret
- [ ] Add redirect URI in Spotify app settings (must match exactly)
- [ ] Set Amplify secrets:
  ```bash
  npx ampx sandbox secret set SPOTIFY_CLIENT_ID
  npx ampx sandbox secret set SPOTIFY_API_SECRET
  npx ampx sandbox secret set SPOTIFY_REDIRECT_URI
  ```
- [ ] Deploy backend: `npx ampx sandbox`
- [ ] Test the connection

## Redirect URI Examples

### Development (Vite default):

```
http://localhost:5173/spotify-callback
```

### Production:

```
https://yourdomain.com/spotify-callback
```

**Important:** The redirect URI must match EXACTLY between:

- Your Spotify app settings
- Your code (auto-detected from `window.location.origin`)
- The `SPOTIFY_REDIRECT_URI` secret (if you want to override the default)
