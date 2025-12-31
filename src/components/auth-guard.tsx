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
      // Allow public access to tutorial routes - don't enforce login
      setIsAuthenticated(true);
      return;
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
