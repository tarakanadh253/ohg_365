"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Eye,
    EyeOff,
    AlertCircle,
    Mail,
    Lock,
    User,
    Check,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
    AUTH_STATUS_DETAILS,
    AUTH_STATUS_HEADING,
    AUTH_STATUS_MESSAGE,
    AUTH_SYSTEM_AVAILABLE,
} from "@/config/authStatus";

type Errors = {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
};

function AuthPausedNotice() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-primary)] transition-colors duration-300">
            <div className="w-full max-w-xl space-y-6 text-center">
                <Link href="/" className="inline-block">
                    <div className="flex items-center justify-center space-x-3">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden flex items-center justify-center">
                            <Image
                                src="/logo_new.jpg"
                                alt="OHG365 Logo"
                                width={56}
                                height={56}
                                className="object-contain"
                                priority
                            />
                        </div>
                        <div className="text-left">
                            <p className="text-2xl font-bold text-white leading-tight">
                                OneHubGlobal
                            </p>
                            <p className="text-sm text-gray-400">OHG365</p>
                        </div>
                    </div>
                </Link>

                <div className="bg-[#1a1a1a] border border-gray-700 rounded-2xl shadow-2xl p-8 space-y-5">
                    <h1 className="text-3xl font-bold text-white">
                        {AUTH_STATUS_HEADING}
                    </h1>
                    <p className="text-gray-300">{AUTH_STATUS_MESSAGE}</p>
                    <p className="text-sm text-gray-400">{AUTH_STATUS_DETAILS}</p>
                    <div className="pt-4">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-rose-500 to-red-600 text-white font-semibold shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-all duration-300"
                        >
                            Continue exploring tutorials
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ActiveSignupForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";

    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [errors, setErrors] = useState<Errors>({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [signupError, setSignupError] = useState("");

    const validateForm = () => {
        const newErrors: Errors = {};
        if (!formData.name.trim()) {
            newErrors.name = "Full name is required";
        }
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (name in errors) setErrors((prev) => ({ ...prev, [name]: "" }));
        if (signupError) setSignupError("");
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);
        setSignupError("");

        try {
            const response = await fetch(`/api/auth/register`, { // Assuming /api/auth/register exists or similar
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setSignupError(data.error || data.message || "Registration failed");
            } else {
                // Store token and user data if auto-login
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("registeredEmail", formData.email);

                    if (redirectTo && redirectTo !== "/" && redirectTo !== "/login" && redirectTo !== "/signup") {
                        router.push(redirectTo);
                    } else {
                        router.push("/");
                    }
                } else {
                    // Need to login manually? Or redirect to login?
                    router.push("/login?email=" + encodeURIComponent(formData.email));
                }
            }
        } catch (error) {
            console.error("Signup error:", error);
            setSignupError("Unable to connect to server. Try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-6xl grid lg:grid-cols-2 rounded-[25px] overflow-hidden shadow-2xl bg-white min-h-[600px]">
                {/* Left Panel - Branding */}
                <div className="hidden lg:flex flex-col justify-center px-12 xl:px-24 py-12 bg-[#0ea5e9] relative overflow-hidden">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10 text-white max-w-lg">
                        <Link href="/" className="inline-block mb-10 group">
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col">
                                    <span className="text-3xl font-bold tracking-tight">OneHubGlobal</span>
                                    <div className="h-1 w-12 bg-white/60 rounded-full mt-1"></div>
                                </div>
                            </div>
                        </Link>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="bg-white/20 p-2 rounded-full mt-1">
                                    <Check className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Expert-Led Tutorials</h3>
                                    <p className="text-sky-100 leading-relaxed">Access premium DevOps and coding resources tailored to current industry standards.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white/20 p-2 rounded-full mt-1">
                                    <Check className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Interactive Learning</h3>
                                    <p className="text-sky-100 leading-relaxed">Track your progress with real-time quizzes, coding challenges, and hands-on projects.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white/20 p-2 rounded-full mt-1">
                                    <Check className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Career Growth</h3>
                                    <p className="text-sky-100 leading-relaxed">Connect with professionals, get certified, and unlock new career opportunities.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white/20 p-2 rounded-full mt-1">
                                    <Check className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">AI Mock Interview</h3>
                                    <p className="text-sky-100 leading-relaxed">Practice technical interviews with our AI assistant to boost your confidence and readiness.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Signup Form */}
                <div className="flex flex-col justify-center items-center px-4 sm:px-12 lg:px-24 py-12 pt-32 bg-white relative">
                    <div className="w-full max-w-md space-y-8">
                        <div className="text-center lg:text-left">
                            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Create Account</h2>
                            <p className="mt-2 text-gray-500">Join OneHubGlobal today</p>
                        </div>

                        {signupError && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-lg flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                <p className="text-sm text-red-600">{signupError}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="John Doe"
                                        className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent outline-none transition-all`}
                                    />
                                </div>
                                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="john@example.com"
                                        className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent outline-none transition-all`}
                                    />
                                </div>
                                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="At least 6 characters"
                                        className={`w-full pl-10 pr-12 py-3 bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent outline-none transition-all`}
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        name="confirmPassword"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        placeholder="Confirm your password"
                                        className={`w-full pl-10 pr-12 py-3 bg-gray-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent outline-none transition-all`}
                                    />
                                </div>
                                {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3.5 bg-[#0ea5e9] hover:bg-sky-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : 'Sign Up'}
                            </button>
                        </form>

                        <div className="text-center mt-6">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <Link href="/login" className="font-bold text-[#0ea5e9] hover:text-sky-700">
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SignupPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center transition-colors duration-300">
                <div className="text-[var(--text-primary)]">Loading...</div>
            </div>
        }>
            <SignupForm />
        </Suspense>
    );
}

function SignupForm() {
    if (!AUTH_SYSTEM_AVAILABLE) {
        return <AuthPausedNotice />;
    }
    return <ActiveSignupForm />;
}
