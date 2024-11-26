
"use client"
import React, { useState, useRef } from "react";
import axios from "axios";
import './LapPage.css';
import EmblaCarousel from '../NewBlJourneyD/Emblacarousel/js/EmblaCarousel';
import listimage1 from '../NewBlJourneyD/newblimages/newchange11.png';
import listimage2 from '../NewBlJourneyD/newblimages/newchange3.png';
import listimage3 from '../NewBlJourneyD/newblimages/newchange2.png';
import styles from '../NewBlJourneyD/NewBlFirstFormPage.module.css';
import LapSuccessPage from "./LapSuccessPage";
import { Roboto } from '@next/font/google';

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

const LapPage = ({searchParams}) => {

  // const [mobileFromRejection, setMobileFromRejection] = useState();

  // State variables for form fields
  const [mobileNumber, setMobileNumber] = useState(null);
  const [propertytype, setPropertyType] = useState("");
  const [propertyvalue, setPropertyValue] = useState("");
  const [propertypinCode, setPropertyPinCode] = useState("");
  const [loanamount, setLoanAmount] = useState("");
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const [showFullConsent, setShowFullConsent] = useState(false);
    const [showConsent, setShowConsent] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
  const validateForm = () => {
    const newErrors = {};
    if (!propertyvalue) {
      newErrors.propertyvalue = "Please select your property value.";
    }
    if (!propertytype) {
      newErrors.propertytype = "Please select a property type.";
    }
    if (!/^\d{6}$/.test(propertypinCode)) {
      newErrors.propertypinCode = "Please enter a valid 6-digit pin code.";
    }
    if (!loanamount) {
      newErrors.loanamount = "Please enter a loan amount.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  

  useState(()=>{

    setMobileNumber(localStorage.getItem('mobileNumberForRejection'));

    // const queryParams = Object.fromEntries(new URLSearchParams(searchParams));
    // // const header = queryParams.ch_header;
    // const mobile = queryParams.mobilenumber;
    // console.log("mobile is :: ",mobile);
    // setMobileNumber(mobile);
  },[])
   // Handle form submission 

   const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    
    if (validateForm()) {
      // console.log("Form is valid. Displaying success page...");
      handleDataSubmit(e);
      setShowSuccess(true); // Show the success page

    }
  };

    const handleDataSubmit = async(e)=>{

      // console.log("Inside the handleSubmit");
  
      e.preventDefault();
  
      // function handleDataLayerStart(flag,mobile_number, emptype,PaymentType, monthlyincome) {
      //   console.log("INside handledatalayer , ",flag, mobile_number, emptype);
      //   window.dataLayer = window.dataLayer || [];
      //   window.dataLayer.push({'mobileNumber' : mobile_number, 'flag':flag, 'employmentType': emptype, 'PaymentType': PaymentType, 'monthlyincome': monthlyincome  });
      // }
  
      function handleDataLayerStart(flag,mobile_number,propertytype,propertyvalue,propertypinCode,loanamount) {
        // console.log("INside handledatalayer , ",flag, mobile_number, propertytype,propertyvalue,propertypinCode,loanamount);
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({'mobileNumber' : mobile_number, 'flag':flag, 'propertytype': propertytype, 'propertyvalue': propertyvalue, 'propertypinCode': propertypinCode, 'loanamount': loanamount});
      }
  
      try{
  
        const queryParams = new URLSearchParams(location.search);
  
        // Retrieve values for the specified parameters
        const channel = queryParams.get("channel") || "";
        const dsa = queryParams.get("dsa") || "";
        const source = queryParams.get("source") || "";
        const subSource = queryParams.get("sub_source") || "";
        const subDsa = queryParams.get("sub_dsa") || "";
  
        const urllink = location.search?.split("?")[1] || "null";
  
        const formData = new FormData();
        formData.append("mobileNumber", mobileNumber);
        formData.append("propertytype",propertytype);
        formData.append("propertyvalue", propertyvalue);
        formData.append("propertypinCode", propertypinCode);
        formData.append("loanamount", loanamount);
        formData.append("dsa", dsa);
        formData.append("channel", channel);
        formData.append("source", source);
        formData.append("sub_source", subSource);
        formData.append("campaign", urllink);
        formData.append("sub_dsa", subDsa);
  
        const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}lap_reg`, formData);
  
        // console.log("Response is :: ",response);
  
        
  
        // if(response.data.code===0)
        // {
  
        //   console.log("user_exist is :: ",response.data.obj.user_exist);
        //   console.log("Data added successfully");
        //   // handleDataLayerStart(response.data.obj.user_exist,mobile,'Business', 'Bank Transfer', turnover); 
        //   handleDataLayerStart(response.data.obj.user_exist,mobileNumber, propertytype, propertyvalue, propertypinCode, loanamount);
        //   getLendersList(e);
        //   handleDataLayerStage(1);
        // }else{
        //   console.log("Something went wrong : ", response);
        // }
  
      }catch(error)
      {
        console.log(error);
      }
    }

    
  
  
  return (
    <div className={`${roboto.className} page-container`}>
        {showSuccess ? ( // Conditional rendering of the success page
        <LapSuccessPage onClose={() => setShowSuccess(false)} />
      ) : (
        <>
      <div className="carousel-background">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
      <div className="newfirstcard-container" style={{ boxSizing: 'content-box' }}>
        <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label style={{ fontWeight: 'bold' }}>Type of property</label>
            <select
              value={propertytype}
              onChange={(e) => {
                setPropertyType(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, propertytype: "" }));
              }}
              className={styles.select}
            >
              <option value="">Select property type</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>
            {errors.propertytype && <p style={{ color: 'red' }}>{errors.propertytype}</p>}
          </div>

          <div className={styles.formGroup}>
            <label style={{ fontWeight: 'bold' }}>Estimated property value</label>
            <select
              value={propertyvalue}
              onChange={(e) => {
                setPropertyValue(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, propertyvalue: "" }));
              }}
              className={styles.select}
            >
              <option value="">Select property value</option>
              <option value="<500000">Below 50L</option>
              <option value="5000000-10000000">50L - 1Cr</option>
              <option value="10000000-30000000">1Cr - 3Cr</option>
              <option value=">30000000">Greater than 3Cr</option>
            </select>
            {errors.propertyvalue && <p style={{ color: 'red' }}>{errors.propertyvalue}</p>}
          </div>

          <div className={styles.formGroup}>
            <label style={{ fontWeight: 'bold' }}>Property pincode</label>
            <input
              type="number"
              placeholder="Eg. 123456"
              value={propertypinCode}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,6}$/.test(value)) {
                  setPropertyPinCode(value);
                }
                setErrors((prevErrors) => ({ ...prevErrors, propertypinCode: "" }));
              }}
              className={styles.input}
              maxLength={6}
            />
            {errors.propertypinCode && <p style={{ color: 'red' }}>{errors.propertypinCode}</p>}
          </div>

          <div className={styles.formGroup}>
            <label style={{ fontWeight: 'bold' }}>Desired loan amount</label>
            <input
              type="number"
              placeholder="Eg. 50000"
              value={loanamount}
              onChange={(e) => {
                const value = e.target.value;
                setLoanAmount(value);
                setErrors((prevErrors) => ({ ...prevErrors, loanamount: "" }));
              }}
              className={styles.input}
              maxLength={6}
            />
            {errors.loanamount && <p style={{ color: 'red' }}>{errors.loanamount}</p>}
          </div>

          {/* First Consent Section */}
          <div className={styles.formGroup}>
            <label>
              {showFullConsent ? (
                <>
                  You hereby consent to CreditHaat being appointed as your authorized representative
                  to receive your Credit Information from Experian for the purpose of accessing credit worthiness and availing pre-approved offers (“End Use Purpose”). You hereby agree to Terms and Conditions.
                  I authorize CreditHaat, its partner financial institutes/lenders and their representatives to Call, SMS or communicate via WhatsApp regarding my application. This consent overrides any registration for DNC / NDNC.
                  I confirm I am in India, I am a major and a resident of India and I have read and I accept CreditHaat Privacy Policy Click here to read the PRIVACY POLICY & TERMS OF SERVICE
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

          {/* Second Consent Section */}
          <div className={styles.formGroup}>
            <label>
              {showConsent ? (
                <>
                  By agreeing and accepting the terms and conditions set out herein, you provide your express consent to Social Worth Technologies Private Limited, Whizdm Innovations Pvt Ltd, Upwards Fintech Services Pvt Ltd, Tata Capital Financial Services Ltd, SmartCoin Financials Pvt Ltd, MWYN Tech Pvt Ltd, HDFC, L&T Finance Ltd, Krazybee Services Pvt Ltd, Infocredit Services Pvt. Ltd, Incred Financial Services, IIFL Finance Ltd, EQX Analytics Pvt Ltd, EPIMoney Pvt Ltd, Bhanix finance and Investment Ltd, Aditya Birla Finance Ltd to access the credit bureaus and credit information report and credit score. You also hereby irrevocably and unconditionally consent to usage of such credit information being provided by credit bureaus.
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
            <button type="submit" className={`${styles.button} ${styles.submitButton}`}>Next</button>
          </div>
        </form>
      </div>
      </>
      )}
    </div>
  );
};


export default LapPage;
