"use client"

import React, { useEffect } from 'react';
import './NewRupeekListPage.css';
import listimage1 from '../NewBlJourneyD/newblimages/banner11.png';
import listimage2 from '../NewBlJourneyD/newblimages/banner22.png';
import listimage3 from '../NewBlJourneyD/newblimages/banner333.png';
import birlaimage from '../NewBlJourneyD/newblimages/aditya-birla-capital-logo.png';
import Image from 'next/image';
import EmblaCarousel from '../../components/NewPersonalLoan/Other Components/Emblacarousel/js/EmblaCarousel';
// import {Roboto} from '@next/font/google';
import clock from "../NewBlJourneyD/newblimages/clock.png";
import {Roboto} from '@next/font/google';

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

const NewRupeekListPage = ({ companies, getLoanBackendMethod, redirectLinkMethod, mobileNumber }) => {

  const redirectFunction=()=>{
    window.location.href = `https://app.credithaat.com/embedded_journey?mobilenumber=${mobileNumber}`
  }

  // useEffect(()=>{
  //   if(companies){
  //     console.log("Inside useEfect companies length are :: ",companies.lender_details);
  //   }
  // },[companies])

  useEffect(() => {
    // Check if companies exists and lender_details is empty or undefined
    if (!companies || !companies.lender_details || companies.lender_details.length === 0) {
      // Call redirect function if conditions are met
      redirectFunction();
    } else {
      // Otherwise, log the lender_details length (for debugging purposes)
      console.log("Inside useEffect, companies lender_details length are :: ", companies.lender_details.length);
    }
  }, [companies]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 
  

  return (
    <>

    {console.log("Companies are :: ",companies)}
    {
        (companies!==null)?(<>
        {console.log("Lender Details :: ",companies.lender_details)}
        </>):(<></>)
      
    }

    <div className={`${roboto.className} listpage-container`}>
      <div className="listcarousel-background">
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
                        className="logo-image" /> {/* Display image here */}
                    </div>
                    {/* <div className="subcardheader">
                      <p className="card-subtitle">{lender.product}</p>
                    </div> */}
                    <div className="card-body">
                      <h1 className="amount"> {lender.maxloanamount}</h1>
                      <p className="max-amount">Max. Amount</p>
                    </div>
                    <div className="card-info">
                      <div className="info-item">
                        {/* <span role="img" aria-label="clock">⏱️</span>{lender.description} */}
                        <span role="img" aria-label="clock">
                          <Image
                          src={clock}
                          width={15}
                          height={15}
                          />  
                        </span>{lender.description}
                      </div>
                      <div className="info-item">
                        {/* <span role="img" aria-label="interest">💰</span>{lender.interest} */}
                        <span role="img" aria-label="interest"></span>{lender.interest}
                      </div>
                    </div>
                    <div>
                      { console.log("In NewBLListPage lender cpi is :: ",lender.cpi)}
                      {
                       
                        lender.cpi===1?(
                          <>
                          {/* {console.log("Lender application link in newblist is : ",lender.applicationlink)} */}
                          <button className="card-button" onClick={()=>redirectLinkMethod(lender.product, lender.applicationlink, lender.product_id)} >Get Loan</button>
                          </>
                          
                        ):(
                          <button className="card-button" onClick={(e)=>getLoanBackendMethod(e,lender.product)}>Get Loan</button>
                        )
                      }
                    
                    </div>
                    
                  </div>
                ))
              }
            </div>
          </>
        ) : (
          <>
          {
            console.log("Inside when the companies are null")
          }
          {
            redirectFunction()
          }
          </>
          )
      }


    </div>
    
    </>
  );
};

export default NewRupeekListPage;