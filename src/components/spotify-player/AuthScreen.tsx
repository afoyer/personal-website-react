interface AuthScreenProps {
  onConnect: () => void;
  error: string | null;
}

export default function AuthScreen({ onConnect, error }: AuthScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Connect to Spotify
        </h3>
        <p className="text-sm text-gray-600">
          Connect your Spotify account to control playback
        </p>
      </div>
      <button
        onClick={onConnect}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
      >
        Connect Spotify
      </button>
      {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
    </div>
  );
}

