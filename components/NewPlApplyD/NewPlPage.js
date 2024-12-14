"use client"
import React, { useState, useRef, useEffect } from "react";
import './NewPlPage.css';
import listimage1 from './newplimages/newchange11.png';
import listimage2 from './newplimages/newchange3.png';
import listimage3 from './newplimages/plimage33.png';
import styles from '../NewBlJourneyD/NewBlFirstFormPage.module.css';
import EmblaCarousel from './Emblacarousel/js/EmblaCarousel';
import axios from "axios";
import BLApplyLenders from "../BLApplyPrimeSecondJourney/BLApplyLenders";
import NewBlListPage from "./NewBlListPage";
// import Loader from '../BLApplyPrimeSecondJourney/LendersLoader';
import Loader from "./LendersLoader";
import ApplicationLoader from '../BLApplyPrimeSecondJourney/ApplicationLoader';
import RedirectionLoader from "./RedirectionLoader";
import ApplicationPopup from './ApplicationPopup';
import ErrorPopup from './ErrorPopup';
import { FaEnvelope } from 'react-icons/fa';
import { FaUser, FaPhone, FaBriefcase, FaDollarSign, FaIdCard, FaRupeeSign } from 'react-icons/fa'; // Importing icons for name, mobile number, profession, income, payment type, and PAN
// import Loader from "../NewBlJourneyD/LendersLoader";
// import RedirectionLoader from "../NewBlJourneyD/RedirectionLoader";
// import ApplicationLoader from "../NewBlJourneyD/ApplicationLoader";
// import ErrorPopup from '../NewBlJourneyD/ErrorPopup';
import otpimage from "../SmartCoin/SmartCoin_Images/otpimage.png";
// import {Roboto} from '@next/font/google';
import {Roboto} from '@next/font/google';
import OTPBottomSheet from '../EmbeddedJourneyList/OTPBottomSheet';
import ForSelfEmployed from '../BLApplyPrimeSecondJourney/ForSelfEmployed';
import ForSalaried from "../BLApplyPrimeSecondJourney/ForSalaried";
import NewPlPage2 from "./NewPlPage2";
import NewPlApplyDS from './NewPlApplyDS';
import debounce from 'lodash.debounce';
import RejectionPage from '../../components/RejectionPage/RejectionPage';

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

