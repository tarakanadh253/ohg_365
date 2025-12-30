'use client';

import CompactSection from './CompactSection';

interface Feature {
  id: string;
  title: string;
  description: string;
  bgHelper: string; // Tailwind class or hex
  iconBg: string; // Helper for icon styling if needed
}

const features = [
  {
    id: '1',
    title: 'Video Tutorials',
    description: '150+ high-quality video tutorials with hands-on examples from industry experts. Learn at your own pace.',
    bgColor: '#fff1f2', // Peach/Pink-ish
    icon: (
      <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: '2',
    title: 'Interactive Learning',
    description: 'Practice with built-in code terminals, interactive exercises, and real-world projects. Get hands-on experience.',
    bgColor: '#f3e8ff', // Purple
    icon: (
      <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: '3',
    title: 'Industry Ready',
    description: 'Learn in-demand skills with curriculum designed by professionals for real-world success. Get job-ready.',
    bgColor: '#ecfdf5', // Mint
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: '4',
    title: 'Career Support',
    description: 'Get comprehensive placement support, resume reviews, and interview preparation to launch your career.',
    bgColor: '#fce7f3', // Pink
    icon: (
      <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function CompactFeatures() {
  return (
    <CompactSection
      title="Why Choose OHG365"
      subtitle="Industry-leading features and comprehensive learning paths"
      backgroundColor="#bae6fd"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
        {features.map((feature, index) => {
          const isEven = index % 2 !== 0;
          return (
            <div
              key={feature.id}
              className={`relative p-6 flex items-center justify-between transition-transform hover:scale-[1.02] shadow-sm hover:shadow-md
                ${isEven ? 'flex-row-reverse text-right rounded-l-[50px] md:rounded-l-[80px] rounded-r-2xl' : 'flex-row text-left rounded-l-2xl rounded-r-[50px] md:rounded-r-[80px]'}
              `}
              style={{ backgroundColor: feature.bgColor }}
            >
              {/* Content */}
              <div className={`flex-1 ${isEven ? 'pl-4' : 'pr-4'}`}>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{feature.description}</p>
              </div>

              {/* Icon Circle */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                  {feature.icon}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </CompactSection>
  );
}
