// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { FaUser, FaPhone, FaBriefcase, FaDollarSign, FaIdCard, FaRupeeSign } from 'react-icons/fa'; // Importing icons for name, mobile number, profession, income, payment type, and PAN

// import './RupeekSecPage.css';
// import Image from "next/image";
// import Link from "next/link";
// import listimage1 from '../NewPlApplyD/newplimages/finalimage2.png';
// import listimage2 from '../NewPlApplyD/newplimages/finalimage3.png';
// import listimage3 from '../NewPlApplyD/newplimages/plimage33.png';
// import styles from './NewAllPages.module.css';
// //import styles from '../NewBlJourneyD/NewBlFirstFormPage.module.css';
// import EmblaCarousel from '../NewPlApplyD/Emblacarousel/js/EmblaCarousel';
// import { Roboto } from '@next/font/google';
// import axios from "axios";
// import IndiaGoldRejectPage from "../IndiaGold/RejectPage";
// import IndiaGoldSuccessPage from "../IndiaGold/IndiaGoldSuccessPage";

// // Import jewelry icons
// import banglesIcon from '../IndiaGold/NewJwellaryImages/bracelet.png';
// import mangalsutraIcon from "../IndiaGold/NewJwellaryImages/mangalsutra.png";
// import earringIcon from '../IndiaGold/NewJwellaryImages/earrings.png';
// import necklaceIcon from '../IndiaGold/NewJwellaryImages/necklace.png';
// import coinIcon from "../IndiaGold/NewJwellaryImages/game-coin.png";

// const roboto = Roboto({
//   weight: ['400', '700'],
//   subsets: ['latin'],
// });

// const OPTIONS = { direction: 'rtl', loop: true };
// const SLIDES = [
//   { imageUrl: listimage1 },
//   { imageUrl: listimage2 },
//   { imageUrl: listimage3 },
// ];

// const JWELLARY_TYPES = [
//   { value: 'bangles', label: 'Bangles', icon: banglesIcon },
//   { value: 'mangalsutra', label: 'MangalSutra', icon: mangalsutraIcon },
//   { value: 'earring', label: 'Earring', icon: earringIcon },
//   { value: 'necklace', label: 'Necklace', icon: necklaceIcon },
//   { value: 'coin', label: 'Coin', icon: coinIcon },
//   { value: 'other', label: 'Other', icon: null },
// ];

// // Custom Dropdown Component

// const CustomJwellaryDropdown = ({ value, onChange, options, error }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const selectedOption = options.find(opt => opt.value === value);

//   return (
//     <div className="relative w-full" ref={dropdownRef} >
//       <div
//         onClick={() => setIsOpen(!isOpen)}
//   className={`w-full p-3 border rounded-md bg-white cursor-pointer flex items-center justify-between ${styles.input}`}  style={{display:"flex", gap:"40%"}}     >
//         <div className="flex items-center gap-2"  style={{display:"flex"}}>
//           {selectedOption?.icon ? (
//             <div className="w-6 h-6 relative">
//               <Image
//                 src={selectedOption.icon}
//                 alt={selectedOption.label}
//                 height={20}
//                 width={20}
//                 className="object-contain"
//               />
//             </div>
//           ) : null}
//           <span>{selectedOption?.label || "Select jewellery type"}</span>
//         </div>
       
//       </div>

//       {isOpen && (
//         <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto" >
//           {options.map((option) => (
//             <div className="drpls"
//             style={{display:"flex", gap:"5%",fontSize:"18px", marginLeft:"3%"}}
//               key={option.value}
//               onClick={() => {
//                 onChange(option.value);
//                 setIsOpen(false);
//               }}

//             >
//                 {option.label}
              
//               <span>{option.icon && (
//                 <div className="w-6 h-6 relative" >
//                   <Image
//                     src={option.icon}
//                     alt={option.label}
//                     height={20}
//                     width={20}
//                     className="object-contain"
//                   />
//                 </div>
//               )}</span>
//             </div>
//           ))}
//         </div>
//       )}
      
//       {error && <p className={styles.error}>{error}</p>}
//     </div>
//   );
// };

// const RupeekSecPage = ({ formData, searchParams}) => {

