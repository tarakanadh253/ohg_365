'use client';

import { useEffect, useState } from 'react';
import { AUTH_SYSTEM_AVAILABLE } from '@/config/authStatus';
import { TechnologyCard, CardGrid } from '@/components/ui/technology-card';
import { Rocket, Coffee, FileCode, Database, Globe, BarChart } from 'lucide-react';

// Check auth BEFORE component renders - runs at module level
let hasCheckedAuth = false;
if (typeof window !== 'undefined' && !hasCheckedAuth) {
  hasCheckedAuth = true;
  if (AUTH_SYSTEM_AVAILABLE) {
    const currentPath = window.location.pathname || '/tutorials/programming';
    const token = localStorage.getItem('token');
    // Check if token exists and is valid (not empty, null, undefined, or expired)
    if (!token || token.trim() === '' || token === 'null' || token === 'undefined') {
      // IMMEDIATE redirect before React renders
      window.location.replace(`/register?redirect=${encodeURIComponent(currentPath)}`);
    } else {
      // Validate JWT token format and expiry
      try {
        const parts = token.split('.');
        if (parts.length !== 3) {
          // Invalid JWT format
          localStorage.removeItem('token');
          window.location.replace(`/register?redirect=${encodeURIComponent(currentPath)}`);
        } else {
          // Check if token is expired
          const payload = JSON.parse(atob(parts[1]));
          if (payload.exp && payload.exp * 1000 < Date.now()) {
            // Token expired
            localStorage.removeItem('token');
            window.location.replace(`/register?redirect=${encodeURIComponent(currentPath)}`);
          }
        }
      } catch {
        // Invalid token format
        localStorage.removeItem('token');
        window.location.replace(`/register?redirect=${encodeURIComponent(currentPath)}`);
      }
    }
  }
}

export default function ProgrammingPage() {
  // ALL HOOKS MUST BE CALLED FIRST - before any conditional returns
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(() => {
    if (!AUTH_SYSTEM_AVAILABLE) return true;
    // Double-check in useState initializer
    if (typeof window === 'undefined') return null;
    const token = localStorage.getItem('token');
    if (!token || token.trim() === '' || token === 'null' || token === 'undefined') {
      window.location.replace(`/register?redirect=${encodeURIComponent('/tutorials/programming')}`);
      return false;
    }
    // Validate token
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        localStorage.removeItem('token');
        window.location.replace(`/register?redirect=${encodeURIComponent('/tutorials/programming')}`);
        return false;
      }
      const payload = JSON.parse(atob(parts[1]));
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        window.location.replace(`/register?redirect=${encodeURIComponent('/tutorials/programming')}`);
        return false;
      }
    } catch {
      localStorage.removeItem('token');
      window.location.replace(`/register?redirect=${encodeURIComponent('/tutorials/programming')}`);
      return false;
    }
    return true;
  });

  useEffect(() => {
    if (!AUTH_SYSTEM_AVAILABLE) {
      setIsAuthenticated(true);
      return;
    }
    // Triple-check on mount
    const token = localStorage.getItem('token');
    if (!token || token.trim() === '' || token === 'null' || token === 'undefined') {
      window.location.replace(`/register?redirect=${encodeURIComponent('/tutorials/programming')}`);
      return;
    }
    // Validate token
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        localStorage.removeItem('token');
        window.location.replace(`/register?redirect=${encodeURIComponent('/tutorials/programming')}`);
        return;
      }
      const payload = JSON.parse(atob(parts[1]));
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        window.location.replace(`/register?redirect=${encodeURIComponent('/tutorials/programming')}`);
        return;
      }
    } catch {
      localStorage.removeItem('token');
      window.location.replace(`/register?redirect=${encodeURIComponent('/tutorials/programming')}`);
      return;
    }
    setIsAuthenticated(true);
  }, []);

  // IMMEDIATE check after hooks - runs before rendering
  if (AUTH_SYSTEM_AVAILABLE && typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (!token || token.trim() === '' || token === 'null' || token === 'undefined') {
      window.location.replace(`/register?redirect=${encodeURIComponent('/tutorials/programming')}`);
      return null; // Return null immediately - prevents any rendering
    }

    // Validate token format and expiry
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        localStorage.removeItem('token');
        window.location.replace(`/register?redirect=${encodeURIComponent('/tutorials/programming')}`);
        return null;
      }

      const payload = JSON.parse(atob(parts[1]));
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        window.location.replace(`/register?redirect=${encodeURIComponent('/tutorials/programming')}`);
        return null;
      }
    } catch {
      localStorage.removeItem('token');
      window.location.replace(`/register?redirect=${encodeURIComponent('/tutorials/programming')}`);
      return null;
    }
  }

  // Don't render anything if not authenticated
  if (isAuthenticated === null || isAuthenticated === false) {
    return null; // Return null - prevents any rendering
  }

  return (
    <main className="min-h-screen pb-20" style={{ backgroundColor: 'var(--bg-primary)', paddingTop: '120px' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">

          <h1 className="text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Programming <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-500">Tutorials</span>
          </h1>
          <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>Master programming languages, frameworks, and development tools</p>
        </div>

        <CardGrid columns={3} className="max-w-6xl mx-auto gap-4">
          <TechnologyCard
            title="DevOps"
            description="Learn containerization, CI/CD, infrastructure automation, and cloud platforms"
            icon={<Rocket className="w-12 h-12 text-rose-500" />}
            link="/devops"
            gradient="from-sky-400 to-blue-500"
          />
          <TechnologyCard
            title="Java"
            description="Master Java programming, Spring Framework, and enterprise development"
            icon={<Coffee className="w-12 h-12 text-orange-500" />}
            link="/java"
            gradient="from-sky-400 to-blue-500"
          />
          <TechnologyCard
            title="Python"
            description="Learn Python programming, data science, web development, and automation"
            icon={<FileCode className="w-12 h-12 text-yellow-500" />}
            link="/python"
            gradient="from-sky-400 to-blue-500"
          />
          <TechnologyCard
            title="SQL & Databases"
            description="Database design, SQL queries, optimization, and modern database technologies"
            icon={<Database className="w-12 h-12 text-purple-500" />}
            link="/sql"
            gradient="from-sky-400 to-blue-500"
          />
          <TechnologyCard
            title="Web Development"
            description="HTML, CSS, JavaScript, React, and full-stack web development"
            icon={<Globe className="w-12 h-12 text-green-500" />}
            link="/web-dev"
            gradient="from-sky-400 to-blue-500"
          />
          <TechnologyCard
            title="Data Science"
            description="Data analysis, machine learning, statistics, and visualization"
            icon={<BarChart className="w-12 h-12 text-blue-500" />}
            link="/data-science"
            gradient="from-sky-400 to-blue-500"
          />
        </CardGrid>
      </div>
    </main>
  );
}
