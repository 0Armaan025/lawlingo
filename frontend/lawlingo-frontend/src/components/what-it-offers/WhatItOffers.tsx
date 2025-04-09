"use client";
import React, { useState } from "react";

type Props = {};

const WhatItOffersComponent = (props: Props) => {
    const [showEmoji, setShowEmoji] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
        setPosition({ x: e.nativeEvent.offsetX + 40, y: e.nativeEvent.offsetY });
    };


    return (
        <>
            <div className="whatItOffersComponent mt-8 flex justify-center items-center relative">
                <h3
                    className="text-[4rem] hover:scale-105 underline decoration-yellow-500 underline-offset-6 transition-all cursor-pointer [text-shadow:_0_2px_2px_rgba(7_207_0_/_0.5)] relative z-10"
                    style={{ fontFamily: "Staatliches, sans-serif" }}
                    onMouseEnter={() => setShowEmoji(true)}
                    onMouseLeave={() => setShowEmoji(false)}
                    onMouseMove={handleMouseMove}
                >
                    What does LawLingo offer:

                    {/* Floating emoji inside h3 */}
                    {showEmoji && (
                        <span
                            className="absolute  pointer-events-none transition-transform duration-100"
                            style={{
                                top: position.y,
                                left: position.x,
                                fontSize: "2rem",
                            }}
                        >
                            🤔
                        </span>
                    )}
                </h3>

            </div>
        </>
    );
};

export default WhatItOffersComponent;
