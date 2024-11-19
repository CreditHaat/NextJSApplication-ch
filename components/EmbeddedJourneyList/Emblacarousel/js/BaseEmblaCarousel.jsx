"use client"

import React from 'react'
import ReactDOM from 'react-dom/client'
import EmblaCarousel from './EmblaCarousel'
import Header from './Header'
import Footer from './Footer'


// import NewFormPageImage from '../NewPersonalLoanImages/NewFormPageImage.png';
import NewFormPageImage from '../../../NewPersonalLoanImages/NewFormPageImage.png'
import NewFormPageImage2 from '../../../NewPersonalLoanImages/FormPageImage2.png';
import NewFormPageImage3 from '../../../NewPersonalLoanImages/FormPageImage3.png';

const OPTIONS = { direction: 'rtl', loop: true }
const SLIDE_COUNT = 3
// const SLIDES = Array.from(Array(SLIDE_COUNT).keys())


const BaseEmblaCarousel = () => {

  const SLIDES = [
    { imageUrl: NewFormPageImage },
    { imageUrl: NewFormPageImage2 },
    { imageUrl: NewFormPageImage3 },
    { imageUrl: NewFormPageImage },
    { imageUrl: NewFormPageImage2 },
  ];

  return (
    <div>
      <EmblaCarousel slides={SLIDES} options={OPTIONS}/>
    </div>
  )
}

export default BaseEmblaCarousel
