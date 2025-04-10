import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <div className="navbar flex flex-col md:flex-row justify-between items-center px-4 py-4 gap-4 md:gap-0">
            {/* Logo */}
            <div className="logo">
                <Link href="/">
                    <img
                        src="/logo.png"
                        alt="LawLingo Logo"
                        className="h-10 sm:h-12 w-auto hover:rotate-[10deg] cursor-pointer transition-transform duration-300 hover:scale-105"
                    />
                </Link>
            </div>

            {/* Nav Links */}
            <div className="nav-links flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 p-2 border-2 border-yellow-500 rounded-full md:px-12">
                <a
                    href="/"
                    className="text-lg sm:text-xl md:text-2xl uppercase md:mr-12 hover:underline underline-offset-8 cursor-pointer decoration-blue-600 transition-all ease-linear"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                    Home
                </a>
                <a
                    href="/about"
                    className="text-lg sm:text-xl md:text-2xl uppercase hover:underline underline-offset-8 cursor-pointer decoration-blue-600 transition-all"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                    About
                </a>
            </div>

            {/* Action Button */}
            <div className="action-button">
                <button
                    className="border-amber-400 border-2 bg-transparent text-black rounded-full px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-mono hover:bg-gray-100/90 transition-all"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default Navbar;
