"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AUTH_SYSTEM_AVAILABLE } from "@/config/authStatus";

// Public routes that don't require authentication
const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/register",
  "/continue",
];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // IMMEDIATE check - don't wait for pathname
    if (typeof window === "undefined") {
      return;
    }

    const currentPath = window.location.pathname;

    if (!AUTH_SYSTEM_AVAILABLE) {
      setIsAuthenticated(true);
      return;
    }

    // Check if trying to access tutorials dropdown routes - only these require registration
    const isTutorialDropdownRoute = 
      currentPath === "/tutorials/medical-coding" ||
      currentPath === "/tutorials/programming" ||
      currentPath === "/tutorials/government-jobs" ||
      currentPath === "/tutorials/courses" ||
      currentPath.startsWith("/tutorials/medical-coding/") ||
      currentPath.startsWith("/tutorials/programming/") ||
      currentPath.startsWith("/tutorials/government-jobs/") ||
      currentPath.startsWith("/tutorials/courses/");
    
    if (isTutorialDropdownRoute) {
      if (!AUTH_SYSTEM_AVAILABLE) {
        setIsAuthenticated(true);
        return;
      }
      // Check for token IMMEDIATELY and validate it
      const token = localStorage.getItem("token");
      console.log('[AUTH_GUARD] Tutorial dropdown route detected:', currentPath);
      console.log('[AUTH_GUARD] Token check:', token ? 'exists' : 'missing');
      
      if (!token || token.trim() === "" || token === "null" || token === "undefined") {
        // Check if user has a registered email stored
        let registeredEmail = localStorage.getItem("registeredEmail");
        console.log('[AUTH_GUARD] registeredEmail from localStorage:', registeredEmail);
        
        // Fallback: check stored user object for email
        if (!registeredEmail || registeredEmail.trim() === '') {
          const userStr = localStorage.getItem("user");
          console.log('[AUTH_GUARD] Checking user object, userStr exists:', !!userStr);
          if (userStr) {
            try {
              const user = JSON.parse(userStr);
              console.log('[AUTH_GUARD] Parsed user object:', user);
              if (user && user.email && typeof user.email === 'string') {
                registeredEmail = user.email;
                console.log('[AUTH_GUARD] Found email in user object:', registeredEmail);
                // Store it for future use (registeredEmail is guaranteed to be string here)
                if (registeredEmail && registeredEmail.trim() !== '') {
                  localStorage.setItem("registeredEmail", registeredEmail);
                }
              }
            } catch (e) {
              console.error('[AUTH_GUARD] Error parsing user:', e);
            }
          }
        }
        
        console.log('[AUTH_GUARD] Final registeredEmail check:', registeredEmail);
        if (registeredEmail && registeredEmail.trim() !== '') {
          // User has registered before, show continue page
          console.log('[AUTH_GUARD] ✅ Redirecting to /continue');
          setIsAuthenticated(false);
          window.location.replace(`/continue?redirect=${encodeURIComponent(currentPath)}`);
        } else {
          // No registered email, redirect to registration
          console.log('[AUTH_GUARD] ❌ Redirecting to /register');
          setIsAuthenticated(false);
          window.location.replace(`/register?redirect=${encodeURIComponent(currentPath)}`);
        }
        return;
      }
      
      // Validate JWT token format and expiry
      try {
        const parts = token.split('.');
        if (parts.length !== 3) {
          // Invalid JWT format
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          // Check for registered email with fallback
          let registeredEmail = localStorage.getItem("registeredEmail");
          if (!registeredEmail) {
            const userStr = localStorage.getItem("user");
            if (userStr) {
              try {
                const user = JSON.parse(userStr);
                if (user && user.email && typeof user.email === 'string') {
                  registeredEmail = user.email;
                  if (registeredEmail) {
                    localStorage.setItem("registeredEmail", registeredEmail);
                  }
                }
              } catch (e) {
                // Ignore parse errors
              }
            }
          }
          if (registeredEmail) {
            window.location.replace(`/continue?redirect=${encodeURIComponent(currentPath)}`);
          } else {
            window.location.replace(`/register?redirect=${encodeURIComponent(currentPath)}`);
          }
          return;
        }
        
        // Check if token is expired
        const payload = JSON.parse(atob(parts[1]));
        if (payload.exp && payload.exp * 1000 < Date.now()) {
          // Token expired
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          // Check for registered email with fallback
          let registeredEmail = localStorage.getItem("registeredEmail");
          if (!registeredEmail) {
            const userStr = localStorage.getItem("user");
            if (userStr) {
              try {
                const user = JSON.parse(userStr);
                if (user && user.email && typeof user.email === 'string') {
                  registeredEmail = user.email;
                  if (registeredEmail) {
                    localStorage.setItem("registeredEmail", registeredEmail);
                  }
                }
              } catch (e) {
                // Ignore parse errors
              }
            }
          }
          if (registeredEmail) {
            window.location.replace(`/continue?redirect=${encodeURIComponent(currentPath)}`);
          } else {
            window.location.replace(`/register?redirect=${encodeURIComponent(currentPath)}`);
          }
          return;
        }
        
        // Token is valid
        setIsAuthenticated(true);
      } catch {
        // Invalid token format
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        // Check for registered email with fallback
        let registeredEmail = localStorage.getItem("registeredEmail");
        if (!registeredEmail) {
          const userStr = localStorage.getItem("user");
          if (userStr) {
            try {
              const user = JSON.parse(userStr);
              if (user && user.email && typeof user.email === 'string') {
                registeredEmail = user.email;
                if (registeredEmail) {
                  localStorage.setItem("registeredEmail", registeredEmail);
                }
              }
            } catch (e) {
              // Ignore parse errors
            }
          }
        }
        if (registeredEmail) {
          window.location.replace(`/continue?redirect=${encodeURIComponent(currentPath)}`);
        } else {
          window.location.replace(`/register?redirect=${encodeURIComponent(currentPath)}`);
        }
        return;
      }
    }

    // Wait for pathname to be available for other routes
    if (!pathname) {
      return;
    }

    // Check if current route is public
    const isPublic = publicRoutes.some(route => 
      pathname === route || pathname.startsWith(route)
    );

    if (!AUTH_SYSTEM_AVAILABLE) {
      setIsAuthenticated(true);
      return;
    }

    if (isPublic) {
      setIsAuthenticated(true);
      return;
    }

    // Check for token in localStorage
    const token = localStorage.getItem("token");
    
    // Validate token exists and is valid
    let isValid = false;
    if (token && token.trim() !== "" && token !== "null" && token !== "undefined") {
      // Validate JWT token format and expiry
      try {
        const parts = token.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          if (!payload.exp || payload.exp * 1000 >= Date.now()) {
            isValid = true; // Token is valid
          } else {
            // Token expired
            localStorage.removeItem('token');
          }
        } else {
          // Invalid JWT format
          localStorage.removeItem('token');
        }
      } catch {
        // Invalid token format
        localStorage.removeItem('token');
      }
    }
    
    if (isValid) {
      setIsAuthenticated(true);
    } else {
      if (isTutorialDropdownRoute) {
        // Already handled above, but double-check
        setIsAuthenticated(false);
        window.location.replace(`/register?redirect=${encodeURIComponent(pathname)}`);
        return;
      } else if (pathname === "/") {
        // Root page is public - allow access
        setIsAuthenticated(true);
        return;
      } else if (pathname !== "/" && pathname !== "/login" && pathname !== "/signup" && pathname !== "/register") {
        // Redirect other protected routes to home page
        setIsAuthenticated(false);
        window.location.replace("/");
        return;
      }
      setIsAuthenticated(false);
    }
  }, [pathname]);

  // Show nothing while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // If authenticated or on public route, show children
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // If not authenticated, show loading (redirect is happening)
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
      <div className="text-white">Redirecting to registration...</div>
    </div>
  );
}
