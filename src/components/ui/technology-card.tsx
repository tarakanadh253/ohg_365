'use client';

import Link from 'next/link';
import React from 'react';

interface TechnologyCardProps {
  title: string;
  description: string;
  icon: string | React.ReactElement;
  link: string;
  gradient: string;
}

export function TechnologyCard({ title, description, icon, link, gradient }: TechnologyCardProps) {
  return (
    <Link href={link} className="block group h-full">
      <div className="relative bg-[var(--bg-secondary)] rounded-xl p-8 transition-all duration-500 border border-gray-100 dark:border-white/10 hover:border-sky-500 hover:shadow-2xl hover:shadow-sky-500/20 hover:-translate-y-2 overflow-hidden h-full flex flex-col shadow-lg">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
        <div className="relative z-10 text-center flex flex-col flex-1">
          <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-500 flex justify-center items-center h-16">
            {typeof icon === 'string' ? icon : icon}
          </div>
          <h3 className="text-2xl font-bold mb-3 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
            {title}
          </h3>
          <p className="transition-colors duration-300 flex-1 min-h-[60px]" style={{ color: 'var(--text-secondary)' }}>
            {description}
          </p>
          <div className={`mt-6 w-full h-1 bg-gradient-to-r ${gradient} rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
        </div>
      </div>
    </Link>
  );
}

// Card Grid wrapper for consistent spacing
interface CardGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function CardGrid({ children, columns = 3, className = '' }: CardGridProps) {
  const colsClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid grid-cols-1 ${colsClass[columns]} gap-4 ${className}`}>
      {children}
    </div>
  );
}

