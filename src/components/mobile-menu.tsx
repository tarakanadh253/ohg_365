'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import menuConfig from '@/data/menu-config.json';
import SearchBar from './search-bar';


interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        setActiveSubmenu(null);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
        setActiveSubmenu(null);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[55] md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-[#083d77] shadow-2xl border-r border-gray-200 dark:border-white/10 z-[60] transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-600">
            <Link href="/" onClick={onClose} className="flex items-center space-x-2">
              <Image
                src="/logo_new.jpg"
                alt="OHG365 Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent">
                  OHG365
                </span>
                <span className="text-xs leading-tight text-gray-400">One Hub Global</span>
              </div>
            </Link>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 rounded min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-600">
            <SearchBar />
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4" role="menu">
            <Link
              href="/"
              onClick={onClose}
              className={`block px-4 py-3 hover:bg-rose-500/20 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg transition-all duration-200 mb-2 min-h-[44px] flex items-center ${pathname === '/' ? 'text-sky-600 bg-sky-100 dark:bg-sky-900/20' : 'text-black dark:text-white'}`}
              role="menuitem"
            >
              Home
            </Link>
            <Link
              href="/courses"
              onClick={onClose}
              className={`block px-4 py-3 hover:bg-rose-500/20 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg transition-all duration-200 mb-2 min-h-[44px] flex items-center ${pathname === '/courses' ? 'text-sky-600 bg-sky-100 dark:bg-sky-900/20' : 'text-black dark:text-white'}`}
              role="menuitem"
            >
              Courses
            </Link>

            {/* Tutorials Dropdown */}
            <div className="mb-2">
              <button
                onClick={() => setActiveSubmenu(activeSubmenu === 'tutorials' ? null : 'tutorials')}
                className="w-full px-4 py-3 text-left text-black dark:text-white hover:bg-rose-500/20 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg transition-all duration-200 flex items-center justify-between min-h-[44px] focus:outline-none focus:ring-2 focus:ring-rose-500"
                aria-expanded={activeSubmenu === 'tutorials'}
                aria-haspopup="true"
              >
                <span>Tutorials</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${activeSubmenu === 'tutorials' ? 'rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              {activeSubmenu === 'tutorials' && (
                <div className="ml-4 mt-2 space-y-1">
                  <Link
                    href="/tutorials/medical-coding"
                    onClick={onClose}
                    className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-rose-500/20 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg transition-all duration-200 min-h-[44px] flex items-center"
                    role="menuitem"
                  >
                    <span className="mr-2">🏥</span>
                    Medical Coding
                  </Link>
                  <Link
                    href="/tutorials/programming"
                    onClick={onClose}
                    className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-rose-500/20 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg transition-all duration-200 min-h-[44px] flex items-center"
                    role="menuitem"
                  >
                    <span className="mr-2">💻</span>
                    Programming
                  </Link>
                  <Link
                    href="/tutorials/government-jobs"
                    onClick={onClose}
                    className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-rose-500/20 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg transition-all duration-200 min-h-[44px] flex items-center"
                    role="menuitem"
                  >
                    <span className="mr-2">🏛️</span>
                    Government Jobs (SBI Jobs)
                  </Link>
                  <Link
                    href="/tutorials/courses"
                    onClick={onClose}
                    className="block px-4 py-3 text-gray-300 hover:bg-rose-500/20 hover:text-rose-400 rounded-lg transition-all duration-200 min-h-[44px] flex items-center"
                    role="menuitem"
                  >
                    <span className="mr-2">🎓</span>
                    Courses
                  </Link>
                </div>
              )}
            </div>

            {/* MENU Dropdown Items */}
            {menuConfig.menu.map((item) => (
              <div key={item.slug} className="mb-2">
                {item.children ? (
                  <>
                    <button
                      onClick={() => setActiveSubmenu(activeSubmenu === item.slug ? null : item.slug)}
                      className="w-full px-4 py-3 text-left text-black dark:text-white hover:bg-rose-500/20 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg transition-all duration-200 flex items-center justify-between min-h-[44px] focus:outline-none focus:ring-2 focus:ring-rose-500"
                      aria-expanded={activeSubmenu === item.slug}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${activeSubmenu === item.slug ? 'rotate-90' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    {activeSubmenu === item.slug && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.slug}
                            href={child.href || '#'}
                            onClick={onClose}
                            className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-rose-500/20 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg transition-all duration-200 min-h-[44px] flex items-center"
                            role="menuitem"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={`/menu/${item.slug}`}
                    onClick={onClose}
                    className="block px-4 py-3 text-black dark:text-white hover:bg-rose-500/20 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg transition-all duration-200 min-h-[44px] flex items-center"
                    role="menuitem"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Additional Links */}
            <div className="mt-4 pt-4 border-t border-gray-600 space-y-2">
              <Link
                href="/terminal"
                onClick={onClose}
                className={`block px-4 py-3 hover:bg-rose-500/20 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg transition-all duration-200 min-h-[44px] flex items-center ${pathname === '/terminal' ? 'text-sky-600 bg-sky-100 dark:bg-sky-900/20' : 'text-black dark:text-white'}`}
                role="menuitem"
              >
                Terminal
              </Link>
              <Link
                href="/login"
                onClick={onClose}
                className="block px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 min-h-[44px] flex items-center justify-center"
                role="menuitem"
              >
                Sign In
              </Link>
              <Link
                href="/challenges"
                onClick={onClose}
                className="block px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300 min-h-[44px] flex items-center justify-center"
                role="menuitem"
              >
                🏆 Challenges
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

