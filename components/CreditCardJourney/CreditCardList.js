"use client"

import React, { useEffect } from 'react';
import './CreditCardList.css';
import listimage1 from '../NewBlJourneyD/newblimages/banner11.png'
import listimage2 from '../NewBlJourneyD/newblimages/banner22.png';
import listimage3 from '../NewBlJourneyD/newblimages/banner333.png';
import Image from 'next/image';
import EmblaCarousel from '../../components/NewPersonalLoan/Other Components/Emblacarousel/js/EmblaCarousel';
import {Roboto} from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const OPTIONS = { direction: 'rtl', loop: true };
const SLIDES = [
  { imageUrl: listimage1 },
  { imageUrl: listimage2 },
  { imageUrl: listimage3 },
  { imageUrl: listimage1 },
  { imageUrl: listimage2 },
];

const CreditCardList = ({ companies, getLoanBackendMethod, redirectLinkMethod, mobileNumber }) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 
  
  const handleDataLayerStage = (stage) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'stage': stage});
  };

  return (
    <>

    {/* {console.log("Companies are :: ",companies)}
    {
      console.log("Lender Details :: ",companies.lenderDetails)
    } */}

    <div className={`${roboto.className} listpage-container`}>
      <div className="carousel-background">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>

      {
        (companies) ? (
          <>
            <div className="allnewcard-container">
              {
                companies.lender_details.map((lender, index) => (
                  
                  <div key={index} className="newcard-container">
                    <div className="card-logo">
                      <Image src={lender.logo} alt="Logo"
                        width={100}
                        height={40}
                        className="logo-image" style={{width: 'auto'}}/> {/* Display image here */}
                    </div>
                    
                    <div className="subcardheader">
                      <p className="card-subtitle">{lender.product}</p>
                    </div>

                    <div className="card-body">
                      <h1 className="amount">{lender.shortDesc}</h1>
                    </div>
                    <div>
                      { console.log("In new creditcardlist lender cpi is :: ",lender.cpi)}
                      {console.log("Received companies:", companies)
                      }
                      {
                          <>
                          {/* {console.log("Lender application link in creditcard is : ",lender.applicationlink)} */}
                          <button className="card-button" onClick={()=>redirectLinkMethod(lender.product, lender.applicationlink, lender.product_id)} >Continue</button>
                          </>
                      }
                    
                    </div>
                    
                  </div>
                ))
              }
            </div>
          </>
        ) : (
          <div>
          No creditcard Available
          </div>
          )
      }


    </div>
    
    </>
  );
};

export default CreditCardList;