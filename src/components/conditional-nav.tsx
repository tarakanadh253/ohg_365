"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import SharedNav from "@/components/shared-nav";

export function ConditionalNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide ConditionalNav on home route (it has its own navigation)
  if (pathname === '/') {
    return null;
  }

  // Normalize pathname (remove trailing slash for comparison)
  const normalizedPath = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;

  // Check if the page uses a sidebar (TechLayout or DocsLayout)
  // Pages with sidebars: /java, /web-dev, /sql, /python, /devops, /linux, /data-science, 
  // /tutorials/azure-data-engineer/*, /tutorials/artificial-intelligence/*, /docs/*
  const hasSidebar =
    normalizedPath === '/java' ||
    normalizedPath === '/web-dev' ||
    normalizedPath === '/sql' ||
    normalizedPath === '/python' ||
    normalizedPath === '/devops' ||
    normalizedPath === '/linux' ||
    normalizedPath === '/data-science' ||
    normalizedPath === '/code-terminal' ||
    pathname.startsWith('/tutorials/azure-data-engineer') ||
    pathname.startsWith('/tutorials/artificial-intelligence') ||
    pathname.startsWith('/docs/');

  // Pages that need fixed nav (sidebar pages + tutorials pages + courses page + project pages)
  const needsFixedNav =
    hasSidebar ||
    normalizedPath === '/courses' ||
    normalizedPath === '/tutorials' ||
    pathname.startsWith('/tutorials/') ||
    pathname.startsWith('/menu/projects/');

  // Check if page should have gradient blue navbar (tutorials, courses, and project pages)
  const hasGradientBlueNav =
    normalizedPath === '/courses' ||
    normalizedPath === '/tutorials' ||
    pathname.startsWith('/tutorials/') ||
    pathname.startsWith('/menu/projects/');

  // Hide theme toggle on tutorials, courses, and project pages (always use dark theme)
  // MODIFIED: Enabled globally as per user request
  const hideThemeToggle = false;

  return (
    <SharedNav isScrolled={isScrolled} showAnimatedLine={false} isFixed={true} hasGradientBlueNav={hasGradientBlueNav} hideThemeToggle={hideThemeToggle} />
  );
}
