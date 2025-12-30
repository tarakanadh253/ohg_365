"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Ghost, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-primary)] overflow-hidden relative">
            <div className="text-center z-10 max-w-lg mx-auto">

                {/* Animated Icon */}
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: [-10, 10, -10] }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="inline-block mb-8 relative"
                >
                    <div className="w-32 h-32 bg-sky-100/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                        <Ghost className="w-16 h-16 text-sky-400" />
                    </div>
                    {/* Decorative floating elements */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute -right-2 top-0 w-4 h-4 bg-purple-400 rounded-full blur-[2px]"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                        className="absolute -left-4 bottom-4 w-6 h-6 bg-blue-400 rounded-full blur-[4px]"
                    />
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h1 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-purple-500 mb-4">
                        404
                    </h1>
                    <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-[var(--text-secondary)] mb-10 text-lg">
                        Oops! It seems you've ventured into the void. The page you're looking for doesn't exist or has been moved.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-lg shadow-sky-500/20 transform hover:-translate-y-1 transition-all duration-300 gap-2"
                        >
                            <Home className="w-5 h-5" />
                            Return Home
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center justify-center px-8 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-sky-500/50 hover:bg-sky-500/5 text-[var(--text-primary)] font-semibold transform hover:-translate-y-1 transition-all duration-300 gap-2"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Go Back
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Background Decorative Blobs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none mix-blend-screen" />
        </div>
    );
}
