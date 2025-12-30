'use client';

import { useState, useEffect } from 'react';
import SharedNav from '@/components/shared-nav';
import HeroContent from './HeroContent';

export default function HeroWithNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Glass Navigation Bar */}
      <SharedNav isScrolled={isScrolled} showAnimatedLine={true} isFixed={true} />

      <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ zIndex: 1 }}>

        {/* Hero Content */}
        <HeroContent />
      </section>
    </>
  );
}

