'use client';

import Link from 'next/link';
import CompactSection from './CompactSection';

export default function CompactWeeklyTests() {
  return (
    <CompactSection
      title="Why are Weekly Tests on OHG365 unique?"
      subtitle="Join our comprehensive weekly test series designed specifically for Government exam preparation"
      backgroundColor="#ffffff"
    >
      {/* Weekly Test System Section */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider" style={{ color: '#7A94A5' }}>
          Weekly Assessment System
        </div>
        <h3 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Three-tier ranking system with Bronze, Silver, and Gold levels
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Track your progress through our unique three-tier ranking system and compete with hundreds of aspirants to achieve your target level.
        </p>
      </div>

      {/* Test Schedule Section */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider" style={{ color: '#7A94A5' }}>
          Regular Test Schedule
        </div>
        <h3 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Consistent weekly practice with detailed performance analysis
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Participate in our weekly test series conducted every Sunday from 10:00 AM to 12:00 PM. Get detailed performance analysis, compare your scores with peers, and track your progress through our comprehensive dashboard.
        </p>
      </div>

      {/* Test Levels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Bronze Level Card */}
        <div
          className="rounded-xl p-6 shadow-lg transition-all duration-300 h-full flex flex-col border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5"
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-lg flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #7A94A5 0%, #083D77 100%)',
            }}
          >
            <span className="text-2xl">🥉</span>
          </div>
          <div className="w-fit px-5 py-1.5 rounded-full bg-black border border-black mb-4">
            <h3 className="text-lg font-bold text-[#964B00] dark:text-[#E08F45]">
              Bronze Level
            </h3>
          </div>
          <p className="text-sm mb-4 leading-relaxed min-h-[60px] !text-black dark:text-white">
            Perfect for beginners. Score 40-60% to achieve Bronze level and build your foundation with comprehensive study materials.
          </p>
          <ul className="space-y-2 mb-6 flex-1">
            {[
              'Basic concepts and fundamentals',
              'Detailed explanations for each question',
              'Progress tracking and analytics',
              'Beginner-friendly study materials'
            ].map((item, index) => (
              <li key={index} className="flex items-start text-sm !text-black dark:text-white">
                <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 !text-gray-600 dark:!text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/tutorials/government-jobs"
            className="inline-flex items-center justify-center w-full font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 text-sm"
            style={{
              background: '#87CEFA',
              color: '#083D77',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(8, 61, 119, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Start Bronze Level
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </Link>
        </div>

        {/* Silver Level Card */}
        <div
          className="rounded-xl p-6 shadow-lg transition-all duration-300 h-full flex flex-col border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5"
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-lg flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #7A94A5 0%, #083D77 100%)',
            }}
          >
            <span className="text-2xl">🥈</span>
          </div>
          <div className="w-fit px-5 py-1.5 rounded-full bg-black border border-black mb-4">
            <h3 className="text-lg font-bold text-[#2D3748] dark:text-[#E2E8F0]">
              Silver Level
            </h3>
          </div>
          <p className="text-sm mb-4 leading-relaxed min-h-[60px] !text-black dark:text-white">
            Intermediate level. Score 60-80% to achieve Silver level and demonstrate solid understanding of exam patterns.
          </p>
          <ul className="space-y-2 mb-6 flex-1">
            {[
              'Advanced problem-solving techniques',
              'Time management strategies',
              'Comparative performance analysis',
              'Mock test series access'
            ].map((item, index) => (
              <li key={index} className="flex items-start text-sm !text-black dark:text-white">
                <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 !text-gray-600 dark:!text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/tutorials/government-jobs"
            className="inline-flex items-center justify-center w-full font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 text-sm shadow-md hover:shadow-lg"
            style={{
              background: '#87CEFA',
              color: '#083D77',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(8, 61, 119, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Start Silver Level
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </Link>
        </div>

        {/* Gold Level Card */}
        <div
          className="rounded-xl p-6 shadow-lg transition-all duration-300 h-full flex flex-col border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5"
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-lg flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #083D77 0%, #7A94A5 100%)',
            }}
          >
            <span className="text-2xl">🥇</span>
          </div>
          <div className="w-fit px-5 py-1.5 rounded-full bg-black border border-black mb-4">
            <h3 className="text-lg font-bold text-[#B7791F] dark:text-[#F6E05E]">
              Gold Level
            </h3>
          </div>
          <p className="text-sm mb-4 leading-relaxed min-h-[60px] !text-black dark:text-white">
            Expert level. Score 80%+ to achieve Gold level and join the elite group of top performers with exclusive benefits.
          </p>
          <ul className="space-y-2 mb-6 flex-1">
            {[
              'Master-level problem solving',
              'Exclusive study materials',
              'Leaderboard recognition',
              'Mentorship from experts'
            ].map((item, index) => (
              <li key={index} className="flex items-start text-sm !text-black dark:text-white">
                <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 !text-gray-600 dark:!text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/tutorials/government-jobs"
            className="inline-flex items-center justify-center w-full font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 text-sm shadow-md hover:shadow-lg"
            style={{
              background: '#87CEFA',
              color: '#083D77',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(8, 61, 119, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Start Gold Level
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </Link>
        </div >
      </div >
    </CompactSection >
  );
}

