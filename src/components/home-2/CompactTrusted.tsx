'use client';

import Image from 'next/image';
import ScrollAnimate from './ScrollAnimate';

const isoImages = [
  { id: 1, src: '/images/iso1.jpg', alt: 'ISO Certification 1', caption: 'Certified by ISO 9001:2015' },
  { id: 3, src: '/images/iso5.jpg', alt: 'ISO Certification 3', caption: 'Certified by ISO 21001:2018' },
];

export default function CompactTrusted() {
  return (
    <section
      className="compact-section"
      style={{
        backgroundColor: '#bae6fd',
        padding: '1.5rem 0'
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollAnimate animation="fade-up" triggerOnce={false}>
          <div className="text-center mb-3">
            <h2
              className="compact-heading font-bold mb-1"
              style={{ color: 'var(--text-primary)', fontSize: '1rem' }}
            >
              Trusted & Certified Platform
            </h2>
          </div>
        </ScrollAnimate>
        <ScrollAnimate animation="fade-up" triggerOnce={false} stagger={true}>
          <div className="max-w-full mx-auto">
            <div className="flex items-center justify-center gap-2 md:gap-3 flex-nowrap hide-scrollbar" style={{ overflowX: 'auto' }}>
              {isoImages.map((iso) => (
                <div
                  key={iso.id}
                  className="group relative flex-shrink-0 flex flex-col items-center justify-center gap-2 transition-transform duration-300 hover:scale-105"
                >
                  <div className="relative w-16 h-16 md:w-24 md:h-24">
                    <Image
                      src={iso.src}
                      alt={iso.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 64px, 96px"
                      unoptimized
                    />
                  </div>
                  <p className="text-xs md:text-sm font-medium text-gray-700 text-center whitespace-nowrap">
                    {iso.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}

