'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import ContinueModal from '@/components/continue-modal';
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

// Routes where we should NOT show the modal (auth pages, etc.)
const excludedRoutes = [
  '/login',
  '/signup',
  '/register',
  '/continue',
];

// Only show modal for tutorials dropdown routes
const tutorialsDropdownRoutes = [
  '/tutorials/medical-coding',
  '/tutorials/programming',
  '/tutorials/government-jobs',
  '/tutorials/courses',
];

export default function GlobalContinuePrompt() {
  if (!AUTH_SYSTEM_AVAILABLE) {
    return null;
  }

  return <GlobalContinuePromptInner />;
}

function GlobalContinuePromptInner() {
  const pathname = usePathname();
  const [showContinueModal, setShowContinueModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isCheckingRef = useRef<boolean>(false); // Track if we're already checking
  const hasProcessedSessionRef = useRef<boolean>(false); // Track if we've already processed this session
  const sessionKey = 'continueModalShown';

  // Initialize: Check sessionStorage once on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const hasShownInSession = sessionStorage.getItem(sessionKey) === 'true';
    if (hasShownInSession) {
      hasProcessedSessionRef.current = true;
      setHasChecked(true);
    }
  }, []); // Run only once on mount

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      return;
    }

    // CRITICAL: Check sessionStorage FIRST - before ANY other checks
    // sessionStorage persists across component remounts, so this is the source of truth
    const hasShownInSession = sessionStorage.getItem(sessionKey) === 'true';
    
    // If already shown in session, skip everything immediately
    // Don't even check pathname or anything else - sessionStorage is the source of truth
    if (hasShownInSession) {
      hasProcessedSessionRef.current = true;
      setHasChecked(true);
      return; // Exit immediately - don't process anything
    }
    
    // Also check ref as secondary check (for same render cycle)
    if (hasProcessedSessionRef.current) {
      setHasChecked(true);
      return;
    }
    
    // Now check if we're on a tutorial route - if not, mark as checked and return
    const currentPath = pathname || window.location.pathname;
    
    // Don't show on excluded routes
    const isExcluded = excludedRoutes.some(route => 
      currentPath === route || currentPath.startsWith(route)
    );

    if (isExcluded) {
      setHasChecked(true);
      return;
    }

    // Only show for tutorials dropdown routes
    const isTutorialDropdownRoute = 
      tutorialsDropdownRoutes.some(route => 
        currentPath === route || currentPath.startsWith(route + '/')
      );

    if (!isTutorialDropdownRoute) {
      setHasChecked(true);
      return;
    }
    
    // Prevent multiple simultaneous checks
    if (isCheckingRef.current) {
      console.log('[GLOBAL_CONTINUE] Already checking, skipping duplicate check');
      return;
    }
    
    // IMPORTANT: Set sessionStorage IMMEDIATELY before any async operations
    // This marks the session as processed, preventing modal on subsequent navigations
    // Even if the component remounts, sessionStorage will persist
    sessionStorage.setItem(sessionKey, 'true');
    hasProcessedSessionRef.current = true;

    // Check for registered email in localStorage
    let email = localStorage.getItem('registeredEmail');
    
    // Fallback: check stored user object for email
    if (!email || email.trim() === '') {
      const userStr = localStorage.getItem('user');
      console.log('[GLOBAL_CONTINUE] Checking user object for email, userStr exists:', !!userStr);
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          console.log('[GLOBAL_CONTINUE] Parsed user object:', user);
          if (user && user.email && typeof user.email === 'string' && user.email.trim() !== '') {
            email = user.email.trim();
            console.log('[GLOBAL_CONTINUE] Found email in user object:', email);
            if (email) {
              localStorage.setItem('registeredEmail', email);
            }
          }
        } catch (e) {
          console.error('[GLOBAL_CONTINUE] Error parsing user object:', e);
        }
      }
    }
    
    // If no email found, don't show modal
    if (!email || email.trim() === '') {
      console.log('[GLOBAL_CONTINUE] No registered email found in localStorage');
      setHasChecked(true);
      return;
    }
    
    // Verify email exists in database before showing modal
    console.log('[GLOBAL_CONTINUE] Checking if email exists in database:', email);
    
    // Mark that we're checking to prevent duplicate checks
    isCheckingRef.current = true;
    
    // Create async function to check email
    const checkEmailInDatabase = async () => {
      try {
        const response = await fetch('/api/check-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email.trim() }),
        });
        
        const data = await response.json();
        
        if (response.ok && data.exists === true) {
          // sessionStorage is already set above, so modal won't show again on navigation
          console.log('[GLOBAL_CONTINUE] ✅ Email verified in database, showing continue modal (once per session)');
          setRegisteredEmail(email.trim());
          // Show modal after a short delay for better UX
          timerRef.current = setTimeout(() => {
            setShowContinueModal(true);
          }, 1000); // 1 second delay
          
          setHasChecked(true);
        } else {
          // Email not in database - this is normal, not an error
          console.log('[GLOBAL_CONTINUE] Email not found in database (this is normal for new users)');
          // Email not in database - clear it from localStorage
          localStorage.removeItem('registeredEmail');
          // sessionStorage already set above, so we won't check again this session
          setHasChecked(true);
        }
      } catch {
        // Network error or API unavailable - silently handle
        // This is expected in development or when API is unavailable
        console.log('[GLOBAL_CONTINUE] API check skipped (network unavailable or API error)');
        // On error, don't show modal to be safe
        // sessionStorage already set above, so we won't check again this session
        setHasChecked(true);
      } finally {
        // Reset checking flag
        isCheckingRef.current = false;
      }
    };
    
    // Call the async function
    checkEmailInDatabase();
    
    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [pathname]); // Include pathname to check on navigation, but sessionStorage check FIRST prevents re-processing

  // Don't render anything until we've checked
  if (!hasChecked) {
    return null;
  }

  // Check if modal should be shown - verify sessionStorage hasn't changed
  // sessionKey is already defined at component level (line 60)
  const hasShownInSession = typeof window !== 'undefined' && sessionStorage.getItem(sessionKey) === 'true';
  
  // If sessionStorage says it's been shown, but modal state says show, hide it
  if (hasShownInSession && showContinueModal) {
    setShowContinueModal(false);
  }

  // Show continue modal if email found and not already shown in session
  if (showContinueModal && registeredEmail && !hasShownInSession) {
    return (
      <ContinueModal
        registeredEmail={registeredEmail}
        redirectTo={pathname || window.location.pathname}
        onClose={() => {
          setShowContinueModal(false);
          // Mark as shown in this session so it doesn't show again
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('continueModalShown', 'true');
            hasProcessedSessionRef.current = true;
          }
          // If token is valid, allow access after closing
          const token = localStorage.getItem('token');
          if (token && isValidToken(token)) {
            // User confirmed, allow them to continue
            console.log('[GLOBAL_CONTINUE] User confirmed, allowing access');
          } else {
            // No valid token, but user closed modal - they can still browse
            console.log('[GLOBAL_CONTINUE] User closed modal without action');
          }
        }}
      />
    );
  }

  return null;
}

