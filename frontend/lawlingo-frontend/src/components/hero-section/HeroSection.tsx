"use client";
import React from 'react';

type Props = {};

const HeroSection = (props: Props) => {
    const text = "LAW";
    const text2 = "FOR";

    return (
        <div className="heroSection flex flex-col lg:flex-row justify-start items-center px-4 py-8 lg:py-0">
            <div className="flex flex-col justify-start items-start lg:mt-15 w-full lg:w-auto">
                <h3
                    className="ml-0 lg:ml-8 p-2 text-6xl md:text-8xl lg:text-[9.4rem] flex flex-row flex-wrap"
                    style={{ fontFamily: "Staatliches, sans-serif" }}
                >
                    {/* Character-by-character hover magic */}
                    {[...text].map((char, i) => (
                        <span
                            key={i}
                            className="hover:text-yellow-400 cursor-pointer transition duration-300 inline-block relative"
                        >
                            {char}
                            <span className="absolute bottom-0 left-0 w-full h-2 bg-amber-500 opacity-70 transform scale-x-0 hover:scale-x-100 origin-left transition-transform duration-300"></span>
                        </span>
                    ))}
                    <div className="ml-0 lg:ml-4"></div>

                    {/* Character-by-character hover magic */}
                    {[...text2].map((char, i) => (
                        <span
                            key={i}
                            className="hover:text-yellow-400 cursor-pointer transition duration-300 inline-block relative"
                        >
                            {char}
                            <span className="absolute bottom-0 left-0 w-full h-2 bg-amber-500 opacity-70 transform scale-x-0 hover:scale-x-100 origin-left transition-transform duration-300"></span>
                        </span>
                    ))}

                    <span className="text-yellow-500 ml-0 lg:ml-4 mt-2 lg:mt-0 block lg:inline">EVERYONE! :)</span>
                </h3>

                <h4
                    className="ml-0 lg:ml-8 p-2 text-xl md:text-2xl lg:text-[2rem] w-full lg:w-[60rem]"
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
                    className="getStartedBtn ml-0 lg:ml-8 px-6 py-3 bg-yellow-300 rounded-full text-2xl md:text-4xl lg:text-5xl font-light mt-6 cursor-pointer shadow-[0_6px_0_0_#2563eb] hover:shadow-[0_4px_0_0_#2563eb] active:shadow-none active:translate-y-[6px] transition-all duration-100"
                    value="GET STARTED"
                    style={{ fontFamily: "Staatliches, sans-serif" }}
                />
            </div>

            <div className="flex flex-col justify-center items-center mt-8 lg:mt-20 relative w-full lg:w-auto">
                <video
                    autoPlay
                    loop
                    muted
                    className="w-full  max-w-[20rem] md:max-w-[30rem] lg:max-w-[40rem] h-auto"
                >
                    <source src='./male_judge.mp4' />
                </video>
            </div>
        </div>
    );
};

export default HeroSection;