const NewPlPage = ({ params, searchParams }) => {


  const [genderFlag, setGenderFlag] = useState(false);
  const [addressFlag,setAddressFlag] = useState(false);

    const [formErrors, setFormErrors] = useState({
      fullname: "",
        mobileNumber: "",
        profession: "",
       paymentType: "",
        monthlyIncome: "",
        pan: "",
      });

      const [formData, setFormData] = useState({
        fullname: "",
        mobileNumber: "",
        profession: "",
        paymentType: "",
        monthlyIncome: "",
        pan: "",
      });
      // const [showOTPModal, setShowOTPModal] = useState(false);
      const [activeContainer, setActiveContainer] = useState("newplfirstpage");
      const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
      const otpInputRefs = useRef([]);
      const [otpStatus, setOtpStatus] = useState("");
      const [otpVerified, setOtpVerified] = useState(false);
      const [activeSecondForm, setActiveSecondForm] = useState(false);
      const [residentialPincodeFlag, setResidentialPincodeFlag] = useState(false);
  const [isCameFromBackend, setIsCameFromBackend] = useState(false);
  const [isOtpBottomSheetVisible, setIsOtpBottomSheetVisible] = useState(false);
  const [consent, setConsent] = useState(false);
  const [terms, setTerms] = useState(false);
  const [showFullConsent, setShowFullConsent] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [errors, setErrors] = useState({}); // Object to store error messages
  const formRef = useRef(null);
  const [stgOneHitId, setStgOneHitId] = useState(null);
  const [stgTwoHitId, setstgTwoHitId] = useState(null);
  const [t_experian_log_id, sett_experian_log_id] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [dobFlag,setDobFlag] = useState(false);
  const [cpi,  setCpi] = useState(0);
  const [lenderProduct, setLenderProduct] = useState(null);
  const [lenderDetails, setLenderDetails] = useState(null);
  const [apiExecutionLoader, setApiExecutionLoader] = useState(false);
  const[redirectionLinkLoader, setRedirectionLinkLoader] = useState(false);
  const[applicationPopup ,setApplicationPopup] = useState(false);
  var json = null;
  const [otpVerifyLoader, setOtpVerifyLoader] = useState(false);
  const [lastname, setLastname] = useState(null);
  const [firstName, setFirstName] = useState(null);

  const [rejectionPage,setRejectionPage] = useState(false);

  // useEffect(() => {
  //   // Initialize refs array with refs to each OTP input field
  //   otpInputRefs.current = otpInputs.map(
  //     (_, i) => otpInputRefs.current[i] || React.createRef()
  //   );
  // }, [otpInputs]);

  // Debounced version of the onChange function
  const handlePanChange = debounce((value) => {
    setFormData({ ...formData, pan: value });
    if (formErrors.pan) {
      setFormErrors({ ...formErrors, pan: "" });
    }
  }, 150); // Adjust debounce time (ms)

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
    handlePanChange(value); // Call the debounced function
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'fullname') {
      // Remove non-alphabetical characters except spaces
      const sanitizedValue = value.replace(/[^a-zA-Z\s]/g, '');
      const nameParts = sanitizedValue.trim().split(' ');
      const fname = nameParts.length > 0 ? nameParts[0] : '';
      const surname = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
  
      setLastname(surname);
      setFirstName(fname);
  
      // Validate name
      if (sanitizedValue.trim() === '') {
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
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // updateProgress();
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
      profession: "",
      paymentType: "",
      monthlyIncome: "",
      pan: "",
    };

    if (!formData.fullname) errors.fullname = 'Name is required';

    // Mobile Number validation
    if (!formData.mobileNumber.trim()) {
      errors.mobileNumber = "Mobile Number is required";
      valid = false;
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber.trim())) {
      errors.mobileNumber =
        "Mobile Number should start with 6 to 9 digit";
      valid = false;
    }

    // Profession validation
    if (!formData.profession.trim()) {
      errors.profession = "Profession is required";
      valid = false;
    }

    if (!formData.paymentType) {
        errors.paymentType = "Payment type is required";
        valid = false;
      }
  
    if (!formData.monthlyIncome) errors.monthlyIncome = 'Monthly income is required';

     // PAN validation with regex
  if (!formData.pan) {
    errors.pan = "PAN is required";
    valid = false;
  } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan.trim())) {
    // PAN format validation (5 letters, 4 digits, 1 letter)
    errors.pan = "PAN should be in the format: AAAAA9999A";
    valid = false;
  }


    setFormErrors(errors);
    return valid;
  };


  // const handleCloseOTPModal = () => {
  //   setShowOTPModal(false);
  //   // Clear OTP inputs when modal is closed
  //   setOtpInputs(["", "", "", "", "", ""]);
  // };

  const handleDataLayerStage = (stage) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'stage': stage});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleFormSubmit(e);
    }
  };

  const [upotp, setUpOtp] = useState(""); // OTP value input from the user
 

  const handleNextClick = () => {
    // Check if the form is valid before showing the OTP bottom sheet
    if (validateForm()) {
      // Show OTP Bottom Sheet if the form is valid
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
      formData1.append("profession", formData.profession);
      formData1.append("income",formData.monthlyIncome);
      formData1.append("paymentType",formData.paymentType);
      formData1.append("pan",formData.pan);
      formData1.append("dsa", dsa);
      formData1.append("channel", channel);
      formData1.append("source", source);
      formData1.append("sub_source", subSource);
      formData1.append("campaign", urllink);
      formData1.append("sub_dsa", subDsa);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}chfronetendotpgenerator_PlApplyNew`,
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

 
  
  // const handleOtpInputChange = (index, value) => {
  //   // Update the OTP inputs state with the current input value
  //   const updatedOtpInputs = [...otpInputs];
  //   updatedOtpInputs[index] = value;
  //   setOtpInputs(updatedOtpInputs);

  //   // Always move cursor to the end of the current input field after any change
  //   otpInputRefs.current[index].current.setSelectionRange(
  //     value.length,
  //     value.length
  //   );

  //   // Handle automatic focus based on user input
  //   if (value === "") {
  //     // If the current input is deleted, focus on the previous OTP input field if available
  //     if (index > 0) {
  //       // Use setTimeout to ensure the focus happens after the deletion event
  //       setTimeout(() => {
  //         otpInputRefs.current[index - 1].current.focus();
  //         // Move cursor to the end of the previous input field after focusing
  //         otpInputRefs.current[index - 1].current.setSelectionRange(
  //           otpInputs[index - 1].length, // Move cursor to the end of the previous input
  //           otpInputs[index - 1].length
  //         );
  //       }, 0);
  //     }
  //   } else {
  //     // If the current input is not empty, move focus to the next OTP input field if available
  //     if (index < otpInputs.length - 1) {
  //       otpInputRefs.current[index + 1].current.focus();
  //     }
  //   }
  // };
  
//   const toggleVisibility = () => {
//     setIsVisible(!isVisible);
// };

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
      setOtpLoader(false);
      // setResidentialPincodeFlag(response.data.code === 0 || response.data.code === 2);
      if(response.data.obj.dob === "" || response.data.obj.dob === null){
        setDobFlag(true);
      }if(response.data.obj.pincode === "" || response.data.obj.pincode === null){
        setResidentialPincodeFlag(true);
      }if(response.data.obj.gender === "" || response.data.obj.gender === null){
        setGenderFlag(true);
      }if(response.data.obj.address1 === "" || response.data.obj.address1 === null){
        setAddressFlag(true);
      }
      // setGenderFlag(true);
      // setAddressFlag(true);
      // Close the OTP Bottom Sheet only when the OTP is correct
      setIsOtpBottomSheetVisible(false); 

      if (formData.profession === "Salaried") {
        setActiveContainer("NewPlPage2"); // Display NewPlPage2 if salaried
      } else {
        setActiveContainer("NewPlApplyDS"); // Display NewPlApplyDS if self-employed
      }
    } else {
      setOtpLoader(false);
      setOtpStatus("Incorrect OTP! Try Again..");
      console.log("Otp incorrect");
      setOtpInputs(["", "", "", "", "", ""]);
    }

  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

const getLendersList = async (e) => {
  setIsLoading(true);

  e.preventDefault();
  try {

      const formData1 = new FormData();
      formData1.append('mobilenumber', formData.mobileNumber);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}lenderslistnew`, formData1, {
          headers: {
              'Content-Type': 'application/json',
              'token': 'Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=' // Add your token here
          }
      });

      setTimeout(() => {
          setIsLoading(false);
      }, 3000);

      if (response.data.code === 200) {
          json = response.data.data;
          setLenderDetails(json);

          // // setShowAddInfo(false);
          // setShowLendersList(true);
          setActiveContainer("LendersList");
      }

      if (response.status === 200) {

      } else {
          console.error('Submission failed:', response.statusText);
      }
  } catch (error) {
      console.error('Error submitting form:', error);
  }
}; 

