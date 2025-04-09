"use client";

import React from "react";

const FancyText = ({ text }: { text: string }) => {
    return (
        <h1 className="text-3xl font-bold">
            {[...text].map((char, i) => (
                <span
                    key={i}
                    className="hover:text-indigo-500 transition duration-300 inline-block"
                >
                    {char}
                </span>
            ))}
        </h1>
    );
};

export default FancyText;
