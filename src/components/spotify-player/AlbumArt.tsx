interface AlbumArtProps {
  imageUrl: string;
  albumName: string;
}

export default function AlbumArt({ imageUrl, albumName }: AlbumArtProps) {
  return (
    <div className="flex justify-center mb-4">
      <img
        src={imageUrl}
        alt={albumName}
        className="w-32 h-32 rounded-lg shadow-lg object-cover"
      />
    </div>
  );
}