//   const queryParams = Object.fromEntries(new URLSearchParams(searchParams));
//   const page = queryParams.page;
//   // const mobile = queryParams.mobilenumber;

//   const [rejectPage, setRejectPage] = useState(false);
//   const [successPage, setSuccessPage] = useState(false);

//   const [mobileNumber, setMobileNumber] = useState(); 

//   useEffect(()=>{
//     if( page == 2){
//       // console.log("Inside when the page is 2");
//       setMobileNumber(localStorage.getItem('mobileNumberForRejection'));
//       // console.log("The mobile in the local Storage is :: ",localStorage.getItem('mobileNumberForRejection'))
//     }else{
//       console.log("In else");
//     }
//   },[])
  
  

//   // State variables
//   const [loanType, setLoanType] = useState('');
//   const [desiredLoanAmount, setDesiredLoanAmount] = useState('');
//   const [jwellaryLocation, setJwellaryLocation] = useState('');
//   const [jwellaryType, setJwellaryType] = useState('');
//   const [errors, setErrors] = useState({});
//   const [showSuccess, setShowSuccess] = useState(false);
//   const formRef = useRef(null);
  

  

//   // Validation function
//   const validateForm = () => {
//     const newErrors = {};

//     if (!loanType) {
//       newErrors.loanType = "Please select a loan type";
//     }

//     if (!desiredLoanAmount) {
//       newErrors.desiredLoanAmount = "Please enter desired loan amount";
//     } else if (parseInt(desiredLoanAmount) < 10000) {
//       newErrors.desiredLoanAmount = "Loan amount must be greater than ₹10,000";
//     }

//     if (!jwellaryLocation) {
//       newErrors.jwellaryLocation = "Please select jewellery location";
//     }

//     if (!jwellaryType) {
//       newErrors.jwellaryType = "Please select jewellery type";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };


//    // Backend connection first page
//    const handleSecondPageSubmit = async (e) => {
//     e.preventDefault();
//     try {

//       const formData1 = new FormData();
//       // console.log("FormState mobile number in second page is : ",formState.mobileNumber);
//       if(page==2){
//         // console.log("Checking the mobile number when te page is 2 ", mobileNumber);
//         formData1.append('mobileNumber', mobileNumber);
//       }else{
//         // console.log("Checking the mobile number when the page is not 2");
//         formData1.append('mobileNumber', formData.mobileNumber);
//       }
      
//       // formData1.append('pinCode', formState.pinCode);
//       formData1.append('loanType', loanType);
//       formData1.append('desiredLoanAmount', desiredLoanAmount);
//       formData1.append('jwellaryLocation', jwellaryLocation);
//       formData1.append('jwellaryType', jwellaryType);

//       const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}rupeek_Sec_Page`, formData1);
//       if(response.data.code === 0) {
//         console.log("The response is 0");
//         setSuccessPage(true);
//         // setRejectPage(true);
//       }else if(response.data.code === -1)
//       {
//         setRejectPage(true);
//       }
//     } catch(error) {
//       console.log('Error:', error);
//     }
//   };


//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//     //   const submittedData = { ...formState };
//       handleSecondPageSubmit(e);
//     //   setFormData(submittedData);
//     //   setShowSuccess(true);
//     }
//   };

//   const handleLoanTypeChange = (value) => {
//     setLoanType(value);
//     setErrors(prev => ({ ...prev, loanType: "" }));
//   };
  
//   const handleDesiredLoanAmountChange = (value) => {
//     setDesiredLoanAmount(value);
//     setErrors(prev => ({ ...prev, desiredLoanAmount: "" }));
//   };
  
//   const handleJwellaryLocationChange = (value) => {
//     setJwellaryLocation(value);
//     setErrors(prev => ({ ...prev, jwellaryLocation: "" }));
//   };
  
//   // Update the existing handleSelectJwellaryType function
//   const handleSelectJwellaryType = (value) => {
//     setJwellaryType(value);
//     setErrors(prev => ({ ...prev, jwellaryType: "" }));
//   };



//   // if (showSuccess) {
//   //   return <LoanSuccessPage formData={{ ...formData, loanType, desiredLoanAmount, jwellaryLocation, jwellaryType }} />;
//   // }

//   return (
//     <>
//    {
//     successPage && console.log("After changing the value of successPage is :: ",successPage)
//    }
//       {successPage && 
      
