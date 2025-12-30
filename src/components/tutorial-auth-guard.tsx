'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AUTH_SYSTEM_AVAILABLE } from '@/config/authStatus';

// Helper function to validate JWT token
function isValidToken(token: string): boolean {
  if (!token || token.trim() === '' || token === 'null' || token === 'undefined') {
    return false;
  }
  
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return false; // Invalid JWT format
    }
    
    // Check if token is expired
    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return false; // Token expired
    }
    
    return true; // Token is valid
  } catch {
    return false; // Invalid token format
  }
}

export default function TutorialAuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
    AUTH_SYSTEM_AVAILABLE ? null : true
  );

  useEffect(() => {
    if (!AUTH_SYSTEM_AVAILABLE) {
      setIsAuthenticated(true);
      return;
    }
    // IMMEDIATE check - don't wait
    if (typeof window === 'undefined') {
      return;
    }

    const currentPath = pathname || window.location.pathname;
    
    // Only require registration for tutorials dropdown routes
    const isTutorialDropdownRoute = 
      currentPath === "/tutorials/medical-coding" ||
      currentPath === "/tutorials/programming" ||
      currentPath === "/tutorials/government-jobs" ||
      currentPath === "/tutorials/courses" ||
      currentPath.startsWith("/tutorials/medical-coding/") ||
      currentPath.startsWith("/tutorials/programming/") ||
      currentPath.startsWith("/tutorials/government-jobs/") ||
      currentPath.startsWith("/tutorials/courses/");
    
    // If not a dropdown route, allow access without registration
    if (!isTutorialDropdownRoute) {
      console.log('[TUTORIAL_AUTH] Not a dropdown route, allowing access:', currentPath);
      setIsAuthenticated(true);
      return;
    }
    
    const token = localStorage.getItem('token');
    
    // ALWAYS check for registered email first (regardless of token validity)
    let email = localStorage.getItem('registeredEmail');
    
    // Fallback: check stored user object for email
    if (!email || email.trim() === '') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user && user.email && typeof user.email === 'string') {
            email = user.email;
            if (email && email.trim() !== '') {
              localStorage.setItem('registeredEmail', email);
            }
          }
        } catch (e) {
          // Ignore parse errors
        }
      }
    }
    
    // If registered email exists, check sessionStorage to see if modal was already shown
    // The modal is handled by GlobalContinuePrompt component, which respects sessionStorage
    if (email && email.trim() !== '') {
      // Check if modal was already shown in this session
      const sessionKey = 'continueModalShown';
      const hasShownInSession = sessionStorage.getItem(sessionKey) === 'true';
      
      if (hasShownInSession) {
        // Modal already shown this session - allow access (GlobalContinuePrompt handles the modal)
        console.log('[TUTORIAL_AUTH] Registered email found, but modal already shown this session - allowing access');
        // Validate token to determine access
        if (!isValidToken(token || '')) {
          // Invalid token - but modal was shown, so allow access (user can still browse)
          console.log('[TUTORIAL_AUTH] Token invalid but modal shown - allowing access');
          if (token) {
            localStorage.removeItem('token');
          }
          setIsAuthenticated(true); // Allow access even without valid token if modal was shown
        } else {
          // Valid token - allow access
          console.log('[TUTORIAL_AUTH] Token valid and modal shown - allowing access');
          setIsAuthenticated(true);
        }
        return;
      } else {
        // Modal not shown yet - GlobalContinuePrompt will handle it
        // Just validate token and allow access (modal will show via GlobalContinuePrompt)
        console.log('[TUTORIAL_AUTH] Registered email found, modal will be shown by GlobalContinuePrompt');
        if (!isValidToken(token || '')) {
          // Invalid token - but allow access, GlobalContinuePrompt will show modal
          console.log('[TUTORIAL_AUTH] Token invalid, but allowing access (GlobalContinuePrompt will show modal)');
          if (token) {
            localStorage.removeItem('token');
          }
          setIsAuthenticated(true); // Allow access, modal will handle the flow
        } else {
          // Valid token - allow access, modal will show
          console.log('[TUTORIAL_AUTH] Token valid, allowing access (GlobalContinuePrompt will show modal)');
          setIsAuthenticated(true);
        }
        return;
      }
    }
    
    // No registered email found
    // Validate token
    if (!isValidToken(token || '')) {
      // Remove invalid token
      if (token) {
        localStorage.removeItem('token');
      }
      
      // No registered email and invalid token - redirect to registration
      const redirectUrl = `/register?redirect=${encodeURIComponent(currentPath)}`;
      console.log('[TUTORIAL_AUTH] No registered email and invalid token, redirecting to:', redirectUrl);
      window.location.href = redirectUrl;
      setIsAuthenticated(false);
      return;
    }
    
    // Token is valid - allow access even without registered email
    // registeredEmail is only used for the "continue" modal, not for blocking access
    console.log('[TUTORIAL_AUTH] ✅ Token valid but no registered email - allowing access anyway (token is sufficient)');
    setIsAuthenticated(true);
    return;
  }, [pathname]);

  // Show nothing while checking
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Modal is now handled by GlobalContinuePrompt component
  // This component only handles authentication/access control

  // Show nothing if not authenticated (redirecting)
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
        <div className="text-white">Redirecting...</div>
      </div>
    );
  }

  // Only render children if authenticated
  return <>{children}</>;
}

