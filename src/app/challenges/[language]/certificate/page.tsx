'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getChallengeByLanguage } from '@/data/challenges';

export default function MasterCertificatePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const language = params.language as string;
  const userCode = searchParams.get('code') || '';
  const userName = searchParams.get('name') || 'Challenger';
  
  const challengeData = getChallengeByLanguage(language);

  const drawCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 800;
    const height = 600;

    ctx.clearRect(0, 0, width, height);

    // Background
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#1e1b4b');
    bgGradient.addColorStop(0.5, '#312e81');
    bgGradient.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Borders
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, width - 40, height - 40);
    
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 30, width - 60, height - 60);

    // Corner decorations
    [[40, 40], [width - 40, 40], [40, height - 40], [width - 40, height - 40]].forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fillStyle = '#fbbf24';
      ctx.fill();
    });

    // Header
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 48px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE', width / 2, 100);

    ctx.fillStyle = '#e5e7eb';
    ctx.font = '24px Georgia, serif';
    ctx.fillText('of Achievement', width / 2, 135);

    // Divider
    ctx.beginPath();
    ctx.moveTo(200, 160);
    ctx.lineTo(600, 160);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Certify text
    ctx.fillStyle = '#9ca3af';
    ctx.font = '18px Georgia, serif';
    ctx.fillText('This is to certify that', width / 2, 200);

    // User name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 42px Georgia, serif';
    ctx.fillText(userName, width / 2, 260);

    // Name underline
    const nameWidth = ctx.measureText(userName).width;
    ctx.beginPath();
    ctx.moveTo((width - nameWidth) / 2 - 20, 275);
    ctx.lineTo((width + nameWidth) / 2 + 20, 275);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Achievement text
    ctx.fillStyle = '#9ca3af';
    ctx.font = '18px Georgia, serif';
    ctx.fillText('has successfully completed all 10 levels of the', width / 2, 320);

    // Language
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 36px Georgia, serif';
    ctx.fillText(`${challengeData?.displayName || language} Challenge`, width / 2, 370);

    // Description
    ctx.fillStyle = '#9ca3af';
    ctx.font = '16px Georgia, serif';
    ctx.fillText('demonstrating exceptional proficiency in programming concepts,', width / 2, 410);
    ctx.fillText('problem-solving skills, and coding excellence.', width / 2, 435);

    // Master badge
    const badgeGradient = ctx.createLinearGradient(350, 460, 450, 560);
    badgeGradient.addColorStop(0, '#8b5cf6');
    badgeGradient.addColorStop(0.5, '#ec4899');
    badgeGradient.addColorStop(1, '#06b6d4');
    
    ctx.beginPath();
    ctx.arc(width / 2, 510, 45, 0, Math.PI * 2);
    ctx.fillStyle = badgeGradient;
    ctx.fill();
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Arial, sans-serif';
    ctx.fillText('MASTER', width / 2, 505);
    ctx.font = 'bold 12px Arial, sans-serif';
    ctx.fillText('BADGE', width / 2, 520);

    // OHG365
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 24px Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('OHG365', 60, height - 50);

    // Date
    ctx.fillStyle = '#9ca3af';
    ctx.font = '14px Georgia, serif';
    ctx.textAlign = 'right';
    ctx.fillText(`Issued: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, width - 60, height - 50);

    // Certificate ID
    ctx.fillStyle = '#6b7280';
    ctx.font = '10px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Certificate ID: ${userCode || 'OHG365-' + language.toUpperCase() + '-' + Date.now().toString(36).toUpperCase()}`, width / 2, height - 35);
  };

  useEffect(() => {
    drawCertificate();
  }, [language, userName, userCode]);

  const handleDownload = () => {
    setIsDownloading(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `OHG365_${challengeData?.displayName}_Master_Certificate.png`;
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
          <h1 className="text-4xl font-bold mb-4">Certificate Not Found</h1>
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
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <Link href={`/challenges/${language}?code=${encodeURIComponent(userCode)}&name=${encodeURIComponent(userName)}`} className="inline-block mb-8">
            <span className="text-white/60 hover:text-white transition-colors">← Back to Neural Path</span>
          </Link>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="text-8xl mb-4"
          >
            🏆
          </motion.div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2">
            Master Certificate
          </h1>
          <p className="text-white/60 mb-4">{challengeData.displayName} - All 10 Levels Completed!</p>

          {/* Progress Code */}
          {userCode && (
            <div className="max-w-md mx-auto bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/30 mb-6">
              <div className="text-yellow-400/70 text-xs mb-1">Your Master Code</div>
              <div className="font-mono text-yellow-400 tracking-wider mb-2">{userCode}</div>
              <button
                onClick={copyCode}
                className="px-3 py-1 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded text-sm transition-colors"
              >
                {copied ? '✓ Copied!' : '📋 Copy'}
              </button>
            </div>
          )}

          {/* Certificate Preview */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="mb-8 overflow-x-auto"
          >
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="mx-auto rounded-2xl shadow-2xl shadow-purple-500/20"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </motion.div>

          {/* Download Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={handleDownload}
            disabled={isDownloading}
            className="px-10 py-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 text-white font-bold text-lg rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-orange-500/30 disabled:opacity-50"
          >
            {isDownloading ? '✓ Downloaded!' : '⬇️ Download Certificate'}
          </motion.button>

          {/* Congratulations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 p-8 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10 rounded-3xl border border-yellow-500/20"
          >
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">🎉 Congratulations, {userName}!</h3>
            <p className="text-white/70 max-w-2xl mx-auto">
              You have demonstrated exceptional skill and dedication by completing all 10 levels of the {challengeData.displayName} Challenge. 
              This achievement showcases your mastery of programming concepts, problem-solving abilities, and commitment to learning.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                <div
                  key={level}
                  className={`w-10 h-10 bg-gradient-to-br ${challengeData.color} rounded-full flex items-center justify-center shadow-lg`}
                >
                  <span className="text-white font-bold text-sm">L{level}</span>
                </div>
              ))}
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30">
                <span className="text-white font-bold text-xs">👑</span>
              </div>
            </div>
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8"
          >
            <Link
              href={`/challenges?code=${encodeURIComponent(userCode)}&name=${encodeURIComponent(userName)}`}
              className="inline-block px-8 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              ← Back to All Challenges
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
