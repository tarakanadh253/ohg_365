'use client';

import { useState } from 'react';
import StatsCounter from '@/components/stats-counter';
import CompactSection from './CompactSection';

export default function CompactStats() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <CompactSection
      title="Join Our Growing Community"
      subtitle="Be part of a thriving community of learners and professionals"
      backgroundColor="#bae6fd"
    >
      <div className="max-w-6xl mx-auto">
        <StatsCounter />
      </div>
    </CompactSection>
  );
}

