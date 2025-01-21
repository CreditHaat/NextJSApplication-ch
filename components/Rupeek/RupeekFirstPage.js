"use client"
import React, { useState, useRef, useEffect } from "react";
import './RupeekFirstPage.css';
import listimage1 from '../NewPlApplyD/newplimages/finalimage2.png';
import listimage2 from '../NewPlApplyD/newplimages/finalimage3.png';
import listimage3 from '../NewPlApplyD/newplimages/plimage33.png';
import styles from '../NewPlApplyD/NewPlFirstPage.module.css';
import EmblaCarousel from '../NewPlApplyD/Emblacarousel/js/EmblaCarousel';
import axios from "axios";
import { FaUser, FaPhone, FaBriefcase, FaEnvelope, FaIdCard, FaMapMarkerAlt } from 'react-icons/fa'; // Importing icons for name, mobile number, profession, income, payment type, and PAN
import {Roboto} from '@next/font/google';
import OTPBottomSheet from '../NewPlOtpBottomSheet/PlOTPBottomSheet';
import RupeekSecPage from "./RupeekSecPage";
import OtpVerifyLoader from "@components/EmbeddedJourneyList/OtpVerifyLoader";

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



const RupeekFirstPage = ({ params, searchParams }) => {

    const [formErrors, setFormErrors] = useState({
      fullname: "",
        mobileNumber: "",
        pan: "",
        email:"",
        pinCode:"",
      });

      const [formData, setFormData] = useState({
        fullname: "",
        mobileNumber: "",
        pan: "",
        email:"",
        pinCode:"",
      });
      // const [showOTPModal, setShowOTPModal] = useState(false);
      const [activeContainer, setActiveContainer] = useState("newplfirstpage"); // Default container
      const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
      const otpInputRefs = useRef([]);
      const [otpStatus, setOtpStatus] = useState("");
      const [otpVerified, setOtpVerified] = useState(false);
  const [isOtpBottomSheetVisible, setIsOtpBottomSheetVisible] = useState(false);
  const [showFullConsent, setShowFullConsent] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [errors, setErrors] = useState({}); // Object to store error messages
  const formRef = useRef(null);
  const [stgOneHitId, setStgOneHitId] = useState(null);
  const [stgTwoHitId, setstgTwoHitId] = useState(null);
  const [t_experian_log_id, sett_experian_log_id] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  var json = null;
  const [otpVerifyLoader, setOtpVerifyLoader] = useState(false);
  const [lastname, setLastname] = useState(null);
  const [firstName, setFirstName] = useState(null);

  const [panValue, setPanValue] = useState('');
  const [inputStage, setInputStage] = useState('alphabets');

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when component mounts
  }, []);


const handleEmailChange = (e) => {
  const value = e.target.value;
  setFormData(prevData => ({
    ...prevData,
    email: value
  }));

  // Clear email error
  setFormErrors(prevErrors => ({
    ...prevErrors,
    email: ''
  }));

  // If email contains @ and . characters, move to pincode
  if (value.includes('@') && value.includes('.com')) {
    pincodeInputRef.current?.focus();
  }
};

