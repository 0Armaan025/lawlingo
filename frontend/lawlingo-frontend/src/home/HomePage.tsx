"use client";
import HeroSection from '@/components/hero-section/HeroSection';
import WhatItOffersComponent from '@/components/what-it-offers/WhatItOffers';
import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

type Props = {};

const HomePage = (props: Props) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [circles, setCircles] = useState<
        Array<{ id: number, x: number, y: number, size: number }>
    >([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (gridRef.current && containerRef.current) {
            const grid = gridRef.current;

            // Subtle continuous pulse animation on the grid.
            gsap.to(grid, {
                backgroundPosition: '20px 20px',
                duration: 20,
                repeat: -1,
                yoyo: true,
                ease: "none"
            });

            // Combine multiple effects in a timeline for the hover animation.
            const hoverTimeline = gsap.timeline({ paused: true });
            hoverTimeline.to(grid, {
                backgroundColor: 'rgba(100, 149, 237, 1.0)', // Cornflower Blue with slight transparency
                scale: 1.02,
                duration: 0.7,
                ease: "power2.out"
            }, 0);
            hoverTimeline.to(grid, {
                backgroundPosition: '30px 30px',
                duration: 0.7,
                ease: "power2.out"
            }, 0);

            containerRef.current.addEventListener('mouseenter', () => hoverTimeline.play());
            containerRef.current.addEventListener('mouseleave', () => hoverTimeline.reverse());
        }

        // Floating circles animation
        circles.forEach((circle) => {
            gsap.to(`.circle-${circle.id}`, {
                y: -20,
                rotation: 2,
                duration: 3 + Math.random() * 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: Math.random() * 2
            });
        });
    }, [circles]);

    useEffect(() => {
        // Create initial circles
        const initialCircles = Array.from({ length: 8 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 60 + 40
        }));
        setCircles(initialCircles);

        // Mouse move effect for the follower.
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            gsap.to(".mouse-follower", {
                x: e.clientX - 128,
                y: e.clientY - 128,
                duration: 0.8,
                ease: "power2.out"
            });
        };
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
            <div className="homePage relative">
                {/* White background */}
                <div className="fixed inset-0 bg-white -z-10" />

                {/* Interactive background elements */}
                <div
                    ref={containerRef}
                    className="fixed inset-0 overflow-hidden -z-10 pointer-events-none"
                >
                    {/* Animated grid pattern */}
                    <div
                        ref={gridRef}
                        className="absolute inset-0 opacity-30 bg-grid-pattern bg-[length:40px_40px]"
                        style={{ zIndex: -1 }}
                    />

                    {/* Mouse follower */}
                    <div
                        className="mouse-follower absolute w-64 h-64 rounded-full bg-blue-50 opacity-20 blur-xl"
                        style={{ left: '0px', top: '0px' }}
                    />

                    {/* Floating circles */}
                    {circles.map((circle) => (
                        <div
                            key={circle.id}
                            className={`circle-${circle.id} absolute rounded-full bg-gray-100 opacity-20 blur-lg`}
                            style={{
                                width: `${circle.size}px`,
                                height: `${circle.size}px`,
                                left: `${circle.x}%`,
                                top: `${circle.y}%`
                            }}
                        />
                    ))}
                </div>

                <HeroSection />
                <WhatItOffersComponent />
            </div>

            {/* Global CSS */}
            <style jsx global>{`
                .bg-grid-pattern {
                    background-image:
                        linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px);
                    background-repeat: repeat;
                }
            `}</style>
        </>
    );
};

export default HomePage;