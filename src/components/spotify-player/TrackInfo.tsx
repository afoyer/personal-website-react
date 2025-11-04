interface TrackInfoProps {
  trackName: string;
  artists: string[];
  albumName: string;
}

export default function TrackInfo({
  trackName,
  artists,
  albumName,
}: TrackInfoProps) {
  return (
    <div className="text-center mb-4">
      <h4 className="font-semibold text-gray-800 text-lg mb-1 truncate">
        {trackName}
      </h4>
      <p className="text-gray-600 text-sm truncate">{artists.join(", ")}</p>
      <p className="text-gray-500 text-xs mt-1">{albumName}</p>
    </div>
  );
}
