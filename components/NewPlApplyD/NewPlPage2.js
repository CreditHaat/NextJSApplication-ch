"use client";
import React, { useState, useRef, useEffect } from "react";
import "./NewPlPage2.css";
import listimage1 from "./newplimages/updatedpl_jounreybannerimage.jpeg";
// import listimage2 from "./newplimages/finalimage3.png";
// import listimage3 from "./newplimages/plimage33.png";
import styles from "./NewPlFirstPage.module.css";
import EmblaCarousel from "./Emblacarousel/js/EmblaCarousel";
import NewBlListPage from "../NewBlJourneyD/NewBlListPage";
import axios from "axios";
import Loader from "../NewBlJourneyD/LendersLoader";
import RedirectionLoader from "../NewBlJourneyD/RedirectionLoader";
import ApplicationLoader from "../NewBlJourneyD/ApplicationLoader";
import Select from "react-select";
import {
  FaEnvelope,
  FaHome,
  FaBuilding,
  FaCalendar,
  FaMapPin,
  FaArrowLeft,
} from "react-icons/fa"; // Font Awesome icons for React
import ErrorPopup from "../NewBlJourneyD/ErrorPopup";
// import {Roboto} from '@next/font/google';
import { Roboto } from "next/font/google";
const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const OPTIONS = { direction: "rtl", loop: true };
const SLIDES = [
  { imageUrl: listimage1 },
  // { imageUrl: listimage2 },
  // { imageUrl: listimage3 },
];

