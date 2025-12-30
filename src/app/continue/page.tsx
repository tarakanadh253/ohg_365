"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  LogIn,
  User,
  ArrowRight,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AUTH_SYSTEM_AVAILABLE } from "@/config/authStatus";

function ContinueForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!AUTH_SYSTEM_AVAILABLE) {
      router.replace(redirectTo);
      return;
    }
    // Get stored email from localStorage - check multiple sources
    let email: string | null = localStorage.getItem("registeredEmail");

    // Fallback: check stored user object for email
    if (!email) {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user && user.email && typeof user.email === 'string') {
            email = user.email;
            // Store it for future use (email is guaranteed to be string here)
            if (email) {
              localStorage.setItem("registeredEmail", email);
            }
          }
        } catch (e) {
          console.error("Error parsing user data:", e);
        }
      }
    }

    if (email) {
      setRegisteredEmail(email);
    } else {
      // No stored email, redirect to registration
      router.push(`/register?redirect=${encodeURIComponent(redirectTo)}`);
    }
  }, [router, redirectTo]);

  const handleContinue = () => {
    if (registeredEmail) {
      // Redirect to login with email pre-filled
      router.push(`/login?email=${encodeURIComponent(registeredEmail)}&redirect=${encodeURIComponent(redirectTo)}`);
    }
  };

  const handleUseDifferentAccount = () => {
    // Clear stored email and redirect to registration
    localStorage.removeItem("registeredEmail");
    router.push(`/register?redirect=${encodeURIComponent(redirectTo)}`);
  };

  if (!registeredEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, var(--bg-gradient-start), var(--bg-gradient-mid), var(--bg-gradient-end))' }}>
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#1a1a1a] border border-gray-700 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center">
                  <Image
                    src="/logo_new.jpg"
                    alt="OHG365 Logo"
                    width={48}
                    height={48}
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="text-2xl font-bold text-white">OneHubGlobal</span>
              </div>
            </Link>
            <h1 className="text-3xl font-bold text-white mb-2">Continue with Your Account</h1>
            <p className="text-gray-400">We found an account associated with this device</p>
          </div>

          {/* Email Display Card */}
          <div className="bg-gradient-to-r from-rose-500/10 to-purple-500/10 border border-rose-500/30 rounded-xl p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-400 mb-1">Registered Email</p>
                <p className="text-white font-semibold truncate">{registeredEmail}</p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/50 hover:from-rose-600 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2 mb-4"
          >
            <LogIn className="w-5 h-5" />
            <span>Continue with this Account</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Use Different Account Button */}
          <button
            onClick={handleUseDifferentAccount}
            className="w-full bg-gray-800 text-gray-300 font-semibold py-3 px-6 rounded-xl border border-gray-700 hover:bg-gray-700 hover:border-gray-600 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <X className="w-4 h-4" />
            <span>Use a Different Account</span>
          </button>

          {/* Info Text */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Clicking "Continue" will take you to the login page with your email pre-filled
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ContinuePage() {
  if (!AUTH_SYSTEM_AVAILABLE) {
    return null;
  }
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, var(--bg-gradient-start), var(--bg-gradient-mid), var(--bg-gradient-end))' }}>
        <div className="text-white">Loading...</div>
      </div>
    }>
      <ContinueForm />
    </Suspense>
  );
}

