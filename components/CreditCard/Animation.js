import React from 'react'
import a from '../../images/Frame 48095781.png';
import './Animation.css';
import Image from 'next/image';

const Animation = () => {
  return (
    <>
   
   <div class="animation-container" >
        <div class="logo-container">
            {/* <img src={a} alt="Logo" /> */}
            <Image
            src={a}
            width={300}
            height={300}
            layout='intrensic'
            alt="Logo"/>
        </div>
        <div class="circle circle-top"></div>
        <div class="circle circle-left"></div>
    </div>
    </>
  )
}

export default Animation