'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import TypingText from './TypingText';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function HeroContent() {
  const { ref, isVisible, hasBeenVisible } = useScrollAnimation({
    threshold: 0.3,
    triggerOnce: false
  });
  const [shouldType, setShouldType] = useState(false);

  useEffect(() => {
    if (isVisible && !shouldType) {
      setShouldType(true);
    } else if (!isVisible && hasBeenVisible) {
      // Reset when scrolled out of view
      setShouldType(false);
    }
  }, [isVisible, hasBeenVisible, shouldType]);

  return (
    <div ref={ref} className="flex-1 flex items-center justify-center relative z-0 px-4 py-12 bg-[url('/hero-new-bg.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-white/70 z-[-1]" />
      <div className="container mx-auto flex flex-col items-center justify-center gap-8 max-w-4xl">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-sky-600 mb-6 leading-tight">
            <span className={`inline-block transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Your Career Journey Starts Here
            </span>
            <br />
            <span
              className={`text-sky-600 inline-block transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-10'}`}
              style={{ animationDelay: '0.3s' }}
            >
              <TypingText
                text="Learn, Grow, Succeed"
                speed={80}
                delay={500}
                className="text-sky-600"
                trigger={shouldType}
              />
            </span>
          </h1>
          <p
            className={`text-base md:text-lg text-sky-600 mb-8 max-w-2xl mx-auto lg:mx-0 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0 delay-700' : 'opacity-0 -translate-x-10'}`}
            style={{ animationDelay: '0.7s' }}
          >
            <TypingText
              text="Find job opportunities and enhance your skills to achieve your career goals."
              speed={30}
              delay={1500}
              className="text-[#2c666e]"
              trigger={shouldType}
            />
          </p>
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100 delay-1000' : 'opacity-0 scale-95'}`}
            style={{ animationDelay: '1s' }}
          >
            <Link
              href="/signup"
              className="group relative px-8 py-4 font-bold rounded-xl transition-all duration-300 overflow-hidden text-base shadow-xl hover:-translate-y-1 hover:shadow-2xl"
              style={{
                background: '#87CEFA',
                color: '#083D77',
                boxShadow: '0 8px 25px rgba(135, 206, 250, 0.4)',
              }}
            >
              <span className="relative z-10">Get Started</span>
            </Link>
            <Link
              href="/tutorials"
              className="group relative px-8 py-4 font-bold rounded-xl transition-all duration-300 overflow-hidden text-base shadow-xl hover:-translate-y-1 hover:shadow-2xl bg-white"
              style={{
                border: '2px solid #083D77',
                color: '#083D77',
              }}
            >
              <span className="relative z-10">Explore Courses</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