const redirectLinkMethod=(lenderProduct,applicationLink)=>{                        
  console.log("Lender Product Is :::::: ",lenderProduct);
  console.log("Application LInk is :::::::: ",applicationLink);
  setCpi(1);//HERE WE SET THE CPI to see if we have to redirect the user or to hit the api if cpi is 1 then we will set the redirection link else we will hit the api
  console.log("Inside the redirect link method");
  localStorage.setItem('applicationLink', applicationLink);
  handleDataLayerStage(4);
  apiExecutionBackend(lenderProduct, 1);
  // if(formData.occupation === "Salaried"){
  //   handleDataLayerStage(3); // Track step 2 when the form is submitted
  //   setActiveContainer("forSalaried");
  // }else{
  //   setActiveContainer("forSelfEmployed");
  //   handleDataLayerStage(3);
  // }
  

}
  

  const handleMobileNumberChange = (e) => {
    // Remove any non-digit characters from the input value
    const value = e.target.value.replace(/\D/g, "").slice(0, 10); // Keep only the first 10 digits
    setFormData({ ...formData, mobileNumber: value });

    // Clear error message when user starts typing valid input
    if (formErrors.mobileNumber) {
      setFormErrors({ ...formErrors, mobileNumber: "" });
    }
  };

  
  function handleDataLayerStart(flag,mobile_number, emptype) {
    console.log("INside handledatalayer , ",flag, mobile_number, emptype);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'mobileNumber' : mobile_number, 'flag':flag, 'employmentType': emptype  });
  }

  const getLoanBackendMethod=(e, lenderProduct)=>{

    setCpi(0);
    setLenderProduct(lenderProduct);
    handleDataLayerStage(4); // Track step 2 when the form is submitted
    // setActiveContainer("forSalaried");
    apiExecutionBackend(lenderProduct, 0);
    // if(formData.occupation === "Salaried"){
    //   getLendersList(e)
    //   setActiveContainer("forSalaried");
    // }else{
    //   setActiveContainer("forSelfEmployed");
    // }

  }

  const apiExecutionBackend = async (productname, lenderCpi) => {

    console.log(productname);
  
    // If lenderCpi is 1, redirect to lender.applicationlink

    console.log(cpi);

    if (lenderCpi === 1) {
      setRedirectionLinkLoader(true);
      const timer = setTimeout(() => {
        // setRedirectionLinkLoader(false);
        const lenderApplicationLink = localStorage.getItem('applicationLink');
        window.location.href = lenderApplicationLink;
        // window.location.href = lenderApplicationLink;
      }, 3000);
        
        // setRedirectionLinkLoader(false);
        // return; // Exit the function to avoid further execution
    }else{
      console.log("Inside get Loan Backend");
    // e.preventDefault();

    setApiExecutionLoader(true);

    console.log("Inside get Loan Backend");

    try {
      const formData1 = new FormData();
      formData1.append('mobilenumber', formData.mobileNumber);
      formData1.append('product', productname);

      // setlenderName(productname);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}apiExecution_bl_apply_prime_master`, formData1, {
        headers: {
          'Content-Type': 'application/json',
          'token': 'Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=' // Add your token here
        }
      });

      if (response.data.code === 0) {
        console.log("Inside get Loan Backend when code is 0");
        // setIsCameFromBackend(true);
        setApplicationPopup(true);
        const timer = setTimeout(() => {
          setApiExecutionLoader(false);
        }, 3000);
        var redirectionlink = response.data.data.lender_details[0].applicationlink;
        setLink(redirectionlink);
        // {!setIsLoading && <ApplicationPopup link={link}/>}
      }
      else if (response.data.code === -1) {
        console.log(-1);
        // setErrorPopup(true);
        setRejectionPage(true);
        const timer = setTimeout(() => {
          setApiExecutionLoader(false);
        }, 3000);

        // setErrorPopup(true); //This will be true when the code will be -1
      } else {
        const timer = setTimeout(() => {
          setApiExecutionLoader(false);
        }, 3000);
      }

      console.log("for partner page", response);

    } catch (error) {

    }
    }

    
  };


  const [otpLoader, setOtpLoader] = useState(false);

  // State for progress calculation
  const [progress, setProgress] = useState(0);

  // Function to handle form field changes
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Calculate the completion percentage whenever formData changes
  useEffect(() => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(value => value !== '').length;
    const completionPercentage = (filledFields / totalFields) * 100;

    setProgress(completionPercentage);
  }, [formData]);

  return (
    <>
    {
      rejectionPage && <RejectionPage lenderName={lenderProduct} />
    }
     {
      errorPopup && <ErrorPopup lenderName={lenderProduct} formData={formData} setErrorPopup={setErrorPopup} />
    }
    {
  applicationPopup && <ApplicationPopup link={link}/>
}

      {
      apiExecutionLoader && <ApplicationLoader/>
    }
      {
      redirectionLinkLoader && <RedirectionLoader/>
    }

      {
        isLoading && <Loader/>
      }
      {
        activeContainer === "LendersList" && !rejectionPage &&
        // <LendersList companies={lenderDetails} formData={formData} redirectLinkMethod={redirectLinkMethod} getLoanBackendMethod={getLoanBackendMethod}/> 
        <NewBlListPage companies={lenderDetails} formData={formData} redirectLinkMethod={redirectLinkMethod} getLoanBackendMethod={getLoanBackendMethod}  />
      }
      {
        activeContainer === "NewPlApplyDS" &&
        <NewPlApplyDS cpi={cpi} lenderProduct={lenderProduct} mainFormData={formData} dobFlag={dobFlag} residentialPincodeFlag={residentialPincodeFlag} genderFlag={genderFlag} addressFlag={addressFlag} setActiveContainer={setActiveContainer} getLendersList={getLendersList} />
      }

      {
        activeContainer === "NewPlPage2" &&
        <NewPlPage2 cpi={cpi} lenderProduct={lenderProduct} mainFormData={formData} dobFlag={dobFlag} residentialPincodeFlag={residentialPincodeFlag} genderFlag={genderFlag} addressFlag={addressFlag} setActiveContainer={setActiveContainer} getLendersList={getLendersList} />
      }
   {isVisible && <OTPBottomSheet isVisible={isVisible} verifyOTP={verifyOTP} upotp={upotp} otpStatus={otpStatus} setUpOtp={setUpOtp} />}
   {
  activeContainer === "newplfirstpage" && (
    <div className={`${roboto.className} page-container`}>
      <div className="carousel-background">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
      <div className="newfirstcard-container" style={{ boxSizing: 'content-box' }}>
      <div className="progress-bar-container">
            <div className="progress-bar">
            <div className="step-number">1</div>
              <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="progress-bar">
            <div className="step-number">2</div>
              <div className="progress-bar-fill" style={{ width: '0%' }}></div>
            </div>
          </div>
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
    <span className="error" style={{ position: 'absolute', top: '100%', left: 0 }}>
      {formErrors.fullname}
    </span>
  )}
</div>

{/* Mobile Number Field */}
<div className={styles.formGroup} style={{ position: 'relative' }}>
  <input
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
    <span className="error" style={{ position: 'absolute', top: '100%', left: 0 }}>
      {formErrors.mobileNumber}
    </span>
  )}
