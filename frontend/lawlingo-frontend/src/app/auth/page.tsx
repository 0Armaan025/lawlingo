'use client'; // Required for Next.js 13+ client components

import { motion } from 'framer-motion';
import { Lock, Mail, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle authentication logic here
        console.log(isLogin ? 'Logging in' : 'Signing up', formData);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Grid background matching your theme */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="relative max-w-md mx-auto px-4 py-12 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full bg-white p-8 rounded-xl border border-gray-200 shadow-sm"
                >
                    {/* Header */}
                    <div className="flex flex-col items-center mb-8">
                        <h1
                            style={{ fontFamily: "Staatliches, sans-serif" }}
                            className='text-yellow-600 text-4xl md:text-5xl mb-2'
                        >
                            {isLogin ? 'Login' : 'Sign Up'}
                        </h1>
                        <p className="text-gray-600">
                            {isLogin ? 'Welcome back to LawLingo' : 'Join LawLingo today'}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                transition={{ duration: 0.3 }}
                                className="mb-4"
                            >
                                <label className="block text-gray-700 mb-2">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                        placeholder="John Doe"
                                        required={!isLogin}
                                    />
                                </div>
                            </motion.div>
                        )}

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-yellow-600 text-white p-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2"
                        >
                            {isLogin ? 'Login' : 'Sign Up'}
                            {isLogin ? <ArrowRight className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                        </motion.button>
                    </form>

                    {/* Toggle between login/signup */}
                    <div className="mt-6 text-center">
                        <button
                            onClick={toggleAuthMode}
                            className="text-yellow-600 cursor-pointer hover:text-yellow-800 font-medium flex items-center justify-center gap-1 mx-auto"
                        >
                            {isLogin ? (
                                <>
                                    <span className='cursor-pointer'>Don't have an account? Sign Up</span>
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            ) : (
                                <>
                                    <ArrowLeft className="h-4 w-4" />
                                    <span className='cursor-pointer'>Already have an account? Login</span>
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AuthPage;