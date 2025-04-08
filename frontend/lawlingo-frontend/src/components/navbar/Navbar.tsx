import React from 'react'

const Navbar = () => {
    return (
        <>
            <div className="navbar flex flex-row justify-between items-center px-4 py-4">
                <div className="logo">
                    <img src="/logo.png" alt="LawLingo Logo" className="h-12 w-48 hover:transform-3d hover:rotate-y-10 cursor-pointer transitionall hover:scale-105" />
                </div>
                <div className="nav-links flex flex-row space-x-4 p-2 border-2 border-yellow-500 rounded-full px-12">
                    <a href="/home" className="text-2xl uppercase mr-12 hover:underline underline-offset-8 cursor-pointer decoration-blue-600 transition-all" style={{ fontFamily: "Outfit, sans-serif" }}>Home</a>
                    <a href="/about" className="text-2xl uppercase hover:underline underline-offset-8 cursor-pointer decoration-blue-600 transition-all" style={{ fontFamily: "Outfit, sans-serif" }}>About</a>
                </div>
                <div className="action-button">
                    <button className="border-amber-400 border-2 bg-transparent text-black   rounded-4xl cursor-pointer px-6 py-3 font-mono text-lg hover:bg-gray-100/90 transition-all" style={{ fontFamily: "Outfit, sans-serif" }}>Get Started</button>
                </div>
            </div>
        </>
    );
}

export default Navbar