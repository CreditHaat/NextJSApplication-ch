// import React from "react";

import { useEffect } from "react";
import {Roboto} from '@next/font/google';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});
// const SmartCoinErrorPopup = ({ setErrorPopup, lenderName , formData}) => {
//   const handleButtonClick = () => {
//     // window.location.href = link;
//     setErrorPopup(false);
//     // setErrorPopup2(true);
//     // window.location.href =
//     //   "https://app.credithaat.com/embedded_journey?mobileNumber=8010489800&sso=yes&ch_header=no";
//     // console.log(lenderName);
//     const url = `https://app.credithaat.com/embedded_journey?sso=yes&ch_header=no&mobilenumber=${formData.mobileNumber}`;
//       // Redirect to the constructed URL
//       window.location.href = url;

//     // $(`.${lender_id}`).css("display", "none");
//   };

//   return (
//     <>
//       <div
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundColor: "rgba(255, 255, 255, 0.7)", // Adjust opacity and color as needed
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           zIndex: 9999, // Ensure it's on top of other content
//         }}
//       >
//         <div
//           style={{
//             position: "relative",
//             backgroundColor: "white", // Optional: Background color for loader content
//             padding: "20px",
//             borderRadius: "5px",
//             boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", // Optional: Box shadow for loader content
//             animation: "fadeIn 1s ease-out",
//             textAlign: "center", // Center text
//             width: "95%"
//           }}
//         >
//           <div
//             style={{
//               width: "40px",
//               height: "40px",
//               borderRadius: "50%",
//               backgroundColor: "red",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               color: "white",
//               fontSize: "24px",
//               boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
//               animation: "bounceIn 0.5s ease-out",
//               margin: "0 auto", // Center the checkmark
//               marginBottom: "20px",
//             }}
//           >
//             X
//           </div>
//           Unfortunately, Olyv (SmartCoin) is unable to accept your application. Check other offers from other RBI approved lenders. <br />
//           <center>
//             <button
//               className="btn btn-primary"
//               style={{
//                 color: "white",
//                 backgroundColor: "#3e2780",
//                 marginTop: "20px",
//                 border: "none",
//               }}
//               onClick={handleButtonClick}
//             >
//               Check Offers
//             </button>
//           </center>
//         </div>
//         <style>
//           {`
//                 @keyframes fadeIn {
//                   from {
//                     opacity: 0;
//                     transform: scale(0.9);
//                   }
//                   to {
//                     opacity: 1;
//                     transform: scale(1);
//                   }
//                 }
      
//                 @keyframes bounceIn {
//                   0% {
//                     opacity: 0;
//                     transform: scale(0.3);
//                   }
//                   50% {
//                     opacity: 1;
//                     transform: scale(1.05);
//                   }
//                   70% {
//                     transform: scale(0.9);
//                   }
//                   100% {
//                     transform: scale(1);
//                   }
//                 }
//                   .hide{
//                     display:none;
//                   }
//               `}
//         </style>
//       </div>
//     </>
//   );
// };

// export default SmartCoinErrorPopup;


const SmartCoinErrorPopup = ({ setErrorPopup, lenderName , formData}) => {


  useEffect(()=>{
    setTimeout(()=>{
      setErrorPopup(false);
      const url = `https://app.credithaat.com/embedded_journey?sso=yes&ch_header=no&mobilenumber=${formData.mobileNumber}`;
//       // Redirect to the constructed URL
      window.location.href = url;
    },4000)
  },[])

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999, // Ensure it's on top of other content
        }}
      >
        {/* Loader Container */}
        <div
          style={{
            backgroundColor: "#ffffff", // White background
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)", // Soft box shadow
            textAlign: "center", // Center align text
            maxWidth: "300px", // Limit maximum width
            position: "relative", // Relative positioning for nested elements
          }}
        >
          {/* Loader Text */}
          <div className={`${roboto.className}`}>
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "1.5rem", margin: "0", color: "#3e2780" }}>
              {/* Verifying OTP */}
            </h2>
            <p style={{ fontSize: "1rem", margin: "10px 0", color: "#555" }}>
            Unfortunately, {lenderName} is unable to accept your application.<br />
            <h3> Wait ... </h3>

            </p>
          </div>
</div>
          {/* Horizontal Loader Bar */}
          <div
            style={{
              width: "100%",
              height: "8px",
              backgroundColor: "#f3f3f3", // Light gray background for loader bar
              borderRadius: "5px", // Rounded corners
              overflow: "hidden", // Hide overflow
            }}
          >
            <div
              style={{
                width: "50%", // Initial width for animation
                height: "100%",
                backgroundColor: "#3e2780", // Blue color for loader progress
                animation: "progress 2s ease-in-out infinite", // Animation for loader progress
              }}
            />
          </div>
        </div>

        {/* CSS Animation for Loader Progress */}
        <style>
          {`
          @keyframes progress {
            0% { width: 0; }
            100% { width: 100%; }
          }
        `}
        </style>
      </div>
    </>
  );
};

export default SmartCoinErrorPopup;