const NewPlPage2 = ({
  dobFlag,
  mainFormData,
  getLendersList,
  genderFlag,
  addressFlag,
  residentialPincodeFlag,
  setActiveContainer,
}) => {
  const [formErrors, setFormErrors] = useState({
    email: "",
    address: "",
    dob: "",
    gender: "",
    companyName: "",
    officeemail: "",
    officePincode: "",
    residentialPincode: "",
    // ITR: "",
  });

  const [formData, setFormData] = useState({
    email: "",
    address: "",
    dob: "",
    gender: "",
    companyName: "",
    officeemail: "",
    officePincode: "",
    residentialPincode: "",
    // ITR: "",
  });

  const [consent, setConsent] = useState(false);
  const [terms, setTerms] = useState(false);
  const [showFullConsent, setShowFullConsent] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [errors, setErrors] = useState({}); // Object to store error messages
  const formRef = useRef(null);
  const emailRef = useRef(null);
  const companyNameRef = useRef(null);
  const officeemailRef = useRef(null);
  const officePincodeRef = useRef(null);
  const residentialPincodeRef = useRef(null);
  const addressRef = useRef(null);

  // const[ActiveContainer, setActiveContainer]= useState("NewBlFirstPage");
  const [isLoading, setIsLoading] = useState(false);
  var json = null;
  const [lenderDetails, setLenderDetails] = useState(null);

  const [lenderProduct, setLenderProduct] = useState(null);
  const [cpi, setCpi] = useState(0);
  const [redirectionLinkLoader, setRedirectionLinkLoader] = useState(false);
  const [apiExecutionLoader, setApiExecutionLoader] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [applicationPopup, setApplicationPopup] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when component mounts
  }, []);
  // ========================================================
  // ========================================================

  // Initial state variables
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [dobError, setDobError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const datePickerRef = useRef(null);

  // Helper arrays for date picker
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Generate years array (from 1924 to current year)
  const currentYearValue = new Date().getFullYear();
  const years = Array.from({ length: 101 }, (_, i) => currentYearValue - i);

  // Function to check if a date is valid
  const isValidDate = (dateString) => {
    const regex = /^\d{2}-\d{2}-\d{4}$/;
    if (!regex.test(dateString)) return false;

    const [day, month, year] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  // Function to validate date of birth
  const validateDOB = (value) => {
    if (!value.trim()) {
      return "Date of birth is required";
    } else if (!isValidDate(value)) {
      return "Please enter a valid date in DD-MM-YYYY format";
    } else {
      const [day, month, year] = value.split("-").map(Number);
      const dob = new Date(year, month - 1, day);
      const today = new Date();

      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      const dayDiff = today.getDate() - dob.getDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }

      if (age < 18) {
        return "You must be at least 18 years old";
      }

      if (age > 100) {
        return "Please enter a valid date of birth";
      }
    }
    return "";
  };

  const handleGenderChange = (selectedOption) => {
    console.log("Selected profession:", selectedOption);

    // ✅ Update state
    setFormData({
      ...formData,
      gender: selectedOption.value,
    });

    // ✅ Clear error if valid option selected
    if (selectedOption.value !== "NA") {
      setFormErrors({
        ...formErrors,
        gender: "",
      });
    } else {
      setFormErrors({
        ...formErrors,
        gender: "Gender is required",
      });
    }

    // ✅ Menu will automatically close after selection due to react-select default behavior
  };

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

  // Handle manual date input
  const handleDateInputChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits

    if (value.length >= 2) {
      value = value.slice(0, 2) + "-" + value.slice(2);
    }
    if (value.length >= 5) {
      value = value.slice(0, 5) + "-" + value.slice(5, 9);
    }

    setSelectedDate(value);

    if (value.length === 10) {
      const error = validateDOB(value);
      setFormErrors({ ...formErrors, dob: error });
      setDobError(error);

      if (!error) {
        setFormData({ ...formData, dob: value });
      }
    }
  };

  // Handle date blur (when user leaves the field)
  const handleDateBlur = () => {
    if (selectedDate) {
      const error = validateDOB(selectedDate);
      setFormErrors({ ...formErrors, dob: error });
      setDobError(error);

      if (!error) {
        setFormData({ ...formData, dob: selectedDate });
      }
    }
  };

  // Generate calendar days for the current month
  const generateCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const days = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
      });
    }

    // Next month days to fill the grid
    const remainingDays = 42 - days.length; // 6 rows × 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
      });
    }

    return days;
  };

  // Handle date click in calendar
  const handleDateClick = (day, isCurrentMonth) => {
    if (!isCurrentMonth) return;

    const formattedDate = `${String(day).padStart(2, "0")}-${String(
      currentMonth + 1
    ).padStart(2, "0")}-${currentYear}`;
    setSelectedDate(formattedDate);
    setFormData({ ...formData, dob: formattedDate });

    const error = validateDOB(formattedDate);
    setFormErrors({ ...formErrors, dob: error });
    setDobError(error);

    if (!error) {
      setShowDatePicker(false);
    }
  };

  // Check if a date is selected
  const isSelected = (day, isCurrentMonth) => {
    if (!selectedDate || !isCurrentMonth) return false;
    const [selectedDay, selectedMonth, selectedYear] = selectedDate
      .split("-")
      .map(Number);
    return (
      day === selectedDay &&
      currentMonth === selectedMonth - 1 &&
      currentYear === selectedYear
    );
  };

  // Check if a date is today
  const isToday = (day, isCurrentMonth) => {
    if (!isCurrentMonth) return false;
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  // Handle month change
  const handleMonthChange = (e) => {
    setCurrentMonth(Number(e.target.value));
  };

  // Handle year change
  const handleYearChange = (e) => {
    setCurrentYear(Number(e.target.value));
  };

  // Clear date
  const handleClear = () => {
    setSelectedDate("");
    setFormData({ ...formData, dob: "" });
    setFormErrors({ ...formErrors, dob: "" });
    setDobError("");
  };

  // Set today's date
  const handleToday = () => {
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, "0")}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${today.getFullYear()}`;
    setSelectedDate(formattedDate);
    setFormData({ ...formData, dob: formattedDate });
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());

    const error = validateDOB(formattedDate);
    setFormErrors({ ...formErrors, dob: error });
    setDobError(error);
  };

  // Handle click outside the date picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
      }
    };

    if (showDatePicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDatePicker]);

  // const validateDOB = (value) => {
  //   if (!value.trim()) {
  //     return 'Date of birth is required';
  //   } else if (!isValidDate(value)) {
  //     return 'Please enter a valid date in DD-MM-YYYY format';
  //   } else {
  //     const [day, month, year] = value.split('-').map(Number);
  //     const dob = new Date(year, month - 1, day);
  //     const today = new Date();

  //     let age = today.getFullYear() - dob.getFullYear();
  //     const monthDiff = today.getMonth() - dob.getMonth();
  //     const dayDiff = today.getDate() - dob.getDate();

  //     if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
  //       age--;
  //     }

  //     if (age < 18) {
  //       return 'You must be at least 18 years old';
  //     }

  //     if (age > 100) {
  //       return 'Please enter a valid date of birth';
  //     }
  //   }
  //   return '';
  // };
  // ========================================================
  // ========================================================
  const validateForm = () => {
    let valid = true;
    const errors = {
      email: "",
      address: "",
      dob: "",
      gender: "",
      companyName: "",
      officeemail: "",
      officePincode: "",
      residentialPincode: "",
      //   ITR: "",
    };

    if (dobFlag) {
      const dobValidation = validateDOB(selectedDate);
      if (dobValidation) {
        errors.dob = dobValidation;
        setDobError(dobValidation);
        valid = false;
      }
    }

    if (!formData.email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
      valid = false;
    }

    if (addressFlag) {
      // Validate Address
      if (!formData.address.trim()) {
        errors.address = "Address is required";
        valid = false;
      }
    }

    if (genderFlag) {
      if (!formData.gender) {
        errors.gender = "Gender is required";
        valid = false;
      }
    }
    //
    // if (residentialPincodeFlag) {
    //   if (!formData.residentialPincode) {
    //     errors.residentialPincode = "Home pincode is required";
    //   }
    // }
    //
    if (residentialPincodeFlag) {
    if (!formData.residentialPincode.trim()) {
      errors.residentialPincode = "Residential pincode is required";
      valid = false;
    } else if (
      formData.residentialPincode.length !== 6 ||
      !/^\d{6}$/.test(formData.residentialPincode)
    ) {
      errors.residentialPincode = "Invalid pincode format";
      valid = false;
    }
  }

    // if (!formData.ITR) errors.ITR = 'ITR is required';

    // Validate Company Name
    if (!formData.companyName.trim()) {
      errors.companyName = "Company name is required";
      valid = false;
    }

    if (!formData.officeemail) {
      errors.officeemail = "Office email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.officeemail)) {
      errors.officeemail = "Invalid email address";
      valid = false;
    }

    // Validate Office Pincode
    if (!formData.officePincode.trim()) {
      errors.officePincode = "Office pincode is required";
      valid = false;
    } else if (
      formData.officePincode.length !== 6 ||
      !/^\d{6}$/.test(formData.officePincode)
    ) {
      errors.officePincode = "Invalid pincode format";
      valid = false;
    }

    setFormErrors(errors);
    console.log("The form errors are ", errors);
    return valid;
  };
  const handleDataLayerStage = (stage) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ stage: stage });
  };

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

  const handleSubmit = (e) => {
    console.log("Inside handle Submit");
    e.preventDefault();
    if (validateForm()) {
      console.log("Inside validate form");
      // Process form data and navigate to the next page
      handleDataLayerStage(3); // Track step 2 when the form is submitted
      console.log("After Data layer stage");
      console.log("Form data:", formData);
      StoreDataToBackendForSalaried(e);
      // getLendersList(e);
      // setActiveContainer('LendersList');

      // router.push('/next-page'); // Uncomment and modify the route as needed
    } else {
      console.log("form not validated");
    }
  };
  const toggleOfficialInfo = () => {
    setOfficialInfoVisible((prev) => !prev);
  };

  const StoreDataToBackendForSalaried = async (e) => {
    // setIsLoading2(true);
    console.log("Inside handle form submit");
    e.preventDefault();
    try {
      const formData1 = new FormData();
      formData1.append("mobileNumber", mainFormData.mobileNumber);
      formData1.append("gender", formData.gender);
      formData1.append("address", formData.address);
      formData1.append("dob", formData.dob);
      formData1.append("email", formData.email);
      formData1.append("officeemail", formData.officeemail);
      formData1.append("officePincode", formData.officePincode);
      formData1.append("companyName", formData.companyName);
      formData1.append("pincode", formData.residentialPincode);

      // setIsLoadingforLoader(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}PlApplyNew_Salaried`,
        formData1
      );

      // if(cpi===1){
      // apiExecutionBackend(lenderProduct);
      // }

      if (response.data.code === 0) {
        //Here when the code is 0 we are calling lendersList backend which will give us lendersList accrding to user
        // getLendersList(e);
        window.location.href = `https://app.credithaat.com/embedded_journey?sso=yes&mobilenumber=${mainFormData.mobileNumber}&chaid=true`;
        // getLoanBackend(e);
      }

      if (response.status === 200) {
      } else {
        console.error("Submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // const getLendersList = async (e) => {
  //   setIsLoading(true);

  //   e.preventDefault();
  //   try {

  //       const formData1 = new FormData();
  //       formData1.append('mobilenumber', mobileNumber);

  //       const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}lenderslist_blapplyprime`, formData1, {
  //           headers: {
  //               'Content-Type': 'application/json',
  //               'token': 'Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=' // Add your token here
  //           }
  //       });

  //       setTimeout(() => {
  //           setIsLoading(false);
  //       }, 3000);

  //       if (response.data.code === 200) {
  //           json = response.data.data;
  //           setLenderDetails(json);

  //           // // setShowAddInfo(false);
  //           // setShowLendersList(true);
  //           setActiveContainer("LendersList");
  //       }

  //       if (response.status === 200) {

  //       } else {
  //           console.error('Submission failed:', response.statusText);
  //       }
  //   } catch (error) {
  //       console.error('Error submitting form:', error);
  //   }
  // };
  // const dobInputRef = useRef(null); // Reference for the DatePicker input element

  // Handle gender selection
  // const handleGenderChange = (e) => {
  //   const genderValue = e.target.value;
  //   setFormData({ ...formData, gender: genderValue });

  //   // Clear gender error
  //   setFormErrors({ ...formErrors, gender: "" });
  // };

  const apiExecutionBackend = async (productname) => {
    console.log(productname);

    // If lenderCpi is 1, redirect to lender.applicationlink

    console.log(cpi);

    if (cpi === 1) {
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
        formData1.append("mobilenumber", mainFormData.mobileNumber);
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
  const handleBackButton = () => {
    setActiveContainer("newplfirstpage"); // Switch the active container to 'NewPlPage'
  };

  return (
    <>
      {apiExecutionLoader && <ApplicationLoader />}
      {redirectionLinkLoader && <RedirectionLoader />}

      {applicationPopup && <ApplicationPopup link={link} />}
      {errorPopup && (
        <ErrorPopup
          lenderName={lenderProduct}
          formData={mainFormData}
          setErrorPopup={setErrorPopup}
        />
      )}
      <div className={`${roboto.className} page-container`}>
        <div className="carousel-background">
          <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </div>
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <h4 style={{ fontWeight: "bold" }}>Apply Now</h4>
        </div>
        <div
          className="plsecfnewfirstcard-container"
          style={{ boxSizing: "content-box" }}
        >
          <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
            <div className="progress-bar-container">
              <div className="progress-bar">
                <div className="step-number">1</div>
                <div className="progress-bar-fill"></div>
              </div>
              <div className="progress-bar">
                <div className="step-number">2</div>
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <div
                className={styles.inputWrapper}
                style={{ position: "relative" }}
              >
                <input
                  ref={emailRef}
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  className={styles.input}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (formErrors.email) {
                      setFormErrors({ ...formErrors, email: "" });
                    }
                  }}
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
                  onClick={() => emailRef.current?.focus()}
                >
                  <FaEnvelope />
                </span>
              </div>
              {formErrors.email && (
                <span className="error">{formErrors.email}</span>
              )}
            </div>

            {addressFlag && (
              <>
                <div className={styles.formGroup}>
                  <div
                    className={styles.inputWrapper}
                    style={{ position: "relative" }}
                  >
                    <input
                      ref={addressRef}
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Enter Residential Address"
                      value={formData.address}
                      className={styles.input}
                      onChange={(e) => {
                        setFormData({ ...formData, address: e.target.value });
                        if (formErrors.address) {
                          setFormErrors({ ...formErrors, address: "" });
                        }
                      }}
                    />
                    <span
                      className={styles.icon}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        color: "#00000061", // Adjusting the icon color
                        transform: "translateY(-50%)", // Center the icon vertically
                        cursor: "pointer",
                      }}
                      onClick={() => addressRef.current?.focus()}
                    >
                      <FaHome />
                    </span>
                  </div>
                  {formErrors.address && (
                    <span className="error">{formErrors.address}</span>
                  )}
                </div>
              </>
            )}

            <div>
              {/* Gender Selection */}
              {genderFlag && (
                <div
                  className={styles.formGroup}
                  style={{ position: "relative" }}
                >
                  {/* <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    Gender
                  </label> */}
                  <Select
                    id="gender"
                    name="gender"
                    value={genderOptions.find(
                      (option) => option.value === formData.gender
                    )}
                    options={genderOptions}
                    // ref={nextInputRef}
                    onChange={handleGenderChange}
                    styles={customStyles}
                    placeholder="Select Gender"
                    isSearchable={false}
                    menuPosition="absolute"
                    components={{ Option: CustomOption }}
                    // ✅ REMOVED: menuIsOpen, onFocus, onBlur, onClick - let react-select handle menu state
                  />

                  {formErrors.gender && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontWeight: 700,
                        // position: "absolute",
                        marginTop: "4px",
                        marginLeft: "4px",
                      }}
                    >
                      {formErrors.gender}
                    </p>
                  )}
                </div>
              )}

              {/* DOB Date Picker */}
              {dobFlag && (
                <div className={styles.formGroup}>
                  {/* <label style={{ fontWeight: "bold" }}>Date of Birth</label> */}
                  <div
                    className="input-wrapper"
                    style={{ position: "relative" }}
                  >
                    <input
                      type="text"
                      name="dateOfBirth"
                      className={`${styles.input} ${styles.dobInput}`}
                      value={selectedDate}
                      placeholder="Date of Birth"
                      onChange={handleDateInputChange}
                      onBlur={handleDateBlur}
                      maxLength={10}
                      // inputMode="numeric"
                    />

                    <span
                      className="icon"
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        color: "#00000061",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                    >
                      <FaCalendar
                        // onClick={() => setShowDatePicker(!showDatePicker)}
                        onClick={() => {
                          console.error("Toggling date picker");
                          setShowDatePicker(!showDatePicker);
                        }}
                      />
                    </span>
                  </div>
                  {formErrors.dob && (
                    <div className="error-message">{formErrors.dob}</div>
                  )}
                </div>
              )}
            </div>

            <>
              <div
                className={styles.formGroup}
                style={{ position: "relative" }}
              >
                <div
                  className={styles.inputWrapper}
                  style={{ position: "relative" }}
                >
                  <input
                    ref={companyNameRef}
                    type="text"
                    id="companyName"
                    name="companyName"
                    placeholder="Enter Company Name"
                    value={formData.companyName}
                    className={styles.input}
                    onChange={(e) => {
                      setFormData({ ...formData, companyName: e.target.value });
                      if (formErrors.companyName) {
                        setFormErrors({ ...formErrors, companyName: "" });
                      }
                    }}
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
                    onClick={() => companyNameRef.current?.focus()}
                  >
                    <FaBuilding /> {/* Building icon */}
                  </span>
                </div>
                {formErrors.companyName && (
                  <span className="error">{formErrors.companyName}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <div
                  className={styles.inputWrapper}
                  style={{ position: "relative" }}
                >
                  <input
                    ref={officeemailRef}
                    type="text"
                    id="officeemail"
                    name="officeemail"
                    placeholder="Enter Work Email"
                    value={formData.officeemail}
                    className={styles.input}
                    onChange={(e) => {
                      setFormData({ ...formData, officeemail: e.target.value });
                      if (formErrors.officeemail) {
                        setFormErrors({ ...formErrors, officeemail: "" });
                      }
                    }}
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
                    onClick={() => officeemailRef.current?.focus()}
                  >
                    <FaEnvelope /> {/* Envelope (email) icon */}
                  </span>
                </div>
                {formErrors.officeemail && (
                  <span className="error">{formErrors.officeemail}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <div
                  className={styles.inputWrapper}
                  style={{ position: "relative" }}
                >
                  <input
                    ref={officePincodeRef}
                    type="text"
                    id="officePincode"
                    name="officePincode"
                    placeholder="Enter Work Pincode"
                    inputMode="numeric"
                    value={formData.officePincode}
                    className={styles.input}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6); // Keep only digits and limit to 6
                      setFormData({ ...formData, officePincode: value });
                      // Close keyboard when 6 digits are entered
                      if (value.length === 6) {
                        e.target.blur(); // This will close the keyboard
                      }
                      if (formErrors.officePincode) {
                        setFormErrors({ ...formErrors, officePincode: "" });
                      }
                    }}
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
                    onClick={() => officePincodeRef.current?.focus()}
                  >
                    <FaMapPin /> {/* Map pin (location) icon */}
                  </span>
                </div>
                {formErrors.officePincode && (
                  <span className="error">{formErrors.officePincode}</span>
                )}
              </div>

              {residentialPincodeFlag && (
                <>
                  <div className={styles.formGroup}>
                    <div
                      className={styles.inputWrapper}
                      style={{ position: "relative" }}
                    >
                      <input
                        ref={residentialPincodeRef}
                        type="text"
                        id="residentialPincode"
                        name="residentialPincode"
                        placeholder="Enter Home Pincode"
                        inputMode="numeric"
                        value={formData.residentialPincode}
                        className={styles.input}
                        onChange={(e) => {
                          const value = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 6); // Keep only digits and limit to 6
                          setFormData({
                            ...formData,
                            residentialPincode: value,
                          });
                          if (formErrors.residentialPincode) {
                            setFormErrors({
                              ...formErrors,
                              residentialPincode: "",
                            });
                          }
                        }}
                      />
                      <span
                        classNameclassName="error"
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          color: "#00000061",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                        }}
                        onClick={() => residentialPincodeRef.current?.focus()}
                      >
                        <FaMapPin /> {/* Map pin (location) icon */}
                      </span>
                    </div>
                    {formErrors.residentialPincode && (
                      <span className="error">
                        {formErrors.residentialPincode}
                      </span>
                    )}
                  </div>
                </>
              )}
              <button onClick={handleBackButton} className="back-button">
                <FaArrowLeft />
              </button>

              {/* <div className={styles.formGroup}>
  <label style={{ fontWeight: 'bold' }}>ITR available for last 2 years</label>
  <div className={styles.radioGroup}>
    {['Yes', 'No'].map((ITR) => (
      <label style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }} key={ITR}>
        <input
          type="radio"
          value={ITR}
          checked={formData.ITR === ITR}
          onChange={(e) => {
            setFormData({ ...formData, ITR: e.target.value });
            setFormErrors({ ...formErrors, ITR: "" });
          }}
          style={{ marginRight: '8px' }}
        />
        {ITR}
      </label>
    ))}
  </div>
  {formErrors.ITR && <p style={{ color: 'red' }}>{formErrors.ITR}</p>}
</div> */}
            </>

            {/* <div className={styles.formGroup}>
            <label> */}
            {/* <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  setErrors((prevErrors) => ({ ...prevErrors, consent: "" }));
                }}
              /> */}
            {/* {showFullConsent ? (
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
              )} */}
            {/* </label>
            {errors.consent && <p style={{ color: 'red' }}>{errors.consent}</p>}
          </div> */}

            {/* <div className={styles.formGroup}>
            <label> */}
            {/* <input
                type="checkbox"
                checked={terms}
                onChange={(e) => {
                  setTerms(e.target.checked);
                  setErrors((prevErrors) => ({ ...prevErrors, terms: "" }));
                }}
              /> */}
            {/* {showConsent ? (
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
              )} */}
            {/* </label>
            {errors.terms && <p style={{ color: 'red' }}>{errors.terms}</p>}
          </div> */}
            {/* <div style={{marginBottom:"50px"}}>
          Calculation:<br/> CreditHaat does not charge any fees from the user.<br/> A sample loan calculation for ₹1,00,000 borrowed for 1 year, with interest rate @13% per annum*, is as provided below: <br/>
          Processing fee (@ 2%) = ₹2,000 + GST = ₹2,360
          </div> */}
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
          {/* CHANGE 3: Updated Date Picker Modal with Dropdowns */}
          {showDatePicker && (
            <div
              className={styles.datePickerOverlay}
              onClick={() => setShowDatePicker(false)}
            >
              <div
                className={styles.datePickerModal}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.datePickerHeader}>
                  <div className={styles.monthYearSelector}>
                    <div className={styles.monthSelector}>
                      <select
                        value={currentMonth}
                        onChange={handleMonthChange}
                        className={styles.monthDropdown}
                      >
                        {months.map((month, index) => (
                          <option key={index} value={index}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.yearSelector}>
                      <select
                        value={currentYear}
                        onChange={handleYearChange}
                        className={styles.yearDropdown}
                      >
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    className={styles.closeButton}
                    onClick={() => setShowDatePicker(false)}
                  >
                    ✕
                  </button>
                </div>

                <div className={styles.weekdaysGrid}>
                  {weekdays.map((day) => (
                    <div key={day} className={styles.weekdayHeader}>
                      {day}
                    </div>
                  ))}
                </div>

                <div className={styles.calendarGrid}>
                  {generateCalendarDays().map((dateObj, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleDateClick(dateObj.day, dateObj.isCurrentMonth)
                      }
                      disabled={!dateObj.isCurrentMonth}
                      className={`${styles.calendarDay} ${
                        !dateObj.isCurrentMonth ? styles.disabledDay : ""
                      } ${
                        isSelected(dateObj.day, dateObj.isCurrentMonth)
                          ? styles.selectedDay
                          : ""
                      } ${
                        isToday(dateObj.day, dateObj.isCurrentMonth)
                          ? styles.todayDay
                          : ""
                      }`}
                    >
                      {dateObj.day}
                    </button>
                  ))}
                </div>

                <div className={styles.datePickerFooter}>
                  <button onClick={handleClear} className={styles.clearButton}>
                    Clear
                  </button>
                  <button onClick={handleToday} className={styles.todayButton}>
                    Today
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewPlPage2;
