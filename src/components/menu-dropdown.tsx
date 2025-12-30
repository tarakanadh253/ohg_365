'use client';

import { useState, useEffect, useRef, useCallback, KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import menuConfig from '@/data/menu-config.json';
import {
  ChevronRight,
  Compass,
  Rocket,
  Terminal,
  Library,
  TrendingUp,
  Users,
  Info,
  Layers,
  Code2,
  FileText,
  Briefcase
} from 'lucide-react';

interface MenuItem {
  label: string;
  slug: string;
  href?: string;
  children?: Array<{
    label: string;
    slug: string;
    href: string;
  }>;
}

export default function MenuDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false);
  const [submenuPosition, setSubmenuPosition] = useState<{ top: number; left: number, side: 'left' | 'right' } | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const menuItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const menuButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const submenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null); // New ref for main menu
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (submenuTimeoutRef.current) {
        clearTimeout(submenuTimeoutRef.current);
      }
      if (menuTimeoutRef.current) {
        clearTimeout(menuTimeoutRef.current);
      }
    };
  }, []);

  // Helper to get icon for specific slugs
  const getIconForSlug = (slug: string) => {
    switch (slug) {
      case 'learning-paths': return <Compass className="w-5 h-5" />;
      case 'projects': return <Rocket className="w-5 h-5" />;
      case 'practice': return <Terminal className="w-5 h-5" />;
      case 'resources': return <Library className="w-5 h-5" />;
      case 'career': return <TrendingUp className="w-5 h-5" />;
      case 'community': return <Users className="w-5 h-5" />;
      case 'about-support': return <Info className="w-5 h-5" />;
      // Submenu or generic
      case 'frontend': return <Code2 className="w-4 h-4" />;
      case 'backend': return <Layers className="w-4 h-4" />;
      case 'full-stack': return <Briefcase className="w-4 h-4" />;
      default: return <div className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center"><div className="w-1.5 h-1.5 bg-sky-500 rounded-full"></div></div>;
    }
  };

  // Close menu function
  const closeMenu = useCallback(() => {
    // Clear any pending timeouts
    if (submenuTimeoutRef.current) clearTimeout(submenuTimeoutRef.current);
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);

    setIsOpen(false);
    setActiveSubmenu(null);
    setFocusedIndex(-1);
    setDropdownPosition(null);
    setSubmenuPosition(null);
  }, []);

  // Open menu function (for both click and hover)
  const openMenu = useCallback(() => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);

    setIsOpen(true);
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.left,
      });
    }
  }, []);

  // Close with delay (for hover leave)
  const closeMenuWithDelay = useCallback(() => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);

    menuTimeoutRef.current = setTimeout(() => {
      closeMenu();
    }, 200);
  }, [closeMenu]);

  // Close menu when clicking outside (supports both mouse and touch events)
  useEffect(() => {
    let touchStartTime = 0;
    let touchTarget: Node | null = null;

    const handleTouchStart = (event: TouchEvent) => {
      touchStartTime = Date.now();
      touchTarget = event.target as Node;
    };

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      // For touch events, check if this is a click (not just a touch)
      if (event.type === 'touchstart') return;

      // Check if the click is on a menu button or menu item
      const clickedElement = target as HTMLElement;
      if (clickedElement.closest('button[role="menuitem"]') ||
        clickedElement.closest('[role="menu"]') ||
        clickedElement.closest('[data-submenu]')) {
        return;
      }

      // Check if outside
      const isOutsideMainMenu = menuRef.current && !menuRef.current.contains(target);
      const submenuElement = document.querySelector('[data-submenu]');
      const isOutsideSubmenu = !submenuElement || !submenuElement.contains(target);
      const isOutsideDropdown = !document.querySelector('[role="menu"]')?.contains(target);

      if (isOutsideMainMenu && isOutsideSubmenu && isOutsideDropdown) {
        closeMenu();
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      // Only close if it was a tap (not a swipe) and outside the menu
      const timeDiff = Date.now() - touchStartTime;
      if (timeDiff < 300 && touchTarget) {
        const target = touchTarget;

        const touchedElement = target as HTMLElement;
        if (touchedElement.closest && (
          touchedElement.closest('button[role="menuitem"]') ||
          touchedElement.closest('[role="menu"]') ||
          touchedElement.closest('[data-submenu]'))) {
          // Reset touch tracking and return - don't close
          touchTarget = null;
          touchStartTime = 0;
          return;
        }

        const isOutsideMainMenu = menuRef.current && !menuRef.current.contains(target);

        if (isOutsideMainMenu) {
          closeMenu();
        }
      }
      touchTarget = null;
      touchStartTime = 0;
    };

    if (isOpen) {
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleTouchStart, { passive: true });
        document.addEventListener('touchend', handleTouchEnd, { passive: true });
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isOpen, closeMenu]);

  // Close menu when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        closeMenu();
      }
    };

    if (isOpen) {
      window.addEventListener('scroll', handleScroll, true);
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [isOpen, closeMenu]);


  // Update submenu position on scroll
  useEffect(() => {
    if (activeSubmenu && submenuPosition) {
      const updatePosition = () => {
        const activeIndex = menuConfig.menu.findIndex(item => item.slug === activeSubmenu);
        if (activeIndex !== -1) {
          const menuItem = menuItemRefs.current[activeIndex];
          if (menuItem) {
            const rect = menuItem.getBoundingClientRect();
            // Recalculate side based on space
            const submenuWidth = 280;
            const spaceRight = window.innerWidth - rect.right;
            const side = spaceRight < submenuWidth ? 'left' : 'right';

            setSubmenuPosition({
              top: rect.top,
              left: side === 'right' ? rect.right + 8 : rect.left - 8 - submenuWidth,
              side
            });
          }
        }
      };

      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [activeSubmenu, submenuPosition]);

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Toggle
      if (isOpen) closeMenu();
      else {
        openMenu();
        setFocusedIndex(0);
        setIsKeyboardNavigation(true);
      }
    } else if (e.key === 'Escape' && isOpen) {
      closeMenu();
      buttonRef.current?.focus();
    } else if (e.key === 'ArrowDown' && isOpen) {
      e.preventDefault();
      setIsKeyboardNavigation(true);
      const nextIndex = focusedIndex < menuConfig.menu.length - 1 ? focusedIndex + 1 : 0;
      setFocusedIndex(nextIndex);
    } else if (e.key === 'ArrowUp' && isOpen) {
      e.preventDefault();
      setIsKeyboardNavigation(true);
      const prevIndex = focusedIndex > 0 ? focusedIndex - 1 : menuConfig.menu.length - 1;
      setFocusedIndex(prevIndex);
    }
  };

  const handleMenuItemKeyDown = (e: KeyboardEvent<HTMLAnchorElement | HTMLButtonElement>, index: number, item: MenuItem) => {
    setIsKeyboardNavigation(true);
    if (e.key === 'ArrowRight' && item.children) {
      e.preventDefault();
      handleSubmenuOpen(item.slug, index);
    } else if (e.key === 'ArrowLeft' && activeSubmenu) {
      e.preventDefault();
      setActiveSubmenu(null);
      setSubmenuPosition(null);
    } else if (e.key === 'Escape') {
      closeMenu();
      buttonRef.current?.focus();
    }
  };

  const handleSubmenuKeyDown = (e: KeyboardEvent<HTMLAnchorElement>, parentIndex: number, childIndex: number, children: MenuItem[]) => {
    setIsKeyboardNavigation(true);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = childIndex < children.length - 1 ? childIndex + 1 : 0;
      itemRefs.current[parentIndex * 100 + nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = childIndex > 0 ? childIndex - 1 : children.length - 1;
      itemRefs.current[parentIndex * 100 + prevIndex]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setActiveSubmenu(null);
      setSubmenuPosition(null);
    } else if (e.key === 'Escape') {
      closeMenu();
      buttonRef.current?.focus();
    }
  };

  const toggleMenu = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isOpen) closeMenu();
    else openMenu();
  };

  // Calculate submenu position with Overflow Check
  const handleSubmenuOpen = (itemSlug: string, index: number) => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
      submenuTimeoutRef.current = null;
    }

    setActiveSubmenu(itemSlug);

    const calculatePosition = (): { top: number; left: number, side: 'left' | 'right' } => {
      const button = menuButtonRefs.current[index];
      const menuItem = menuItemRefs.current[index];
      const target = button || menuItem;

      if (target) {
        const rect = target.getBoundingClientRect();
        const submenuWidth = 280;
        const spaceRight = window.innerWidth - rect.right;
        const side = spaceRight < submenuWidth ? 'left' : 'right';

        return {
          top: rect.top,
          left: side === 'right' ? rect.right + 4 : rect.left - 4 - submenuWidth,
          side
        };
      }

      if (dropdownPosition) {
        return {
          top: dropdownPosition.top + 8 + (index * 44),
          left: dropdownPosition.left + 288 + 4,
          side: 'right'
        };
      }

      return { top: 0, left: 0, side: 'right' };
    };

    setSubmenuPosition(calculatePosition());
    requestAnimationFrame(() => {
      setSubmenuPosition(calculatePosition());
    });
  };

  // Handle closing submenu with delay
  const handleSubmenuClose = (itemSlug: string) => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
      submenuTimeoutRef.current = null;
    }
    submenuTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu((current) => {
        if (current === itemSlug) {
          setSubmenuPosition(null);
          return null;
        }
        return current;
      });
    }, 200);
  };

  return (
    <div
      className="relative"
      ref={menuRef}
      style={{ overflow: 'visible', zIndex: 100002 }}
      onMouseEnter={openMenu}
      onMouseLeave={closeMenuWithDelay}
    >
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleMenu(e);
        }}
        onKeyDown={handleKeyDown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Open main menu"
        className={`transition-colors flex items-center space-x-1 px-3 py-1.5 relative group font-bold nav-link-strict text-[#083D77] hover:text-sky-600 ${pathname.startsWith('/menu/') ? 'bg-[#083D77]/10 rounded-full' : ''}`}
      >
        <span>Menu</span>
        <svg
          className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {isMounted && isOpen && dropdownPosition && createPortal(
        <div
          role="menu"
          className="fixed w-72 bg-gray-50/90 backdrop-blur-xl rounded-2xl shadow-2xl p-3 border border-white/20 ring-1 ring-black/5 overflow-visible"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            position: 'fixed',
            zIndex: 100003
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onMouseEnter={() => {
            // Keep open when hovering the dropdown
            if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
          }}
          onMouseLeave={() => {
            // Close when leaving the dropdown
            closeMenuWithDelay();
          }}
        >
          <div className="flex flex-col gap-1.5">
            {menuConfig.menu.map((item, index) => (
              <div
                key={item.slug}
                className="relative"
                style={{ overflow: 'visible' }}
                ref={(el) => {
                  menuItemRefs.current[index] = el;
                }}
              >
                {item.children ? (
                  <>
                    <button
                      ref={(el) => {
                        menuButtonRefs.current[index] = el;
                      }}
                      role="menuitem"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsKeyboardNavigation(false);
                        setFocusedIndex(-1);
                        if (activeSubmenu === item.slug) {
                          setActiveSubmenu(null);
                          setSubmenuPosition(null);
                        } else {
                          handleSubmenuOpen(item.slug, index);
                        }
                      }}
                      // Hover logic for Submenu
                      onMouseEnter={() => {
                        setIsKeyboardNavigation(false);
                        setFocusedIndex(-1);
                        handleSubmenuOpen(item.slug, index);
                      }}
                      onMouseLeave={() => {
                        handleSubmenuClose(item.slug);
                      }}
                      className={`group relative flex items-center justify-between gap-4 px-4 py-3.5 rounded-2xl text-gray-600 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white hover:text-black hover:shadow-xl hover:scale-105 hover:z-10 bg-transparent w-full ${activeSubmenu === item.slug ? 'bg-white text-black shadow-lg scale-105 z-10' : ''}`}
                      aria-haspopup="true"
                      aria-expanded={activeSubmenu === item.slug}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`text-gray-400 group-hover:text-black transition-colors duration-200 ${activeSubmenu === item.slug ? 'text-black' : ''}`}>
                          {getIconForSlug(item.slug)}
                        </div>
                        <span className="font-semibold text-[15px] tracking-wide">{item.label}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${activeSubmenu === item.slug ? 'rotate-90' : ''}`} />
                    </button>

                    {isMounted && (activeSubmenu === item.slug) && submenuPosition && createPortal(
                      <>
                        <div
                          className="fixed"
                          style={{
                            position: 'fixed',
                            top: `${submenuPosition.top}px`,
                            left: submenuPosition.side === 'right' ? `${submenuPosition.left - 8}px` : `${submenuPosition.left + 280}px`,
                            width: '8px',
                            height: '44px',
                            zIndex: 100004
                          }}
                          onMouseEnter={() => {
                            // Bridge: Keep Submenu Open 
                            if (submenuTimeoutRef.current) {
                              clearTimeout(submenuTimeoutRef.current);
                              submenuTimeoutRef.current = null;
                            }
                            // Also keep Main Menu Open
                            if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);

                            setActiveSubmenu(item.slug);
                          }}
                        />
                        <div
                          data-submenu
                          role="menu"
                          className="fixed w-72 bg-gray-50/90 backdrop-blur-xl rounded-2xl shadow-2xl p-3 border border-white/20 ring-1 ring-black/5 overflow-visible"
                          style={{
                            position: 'fixed',
                            top: `${submenuPosition.top}px`,
                            left: `${submenuPosition.left}px`,
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            zIndex: 100004
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          onMouseEnter={() => {
                            // Submenu: Keep Submenu Open
                            if (submenuTimeoutRef.current) {
                              clearTimeout(submenuTimeoutRef.current);
                              submenuTimeoutRef.current = null;
                            }
                            // Also keep Main Menu Open
                            if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);

                            setActiveSubmenu(item.slug);
                          }}
                          onMouseLeave={() => {
                            handleSubmenuClose(item.slug);
                            // Note: We don't close main menu here because usage implies hovering back to main menu or away
                            // If they hover away, main menu's onMouseLeave (if they left that too) should trigger.
                            // Wait, this is a Portal. It is NOT inside the Main Menu div.
                            // So we DO need to potentially close Main Menu if they leave Submenu and go to nowhere?
                            // Usually, standard behavior (like Tutorials Dropdown) handles this via the Global "Close if outside" logic.
                            // Our Global "closeMenuWithDelay" is attached to the Main Menu div.
                            // If the user is in the Submenu (Portal), they have LEFT the Main Menu div.
                            // BUT we are keeping it open because we clear the timeout in onMouseEnter of the Portal.
                            // So if they leave the Portal, we should restart the Main Menu Close Timer?
                            // Yes.
                            closeMenuWithDelay();
                          }}
                        >
                          <div className="flex flex-col gap-1">
                            {item.children.map((child, childIndex) => (
                              <Link
                                key={child.slug}
                                href={child.href || `#`}
                                role="menuitem"
                                ref={(el) => {
                                  itemRefs.current[index * 100 + childIndex] = el;
                                }}
                                onKeyDown={(e) => handleSubmenuKeyDown(e, index, childIndex, item.children || [])}
                                onClick={() => {
                                  setIsOpen(false);
                                  setActiveSubmenu(null);
                                  setSubmenuPosition(null);
                                  setDropdownPosition(null);
                                }}
                                className={`group relative flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-600 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white hover:text-black hover:shadow-xl hover:scale-105 hover:z-10 ${pathname === child.href ? 'text-black font-bold' : ''}`}
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-black transition-colors"></div>
                                <span className="font-semibold text-[14px] tracking-wide">{child.label}</span>
                              </Link>
                            ))}
                          </div>
                        </div >
                      </>,
                      document.body
                    )}
                  </>
                ) : (
                  <Link
                    href={`/menu/${item.slug}`}
                    role="menuitem"
                    onClick={() => {
                      setIsOpen(false);
                      setDropdownPosition(null);
                    }}
                    className={`group relative flex items-center justify-between gap-4 px-4 py-3.5 rounded-2xl text-gray-600 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white hover:text-black hover:shadow-xl hover:scale-105 hover:z-10 bg-transparent w-full ${pathname === `/menu/${item.slug}` ? 'text-black font-bold' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-gray-400 group-hover:text-black transition-colors duration-200">
                        {getIconForSlug(item.slug)}
                      </div>
                      <span className="font-semibold text-[15px] tracking-wide">{item.label}</span>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>,
        document.body
      )
      }
    </div >
  );
}
