// import React, {useState} from "react";
// import { NavLink } from "react-router-dom";
// import "./EmbeddedListNavbar.css";
// // import { HamburgetMenuClose, HamburgetMenuOpen } from "./Icon";
// import i from '../NewPersonalLoan/NewPersonalLoanImages/chlogo.jpg';

// function EmbeddedListNavbar() {
//   const [click, setClick] = useState(false);

//   const handleClick = () => setClick(!click);
//   return (
//     <>
//       <nav className="navbar">
//         <div className="nav-container">
//         {/* <h4>CreditHaat</h4> */}
//         <img className="nav-logo.icon" src={i} alt="logo_pic" height={'60px'} width={'60px'} style={{marginLeft:'0px', marginTop:'10px'}}/>
//           <NavLink  className="nav-logo">
              
//           </NavLink>

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
//                 {/* <HamburgetMenuClose />{" "} */}
//               {/* </span>
//             ) : (
//               <span className="icon">
//                 <HamburgetMenuOpen /> */}
//               {/* </span>
//             )}
//           </div> */}
//         </div>
//       </nav>
//     </>
//   );
// }

// export default EmbeddedListNavbar;

// import i from '../NewPersonalLoan/NewPersonalLoanImages/chlogo.png';
import i from '../NewPersonalLoan/NewPersonalLoanImages/chlogo.png';
import Image from 'next/image'

function EmbeddedListNavbar(){
    return(
        <>
            <div style={{display:"flex", justifyContent:'center'}}>
            {/* <img src={i} alt="logo_pic" height={'60px'} width={'60px'} style={{ marginTop:'10px'}}/> */}
            <Image
            src={i}
            width={60}
            height={60}
            style={{marginTop:'10px'}}
            alt="logo_pic"/>
            </div>
        </>
    )
}

export default EmbeddedListNavbar;