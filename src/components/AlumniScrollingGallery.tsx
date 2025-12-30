"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { getActiveAlumni, AlumniProfile } from '@/data/alumni';

interface AlumniScrollingGalleryProps {
  hideHeader?: boolean;
}

export default function AlumniScrollingGallery({ hideHeader = false }: AlumniScrollingGalleryProps) {
  const alumni = getActiveAlumni();

  // State for modal only - scroll is handled via refs for performance
  const [selectedAlumni, setSelectedAlumni] = useState<AlumniProfile | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Use refs for animation values to avoid re-renders
  const scrollPositionRef = useRef(0);
  const targetSpeedRef = useRef(0.5); // Default auto-scroll speed (slowed down)
  const currentSpeedRef = useRef(0.5);
  const isHoveringRef = useRef(false);

  // Duplicate the array many times for seamless infinite scroll
  const displayAlumni = [...alumni, ...alumni, ...alumni, ...alumni, ...alumni, ...alumni, ...alumni, ...alumni, ...alumni, ...alumni];

  // Animation loop - runs continuously
  useEffect(() => {
    if (!scrollRef.current || alumni.length === 0) return;

    const scrollContainer = scrollRef.current;

    // Calculate actual item width dynamically
    const calculateItemWidth = () => {
      if (!scrollContainer.firstElementChild) return 152; // fallback: 128px image + 24px gap
      const firstItem = scrollContainer.firstElementChild as HTMLElement;
      const itemRect = firstItem.getBoundingClientRect();
      const gap = 24; // gap-6 = 1.5rem = 24px
      return itemRect.width + gap;
    };

    // Wait for DOM to be ready and items to render
    const initAnimation = () => {
      if (!scrollContainer.firstElementChild) {
        requestAnimationFrame(initAnimation);
        return;
      }

      const itemWidth = calculateItemWidth();
      const totalItems = alumni.length;
      const resetPoint = itemWidth * totalItems;

      // Initialize position to start in the middle section for seamless loop
      if (scrollPositionRef.current === 0) {
        scrollPositionRef.current = resetPoint;
        scrollContainer.style.transform = `translate3d(-${scrollPositionRef.current}px, 0, 0)`;
      }

      const animate = () => {
        if (!scrollContainer) return;

        // Very responsive lerp - instant response when hovering
        const lerpFactor = isHoveringRef.current ? 0.25 : 0.1;
        currentSpeedRef.current += (targetSpeedRef.current - currentSpeedRef.current) * lerpFactor;

        // Update position
        scrollPositionRef.current += currentSpeedRef.current;

        // Reset position for infinite loop (seamless)
        if (scrollPositionRef.current >= resetPoint * 3) {
          scrollPositionRef.current -= resetPoint;
        } else if (scrollPositionRef.current < resetPoint) {
          scrollPositionRef.current += resetPoint;
        }

        // Apply transform using translate3d for GPU acceleration
        scrollContainer.style.transform = `translate3d(-${scrollPositionRef.current}px, 0, 0)`;

        animationRef.current = requestAnimationFrame(animate);
      };

      // Start animation immediately
      animationRef.current = requestAnimationFrame(animate);
    };

    // Use requestAnimationFrame to wait for next paint cycle
    requestAnimationFrame(() => {
      requestAnimationFrame(initAnimation);
    });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [alumni.length]);

  // Simple position-based speed control - move cursor left = scroll left, right = scroll right
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isHoveringRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const containerWidth = rect.width;
    const centerX = containerWidth / 2;

    // Calculate normalized position (-1 to 1)
    const normalizedX = (mouseX - centerX) / centerX;

    // Direct speed mapping - fast and responsive
    // Left side = negative (scroll left), Right side = positive (scroll right)
    targetSpeedRef.current = normalizedX * 8; // Higher multiplier for faster response
  };

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    // Return to default auto-scroll speed
    targetSpeedRef.current = 0.5;
  };

  // Handle click on alumni image
  const handleAlumniClick = (alumniProfile: AlumniProfile) => {
    setSelectedAlumni(alumniProfile);
  };

  // Close modal
  const closeModal = () => {
    setSelectedAlumni(null);
  };

  return (
    <div className={`relative alumni-gallery ${hideHeader ? 'py-4' : 'py-8'}`}>

      {/* Content */}
      <div className="relative z-10">
        {/* Header - contained */}
        {!hideHeader && (
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <div className="inline-flex items-center backdrop-blur-sm text-sm font-semibold px-6 py-3 rounded-full mb-6" style={{ backgroundColor: 'rgba(8, 61, 119, 0.1)', color: 'var(--text-primary)', border: '1px solid rgba(8, 61, 119, 0.2)' }}>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Our Success Stories
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Meet Our <span style={{ color: 'var(--corp-accent)' }}>Placed Students</span>
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                Real people, real success stories. See how our students have transformed their careers.
              </p>
            </div>
          </div>
        )}

        {/* Full-width Scrolling Gallery - True Edge to Edge */}
        <div
          ref={containerRef}
          className={`relative w-[100vw] left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] overflow-hidden cursor-ew-resize ${hideHeader ? 'my-4' : ''}`}
          onMouseMove={handleMouseMove}
        >
          {/* Scrolling container - GPU accelerated */}
          <div
            ref={scrollRef}
            className="flex gap-6 py-4"
            style={{
              willChange: 'transform',
              backfaceVisibility: 'hidden',
            }}
          >
            {displayAlumni.map((alumniProfile, index) => (
              <div
                key={`${alumniProfile.id}-${index}`}
                className="flex-shrink-0 group cursor-pointer w-[300px] mx-4 pt-4 pb-4" // Added width and padding
                onClick={() => handleAlumniClick(alumniProfile)}
              >
                <div className="relative h-full">
                  {/* Rotated Colored Background */}
                  <div
                    className={`absolute inset-0 rounded-[2rem] transform transition-transform duration-300 group-hover:rotate-0 ${index % 3 === 0 ? 'bg-emerald-500 rotate-[-6deg]' :
                      index % 3 === 1 ? 'bg-sky-400 rotate-[6deg]' :
                        'bg-blue-600 rotate-[-3deg]'
                      }`}
                  ></div>

                  {/* Main White Card */}
                  <div className="relative bg-white rounded-[1.5rem] p-6 h-full shadow-lg flex flex-col items-center text-center transition-transform duration-300 group-hover:-translate-y-2">

                    {/* Profile Image */}
                    <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md">
                      {alumniProfile.profileImage ? (
                        <Image
                          src={alumniProfile.profileImage}
                          alt={alumniProfile.name}
                          width={112}
                          height={112}
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gray-100"><span class="text-xl font-bold text-gray-400">${alumniProfile.initials}</span></div>`;
                            }
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <span className="text-xl font-bold text-gray-400">{alumniProfile.initials}</span>
                        </div>
                      )}
                    </div>

                    {/* Testimonial (Truncated) */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-4 leading-relaxed">
                      {alumniProfile.testimonial}
                    </p>

                    {/* Name */}
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {alumniProfile.name}
                    </h3>

                    {/* Role/Course */}
                    <p className="text-gray-500 text-xs mb-4">
                      {alumniProfile.course}
                    </p>

                    {/* Star Rating */}
                    <div className="mt-auto flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 text-black fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats - contained */}
        <div className="container mx-auto px-4">
          <div className={`text-center ${hideHeader ? 'mt-6' : 'mt-8'}`}>
            <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto">
              {/* 1000+ Students Placed */}
              <div className="aspect-square bg-white rounded-full shadow-lg flex flex-col items-center justify-center p-2 transition-transform hover:scale-105">
                <div className="text-lg md:text-2xl font-black mb-1" style={{ color: '#fbbf24' }}>1000+</div>
                <div className="text-xs md:text-sm font-bold text-gray-800 text-center leading-tight">Students Placed</div>
              </div>
              {/* Average Package */}
              <div className="aspect-square bg-white rounded-full shadow-lg flex flex-col items-center justify-center p-2 transition-transform hover:scale-105">
                <div className="text-lg md:text-2xl font-black mb-1" style={{ color: '#ef4444' }}>5lpa-25lpa</div>
                <div className="text-xs md:text-sm font-bold text-gray-800 text-center leading-tight">Average Package</div>
              </div>
              {/* Success Rate */}
              <div className="aspect-square bg-white rounded-full shadow-lg flex flex-col items-center justify-center p-2 transition-transform hover:scale-105">
                <div className="text-lg md:text-2xl font-black mb-1" style={{ color: '#3b82f6' }}>95%</div>
                <div className="text-xs md:text-sm font-bold text-gray-800 text-center leading-tight">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedAlumni && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 backdrop-blur-sm" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />

          {/* Modal Content */}
          <div
            className="relative rounded-2xl max-w-md w-full p-5 border animate-fade-in-up max-h-[85vh] overflow-y-auto"
            style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(8, 61, 119, 0.3)', boxShadow: '0 20px 40px rgba(8, 61, 119, 0.2)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full transition-colors z-10"
              style={{ backgroundColor: 'rgba(8, 61, 119, 0.1)', color: 'var(--text-primary)' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(8, 61, 119, 0.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(8, 61, 119, 0.1)'; }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Profile Section */}
            <div className="flex flex-col items-center text-center">
              {/* Profile Image */}
              <div className="w-28 h-28 rounded-full overflow-hidden mb-3" style={{ border: '3px solid rgba(8, 61, 119, 0.5)', boxShadow: '0 10px 25px rgba(8, 61, 119, 0.3)' }}>
                {selectedAlumni.profileImage ? (
                  <Image
                    src={selectedAlumni.profileImage}
                    alt={selectedAlumni.name}
                    width={112}
                    height={112}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #083D77, #7A94A5)' }}>
                    <span className="text-3xl font-bold text-white">{selectedAlumni.initials}</span>
                  </div>
                )}
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{selectedAlumni.name}</h3>

              {/* Position */}
              <p className="font-semibold text-base mb-1" style={{ color: 'var(--corp-accent)' }}>{selectedAlumni.position}</p>

              {/* Company */}
              <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>{selectedAlumni.company}</p>

              {/* Package Badge */}
              <div className="inline-flex items-center font-bold px-3 py-1.5 rounded-full border mb-3 text-sm" style={{ backgroundColor: 'rgba(8, 61, 119, 0.1)', color: 'var(--text-primary)', borderColor: 'rgba(8, 61, 119, 0.3)' }}>
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {selectedAlumni.package}
              </div>

              {/* Course & Batch */}
              <div className="flex flex-wrap justify-center gap-2 mb-3">
                <span className="text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(8, 61, 119, 0.1)', color: 'var(--text-primary)' }}>
                  {selectedAlumni.course}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(8, 61, 119, 0.1)', color: 'var(--text-primary)' }}>
                  {selectedAlumni.batch}
                </span>
              </div>

              {/* Testimonial */}
              <div className="rounded-xl p-3 border" style={{ backgroundColor: 'rgba(8, 61, 119, 0.05)', borderColor: 'rgba(8, 61, 119, 0.2)' }}>
                <svg className="w-5 h-5 mb-1.5 mx-auto" style={{ color: 'rgba(8, 61, 119, 0.5)' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-xs italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {selectedAlumni.testimonial}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
