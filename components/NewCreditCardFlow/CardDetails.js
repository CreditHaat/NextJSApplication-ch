// "use client";
// import React, { useState } from "react";
// import "../../components/NewCreditCardFlow/CardDetails.css";
// import { IoChevronBack } from "react-icons/io5";
// import { Poppins } from "next/font/google";
// import EligibleCards from "../../components/NewCreditCardFlow/EligibleCards";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
// });

// // function CardDetails({ card })
// function CardDetails({ card, params, searchParams }) {
//   const [activeContainer, setActiveContainer] = useState("CardDetails");
//   //    const card = {
//   //   cardName: "HDFC Regalia Credit Card",
//   //   match: 95,
//   //   cardImage: "/SBI_CC.jpeg",
//   //   orientation: "vertical",

//   //   benefits: [
//   // "Reward Points on every spend",
//   // "Complimentary Airport Lounge Access",
//   // "Fuel Surcharge Waiver",
//   // "Dining & Lifestyle Benefits"
//   //   ]
//   // };

//   //    const card = {
//   //   cardName: "Axis Bank Credit Card",
//   //   match: 95,
//   //   cardImage: "/Axis_Bank_CC.png",
//   //   orientation: "horizontal",

//   //   benefits: [
//   //     "Reward Points on every spend",
//   //     "Complimentary Airport Lounge Access",
//   //     "Fuel Surcharge Waiver",
//   //     "Dining & Lifestyle Benefits"
//   //   ]
//   // };

//   const handleBack = () => {
//     setActiveContainer("EligibleCards");
//   };

//   if (activeContainer === "EligibleCards") {
//     return <EligibleCards setActiveContainer={setActiveContainer} />;
//   }
//   return (
//     <div className={`${poppins.className} detailsContainer`}>
//       <div className="Card5">
//         <div className="topBar">
//           {/* <button className="backBtn">
//           ←
//         </button> */}

//           <div className="backButton2" onClick={handleBack}>
//             <IoChevronBack />
//           </div>
//         </div>

//         <div
//           className={`cardImageWrapper ${
//             card.orientation === "vertical" ? "vertical" : "horizontal"
//           }`}
//         >
//           <img src={card.cardImage} alt={card.cardName} className="cardImage" />
//         </div>

//         <div className="cardInfo">
//           <div className="nameSection">
//             <h2>{card.cardName}</h2>

//             <span className="matchBadge">{card.match}% Match</span>
//           </div>

//           <div className="bestMatch">⭐ Best Match for You</div>
//         </div>

//         <div className="benefitsBox">
//           <h3>Key Benefits</h3>

//           {(card.benefits || []).map((item, index) => (
//             <div key={index} className="benefitRow">
//               <span className="benefitIcon">⭐</span>

//               <span>{item}</span>
//             </div>
//           ))}
//         </div>

//         <div className="buttonSection">
//           <button className="applyBtn">Apply Now</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CardDetails;
"use client";

import React from "react";
import "../../components/NewCreditCardFlow/CardDetails.css";
import { IoChevronBack } from "react-icons/io5";
import { Poppins } from "next/font/google";
import axios from "axios";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


function CardDetails({ card, setActiveContainer, mobileno }) {

  const handleBack = () => {
    setActiveContainer("EligibleCards");
  };

  if (!card) {
    return null;
  }

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  const handleApplyNow = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}creditcard_redirect`,
        {
          mobilenumber: mobileno,
          productName: card.productName,
          partnerId: card.partnerIds,
          redirecturl: card.applink,
        },
        {
          headers: {
            token: "Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.code === 200) {
        window.location.href = card.applink;
      } else {
        alert("Unable to proceed");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={`${poppins.className} detailsContainer`}>
      <div className="Card5">
          <div className="backButton2" onClick={handleBack}>
            <IoChevronBack />
          </div>
          <div className="topBar">
        </div>

        <div
          className={`cardImageWrapper ${
            card.orientation === "vertical" ? "vertical" : "horizontal"
          }`}
        >
          {/* <img src={card.cardImage} alt={card.cardName} className="cardImage" /> */}
          <Image
            src={card.cardImage}
            alt={card.cardName}
            width={0}
            height={0}
            sizes="100vw"
            className="cardImage"  
          />
        </div>

        <div className="cardInfo">
          <div className="nameSection">
            <h2>{card.cardName}</h2>

            <span className="matchBadge">{card.match}% Match</span>
          </div>

          <div className="bestMatch">⭐{card.card_subscribe}</div>
        </div>

        <div className="benefitsBox">
          <h3>Key Benefits</h3>

          {[card.pointone, card.pointtwo, card.pointthree, card.pointfour]
            .filter(Boolean)
            .map((item, index) => (
              <div key={index} className="benefitRow">
                <span className="benefitIcon">⭐</span>

                <span>{item}</span>
              </div>
            ))}
        </div>

        <div className="buttonSection" onClick={handleApplyNow}>
          <button className="applyBtn">Apply Now</button>
        </div>
      </div>
    </div>
  );
}

export default CardDetails;