//       <IndiaGoldSuccessPage/>}
//       {rejectPage && <IndiaGoldRejectPage/>}
//     {
//       !successPage && !rejectPage &&
   
//     <div className={`${roboto.className} page-container`}>
//       <div className="carousel-background">
//         <EmblaCarousel slides={SLIDES} options={OPTIONS} />
//       </div>
//       <div className="newfirstcard-container-rk" style={{ boxSizing: 'content-box' }}>
//         <form ref={formRef} onSubmit={handleSubmit} className={styles.form1}>
//           {/* Loan Type Radio Buttons */}
//           <div className={styles.formGroup}>
//   <label className={styles.label}>Select loan type</label>
//   <div className={styles.radioGroup}>
//     <label className={styles.radioLabel}>
//       <input
//         type="radio"
//         value="new"
//         checked={loanType === 'new'}
//         onChange={(e) => handleLoanTypeChange(e.target.value)}
//         className={styles.radioInput}
//       />
//       <span className={styles.radioText}>Get a new gold loan</span>
//     </label>
//     <label className={styles.radioLabel}>
//       <input
//         type="radio"
//         value="shift"
//         checked={loanType === 'shift'}
//         onChange={(e) => handleLoanTypeChange(e.target.value)}
//         className={styles.radioInput}
//       />
//       <span className={styles.radioText}>Shift your gold loan</span>
//     </label>
//   </div>


//             {errors.loanType && <p className={styles.error}>{errors.loanType}</p>}
//           </div>

//           <div className={styles.formGroup} style={{ position: 'relative' }}>
//   <input
//     type="number"
//     value={desiredLoanAmount}
//     onChange={(e) => handleDesiredLoanAmountChange(e.target.value)}
//     placeholder="Enter loan amount (min ₹10,000)"
//     className={`${styles.input} ${styles.withIcon}`} // Add a class to style the input with the symbol
//     min="10000"
//   />
//   <span
//     className={styles.icon}
//     style={{
//       position: 'absolute',
//       right: '15px', // Position the icon inside the input
//       top: '50%',
//       transform: 'translateY(-50%)',
//       color: '#00000061',
//       fontSize: '16px', // Adjust font size as needed
//     }}
//   >
//     <FaRupeeSign />
//   </span>
//   {errors.desiredLoanAmount && <p className={styles.error}>{errors.desiredLoanAmount}</p>}
// </div>
//           {/* jwellary Location Radio Buttons */}
//           <div className={styles.formGroup}>
//             <label className={styles.label}>Where is your jewellery?</label>
//             <div className={styles.radioGroup1}>
//               <label className={styles.radioLabel}>
//                 <input
//                   type="radio"
//                   value="home"
//                   checked={jwellaryLocation === 'home'}
//                 //   onChange={(e) => setJwellaryLocation(e.target.value)}
//                 onChange={(e) => handleJwellaryLocationChange(e.target.value)}
//                   className={styles.radioInput}
//                 />
//                 At home
//               </label>
//               <label className={styles.radioLabel}>
//                 <input
//                   type="radio"
//                   value="bank"
//                   checked={jwellaryLocation === 'bank'}
//                 //   onChange={(e) => setJwellaryLocation(e.target.value)}
//                 onChange={(e) => handleJwellaryLocationChange(e.target.value)}
//                   className={styles.radioInput}
//                 />
//                 Bank locker
//               </label>
//             </div>
//             {errors.jwellaryLocation && <p className={styles.error}>{errors.jwellaryLocation}</p>}
//           </div>
       
//           <div className={styles.formGroup}>
//             {/* <label className={styles.label}>Type of jewellery</label> */}
//             <CustomJwellaryDropdown
//               value={jwellaryType}
//               onChange={handleSelectJwellaryType}
//               options={JWELLARY_TYPES}
//               error={errors.jwellaryType}
//             />
//           </div>          
//           <div className={styles.stickyButton}>
//             <button type="submit" className={`${styles.button} ${styles.submitButton}`}>
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//      }
//     </>
//   );
// };