const handlePincodeChange = (e) => {
  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
  setFormData(prevData => ({
    ...prevData,
    pinCode: value
  }));

  // Clear pincode error
  setFormErrors(prevErrors => ({
    ...prevErrors,
    pinCode: ''
  }));

  // Close keyboard when pincode is complete
  if (value.length === 6) {
    e.target.blur();
  }
};

  // Handle PAN Change
  const handlePanChange = (e) => {
    const inputValue = e.target.value.toUpperCase();
    let updatedValue = inputValue;
  
    // Handling first 5 alphabets
    if (inputValue.length <= 5) {
      if (/^[A-Z]*$/.test(inputValue)) {
        setFormData(prevData => ({
          ...prevData,
          pan: updatedValue
        }));
      }
    }
    // Handling 6-9 characters (numbers)
    else if (inputValue.length <= 9) {
      const alphabetPart = inputValue.slice(0, 5);
      const numberPart = inputValue.slice(5).replace(/[^0-9]/g, '');
      updatedValue = alphabetPart + numberPart;
      setFormData(prevData => ({
        ...prevData,
        pan: updatedValue
      }));
    }
    // Handling last character (alphabet)
    else if (inputValue.length === 10) {
      const lastChar = inputValue.charAt(9).replace(/[^A-Z]/g, '');
      if (lastChar) { // Only if it's a valid alphabet
        updatedValue = inputValue.slice(0, 9) + lastChar;
        setFormData(prevData => ({
          ...prevData,
          pan: updatedValue
        }));
  
        // Auto focus to email field when valid PAN is complete
        if (/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(updatedValue)) {
          setTimeout(() => {
            emailInputRef.current?.focus();
          }, 100);
        }
      }
    }
  
    // Clear errors if any exist
    if (formErrors.pan) {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        pan: ''
      }));
    }
  };

  // Determine inputMode based on the length of the PAN entered
  const getInputMode = () => {
    const panLength = formData.pan.length;
    
    if (panLength < 5) {
      return "text";
    }
    if (panLength >= 5 && panLength <= 8) {
      return "numeric";
    }
    return "text";
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'fullname') {
      // Remove non-alphabetical characters except spaces
      const sanitizedValue = value.replace(/[^a-zA-Z\s]/g, '');
  
      // Capitalize first letter of each word
      const capitalizedValue = sanitizedValue
        .split(' ') // Split the name by spaces
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter and make the rest lowercase
        .join(' '); // Join the words back into a single string
  
      // Split the capitalized value into first name and last name
      const nameParts = capitalizedValue.trim().split(' ');
      const fname = nameParts.length > 0 ? nameParts[0] : '';
      const surname = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
  
      // Update first name and last name
      setLastname(surname);
      setFirstName(fname);
  
      // Validate name
      if (capitalizedValue.trim() === '') {
        setFormErrors(prevErrors => ({
          ...prevErrors,
          fullname: 'Name is required'
        }));
      } else {
        setFormErrors(prevErrors => ({
          ...prevErrors,
          fullname: ''
        }));
      }
  
      // Update form data with the formatted capitalized name
      setFormData((prevData) => ({ ...prevData, [name]: capitalizedValue }));
    } else {
      // For other fields (if needed)
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  
    // Optionally, you can call updateProgress() if necessary
  };
  
  const handleKeyDown = (e) => {
    if (e.target.name === 'fullname' && !/^[a-zA-Z\s]*$/.test(e.key)) {
      e.preventDefault(); // Prevent input if the key is not a letter or space
    }
  };

  
