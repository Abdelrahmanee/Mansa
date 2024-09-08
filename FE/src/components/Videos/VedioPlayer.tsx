import { useEffect, useRef } from 'react';
import cloudinary from 'cloudinary-video-player';
import 'cloudinary-video-player/cld-video-player.min.css';

interface VideoPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  id: string;
  publicId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ id, publicId, ...props }) => {
  const cloudinaryRef = useRef<typeof cloudinary | null>(null);
  const playerRef = useRef<HTMLDivElement | null>(null); 

  useEffect(() => {
    if (cloudinaryRef.current || !playerRef.current) return;

    cloudinaryRef.current = cloudinary;

    const player = cloudinaryRef.current.videoPlayer(id, {
      cloud_name: 'demo',
      secure: true,
      controls: true,
    });

    player.source(publicId);
  }, [id, publicId]);

  return (
    <div ref={playerRef}>
      <video
        id={id}
        className="cld-video-player cld-fluid w-full h-full"
        {...props}
      />
    </div>
  );
};

export default VideoPlayer;
