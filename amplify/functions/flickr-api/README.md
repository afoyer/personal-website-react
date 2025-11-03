# Flickr API Function

This Amplify function fetches photos from the Flickr API.

## Setup

### 1. Configure Secrets

You need to set your Flickr API key and secret. You have two options:

#### Option A: Using Amplify CLI (Recommended)

```bash
# Set secrets for your sandbox environment
npx ampx sandbox secret set FLICKR_API_KEY
npx ampx sandbox secret set FLICKR_API_SECRET
```

When prompted, enter your Flickr API credentials.

#### Option B: Using Amplify Console

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Select your app and environment
3. Navigate to **Environment variables** or **Secrets**
4. Add:
   - `FLICKR_API_KEY` - Your Flickr API key
   - `FLICKR_API_SECRET` - Your Flickr API secret

### 2. Deploy the Function

```bash
# Deploy your Amplify backend
npx ampx sandbox
```

## Usage

After deployment, the function will be available. The function URL will be in `amplify_outputs.json`.

### From Frontend

Use the utility function in `src/utils/flickrApi.ts`:

```typescript
import { fetchFlickrPhotos } from "./utils/flickrApi";

// Search for photos by text
const photos = await fetchFlickrPhotos({
  text: "nature",
  page: 1,
  per_page: 20,
  sort: "relevance",
});

// Search by tags
const taggedPhotos = await fetchFlickrPhotos({
  tags: "sunset,ocean",
  per_page: 10,
});
```

### API Endpoint

The function accepts the following query parameters:

- `text` (string): Search for photos by text
- `tags` (string): Search by tags (comma-separated)
- `page` (number): Page number (default: 1)
- `per_page` (number): Photos per page (default: 20, max: 500)
- `sort` (string): Sort order - `relevance`, `date-posted-desc`, `date-posted-asc`, `date-taken-desc`, `date-taken-asc`, `interestingness-desc`, `interestingness-asc`

### Response Format

```typescript
{
  photos: [
    {
      id: string;
      title: string;
      owner: string;
      url: string;
      thumbnail: string;
      medium: string;
      large?: string;
      original?: string;
    }
  ];
  page: number;
  pages: number;
  perpage: number;
  total: number;
}
```

## Getting Flickr API Credentials

1. Go to [Flickr API Documentation](https://www.flickr.com/services/api/)
2. Sign in with your Flickr account
3. Navigate to [App Garden](https://www.flickr.com/services/apps/create/)
4. Create a new app to get your API key and secret
