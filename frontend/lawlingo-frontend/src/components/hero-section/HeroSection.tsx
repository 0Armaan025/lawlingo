"use client";
import React from 'react';

type Props = {};

const HeroSection = (props: Props) => {
    const text = "LAW";
    const text2 = "FOR";

    return (
        <>
            <div className="heroSection flex flex-row justify-start items-center">
                <div className="flex mt-15 flex-col justify-start items-start ">
                    <h3
                        className="ml-8 p-2 text-[9.4rem] underline flex flex-row decoration-wavy decoration-amber-500"
                        style={{ fontFamily: "Staatliches, sans-serif" }}
                    >
                        {/* Character-by-character hover magic */}
                        {[...text].map((char, i) => (
                            <span
                                key={i}
                                className="hover:text-yellow-400 cursor-pointer transition duration-300 inline-block"
                            >
                                {char}
                            </span>
                        ))}
                        <div className="ml-4"></div>

                        {/* Character-by-character hover magic */}
                        {[...text2].map((char, i) => (
                            <span
                                key={i}
                                className="hover:text-yellow-400 cursor-pointer transition duration-300 inline-block"
                            >
                                {char}
                            </span>
                        ))}

                        <span className="text-yellow-500 ml-4">EVERYONE! :)</span>

                        {/* underline highlight box */}
                    </h3>

                    <h4
                        className="ml-8 p-2 text-[2rem] w-[60rem]"
                        style={{ fontFamily: "Cabin, sans-serif" }}
                    >
                        No boundaries, nothing stopping you to go all out and{" "}
                        <span className="text-yellow-500">
                            pursue your law dream, young human! :D
                        </span>
                    </h4>

                    <input
                        type="button"
                        className="getStartedBtn ml-8 px-6 py-3 bg-yellow-300 rounded-full text-5xl font-light mt-6 cursor-pointer shadow-[0_6px_0_0_#2563eb] hover:shadow-[0_4px_0_0_#2563eb] active:shadow-none active:translate-y-[6px] transition-all duration-100"
                        value="GET STARTED"
                        style={{ fontFamily: "Staatliches, sans-serif" }}
                    />
                </div>

                <div className="flex flex-col justify-center items-center mt-20 relative">
                    <video autoPlay loop muted style={{ width: "40rem", height: "40rem" }}>
                        <source src='./male_judge.mp4' />
                    </video>
                </div>
            </div>
        </>
    );
};

export default HeroSection;
