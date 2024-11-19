'use server'

import { Typography } from '@mui/material';
import GetLoanButton from './GetLoanButton';
// // import GetLoanButton from './GetLoanButton';
// import './CHEmbeddedList.css';

// import clock from "./newblimages/clock.png";
// import { Roboto } from '@next/font/google';
import clock from "../../components/NewBlJourneyD/newblimages/clock.png";
import Image from 'next/image';
import '../../components/NewBlJourneyD/NewBlListPage.css';
import {roboto} from "./fonts";
import OTPComponent from "../../components/EmbeddedJourneyList/OTPComponent";




const CHEmbeddedListCards = ({ json1, mobile }) => {

  return (
    <>
    {
      (json1=== null)?
      (<>
        {/* <OTPComponent mobile={mobile}/> */}
      </>)
      :
      (<>
      { <OTPComponent mobile={mobile}/>}
        <div className={`${roboto.className} allnewcard-container`} style={{marginTop:"10px"}}>
        {
          json1.lender_details.map((lender, index) => (
            <div key={index} className={`${lender.product_id} newcard-container`}>
              <div className="card-logo">
                <Image src={lender.logo} alt="Logo"
                  width={50}
                  height={50}
                  className="logo-image" style={{ width: 'auto' }}/> {/* Display image here */}
              </div>
              <div className="subcardheader">
                {/* <p className="card-subtitle">{lender.product}</p> */}
              </div>
              <div className="card-body">
                <h1 className="amount">INR {lender.maxloanamount}</h1>
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
              {/* <div>
                {
                  lender.cpi === 1 ? (
                    <button className="card-button" onClick={() => redirectLinkMethod(lender.product, lender.applicationLink)} >Get Loan</button>
                  ) : (
                    <button className="card-button" onClick={(e) => getLoanBackendMethod(e, lender.product)}>Get Loan</button>
                  )
                }

              </div> */}

              <div>
                 <GetLoanButton lender={lender} productId={lender.product_id} />
              </div>

            </div>
          ))
        }
      </div>
      </>)
    }
      
    </>
  )

}


//   return (
//     <div>

//       {console.log(json1)}

//       <div style={{ padding: '10px', paddingTop: '0px' }}>
//         {json1.lender_details.map((lender, index) => (
//           <div key={index} className={lender.product_id} >
//             <div className="card-container">
//               <div className="card-content">
//                 <div className="" style={{ width: '50%', float: 'left', margin: 'auto' }}>
//                   <div className="text-content" style={{ width: '50%', padding: '10px', margin: 'auto', marginLeft: '0px' }}>
//                     <img alt="logo" src={lender.logo} className="logo" style={{ display: 'flex', justifyContent: 'center', width: '100%', height: 'auto', maxWidth: '60px', minWidth: '0px' }} />

//                   </div>
//                 </div>
//                 <div className="text-content" style={{ width: '50%', float: 'right' }}>
//                   <Typography variant="h5" component="div" className="title" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
//                     {lender.product}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary" className="data" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
//                     {lender.description}
//                   </Typography>
//                 </div>
//               </div>
//               <div className="details">
//                 <div className="detail">
//                   <Typography variant="body2" color="textSecondary" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
//                     <span className="detail-label">{lender.maxloanamount}</span> <br />Max Amount
//                   </Typography>
//                 </div>
//                 <div className="detail">
//                   <Typography variant="body2" color="textSecondary" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
//                     <span className="detail-labels" >{lender.tenure}</span> <br />Tenure
//                   </Typography>
//                 </div>
//                 <div className="detail">
//                   <Typography variant="body2" color="textSecondary" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
//                     <span className="detail-labels" >{lender.interest}</span> <br />Interest
//                   </Typography>
//                 </div>
//               </div>
//               <div className="action-button">
//                 <GetLoanButton lender={lender} productId={lender.product_id} />
//               </div>

//             </div>
//           </div>
//         ))}
//       </div>

//       <style>
//         {`
//         .hide{
//           display: none;
//         }
//         .show{
//         display:block;
//         }
//       `}
//       </style>
//     </div>
//   )
// }

export default CHEmbeddedListCards

