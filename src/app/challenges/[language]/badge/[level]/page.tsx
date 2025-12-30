'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getChallengeByLanguage } from '@/data/challenges';

export default function BadgeDownloadPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const language = params.language as string;
  const levelNum = parseInt(params.level as string);
  const userCode = searchParams.get('code') || '';
  const userName = searchParams.get('name') || 'Challenger';
  
  const challengeData = getChallengeByLanguage(language);

  const getGradientColors = () => {
    switch (language) {
      case 'python':
        return { primary: '#3776AB', secondary: '#FFD43B', accent: '#4B8BBE' };
      case 'java':
        return { primary: '#ED8B00', secondary: '#5382A1', accent: '#F89820' };
      case 'javascript':
        return { primary: '#F7DF1E', secondary: '#323330', accent: '#F0DB4F' };
      case 'sql':
        return { primary: '#00758F', secondary: '#F29111', accent: '#4479A1' };
      default:
        return { primary: '#8B5CF6', secondary: '#EC4899', accent: '#A855F7' };
    }
  };

  const drawBadge = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = getGradientColors();
    const size = 500;
    const center = size / 2;

    ctx.clearRect(0, 0, size, size);

    // Background
    const bgGradient = ctx.createRadialGradient(center, center, 0, center, center, center);
    bgGradient.addColorStop(0, '#1a1a2e');
    bgGradient.addColorStop(1, '#0f0f1a');
    ctx.fillStyle = bgGradient;
    ctx.beginPath();
    ctx.arc(center, center, center, 0, Math.PI * 2);
    ctx.fill();

    // Outer ring
    const outerRingGradient = ctx.createLinearGradient(0, 0, size, size);
    outerRingGradient.addColorStop(0, colors.primary);
    outerRingGradient.addColorStop(0.5, colors.secondary);
    outerRingGradient.addColorStop(1, colors.primary);
    
    ctx.beginPath();
    ctx.arc(center, center, 240, 0, Math.PI * 2);
    ctx.strokeStyle = outerRingGradient;
    ctx.lineWidth = 12;
    ctx.stroke();

    // Decorative dots
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2 - Math.PI / 2;
      const x = center + Math.cos(angle) * 200;
      const y = center + Math.sin(angle) * 200;
      
      ctx.beginPath();
      ctx.arc(x, y, i % 3 === 0 ? 6 : 3, 0, Math.PI * 2);
      ctx.fillStyle = i % 3 === 0 ? colors.primary : 'rgba(255, 255, 255, 0.3)';
      ctx.fill();
    }

    // Main circle
    const mainGradient = ctx.createLinearGradient(center - 150, center - 150, center + 150, center + 150);
    mainGradient.addColorStop(0, colors.primary);
    mainGradient.addColorStop(1, colors.accent);
    
    ctx.beginPath();
    ctx.arc(center, center, 160, 0, Math.PI * 2);
    ctx.fillStyle = mainGradient;
    ctx.fill();

    // Highlight
    const highlightGradient = ctx.createRadialGradient(center - 40, center - 60, 0, center, center, 160);
    highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    highlightGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
    highlightGradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
    
    ctx.beginPath();
    ctx.arc(center, center, 158, 0, Math.PI * 2);
    ctx.fillStyle = highlightGradient;
    ctx.fill();

    // Border
    ctx.beginPath();
    ctx.arc(center, center, 160, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Level text
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 100px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`L${levelNum}`, center, center - 30);
    ctx.restore();

    // Language icon
    ctx.font = '50px "Segoe UI Emoji", Arial, sans-serif';
    ctx.fillText(challengeData?.icon || '🏆', center, center + 50);

    // OHG365
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px "Segoe UI", Arial, sans-serif';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 5;
    ctx.fillText('OHG365', center, center + 110);

    // Stars
    const drawStar = (cx: number, cy: number, spikes: number, outerR: number, innerR: number) => {
      let rot = Math.PI / 2 * 3;
      const step = Math.PI / spikes;
      ctx.beginPath();
      ctx.moveTo(cx, cy - outerR);
      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
        rot += step;
        ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
        rot += step;
      }
      ctx.closePath();
      ctx.fillStyle = '#FFD700';
      ctx.fill();
    };

    drawStar(center - 80, 70, 5, 12, 6);
    drawStar(center, 50, 5, 18, 9);
    drawStar(center + 80, 70, 5, 12, 6);

    // Ribbon
    const ribbonY = size - 80;
    ctx.fillStyle = colors.secondary;
    ctx.beginPath();
    ctx.moveTo(center - 120, ribbonY - 25);
    ctx.lineTo(center + 120, ribbonY - 25);
    ctx.lineTo(center + 120, ribbonY + 25);
    ctx.lineTo(center - 120, ribbonY + 25);
    ctx.closePath();
    ctx.fill();

    // Ribbon tails
    ctx.fillStyle = colors.secondary;
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.moveTo(center - 120, ribbonY - 25);
    ctx.lineTo(center - 145, ribbonY - 35);
    ctx.lineTo(center - 135, ribbonY);
    ctx.lineTo(center - 150, ribbonY + 35);
    ctx.lineTo(center - 120, ribbonY + 25);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(center + 120, ribbonY - 25);
    ctx.lineTo(center + 145, ribbonY - 35);
    ctx.lineTo(center + 135, ribbonY);
    ctx.lineTo(center + 150, ribbonY + 35);
    ctx.lineTo(center + 120, ribbonY + 25);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;

    // User name on ribbon
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px "Segoe UI", Arial, sans-serif';
    ctx.fillText(userName.toUpperCase(), center, ribbonY + 8);

    // Language and date
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '14px "Segoe UI", Arial, sans-serif';
    ctx.fillText(`${challengeData?.displayName || language} • Level ${levelNum}`, center, size - 35);
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '12px "Segoe UI", Arial, sans-serif';
    ctx.fillText(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }), center, size - 15);
  };

  useEffect(() => {
    drawBadge();
  }, [language, levelNum, userName]);

  const handleDownload = () => {
    setIsDownloading(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `OHG365_${challengeData?.displayName}_Level${levelNum}_Badge.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    setTimeout(() => setIsDownloading(false), 1000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(userCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!challengeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Badge Not Found</h1>
          <Link href="/challenges" className="text-purple-400 hover:text-purple-300">
            ← Back to Challenges
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ opacity: [0.1, 0.5, 0.1], scale: [1, 1.5, 1] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto text-center"
        >
          <Link href={`/challenges/${language}?code=${encodeURIComponent(userCode)}&name=${encodeURIComponent(userName)}`} className="inline-block mb-8">
            <span className="text-white/60 hover:text-white transition-colors">← Back to Neural Path</span>
          </Link>

          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="text-6xl mb-4">
            🎉
          </motion.div>

          <h1 className="text-4xl font-bold text-white mb-2">Congratulations!</h1>
          <p className="text-white/60 mb-4">You&apos;ve earned the Level {levelNum} {challengeData.displayName} Badge!</p>

          {/* Progress Code */}
          {userCode && (
            <div className="bg-cyan-500/10 rounded-xl p-4 border border-cyan-500/30 mb-6">
              <div className="text-cyan-400/70 text-xs mb-1">Your Progress Code</div>
              <div className="font-mono text-cyan-400 tracking-wider mb-2">{userCode}</div>
              <button
                onClick={copyCode}
                className="px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded text-sm transition-colors"
              >
                {copied ? '✓ Copied!' : '📋 Copy'}
              </button>
            </div>
          )}

          {/* Badge Preview */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateY: 180 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ delay: 0.3, type: 'spring', duration: 0.8 }}
            className="mb-8 relative"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full blur-3xl opacity-30 animate-pulse" />
            </div>
            <canvas
              ref={canvasRef}
              width={500}
              height={500}
              className="mx-auto rounded-full shadow-2xl relative z-10"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </motion.div>

          {/* Download Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={handleDownload}
            disabled={isDownloading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-green-500/30 disabled:opacity-50"
          >
            {isDownloading ? '✓ Downloaded!' : '⬇️ Download Badge'}
          </motion.button>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href={`/challenges/${language}?code=${encodeURIComponent(userCode)}&name=${encodeURIComponent(userName)}`}
              className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              ← Back to Levels
            </Link>
            {levelNum < 10 && (
              <Link
                href={`/challenges/${language}/level/${levelNum + 1}?code=${encodeURIComponent(userCode)}&name=${encodeURIComponent(userName)}`}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-pink-500 transition-colors"
              >
                Next Level →
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
