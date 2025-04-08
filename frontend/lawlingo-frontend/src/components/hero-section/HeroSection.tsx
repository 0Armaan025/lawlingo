import React from 'react'

type Props = {}

const HeroSection = (props: Props) => {
    return (
        <>
            <div className="heroSection flex flex-row justify-start items-center">
                <div className="flex mt-15 flex-col justify-start items-center">
                    <h3 className='ml-8  p-8 text-[8rem]' style={{ fontFamily: "Staatliches, sans-serif" }}>LAW FOR EVERYONE! :&#41;</h3>
                </div>

                <div className="flex flex-col justify-center items-center">

                </div>
            </div>
        </>
    );
}

export default HeroSection