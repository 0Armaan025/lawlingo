import HeroSection from '@/components/hero-section/HeroSection';
import React from 'react'

type Props = {}

const HomePage = (props: Props) => {
    return (
        <>
            <div className="homePage">
                <HeroSection />
            </div>
        </>
    );
}

export default HomePage