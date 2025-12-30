'use client';

import Image from 'next/image';
import { VideoTutorial as VideoTutorialType } from '@/data/videoTutorials';

interface VideoTutorialProps {
  video: VideoTutorialType;
  className?: string;
}

export default function VideoTutorial({ video, className = '' }: VideoTutorialProps) {

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-400 bg-green-900/30 border-green-500/30';
      case 'intermediate':
        return 'text-yellow-400 bg-yellow-900/30 border-yellow-500/30';
      case 'advanced':
        return 'text-red-400 bg-red-900/30 border-red-500/30';
      default:
        return 'text-gray-400 bg-gray-900/30 border-gray-500/30';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'youtube':
        return '📺';
      case 'vimeo':
        return '🎬';
      case 'direct':
        return '🎥';
      default:
        return '📹';
    }
  };

  const handleVideoClick = () => {
    // Open video in new tab
    window.open(video.videoUrl, '_blank');
  };

  return (
    <div className={`bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-xl border border-gray-600 hover:border-rose-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 ${className}`}>
      <div className="p-6">
        {/* Video Thumbnail and Play Button */}
        <div className="relative mb-4 group cursor-pointer" onClick={handleVideoClick}>
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={video.thumbnail}
              alt={video.title}
              width={400}
              height={192}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-red-600 rounded-full p-4 hover:bg-red-700 transition-colors">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
              {video.duration}
            </div>
          </div>
        </div>

        {/* Video Information */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors line-clamp-2">
              {video.title}
            </h3>
            <div className="flex items-center space-x-2 ml-3">
              <span className="text-lg">{getPlatformIcon(video.platform)}</span>
            </div>
          </div>

          <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
            {video.description}
          </p>

          {/* Tags and Difficulty */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(video.difficulty)}`}>
              {video.difficulty.charAt(0).toUpperCase() + video.difficulty.slice(1)}
            </span>
            
            {video.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-rose-900/30 text-white text-xs rounded border border-rose-500/30"
              >
                {tag}
              </span>
            ))}
            {video.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded">
                +{video.tags.length - 3} more
              </span>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={handleVideoClick}
            className="w-full mt-4 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center space-x-2"
          >
            <span>Watch Tutorial</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
