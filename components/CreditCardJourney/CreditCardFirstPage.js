"use client";
import React, { useState, useRef, useEffect } from "react";
import "./CreditCardFirstPage.css";
import listimage1 from "./images/imgcrd1.png";
import listimage2 from "./images/imgcrd2.png";
import listimage3 from "./images/imgcrd3.png";
import styles from "../NewPlApplyD/NewPlFirstPage.module.css";
import EmblaCarousel from "../NewPlApplyD/Emblacarousel/js/EmblaCarousel";
import axios from "axios";
import CreditCardList from "./CreditCardList";
import Loader from "../NewPlApplyD/LendersLoader";
import ApplicationLoader from "../BLApplyPrimeSecondJourney/ApplicationLoader";
import RedirectionLoader from "../NewPlApplyD/RedirectionLoader";
import ApplicationPopup from "../NewPlApplyD/ApplicationPopup";
import ErrorPopup from "../NewPlApplyD/ErrorPopup";
import {
  FaUser,
  FaPhone,
  FaBuilding,
  FaMapPin,
  FaIdCard,
  FaRupeeSign,
} from "react-icons/fa"; // Importing icons for name, mobile number, profession, income, payment type, and PAN
import { Roboto } from "@next/font/google";
import OTPBottomSheet from "../NewPlOtpBottomSheet/PlOTPBottomSheet";
import RejectionPage from '../../components/NewPlRejectionPage/NewPlRejPage';

import OtpVerifyLoader from "../NewPlApplyD/OtpVerifyLoader";

import Select from "react-select";
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

const CreditCardFirstPage = ({ params, searchParams }) => {
  const [link, setLink] = useState();

  const [genderFlag, setGenderFlag] = useState(false);
  const [addressFlag, setAddressFlag] = useState(false);

  const [formErrors, setFormErrors] = useState({
    fullname: "",
    mobileNumber: "",
    profession: "",
    companyName: "",
    monthlyIncome: "",
    pincode: "",
  });

  const [formData, setFormData] = useState({
    fullname: "",
    mobileNumber: "",
    profession: "",
    companyName: "",
    monthlyIncome: "",
    pincode: "",
  });
  // const [showOTPModal, setShowOTPModal] = useState(false);
  const [activeContainer, setActiveContainer] = useState("creditcardfirstpage");
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
  const [dobFlag, setDobFlag] = useState(false);
  const [cpi, setCpi] = useState(0);
  const [lenderProduct, setLenderProduct] = useState(null);
  const [lenderDetails, setLenderDetails] = useState(null);
  const [apiExecutionLoader, setApiExecutionLoader] = useState(false);
  const [redirectionLinkLoader, setRedirectionLinkLoader] = useState(false);
  const [applicationPopup, setApplicationPopup] = useState(false);
  var json = null;
  const [otpVerifyLoader, setOtpVerifyLoader] = useState(false);
  const [lastname, setLastname] = useState(null);
  const [firstName, setFirstName] = useState(null);

  const [rejectionPage, setRejectionPage] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when component mounts
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "fullname") {
      // Remove non-alphabetical characters except spaces
      const sanitizedValue = value.replace(/[^a-zA-Z\s]/g, "");

      // Capitalize first letter of each word
      const capitalizedValue = sanitizedValue
        .split(" ") // Split the name by spaces
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ) // Capitalize first letter and make the rest lowercase
        .join(" "); // Join the words back into a single string

      // Split the capitalized value into first name and last name
      const nameParts = capitalizedValue.trim().split(" ");
      const fname = nameParts.length > 0 ? nameParts[0] : "";
      const surname =
        nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

      // Update first name and last name
      setLastname(surname);
      setFirstName(fname);

      // Validate name
      if (capitalizedValue.trim() === "") {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          fullname: "Name is required",
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          fullname: "",
        }));
      }

      // Update form data with the formatted capitalized name
      setFormData((prevData) => ({ ...prevData, [name]: capitalizedValue }));
    }
    // Optionally, you can call updateProgress() if necessary
  };
  const handleChangepin = (e) => {
    const { name, value } = e.target;

    if (name === "pincode") {
      const cleanedValue = value.replace(/\D/g, "").slice(0, 6);
      setFormData((prevData) => ({ ...prevData, pincode: cleanedValue }));

      // Error tabhi hatao jab pincode exactly 6 digits ho
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        pincode: cleanedValue.length === 6 ? "" : prevErrors.pincode,
      }));

      return;
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleChangecmp = (e) => {
    const { name, value } = e.target;

    // Profession: Hide Company Name If Not "Salaried"
    if (name === "profession") {
      setFormData((prevData) => ({ ...prevData, profession: value }));

      if (value !== "Salaried") {
        setFormData((prevData) => ({ ...prevData, companyName: "" }));
        setFormErrors((prevErrors) => ({ ...prevErrors, companyName: "" }));
      }
      return;
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleKeyDown = (e) => {
    if (e.target.name === "fullname" && !/^[a-zA-Z\s]*$/.test(e.key)) {
      e.preventDefault(); // Prevent input if the key is not a letter or space
    }
  };

  const validateForm = () => {
    let valid = true;
    const errors = {
      fullname: "",
      mobileNumber: "",
      profession: "",
      companyName: "",
      monthlyIncome: "",
      pincode: "",
    };

    if (!formData.fullname) {
      errors.fullname = "Name is required";
      valid = false;
    }

    // Mobile Number validation
    if (!formData.mobileNumber.trim()) {
      errors.mobileNumber = "Mobile Number is required";
      valid = false;
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber.trim())) {
      errors.mobileNumber = "Mobile Number should start with 6 to 9 digit";
      valid = false;
    }

    // Check profession validation again to ensure it's correct before moving forward
    if (!formData.profession || formData.profession === "NA") {
      errors.profession = "Profession is required"; // Set the error message
      valid = false;
    } else {
      errors.profession = ""; // Clear error if the profession is valid
    }
    // Company Name validation **ONLY IF** profession is "Salaried"
    if (formData.profession === "Salaried" && !formData.companyName.trim()) {
      errors.companyName = "Company Name is required";
      valid = false;
    }

    if (!formData.monthlyIncome)
      errors.monthlyIncome = "Monthly income is required";

    if (!formData.pincode.trim()) {
      errors.pincode = "Pincode is required";
      valid = false;
    } else if (
      formData.pincode.length !== 6 ||
      !/^\d{6}$/.test(formData.pincode)
    ) {
      errors.pincode = "Invalid pincode format";
      valid = false;
    }
    setFormErrors(errors);

    return valid;
  };

  const handleDataLayerStage = (stage) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ stage: stage });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("inside handle submit");
      handleFormSubmit(e);
    }
  };

  const [upotp, setUpOtp] = useState(""); // OTP value input from the user

  const handleNextClick = () => {
    setUpOtp("");
    // Check if the form is valid before showing the OTP bottom sheet
    if (validateForm()) {
      // Show OTP Bottom Sheet if the form is valid
      setIsOtpBottomSheetVisible(true);
    }
  };
