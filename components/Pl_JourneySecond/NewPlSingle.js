"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import "./NewPlSingle.css"; // Import the CSS module from the same directory
import styles from "../NewBlJourneyD/NewBlFirstFormPage.module.css";
import { Roboto } from "@next/font/google";
// import NewNavBar from "../../components/NewPersonalLoan/Other Components/Navbar";
// import SmartCoinFooter from "../SmartCoin/SmartCoinFooter";
import BLApplyLenders from "../BLApplyPrimeThirdJourney/BLApplyLenders";
import axios from "axios";
// import otpimage from "./BLApplyImages/otpimage.jpeg";
import LendersList from "../BLApplyPrimeThirdJourney/LendersList";
import Loader from "../BLApplyPrimeThirdJourney/LendersLoader";
import OtpVerifyLoader from "../BLApplyPrimeThirdJourney/OtpVerifyLoader";
// import ForSelfEmployed from './ForSelfEmployed';
// import ForSalaried from "./ForSalaried";
// import ApplicationPopup from "../../components/BLApplyPrime/ApplicationPopup";
import ApplicationLoader from "../BLApplyPrimeThirdJourney/ApplicationLoader";
import RedirectionLoader from "../BLApplyPrimeThirdJourney/RedirectionLoader";
import ApplicationPopup from "../BLApplyPrimeThirdJourney/ApplicationPopup";
import ErrorPopup from "../BLApplyPrimeThirdJourney/ErrorPopup";
// import listimage1 from "../P/Newplimages/newchange11.png";
import listimage1 from "../Pl_JourneySecond/Newplimages/finalimage2.png";
import listimage2 from "../Pl_JourneySecond/Newplimages/finalimage3.png";
import listimage3 from "../Pl_JourneySecond/Newplimages/plimage3.png";
import EmblaCarousel from "../NewBlJourneyD/Emblacarousel/js/EmblaCarousel";
import OTPBottomSheet from '../NewPlOtpBottomSheet/PlOTPBottomSheet';
import { FaPhone } from "react-icons/fa";
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

