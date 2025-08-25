"use client";
import React, { useState, useRef, useEffect } from "react";
import "./NewPlPage.css";
import listimage1 from "./newplimages/updatedpl_jounreybannerimage.jpeg";
import listimage2 from "./newplimages/finalimage3.png";
import listimage3 from "./newplimages/plimage33.png";
import styles from "./NewPlFirstPage.module.css";
import EmblaCarousel from "./Emblacarousel/js/EmblaCarousel";
import axios from "axios";
import BLApplyLenders from "../BLApplyPrimeSecondJourney/BLApplyLenders";
import NewBlListPage from "./NewBlListPage";
// import Loader from '../BLApplyPrimeSecondJourney/LendersLoader';
import Loader from "./LendersLoader";
import ApplicationLoader from "../BLApplyPrimeSecondJourney/ApplicationLoader";
import RedirectionLoader from "./RedirectionLoader";
import ApplicationPopup from "./ApplicationPopup";
import ErrorPopup from "./ErrorPopup";
import { FaEnvelope } from "react-icons/fa";
import {
  FaUser,
  FaPhone,
  FaBriefcase,
  FaDollarSign,
  FaIdCard,
  FaRupeeSign,
} from "react-icons/fa"; // Importing icons for name, mobile number, profession, income, payment type, and PAN
// import Loader from "../NewBlJourneyD/LendersLoader";
// import RedirectionLoader from "../NewBlJourneyD/RedirectionLoader";
// import ApplicationLoader from "../NewBlJourneyD/ApplicationLoader";
// import ErrorPopup from '../NewBlJourneyD/ErrorPopup';
import otpimage from "../SmartCoin/SmartCoin_Images/otpimage.png";
// import {Roboto} from '@next/font/google';
import { Roboto } from "@next/font/google";
import OTPBottomSheet from "../NewPlOtpBottomSheet/PlOTPBottomSheet";
import ForSelfEmployed from "../BLApplyPrimeSecondJourney/ForSelfEmployed";
import ForSalaried from "../BLApplyPrimeSecondJourney/ForSalaried";
import NewPlPage2 from "./NewPlPage2";
import NewPlApplyDS from "./NewPlApplyDS";
import debounce from "lodash.debounce";
import RejectionPage from "../../components/NewPlRejectionPage/NewPlRejPage";
import OtpVerifyLoader from "./OtpVerifyLoader";

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

