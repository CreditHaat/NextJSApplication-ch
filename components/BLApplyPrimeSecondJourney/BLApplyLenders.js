// "use client";

// import React, { useState, useEffect } from 'react';
// import Confetti from 'react-confetti';
// import './BLApplyLenders.css'; // Ensure this file is correctly imported and styled
// import adityabirlaimage from './BLApplyImages/adityabirlaimage.png';
// import Image from 'next/image';
// import Typography from '@mui/material/Typography'; // Assuming you are using MUI for Typography
// // import GetLoanButton from './GetLoanButton'; // Adjust the import path as needed

// export default function BLApplyLenders({ companies = [] }) { // Default to empty array
//   const [showConfetti, setShowConfetti] = useState(true);
//   const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

//   useEffect(() => {
//     // Update dimensions on window resize
//     const handleResize = () => {
//       setDimensions({ width: window.innerWidth, height: window.innerHeight });
//     };

//     // Add event listener
//     window.addEventListener('resize', handleResize);

//     // Cleanup event listener on unmount
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     // Automatically hide confetti after 2 seconds
//     const timeout = setTimeout(() => {
//       setShowConfetti(false);
//     }, 2000);

//     // Cleanup timeout on unmount
//     return () => clearTimeout(timeout);
//   }, []);

//   // Handle undefined or null companies prop
//   if (!Array.isArray(companies) || companies.length === 0) {
//     return (
//       <div className='newallfirst'>
//         <div className='firstoneimage'>
//           <Image 
//             src={adityabirlaimage} 
//             alt='Lender image'
//             width={100}
//             height={100}
//           />
//           <p>RupeeReddy</p>
//         </div>
//         <div className="details">
//                 <div className="detail">
//                   <Typography variant="body2" color="textSecondary" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
//                      <br />Max Amount
//                   </Typography>
//                 </div>
//                 <div className="detail">
//                   <Typography variant="body2" color="textSecondary" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
//                     <br />Tenure
//                   </Typography>
//                 </div>
//                 <div className="detail">
//                   <Typography variant="body2" color="textSecondary" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
//                     <br />Interest
//                   </Typography>
//                 </div>
//               </div>
//               <div className="action-button">
//               <button type="submit" style={{color:"#3e2780"}}>Apply</button>
//               </div>
//         {/* Render celebratory confetti */}
//         {showConfetti && (
//           <Confetti
//             width={dimensions.width}
//             height={dimensions.height}
//             numberOfPieces={100}
//             recycle={false}
//             gravity={0.2}
//           />
//         )}
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: '10px', paddingTop: '0px' }}>
//       {companies.map((lender, index) => (
//         <div key={index} className={lender.product_id} >
//           <div className="card-container">
//             <div className="card-content">
//               <div style={{ width: '50%', float: 'left', margin: 'auto' }}>
//                 <div className="text-content" style={{ width: '50%', padding: '10px', margin: 'auto', marginLeft: '0px' }}>
//                   <img alt="logo" src={lender.logo} className="logo" style={{ display: 'flex', justifyContent: 'center', width: '100%', height: 'auto', maxWidth: '60px', minWidth: '0px' }} />
//                 </div>
//               </div>
//               <div className="text-content" style={{ width: '50%', float: 'right' }}>
//                 <Typography variant="h5" component="div" className="title" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
//                   {lender.product}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary" className="data" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
//                   {lender.description}
//                 </Typography>
//               </div>
//             </div>
//             <div className="details">
//               <div className="detail">
//                 <Typography variant="body2" color="textSecondary" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
//                   <span className="detail-label">{lender.maxloanamount}</span> <br />Max Amount
//                 </Typography>
//               </div>
//               <div className="detail">
//                 <Typography variant="body2" color="textSecondary" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
//                   <span className="detail-labels">{lender.tenure}</span> <br />Tenure
//                 </Typography>
//               </div>
//               <div className="detail">
//                 <Typography variant="body2" color="textSecondary" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
//                   <span className="detail-labels">{lender.interest}</span> <br />Interest
//                 </Typography>
//               </div>
//             </div>
//             <div className="action-button">
//               <GetLoanButton lender={lender} />
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* Render celebratory confetti */}
//       {showConfetti && (
//         <Confetti
//           width={dimensions.width}
//           height={dimensions.height}
//           numberOfPieces={100}
//           recycle={false}
//           gravity={0.2}
//         />
//       )}
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import './BLApplyLenders.css'; // Importing the CSS file
import axios from 'axios';
import ApplicationLoader from './ApplicationLoader';
import ApplicationPopup from './ApplicationPopup';
import ErrorPopup from './ErrorPopup';