const validateForm = () => {
  let valid = true;
  const errors = {
    fullname: "",
    mobileNumber: "",
    pan: "",
    email: "",
    pinCode: "",
  };
    // Name validation
    if (!formData.fullname?.trim()) {
      errors.fullname = 'Name is required';
      valid = false;
    }
  
    // Mobile Number validation
    if (!formData.mobileNumber?.trim()) {
      errors.mobileNumber = "Mobile Number is required";
      valid = false;
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber.trim())) {
      errors.mobileNumber = "Mobile Number should start with 6 to 9 digit";
      valid = false;
    }
  
    // PAN Validation
    if (!formData.pan?.trim()) {
      errors.pan = "PAN is required";
      valid = false;
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.pan)) {
      errors.pan = "PAN must be in the format AAAAA9999A";
      valid = false;
    }
  
    // Email Validation
    if (!formData.email?.trim()) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Enter a valid email address";
      valid = false;
    }
  
    // Pincode Validation
    if (!formData.pinCode?.trim()) {
      errors.pinCode = "Pincode is required";
      valid = false;
    } else if (!/^\d{6}$/.test(formData.pinCode)) {
      errors.pinCode = "Invalid pincode";
      valid = false;
    }
  
    setFormErrors(errors);
    
    // Log validation results for debugging
    console.log("Validation result:", valid);
    console.log("Form errors:", errors);
    
    return valid;
  };
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Hey I am under the water heeeeee....");
  //   if (validateForm()) {
  //     console.log("hii tejyaaa.....")
  //     handleFormSubmit(e);
  //   }
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submission attempted");
    
    // Remove this since we don't need double validation
    // if (validateForm()) {
    //   handleFormSubmit(e);
    // }
  };

  const [upotp, setUpOtp] = useState(""); // OTP value input from the user
 

  // const handleNextClick = () => {
  //   setUpOtp('');
  //   // Check if the form is valid before showing the OTP bottom sheet
  //   if (validateForm()) {
  //     // Show OTP Bottom Sheet if the form is valid
  //     setIsOtpBottomSheetVisible(true);
  //   } 
  // };
  const handleNextClick = (e) => {
    e.preventDefault(); // Prevent default form submission
    setUpOtp('');
    
    if (validateForm()) {
      handleFormSubmit(e);
      setIsOtpBottomSheetVisible(true);
    }
  };


  const handleFormSubmit = async (e) => {
    console.log("Inside this function 1");
    e.preventDefault();

    console.log("Inside this function");
    try {
      const queryParams = new URLSearchParams(location.search);

      // Retrieve values for the specified parameters
      const channel = queryParams.get("channel") || "";
      const dsa = queryParams.get("dsa") || "";
      const source = queryParams.get("source") || "";
      const subSource = queryParams.get("sub_source") || "";
      const subDsa = queryParams.get("sub_dsa") || "";

      const urllink = location.search?.split("?")[1] || "null";

      const formData1 = new FormData();
      formData1.append("userPhoneNumber", formData.mobileNumber);
      formData1.append("firstName", firstName);
      formData1.append("lastName", lastname);
      formData1.append("pan",formData.pan);
      formData1.append('pinCode', formData.pinCode);
      formData1.append("email",formData.email);


      formData1.append("dsa", dsa);
      formData1.append("channel", channel);
      formData1.append("source", source);
      formData1.append("sub_source", subSource);
      formData1.append("campaign", urllink);
      formData1.append("sub_dsa", subDsa);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}chfronetendotpgenerator_rupeek`,
        formData1
      );

      if (response.data.code === 0) {
        setStgOneHitId(response.data.obj.stgOneHitId);
        setstgTwoHitId(response.data.obj.stgTwoHitId);
        sett_experian_log_id(response.data.obj.t_experian_log_id);
        handleDataLayerStart(response.data.obj.user_exist,formData.mobileNumber,formData.profession); 
      }

      if (response.status === 200) {
      } else {
        console.error("Submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

const handleVerifyOTP = () => {
  verify_otp_credithaat_from_backend();
  // setIsOtpBottomSheetVisible(false);
};

const verify_otp_credithaat_from_backend = async (e) => {
  // e.preventDefault();
  setOtpLoader(true);
  try {
    const formData1 = new FormData();
    formData1.append("mobileNumber", formData.mobileNumber);
    formData1.append('otp', upotp);
    formData1.append("stgOneHitId", stgOneHitId);
    formData1.append("stgTwoHitId", stgTwoHitId);
    formData1.append("t_experian_log_id", t_experian_log_id);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}verifyOTPNewPersonalloan`,
      formData1
    );

    console.log("The otp response is :: ",response);  

    console.log("Otp response code is : ", response.data.code);   

    if (response.data.code === 0 || response.data.code === 1 || response.data.code === 2 || response.data.code === 3) {
      setOtpVerified(true);
      setIsOtpBottomSheetVisible(false);
      setActiveContainer("RupeekSecPage");
        } else {
      setOtpStatus("Incorrect OTP! Try Again..");
      setOtpInputs(["", "", "", "", "", ""]);
    }

  } catch (error) {
    console.error("Error submitting form:", error);
  }
  finally {
    // Add 3-second delay before hiding the loader
    setTimeout(() => {
      setOtpLoader(false); // Hide loader
    }, 3000); // 3-second delay
  }
};

const mobileNumberRef = useRef(null);
const panInputRef = useRef(null);
const emailInputRef = useRef(null);
const pincodeInputRef = useRef(null);

