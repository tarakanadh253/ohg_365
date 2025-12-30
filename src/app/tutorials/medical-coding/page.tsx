'use client';

import TechLayout from '@/components/tech-layout';
import Link from 'next/link';

export default function MedicalCodingLandingPage() {
  const modules = [
    {
      id: 'anatomy-medical-terminology',
      title: 'Anatomy and Medical Terminology',
      description: 'Learn the fundamentals of medical coding, anatomy, and medical terminology essential for medical coding professionals',
      icon: '🏥',
      href: '/tutorials/medical-coding/anatomy-medical-terminology',
      topics: ['Medical Coding Basics', 'Anatomy Fundamentals', 'Medical Terminology', 'ICD-10-CM', 'CPT', 'HCPCS']
    }
  ];

  return (
    <TechLayout
      technology="medical-coding"
      onThisPage={[]}
      activeSection=""
      setActiveSection={() => { }}
      activeSubsection={null}
      setActiveSubsection={() => { }}
      hideSidebar={true}
    >
      <div className="min-h-screen">
        {/* Header */}
        <div className="text-center mb-16">

          <h1 className="text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-orange-500">Medical Coding Course</span>
          </h1>
          <p className="text-gray-200 text-xl">Master medical coding, anatomy, and terminology for healthcare documentation</p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {modules.map((module) => (
            <Link
              key={module.id}
              href={module.href}
              className="group relative bg-[var(--bg-secondary)] rounded-xl p-8 border border-gray-100 dark:border-white/10 hover:border-sky-500/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-sky-500/10 h-full flex flex-col"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="text-4xl flex-shrink-0">{module.icon}</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-sky-400 transition-colors" style={{ color: 'var(--text-primary)' }}>
                    {module.title}
                  </h2>
                  <p className="text-sm mb-4 min-h-[40px]" style={{ color: 'var(--text-secondary)' }}>
                    {module.description}
                  </p>
                </div>
              </div>

              <div className="mt-auto">
                <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">Topics Covered</h3>
                <ul className="space-y-2">
                  {module.topics.map((topic, index) => (
                    <li key={index} className="flex items-center text-gray-300 text-sm">
                      <svg className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex items-center text-green-400 group-hover:text-green-300 transition-colors">
                <span className="text-sm font-semibold mr-2">Start Learning</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Course Overview */}
        <div className="bg-[#1a1a1a] rounded-xl p-8 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-6">Course Overview</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">What You'll Learn</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Medical coding fundamentals and principles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>ICD-10-CM, CPT, and HCPCS coding systems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Human anatomy and organ systems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Medical terminology (prefixes, suffixes, root words)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Revenue Cycle Management (RCM)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>CPC certification preparation</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Prerequisites</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>No prior medical knowledge required</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>Basic understanding of English language</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>Willingness to learn medical terminology and anatomy</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </TechLayout>
  );
}
