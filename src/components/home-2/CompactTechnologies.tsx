'use client';

import { useState } from 'react';
import LogoLoop from '@/components/logo-loop';
import CompactSection from './CompactSection';

export default function CompactTechnologies() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <CompactSection
      title="Technologies We Teach"
      subtitle="Master the tools that power modern software development"
      backgroundColor="var(--bg-primary)"
    >
      <div
        className="relative glass rounded-lg p-6 card-hover-effect hover-glow-soft bg-white/90 dark:bg-slate-900/90 hover:bg-white/95 dark:hover:bg-slate-900/95 border-2 border-[rgba(8,61,119,0.3)] hover:border-[rgba(8,61,119,0.5)] dark:border-white/10 dark:hover:border-white/20 transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
      >
        <LogoLoop speed={isHovered ? 140 : 120} logoHeight={40} className="max-w-5xl mx-auto" />
      </div>
    </CompactSection>
  );
}

