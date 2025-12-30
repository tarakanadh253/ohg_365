'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { getChallengeByLanguage } from '@/data/challenges';
import { updateProgressCode } from '@/lib/challenge-code';

type Phase = 'intro' | 'mcq' | 'coding' | 'results';

export default function LevelChallengePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  const language = params.language as string;
  const levelNum = parseInt(params.level as string);
  const userCode = searchParams.get('code') || '';
  const userName = searchParams.get('name') || 'Challenger';
  
  const challengeData = getChallengeByLanguage(language);
  const levelData = challengeData?.levels.find(l => l.level === levelNum);

  // State
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentMcqIndex, setCurrentMcqIndex] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState<(number | null)[]>([]);
  const [currentCodingIndex, setCurrentCodingIndex] = useState(0);
  const [codingAnswers, setCodingAnswers] = useState<string[]>([]);
  const [codingResults, setCodingResults] = useState<boolean[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentCode, setCurrentCode] = useState(userCode);
  const [copied, setCopied] = useState(false);

  // Initialize
  useEffect(() => {
    if (levelData) {
      setMcqAnswers(new Array(levelData.mcqs.length).fill(null));
      setCodingAnswers(levelData.codingChallenges.map(c => c.starterCode));
      setCodingResults(new Array(levelData.codingChallenges.length).fill(false));
    }
  }, [levelData]);

  // Timer for MCQ phase
  useEffect(() => {
    if (phase === 'mcq' && levelData) {
      setTimeLeft(levelData.mcqs.length * 120); // 2 min per question
      
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setPhase('coding');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [phase, levelData]);

  // Calculate results (before early return to use in useEffect)
  const mcqCorrect = levelData ? mcqAnswers.filter((answer, index) => 
    answer === levelData.mcqs[index].correctAnswer
  ).length : 0;
  const mcqPercentage = levelData ? Math.round((mcqCorrect / levelData.mcqs.length) * 100) : 0;
  const codingPassed = codingResults.filter(r => r).length;
  const allCodingPassed = levelData ? codingPassed === levelData.codingChallenges.length : false; // Must pass ALL coding challenges
  const mcqPassed = levelData ? mcqPercentage >= levelData.passingScore : false;
  const passed = mcqPassed && allCodingPassed; // Both MCQ AND all coding challenges required

  // Update code when level is completed
  useEffect(() => {
    if (phase === 'results' && passed && userCode && levelData) {
      const newCode = updateProgressCode(userCode, language as 'python' | 'java' | 'javascript' | 'sql', levelNum);
      setCurrentCode(newCode);
    }
  }, [phase, passed, userCode, language, levelNum, levelData]);

  if (!challengeData || !levelData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Level Not Found</h1>
          <Link href={`/challenges/${language}?code=${encodeURIComponent(userCode)}&name=${encodeURIComponent(userName)}`} className="text-purple-400 hover:text-purple-300">
            ← Back to Levels
          </Link>
        </div>
      </div>
    );
  }

  const currentMcq = levelData.mcqs[currentMcqIndex];
  const currentCoding = levelData.codingChallenges[currentCodingIndex];

  const handleMcqAnswer = (answerIndex: number) => {
    const newAnswers = [...mcqAnswers];
    newAnswers[currentMcqIndex] = answerIndex;
    setMcqAnswers(newAnswers);
  };

  const nextMcq = () => {
    if (currentMcqIndex < levelData.mcqs.length - 1) {
      setCurrentMcqIndex(currentMcqIndex + 1);
    } else {
      setPhase('coding');
    }
  };

  const prevMcq = () => {
    if (currentMcqIndex > 0) {
      setCurrentMcqIndex(currentMcqIndex - 1);
    }
  };

  const handleCodingSubmit = () => {
    const code = codingAnswers[currentCodingIndex];
    const expected = currentCoding.expectedOutput.toLowerCase().trim();
    
    // Simple validation
    const codeContainsExpected = code.toLowerCase().includes(expected) || 
      code.toLowerCase().includes(`"${expected}"`) ||
      code.toLowerCase().includes(`'${expected}'`);
    
    const newResults = [...codingResults];
    newResults[currentCodingIndex] = codeContainsExpected;
    setCodingResults(newResults);

    if (currentCodingIndex < levelData.codingChallenges.length - 1) {
      setCurrentCodingIndex(currentCodingIndex + 1);
    } else {
      setPhase('results');
    }
  };

  const skipCoding = () => {
    if (currentCodingIndex < levelData.codingChallenges.length - 1) {
      setCurrentCodingIndex(currentCodingIndex + 1);
    } else {
      setPhase('results');
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* INTRO PHASE */}
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto text-center"
            >
              <Link href={`/challenges/${language}?code=${encodeURIComponent(userCode)}&name=${encodeURIComponent(userName)}`} className="inline-block mb-8">
                <span className="text-white/60 hover:text-white transition-colors">← Back to Neural Path</span>
              </Link>

              <div className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-br ${challengeData.color} rounded-full flex items-center justify-center shadow-2xl`}>
                <span className="text-white font-bold text-3xl">{levelNum}</span>
              </div>

              <h1 className="text-4xl font-bold text-white mb-2">Level {levelNum}</h1>
              <h2 className="text-2xl text-white/70 mb-4">{levelData.title}</h2>
              <p className="text-white/60 mb-8">{levelData.description}</p>

              {/* User Info */}
              <div className="bg-white/5 rounded-xl p-4 mb-6 inline-block">
                <div className="text-white/60 text-sm">Playing as: <span className="text-cyan-400 font-semibold">{userName}</span></div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Challenge Overview</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-cyan-400">{levelData.mcqs.length}</div>
                    <div className="text-sm text-white/60">MCQ Questions</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-400">{levelData.codingChallenges.length}</div>
                    <div className="text-sm text-white/60">Coding Challenges</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-pink-400">{levelData.passingScore}%</div>
                    <div className="text-sm text-white/60">MCQ Passing Score</div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400 text-sm">
                  📋 <strong>Requirements to pass:</strong> Score {levelData.passingScore}%+ on MCQs AND complete ALL {levelData.codingChallenges.length} coding challenges
                </div>
              </div>

              <button
                onClick={() => setPhase('mcq')}
                className={`px-12 py-4 bg-gradient-to-r ${challengeData.color} text-white font-bold text-xl rounded-xl transition-all transform hover:scale-105 shadow-lg`}
              >
                Start Challenge →
              </button>
            </motion.div>
          )}

          {/* MCQ PHASE */}
          {phase === 'mcq' && currentMcq && (
            <motion.div
              key="mcq"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-white/60">
                  Question {currentMcqIndex + 1} of {levelData.mcqs.length}
                </div>
                <div className={`px-4 py-2 rounded-lg font-mono ${timeLeft < 60 ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white'}`}>
                  ⏱ {formatTime(timeLeft)}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-white/10 rounded-full mb-8 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${challengeData.color} transition-all duration-300`}
                  style={{ width: `${((currentMcqIndex + 1) / levelData.mcqs.length) * 100}%` }}
                />
              </div>

              {/* Question Card */}
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10 mb-6">
                <h3 className="text-xl font-semibold text-white mb-6">
                  {currentMcq.question}
                </h3>

                <div className="space-y-3">
                  {currentMcq.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleMcqAnswer(index)}
                      className={`w-full p-4 rounded-xl text-left transition-all ${
                        mcqAnswers[currentMcqIndex] === index
                          ? `bg-gradient-to-r ${challengeData.color} text-white`
                          : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <button
                  onClick={prevMcq}
                  disabled={currentMcqIndex === 0}
                  className="px-6 py-3 bg-white/10 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
                >
                  ← Previous
                </button>
                <button
                  onClick={nextMcq}
                  className={`px-6 py-3 bg-gradient-to-r ${challengeData.color} text-white font-semibold rounded-lg hover:opacity-90 transition-opacity`}
                >
                  {currentMcqIndex === levelData.mcqs.length - 1 ? 'Continue to Coding →' : 'Next →'}
                </button>
              </div>

              {/* Quick Navigation */}
              <div className="mt-8 flex flex-wrap gap-2 justify-center">
                {levelData.mcqs.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMcqIndex(index)}
                    className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all ${
                      index === currentMcqIndex
                        ? `bg-gradient-to-r ${challengeData.color} text-white`
                        : mcqAnswers[index] !== null
                        ? 'bg-green-500/30 text-green-400'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* CODING PHASE */}
          {phase === 'coding' && currentCoding && (
            <motion.div
              key="coding"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-white/60">
                  Coding Challenge {currentCodingIndex + 1} of {levelData.codingChallenges.length}
                </div>
                <div className="text-white/60">
                  MCQ Score: {mcqCorrect}/{levelData.mcqs.length} ({mcqPercentage}%)
                </div>
              </div>

              {/* Challenge Card */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{currentCoding.title}</h3>
                <p className="text-white/70 mb-4">{currentCoding.description}</p>
                <div className="text-sm text-white/50">
                  Expected Output: <code className="bg-white/10 px-2 py-1 rounded">{currentCoding.expectedOutput}</code>
                </div>
              </div>

              {/* Code Editor */}
              <div className="bg-slate-800 rounded-2xl overflow-hidden border border-white/10 mb-6">
                <div className="bg-slate-700 px-4 py-2 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-white/60 text-sm">{challengeData.displayName} Code</span>
                </div>
                <textarea
                  value={codingAnswers[currentCodingIndex]}
                  onChange={(e) => {
                    const newAnswers = [...codingAnswers];
                    newAnswers[currentCodingIndex] = e.target.value;
                    setCodingAnswers(newAnswers);
                  }}
                  className="w-full h-64 p-4 bg-transparent text-green-400 font-mono text-sm focus:outline-none resize-none"
                  spellCheck={false}
                />
              </div>

              {/* Actions */}
              <div className="flex justify-between">
                <button
                  onClick={skipCoding}
                  className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  Skip →
                </button>
                <button
                  onClick={handleCodingSubmit}
                  className={`px-8 py-3 bg-gradient-to-r ${challengeData.color} text-white font-semibold rounded-lg hover:opacity-90 transition-opacity`}
                >
                  {currentCodingIndex === levelData.codingChallenges.length - 1 ? 'Submit & View Results' : 'Submit & Next'}
                </button>
              </div>
            </motion.div>
          )}

          {/* RESULTS PHASE */}
          {phase === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto text-center"
            >
              {passed ? (
                <>
                  <motion.div 
                    className="text-8xl mb-6"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    🎉
                  </motion.div>
                  <h1 className="text-4xl font-bold text-green-400 mb-4">Level {levelNum} Complete!</h1>
                  <p className="text-white/70 mb-8">Congratulations, {userName}! You&apos;ve earned the Level {levelNum} badge!</p>
                </>
              ) : (
                <>
                  <div className="text-8xl mb-6">😔</div>
                  <h1 className="text-4xl font-bold text-red-400 mb-4">Not Quite!</h1>
                  <p className="text-white/70 mb-4">To pass this level, you need:</p>
                  <div className="flex flex-col gap-2 mb-6 text-left max-w-sm mx-auto">
                    <div className={`flex items-center gap-3 p-3 rounded-lg ${mcqPassed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      <span className="text-xl">{mcqPassed ? '✓' : '✗'}</span>
                      <span>MCQ Score: {mcqPercentage}% (need {levelData.passingScore}%)</span>
                    </div>
                    <div className={`flex items-center gap-3 p-3 rounded-lg ${allCodingPassed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      <span className="text-xl">{allCodingPassed ? '✓' : '✗'}</span>
                      <span>Coding Challenges: {codingPassed}/{levelData.codingChallenges.length} passed (need all {levelData.codingChallenges.length})</span>
                    </div>
                  </div>
                </>
              )}

              {/* Updated Code Display */}
              {passed && currentCode !== userCode && (
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30 mb-6">
                  <div className="text-green-400 font-semibold mb-2">🎯 Your Progress Code Updated!</div>
                  <div className="font-mono text-lg text-green-300 tracking-wider mb-2">{currentCode}</div>
                  <button
                    onClick={copyCode}
                    className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors text-sm"
                  >
                    {copied ? '✓ Copied!' : '📋 Copy New Code'}
                  </button>
                  <div className="text-green-400/60 text-xs mt-2">Save this code to continue later!</div>
                </div>
              )}

              {/* Score Card */}
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10 mb-8">
                <h3 className="text-lg font-semibold text-white mb-6">Your Results</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className={`p-4 rounded-xl ${mcqPassed ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                    <div className={`text-4xl font-bold ${mcqPassed ? 'text-green-400' : 'text-red-400'}`}>
                      {mcqPercentage}%
                    </div>
                    <div className="text-white/60">MCQ Score</div>
                    <div className="text-sm text-white/40">{mcqCorrect}/{levelData.mcqs.length} correct</div>
                    <div className={`text-xs mt-1 ${mcqPassed ? 'text-green-400' : 'text-red-400'}`}>
                      {mcqPassed ? '✓ Passed' : `✗ Need ${levelData.passingScore}%`}
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl ${allCodingPassed ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                    <div className={`text-4xl font-bold ${allCodingPassed ? 'text-green-400' : 'text-red-400'}`}>
                      {codingPassed}/{levelData.codingChallenges.length}
                    </div>
                    <div className="text-white/60">Coding Passed</div>
                    <div className={`text-xs mt-1 ${allCodingPassed ? 'text-green-400' : 'text-red-400'}`}>
                      {allCodingPassed ? '✓ All Passed' : `✗ Need all ${levelData.codingChallenges.length}`}
                    </div>
                  </div>
                </div>
                {!passed && (
                  <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm">
                    ⚠️ You must pass BOTH the MCQ ({levelData.passingScore}%+) AND complete ALL {levelData.codingChallenges.length} coding challenges to unlock the next level.
                  </div>
                )}
              </div>

              {/* Badge */}
              {passed && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className="mb-8"
                >
                  <div className={`w-32 h-32 mx-auto bg-gradient-to-br ${challengeData.color} rounded-full flex items-center justify-center shadow-2xl`}>
                    <div className="text-center">
                      <div className="text-white font-bold text-2xl">L{levelNum}</div>
                      <div className="text-white/80 text-xs">OHG365</div>
                    </div>
                  </div>
                  <Link
                    href={`/challenges/${language}/badge/${levelNum}?code=${encodeURIComponent(currentCode)}&name=${encodeURIComponent(userName)}`}
                    className="inline-block mt-4 text-purple-400 hover:text-purple-300 underline"
                  >
                    Download Badge →
                  </Link>
                </motion.div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {!passed && (
                  <button
                    onClick={() => {
                      setPhase('intro');
                      setCurrentMcqIndex(0);
                      setMcqAnswers(new Array(levelData.mcqs.length).fill(null));
                      setCurrentCodingIndex(0);
                      setCodingAnswers(levelData.codingChallenges.map(c => c.starterCode));
                      setCodingResults(new Array(levelData.codingChallenges.length).fill(false));
                    }}
                    className={`px-8 py-3 bg-gradient-to-r ${challengeData.color} text-white font-semibold rounded-lg hover:opacity-90 transition-opacity`}
                  >
                    Try Again
                  </button>
                )}
                <Link
                  href={`/challenges/${language}?code=${encodeURIComponent(currentCode)}&name=${encodeURIComponent(userName)}`}
                  className="px-8 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
                >
                  Back to Neural Path
                </Link>
                {passed && levelNum < 10 && (
                  <Link
                    href={`/challenges/${language}/level/${levelNum + 1}?code=${encodeURIComponent(currentCode)}&name=${encodeURIComponent(userName)}`}
                    className={`px-8 py-3 bg-gradient-to-r ${challengeData.color} text-white font-semibold rounded-lg hover:opacity-90 transition-opacity`}
                  >
                    Next Level →
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
