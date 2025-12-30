'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import MenuDropdown from '@/components/menu-dropdown';
import MobileMenu from '@/components/mobile-menu';
import SearchBar from '@/components/search-bar';
import { useTheme } from '@/hooks/useTheme';

import { Stethoscope, Code, Building2, GraduationCap } from 'lucide-react';

interface SharedNavProps {
  isScrolled?: boolean;
  showAnimatedLine?: boolean;
  isFixed?: boolean;
  hasGradientBlueNav?: boolean;
  hideThemeToggle?: boolean;
}

export default function SharedNav({ isScrolled = false, showAnimatedLine = true, isFixed = false, hasGradientBlueNav = false, hideThemeToggle = false }: SharedNavProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme, setTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const tutorialsButtonRef = useRef<HTMLButtonElement>(null);
  const tutorialsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Force dark theme on tutorials and courses pages
  useEffect(() => {
    if (hideThemeToggle) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, [hideThemeToggle, setTheme]);

  // Close tutorials dropdown function
  const closeTutorialsDropdown = useCallback(() => {
    if (tutorialsTimeoutRef.current) clearTimeout(tutorialsTimeoutRef.current);
    setShowDropdown(false);
    setDropdownPosition(null);
  }, []);

  const openTutorialsDropdown = useCallback(() => {
    if (tutorialsTimeoutRef.current) clearTimeout(tutorialsTimeoutRef.current);
    setShowDropdown(true);
    if (tutorialsButtonRef.current) {
      const rect = tutorialsButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 12,
        left: rect.left,
      });
    }
  }, []);

  const closeTutorialsWithDelay = useCallback(() => {
    if (tutorialsTimeoutRef.current) clearTimeout(tutorialsTimeoutRef.current);
    tutorialsTimeoutRef.current = setTimeout(() => {
      closeTutorialsDropdown();
    }, 200);
  }, [closeTutorialsDropdown]);


  // Close tutorials dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is on button (to avoid conflict with onClick toggle)
      if (tutorialsButtonRef.current?.contains(event.target as Node)) return;

      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // Also check if click is outside the dropdown menu itself
        const dropdownMenu = document.querySelector('[data-tutorials-dropdown]');
        const isOutsideDropdown = !dropdownMenu || !dropdownMenu.contains(event.target as Node);

        if (isOutsideDropdown) {
          closeTutorialsDropdown();
        }
      }
    };

    if (showDropdown) {
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showDropdown, closeTutorialsDropdown]);

  // Close tutorials dropdown when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (showDropdown) {
        closeTutorialsDropdown();
      }
    };

    if (showDropdown) {
      window.addEventListener('scroll', handleScroll, true);
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [showDropdown, closeTutorialsDropdown]);



  const tutorialLinks = [
    { href: '/tutorials/programming', label: 'Programming', icon: <Code className="w-4 h-4" /> },
    { href: '/tutorials/medical-coding', label: 'Medical Coding', icon: <Stethoscope className="w-4 h-4" /> },
    { href: '/tutorials/courses', label: 'Courses', icon: <GraduationCap className="w-4 h-4" /> },
  ];

  const isHomePage = pathname === '/';

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-[100000] transition-all duration-300 pointer-events-none flex flex-col`}
      >
        {/* Main Navbar Area (Logo + Pill) - FIRST */}
        <div className={`flex items-center justify-end pl-4 pt-0 pb-2 lg:pl-6 lg:pt-0 lg:pb-2 pr-0 w-full ${isScrolled ? 'pb-2' : ''} relative`}>
          {/* Logo - Separate & Fixed Left */}
          <Link href="/" className="pointer-events-auto fixed top-0 left-0 flex items-center gap-3 hover:opacity-95 transition-all group z-[100002] bg-white rounded-br-full rounded-tr-none rounded-tl-none rounded-bl-none p-1.5 shadow-lg border border-white/50 pr-6 pl-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-full overflow-hidden relative bg-white shadow-inner">
              <Image
                src="/logo_new.jpg"
                alt="OHG365 Logo"
                width={48}
                height={48}
                className="object-contain animate-pulse"
                priority
              />
            </div>
            <div className="flex flex-col hidden sm:flex">
              <div
                className="flex items-center text-xl font-black tracking-tight leading-none group-hover:opacity-90 transition-opacity"
                style={{ fontFamily: 'var(--font-orbitron), sans-serif', letterSpacing: '0.05em' }}
              >
                <span className="text-[#083D77]">ONE</span>
                <span className="text-orange-500">HUB</span>
                <span className="text-cyan-500">GLOBAL</span>
              </div>
              <div className="flex items-center justify-center w-full mt-1">
                <span
                  className="text-[7px] font-bold tracking-[0.1em] uppercase leading-tight text-center px-1 text-[#083D77]"
                  style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
                >
                  SKILLS TO SUCCESS
                </span>
              </div>
            </div>
          </Link>

          {/* Floating Nav Pill - Right Side */}
          {/* Floating Nav Pill - Right Side */}
          <nav
            className="pointer-events-auto bg-gradient-to-r from-white to-sky-300 rounded-l-full rounded-r-none pl-8 pr-6 py-3 shadow-2xl flex items-center space-x-4 lg:space-x-6 max-w-full overflow-x-auto no-scrollbar border border-white/40 border-r-0"
            style={{
              boxShadow: '0 10px 25px -5px rgba(56, 189, 248, 0.3), 0 8px 10px -6px rgba(56, 189, 248, 0.1)'
            }}
          >
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium">
              <Link
                href="/"
                className={`transition-colors px-3 py-1.5 relative group font-bold nav-link-strict text-[#083D77] hover:text-sky-600 ${isHomePage ? 'bg-[#083D77]/10 rounded-full' : ''}`}
              >
                Home
              </Link>

              <Link
                href="/courses"
                className={`transition-colors px-3 py-1.5 relative group font-bold nav-link-strict text-[#083D77] hover:text-sky-600 ${(pathname === '/courses' || pathname?.startsWith('/courses/')) ? 'bg-[#083D77]/10 rounded-full' : ''}`}
              >
                Courses
              </Link>

              <MenuDropdown />

              {/* Tutorials Dropdown Trigger */}
              <div
                className="relative"
                ref={dropdownRef}
                onMouseEnter={openTutorialsDropdown}
                onMouseLeave={closeTutorialsWithDelay}
              >
                <button
                  ref={tutorialsButtonRef}
                  onClick={() => {
                    // Toggle behavior for click
                    if (showDropdown) closeTutorialsDropdown();
                    else openTutorialsDropdown();
                  }}
                  className={`transition-colors flex items-center space-x-1 px-3 py-1.5 relative group font-bold nav-link-strict text-[#083D77] hover:text-sky-600 ${pathname.startsWith('/tutorials') ? 'bg-[#083D77]/10 rounded-full' : ''}`}
                >
                  <span>Tutorials</span>
                  <svg className={`w-3 h-3 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
              </div>

              <Link
                href="/terminal"
                className={`transition-colors px-3 py-1.5 relative group font-bold nav-link-strict text-[#083D77] hover:text-sky-600 ${(pathname === '/terminal' || pathname?.startsWith('/terminal/')) ? 'bg-[#083D77]/10 rounded-full' : ''}`}
              >
                Terminal
              </Link>

              <Link
                href="/challenges"
                className={`px-3 py-1.5 bg-[#083D77]/10 text-[#083D77] font-bold rounded-full hover:bg-[#083D77]/20 transition-all text-sm`}
              >
                Challenges
              </Link>

              <Link
                href="/login"
                className="px-4 py-1.5 font-bold rounded-full text-sm bg-[#083D77] text-white hover:bg-[#0a3560] transition-all shadow-md"
              >
                Sign In
              </Link>


            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-6 bg-[#083D77]/20 mx-2"></div>

            {/* Search */}
            <div className="hidden sm:block">
              <SearchBar />
            </div>

            {/* Mobile Menu Button - No integrated social media anymore */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#083D77] hover:bg-[#083D77]/10 rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </nav>
        </div>
      </div>

      {/* Bottom Right Floating Nav - Social & Phone */}
      <div className="fixed bottom-6 right-6 z-[100002] pointer-events-auto flex flex-col gap-4 items-end">
        {/* Phone Pill - Mobile Numbers (Top) */}
        <div className="group bg-gray-200 backdrop-blur-md shadow-lg rounded-full p-1.5 flex items-center justify-center transition-all duration-300 hover:pr-6 cursor-pointer">
          <div className="flex items-center">
            {/* Single Branded Icon */}
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-[#083D77] shrink-0 z-10">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.44-5.15-3.75-6.59-6.59l1.97-1.57c.27-.28.36-.67.25-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3.3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .69-.63.69-1.19v-3.44c0-.54-.45-.99-.99-.99z" /></svg>
            </div>

            {/* Numbers Container - Reveal on Hover */}
            <div className="overflow-hidden w-0 group-hover:w-[120px] transition-all duration-500 ease-in-out flex flex-col justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 pl-3 space-y-1">
                <a href="tel:+919059450707" className="block text-[12px] font-bold text-gray-700 hover:text-sky-900 transition-colors whitespace-nowrap">
                  +91 9059450707
                </a>
                <a href="tel:+917382314128" className="block text-[12px] font-bold text-gray-700 hover:text-sky-900 transition-colors whitespace-nowrap">
                  +91 7382314128
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social Icons Pill - Social Media (Bottom) */}
        <div className="bg-gray-200 backdrop-blur-md shadow-lg rounded-full px-4 py-2 flex items-center justify-center transform hover:scale-105 transition-transform">
          <div className="flex space-x-3 items-center justify-end text-gray-700">
            {[
              { name: 'WhatsApp', href: 'https://wa.me/919059450707', color: '#25D366', icon: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /> },
              { name: 'LinkedIn', href: '#', color: '#0077b5', icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /> },
              { name: 'X', href: '#', color: '#000000', icon: <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /> },
              { name: 'Facebook', href: '#', color: '#1877F2', icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /> },
              { name: 'YouTube', href: '#', color: '#FF0000', icon: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /> },
            ].map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="group relative flex items-center justify-center w-6 h-6 rounded-full hover:scale-110 transition-all duration-300"
                aria-label={social.name}
              >
                <svg
                  className="w-3.5 h-3.5 transition-colors duration-300 text-gray-700 group-hover:text-white relative z-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {social.icon}
                </svg>
                <span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: social.color }}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Tutorials Dropdown Portal logic */}
      {isMounted && showDropdown && dropdownPosition && createPortal(
        <div
          data-tutorials-dropdown
          className="fixed w-72 bg-gray-50/90 backdrop-blur-xl rounded-3xl shadow-2xl p-3 border border-white/40 ring-1 ring-black/5"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            position: 'fixed',
            zIndex: 100001,
          }}
          onMouseEnter={() => {
            if (tutorialsTimeoutRef.current) clearTimeout(tutorialsTimeoutRef.current);
            setShowDropdown(true);
          }}
          onMouseLeave={() => {
            closeTutorialsWithDelay();
          }}
        >
          <div className="flex flex-col gap-1">
            {tutorialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  setShowDropdown(false);
                  setDropdownPosition(null);
                }}
                className="group relative flex items-center gap-4 px-4 py-3.5 rounded-2xl text-gray-600 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white hover:text-black hover:shadow-xl hover:scale-105 hover:z-10"
              >
                <div className="flex items-center justify-center w-6 h-6 text-gray-500 group-hover:text-black transition-colors duration-200">
                  {link.icon}
                </div>
                <span className="font-semibold text-[15px] tracking-wide">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>,
        document.body
      )}

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