</div>

{/* Profession Field */}
<div className={styles.formGroup} style={{ position: 'relative' }}>
  <select
    id="profession"
    name="profession"
    value={formData.profession}
    className={styles.input}
    onChange={(e) => {
      setFormData({ ...formData, profession: e.target.value });
      setFormErrors({ ...formErrors, profession: "" }); // Clear profession error on change
    }}
    onBlur={(e) =>
      setFormErrors({
        ...formErrors,
        profession: e.target.value
          ? ""
          : "Employment type is required",
      })
    }
  >
    <option value="NA">Occupation</option>
    <option value="Salaried">Salaried</option>
    <option value="Self employed">Self employed</option>
    <option value="Other">Other</option>
  </select>
  {formErrors.profession && (
    <span className="error" style={{ position: 'absolute', top: '100%', left: 0 }}>
      {formErrors.profession}
    </span>
  )}
</div>

{/* Monthly Income Field */}
<div className={styles.formGroup} style={{ position: 'relative' }}>
  <input
    type="number"
    id="monthlyIncome"
    name="monthlyIncome"
    placeholder="Monthly income"
    value={formData.monthlyIncome}
    inputMode="numeric"
    className={styles.input}
    onChange={(e) => {
      const value = e.target.value.replace(/\D/g, ""); // Allow only digits
      setFormData({ ...formData, monthlyIncome: value });
      if (formErrors.monthlyIncome) {
        setFormErrors({ ...formErrors, monthlyIncome: "" });
      }
    }}
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
     <FaRupeeSign />
  </span>
  {formErrors.monthlyIncome && (
    <span className="error" style={{ position: 'absolute', top: '100%', left: 0 }}>
      {formErrors.monthlyIncome}
    </span>
  )}
