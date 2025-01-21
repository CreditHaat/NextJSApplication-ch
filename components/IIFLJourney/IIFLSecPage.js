"use client";
import React, { useState, useRef, useEffect } from "react";
import './IIFLSecPage.css';
import Image from "next/image";
import Link from "next/link";
import EmblaCarousel from '../NewBlJourneyD/Emblacarousel/js/EmblaCarousel';
import listimage1 from '../NewBlJourneyD/newblimages/newchange11.png';
import listimage2 from '../NewBlJourneyD/newblimages/newchange3.png';
import listimage3 from '../NewBlJourneyD/newblimages/newchange2.png';
import styles from '../NewBlJourneyD/NewBlFirstFormPage.module.css';
import { Roboto } from '@next/font/google';
import axios from "axios";
import IndiaGoldRejectPage from "./IIFLRejectPage";
import IndiaGoldSuccessPage from "./IIFLSuccessPage";

// Import jewelry icons
import banglesIcon from '../IndiaGold/NewJwellaryImages/bracelet.png';
import mangalsutraIcon from "../IndiaGold/NewJwellaryImages/mangalsutra.png";
import earringIcon from '../IndiaGold/NewJwellaryImages/earrings.png';
import necklaceIcon from '../IndiaGold/NewJwellaryImages/necklace.png';
import coinIcon from "../IndiaGold/NewJwellaryImages/game-coin.png";

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const OPTIONS = { direction: 'rtl', loop: true };
const SLIDES = [
  { imageUrl: listimage1 },
  { imageUrl: listimage2 },
  { imageUrl: listimage3 },
];

const JWELLARY_TYPES = [
  { value: 'bangles', label: 'Bangles', icon: banglesIcon },
  { value: 'mangalsutra', label: 'MangalSutra', icon: mangalsutraIcon },
  { value: 'earring', label: 'Earring', icon: earringIcon },
  { value: 'necklace', label: 'Necklace', icon: necklaceIcon },
  { value: 'coin', label: 'Coin', icon: coinIcon },
  { value: 'other', label: 'Other', icon: null },
];

// Custom Dropdown Component

const CustomJwellaryDropdown = ({ value, onChange, options, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative w-full" ref={dropdownRef} >
      <div
        onClick={() => setIsOpen(!isOpen)}
  className={`w-full p-3 border rounded-md bg-white cursor-pointer flex items-center justify-between ${styles.input}`}  style={{display:"flex", gap:"40%"}}     >
        <div className="flex items-center gap-2"  style={{display:"flex"}}>
          {selectedOption?.icon ? (
            <div className="w-6 h-6 relative">
              <Image
                src={selectedOption.icon}
                alt={selectedOption.label}
                height={20}
                width={20}
                className="object-contain"
              />
            </div>
          ) : null}
          <span>{selectedOption?.label || "Select jewellery type"}</span>
        </div>
        {/* <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          width={10}
          height={10}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg> */}
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto" >
          {options.map((option) => (
            <div className="drpls"
            style={{display:"flex", gap:"5%",fontSize:"18px", marginLeft:"3%"}}
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}

            >
                {option.label}
              
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
            </div>
          ))}
        </div>
      )}
      
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

