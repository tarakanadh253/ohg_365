'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { getLanguageOptions } from '@/data/challenges';
import { createNewCode, decodeProgress, getTotalProgress } from '@/lib/challenge-code';

type Mode = 'choice' | 'new' | 'continue' | 'language';

export default function ChallengesPage() {
  const [mode, setMode] = useState<Mode>('choice');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userCode, setUserCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  
  const languageOptions = getLanguageOptions();

  const handleNewUser = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!userName.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!userEmail.trim() || !userEmail.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    
    const code = createNewCode(userName.trim(), userEmail.trim());
    setUserCode(code);
    setMode('language');
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!enteredCode.trim()) {
      setError('Please enter your code');
      return;
    }
    
    const progress = decodeProgress(enteredCode.trim());
    if (!progress) {
      setError('Invalid code. Please check and try again.');
      return;
    }
    
    setUserCode(enteredCode.trim().toUpperCase());
    setMode('language');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(userCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const progress = userCode ? getTotalProgress(userCode) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }} />
        
        {/* Neural network background lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern id="neural-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Link href="/" className="inline-block mb-8">
            <span className="text-white/60 hover:text-white transition-colors">← Back to Home</span>
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Coding Challenge Arena
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Test your skills with 25 MCQs and 2 coding challenges per level. Complete 10 levels to earn the Master Badge!
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
        >
          {[
            { label: 'Languages', value: '4', icon: '🌐' },
            { label: 'Levels', value: '10', icon: '📊' },
            { label: 'MCQs/Level', value: '25', icon: '❓' },
            { label: 'Coding/Level', value: '2', icon: '💻' },
          ].map((stat) => (
            <div 
              key={stat.label}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10 text-center"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {/* Choice Screen */}
          {mode === 'choice' && (
            <motion.div
              key="choice"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* New User */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMode('new')}
                  className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-3xl p-8 border border-purple-500/30 text-left hover:border-purple-400/50 transition-all group"
                >
                  <div className="text-5xl mb-4">🚀</div>
                  <h2 className="text-2xl font-bold text-white mb-2">New User</h2>
                  <p className="text-white/60">Start fresh and get your unique progress code</p>
                  <div className="mt-4 text-purple-400 group-hover:text-purple-300 font-semibold">
                    Get Started →
                  </div>
                </motion.button>

                {/* Continue */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMode('continue')}
                  className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 backdrop-blur-lg rounded-3xl p-8 border border-cyan-500/30 text-left hover:border-cyan-400/50 transition-all group"
                >
                  <div className="text-5xl mb-4">🔑</div>
                  <h2 className="text-2xl font-bold text-white mb-2">Continue</h2>
                  <p className="text-white/60">Enter your code to resume your progress</p>
                  <div className="mt-4 text-cyan-400 group-hover:text-cyan-300 font-semibold">
                    Enter Code →
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* New User Form */}
          {mode === 'new' && (
            <motion.div
              key="new"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-md mx-auto"
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
                <button
                  onClick={() => setMode('choice')}
                  className="text-white/60 hover:text-white transition-colors mb-6 flex items-center gap-2"
                >
                  ← Back
                </button>
                
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">👤</div>
                  <h2 className="text-2xl font-bold text-white">Create Your Profile</h2>
                  <p className="text-white/60 text-sm mt-2">Enter your details to get a unique progress code</p>
                </div>

                <form onSubmit={handleNewUser} className="space-y-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Your Name</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Your Email</label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  {error && (
                    <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-purple-500/25"
                  >
                    Generate My Code →
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* Continue Form */}
          {mode === 'continue' && (
            <motion.div
              key="continue"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-md mx-auto"
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
                <button
                  onClick={() => setMode('choice')}
                  className="text-white/60 hover:text-white transition-colors mb-6 flex items-center gap-2"
                >
                  ← Back
                </button>
                
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">🔑</div>
                  <h2 className="text-2xl font-bold text-white">Enter Your Code</h2>
                  <p className="text-white/60 text-sm mt-2">Paste your progress code to continue</p>
                </div>

                <form onSubmit={handleContinue} className="space-y-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Your Progress Code</label>
                    <input
                      type="text"
                      value={enteredCode}
                      onChange={(e) => setEnteredCode(e.target.value.toUpperCase())}
                      placeholder="OHG-XXXXXX-XXXXXXXX"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono text-center tracking-wider"
                    />
                  </div>

                  {error && (
                    <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-cyan-500/25"
                  >
                    Continue My Journey →
                  </button>
                </form>

                <div className="mt-6 text-center text-white/40 text-sm">
                  Don&apos;t have a code?{' '}
                  <button onClick={() => setMode('new')} className="text-purple-400 hover:text-purple-300">
                    Create new profile
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Language Selection */}
          {mode === 'language' && (
            <motion.div
              key="language"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl mx-auto"
            >
              {/* Progress Code Display */}
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/30 mb-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="text-white/60 text-sm mb-1">Your Progress Code</div>
                    <div className="font-mono text-xl text-green-400 tracking-wider">{userCode}</div>
                  </div>
                  <button
                    onClick={copyCode}
                    className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors flex items-center gap-2"
                  >
                    {copied ? '✓ Copied!' : '📋 Copy Code'}
                  </button>
                </div>
                <div className="mt-3 text-white/50 text-sm">
                  ⚠️ Save this code! You&apos;ll need it to continue your progress later.
                </div>
                {progress && progress.completed > 0 && (
                  <div className="mt-3 text-white/70 text-sm">
                    Overall Progress: {progress.completed}/{progress.total} levels completed
                  </div>
                )}
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => {
                      setMode('choice');
                      setUserCode('');
                    }}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    ← Start Over
                  </button>
                  {userName && (
                    <span className="text-white/60">Welcome, <span className="text-white font-semibold">{userName}</span>!</span>
                  )}
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  Select Programming Language
                </h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {languageOptions.map((lang) => {
                    const langProgress = userCode ? decodeProgress(userCode) : null;
                    const completed = langProgress?.[lang.value as keyof typeof langProgress] as number[] || [];
                    
                    return (
                      <button
                        key={lang.value}
                        onClick={() => setSelectedLanguage(lang.value)}
                        className={`p-6 rounded-2xl border-2 transition-all transform hover:scale-[1.02] relative ${
                          selectedLanguage === lang.value
                            ? 'border-purple-500 bg-purple-500/20'
                            : 'border-white/10 bg-white/5 hover:border-white/30'
                        }`}
                      >
                        <div className="text-4xl mb-2">{lang.icon}</div>
                        <div className="text-lg font-semibold text-white">{lang.label}</div>
                        {completed.length > 0 && (
                          <div className="absolute top-2 right-2 bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                            {completed.length}/10
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedLanguage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Link
                      href={`/challenges/${selectedLanguage}?code=${encodeURIComponent(userCode)}&name=${encodeURIComponent(userName)}`}
                      className="block w-full py-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-cyan-500/25 text-center"
                    >
                      Start {languageOptions.find(l => l.value === selectedLanguage)?.label} Challenge →
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* How It Works */}
        {mode === 'choice' && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-white text-center mb-8">How It Works</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Get Your Code', description: 'Enter name & email to get a unique progress code', icon: '🔑' },
                { step: '2', title: 'Choose Language', description: 'Select Python, Java, JavaScript, or SQL', icon: '💻' },
                { step: '3', title: 'Complete Levels', description: 'Answer 25 MCQs and solve 2 coding challenges', icon: '🎯' },
                { step: '4', title: 'Earn Badges', description: 'Get badges for each level, Master Badge for all 10!', icon: '🏆' },
              ].map((feature) => (
                <div
                  key={feature.step}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 text-center"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">
                    {feature.step}
                  </div>
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                  <p className="text-white/60 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
