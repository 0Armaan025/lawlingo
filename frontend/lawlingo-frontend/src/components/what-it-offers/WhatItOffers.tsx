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
            <div className="whatItOffersComponent mt-16 flex justify-center items-center relative">
                <h3
                    className="text-[2rem] hover:scale-105   transition-all cursor-pointer  relative z-10"
                    style={{ fontFamily: "Poppins, sans-serif" }}
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