/***********************************generate otp********************************** */
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
      formData1.append("income", formData.monthlyIncome);
      formData1.append("companyName", formData.companyName);
      formData1.append("pincode", formData.pincode);
      formData1.append("dsa", dsa);
      formData1.append("channel", channel);
      formData1.append("source", source);
      formData1.append("sub_source", subSource);
      formData1.append("campaign", urllink);
      formData1.append("sub_dsa", subDsa);
      console.log("formdata1 is ::", formData.mobileNumber);
      console.log("formdata1 is ::", firstName);
      console.log("formdata1 is ::", lastname);
      console.log("formdata1 is ::", formData.profession);
      console.log("formdata1 is ::", formData.monthlyIncome);
      console.log("formdata1 is ::", formData.companyName);
      console.log("formdata1 is ::", formData.pincode);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}chfronetendotpgenerator_newcreditcard`,
        formData1
      );

      if (response.data.code === 0) {
        setStgOneHitId(response.data.obj.stgOneHitId);
        setstgTwoHitId(response.data.obj.stgTwoHitId);
        sett_experian_log_id(response.data.obj.t_experian_log_id);
        handleDataLayerStart(
          response.data.obj.user_exist,
          formData.mobileNumber,
          formData.profession
        );
      }

      if (response.status === 200) {
      } else {
        console.error("Submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
/***************************Verify otp *************************************************** */
  const handleVerifyOTP = async () => {
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

      console.log("The OTP response is:", response);

      if (response.data.code === 0) {
        setOtpVerified(true);
        setOtpLoader(false);
        setIsOtpBottomSheetVisible(false);

        console.log("OTP Verified Successfully! Showing Credit Card List...");

        // Show Credit Card List After OTP Verification
        getLendersList(); // Fetch Credit Card List
      }else if(response.data.code === 1){
        setOtpVerified(true);
        setOtpLoader(false);
        setIsOtpBottomSheetVisible(false);

        console.log("OTP Verified Successfully! Showing Credit Card List...");

        // Show Credit Card List After OTP Verification
        getLendersList(); // Fetch Credit Card List
      }else if(response.data.code === 2){
        setOtpVerified(true);
        setOtpLoader(false);
        setIsOtpBottomSheetVisible(false);

        console.log("OTP Verified Successfully! Showing Credit Card List...");

        // Show Credit Card List After OTP Verification
        getLendersList(); // Fetch Credit Card List
      }else if(response.data.code === 3){
        setOtpVerified(true);
        setOtpLoader(false);
        setIsOtpBottomSheetVisible(false);

        console.log("OTP Verified Successfully! Showing Credit Card List...");

        // Show Credit Card List After OTP Verification
        getLendersList(); // Fetch Credit Card List
      } else {
        setOtpLoader(false);
        setOtpStatus("Incorrect OTP! Try Again.");
        console.log(" OTP incorrect");
        // setOtpInputs(null);
        setUpOtp("");
        setOtpInputs(["", "", "", "", "", ""]);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };
/****************use to show list of creditcards**************************** */
  const getLendersList = async () => {
    console.log("inside get lenders list");
    setIsLoading(true);
    try {
      console.log("inside api execution");

      const formData1 = new FormData();
      formData1.append("mobilenumber", formData.mobileNumber);



      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}api/newcreditcard/submit`,
        formData1,
        {
          headers: {
            "Content-Type": "application/json",
            token: "Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=",
          },
        }
      );

      setIsLoading(false);

      if (response.data.code === 200) {
        console.log(" Credit Card List Fetched Successfully!");
        setLenderDetails(response.data.data);
        setActiveContainer("LendersList"); // Show Credit Card List Page
      } else {
        console.error("Failed to fetch Credit Card List:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching Credit Card List:", error);
    }
  };


  const redirectLinkMethod = (lenderProduct, applicationLink ,product_id) => {
    console.log("Lender Product Is :::::: ", lenderProduct);
    console.log("Application LInk is :::::::: ", applicationLink);
    setCpi(1); //HERE WE SET THE CPI to see if we have to redirect the user or to hit the api if cpi is 1 then we will set the redirection link else we will hit the api
    console.log("Inside the redirect link method");
    localStorage.setItem("applicationLink", applicationLink);
    handleDataLayerStage(4);
    apiExecutionBackend(lenderProduct, 1, product_id);

  };

  const apiExecutionBackend = async (productname, lenderCpi, product_id) => {
    console.log(productname);

    console.log(cpi);

      console.log("lendercpi ", lenderCpi);
      setRedirectionLinkLoader(true);
     
      const formData1 = new FormData();
      formData1.append("phone", formData.mobileNumber);
      formData1.append("userId", 1);
      formData1.append("productId", product_id);
      formData1.append("channel", "creditHaat");
      console.log("product_id is:",product_id);

        try {
        console.log("before cpi function call");
       const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}h5/cpiCreditcardClick`, formData1);
      } catch (error) {
        console.log(error);
      }

      const timer = setTimeout(() => {
        // setRedirectionLinkLoader(false);
        const lenderApplicationLink = localStorage.getItem("applicationLink");
        window.location.href = lenderApplicationLink;
        setRedirectionLinkLoader(false);
        // window.location.href = lenderApplicationLink;
      }, 3000);
    
  };


  const nextInputRef = useRef(null);
  const companyNameRef = useRef(null);
  const [isProfessionMenuOpen, setIsProfessionMenuOpen] = useState(false);
  const monthlyIncomeRef = useRef(null); // Reference for the monthly income field
  const mobileNumberRef = useRef(null);

  const CustomOption = (props) => {
    const { data, innerRef, innerProps, selectOption, isSelected } = props;

    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          padding: "10px",
          position: "relative", // Ensures that the radio button is placed on the right side
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between", // Space between label and radio button
            alignItems: "center", // Aligns the label and radio button
          }}
        >
          <span>{data.label}</span> {/* Label on the left */}
          <input
            type="radio"
            name="profession"
            value={data.value}
            checked={isSelected}
            onChange={() => selectOption(data)} // Select option when radio button is clicked
          />
        </div>

        {/* Horizontal line below the option and radio button */}
        <hr
          style={{
            margin: "5px 0",
            border: "0",
            borderTop: "1px solid #ddd", // Optional styling for the horizontal line
            width: "100%", // Ensure the line spans the entire width
          }}
        />
      </div>
    );
  };

  // Options for profession
  const professionOptions = [
    { value: "NA", label: "Select occupation" },
    { value: "Salaried", label: "Salaried" },
    { value: "Self employed", label: "Self employed" },
    { value: "Business", label: "Business" },
  ];

  const customStyles = {
    input: (provided) => ({
      ...provided,
      padding: "8px", // Padding for input text
      // borderRadius: '10px',  // Border radius for input
      width: "100%", // Full width
      minHeight: "70px",
      border: "none", // Remove border for input itself
      cursor: "pointer",
      borderRadius: "50px",
    }),
    menu: (provided) => ({
      ...provided,
      position: "fixed", // Make the dropdown fixed relative to the viewport
      top: "50%", // Vertically center the dropdown on the screen
      left: "50%", // Horizontally center the dropdown on the screen
      transform: "translate(-50%, -50%)", // Adjust the dropdown to be exactly centered
      width: "80%", // Set the width of the dropdown (you can adjust it)
      maxWidth: "400px", // Set a max width for the dropdown
      zIndex: 9999, // Ensure the dropdown appears on top of other content
      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)", // Optional: Add shadow for a popup effect
      borderRadius: "10px",
    }),
    control: (provided) => ({
      ...provided,
      width: "100%", // Full width of the control
      borderRadius: "10px",
      minHeight: "50px",
    }),
    placeholder: (provided) => ({
      ...provided,
      padding: "12px", // Padding for placeholder text
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "0", // Optional: Adjust padding of the dropdown indicator
    }),
    indicatorSeparator: () => ({
      display: "none", // Hide the indicator separator (optional)
    }),
  };

  // Handle changes in the mobile number
  const handleMobileNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10); // Allow only 10 digits
    setFormData({ ...formData, mobileNumber: value });

    if (formErrors.mobileNumber) {
      setFormErrors({ ...formErrors, mobileNumber: "" });
    }

    if (value.length === 10) {
      // Automatically focus and open the profession dropdown when mobile number has 10 digits
      setTimeout(() => {
        if (nextInputRef.current) {
          mobileNumberRef.current.blur();
          nextInputRef.current.focus(); // Focus on the Profession field
          setIsProfessionMenuOpen(true); // Open the dropdown
        }
      }, 100); // Small delay to ensure focus is set first
    }
  };

  const handleProfessionChange = (selectedOption) => {
    setFormData({ ...formData, profession: selectedOption.value });

    // Only clear the error if a valid profession is selected (not 'NA')
    if (selectedOption.value !== "NA") {
      setFormErrors({ ...formErrors, profession: "" }); // Clear error for valid option
    } else {
      setFormErrors({ ...formErrors, profession: "Profession is required" }); // Show error if 'NA' is selected
    }

    setIsProfessionMenuOpen(false); // Close the profession dropdown

    // Automatically focus on the monthly income field after selection
    if (monthlyIncomeRef.current) {
      monthlyIncomeRef.current.focus();
    }
  };

  // Handle profession field interactions
  const handleProfessionFocus = () => {
    setIsProfessionMenuOpen(true); // Open dropdown menu
  };

  const handleProfessionBlur = () => {
    setIsProfessionMenuOpen(false); // Close dropdown menu when focus leaves
  };

  const handleProfessionClick = (e) => {
    e.stopPropagation(); // Prevent the keyboard from opening when clicking on the profession field
    setIsProfessionMenuOpen(true); // Open dropdown menu
  };

  function handleDataLayerStart(flag, mobile_number, emptype) {
    console.log("INside handledatalayer , ", flag, mobile_number, emptype);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      mobileNumber: mobile_number,
      flag: flag,
      employmentType: emptype,
    });
  }

  const [otpLoader, setOtpLoader] = useState(false);

  return (
    <>
        {
      rejectionPage && <RejectionPage lenderName={lenderProduct} />
    }
      {apiExecutionLoader && <ApplicationLoader />}
      {redirectionLinkLoader && <RedirectionLoader />}

      {isLoading && <Loader />}
      {otpLoader && <OtpVerifyLoader />}
      {activeContainer === "LendersList" && !rejectionPage &&(
        <CreditCardList
          companies={lenderDetails}
          formData={formData}
          redirectLinkMethod={redirectLinkMethod}
          // getLoanBackendMethod={getLoanBackendMethod}
        />
      )}

      {/* {
        activeContainer === "LendersList" &&
        // <LendersList companies={lenderDetails} formData={formData} redirectLinkMethod={redirectLinkMethod} getLoanBackendMethod={getLoanBackendMethod}/> 
        <CreditCardList companies={lenderDetails} formData={formData} redirectLinkMethod={redirectLinkMethod} getLoanBackendMethod={getLoanBackendMethod}  />
      } */}
      {isVisible && (
        <OTPBottomSheet
          isVisible={isVisible}
          verifyOTP={verifyOTP}
          upotp={upotp}
          otpStatus={otpStatus}
          setUpOtp={setUpOtp}
        />
      )}
      {activeContainer === "creditcardfirstpage" && (
        <div className={`${roboto.className} page-container`}>
          <div className="carousel-background">
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
          </div>
          <div
            className="newfirstcard-container"
            style={{ boxSizing: "content-box" }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
              {/* First Name Field */}
              <div
                className={styles.formGroup}
                style={{ position: "relative" }}
              >
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
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#00000061",
                  }}
                >
                  <FaUser />
                </span>
                {formErrors.fullname && (
                  <span
                    className="error"
                    style={{ position: "absolute", top: "100%", left: 0 }}
                  >
                    {formErrors.fullname}
                  </span>
                )}
              </div>

              <div>
                {/* Mobile Number Field */}
                <div
                  className={styles.formGroup}
                  style={{ position: "relative" }}
                >
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
                      position: "absolute",
                      right: "15px",
                      top: "50%",
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

                <div
                  className={styles.formGroup}
                  style={{ position: "relative" }}
                >
                  <Select
                    id="profession"
                    name="profession"
                    value={professionOptions.find(
                      (option) => option.value === formData.profession
                    )}
                    options={professionOptions}
                    ref={nextInputRef}
                    onChange={handleProfessionChange}
                    styles={customStyles}
                    placeholder="Select occupation"
                    menuIsOpen={isProfessionMenuOpen} // Use isProfessionMenuOpen state
                    onFocus={handleProfessionFocus} // Open dropdown when focused
                    onBlur={handleProfessionBlur} // Close dropdown when blurred
                    onClick={handleProfessionClick} // Prevent keyboard opening when clicked
                    isSearchable={false} // Prevent searching in the dropdown
                    menuPosition="absolute" // Position relative to the viewport
                    components={{ Option: CustomOption }} // Use the custom option component
                  />
                  {formErrors.profession && (
                    <span
                      className="error"
                      style={{ position: "absolute", top: "100%", left: 0 }}
                    >
                      {formErrors.profession}
                    </span>
                  )}
                </div>
              </div>

              {/* Monthly Income Field */}
              <div
                className={styles.formGroup}
                style={{ position: "relative" }}
              >
                <input
                  type="number"
                  id="monthlyIncome"
                  name="monthlyIncome"
                  placeholder="Monthly income"
                  value={formData.monthlyIncome}
                  inputMode="numeric"
                  className={styles.input}
                  ref={monthlyIncomeRef}
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
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#00000061",
                  }}
                >
                  <FaRupeeSign />
                </span>
                {formErrors.monthlyIncome && (
                  <span
                    className="error"
                    style={{ position: "absolute", top: "100%", left: 0 }}
                  >
                    {formErrors.monthlyIncome}
                  </span>
                )}
              </div>

              {/* Pincode Field */}
              <div
                className={styles.formGroup}
                style={{ position: "relative" }}
              >
                <input
                  type="text"
                  name="pincode"
                  placeholder="Enter Pincode"
                  value={formData.pincode}
                  className={styles.input}
                  onChange={handleChangepin}
                />
                <span
                  className={styles.icon}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    color: "#00000061",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  <FaMapPin /> {/* Map pin (location) icon */}
                </span>
                {formErrors.pincode && (
                  <span
                    className="error"
                    style={{ position: "absolute", top: "100%", left: 0 }}
                  >
                    {formErrors.pincode}
                  </span>
                )}
              </div>
              {formData.profession === "Salaried" && (
                <div
                  className={styles.formGroup}
                  style={{ position: "relative" }}
                >
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Enter Company Name"
                    value={formData.companyName}
                    className={styles.input}
                    onChange={handleChangecmp}
                  />
                  <span
                    className={styles.icon}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      color: "#00000061",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  >
                    <FaBuilding />
                  </span>

                  {formErrors.companyName && (
                    <span className="error">{formErrors.companyName}</span>
                  )}
                </div>
              )}

              <div className={styles.formGroup}>
                <label>
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
                  onClick={handleNextClick}
                >
                  Next
                </button>
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
};

export default CreditCardFirstPage;
