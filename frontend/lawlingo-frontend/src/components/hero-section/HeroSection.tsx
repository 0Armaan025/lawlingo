"use client";
import React from 'react';

type Props = {};

const HeroSection = (props: Props) => {
    const text = "LAW";
    const text2 = "FOR";

    return (
        <div className="heroSection flex flex-col lg:flex-row justify-between items-center px-4 py-12 gap-12">
            {/* Left Text Content */}
            <div className="flex flex-col justify-start items-start w-full lg:w-1/2">
                <h3
                    className="w-full text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] leading-tight flex flex-wrap"
                    style={{ fontFamily: "Staatliches, sans-serif" }}
                >
                    <div className="flex flex-row flex-wrap ml-4">
                        <div className="ml-2">
                            {[...text].map((char, i) => (
                                <span
                                    key={`law-${i}`}
                                    className="hover:text-yellow-400 cursor-pointer transition duration-300 inline-block relative"
                                >
                                    {char}
                                    <span className="absolute bottom-0 left-0 w-full h-1 bg-amber-500 opacity-70 transform scale-x-0 hover:scale-x-100 origin-left transition-transform duration-300"></span>
                                </span>
                            ))}
                        </div>

                        <span className="mx-2"></span>
                        {[...text2].map((char, i) => (
                            <span
                                key={`for-${i}`}
                                className="hover:text-yellow-400 cursor-pointer transition duration-300 inline-block relative"
                            >
                                {char}
                                <span className="absolute bottom-0 left-0 w-full h-1 bg-amber-500 opacity-70 transform scale-x-0 hover:scale-x-100 origin-left transition-transform duration-300"></span>
                            </span>
                        ))}
                        <span className="text-yellow-500 ml-2 mt-2 block">EVERYONE! :)</span>
                    </div>
                </h3>

                <h4
                    className="mt-6 ml-7 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[2rem] w-full max-w-5xl"
                    style={{ fontFamily: "Cabin, sans-serif" }}
                >
                    No boundaries, nothing stopping you to go all out and{" "}
                    <span className="text-yellow-500 relative">
                        pursue your law dream, young human! :D
                        <svg
                            className="absolute -bottom-2 left-0 w-full h-2"
                            viewBox="0 0 100 10"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0,5 Q25,10 50,5 T100,5"
                                stroke="#f59e0b"
                                strokeWidth="2"
                                fill="none"
                                strokeDasharray="5,3"
                            />
                        </svg>
                    </span>
                </h4>

                <input
                    type="button"
                    className="mt-8 px-6 ml-6 py-3 bg-yellow-300 rounded-full text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light cursor-pointer shadow-[0_6px_0_0_#2563eb] hover:shadow-[0_4px_0_0_#2563eb] active:shadow-none active:translate-y-[6px] transition-all duration-100"
                    value="GET STARTED"
                    style={{ fontFamily: "Staatliches, sans-serif" }}
                />
            </div>

            {/* Right Video Content */}
            <div className="w-full lg:w-1/2 flex justify-center items-center">
                <video
                    autoPlay
                    loop
                    muted
                    className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto"
                >
                    <source src="./male_judge.mp4" />
                </video>
            </div>
        </div>
    );
};

export default HeroSection;
