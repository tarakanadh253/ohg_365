'use client';

import AlumniScrollingGallery from '@/components/AlumniScrollingGallery';
import CompactSection from './CompactSection';

export default function CompactAlumni() {
  return (
    <CompactSection
      title="Our Alumni"
      subtitle="Meet professionals who started their journey with OHG365"
      backgroundColor="#ffffff"
    >
      <div className="w-full">
        <AlumniScrollingGallery hideHeader={true} />
      </div>
    </CompactSection>
  );
}

