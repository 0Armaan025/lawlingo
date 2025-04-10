'use client'; // Add this at the top for Next.js 13+ client components

import { Info } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

const AboutPage = () => {
    const features = [
        {
            title: "Legal Terminology Simplified",
            content: "LawLingo breaks down complex legal jargon into plain language you can understand."
        },
        {
            title: "Instant Document Analysis",
            content: "Upload your legal documents and get immediate insights with our AI technology."
        },
        // ... other features
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

            <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center justify-center mb-16"
                >
                    <div className="flex items-center gap-4">
                        <h1
                            style={{ fontFamily: "Staatliches, sans-serif" }}
                            className='text-yellow-600 underline underline-offset-6 text-6xl md:text-8xl'
                        >
                            About LawLingo
                        </h1>
                        <motion.div
                            animate={{
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1.1, 1]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatDelay: 3
                            }}
                        >
                            <Info className='text-yellow-600 w-12 h-12 md:w-16 md:h-16' />
                        </motion.div>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl text-center"
                    >
                        Revolutionizing legal understanding through AI-powered language simplification.
                    </motion.p>
                </motion.div>

                {/* Features grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="bg-white p-6 cursor-pointer rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
                        >
                            <motion.div
                                className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Info className="text-yellow-600 w-6 h-6" />
                            </motion.div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.content}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutPage;