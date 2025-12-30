'use client';

import Link from 'next/link';
import CompactSection from './CompactSection';

export default function CompactCertifications() {
  return (
    <CompactSection
      title="Certifications & Internships"
      subtitle="Earn industry-recognized credentials and gain real-world experience"
      backgroundColor="#bae6fd"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Professional Certifications Card */}
        <div
          className="relative rounded-xl p-6 card-hover-effect hover-glow-soft cursor-pointer overflow-hidden group"
          style={{
            background: '#ffffff',
            border: '2px solid rgba(8, 61, 119, 0.2)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(8, 61, 119, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(8, 61, 119, 0.2)';
          }}
        >
          {/* Gradient overlay */}
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(8, 61, 119, 0.2) 0%, transparent 70%)',
            }}
          />
          <div className="flex flex-col h-full relative z-10">
            <div className="flex items-start gap-4 mb-4">
              <div
                className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 relative overflow-hidden group/icon bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30"
              >
                <div className="absolute inset-0 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(235, 235, 211, 0.2) 0%, transparent 100%)' }} />
                <svg className="w-6 h-6 relative z-10 group-hover/icon:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                </svg>
              </div>
              <div className="flex-1">
                <h3
                  className="font-bold text-sm mb-2 transition-colors duration-300"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Professional Certifications
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Earn industry-recognized certifications that validate your skills and boost your career prospects.
                </p>
              </div>
            </div>

            <ul className="space-y-2 mb-4 flex-1">
              {[
                'Industry-standard programs',
                'Globally recognized',
                'Lifetime access',
                'Digital badges'
              ].map((item, index) => (
                <li key={index} className="flex items-center text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <svg className="w-4 h-4 mr-2 flex-shrink-0 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/tutorials/courses"
              className="inline-flex items-center justify-center w-full text-sm font-semibold px-5 py-3 rounded-lg transition-all duration-300 relative overflow-hidden group/btn bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 hover:-translate-y-0.5"
            >
              <span className="relative z-10">Explore Certifications</span>
              <svg className="w-4 h-4 ml-2 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
              <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(235, 235, 211, 0.1) 0%, transparent 100%)' }} />
            </Link>
          </div>
        </div>

        {/* Internship Opportunities Card */}
        <div
          className="relative rounded-xl p-6 card-hover-effect hover-glow-soft cursor-pointer overflow-hidden group"
          style={{
            background: '#ffffff',
            border: '2px solid rgba(8, 61, 119, 0.2)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(8, 61, 119, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(8, 61, 119, 0.2)';
          }}
        >
          {/* Gradient overlay */}
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(8, 61, 119, 0.2) 0%, transparent 70%)',
            }}
          />
          <div className="flex flex-col h-full relative z-10">
            <div className="flex items-start gap-4 mb-4">
              <div
                className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 relative overflow-hidden group/icon bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
              >
                <div className="absolute inset-0 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(235, 235, 211, 0.2) 0%, transparent 100%)' }} />
                <svg className="w-6 h-6 relative z-10 group-hover/icon:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3
                  className="font-bold text-sm mb-2 transition-colors duration-300"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Internship Opportunities
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Gain real-world experience through our internship programs. Work on live projects and build your portfolio.
                </p>
              </div>
            </div>

            <ul className="space-y-2 mb-4 flex-1">
              {[
                'Real-world projects',
                'Professional mentorship',
                'Build portfolio',
                'Job placement support'
              ].map((item, index) => (
                <li key={index} className="flex items-center text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <svg className="w-4 h-4 mr-2 flex-shrink-0 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/tutorials/courses"
              className="inline-flex items-center justify-center w-full text-sm font-semibold px-5 py-3 rounded-lg transition-all duration-300 relative overflow-hidden group/btn bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/40 hover:-translate-y-0.5"
            >
              <span className="relative z-10">Apply for Internships</span>
              <svg className="w-4 h-4 ml-2 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
              <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(235, 235, 211, 0.1) 0%, transparent 100%)' }} />
            </Link>
          </div>
        </div>
      </div>
    </CompactSection>
  );
}
