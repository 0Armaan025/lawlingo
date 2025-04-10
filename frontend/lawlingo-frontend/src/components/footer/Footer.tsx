import React from 'react';

type Props = {};

const Footer = (props: Props) => {
    return (
        <footer className=" bottom-0 w-full px-4 py-2 sm:py-3 md:py-4 bg-black/20 backdrop-blur-lg border-t border-white/10 text-center shadow-lg z-10">
            <div className="max-w-7xl mx-auto relative">
                <p className="text-white/100 font-semibold text-[0.65rem] sm:text-sm md:text-base lg:text-lg  tracking-wider transition-all duration-150 ease-in-out" style={{ fontFamily: "Poppins" }}>
                    LawLingo <span className="inline-block mx-1 opacity-100">&copy;</span> 2025
                </p>

                {/* Gradient overlay that doesn’t break layout */}
                <div className="absolute inset-0 rounded-md pointer-events-none">
                    <div className="w-full h-full bg-gradient-to-r from-yellow-300/10 via-transparent to-yellow-300/10" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