const IIFLSecPage = ({ formData, formState, searchParams}) => {

  const queryParams = Object.fromEntries(new URLSearchParams(searchParams));
  const page = queryParams.page;
  // const mobile = queryParams.mobilenumber;

  const [rejectPage, setRejectPage] = useState(false);
  const [successPage, setSuccessPage] = useState(false);

  const [mobileNumber, setMobileNumber] = useState(); 

  useEffect(()=>{
    if( page == 2){
      // console.log("Inside when the page is 2");
      setMobileNumber(localStorage.getItem('mobileNumberForRejection'));
      // console.log("The mobile in the local Storage is :: ",localStorage.getItem('mobileNumberForRejection'))
    }else{
      console.log("In else");
    }
  },[])
  
  

  // State variables
  const [loanType, setLoanType] = useState('');
  const [desiredLoanAmount, setDesiredLoanAmount] = useState('');
  // const [jwellaryLocation, setJwellaryLocation] = useState('');
  const [jwellaryType, setJwellaryType] = useState('');
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef(null);
  const [showFullConsent, setShowFullConsent] = useState(false);
  const [showConsent, setShowConsent] = useState(false);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!loanType) {
      newErrors.loanType = "Please select a loan type";
    }

    if (!desiredLoanAmount) {
      newErrors.desiredLoanAmount = "Please enter desired loan amount";
    } else if (parseInt(desiredLoanAmount) < 10000) {
      newErrors.desiredLoanAmount = "Loan amount must be greater than ₹10,000";
    }

    // if (!jwellaryLocation) {
    //   newErrors.jwellaryLocation = "Please select jewellery location";
    // }

    if (!jwellaryType) {
      newErrors.jwellaryType = "Please select jewellery type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


   // Backend connection first page
   const handleSecondPageSubmit = async (e) => {
    e.preventDefault();
    try {

      const formData1 = new FormData();
      // console.log("FormState mobile number in second page is : ",formState.mobileNumber);
      if(page==2){
        // console.log("Checking the mobile number when te page is 2 ", mobileNumber);
        formData1.append('mobileNumber', mobileNumber);
      }else{
        // console.log("Checking the mobile number when the page is not 2");
        formData1.append('mobileNumber', formState.mobileNumber);
      }
      
      // formData1.append('pinCode', formState.pinCode);
      formData1.append('firstname',formState.firstName);
      formData1.append('lastname',formState.lastName);
      formData1.append('email',formState.email);
      formData1.append('pincode',formState.pinCode);
      formData1.append('loanType', loanType);
      formData1.append('desiredLoanAmount', desiredLoanAmount);
      // formData1.append('jwellaryLocation', jwellaryLocation);
      formData1.append('jwellaryType', jwellaryType);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}iiflgold_Sec_Page`, formData1);
      if(response.data.code === 0) {
        console.log("The response is 0");
        setSuccessPage(true);
        // setRejectPage(true);
      }else if(response.data.code === -1)
      {
        setRejectPage(true);
      }
    } catch(error) {
      console.log('Error:', error);
    }
  };


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
    //   const submittedData = { ...formState };
      handleSecondPageSubmit(e);
    //   setFormData(submittedData);
    //   setShowSuccess(true);
    }
  };

  const handleLoanTypeChange = (value) => {
    setLoanType(value);
    setErrors(prev => ({ ...prev, loanType: "" }));
  };
  
  const handleDesiredLoanAmountChange = (value) => {
    setDesiredLoanAmount(value);
    setErrors(prev => ({ ...prev, desiredLoanAmount: "" }));
  };
  
  const handleJwellaryLocationChange = (value) => {
    setJwellaryLocation(value);
    setErrors(prev => ({ ...prev, jwellaryLocation: "" }));
  };
  
  // Update the existing handleSelectJwellaryType function
  const handleSelectJwellaryType = (value) => {
    setJwellaryType(value);
    setErrors(prev => ({ ...prev, jwellaryType: "" }));
  };



  // if (showSuccess) {
  //   return <LoanSuccessPage formData={{ ...formData, loanType, desiredLoanAmount, jwellaryLocation, jwellaryType }} />;
  // }

  return (
    <>
   {
    successPage && console.log("After changing the value of successPage is :: ",successPage)
   }
      {successPage && 
      
      <IndiaGoldSuccessPage/>}
      {rejectPage && <IndiaGoldRejectPage/>}
    {
      !successPage && !rejectPage &&
   
    <div className={`${roboto.className} page-container`}>
      <div className="carousel-background">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
      <div className="newfirstcard-container" style={{ boxSizing: 'content-box' }}>
        <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
          {/* Loan Type Radio Buttons */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Choose gold loan option</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input style={{marginRight: '4px'}}
                  type="radio"
                  value="home delivery"
                  checked={loanType === 'home delivery'}
                  //onChange={(e) => setLoanType(e.target.value)}
                  onChange={(e) => handleLoanTypeChange(e.target.value)}
                  className={styles.radioInput}
                />
                Home delivery &nbsp; &nbsp; of Gold loan
              </label>
              <label className={styles.radioLabel}>
                <input style={{marginRight: '4px'}}
                  type="radio"
                  value="visit branch"
                  checked={loanType === 'visit branch'}
                 // onChange={(e) => setLoanType(e.target.value)}
                 onChange={(e) => handleLoanTypeChange(e.target.value)}
                  className={styles.radioInput}
                />
                I will visit near by branch
              </label>
            </div>
            {errors.loanType && <p className={styles.error}>{errors.loanType}</p>}
          </div>

          {/* Desired Loan Amount */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Desired loan amount (₹)</label>
            <input
              type="number"
              value={desiredLoanAmount}
            //   onChange={(e) => setDesiredLoanAmount(e.target.value)}
            onChange={(e) => handleDesiredLoanAmountChange(e.target.value)}

              placeholder="Enter amount (min ₹10,000)"
              className={styles.input}
              min="10000"
            />
            {errors.desiredLoanAmount && <p className={styles.error}>{errors.desiredLoanAmount}</p>}
          </div>

          {/* jwellary Location Radio Buttons */}
          {/* <div className={styles.formGroup}>
            <label className={styles.label}>Where is your jewellery?</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  value="home"
                  checked={jwellaryLocation === 'home'}
                //   onChange={(e) => setJwellaryLocation(e.target.value)}
                onChange={(e) => handleJwellaryLocationChange(e.target.value)}
                  className={styles.radioInput}
                />
                At home
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  value="bank"
                  checked={jwellaryLocation === 'bank'}
                //   onChange={(e) => setJwellaryLocation(e.target.value)}
                onChange={(e) => handleJwellaryLocationChange(e.target.value)}
                  className={styles.radioInput}
                />
                Bank locker
              </label>
            </div>
            {errors.jwellaryLocation && <p className={styles.error}>{errors.jwellaryLocation}</p>}
          </div> */}
       
          <div className={styles.formGroup}>
            <label className={styles.label}>Type of jewellery</label>
            <CustomJwellaryDropdown
              value={jwellaryType}
              onChange={handleSelectJwellaryType}
              options={JWELLARY_TYPES}
              error={errors.jwellaryType}
            />
          </div>


          <div className={styles.formGroup}>
            <label>
            
            {showFullConsent ? (
                <>
                 You hereby consent to CreditHaat being appointed as your authorized representative
              to receive your Credit Information from Experian for the purpose of accessing credit worthiness and availing pre-approved offers (“End Use Purpose”). You hereby agree to Terms and Conditions.
              I authorize CreditHaat, its partner financial institutes/lenders and their representatives to Call, SMS or communicate via WhatsApp regarding my application. This consent overrides any registration for DNC / NDNC.
              I confirm I am in India, I am a major and a resident of India and I have read and I accept CreditHaat Privacy Policy Click here to read the <Link href="https://www.credithaat.com/privacy"> PRIVACY POLICY </Link>& <Link href="https://www.credithaat.com/termsC"> TERMS OF SERVICE</Link>
                  <span onClick={() => setShowFullConsent(false)} style={{ color: "blue", cursor: "pointer", textDecoration: "none" }}>
                     Show Less
                  </span>
                </>
              ) : (
                <>
                 You hereby consent to CreditHaat being appointed as your authorized representative...
                  <span onClick={() => setShowFullConsent(true)} style={{ color: "blue", cursor: "pointer", textDecoration: "none" }}>
                    Read More
                  </span>
                </>
              )}
            </label>
            {errors.consent && <p style={{ color: 'red' }}>{errors.consent}</p>}
          </div>

          <div className={styles.formGroup}>
            <label>
               {showConsent ? (
                <>
                  By agreeing and accepting the terms and conditions set out herein, you provide your express consent to Social Worth Technologies Private Limited, Whizdm Innovations Pvt Ltd, Upwards Fintech Services Pvt Ltd, Tata Capital Financial Services Ltd, SmartCoin Financials Pvt Ltd, MWYN Tech Pvt Ltd, L&T Finance Ltd, Krazybee Services Pvt Ltd, Infocredit Services Pvt. Ltd, Incred Financial Services, IIFL Finance Ltd, EQX Analytics Pvt Ltd, EPIMoney Pvt Ltd, Bhanix finance and Investment LTd, Aditya Birla Finance Ltd to access the credit bureaus and credit information report and credit score. You also hereby irrevocably and unconditionally consent to usage of such credit information being provided by credit bureaus.                  
                  <span onClick={() => setShowConsent(false)} style={{ color: "blue", cursor: "pointer", textDecoration: "none" }}>
                    Show Less
                  </span>
                </>
              ) : (
                <>
                  By agreeing and accepting the terms and conditions set out herein, you provide your...
                  <span onClick={() => setShowConsent(true)} style={{ color: "blue", cursor: "pointer", textDecoration: "none" }}>
                    Read More
                  </span>
                </>
              )}
            </label>
            {errors.terms && <p style={{ color: 'red' }}>{errors.terms}</p>}
          </div>
          <div style={{marginBottom:"50px"}}>
          Calculation:<br/> CreditHaat does not charge any fees from the user.<br/> A sample loan calculation for ₹1,00,000 borrowed for 1 year, with interest rate @13% per annum*, is as provided below: <br/>
          Processing fee (@ 2%) = ₹2,000 + GST = ₹2,360
          </div>
          <div className={styles.stickyButton}>
            <button type="submit" className={`${styles.button} ${styles.submitButton}`}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
     }
    </>
  );
};

export default IIFLSecPage;