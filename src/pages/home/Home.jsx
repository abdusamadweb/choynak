import React from 'react'
import HomeHero from "./hero/HomeHero";
import Countryes from "./countryes/Countryes";
import Universities from "./universities/Universities";

const Home = () => {
    return (
        <div className='home'>
            <HomeHero />
            <Countryes />
            <Universities />
        </div>
    )
}

export default Home