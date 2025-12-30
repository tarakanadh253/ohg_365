'use client';

import { useState } from 'react';
import Image from 'next/image';
import ScrollAnimate from './ScrollAnimate';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isHighlighted?: boolean;
}

const steps: ProcessStep[] = [
  {
    id: '1',
    number: '01',
    title: 'Fusing Academia & Corporate Dynamics',
    description: 'Enhancing the Academic Curriculum with Industry Experts to pave the way for career excellence',
    icon: (
      <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: '2',
    number: '02',
    title: 'Interactive Learning Modules',
    description: 'Enhance Learning with personalized experiences, extensive courses, and seamless progress tracking with our world-class LMS',
    icon: (
      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: '3',
    number: '03',
    title: 'Industry Ready Skills',
    description: 'Learn in-demand skills with curriculum designed by professionals for real-world success. Get job-ready with industry-standard practices',
    icon: (
      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: '4',
    number: '04',
    title: 'Certification & Career Growth',
    description: 'Earn industry-recognized certifications and launch your career with our comprehensive placement support',
    icon: (
      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
];

export default function ProcessPath() {
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: false
  });

  return (
    <section className="compact-section py-0" style={{ backgroundColor: '#bae6fd' }}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
          {/* Left Section - Image and Text */}
          <ScrollAnimate animation="fade-up" triggerOnce={false}>
            <div className="relative">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-[#fbbf24] rounded-lg flex items-center justify-center mr-2">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h2 className="text-xl md:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  Why OHG365
                </h2>
              </div>
              <p className="text-xs mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                We specialize in transforming potential into success through tailored upskilling, internships, and workshops that deliver results
              </p>
              <div className="relative w-full rounded-xl overflow-hidden shadow-lg bg-white/5 backdrop-blur-sm border border-white/10 p-2">
                <Image
                  src="/images/why-choose-ohg365.png"
                  alt="Why Choose OHG365 Structure"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain hover:scale-[1.02] transition-transform duration-500 rounded-lg"
                  priority
                />
              </div>
            </div>
          </ScrollAnimate>

          {/* Right Section - Timeline with Numbers */}
          <ScrollAnimate animation="fade-up" triggerOnce={false}>
            <div className="relative">
              <div
                ref={stepsRef}
                className={`relative space-y-4 stagger-container ${stepsVisible ? 'visible' : ''}`}
              >
                {steps.map((step, index) => {
                  const isHovered = hoveredStep === step.id;
                  const isActive = isHovered;
                  const isLast = index === steps.length - 1;

                  return (
                    <div
                      key={step.id}
                      className="relative pl-16"
                      onMouseEnter={() => setHoveredStep(step.id)}
                      onMouseLeave={() => setHoveredStep(null)}
                    >
                      {/* Vertical Line */}
                      {!isLast && (
                        <div
                          className="absolute left-6 top-10 w-0.5 transition-all duration-300"
                          style={{
                            height: 'calc(100% + 1rem)',
                            backgroundColor: isActive ? '#083D77' : 'rgba(122, 148, 165, 0.2)',
                          }}
                        >
                          {/* Arrowhead */}
                          <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] transition-all duration-300"
                            style={{
                              borderLeftColor: 'transparent',
                              borderRightColor: 'transparent',
                              borderTopColor: isActive ? '#083D77' : 'rgba(122, 148, 165, 0.2)',
                            }}
                          />
                        </div>
                      )}

                      {/* Large Number Background */}
                      <div
                        className="absolute left-0 top-0 flex items-center justify-center transition-all duration-300"
                        style={{
                          width: '48px',
                          height: '48px',
                          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                        }}
                      >
                        <span
                          className="font-bold text-4xl select-none transition-opacity duration-300"
                          style={{
                            color: '#083D77',
                            fontFamily: 'monospace',
                            lineHeight: '1',
                            opacity: isActive ? 1 : 0.6,
                          }}
                        >
                          {step.number}
                        </span>
                      </div>

                      {/* Content Card */}
                      <div
                        className={`rounded-lg p-3 transition-all duration-300 cursor-pointer hover-lift hover-glow shadow-lg bg-white ${isActive ? 'scale-105 shadow-xl ring-1 ring-blue-500' : ''
                          }`}
                        style={{
                          transform: isActive ? 'translateX(4px)' : 'translateX(0)',
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                            style={{
                              backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'rgba(122, 148, 165, 0.05)',
                              transform: isActive ? 'scale(1.1)' : 'scale(1)',
                            }}
                          >
                            {step.icon}
                          </div>
                          <div className="flex-1">
                            <h3
                              className="font-bold mb-1.5 text-xs transition-colors duration-300"
                              style={{
                                color: 'var(--text-primary)',
                              }}
                            >
                              {step.title}
                            </h3>
                            <p
                              className="text-xs leading-relaxed transition-colors duration-300"
                              style={{
                                color: 'var(--text-secondary)',
                                fontSize: '0.7rem'
                              }}
                            >
                              {step.description}
                            </p>
                            {/* Animated underline */}
                            <div
                              className="mt-2 h-0.5 transition-all duration-300"
                              style={{
                                width: isActive ? '100%' : '50px',
                                backgroundColor: isActive ? 'var(--corp-primary)' : 'var(--corp-accent)',
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  );
}

