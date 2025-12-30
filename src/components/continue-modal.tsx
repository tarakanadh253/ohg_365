"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, User, ArrowRight, X } from "lucide-react";
import { AUTH_SYSTEM_AVAILABLE } from "@/config/authStatus";

interface ContinueModalProps {
  registeredEmail: string;
  redirectTo: string;
  onClose?: () => void;
}

export default function ContinueModal({ registeredEmail, redirectTo, onClose }: ContinueModalProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  if (!AUTH_SYSTEM_AVAILABLE) {
    return null;
  }

  const handleContinue = () => {
    // Mark as shown in this session so it doesn't show again
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('continueModalShown', 'true');
    }
    
    // Check if user has a valid token
    const token = localStorage.getItem('token');
    if (token && token.trim() !== '' && token !== 'null' && token !== 'undefined') {
      try {
        const parts = token.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          if (payload.exp && payload.exp * 1000 >= Date.now()) {
            // Token is valid - close modal and allow access (user confirmed)
            console.log('[CONTINUE_MODAL] Token valid, closing modal and allowing access');
            setIsVisible(false);
            if (onClose) {
              onClose();
            }
            // Don't reload - just allow access. Modal won't show again in this session
            return;
          }
        }
      } catch (e) {
        // Token invalid, proceed to login
        console.log('[CONTINUE_MODAL] Token invalid, redirecting to login');
      }
    }
    
    // No valid token - redirect to login with email pre-filled
    console.log('[CONTINUE_MODAL] No valid token, redirecting to login');
    window.location.href = `/login?email=${encodeURIComponent(registeredEmail)}&redirect=${encodeURIComponent(redirectTo)}`;
  };

  const handleUseDifferentAccount = () => {
    // Clear stored email and redirect to registration
    localStorage.removeItem("registeredEmail");
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Also clear token
    // Redirect to registration page
    window.location.href = `/register?redirect=${encodeURIComponent(redirectTo)}`;
  };

  const handleClose = () => {
    // Mark as shown in this session so it doesn't show again
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('continueModalShown', 'true');
    }
    setIsVisible(false);
    if (onClose) {
      onClose();
    } else {
      // Redirect to home if user closes without action
      router.push("/");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md mx-4 bg-gradient-to-br from-[#1a1a1a] via-[#252525] to-[#1a1a1a] border border-gray-700 rounded-2xl shadow-2xl animate-scale-in">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-400 hover:text-white z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Continue with Your Account</h2>
            <p className="text-gray-400 text-sm">
              We found an account associated with this email
            </p>
          </div>

          {/* Email Display */}
          <div className="bg-[#0a0a0a] border border-gray-700 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-rose-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 mb-1">Registered Email</p>
                <p className="text-white font-semibold truncate">{registeredEmail}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/50 hover:from-rose-600 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <LogIn className="w-5 h-5" />
              <span>Continue with this Account</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={handleUseDifferentAccount}
              className="w-full bg-gray-800 text-gray-300 font-semibold py-3 px-6 rounded-xl border border-gray-700 hover:bg-gray-700 hover:border-gray-600 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Use Different Account</span>
            </button>
          </div>

          {/* Info Text */}
          <p className="text-xs text-gray-500 text-center mt-6">
            Sign in to access tutorials and courses
          </p>
        </div>
      </div>
    </div>
  );
}

