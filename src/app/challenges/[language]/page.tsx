'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getChallengeByLanguage } from '@/data/challenges';
import { getLanguageProgress, hasMasterBadge, updateProgressCode } from '@/lib/challenge-code';

export default function LanguageLevelsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const language = params.language as string;
  const userCode = searchParams.get('code') || '';
  const userName = searchParams.get('name') || 'Challenger';
  
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [currentCode, setCurrentCode] = useState(userCode);
  const [copied, setCopied] = useState(false);
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const challengeData = getChallengeByLanguage(language);

  useEffect(() => {
    if (userCode) {
      const progress = getLanguageProgress(userCode, language as 'python' | 'java' | 'javascript' | 'sql');
      setCompletedLevels(progress);
      setCurrentCode(userCode);
    }
  }, [userCode, language]);

  const copyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!challengeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Language Not Found</h1>
          <Link href="/challenges" className="text-purple-400 hover:text-purple-300">
            ← Back to Challenges
          </Link>
        </div>
      </div>
    );
  }

  const isMaster = hasMasterBadge(currentCode, language as 'python' | 'java' | 'javascript' | 'sql');

  // Neural network node positions - vertical zigzag
  const getNodePosition = (index: number) => {
    const positions = [
      { x: 50, align: 'center' },   // Level 1 - center
      { x: 25, align: 'left' },     // Level 2 - left
      { x: 75, align: 'right' },    // Level 3 - right
      { x: 25, align: 'left' },     // Level 4 - left
      { x: 75, align: 'right' },    // Level 5 - right
      { x: 50, align: 'center' },   // Level 6 - center
      { x: 25, align: 'left' },     // Level 7 - left
      { x: 75, align: 'right' },    // Level 8 - right
      { x: 25, align: 'left' },     // Level 9 - left
      { x: 50, align: 'center' },   // Level 10 - center (Master)
    ];
    return positions[index] || positions[0];
  };

  const getNodeColor = (level: number, isCompleted: boolean, isLocked: boolean) => {
    if (isLocked) return { bg: 'from-gray-600 to-gray-700', border: 'border-gray-500' };
    if (isCompleted) return { bg: 'from-green-400 to-emerald-500', border: 'border-green-300' };
    
    const colors = [
      { bg: 'from-pink-500 to-rose-600', border: 'border-pink-400' },
      { bg: 'from-orange-400 to-amber-500', border: 'border-orange-300' },
      { bg: 'from-yellow-400 to-orange-500', border: 'border-yellow-300' },
      { bg: 'from-lime-400 to-green-500', border: 'border-lime-300' },
      { bg: 'from-cyan-400 to-teal-500', border: 'border-cyan-300' },
      { bg: 'from-blue-400 to-indigo-500', border: 'border-blue-300' },
      { bg: 'from-violet-400 to-purple-500', border: 'border-violet-300' },
      { bg: 'from-fuchsia-400 to-pink-500', border: 'border-fuchsia-300' },
      { bg: 'from-rose-400 to-red-500', border: 'border-rose-300' },
      { bg: 'from-amber-400 to-yellow-500', border: 'border-amber-300' },
    ];
    return colors[(level - 1) % colors.length];
  };

  // Generate SVG paths for neural network connections
  const generateConnections = () => {
    const connections = [];
    const nodeSpacing = 120;
    const startY = 80;

    for (let i = 0; i < 9; i++) {
      const current = getNodePosition(i);
      const next = getNodePosition(i + 1);
      const currentY = startY + i * nodeSpacing;
      const nextY = startY + (i + 1) * nodeSpacing;
      
      const isCompleted = completedLevels.includes(i + 1) && completedLevels.includes(i + 2);
      const isNextAvailable = completedLevels.includes(i + 1);
      
      // Calculate control points for smooth curve
      const midY = (currentY + nextY) / 2;
      
      connections.push({
        id: i,
        d: `M ${current.x}% ${currentY + 40} Q ${(current.x + next.x) / 2}% ${midY} ${next.x}% ${nextY - 40}`,
        isCompleted,
        isNextAvailable,
      });
    }
    return connections;
  };

  const connections = generateConnections();
  const nodeSpacing = 120;
  const startY = 80;
  const totalHeight = startY + 10 * nodeSpacing + 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Neural network background pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <defs>
            <pattern id="neural-bg" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1.5" fill="white" />
              <line x1="50" y1="50" x2="100" y2="0" stroke="white" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="0" y2="100" stroke="white" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="100" y2="100" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-bg)" />
        </svg>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <Link href={`/challenges?code=${encodeURIComponent(currentCode)}&name=${encodeURIComponent(userName)}`} className="inline-block mb-4">
            <span className="text-white/60 hover:text-white transition-colors">← Back to Languages</span>
          </Link>
          
          <div className="flex items-center justify-center gap-3 mb-2">
            <motion.span 
              className="text-5xl"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {challengeData.icon}
            </motion.span>
            <h1 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${challengeData.color} bg-clip-text text-transparent`}>
              {challengeData.displayName} Neural Path
            </h1>
          </div>
          
          <p className="text-white/70">
            Welcome, <span className="text-cyan-400 font-semibold">{userName}</span>! Navigate through the neural network.
          </p>
        </motion.div>

        {/* Progress Code Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto mb-6"
        >
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10 flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="text-white/50 text-xs mb-1">Your Progress Code</div>
              <div className="font-mono text-cyan-400 text-sm tracking-wider truncate">{currentCode}</div>
            </div>
            <button
              onClick={copyCode}
              className="px-3 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-colors text-sm whitespace-nowrap"
            >
              {copied ? '✓ Copied' : '📋 Copy'}
            </button>
          </div>
        </motion.div>

        {/* Progress Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-xl mx-auto mb-8"
        >
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="text-white/60">
              <span className="text-green-400 font-bold">{completedLevels.length}</span>/10 Levels
            </div>
            <div className="h-4 w-px bg-white/20" />
            <div className="text-white/60">
              Progress: <span className="text-cyan-400 font-bold">{Math.round((completedLevels.length / 10) * 100)}%</span>
            </div>
            {isMaster && (
              <>
                <div className="h-4 w-px bg-white/20" />
                <div className="text-yellow-400 font-bold flex items-center gap-1">
                  👑 Master
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Neural Network Map */}
        <div 
          ref={containerRef}
          className="relative max-w-lg mx-auto"
          style={{ height: `${totalHeight}px` }}
        >
          {/* SVG Connections */}
          <svg 
            className="absolute inset-0 w-full h-full" 
            style={{ zIndex: 0 }}
            viewBox={`0 0 100 ${totalHeight}`}
            preserveAspectRatio="none"
          >
            <defs>
              {/* Gradient for completed paths */}
              <linearGradient id="completedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              
              {/* Gradient for active path */}
              <linearGradient id="activeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              
              {/* Glow filter */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              {/* Pulse animation */}
              <filter id="pulse-glow">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feMerge>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Connection lines */}
            {connections.map((conn) => (
              <g key={conn.id}>
                {/* Background line */}
                <path
                  d={conn.d}
                  fill="none"
                  stroke={conn.isCompleted ? 'url(#completedGradient)' : conn.isNextAvailable ? 'url(#activeGradient)' : '#374151'}
                  strokeWidth={conn.isCompleted || conn.isNextAvailable ? '0.8' : '0.4'}
                  strokeDasharray={conn.isCompleted ? 'none' : '2 2'}
                  filter={conn.isCompleted ? 'url(#glow)' : 'none'}
                  opacity={conn.isCompleted ? 1 : conn.isNextAvailable ? 0.8 : 0.3}
                />
                
                {/* Animated pulse on completed connections */}
                {conn.isCompleted && (
                  <motion.circle
                    r="1"
                    fill="#22c55e"
                    filter="url(#pulse-glow)"
                  >
                    <animateMotion
                      dur="2s"
                      repeatCount="indefinite"
                      path={conn.d}
                    />
                  </motion.circle>
                )}
                
                {/* Animated pulse on active connection */}
                {conn.isNextAvailable && !conn.isCompleted && (
                  <motion.circle
                    r="0.8"
                    fill="#06b6d4"
                    filter="url(#pulse-glow)"
                  >
                    <animateMotion
                      dur="1.5s"
                      repeatCount="indefinite"
                      path={conn.d}
                    />
                  </motion.circle>
                )}
              </g>
            ))}
          </svg>

          {/* Level Nodes */}
          {challengeData.levels.map((level, index) => {
            const position = getNodePosition(index);
            const isCompleted = completedLevels.includes(level.level);
            const isLocked = level.level > 1 && !completedLevels.includes(level.level - 1) && !isCompleted;
            const isCurrent = !isCompleted && !isLocked;
            const nodeY = startY + index * nodeSpacing;
            const colors = getNodeColor(level.level, isCompleted, isLocked);
            const isHovered = hoveredLevel === level.level;

            return (
              <motion.div
                key={level.level}
                className="absolute"
                style={{
                  left: `${position.x}%`,
                  top: nodeY,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isHovered ? 30 : 10,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.08, type: 'spring', stiffness: 200 }}
                onMouseEnter={() => setHoveredLevel(level.level)}
                onMouseLeave={() => setHoveredLevel(null)}
              >
                {isLocked ? (
                  <div className="relative group">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${colors.bg} border-2 ${colors.border} flex items-center justify-center shadow-lg cursor-not-allowed opacity-50`}>
                      <span className="text-2xl">🔒</span>
                    </div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-gray-500 text-xs font-medium whitespace-nowrap">
                      Level {level.level}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={`/challenges/${language}/level/${level.level}?code=${encodeURIComponent(currentCode)}&name=${encodeURIComponent(userName)}`}
                    className="block relative group"
                  >
                    {/* Pulse ring for current level */}
                    {isCurrent && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-cyan-400"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ filter: 'blur(8px)' }}
                      />
                    )}
                    
                    {/* Completed glow */}
                    {isCompleted && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-green-400"
                        animate={{ opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ filter: 'blur(10px)' }}
                      />
                    )}

                    {/* Main node */}
                    <motion.div
                      className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${colors.bg} border-3 ${colors.border} flex items-center justify-center shadow-xl cursor-pointer overflow-hidden`}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      animate={isCurrent ? { y: [0, -3, 0] } : {}}
                      transition={isCurrent ? { duration: 1.5, repeat: Infinity } : {}}
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
                      
                      {isCompleted ? (
                        <span className="text-2xl">⭐</span>
                      ) : (
                        <span className="text-xl font-black text-white drop-shadow-lg">
                          {level.level}
                        </span>
                      )}
                    </motion.div>

                    {/* CLEARED tag for completed levels */}
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0, x: 20 }}
                        animate={{ scale: 1, x: 0 }}
                        className="absolute -right-16 top-1/2 -translate-y-1/2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg"
                      >
                        ✓ CLEARED
                      </motion.div>
                    )}

                    {/* Level label */}
                    <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap ${isCompleted ? 'text-green-400' : 'text-white/70'}`}>
                      {level.title.split(' ').slice(0, 2).join(' ')}
                    </div>

                    {/* Hover tooltip */}
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`absolute ${position.align === 'left' ? 'left-full ml-4' : position.align === 'right' ? 'right-full mr-4' : 'bottom-full mb-4 left-1/2 -translate-x-1/2'} w-48 p-3 bg-black/95 rounded-xl border border-white/20 shadow-2xl z-40`}
                      >
                        <div className="text-center">
                          <div className="text-cyan-400 font-bold text-sm mb-1">Level {level.level}</div>
                          <div className="text-white font-semibold text-xs mb-2">{level.title}</div>
                          <div className="text-white/60 text-xs mb-2">{level.description}</div>
                          <div className="flex justify-center gap-3 text-xs text-white/50">
                            <span>📝 {level.mcqs.length} MCQs</span>
                            <span>💻 {level.codingChallenges.length}</span>
                          </div>
                          <div className={`mt-2 text-xs font-bold ${isCompleted ? 'text-green-400' : 'text-cyan-400'}`}>
                            {isCompleted ? '✓ Completed!' : 'Click to Start →'}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </Link>
                )}
              </motion.div>
            );
          })}

          {/* Master Badge at the end */}
          {isMaster && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: 'spring' }}
              className="absolute left-1/2 -translate-x-1/2"
              style={{ top: startY + 10 * nodeSpacing + 30 }}
            >
              <Link
                href={`/challenges/${language}/certificate?code=${encodeURIComponent(currentCode)}&name=${encodeURIComponent(userName)}`}
                className="block"
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/50 border-4 border-yellow-300"
                  animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="text-3xl">👑</span>
                </motion.div>
                <div className="text-center mt-2 text-yellow-400 font-bold text-sm">
                  MASTER BADGE
                </div>
                <div className="text-center text-white/50 text-xs">
                  Click to download certificate
                </div>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-md mx-auto mt-8 p-4 bg-black/20 rounded-xl border border-white/10"
        >
          <div className="flex flex-wrap justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-500" />
              <span className="text-white/60">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 animate-pulse" />
              <span className="text-white/60">Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 opacity-50" />
              <span className="text-white/60">Locked</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