</div>

{/* Payment Type Field */}
<div className={styles.formGroup} style={{ position: 'relative' }}>
  <select
    id="paymentType"
    name="paymentType"
    value={formData.paymentType}
    className={styles.input}
    onChange={(e) => {
      setFormData({ ...formData, paymentType: e.target.value });
      setFormErrors({ ...formErrors, paymentType: "" }); // Clear profession error on change
    }}
    onBlur={(e) =>
      setFormErrors({
        ...formErrors,
        paymentType: e.target.value
          ? ""
          : "Income mode is required",
      })
    }
  >
    <option value="NA">Payment type</option>
    <option value="2">Bank transfer</option>
    <option value="1">Cheque</option>
    <option value="0">Cash</option>
  </select>
  {formErrors.paymentType && (
    <span className="error" style={{ position: 'absolute', top: '100%', left: 0 }}>
      {formErrors.paymentType}
    </span>
  )}
</div>

<div className={styles.formGroup} style={{ position: 'relative' }}>
      <input
        type="text"
        id="pan"
        name="pan"
        placeholder="Enter PAN"
        value={formData.pan}
        className={styles.input}
        onChange={handleInputChange}
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
        <span className="error" style={{ position: 'absolute', top: '100%', left: 0, marginTop: '5px' }}>
          {formErrors.pan}
        </span>
      )}
    </div>


          <div className={styles.formGroup}>
            <label>
              {/* <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  setErrors((prevErrors) => ({ ...prevErrors, consent: "" }));
                }}
              /> */}
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
              {/* <input
                type="checkbox"
                checked={terms}
                onChange={(e) => {
                  setTerms(e.target.checked);
                  setErrors((prevErrors) => ({ ...prevErrors, terms: "" }));
                }}
              /> */}
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

export default NewPlPage;
