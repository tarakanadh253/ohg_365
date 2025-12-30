'use client';

import React from 'react';
import Link from 'next/link';

interface PageNavigationProps {
  previousPage?: {
    href: string;
    title: string;
    isSection?: boolean;
  };
  nextPage?: {
    href: string;
    title: string;
    isSection?: boolean;
  };
  onSectionChange?: (section: string) => void;
}

export default function PageNavigation({ previousPage, nextPage, onSectionChange }: PageNavigationProps) {
  const handleClick = (e: React.MouseEvent, href: string, isSection?: boolean) => {
    if (isSection && onSectionChange) {
      e.preventDefault();
      const section = href.split('#')[1];
      onSectionChange(section);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-700">
      <div className="flex justify-between items-center gap-4">
        {/* Previous Button */}
        <div className="flex-1">
          {previousPage ? (
            <Link
              href={previousPage.href}
              onClick={(e) => handleClick(e, previousPage.href, previousPage.isSection)}
              className="group flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Previous</p>
                <p className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                  {previousPage.title}
                </p>
              </div>
            </Link>
          ) : (
            <div className="opacity-0 pointer-events-none">
              {/* Placeholder for alignment */}
            </div>
          )}
        </div>

        {/* Next Button */}
        <div className="flex-1">
          {nextPage ? (
            <Link
              href={nextPage.href}
              onClick={(e) => handleClick(e, nextPage.href, nextPage.isSection)}
              className="group flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105"
            >
              <div className="flex-1 text-right">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Next</p>
                <p className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                  {nextPage.title}
                </p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                <svg
                  className="w-5 h-5 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ) : (
            <div className="opacity-0 pointer-events-none">
              {/* Placeholder for alignment */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

