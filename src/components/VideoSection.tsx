'use client';

import { VideoTutorial as VideoTutorialType } from '@/data/videoTutorials';
import VideoTutorial from './VideoTutorial';

interface VideoSectionProps {
  videos: VideoTutorialType[];
  title?: string;
  className?: string;
}

export default function VideoSection({ videos, title = "Video Tutorials", className = '' }: VideoSectionProps) {
  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <div className={`mb-8 ${className}`}>
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
        <span className="mr-3">🎥</span>
        {title}
        <span className="ml-3 text-lg text-gray-400 font-normal">
          ({videos.length} video{videos.length !== 1 ? 's' : ''})
        </span>
      </h2>
      
      <div className="space-y-6">
        {videos.map((video) => (
          <VideoTutorial key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