const NewPlPage = ({ params, searchParams }) => {
  const [link, setLink] = useState();

  const [genderFlag, setGenderFlag] = useState(false);
  const [addressFlag, setAddressFlag] = useState(false);

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

  // ✅ FIXED: Add these state variables for menu control
  // const [isProfessionMenuOpen, setIsProfessionMenuOpen] = useState(false);
  // const [isPaymentTypeMenuOpen, setIsPaymentTypeMenuOpen] = useState(false);

  // useEffect(() => {
  //   // Initialize refs array with refs to each OTP input field
  //   otpInputRefs.current = otpInputs.map(
  //     (_, i) => otpInputRefs.current[i] || React.createRef()
  //   );
  // }, [otpInputs]);

  // const [panValue, setPanValue] = useState('');
  const [panValue, setPanValue] = useState("");
  const [inputStage, setInputStage] = useState("alphabets");

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when component mounts
  }, []);

  const handlePanChange = (inputValue, e) => {
    // Convert the input value to uppercase and limit it to 10 characters
    const formattedValue = inputValue.toUpperCase().slice(0, 10); // Limit to 10 characters

    // Check for deletion and adjust the input stage accordingly
    if (formattedValue.length < panValue.length) {
      setPanValue(formattedValue);
      if (formattedValue.length < 5) {
        setInputStage("alphabets");
      } else if (formattedValue.length < 9) {
        setInputStage("numbers");
      } else {
        setInputStage("lastAlphabet");
      }
      return;
    }

    // Update the PAN value directly, without trimming it to alphabets or numbers only
    setPanValue(formattedValue);

    // Ensure proper formatting of PAN number:
    let newFormattedValue = "";

    if (formattedValue.length <= 10) {
      // Handle first 5 characters (alphabets only)
      if (formattedValue.length <= 5) {
        newFormattedValue = formattedValue.replace(/[^A-Z]/g, ""); // Only allow uppercase alphabets
        if (newFormattedValue.length === 5) {
          setInputStage("numbers");
        }
      }

      // Handle next 4 characters (numbers only)
      else if (formattedValue.length <= 9) {
        const alphabetPart = formattedValue.slice(0, 5); // First 5 alphabets
        const numberPart = formattedValue.slice(5).replace(/[^0-9]/g, ""); // Next 4 numbers
        newFormattedValue = alphabetPart + numberPart;
        if (newFormattedValue.length === 9) {
          setInputStage("lastAlphabet");
        }
      }

      // Handle last character (alphabet only)
      else {
        const alphabetPart = formattedValue.slice(0, 5); // First 5 alphabets
        const numberPart = formattedValue.slice(5, 9); // Next 4 numbers
        const lastChar = formattedValue.slice(9).replace(/[^A-Z]/g, ""); // Last alphabet
        newFormattedValue = alphabetPart + numberPart + lastChar;
      }

      setPanValue(newFormattedValue); // Update formatted value
      setFormData((prevData) => ({
        ...prevData,
        pan: newFormattedValue, // Update the form data
      }));
    }

    // Clear errors if any exist
    if (formErrors.pan) {
      setFormErrors({ ...formErrors, pan: "" });
    }
  };

  // Input change handler
  const handleInputChange = (e) => {
    const inputValue = e.target.value; // Get the full value from the input field
    handlePanChange(inputValue, e); // Pass the input value to handlePanChange for further processing

    // Close keyboard if PAN is complete (length 10)
    if (inputValue.length === 10) {
      e.target.blur(); // Remove focus, causing the keyboard to close
    }
  };

  // Determine inputMode based on the length of the PAN entered
  const getInputMode = () => {
    // const panLength = formData.pan.length;
    const panLength = panValue.length;

    // Character input mode for the first 5 characters (letters)
    if (panLength < 5) {
      return "text"; // Character keyboard
    }

    // Numeric input mode after 5 characters (numbers)
    if (panLength >= 5 && panLength <= 8) {
      return "numeric"; // Numeric keyboard
    }

    // Switch back to character input mode after entering 4 numbers (to allow the last character)
    return "text"; // Character keyboard after 4 numbers
  };
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
    } else {
      // For other fields (if needed)
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    // Optionally, you can call updateProgress() if necessary
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
      paymentType: "",
      monthlyIncome: "",
      pan: "",
    };

    if (!formData.fullname) {
      errors.fullname = "Name is required";
      valid = false;
    }

    // Mobile Number validation
    if (!formData.mobileNumber.trim()) {
      errors.mobileNumber = "Mobile number is required";
      valid = false;
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber.trim())) {
      errors.mobileNumber = "Mobile number should start with 6 to 9 digit";
      valid = false;
    }

    // Check profession validation again to ensure it's correct before moving forward
    if (!formData.profession || formData.profession === "NA") {
      errors.profession = "Profession is required"; // Set the error message
      valid = false;
    } else {
      errors.profession = ""; // Clear error if the profession is valid
    }

    if (!formData.paymentType || formData.paymentType === "NA") {
      errors.paymentType = "Payment type is required";
      valid = false;
    }

    if (!formData.monthlyIncome)
      errors.monthlyIncome = "Monthly income is required";

    // PAN validation with regex
    if (!formData.pan) {
      errors.pan = "PAN is required";
      valid = false;
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan.trim())) {
      // PAN format validation (5 letters, 4 digits, 1 letter)
      errors.pan = "PAN should be in the format: AAAAA9999A";
      valid = false;
    }
    if (!panValue) {
      errors.pan = "PAN is required";
      valid = false;
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panValue.trim())) {
      errors.pan = "PAN should be in the format: AAAAA9999A";
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
      formData1.append("paymentType", formData.paymentType);
      formData1.append("pan", formData.pan);
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
      formData1.append("otp", upotp);
      formData1.append("stgOneHitId", stgOneHitId);
      formData1.append("stgTwoHitId", stgTwoHitId);
      formData1.append("t_experian_log_id", t_experian_log_id);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}verifyOTPNewPersonalloan`,
        formData1
      );

      console.log("The otp response is :: ", response);

      console.log("Otp response code is : ", response.data.code);

      if (
        response.data.code === 0 ||
        response.data.code === 1 ||
        response.data.code === 2 ||
        response.data.code === 3
      ) {
        setOtpVerified(true);
        setOtpLoader(false);
        // setResidentialPincodeFlag(response.data.code === 0 || response.data.code === 2);
        if (response.data.obj.dob === "" || response.data.obj.dob === null) {
          setDobFlag(true);
        }
        if (
          response.data.obj.pincode === "" ||
          response.data.obj.pincode === null
        ) {
          setResidentialPincodeFlag(true);
        }
        if (
          response.data.obj.gender === "" ||
          response.data.obj.gender === null
        ) {
          setGenderFlag(true);
        }
        if (
          response.data.obj.address1 === "" ||
          response.data.obj.address1 === null
        ) {
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
        setOtpStatus("");
        console.log("Otp incorrect");
        setOtpInputs(["", "", "", "", "", ""]);
        setTimeout(() => {
          setOtpStatus("Incorrect OTP! Try Again..");
        }, 50);
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
      formData1.append("mobilenumber", formData.mobileNumber);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}lenderslistnew`,
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

  const redirectLinkMethod = (lenderProduct, applicationLink, productId) => {
    console.log("Lender Product Is :::::: ", lenderProduct);
    console.log("Application LInk is :::::::: ", applicationLink);
    setCpi(1); //HERE WE SET THE CPI to see if we have to redirect the user or to hit the api if cpi is 1 then we will set the redirection link else we will hit the api
    console.log("Inside the redirect link method");
    localStorage.setItem("applicationLink", applicationLink);
    handleDataLayerStage(4);
    apiExecutionBackend(lenderProduct, 1, productId);
    // if(formData.occupation === "Salaried"){
    //   handleDataLayerStage(3); // Track step 2 when the form is submitted
    //   setActiveContainer("forSalaried");
    // }else{
    //   setActiveContainer("forSelfEmployed");
    //   handleDataLayerStage(3);
    // }
  };
  const nextInputRef = useRef(null);
  const paymentTypeRef = useRef(null);
  const monthlyIncomeRef = useRef(null); // Reference for the monthly income field
  const mobileNumberRef = useRef(null);

  // ✅ FIXED: Custom Option Component
  const CustomOption = (props) => {
    const { data, innerRef, innerProps, selectOption, isSelected } = props;

    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          padding: "10px",
          position: "relative",
          cursor: "pointer",
          backgroundColor: isSelected ? "#f0f0f0" : "white",
        }}
        onClick={() => {
          selectOption(data); // ✅ This will trigger onChange and close menu
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{data.label}</span>
          <input
            type="radio"
            name={data.name || "option"}
            value={data.value}
            checked={isSelected}
            readOnly
            style={{ pointerEvents: "none" }}
          />
        </div>

        <hr
          style={{
            margin: "5px 0",
            border: "0",
            borderTop: "1px solid #ddd",
            width: "100%",
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
  const paymentTypeOptions = [
    { value: "NA", label: "Select Payment Type" },
    { value: "2", label: "Bank Transfer" },
    { value: "1", label: "Cheque" },
    { value: "0", label: "Cash" },
  ];

  // ✅ FIXED: Updated customStyles (same as working marital status)
  const customStyles = {
    input: (provided) => ({
      ...provided,
      padding: "8px",
      width: "100%",
      minHeight: "70px",
      border: "none",
      cursor: "pointer",
      borderRadius: "50px",
    }),

    menu: (provided) => ({
      ...provided,
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
      maxWidth: "400px",
      zIndex: 9999,
      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
      borderRadius: "10px",
      backgroundColor: "white",
    }),

    control: (provided) => ({
      ...provided,
      width: "100%",
      borderRadius: "10px",
      minHeight: "50px",
    }),

    placeholder: (provided) => ({
      ...provided,
      padding: "12px",
    }),

    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "0",
    }),

    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  // Handle changes in the mobile number
  const handleMobileNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10); // Allow only 10 digits
    setFormData({ ...formData, mobileNumber: value });

    if (formErrors.mobileNumber) {
      setFormErrors({ ...formErrors, mobileNumber: "" });
    }

    // if (value.length === 10) {
    //   // Automatically focus and open the profession dropdown when mobile number has 10 digits
    //   setTimeout(() => {
    //     if (nextInputRef.current) {
    //       mobileNumberRef.current.blur();
    //       nextInputRef.current.focus(); // Focus on the Profession field
    //       setIsProfessionMenuOpen(true); // Open the dropdown
    //     }
    //   }, 100); // Small delay to ensure focus is set first
    // }
  };

  // ✅ FIXED: Profession Change Handler
  const handleProfessionChange = (selectedOption) => {
    console.log("Selected profession:", selectedOption);

    // ✅ Update state
    setFormData({
      ...formData,
      profession: selectedOption.value,
    });

    // ✅ Clear error if valid option selected
    if (selectedOption.value !== "NA") {
      setFormErrors({
        ...formErrors,
        profession: "",
      });
    } else {
      setFormErrors({
        ...formErrors,
        profession: "Profession is required",
      });
    }

    // ✅ Menu will automatically close after selection due to react-select default behavior
  };

  // ✅ REMOVED: Menu control functions - not needed anymore
  // const handleProfessionFocus = () => {
  //   setIsProfessionMenuOpen(true);
  // };

  // const handleProfessionBlur = () => {
  //   setIsProfessionMenuOpen(false);
  // };

  // const handleProfessionClick = (e) => {
  //   e.stopPropagation();
  //   setIsProfessionMenuOpen(true);
  // };

  // ✅ FIXED: Payment Type Change Handler
  const handlePaymentTypeChange = (selectedOption) => {
    console.log("Selected payment type:", selectedOption);

    // ✅ Update state
    setFormData({
      ...formData,
      paymentType: selectedOption.value,
    });

    // ✅ Clear error if valid option selected
    if (selectedOption.value !== "NA") {
      setFormErrors({
        ...formErrors,
        paymentType: "",
      });
    } else {
      setFormErrors({
        ...formErrors,
        paymentType: "Payment type is required",
      });
    }

    // ✅ Menu will automatically close after selection
  };

  // ✅ REMOVED: Payment Type menu control functions - not needed anymore
  // const handlePaymentTypeFocus = () => {
  //   setIsPaymentTypeMenuOpen(true);
  // };

  // const handlePaymentTypeBlur = () => {
  //   setIsPaymentTypeMenuOpen(false);
  // };

  // const handlePaymentTypeClick = (e) => {
  //   e.stopPropagation();
  //   setIsPaymentTypeMenuOpen(true);
  // };

  function handleDataLayerStart(flag, mobile_number, emptype) {
    console.log("INside handledatalayer , ", flag, mobile_number, emptype);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      mobileNumber: mobile_number,
      flag: flag,
      employmentType: emptype,
    });
  }

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

  const apiExecutionBackend = async (productname, lenderCpi, productId) => {
    console.log(productname);

    // If lenderCpi is 1, redirect to lender.applicationlink

    console.log(cpi);

    if (lenderCpi === 1) {
      setRedirectionLinkLoader(true);
      const lenderApplicationLink = localStorage.getItem("applicationLink");

      // const timer = setTimeout(() => {
      //   // setRedirectionLinkLoader(false);
      //   const lenderApplicationLink = localStorage.getItem('applicationLink');
      //   window.location.href = lenderApplicationLink;
      //   // window.location.href = lenderApplicationLink;
      // }, 3000);

      try {
        const formData2 = new FormData();

        console.log(
          "phone : ",
          formData.mobileNumber,
          "and product id : ",
          productId
        );

        formData2.append("userId", "");
        formData2.append("phone", formData.mobileNumber);
        formData2.append("productId", productId);
        formData2.append("channel", "creditHaat");

        console.log("before cpiclikc");
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}h5/cpiClickNew`,
          formData2
        );
        console.log("after cpiclick");

        // Call the SMS API before redirection
        await sendSmsApi(formData.mobileNumber, productId);

        const timer = setTimeout(() => {
          setRedirectionLinkLoader(false);
          window.location.href = lenderApplicationLink;
        }, 3000);
      } catch (Error) {
        console.log("Error while writing in cpiclicknew : ", Error);
      }

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
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}apiExecution`,
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
          // console.log(redirectionLink);
          setLink(redirectionlink);
          // {!setIsLoading && <ApplicationPopup link={link}/>}
        } else if (response.data.code === -1) {
          console.log(-1);
          // setErrorPopup(true);
          localStorage.setItem(
            "mobileNumberForRejection",
            formData.mobileNumber
          );
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
      } catch (error) {}
    }
  };

  // Function to send SMS via API
  const sendSmsApi = async (phone, productId) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}h5/sms_pl_journey`,
        {
          params: {
            phone: phone,
            // link: link,
            dsa: "214394238",
            productId: productId,
          },
        }
      );

      console.log("SMS API response:", response.data);
    } catch (error) {
      console.log("Error while calling SMS API: ", error);
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
      [name]: value,
    }));
  };

  // Calculate the completion percentage whenever formData changes
  useEffect(() => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(
      (value) => value !== ""
    ).length;
    const completionPercentage = (filledFields / totalFields) * 100;

    setProgress(completionPercentage);
  }, [formData]);

  return (
    <>
      {rejectionPage && <RejectionPage lenderName={lenderProduct} />}
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

      {isLoading && <Loader />}
      {otpLoader && <OtpVerifyLoader />}
      {activeContainer === "LendersList" && !rejectionPage && (
        // <LendersList companies={lenderDetails} formData={formData} redirectLinkMethod={redirectLinkMethod} getLoanBackendMethod={getLoanBackendMethod}/>
        <NewBlListPage
          companies={lenderDetails}
          formData={formData}
          redirectLinkMethod={redirectLinkMethod}
          getLoanBackendMethod={getLoanBackendMethod}
        />
      )}
      {activeContainer === "NewPlApplyDS" && (
        <NewPlApplyDS
          cpi={cpi}
          lenderProduct={lenderProduct}
          mainFormData={formData}
          dobFlag={dobFlag}
          residentialPincodeFlag={residentialPincodeFlag}
          genderFlag={genderFlag}
          addressFlag={addressFlag}
          setActiveContainer={setActiveContainer}
          getLendersList={getLendersList}
        />
      )}

      {activeContainer === "NewPlPage2" && (
        <NewPlPage2
          cpi={cpi}
          lenderProduct={lenderProduct}
          mainFormData={formData}
          dobFlag={dobFlag}
          residentialPincodeFlag={residentialPincodeFlag}
          genderFlag={genderFlag}
          addressFlag={addressFlag}
          setActiveContainer={setActiveContainer}
          getLendersList={getLendersList}
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
      {activeContainer === "newplfirstpage" && (
        <div className={`${roboto.className} page-container`}>
          <div className="carousel-background">
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
          </div>
          {/* 👉 Move Apply Now here */}
          <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h4 style={{ fontWeight: "bold" }}>Apply Now</h4>
          </div>
          <div
            className="newfirstcard-container"
            style={{ boxSizing: "content-box" }}
          >
            <div className="progress-bar-container">
              <div className="progress-bar">
                <div className="step-number">1</div>
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="progress-bar">
                <div className="step-number">2</div>
                <div
                  className="progress-bar-fill"
                  style={{ width: "0%" }}
                ></div>
              </div>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
              {/* First Name Field */}
              <div className={`${styles.formGroup} form-group`}>
                <div className="input-wrapper">
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
                  <span className={`${styles.icon} input-icon`}>
                    <FaUser />
                  </span>
                </div>
                {formErrors.fullname && (
                  <span className="error">{formErrors.fullname}</span>
                )}
              </div>

              <div>
                {/* Mobile Number Field */}
                <div className={`${styles.formGroup} form-group`}>
                  <div className="input-wrapper">
                    <input
                      ref={mobileNumberRef}
                      type="text"
                      id="mobileNumber"
                      name="mobileNumber"
                      placeholder="Mobile Number"
                      inputMode="numeric"
                      value={formData.mobileNumber}
                      className={styles.input}
                      onChange={handleMobileNumberChange}
                    />
                    <span className={`${styles.icon} input-icon`}>
                      <FaPhone />
                    </span>
                  </div>
                  {formErrors.mobileNumber && (
                    <span className="error">{formErrors.mobileNumber}</span>
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
                    placeholder="Select Occupation"
                    isSearchable={false}
                    menuPosition="absolute"
                    components={{ Option: CustomOption }}
                    // ✅ REMOVED: menuIsOpen, onFocus, onBlur, onClick - let react-select handle menu state
                  />
                  {formErrors.profession && (
                    <span className="error">{formErrors.profession}</span>
                  )}
                </div>
              </div>

              {/* Payment Type Field (react-select) */}
              <div
                className={styles.formGroup}
                style={{ position: "relative" }}
              >
                <Select
                  id="paymentType"
                  name="paymentType"
                  value={paymentTypeOptions.find(
                    (option) => option.value === formData.paymentType
                  )}
                  options={paymentTypeOptions}
                  ref={paymentTypeRef}
                  onChange={handlePaymentTypeChange}
                  styles={customStyles}
                  placeholder="Select Payment Type"
                  isSearchable={false}
                  menuPosition="absolute"
                  components={{ Option: CustomOption }}
                  // ✅ REMOVED: menuIsOpen, onFocus, onBlur, onClick - let react-select handle menu state
                />
                {formErrors.paymentType && (
                  <span className="error">{formErrors.paymentType}</span>
                )}
              </div>

              {/* Monthly Income Field */}
              <div className={`${styles.formGroup} form-group`}>
                <div className="input-wrapper">
                  <input
                    type="number"
                    id="monthlyIncome"
                    name="monthlyIncome"
                    placeholder="Monthly Income"
                    value={formData.monthlyIncome}
                    inputMode="numeric"
                    className={styles.input}
                    ref={monthlyIncomeRef}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setFormData({ ...formData, monthlyIncome: value });
                      if (formErrors.monthlyIncome) {
                        setFormErrors({ ...formErrors, monthlyIncome: "" });
                      }
                    }}
                  />
                  <span className={`${styles.icon} input-icon`}>
                    <FaRupeeSign />
                  </span>
                </div>
                {formErrors.monthlyIncome && (
                  <span className="error">{formErrors.monthlyIncome}</span>
                )}
              </div>

              {/* Pan Number field */}
              <div className={`${styles.formGroup} form-group`}>
                <div className="input-wrapper">
                  <input
                    type={
                      inputStage === "alphabets"
                        ? "text"
                        : inputStage === "numbers"
                        ? "tel"
                        : "text"
                    }
                    inputMode="text"
                    id="pan"
                    name="pan"
                    placeholder="Enter PAN"
                    value={panValue}
                    className={styles.input}
                    onChange={handleInputChange}
                    pattern={inputStage === "numbers" ? "[0-9]*" : undefined}
                    autoCapitalize="characters"
                  />
                  <span className={`${styles.icon} input-icon`}>
                    <FaIdCard />
                  </span>
                </div>
                {formErrors.pan && (
                  <span className="error">{formErrors.pan}</span>
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
                      Policy Click here to read the{" "}
                      <a
                        href="/privacy"
                        // target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "blue",
                          cursor: "pointer",
                          textDecoration: "none",
                        }}
                      >
                        PRIVACY POLICY
                      </a>
                      &nbsp; &{" "}
                      <a
                        href="/terms"
                        // target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "blue",
                          cursor: "pointer",
                          textDecoration: "none",
                        }}
                      >
                        TERMS OF SERVICE
                      </a>
                      <span
                        onClick={() => setShowFullConsent(false)}
                        style={{
                          color: "blue",
                          cursor: "pointer",
                          textDecoration: "none",
                        }}
                      >
                        &nbsp; &nbsp; Show Less
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
                      herein, you provide your express consent to Arysefin,
                      Aditya Birla Capital Limited, EarlySalary Services Private
                      Limited(fibe), Bajaj Finserv Limited, PaywithRing, Whizdm
                      Innovations Pvt Ltd, Upwards Fintech Services Pvt Ltd,
                      Tata Capital Financial Services Ltd, SmartCoin Financials
                      Pvt Ltd, MWYN Tech Pvt Ltd, L&T Finance Ltd, Krazybee
                      Services Pvt Ltd, Infocredit Services Pvt. Ltd, Incred
                      Financial Services, IIFL Finance Ltd, EQX Analytics Pvt
                      Ltd, EPIMoney Pvt Ltd, Bhanix finance and Investment LTd,
                      Aditya Birla Finance Ltd to access the credit bureaus and
                      credit information report and credit score. You also
                      hereby irrevocably and unconditionally consent to usage of
                      such credit information being provided by credit bureaus.
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
};

export default NewPlPage;
