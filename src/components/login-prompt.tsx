"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import AuthModal from "./auth-modal";

export default function LoginPrompt() {
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasStartedTimerRef = useRef(false);

  useEffect(() => {
    // Wait for pathname to be available
    if (!pathname) return;

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    hasStartedTimerRef.current = false;

    // Don't show on login/signup pages
    const isAuthPage = 
      pathname === "/login" ||
      pathname === "/signup";

    if (isAuthPage) {
      setShowModal(false);
      return;
    }

    // Check if user is already logged in
    const checkAuth = () => {
      if (typeof window === "undefined") return false;
      const token = localStorage.getItem("token");
      return !!token;
    };

    if (checkAuth()) {
      setShowModal(false);
      return;
    }

    // Check if we've already shown the modal in this session
    const sessionShown = typeof window !== "undefined" ? sessionStorage.getItem("loginModalShown") : null;
    
    // Only start timer if not already shown in this session
    if (sessionShown !== "true") {
      hasStartedTimerRef.current = true;
      
      // Set timer for 10 seconds
      timerRef.current = setTimeout(() => {
        // Double-check user is still not logged in
        if (!checkAuth()) {
          // Check again if we're still on a non-auth page
          const currentPath = window.location.pathname;
          const stillAuthPage = 
            currentPath === "/login" ||
            currentPath === "/signup";
          
          if (!stillAuthPage) {
            setShowModal(true);
            if (typeof window !== "undefined") {
              sessionStorage.setItem("loginModalShown", "true");
            }
          }
        }
      }, 10000); // 10 seconds
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [pathname]);

  const handleClose = () => {
    setShowModal(false);
    // Don't show again in this session
    sessionStorage.setItem("loginModalShown", "true");
  };

  // Listen for storage changes (when user logs in from another tab)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token" && e.newValue) {
        setShowModal(false);
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return <AuthModal isOpen={showModal} onClose={handleClose} />;
}

