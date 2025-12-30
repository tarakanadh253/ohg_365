"use client";

import React from 'react';
import Image from 'next/image';

interface AlumniCardProps {
  alumni: {
    id: string;
    name: string;
    initials: string;
    position: string;
    company: string;
    package: string;
    batch: string;
    testimonial: string;
    profileImage?: string;
    course: string;
    placementDate: string;
    isActive: boolean;
  };
  gradientClass: string;
  positionColor: string;
}

export default function AlumniCard({ alumni, gradientClass, positionColor }: AlumniCardProps) {
  return (
    <div className="glass-card glass-card-hover rounded-xl p-6 group">
      <div className="text-center mb-6">
        <div className={`w-24 h-24 ${gradientClass} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300 overflow-hidden`}>
          {alumni.profileImage ? (
            <Image
              src={alumni.profileImage}
              alt={alumni.name}
              width={96}
              height={96}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<span class="text-2xl font-bold text-white">${alumni.initials}</span>`;
                }
              }}
            />
          ) : (
            <span className="text-2xl font-bold text-white">{alumni.initials}</span>
          )}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{alumni.name}</h3>
        <p className={`${positionColor} font-semibold mb-1`}>{alumni.position}</p>
        <p className="text-gray-400 text-sm">{alumni.company}</p>
      </div>
      
      <div className="glass rounded-lg p-4 mb-4">
        <p className="text-gray-300 text-sm italic leading-relaxed">
          "{alumni.testimonial}"
        </p>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <span className="text-green-400 font-semibold">Package: {alumni.package}</span>
        <span className="text-gray-400">{alumni.batch}</span>
      </div>
    </div>
  );
}