// export default RupeekSecPage;
"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  FaUser,
  FaPhone,
  FaBriefcase,
  FaDollarSign,
  FaIdCard,
  FaRupeeSign,
} from "react-icons/fa";
import "./RupeekSecPage.css";
import Image from "next/image";
import Link from "next/link";
import listimage1 from "../NewPlApplyD/newplimages/finalimage2.png";
import listimage2 from "../NewPlApplyD/newplimages/finalimage3.png";
import listimage3 from "../NewPlApplyD/newplimages/plimage33.png";
import styles from "./NewAllPages.module.css";
import EmblaCarousel from "../NewPlApplyD/Emblacarousel/js/EmblaCarousel";
import { Roboto } from "next/font/google";
import axios from "axios";
import RupeekRejectPage from "./RupeekRejectPage";
import RupeekSuccessPage from "./RupeekSuccessPage";

// Import jewelry icons
import banglesIcon from "../IndiaGold/NewJwellaryImages/bracelet.png";
import mangalsutraIcon from "../IndiaGold/NewJwellaryImages/mangalsutra.png";
import earringIcon from "../IndiaGold/NewJwellaryImages/earrings.png";
import necklaceIcon from "../IndiaGold/NewJwellaryImages/necklace.png";
import coinIcon from "../IndiaGold/NewJwellaryImages/game-coin.png";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const OPTIONS = { direction: "rtl", loop: true };
const SLIDES = [
  { imageUrl: listimage1 },
  { imageUrl: listimage2 },
  { imageUrl: listimage3 },
];
const JWELLARY_TYPES = [
  { value: "bangles", label: "Bangles", icon: banglesIcon },
  { value: "mangalsutra", label: "Mangalsutra", icon: mangalsutraIcon },
  { value: "earring", label: "Earring", icon: earringIcon },
  { value: "necklace", label: "Necklace", icon: necklaceIcon },
  { value: "coin", label: "Coin", icon: coinIcon },
  { value: "other", label: "Other", icon: null },
];

