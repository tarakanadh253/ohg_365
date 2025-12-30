'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import MenuDropdown from './menu-dropdown';

export default function Navigation() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const tutorialLinks = [
    { href: '/tutorials/medical-coding', label: 'Medical Coding', icon: '🏥' },
    { href: '/tutorials/programming', label: 'Programming', icon: '💻' },
    { href: '/tutorials/government-jobs', label: 'Government Jobs (SBI Jobs)', icon: '🏛️' },
    { href: '/tutorials/courses', label: 'Courses', icon: '🎓' },
  ];

  const handleLinkClick = () => setShowDropdown(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="hidden md:flex items-center space-x-6 mr-4" style={{ overflow: 'visible', position: 'relative', zIndex: 110 }}>
      <Link href="/" className="text-white/90 hover:text-white transition-all duration-300 font-bold">
        Home
      </Link>
      <Link href="/courses" className="text-white/90 hover:text-white transition-all duration-300 font-bold">
        Courses
      </Link>
      
      {/* MENU Dropdown */}
      <MenuDropdown />
      
      {/* Tutorials Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="text-white/90 hover:text-white transition-all duration-300 font-bold flex items-center space-x-1"
        >
          <span>Tutorials</span>
          <svg 
            className={`w-4 h-4 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
        {showDropdown && (
          <div className="absolute top-full left-0 mt-2 w-64 glass-dark rounded-lg shadow-xl py-2 z-[110]" style={{ position: 'absolute' }}>
            {tutorialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="block px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 transition-all text-sm"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{link.icon}</span>
                  <span>{link.label}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      <Link href="/terminal" className="text-white/90 hover:text-white transition-all duration-300 font-bold">
        Terminal
      </Link>
      <Link 
        href="/challenges" 
        className="relative px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg shadow-lg shadow-purple-500/30 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 overflow-hidden whitespace-nowrap"
      >
        🏆 Challenges
      </Link>
      <button
        disabled
        className="relative px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold rounded-lg shadow-lg shadow-gray-500/30 cursor-not-allowed opacity-60 overflow-hidden whitespace-nowrap"
        aria-label="Apply Jobs (Disabled)"
      >
        💼 Apply Jobs
      </button>
    </div>
  );
}

