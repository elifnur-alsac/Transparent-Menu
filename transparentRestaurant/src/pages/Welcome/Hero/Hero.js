import React from 'react'
import './Hero.css'
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className='hero-img container'>
        <div className='hero-content'>
            <h1 className='heading-primary'>
               <span>Welcome</span>  to restaurant
            </h1>
            <p className='text-white'>In this restaurant, you can choose your own quality of ingredients and adjust the quality of the meal you eat.</p>
            
            <Link to="/Menu">Menu</Link>

        </div>

    </div>
  )
}

export default Hero