export default function NewPlSingle() {
  const [formData, setFormData] = useState({
    pan: "",
    mobileNumber: "",
    // occupation: '',
    // monthlyincome: '',
    // profession: '',
    // PaymentType: ''
  });

  const [otpModal, setOtpModal] = useState(false);
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
  const otpInputRefs = useRef([]);
  const [otpStatus, setOtpStatus] = useState("");

  const [formErrors, setFormErrors] = useState({});
  const [progress, setProgress] = useState(0); // New state for tracking progress
  const router = useRouter(); // Initialize useRouter

  const [stgOneHitId, setStgOneHitId] = useState(null);
  const [stgTwoHitId, setstgTwoHitId] = useState(null);
  const [t_experian_log_id, sett_experian_log_id] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [lenderDetails, setLenderDetails] = useState(null);
  var json = null;
  const [otpLoader, setOtpLoader] = useState(false);
  const [cpi, setCpi] = useState(0);
  const [lenderProduct, setLenderProduct] = useState(null);

  const [lastname, setLastname] = useState(null);
  const [firstName, setFirstName] = useState(null);

  const [dobFlag, setDobFlag] = useState(false);
  const [residentialPincodeFlag, setResidentialPincodeFlag] = useState(false);
  const [apiExecutionLoader, setApiExecutionLoader] = useState(false);
  const [redirectionLinkLoader, setRedirectionLinkLoader] = useState(false);

  const [errorPopup, setErrorPopup] = useState(false);
  const [applicationPopup, setApplicationPopup] = useState(false);
  const [link, setLink] = useState(null);

  const formRef = useRef(null);
  const [showFullConsent, setShowFullConsent] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [isOtpBottomSheetVisible, setIsOtpBottomSheetVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [upotp, setUpOtp] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when component mounts
  }, []);

  useEffect(() => {
    // Initialize refs array with refs to each OTP input field
    otpInputRefs.current = otpInputs.map(
      (_, i) => otpInputRefs.current[i] || React.createRef()
    );
  }, [otpInputs]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle Mobile Number field
    if (name === "mobileNumber") {
      // Remove all non-numeric characters
      const numericValue = value.replace(/\D/g, "");

      // Prevent input if it exceeds 10 characters
      if (numericValue.length <= 10) {
        setFormData((prevData) => ({
          ...prevData,
          mobileNumber: numericValue,
        }));

        // Validate mobile number
        if (!/^[6789]\d{9}$/.test(numericValue)) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            mobileNumber:
              "Mobile number must start with 6, 7, 8, or 9 and be 10 digits long",
          }));
        } else {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            mobileNumber: "",
          }));
        }
      }
    }

    // Handle other fields
    // if (name === 'monthlyincome') {
    //   if (/^\d+$/.test(value) || value === '') {
    //     setFormErrors(prevErrors => ({
    //       ...prevErrors,
    //       monthlyincome: ''
    //     }));
    //   } else {
    //     setFormErrors(prevErrors => ({
    //       ...prevErrors,
    //       monthlyincome: 'Invalid monthly income'
    //     }));
    //   }
    // }

    // Update form data state
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    updateProgress();
  };
  const handleKeyDown = (e) => {
    if (e.target.name === "pan" && !/^[a-zA-Z\s]*$/.test(e.key)) {
      e.preventDefault(); // Prevent input if the key is not a letter or space
    }
  };

  const handleOtpInputChange = (index, value) => {
    // Update the OTP inputs state with the current input value
    const updatedOtpInputs = [...otpInputs];
    updatedOtpInputs[index] = value;
    setOtpInputs(updatedOtpInputs);

    // Always move cursor to the end of the current input field after any change
    otpInputRefs.current[index].current.setSelectionRange(
      value.length,
      value.length
    );

    // Handle automatic focus based on user input
    if (value === "") {
      // If the current input is deleted, focus on the previous OTP input field if available
      if (index > 0) {
        // Use setTimeout to ensure the focus happens after the deletion event
        setTimeout(() => {
          otpInputRefs.current[index - 1].current.focus();
          // Move cursor to the end of the previous input field after focusing
          otpInputRefs.current[index - 1].current.setSelectionRange(
            otpInputs[index - 1].length, // Move cursor to the end of the previous input
            otpInputs[index - 1].length
          );
        }, 0);
      }
    } else {
      // If the current input is not empty, move focus to the next OTP input field if available
      if (index < otpInputs.length - 1) {
        otpInputRefs.current[index + 1].current.focus();
      }
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.mobileNumber)
      errors.mobileNumber = "Mobile number is required";
    else if (!/^[6789]\d{9}$/.test(formData.mobileNumber))
      errors.mobileNumber =
        "Mobile number must start with 6, 7, 8, or 9 and be 10 digits long";

    // if (!formData.occupation) errors.occupation = 'Occupation is required';
    // if (!formData.monthlyincome) errors.monthlyincome = 'Monthly income is required';
    // else if (!/^\d+$/.test(formData.monthlyincome)) errors.monthlyincome = 'Invalid monthly income';

    // if (!formData.PaymentType) errors.PaymentType = 'Payment type is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const updateProgress = () => {
    let completedFields = 0;
    const totalFields = 2;

    Object.values(formData).forEach((value) => {
      if (value) completedFields++;
    });

    // Calculate progress and cap it at 50%
    const progressPercentage = (completedFields / totalFields) * 100;
    setProgress(Math.min(progressPercentage, 90));
  };

  const [activeContainer, setActiveContainer] = useState("FirstPage");

  // ......................................steps count code---------------------------------------

  const handleDataLayerStage = (stage) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ stage: stage });
  };

  const handleMobileNumberChange = async (e) => {
    // Remove any non-digit characters from the input value
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData({ ...formData, mobileNumber: value });

    // Clear error message when user starts typing valid input
    if (formErrors.mobileNumber) {
      setFormErrors({ ...formErrors, mobileNumber: "" });
    }

    // Check if mobile number is valid (10 digits starting with 6,7,8,9)
    if (/^[6789]\d{9}$/.test(value)) {
      try {
        // Create proper form data
        const queryParams = new URLSearchParams(location.search);
        const channel = queryParams.get("channel") || "";
        const dsa = queryParams.get("dsa") || "";
        const source = queryParams.get("source") || "";
        const subSource = queryParams.get("sub_source") || "";
        const subDsa = queryParams.get("sub_dsa") || "";
        const urllink = location.search?.split("?")[1] || "null";

        const formData1 = new FormData();
        formData1.append("userPhoneNumber", value); // Use value instead of formData
        formData1.append("dsa", dsa);
        formData1.append("channel", channel);
        formData1.append("source", source);
        formData1.append("sub_source", subSource);
        formData1.append("campaign", urllink);
        formData1.append("sub_dsa", subDsa);

        // Make API call
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}chfronetendotpgenerator_PlApplySingle`,
          formData1
        );
        setIsOtpBottomSheetVisible(true);

        console.log("OTP response:", response);

        if (response.data.code === 0) {
          setStgOneHitId(response.data.obj.stgOneHitId);
          setstgTwoHitId(response.data.obj.stgTwoHitId);
          sett_experian_log_id(response.data.obj.t_experian_log_id);
          handleDataLayerStart(response.data.obj.user_exist, value);
          setIsOtpBottomSheetVisible(true);
          setOtpModal(true);
        } else if (response.data.code === -1) {
          window.location.href =
            "https://app.credithaat.com/personal_loan_listing_journey";
        }
      } catch (error) {
        console.error("Error generating OTP:", error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      handleDataLayerStage(1); // Track step 2 when the form is submitted

      setOtpModal(true);

      handleFormSubmit(e);
    }
  };

  //const handleFormSubmit = async (e) => {
  //console.log("Inside this function 1");
  //e.preventDefault();

  const handleFormSubmit = async (e) => {
    console.log("Inside this function 1");

    e.preventDefault();

    function handleDataLayerStart(flag, mobile_number) {
      console.log("INside handledatalayer , ", flag, mobile_number);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ mobileNumber: mobile_number, flag: flag });
    }

    console.log("Inside this function");
    // try {
    //   const queryParams = new URLSearchParams(location.search);

    //   // Retrieve values for the specified parameters
    //   const channel = queryParams.get("channel") || "";
    //   const dsa = queryParams.get("dsa") || "";
    //   const source = queryParams.get("source") || "";
    //   const subSource = queryParams.get("sub_source") || "";
    //   const subDsa = queryParams.get("sub_dsa") || "";

    //   const urllink = location.search?.split("?")[1] || "null";

    //   const formData1 = new FormData();
    //   formData1.append("userPhoneNumber", formData.mobileNumber);
    //   formData1.append("dsa", dsa);
    //   formData1.append("channel", channel);
    //   formData1.append("source", source);
    //   formData1.append("sub_source", subSource);
    //   formData1.append("campaign", urllink);
    //   formData1.append("sub_dsa", subDsa);

      // const response = await axios.post(`${process.env.REACT_APP_BASE_URL}chfronetendotpgenerator`, formData1, {
      //     headers: {
      //         'Content-Type': 'application/json',
      //     },
      // });

      // const response = await axios.post(
      //   `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}chfronetendotpgenerator_PlApplySingle`,
      //   formData1
      // );

      // console.log("response from backend is : ", response);

      // if (response.data.code === -1) {
      //   console.error("response is null");
      //   window.location.href =
      //     "https://app.credithaat.com/personal_loan_listing_journey";
      // }

      // if (response.data.code === 0) {
      //   setStgOneHitId(response.data.obj.stgOneHitId);
      //   setstgTwoHitId(response.data.obj.stgTwoHitId);
      //   sett_experian_log_id(response.data.obj.t_experian_log_id);

      //   console.log("Before handleDataLayerStart");

      //   handleDataLayerStart(
      //     response.data.obj.user_exist,
      //     formData.mobileNumber
      //   );

        console.log("After handleDataLayerStart");
      // }

      // if (response.status === 200) {
      // } else {
      //   console.error("Submission failed:", response.statusText);
      // }
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    // }
  };

  const handleCloseOTPModal = () => {
    setOtpModal(false);
    setOtpInputs(["", "", "", "", "", ""]);
  };

  const handleVerifyOTP = (e) => {
    verify_otp_credithaat_from_backend(e);
  };

  const verify_otp_credithaat_from_backend = async (e) => {
    setOtpLoader(true);
    try {
      const formData1 = new FormData();
      formData1.append("mobileNumber", formData.mobileNumber);
      formData1.append("otp", upotp);
      formData1.append("stgOneHitId", stgOneHitId);
      formData1.append("stgTwoHitId", stgTwoHitId);
      formData1.append("t_experian_log_id", t_experian_log_id);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}verifyOTPNewPersonalloan`,
        formData1
      );

      if (response.data.code === 0) {
        // setDobFlag(false);
        // setResidentialPincodeFlag(false);
        setOtpStatus("");
        setOtpLoader(false);
        window.location.href = `https://app.credithaat.com/embedded_journey?sso=yes&mobilenumber=${formData.mobileNumber}&sso=yes&chaid=true`;
        // setActiveContainer("LendersList");
        // getLendersList(e);
        handleDataLayerStage(2);
        // if(formData.occupation === "Salaried"){
        //   setActiveContainer("forSalaried");
        //   window.location.href = lenderApplicationLink;
        // }else{
        //   setActiveContainer("forSelfEmployed");
        // }

        // setActiveContainer("")
        // setOtpModal(false);
      } else if (response.data.code === 1) {
        // setDobFlag(true);
        // setResidentialPincodeFlag(false);
        setOtpStatus("");
        setOtpLoader(false);
        // setActiveContainer("LendersList");
        // getLendersList(e);
        window.location.href = `https://app.credithaat.com/embedded_journey?sso=yes&mobilenumber=${formData.mobileNumber}&sso=yes&chaid=true`;
        handleDataLayerStage(2);
      } else if (response.data.code === 2) {
        setDobFlag(false);
        setResidentialPincodeFlag(true);
        setOtpStatus("");
        setOtpLoader(false);
        // setActiveContainer("LendersList");
        getLendersList(e);
        window.location.href = `https://app.credithaat.com/embedded_journey?sso=yes&mobilenumber=${formData.mobileNumber}&sso=yes&chaid=true`;
        handleDataLayerStage(2);
      } else if (response.data.code === 3) {
        setDobFlag(true);
        setResidentialPincodeFlag(true);
        setOtpStatus("");
        setOtpLoader(false);
        // setActiveContainer("LendersList");
        getLendersList(e);
        window.location.href =`https://app.credithaat.com/embedded_journey?sso=yes&mobilenumber=${formData.mobileNumber}&sso=yes&chaid=true`;
        handleDataLayerStage(2);
      } else {
        setOtpStatus("Incorrect OTP! Try Again.");
        setOtpInputs(["", "", "", "", "", ""]);
        setOtpLoader(false);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const getLendersList = async (e) => {
    setIsLoading(true);

    e.preventDefault();
    try {
      const formData1 = new FormData();
      formData1.append("mobilenumber", formData.mobileNumber);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}lenderslist_blapplyprime`,
        formData1,
        {
          headers: {
            "Content-Type": "application/json",
            token: "Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=", // Add your token here
          },
        }
      );

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
        console.error("Submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const redirectLinkMethod = (lenderProduct, applicationLink) => {
    console.log("Lender Product Is :::::: ", lenderProduct);
    console.log("Application LInk is :::::::: ", applicationLink);
    setCpi(1); //HERE WE SET THE CPI to see if we have to redirect the user or to hit the api if cpi is 1 then we will set the redirection link else we will hit the api
    console.log("Inside the redirect link method");
    localStorage.setItem("applicationLink", applicationLink);
    handleDataLayerStage(4);
    apiExecutionBackend(lenderProduct, 1);
    // if(formData.occupation === "Salaried"){
    //   handleDataLayerStage(3); // Track step 2 when the form is submitted
    //   setActiveContainer("forSalaried");
    // }else{
    //   setActiveContainer("forSelfEmployed");
    //   handleDataLayerStage(3);
    // }
  };

  const getLoanBackendMethod = (e, lenderProduct) => {
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
  };

  const apiExecutionBackend = async (productname, lenderCpi) => {
    console.log(productname);

    // If lenderCpi is 1, redirect to lender.applicationlink

    console.log(cpi);

    if (lenderCpi === 1) {
      setRedirectionLinkLoader(true);
      const timer = setTimeout(() => {
        // setRedirectionLinkLoader(false);
        const lenderApplicationLink = localStorage.getItem("applicationLink");
        window.location.href = lenderApplicationLink;
        // window.location.href = lenderApplicationLink;
      }, 3000);

      // setRedirectionLinkLoader(false);
      // return; // Exit the function to avoid further execution
    } else {
      console.log("Inside get Loan Backend");
      // e.preventDefault();

      setApiExecutionLoader(true);

      console.log("Inside get Loan Backend");

      try {
        const formData1 = new FormData();
        formData1.append("mobilenumber", formData.mobileNumber);
        formData1.append("product", productname);

        // setlenderName(productname);

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}apiExecution_bl_apply_prime_master`,
          formData1,
          {
            headers: {
              "Content-Type": "application/json",
              token: "Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=", // Add your token here
            },
          }
        );

        if (response.data.code === 0) {
          console.log("Inside get Loan Backend when code is 0");
          // setIsCameFromBackend(true);
          setApplicationPopup(true);
          const timer = setTimeout(() => {
            setApiExecutionLoader(false);
          }, 3000);
          var redirectionlink =
            response.data.data.lender_details[0].applicationlink;
          setLink(redirectionlink);
          // {!setIsLoading && <ApplicationPopup link={link}/>}
        } else if (response.data.code === -1) {
          console.log(-1);
          setErrorPopup(true);
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
      } catch (error) {}
    }
  };

  return (
    <>
      {errorPopup && (
        <ErrorPopup
          lenderName={lenderProduct}
          formData={formData}
          setErrorPopup={setErrorPopup}
        />
      )}
      {applicationPopup && <ApplicationPopup link={link} />}

      {apiExecutionLoader && <ApplicationLoader />}
      {redirectionLinkLoader && <RedirectionLoader />}

      {/* {
      activeContainer !== 'LendersList' && 
      <NewNavBar />
    } */}

      {/* 
      {
        activeContainer === "forSelfEmployed" &&
        <ForSelfEmployed cpi={cpi} lenderProduct={lenderProduct} mainFormData={formData} dobFlag={dobFlag} residentialPincodeFlag={residentialPincodeFlag} setActiveContainer={setActiveContainer} getLendersList={getLendersList}/>//here we will be calling sendin this api to the next page 
      }

{
        activeContainer === "forSalaried" &&
        <ForSalaried cpi={cpi} lenderProduct={lenderProduct} mainFormData={formData} dobFlag={dobFlag} residentialPincodeFlag={residentialPincodeFlag} setActiveContainer={setActiveContainer} getLendersList={getLendersList} />
      } */}

      {isLoading && <Loader />}
      {otpLoader && <OtpVerifyLoader />}

      {/* {
        activeContainer === "BLApplyLenders" &&
        <BLApplyLenders />
      } */}

      {activeContainer === "LendersList" && (
        // <LendersList companies={lenderDetails} formData={formData} redirectLinkMethod={redirectLinkMethod} getLoanBackendMethod={getLoanBackendMethod}/>
        <BLApplyLenders
          companies={lenderDetails}
          formData={formData}
          redirectLinkMethod={redirectLinkMethod}
          getLoanBackendMethod={getLoanBackendMethod}
        />
      )}
      {isVisible && (
        <OTPBottomSheet
          isVisible={isVisible}
          verifyOTP={verifyOTP}
          upotp={upotp}
          otpStatus={otpStatus}
          setUpOtp={setUpOtp}
        />
      )}
      {activeContainer === "FirstPage" && (
        <div className={`${roboto.className} page-container`}>
          <div className="carousel-background">
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
          </div>
          <div
            className="newfirstcard-container"
            style={{ boxSizing: "content-box" }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
              {/* Mobile Number Field */}

              <div
                style={{
                  color: "#3e2780",
                  textAlign: "center",
                  fontSize: "x-large",
                }}
              >
                Quick loan upto ₹ 50 Lacs <br></br>
                <span style={{ color: "GrayText", fontSize: "medium" }}>
                  by RBI Licensed Banks & NBFCs
                </span>
              </div>

              <div
                style={{
                  textAlign: "center",
                  fontSize: "x-large",
                  marginTop: "20px",
                }}
              >
                Start application
              </div>

              <div
                className={styles.formGroup}
                style={{ position: "relative", top: "20px" }}
              >
                <label style={{ fontWeight: "bold", fontSize: "large" }}>
                  Mobile no.
                </label>
                <input
                  style={{ padding: "20px", fontSize: "large" }}
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  inputMode="numeric"
                  value={formData.mobileNumber}
                  className={styles.input}
                  onChange={handleMobileNumberChange}
                />
                <span
                  className={styles.icon}
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "64%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#00000061",
                  }}
                >
                  <FaPhone />
                </span>
                {formErrors.mobileNumber && (
                  <span
                    className="error"
                    style={{ position: "absolute", top: "100%", left: 0 }}
                  >
                    {formErrors.mobileNumber}
                  </span>
                )}
              </div>

              <div className={styles.formGroup} style={{ marginTop: "20%" }}>
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
                      You hereby consent to CreditHaat being appointed as your
                      authorized representative to receive your Credit
                      Information from Experian for the purpose of accessing
                      credit worthiness and availing pre-approved offers (“End
                      Use Purpose”). You hereby agree to Terms and Conditions. I
                      authorize CreditHaat, its partner financial
                      institutes/lenders and their representatives to Call, SMS
                      or communicate via WhatsApp regarding my application. This
                      consent overrides any registration for DNC / NDNC. I
                      confirm I am in India, I am a major and a resident of
                      India and I have read and I accept CreditHaat Privacy
                      Policy Click here to read the PRIVACY POLICY & TERMS OF
                      SERVICE
                      <span
                        onClick={() => setShowFullConsent(false)}
                        style={{
                          color: "blue",
                          cursor: "pointer",
                          textDecoration: "none",
                        }}
                      >
                        Show Less
                      </span>
                    </>
                  ) : (
                    <>
                      You hereby consent to CreditHaat being appointed as your
                      authorized representative...
                      <span
                        onClick={() => setShowFullConsent(true)}
                        style={{
                          color: "blue",
                          cursor: "pointer",
                          textDecoration: "none",
                        }}
                      >
                        Read More
                      </span>
                    </>
                  )}
                </label>
                {errors.consent && (
                  <p style={{ color: "red" }}>{errors.consent}</p>
                )}
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
                      By agreeing and accepting the terms and conditions set out
                      herein, you provide your express consent to Social Worth
                      Technologies Private Limited, Whizdm Innovations Pvt Ltd,
                      Upwards Fintech Services Pvt Ltd, Tata Capital Financial
                      Services Ltd, SmartCoin Financials Pvt Ltd, MWYN Tech Pvt
                      Ltd, L&T Finance Ltd, Krazybee Services Pvt Ltd,
                      Infocredit Services Pvt. Ltd, Incred Financial Services,
                      IIFL Finance Ltd, EQX Analytics Pvt Ltd, EPIMoney Pvt Ltd,
                      Bhanix finance and Investment LTd, Aditya Birla Finance
                      Ltd to access the credit bureaus and credit information
                      report and credit score. You also hereby irrevocably and
                      unconditionally consent to usage of such credit
                      information being provided by credit bureaus.
                      <span
                        onClick={() => setShowConsent(false)}
                        style={{
                          color: "blue",
                          cursor: "pointer",
                          textDecoration: "none",
                        }}
                      >
                        Show Less
                      </span>
                    </>
                  ) : (
                    <>
                      By agreeing and accepting the terms and conditions set out
                      herein, you provide your...
                      <span
                        onClick={() => setShowConsent(true)}
                        style={{
                          color: "blue",
                          cursor: "pointer",
                          textDecoration: "none",
                        }}
                      >
                        Read More
                      </span>
                    </>
                  )}
                </label>
                {errors.terms && <p style={{ color: "red" }}>{errors.terms}</p>}
              </div>
              <div style={{ marginBottom: "50px" }}>
                Calculation:
                <br /> CreditHaat does not charge any fees from the user.
                <br /> A sample loan calculation for ₹1,00,000 borrowed for 1
                year, with interest rate @13% per annum*, is as provided below:{" "}
                <br />
                Processing fee (@ 2%) = ₹2,000 + GST = ₹2,360
              </div>
              <div className={styles.stickyButton}>
                <button
                  type="submit"
                  className={`${styles.button} ${styles.submitButton}`}
                >
                  Next
                </button>
                {/* className={`w-full  ${styles.submitButton}`} */}
              </div>
            </form>
          </div>
        </div>
      )}

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
}
