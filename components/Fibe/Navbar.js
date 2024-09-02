// // import React, {useState} from "react";
// // import { NavLink } from "react-router-dom";
// import Link from "next/link";
// import "./Navbar.css";
// import {
//   HamburgetMenuClose,
//   HamburgetMenuOpen,
// } from "../NewPersonalLoan/Other Components/Icon";
// import i from "../NewPersonalLoan/NewPersonalLoanImages/logo1-removebg-preview.png";
// // import i from "../NewPersonalLoan/NewPersonalLoanImages"
// import Image from "next/image";

// function Navbar() {
//   // const [click, setClick] = useState(false);

//   // const handleClick = () => setClick(!click);
//   return (
//     <>
//       <nav className="navbar">
//         <div className="nav-container">
//           <h4>CreditHaat</h4>
//           {/* <img className="nav-logo.icon" src={i} alt="logo_pic" height={'40px'} width={'40px'} style={{marginLeft:'0px'}}/> */}
//           <Image
//             src={i}
//             className="nav-logo.ion"
//             width={40}
//             height={40}
//             style={{ marginLeft: "0px" }}
//             alt="logo"
//           />
//           {/* <NavLink  className="nav-logo">

//           </NavLink> */}
//           <Link href="#" className="nav-logo"></Link>

//           {/* <ul className={click ? "nav-menu active" : "nav-menu"}>
//             <li className="nav-item">
//               <NavLink
//                 exact
//                 to="/personal"
//                 activeClassName="active"
//                 className="nav-links"
//                 onClick={handleClick} style={{color:'black'}}
//               >
//                 Personal Loan
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 exact
//                  to="/business"
//                 activeClassName="active"
//                 className="nav-links"
//                 onClick={handleClick}  style={{color:'black'}}
//               >
//                 Business Loan
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 exact
//                 to="/credit"
//                 activeClassName="active"
//                 className="nav-links"
//                 onClick={handleClick}  style={{color:'black'}}
//               >
//               Credit Card
//               </NavLink>
//             </li>

//           </ul> */}
//           {/* <div className="nav-icon" onClick={handleClick}>

//             {click ? (
//               <span className="icon"> */}
//           {/* <HamburgetMenuClose />{" "} */}
//           {/* </span>
//             ) : (
//               <span className="icon">
//                 <HamburgetMenuOpen /> */}
//           {/* </span>
//             )}
//           </div> */}
//         </div>
//       </nav>
//     </>
//   );
// }

// export default Navbar;

import React from "react";
import "./Navbar.css"; // Import your CSS file for styling
import i from "./SmartCoin_Images/ch-logo.png";
// import f from "./SmartCoin_Images/Formerly_BlackBG.png";
import f from "./SmartCoin_Images/eslogo.png"
import Image from "next/image";

function PartnerNavbar() {
  return (
    <nav className="partner-navbar">
      <div className="partner-navbar-container">
        {/* Logo 1 */}
        <div className="partner-logo">
          <Image
            // style={{ marginRight: "-10px" }}
            className="nav-logo"
            width={65}
            height={65}
            src={f}
            alt="Logo 1"
          />
        </div>
        {/* Logo 2 */}
        <div className="partner-logo">
          <Image
            className="nav-logo"
            width={65}
            height={65}
            src={i}
            alt="Logo 2"
          />
        </div>
      </div>
    </nav>
  );
}

export default PartnerNavbar;
