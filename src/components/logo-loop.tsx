'use client';

import { useEffect, useRef } from 'react';
import {
  Github, Box, Triangle, Zap, Atom, Server, Terminal, Coffee,
  FileCode, Globe, Palette, Database, Cloud, Settings, Code2, Layers
} from 'lucide-react';

interface LogoLoopProps {
  speed?: number;
  logoHeight?: number;
  className?: string;
}

export default function LogoLoop({
  speed = 160,
  logoHeight = 40,
  className = ''
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId: number;
    let currentPosition = 0;

    const animate = () => {
      if (container) {
        currentPosition -= speed / 60; // 60fps
        const totalWidth = container.scrollWidth / 2;

        if (currentPosition <= -totalWidth) {
          currentPosition = 0;
        }

        container.style.transform = `translateX(${currentPosition}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    // Start animation
    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [speed]);

  const logos = [
    { name: 'TypeScript', icon: <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400" /> },
    { name: 'Vercel', icon: <Triangle className="w-8 h-8 text-black dark:text-neutral-500" /> },
    { name: 'GitHub', icon: <Github className="w-8 h-8 text-purple-700 dark:text-purple-400" /> },
    { name: 'Docker', icon: <Box className="w-8 h-8 text-blue-500 dark:text-blue-300" /> },
    { name: 'Next.js', icon: <Layers className="w-8 h-8 text-black dark:text-neutral-500" /> },
    { name: 'Lightning', icon: <Zap className="w-8 h-8 text-yellow-500 dark:text-yellow-300" /> },
    { name: 'Svelte', icon: <Code2 className="w-8 h-8 text-orange-500 dark:text-orange-400" /> },
    { name: 'React', icon: <Atom className="w-8 h-8 text-blue-400 dark:text-blue-300" /> },
    { name: 'Node.js', icon: <Server className="w-8 h-8 text-green-600 dark:text-green-400" /> },
    { name: 'Python', icon: <Terminal className="w-8 h-8 text-yellow-600 dark:text-yellow-400" /> },
    { name: 'Java', icon: <Coffee className="w-8 h-8 text-red-600 dark:text-red-400" /> },
    { name: 'JavaScript', icon: <FileCode className="w-8 h-8 text-yellow-500 dark:text-yellow-300" /> },
    { name: 'HTML', icon: <Globe className="w-8 h-8 text-orange-600 dark:text-orange-400" /> },
    { name: 'CSS', icon: <Palette className="w-8 h-8 text-blue-500 dark:text-blue-300" /> },
    { name: 'MongoDB', icon: <Database className="w-8 h-8 text-green-500 dark:text-green-400" /> },
    { name: 'PostgreSQL', icon: <Database className="w-8 h-8 text-blue-700 dark:text-blue-400" /> },
    { name: 'Redis', icon: <Database className="w-8 h-8 text-red-500 dark:text-red-400" /> },
    { name: 'AWS', icon: <Cloud className="w-8 h-8 text-orange-500 dark:text-orange-400" /> },
    { name: 'Kubernetes', icon: <Settings className="w-8 h-8 text-blue-600 dark:text-blue-400" /> },
    { name: 'Linux', icon: <Terminal className="w-8 h-8 text-amber-600 dark:text-amber-400" /> }
  ];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        ref={containerRef}
        className="flex items-center"
        style={{
          height: `${logoHeight + 20}px`,
          width: '200%'
        }}
      >
        {/* First set of logos */}
        <div className="flex items-center">
          {logos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex items-center justify-center mx-8 whitespace-nowrap group"
              style={{ height: `${logoHeight}px` }}
            >
              <div
                className="text-2xl font-bold transition-transform duration-300 group-hover:scale-110"
              >
                {logo.icon}
              </div>
              <span
                className="ml-2 text-xs font-bold uppercase tracking-widest font-mono transition-colors duration-300 text-gray-500 dark:text-gray-400"
              >
                {logo.name}
              </span>
            </div>
          ))}
        </div>

        {/* Duplicate set for seamless loop */}
        <div className="flex items-center">
          {logos.map((logo, index) => (
            <div
              key={`${logo.name}-duplicate-${index}`}
              className="flex items-center justify-center mx-8 whitespace-nowrap group"
              style={{ height: `${logoHeight}px` }}
            >
              <div
                className="text-2xl font-bold transition-transform duration-300 group-hover:scale-110"
              >
                {logo.icon}
              </div>
              <span
                className="ml-2 text-xs font-bold uppercase tracking-widest font-mono transition-colors duration-300 text-gray-500 dark:text-gray-400"
              >
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
