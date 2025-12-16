"use client"
import React, { useEffect, useState } from 'react';
import RejectionPageNavbar from '../RejectionPage/RejectionPageNavbar'
import ScrollSpySection from '../RejectionPage/ScrollSpySection'
import './RupeekSuccessPage.css';
import Image from 'next/image';

import { Roboto } from 'next/font/google';

const roboto = Roboto({
    weight: ['400', '700'],
    subsets: ['latin'],
  });
function RupeekSuccessPage({product}) {
   
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
        {/* <div className="carousel-background">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div> */}
      <div className="goldnewfirstcard-container">
      <div className="goldtext1">
      <div style={{width:"100%", display:"flex", justifyContent:"center", fontSize:"25px", fontWeight:'bold'}}>
          Thank You!
        </div>
        <p style={{textAlign:"center"}}>Your application has been accepted by {product} . Our team would contact you shortly to take the process forward.</p>
      </div>
    </div>
    </div>
      </>
  )
}

export default RupeekSuccessPage;