const handleMobileNumberChange = (e) => {
  const value = e.target.value.replace(/\D/g, "").slice(0, 10);
  setFormData({ ...formData, mobileNumber: value });

  if (formErrors.mobileNumber) {
    setFormErrors({ ...formErrors, mobileNumber: "" });
  }

  // Auto focus to PAN field when mobile number is complete
  if (value.length === 10) {
    setTimeout(() => {
      panInputRef.current?.focus();
    }, 100);
  }
};
  const [otpLoader, setOtpLoader] = useState(false);

  // Function to handle form field changes
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  return (
    <>
    {otpLoader && <OtpVerifyLoader/>}
     {activeContainer === "RupeekSecPage" && (
        <RupeekSecPage formData={formData} />
      )}
   
    
   {isVisible && <OTPBottomSheet isVisible={isVisible} verifyOTP={verifyOTP} upotp={upotp} otpStatus={otpStatus} setUpOtp={setUpOtp} />}
   {
  activeContainer === "newplfirstpage" && (
  <div className={`${roboto.className} page-container`}>
        <div className="carousel-background">
          <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </div>
   <div className="newfirstcard-container" style={{ boxSizing: 'content-box' }}>
     
    <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
{/* First Name Field */}
      <div className={styles.formGroup} style={{ position: 'relative' }}>
        <input
          type="text"
          id="fullname"
          name="fullname"
          placeholder="Name as per PAN"
          value={formData.fullname}
          className={styles.input}
          onChange={handleChange} 
          onKeyDown={handleKeyDown} 
          autoCapitalize="words"
        />
        <span
          className={styles.icon}
          style={{
            position: 'absolute',
            right: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            color: '#00000061',
          }}
        >
          <FaUser />
        </span>
        {formErrors.fullname && (
          <span className="error" style={{ position: 'absolute', top: '100%', left: '4px' }}>
            {formErrors.fullname}
          </span>
        )}
      </div>

      {/* Mobile Number Field */}
          <div className={styles.formGroup} style={{ position: 'relative' }}>
            <input
            ref={mobileNumberRef}
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              placeholder="Mobile number"
              inputMode="numeric"
              value={formData.mobileNumber}
              className={styles.input}
              onChange={handleMobileNumberChange}
            />
            <span
              className={styles.icon}
              style={{
                position: 'absolute',
                right: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#00000061',
              }}
            >
              <FaPhone />
            </span>
            {formErrors.mobileNumber && (
              <span className="error" style={{ position: 'absolute', top: '100%', left: '4px' }}>
                {formErrors.mobileNumber}
              </span>
            )}
          </div>

   {/* PAN Field */}
   <div className={styles.formGroup} style={{ position: 'relative' }}>
       <input
          ref={panInputRef}
          type="text"
          name="pan"
          placeholder="Enter PAN"
          value={formData.pan}
          onChange={handlePanChange}
          maxLength={10}
          className={styles.input}
          inputMode={getInputMode()}
          autoCapitalize="characters"
        />
            <span
              className={styles.icon}
              style={{
                position: 'absolute',
                right: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#00000061',
              }}
            >
            <FaIdCard />
            </span>
            {formErrors.pan && (
                <span className="error" style={{ position: 'absolute', top: '100%', left: '4px' }}>
                    {formErrors.pan}
                </span>
                )}
          </div>
    

          {/* Email Field */}
          <div className={styles.formGroup} style={{ position: 'relative' }}>
          <input
              ref={emailInputRef}
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleEmailChange}
              className={styles.input}
            />
             <span
              className={styles.icon}
              style={{
                position: 'absolute',
                right: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#00000061',
              }}
            >
              <FaEnvelope />
            </span>
            {formErrors.email && (
            <span className="error" style={{ position: 'absolute', top: '100%', left: '4px' }}>
              {formErrors.email}
            </span>
            )}
         </div>

          {/* Pincode Field */}
          <div className={styles.formGroup} style={{ position: 'relative' }}>
            <input
              ref={pincodeInputRef}
              type="text"
              inputMode="numeric"
              name="pinCode"
              placeholder="Enter pincode"
              value={formData.pinCode}
              onChange={handlePincodeChange}
              maxLength={6}
              className={styles.input}
            />
             <span
            className={styles.icon}
            style={{
              position: 'absolute',
              right: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: '#00000061',
            }}
          >
            <FaMapMarkerAlt />
          </span>
          {formErrors.pinCode && (
            <span className="error" style={{ position: 'absolute', top: '100%', left: '4px' }}>
              {formErrors.pinCode}
            </span>
            )}
          </div>





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
              <button type="submit" className={`${styles.button} ${styles.submitButton}` } onClick={handleNextClick}>Next</button>
              {/* className={`w-full  ${styles.submitButton}`} */}
              </div>
          
        </form>
      </div>
    </div>
)
}

    {/* OTP Bottom Sheet Modal */}
    {isOtpBottomSheetVisible && (
      <OTPBottomSheet 
        isVisible={isOtpBottomSheetVisible} 
        verifyOTP={handleVerifyOTP} 
        upotp={upotp} 
        otpStatus={otpStatus} 
        setUpOtp={setUpOtp}
      />
    )}

    </>
  );
};

export default RupeekFirstPage;
