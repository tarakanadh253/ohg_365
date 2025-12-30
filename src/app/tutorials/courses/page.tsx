'use client';

import { useEffect, useState } from 'react';
import React from 'react';
import { AUTH_SYSTEM_AVAILABLE } from '@/config/authStatus';
import { TechnologyCard, CardGrid } from '@/components/ui/technology-card';

export default function CoursesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
    AUTH_SYSTEM_AVAILABLE ? null : true
  );

  useEffect(() => {
    if (!AUTH_SYSTEM_AVAILABLE) {
      setIsAuthenticated(true);
      return;
    }
    // Check authentication immediately on mount
    const token = localStorage.getItem('token');
    if (!token) {
      // Force immediate redirect - use replace to prevent back button
      window.location.replace(`/register?redirect=${encodeURIComponent('/tutorials/courses')}`);
      return;
    }
    setIsAuthenticated(true);
  }, []);

  // Don't render anything until we've checked authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#000000' }}>
        <div style={{ color: 'var(--text-primary)' }}>Checking authentication...</div>
      </div>
    );
  }

  // If not authenticated (shouldn't reach here due to redirect, but safety check)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#000000' }}>
        <div style={{ color: 'var(--text-primary)' }}>Redirecting to registration...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pb-20" style={{ backgroundColor: '#000000', paddingTop: '120px' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-rose-500/20 to-red-500/20 rounded-full border border-rose-500/30">
            <span className="text-rose-400 font-semibold">🎓 Courses</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-500">Courses</span>
          </h1>
          <p className="text-gray-400 text-xl">Comprehensive training programs for career advancement</p>
        </div>
        
        <CardGrid columns={3} className="max-w-6xl mx-auto">
          <TechnologyCard
            title="Azure Data Engineer"
            description="Master Azure data engineering, data pipelines, and cloud data solutions"
            icon={
              <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.482 18.394l6.625-3.844v7.688l-6.625-3.844zm7.875-10.463L12.606 2.65l-.096.056v7.694l8.849 5.138V7.93zm-9.481 5.138l-8.85-5.138L11.48 2.65l.096.056v10.462zm-.962 1.287L2.643 8.738v7.693l6.691 3.845v-7.688z" fill="#0078D4"/>
              </svg>
            }
            link="/tutorials/azure-data-engineer"
            gradient="from-blue-500 to-cyan-500"
          />
          <TechnologyCard
            title="Artificial Intelligence"
            description="Learn about Large Language Models, machine learning, and advanced AI technologies"
            icon={
              <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#aiGradient1)"/>
                <path d="M2 17L12 22L22 17" stroke="url(#aiGradient2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="url(#aiGradient3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="aiGradient1" x1="2" y1="7" x2="22" y2="7" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#A855F7"/>
                    <stop offset="100%" stopColor="#EC4899"/>
                  </linearGradient>
                  <linearGradient id="aiGradient2" x1="2" y1="17" x2="22" y2="17" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#A855F7"/>
                    <stop offset="100%" stopColor="#EC4899"/>
                  </linearGradient>
                  <linearGradient id="aiGradient3" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#A855F7"/>
                    <stop offset="100%" stopColor="#EC4899"/>
                  </linearGradient>
                </defs>
              </svg>
            }
            link="/tutorials/artificial-intelligence"
            gradient="from-purple-500 to-pink-500"
          />
        </CardGrid>
      </div>
    </main>
  );
}
