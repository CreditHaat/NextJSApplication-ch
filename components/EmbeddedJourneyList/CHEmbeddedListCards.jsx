'use server';

import { Typography } from '@mui/material';
import GetLoanButton from './GetLoanButton';
import clock from "../../components/NewBlJourneyD/newblimages/clock.png";
import Image from 'next/image';
import '../../components/NewBlJourneyD/NewBlListPage.css';
import { roboto } from "./fonts";
import OTPComponent from "../../components/EmbeddedJourneyList/OTPComponent";
import DownloadKFSComponent from "./DownloadKFSComponent";

import { getEMIAmount, getROI, getTenure } from "./generatekfsfunction";

const CHEmbeddedListCards = async ({ json1, mobile }) => {

  if (json1 === null) {
    return <div>No Data To Display</div>;
  }

  // Pre-load all lender async values
  const lendersWithKFS = await Promise.all(
    json1.lender_details.map(async (lender) => {

      let tenure = "";
      let emi = "";
      let roi = "";

      if (lender.product_id === 519) {
        tenure = await getTenure(lender.product_id, mobile);
        emi = await getEMIAmount(lender.product_id, mobile);
        roi = await getROI(lender.product_id, mobile);
      } else {
        roi = lender.interest;
      }

      return { ...lender, tenure, emi, roi };
    })
  );

  return (
    <>
      <OTPComponent mobile={mobile} />

      <div className={`${roboto.className} allnewcard-container`} style={{ marginTop: "10px" }}>

        {/* Active lenders */}
        {lendersWithKFS.map((lender, index) => (
          <div key={index} className={`${lender.product_id} newcard-container`}>

            <div className="card-logo">
              <Image
                src={lender.logo}
                alt="Logo"
                width={50}
                height={50}
                className="logo-image"
                style={{ width: 'auto' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <span className="card-body">
                <h1 className="amount2">{lender.maxloanamount}</h1>
                <p className="max-amount2">Max. Amount</p>
              </span>

              <span className="card-body">
                <h1 className="amount2">{lender.tenure}</h1>
                <p className="max-amount2">Tenure</p>
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
              <span className="card-body">
                <h1 className="amount2">{lender.emi}</h1>
                <p className="max-amount2">Installment Amount</p>
              </span>

              <span className="card-body">
                <h1 className="amount2">{lender.roi}</h1>
                <p className="max-amount2">Rate Of Interest</p>
              </span>
            </div>

            {/* <div className="card-info">
              <div className="info-item">
                <span role="img" aria-label="clock">
                  <Image src={clock} width={15} height={15} />
                </span>
                {lender.description}
              </div>

              <div className="info-item">
                {lender.interest}
              </div>
            </div> */}

            <div style={{ marginBottom: '20px' }}>
              <DownloadKFSComponent productId={lender.product_id} mobileNumber={mobile} />
            </div>

            <GetLoanButton lender={lender} productId={lender.product_id} />


          </div>
        ))}

        {/* Unmatched Lender label */}

        <div style={{
          display: "flex",
          justifyContent: "center",
          margin: "15px 0"
        }}>
          <div style={{
            border: "1px solid #6039D2",
            color: "#6039D2",
            padding: "6px 18px",
            borderRadius: "30px",
            fontSize: "14px",
            fontWeight: "500",
            background: "white"
          }}>
            Unmatched Lender
          </div>
        </div>


        {/* Greyed out lenders */}
        {json1.lender_details_greyedout.map((lender, index) => (
          // <div key={index} className={`${lender.product_id} newcard-container-grayedout`}>

          //   <div className="card-logo">
          //     <Image
          //       src={lender.logo}
          //       alt="Logo"
          //       width={50}
          //       height={50}
          //       className="logo-image"
          //       style={{ width: 'auto' }}
          //     />
          //   </div>

          //   <div className="card-body">
          //     <h1 className="amount">INR {lender.maxloanamount}</h1>
          //     <p className="max-amount">Max. Amount</p>
          //   </div>

          //   <div className="card-info">
          //     <div className="info-item">
          //       <span role="img" aria-label="clock">
          //         <Image src={clock} width={15} height={15} />
          //       </span>
          //       {lender.description}
          //     </div>

          //     <div className="info-item">
          //       {lender.interest}
          //     </div>
          //   </div>

          // </div>
          <div key={index} className={`${lender.product_id} newcard-container-grayedout`}>

            <div className="card-logo">
              <Image
                src={lender.logo}
                alt="Logo"
                width={50}
                height={50}
                className="logo-image"
                style={{ width: 'auto' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <span className="card-body">
                <h1 className="amount2">{lender.maxloanamount}</h1>
                <p className="max-amount2">Max. Amount</p>
              </span>

              <span className="card-body">
                <h1 className="amount2">{lender.tenure}</h1>
                <p className="max-amount2">Tenure</p>
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
              <span className="card-body">
                <h1 className="amount2">{lender.emi}</h1>
                <p className="max-amount2">Installment Amount</p>
              </span>

              <span className="card-body">
                <h1 className="amount2">{lender.roi}</h1>
                <p className="max-amount2">Rate Of Interest</p>
              </span>
            </div>
            
          </div>
        ))}
      </div>
    </>
  );
};

export default CHEmbeddedListCards;