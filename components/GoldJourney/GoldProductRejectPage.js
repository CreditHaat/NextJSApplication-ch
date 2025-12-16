// "use client"
// import React, { useEffect, useState } from 'react';
// import './GoldProductRejectPage.css';
// import Image from 'next/image';
// import listimage1 from '../NewBlJourneyD/newblimages/newchange11.png';
// import listimage2 from '../NewBlJourneyD/newblimages/newchange3.png';
// import listimage3 from '../NewBlJourneyD/newblimages/newchange2.png';
// import EmblaCarousel from '../NewBlJourneyD/Emblacarousel/js/EmblaCarousel';
// import { Roboto } from '@next/font/google';

// const roboto = Roboto({
//     weight: ['400', '700'],
//     subsets: ['latin'],
// });

// function GoldProductRejectPage() {
//     const OPTIONS = { direction: 'rtl', loop: true };
//     const SLIDES = [
//       { imageUrl: listimage1 },
//       { imageUrl: listimage2 },
//       { imageUrl: listimage3 },
//     ];
//     const [showMessage, setShowMessage] = useState(false);

//     useEffect(() => {
//         setShowMessage(true); // Show the message
//         const timer = setTimeout(() => {
//             setShowMessage(false); // Hide the message after 3 seconds
//         }, 4000); // Total time (slide in + visible + fade out)

//         return () => clearTimeout(timer); // Cleanup timer on unmount
//     }, []);

//   return (
//     <>
//         <div className={`${roboto.className} lappage-container`}> 
//         {/* <div className="carousel-background">
//         <EmblaCarousel slides={SLIDES} options={OPTIONS} />
//       </div> */}
//       <div className="goldrejectnewfirstcard-container">
//       <div className="goldrejecttext1">
//         <div style={{width:"100%", display:"flex", justifyContent:"center", fontSize:"25px",fontWeight:'bold'}}>
//           Sorry
//         </div>
//         <p style={{textAlign:"center"}}>unfortunately, your application has not been accepted at this time.
//        Thank you for your interest, and we wish you the best in your future endeavors.</p>
//       </div>
//     </div>
//     </div>
//     </>
//   )
// }

// export default GoldProductRejectPage;


"use client"
import React, { useEffect, useState } from 'react';
import RejectionPageNavbar from '../RejectionPage/RejectionPageNavbar'
import ScrollSpySection from '../RejectionPage/ScrollSpySection'
import successimage from '../SuccessPage/successpageimages/successimage.png';
import './GoldProductRejectPage.css';
import Image from 'next/image';
import listimage1 from '../NewBlJourneyD/newblimages/newchange11.png';
import listimage2 from '../NewBlJourneyD/newblimages/newchange3.png';
import listimage3 from '../NewBlJourneyD/newblimages/newchange2.png';
import rejectrimage from '../NewBlJourneyD/newblimages/rejectrimage.png';
import successrightimg from '../NewBlJourneyD/newblimages/successrightimg.png';
import EmblaCarousel from '../NewBlJourneyD/Emblacarousel/js/EmblaCarousel';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    weight: ['400', '700'],
    subsets: ['latin'],
});

function GoldProductRejectPage() {
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
                <div className="goldrejectnewfirstcard-container">
                    {/* Container for the image with negative margin */}
                    <div className='successrimg' style={{ display: "flex", justifyContent: "center" }}>
                        <Image
                            src={rejectrimage} // Replace with your image path
                            alt="success"
                            width={100} // Adjust size as needed
                            height={100} // Adjust size as needed
                        />
                    </div>

                    {/* Container for the "Thank You!" text */}
                    <div className="goldrejecttext1" style={{ textAlign: "center", marginTop:'0px' }}>
                        <div style={{ fontSize: "25px", fontWeight: 'bold', marginBottom: "10px" }}>
                            Sorry
                        </div>
                        <p>
                        unfortunately, your application has not been accepted at this time. Thank you for your interest, and we wish you the best in your future endeavors.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GoldProductRejectPage;
