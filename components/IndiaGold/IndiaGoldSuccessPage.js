"use client"
import React, { useEffect, useState } from 'react';
import RejectionPageNavbar from '../RejectionPage/RejectionPageNavbar'
import ScrollSpySection from '../RejectionPage/ScrollSpySection'
import successimage from '../SuccessPage/successpageimages/successimage.png';
import './IndiaGoldSuccessPage.css';
import Image from 'next/image';
import listimage1 from '../NewBlJourneyD/newblimages/newchange11.png';
import listimage2 from '../NewBlJourneyD/newblimages/newchange3.png';
import listimage3 from '../NewBlJourneyD/newblimages/newchange2.png';
import EmblaCarousel from '../NewBlJourneyD/Emblacarousel/js/EmblaCarousel';
import { Roboto } from '@next/font/google';

const roboto = Roboto({
    weight: ['400', '700'],
    subsets: ['latin'],
  });
function IndiaGoldSuccessPage() {
    const OPTIONS = { direction: 'rtl', loop: true };
    const SLIDES = [
      { imageUrl: listimage1 },
      { imageUrl: listimage2 },
      { imageUrl: listimage3 },
    ];
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        setShowMessage(true); // Show the message
        const timer = setTimeout(() => {
            setShowMessage(false); // Hide the message after 3 seconds
        }, 4000); // Total time (slide in + visible + fade out)

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);

  return (
    <>
        <div className={`${roboto.className} lappage-container`}> 
        <div className="carousel-background">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
      <div className="lapnewfirstcard-container">
      <div className="laptext1">
       <h1><span style={{fontWeight: 'bold', marginLeft:'30%'}}>Thank you!</span> <br/> <br/> Your application for a loan against property has been received. Our team would contact you shortly to take the process forward.</h1>
      </div>
    </div>
    </div>
      </>
  )
}

export default IndiaGoldSuccessPage