import HeroSection from '@/components/hero-section/HeroSection';
import WhatItOffersComponent from '@/components/what-it-offers/WhatItOffers';
import React from 'react'

type Props = {}

const HomePage = (props: Props) => {
    return (
        <>
            <div className="homePage">
                <HeroSection />
                <WhatItOffersComponent />
            </div>
        </>
    );
}

export default HomePage