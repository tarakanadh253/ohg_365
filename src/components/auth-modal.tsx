"use client";

import { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  AlertCircle,
  Mail,
  Lock,
  LogIn,
  UserPlus,
  User,
  X,
} from "lucide-react";
import Image from "next/image";

type Errors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
};

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");

  // Login state
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginErrors, setLoginErrors] = useState<Errors>({});
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Signup state
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signupErrors, setSignupErrors] = useState<Errors>({});
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState("");

  // Reset forms when modal closes or mode changes
  useEffect(() => {
    if (!isOpen) {
      setLoginData({ email: "", password: "" });
      setSignupData({ name: "", email: "", password: "", confirmPassword: "" });
      setLoginErrors({});
      setSignupErrors({});
      setLoginError("");
      setSignupError("");
      setShowLoginPassword(false);
      setShowSignupPassword(false);
      setShowConfirmPassword(false);
    }
  }, [isOpen, mode]);

  // Login validation
  const validateLogin = () => {
    const newErrors: Errors = {};
    if (!loginData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!loginData.password) {
      newErrors.password = "Password is required";
    }
    setLoginErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Signup validation
  const validateSignup = () => {
    const newErrors: Errors = {};
    if (!signupData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (signupData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!signupData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!signupData.password) {
      newErrors.password = "Password is required";
    } else if (signupData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(signupData.password)) {
      newErrors.password = "Password must include uppercase, lowercase, and number";
    }
    if (!signupData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setSignupErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;
    setIsLoginLoading(true);
    setLoginError("");

    try {
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginData.email.trim(),
          password: loginData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoginError(data.error || data.message || "Invalid credentials");
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Unable to connect to server. Try again later.");
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignup()) return;
    setIsSignupLoading(true);
    setSignupError("");

    try {
      const response = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: signupData.name.trim(),
          email: signupData.email.trim(),
          password: signupData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSignupError(data.error || data.message || "Registration failed");
      } else {
        // Auto login after signup
        const loginResponse = await fetch(`/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: signupData.email.trim(),
            password: signupData.password,
          }),
        });

        const loginData = await loginResponse.json();

        if (loginResponse.ok) {
          localStorage.setItem("token", loginData.token);
          localStorage.setItem("user", JSON.stringify(loginData.user));
          onClose();
          window.location.reload();
        } else {
          setSignupError("Account created but login failed. Please try logging in.");
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      setSignupError("Unable to connect to server. Try again later.");
    } finally {
      setIsSignupLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[#1a1a1a] border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center">
              <Image
                src="/logo_new.jpg"
                alt="OHG365 Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold text-white">OneHubGlobal</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {mode === "login" ? "Sign In Required" : "Create Account"}
          </h2>
          <p className="text-sm text-gray-400">
            {mode === "login"
              ? "Please sign in to continue browsing"
              : "Register to access all features"}
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2 mb-6 bg-[#252525] p-1 rounded-lg">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${mode === "login"
                ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white"
                : "text-gray-400 hover:text-white"
              }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${mode === "signup"
                ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white"
                : "text-gray-400 hover:text-white"
              }`}
          >
            Sign Up
          </button>
        </div>

        {/* Login Form */}
        {mode === "login" && (
          <>
            {loginError && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-xs text-red-400">{loginError}</p>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="login-email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => {
                      setLoginData({ ...loginData, email: e.target.value });
                      if (loginErrors.email) setLoginErrors({ ...loginErrors, email: "" });
                      if (loginError) setLoginError("");
                    }}
                    className={`w-full pl-10 pr-4 py-2 bg-[#252525] border ${loginErrors.email ? "border-red-500" : "border-gray-600"
                      } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-transparent text-sm`}
                    placeholder="Enter your email"
                  />
                </div>
                {loginErrors.email && (
                  <p className="mt-1 text-xs text-red-400">{loginErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="login-password"
                    type={showLoginPassword ? "text" : "password"}
                    value={loginData.password}
                    onChange={(e) => {
                      setLoginData({ ...loginData, password: e.target.value });
                      if (loginErrors.password) setLoginErrors({ ...loginErrors, password: "" });
                      if (loginError) setLoginError("");
                    }}
                    className={`w-full pl-10 pr-12 py-2 bg-[#252525] border ${loginErrors.password ? "border-red-500" : "border-gray-600"
                      } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-transparent text-sm`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {loginErrors.password && (
                  <p className="mt-1 text-xs text-red-400">{loginErrors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoginLoading}
                className="w-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                {isLoginLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>
          </>
        )}

        {/* Signup Form */}
        {mode === "signup" && (
          <>
            {signupError && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-xs text-red-400">{signupError}</p>
              </div>
            )}

            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label htmlFor="signup-name" className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="signup-name"
                    type="text"
                    value={signupData.name}
                    onChange={(e) => {
                      setSignupData({ ...signupData, name: e.target.value });
                      if (signupErrors.name) setSignupErrors({ ...signupErrors, name: "" });
                      if (signupError) setSignupError("");
                    }}
                    className={`w-full pl-10 pr-4 py-2 bg-[#252525] border ${signupErrors.name ? "border-red-500" : "border-gray-600"
                      } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-transparent text-sm`}
                    placeholder="Enter your full name"
                  />
                </div>
                {signupErrors.name && (
                  <p className="mt-1 text-xs text-red-400">{signupErrors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="signup-email"
                    type="email"
                    value={signupData.email}
                    onChange={(e) => {
                      setSignupData({ ...signupData, email: e.target.value });
                      if (signupErrors.email) setSignupErrors({ ...signupErrors, email: "" });
                      if (signupError) setSignupError("");
                    }}
                    className={`w-full pl-10 pr-4 py-2 bg-[#252525] border ${signupErrors.email ? "border-red-500" : "border-gray-600"
                      } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-transparent text-sm`}
                    placeholder="Enter your email"
                  />
                </div>
                {signupErrors.email && (
                  <p className="mt-1 text-xs text-red-400">{signupErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="signup-password"
                    type={showSignupPassword ? "text" : "password"}
                    value={signupData.password}
                    onChange={(e) => {
                      setSignupData({ ...signupData, password: e.target.value });
                      if (signupErrors.password) setSignupErrors({ ...signupErrors, password: "" });
                      if (signupError) setSignupError("");
                    }}
                    className={`w-full pl-10 pr-12 py-2 bg-[#252525] border ${signupErrors.password ? "border-red-500" : "border-gray-600"
                      } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-transparent text-sm`}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {signupErrors.password && (
                  <p className="mt-1 text-xs text-red-400">{signupErrors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-gray-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="signup-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={signupData.confirmPassword}
                    onChange={(e) => {
                      setSignupData({ ...signupData, confirmPassword: e.target.value });
                      if (signupErrors.confirmPassword) setSignupErrors({ ...signupErrors, confirmPassword: "" });
                      if (signupError) setSignupError("");
                    }}
                    className={`w-full pl-10 pr-12 py-2 bg-[#252525] border ${signupErrors.confirmPassword ? "border-red-500" : "border-gray-600"
                      } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-transparent text-sm`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {signupErrors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-400">{signupErrors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSignupLoading}
                className="w-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                {isSignupLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                  </>
                )}
              </button>
            </form>
          </>
        )}

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-rose-400 hover:text-rose-300 font-medium"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-rose-400 hover:text-rose-300 font-medium"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Your account for accessing all features
          </p>
        </div>
      </div>
    </div>
  );
}

