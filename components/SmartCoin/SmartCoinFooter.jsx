// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
// const NewHomePageFooter = () => {
//   return (
//     <footer class="footer" style={{backgroundColor:"#3e2780", marginTop:'auto',paddingTop:"30px",paddingBottom:"30px"}}>

//     <div class="copy-right container">
//       <div class="row" >
 
//         <div class="col-sm" style={{color:"white"}}>All rights reserved
//         </div>
//         <div class="col-sm text-right">
//           <a href="/termsC" style={{color:"white" ,textDecoration:"none"}}>Terms of service</a>
//         </div>
//         <div class="col-sm text-right" >
//           <a href="/privacy" style={{color:"white",textDecoration:"none"}}>Privacy policy</a>
//         </div>
//         <div class="col-sm text-right" >
//           <a href="/ContactUs" style={{color:"white",textDecoration:"none"}}>Contact us</a>
//         </div>
//       </div>
//     </div>
//   </footer>



//   )
// }

// export default NewHomePageFooter;

// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';

// const NewHomePageFooter = () => {
//   return (
//     <footer 
//       className="footer" 
//       style={{
//         backgroundColor: "#3e2780", 
//         paddingTop: "30px", 
//         paddingBottom: "30px",
//         position: "absolute", // Ensures it stays at the bottom
//         bottom: 0,
//         width: "100%", // Full width of the page
//         color: "white"
//       }}
//     >
//       <div className="copy-right container" style={{ textAlign: "center" }}>
//         <div className="row" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
//           <div className="col-sm" style={{ color: "white", marginBottom: "10px" }}>
//             All rights reserved
//           </div>
//           <div className="col-sm text-right" style={{ marginBottom: "10px" }}>
//             <a href="/termsC" style={{ color: "white", textDecoration: "none" }}>Terms of service</a>
//           </div>
//           <div className="col-sm text-right" style={{ marginBottom: "10px" }}>
//             <a href="/privacy" style={{ color: "white", textDecoration: "none" }}>Privacy policy</a>
//           </div>
//           <div className="col-sm text-right" style={{ marginBottom: "10px" }}>
//             <a href="/ContactUs" style={{ color: "white", textDecoration: "none" }}>Contact us</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default NewHomePageFooter;

// "use client"


const NewHomePageFooter = () => {
  return (
    <>
      <div style={{zIndex: "-2" , backgroundColor:"#3e2780", padding:"25px" , bottom:"0px", marginTop: "60px", textAlign:"center"}}>
        <div className="copy-right container">
          <div className="row">
            <div className="col-sm" style={{ color: "white" }}>
              All rights reserved
            </div>
            <div className="col-sm text-right">
              <a href="https://www.credithaat.com/termsC" style={{ color: "white", textDecoration: "none" }}>
                Terms of service
              </a>
            </div>
            <div className="col-sm text-right">
              <a href="https://www.credithaat.com/privacy" style={{ color: "white", textDecoration: "none" }}>
                Privacy policy
              </a>
            </div>
            <div className="col-sm text-right">
              <a href="https://www.credithaat.com/ContactUs" style={{ color: "white", textDecoration: "none" }}>
                Contact us
              </a>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .footer {
          background-color: #3e2780;
          padding-top: 30px;
          padding-bottom: 30px;
          color: white;
          text-align: center;
          width: 100%;
          position: relative; /* Default for mobile */
          bottom: auto; /* Default for mobile */
          margin-top: 0; /* Default for mobile */
        }

        @media (min-width: 769px) {
          .footer {
            position: absolute; /* Apply only for desktop */
            bottom: 0; /* Apply only for desktop */
            margin-top: auto; /* Apply only for desktop */
          }
        }
      `}</style>
    </>
  );
};

export default NewHomePageFooter;