const BLApplyLenders = ({companies, onGetLoan, lenderProduct, setLenderProduct, formData , getLoanBackendMethod, redirectLinkMethod}) => {
  
  const [showConfetti, setShowConfetti] = useState(false);

    // --------------------------Usestates for backend -----------------------------------------------------------------
    const [link, setLink] = useState('www.google.com');
    // const [isLoading, setIsLoading] = useState(false);
    const [lenderName, setlenderName] = useState(null);
    const [isCameFromBackend, setIsCameFromBackend] = useState(false);
    const [errorPopup, setErrorPopup] = useState(false);

    const [aplicationLink, setApplicationLink] = useState(null);
    const [cpi, setCpi] = useState('0');


     // ......................................steps count code---------------------------------------

 const handleDataLayerStage = (stage) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({'stage': stage});
};



  
  return(
    <>

    <h2 style={{color:"#3e2780", textAlign:"center", marginTop:"25px", fontFamily:'sans-serif'}}>Please select a lender to continue</h2>

    {
      (companies)?(
        <>
        <div>
          <div style={{ padding: '10px', paddingTop: '0px' }}>
        {companies.lender_details.map((lender, index) => (
          <div key={index} className={lender.product_id} >
            <div className="card-container" style={{fontFamily:'sans-serif'}}>
              {/* "Open sans, Sans-serif" */}
              <div className="card-content">
                <div className="" style={{ width: '50%', float: 'left', margin: 'auto' }}>
                  <div className="text-content" style={{ width: '50%', padding: '10px', margin: 'auto', marginLeft: '0px' }}>
                    <img alt="logo" src={lender.logo} className="logo" style={{ display: 'flex', justifyContent: 'center', width: '100%', height: 'auto', maxWidth: '60px', minWidth: '0px' }} />

                  </div>
                </div>
                <div className="text-content" style={{ width: '50%', float: 'right' }}>
                  <Typography style={{fontFamily:'sans-serif'}} variant="h5" component="div" className="title" >
                    {lender.product}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" className="data" >
                    {lender.description}
                  </Typography>
                </div>
              </div>
              <div className="details">
                <div className="detail">
                  <Typography variant="body2" color="textSecondary" >
                    <span className="detail-label">{lender.maxloanamount}</span> <br />Max Amount
                  </Typography>
                </div>
                <div className="detail">
                  <Typography variant="body2" color="textSecondary" >
                    <span className="detail-labels" >{lender.tenure}</span> <br />Tenure
                  </Typography>
                </div>
                <div className="detail">
                  <Typography variant="body2" color="textSecondary" >
                    <span className="detail-labels" >{lender.interest}</span> <br />Interest
                  </Typography>
                </div>
              </div>
              <div className="action-button">
                 {/* Select */}
                 {lender.cpi === 1 ? (
                                        
                                        // <button style={{backgroundColor: "#fdc638", color:"#3e2780"}} onClick={() => window.location.href = company.applicationlink}
                                        <button style={{backgroundColor: "#fdc638", color:"#3e2780",border:"none"}} onClick={()=>redirectLinkMethod(lender.product,lender.applicationlink)}
                                            size="small"
                                            variant="contained"
                                            className="congraths-button"
                                        >
                                            Select
                                            {/* Submit Application */}
                                        </button>
                                    ) : (

                                        // <button onClick={(e) => getLoanBackend(e, company.product)}
                                        <button style={{backgroundColor: "#fdc638", color:"#3e2780",border:"none"}} onClick={(e) => getLoanBackendMethod(e, lender.product)}
                                            size="small"
                                            variant="contained"
                                            className="congraths-button"
                                        >
                                            Select
                                            {/* Submit Application */}
                                        </button>
                                    )}
              </div>

            </div>
          </div>
        ))}
      </div>

      <style>
        {`
        .hide{
          display: none;
        }
        .show{
        display:block;
        }
      `}
      </style>
      <style>
        {
          `
          /* LendersList.css */

/* .banner {
    padding-top: 4%;
    padding-bottom: 4%;
  } */
  
  .banner_title {
    color: #3E2780;
  }
  
  .primary-color {
    color: #3E2780;
  }
  
  .card-container {
    border-radius: 20px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 2px solid #3e2780;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  }
  
  .card-content {
    display: flex;
    padding: 0px;
    padding-left: 10px;
    padding-right: 10px;
  }
  
  .logo {
    height: 80px;
    width: auto;
    object-fit: cover;
    border-radius: 10px;
    margin-right: 20px;
  }
  
  .text-content {
    margin-top: 10px;
  }
  
  .title {
    font-family: 'Noto Serif';
    font-weight: bold;
    color: #3e2780;
  }
  
  .descriptions {
    font-family: 'Noto Serif';
    font-size: 15px;
    color: green;
  }
  
  .details {
    margin-top: 10px;
    display: flex;
  }
  
  .detail {
    margin-right: 30px;
    margin-left: 20px;
  }
  
  .detail-label {
    color: red;
    font-weight: bold;
    align-items: baseline;
    margin-right: '50%';
  }
  .detail-labels{
    font-weight: bold;
  }
  
  .action-button {
    display: flex;
    justify-content: center;
    padding: 0 20px 20px 20px;
    /* height: 40px; */
    margin-top: 10px;
    
    
  }
  
  .MuiButton-root{
    background-color: #3E2780;
  }
  
  .getLoanButton{
    background-color: #3E2780;
    color: white;
    border-radius: 5px;
    height: 50px;
    width: 100px;
  }
  .data{
    color:green;
  }
  
  
  /* Media Query for Desktop */
  @media screen and (min-width: 768px) {
    /* .banner {
      padding-top: 6%;
      padding-bottom: 6%;
    } */
  
    .card-container {
      max-width: 1000px;
      margin-top: 20px;
      margin-bottom: 20px;
      
    }
  
    .card-content {
      /* padding: 30px; */
      padding-left: 70px;
    }
    .details{
      padding-left: 70px;
    }
  
    .title {
      font-size: 24px;
    }
  
    .descriptions {
      font-size: 18px;
    }
  
    .detail-label {
      font-size: 16px;
    }
  
    .action-button {
      height: auto;
      padding-left: 40%;
    }
    .maind{
      margin-right: 40px;
    }
  }
  
          `
        }
      </style>
    </div>
        </>
      ):(
        <div>
          No lenders Available
          </div>
      )
      
    } 
    </>
  );
};

export default BLApplyLenders;