const CustomJwellaryDropdown = ({ value, onChange, options, error, autoFocus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (autoFocus) {
      setIsOpen(true);
    }
  }, [autoFocus]);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-3 border rounded-md bg-white cursor-pointer flex items-center justify-between ${styles.input}`}
      >
        <div className="flex items-center gap-2" style={{display:"flex"}}>
          {selectedOption?.icon && (
            <div className="w-6 h-6 relative">
              <Image
                src={selectedOption.icon}
                alt={selectedOption.label}
                height={20}
                width={20}
                className="object-contain"
              />
            </div>
          )}
          <span>{selectedOption?.label || "Select jewellery type"}</span>
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              <span style={{display:"flex", gap:"15px"}}>{option.label}
              <span>{option.icon && (
                <div className="w-6 h-6 relative" >
                  <Image
                    src={option.icon}
                    alt={option.label}
                    height={20}
                    width={20}
                    className="object-contain"
                  />
                </div>
               )}</span>
              </span>
            </div>
          ))}
        </div>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

const RupeekSecPage = ({ formData, searchParams }) => {
  // const queryParams = Object.fromEntries(new URLSearchParams(searchParams));
  const queryParams = searchParams ?? {};
  const page = queryParams.page;

  const [rejectPage, setRejectPage] = useState(false);
  const [successPage, setSuccessPage] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [autoFocusDropdown, setAutoFocusDropdown] = useState(false);

  useEffect(() => {
    if (page == 2) {
      setMobileNumber(localStorage.getItem("mobileNumberForRejection"));
    }
  }, [page]);

  const [loanType, setLoanType] = useState("");
  const [desiredLoanAmount, setDesiredLoanAmount] = useState("");
  const [jwellaryLocation, setJwellaryLocation] = useState("");
  const [jwellaryType, setJwellaryType] = useState("");
  const [errors, setErrors] = useState({});
  const loanAmountRef = useRef(null);

  const handleLoanTypeChange = (value) => {
    setLoanType(value);
    setErrors((prev) => ({ ...prev, loanType: "" }));
    setTimeout(() => loanAmountRef.current?.focus(), 100);
  };

  const handleDesiredLoanAmountChange = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setDesiredLoanAmount(numericValue);
    setErrors((prev) => ({ ...prev, desiredLoanAmount: "" }));

    if (numericValue && parseInt(numericValue) < 10000) {
      setErrors((prev) => ({
        ...prev,
        desiredLoanAmount: "Loan amount must be greater than ₹10,000",
      }));
    }
  };

  const handleJwellaryLocationChange = (value) => {
    setJwellaryLocation(value);
    setErrors((prev) => ({ ...prev, jwellaryLocation: "" }));
    setAutoFocusDropdown(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!loanType) {
      validationErrors.loanType = "Please select a loan type";
    }

    if (!desiredLoanAmount) {
      validationErrors.desiredLoanAmount = "Please enter desired loan amount";
    } else if (parseInt(desiredLoanAmount) < 10000) {
      validationErrors.desiredLoanAmount = "Loan amount must be greater than ₹10,000";
    }

    if (!jwellaryLocation) {
      validationErrors.jwellaryLocation = "Please select jewellery location";
    }

    if (!jwellaryType) {
      validationErrors.jwellaryType = "Please select jewellery type";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const formData1 = new FormData();
        formData1.append("mobileNumber", page == 2 ? mobileNumber : formData.mobileNumber);
        formData1.append("loanType", loanType);
        formData1.append("desiredLoanAmount", desiredLoanAmount);
        formData1.append("jwellaryLocation", jwellaryLocation);
        formData1.append("jwellaryType", jwellaryType);

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}rupeek_Sec_Page`,
          formData1
        );

        if (response.data.code === 0) {
          setSuccessPage(true);
        } else if (response.data.code === -1) {
          setRejectPage(true);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      {successPage && <RupeekSuccessPage />}
      {rejectPage && <RupeekRejectPage />}
      {!successPage && !rejectPage && (
        <div className={`${roboto.className} page-container`}>
          <div className="carousel-background">
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
          </div>
          <div
            className="newfirstcard-container-rk"
            style={{ boxSizing: "content-box" }}
          >
            <form onSubmit={handleSubmit} className={styles.form1}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Select loan type</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      value="new"
                      checked={loanType === "new"}
                      onChange={(e) => handleLoanTypeChange(e.target.value)}
                      className={styles.radioInput}
                    />
                    <span className={styles.radioText}>Get a new gold loan</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      value="shift"
                      checked={loanType === "shift"}
                      onChange={(e) => handleLoanTypeChange(e.target.value)}
                      className={styles.radioInput}
                    />
                    <span className={styles.radioText}>Shift your gold loan</span>
                  </label>
                </div>
                {errors.loanType && <p className={styles.error}>{errors.loanType}</p>}
              </div>

              <div className={styles.formGroup} style={{ position: "relative" }}>
                <input
                  ref={loanAmountRef}
                  type="number"
                  value={desiredLoanAmount}
                  onChange={(e) => handleDesiredLoanAmountChange(e.target.value)}
                  placeholder="Enter loan amount (min ₹10,000)"
                  className={`${styles.input} ${styles.withIcon}`}
                  min="10000"
                />
                <span
                  className={styles.icon}
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#00000061",
                    fontSize: "16px",
                  }}
                >
                  <FaRupeeSign />
                </span>
                {errors.desiredLoanAmount && (
                  <p className={styles.error}>{errors.desiredLoanAmount}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Where is your jewellery?</label>
                <div className={styles.radioGroup1}>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      value="home"
                      checked={jwellaryLocation === "home"}
                      onChange={(e) => handleJwellaryLocationChange(e.target.value)}
                      className={styles.radioInput}
                    />
                    At home
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      value="bank"
                      checked={jwellaryLocation === "bank"}
                      onChange={(e) => handleJwellaryLocationChange(e.target.value)}
                      className={styles.radioInput}
                    />
                    Bank locker
                  </label>
                </div>
                {errors.jwellaryLocation && (
                  <p className={styles.error}>{errors.jwellaryLocation}</p>
                )}
              </div>

              <div className={styles.formGroup}>
                <CustomJwellaryDropdown
                  value={jwellaryType}
                  onChange={setJwellaryType}
                  options={JWELLARY_TYPES}
                  error={errors.jwellaryType}
                  autoFocus={autoFocusDropdown}
                />
              </div>

              <div className={styles.stickyButton}>
                <button
                  type="submit"
                  className={`${styles.button} ${styles.submitButton}`}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RupeekSecPage;
