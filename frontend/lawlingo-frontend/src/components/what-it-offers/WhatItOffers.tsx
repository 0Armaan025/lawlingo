"use client";
import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, BookOpen, Clock, Award } from "lucide-react";

interface OfferCardProps {
    title: string;
    description: string;
    position: "left" | "right";
    imageUrl: string;
    onClick: () => void;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    color: string;
}

const offers: OfferCardProps[] = [
    {
        title: "Typing Tests",
        description: "Practice legal text typing to increase speed. Optional, but helpful for speed demons.",
        imageUrl: "./typing_test.png",
        position: "left",
        onClick: () => { },
        icon: Clock,
        color: "bg-gradient-to-br from-blue-500 to-cyan-400",
    },
    {
        title: "Model Law Sessions",
        description: "AI-generated mock sessions with real case examples. Prepping you for courtroom chaos.",
        imageUrl: "./law_sessions.png",
        position: "right",
        onClick: () => { },
        icon: BookOpen,
        color: "bg-gradient-to-br from-purple-500 to-pink-500",
    },
    {
        title: "Modules and Quizzes",
        description: "Learn law the fun (okay, not really fun) way through bite-sized modules and quizzes.",
        imageUrl: "./modules_quiz.png",
        position: "left",
        onClick: () => { },
        icon: Award,
        color: "bg-gradient-to-br from-amber-500 to-orange-500",
    },
];

const WhatItOffersComponent: React.FC = () => {
    const [showEmoji, setShowEmoji] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [animate, setAnimate] = useState(false);
    const [visibleCards, setVisibleCards] = useState<number[]>([]);

    useEffect(() => {
        setAnimate(true);
        setVisibleCards([]);

        offers.forEach((_, index) => {
            setTimeout(() => {
                setVisibleCards(prev => [...prev, index]);
            }, 300 * (index + 1));
        });
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { offsetX, offsetY } = e.nativeEvent;
        setPosition({ x: offsetX + 40, y: offsetY });
    };

    return (
        <section className="mt-16 relative flex flex-col items-center gap-12 py-8">
            {/* Blurry background blobs */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-100 rounded-full filter blur-3xl opacity-20"></div>

            {/* Header */}
            <div className="relative z-10">
                <h3
                    className={`text-4xl font-bold relative inline-block transition-all duration-700 ${animate ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        }`}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                    onMouseEnter={() => setShowEmoji(true)}
                    onMouseLeave={() => setShowEmoji(false)}
                    onMouseMove={handleMouseMove}
                >
                    <span className="relative cursor-pointer">
                        What does <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">LawLingo</span> offer?
                        <span className="absolute -top-6 -right-6">
                            <Sparkles className="h-6 w-6 text-yellow-400" />
                        </span>
                    </span>
                    {showEmoji && (
                        <span
                            className="absolute pointer-events-none transition-all duration-100 ease-in-out"
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
                <div className="h-1 w-24 bg-gradient-to-r from-amber-400 to-yellow-600 mt-3 mx-auto rounded-full"></div>
            </div>

            {/* Cards */}
            <div className="flex flex-col items-center gap-16 w-full max-w-6xl">
                {offers.map((offer, idx) => (
                    <div
                        key={idx}
                        className={`transition-all duration-700 w-full ${visibleCards.includes(idx)
                            ? "translate-y-0 opacity-100"
                            : "translate-y-16 opacity-0"
                            }`}
                    >
                        <OfferCard {...offer} />
                    </div>
                ))}
            </div>

            {/* Get Started Button */}
            <button
                type="button"
                className="getStartedBtn mb-16 relative px-8 py-4 bg-gradient-to-br from-amber-300 to-yellow-400 rounded-2xl text-slate-800 text-2xl md:text-3xl lg:text-4xl font-medium tracking-wide mt-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:from-amber-200 hover:to-yellow-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-yellow-200 active:scale-95 shadow-lg"
                style={{
                    fontFamily: "'Staatliches', sans-serif",
                    textShadow: "1px 1px 0px rgba(255,255,255,0.3)",
                }}
            >
                <span className="relative z-10">GET STARTED</span>
                <span className="absolute inset-0 bg-blue-500 opacity-0 rounded-2xl -bottom-2 z-0 transition-all duration-300 group-hover:opacity-10"></span>
            </button>
        </section>
    );
};

const OfferCard: React.FC<OfferCardProps> = ({ title, description, position, imageUrl, onClick, icon: Icon, color }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isLeft = position === "left";

    return (
        <div
            className={`flex flex-col md:flex-row ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} items-center w-full cursor-pointer transition-all duration-300 ${isHovered ? "transform md:scale-[1.02]" : ""
                } rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl`}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image + Icon overlay */}
            <div className="relative w-full md:w-1/3 h-64 overflow-hidden">
                <div className={`absolute inset-0 ${color} opacity-30 z-10`}></div>
                <img
                    src={imageUrl}
                    alt={title}
                    className={`h-full w-full object-cover transition-all duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
                />
                <div className="absolute top-4 left-4 z-20 p-2 rounded-full bg-white/30 backdrop-blur-sm">
                    <Icon className="h-6 w-6 text-white" />
                </div>
            </div>

            {/* Content */}
            <div
                className={`flex flex-col justify-start items-start ${isLeft ? "md:ml-8" : "md:mr-8"} p-6 md:p-8 flex-1`}
            >
                <div className="flex items-center gap-2">
                    <h3 className="text-3xl font-bold text-gray-800" style={{ fontFamily: "Poppins, sans-serif" }}>
                        {title}
                    </h3>
                    <div
                        className={`h-1 ${color.replace('bg-gradient-to-br', 'bg')} rounded-full ${isHovered ? 'w-12' : 'w-6'} transition-all duration-300`}
                    ></div>
                </div>

                <p className="text-lg text-gray-700 mt-3 max-w-xl" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {description}
                </p>

                <div className={`mt-4 flex items-center text-yellow-600 font-medium transition-all duration-300 ${isHovered ? "translate-x-2" : ""}`}>
                    <span className="mr-2">Learn more</span>
                    <ArrowRight className="h-4 w-4" />
                </div>
            </div>
        </div>
    );
};

export default WhatItOffersComponent;
export { OfferCard };
