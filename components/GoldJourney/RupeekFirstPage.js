"use client";
import React, { useState, useRef } from "react";
import "./RupeekFirstPage.css";
import EmblaCarousel from "../NewBlJourneyD/Emblacarousel/js/EmblaCarousel";
import listimage1 from "../NewBlJourneyD/newblimages/newchange11.png";
import listimage2 from "../NewBlJourneyD/newblimages/newchange3.png";
import listimage3 from "../NewBlJourneyD/newblimages/newchange2.png";
import styles from "../NewBlJourneyD/NewBlFirstFormPage.module.css";
import { Roboto } from "next/font/google";
import RupeekSecondPage from "./RupeekSecondPage";
import axios from "axios";
import Link from "next/link";

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

const RupeekFirstPage = ({ searchParams }) => {
  // Declare all state variables at the top
  const [formState, setFormState] = useState({
    fullName: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    panNumber: "",
    email: "",
    pinCode: "",
  });
  const [errors, setErrors] = useState({});
  const [showFullConsent, setShowFullConsent] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState(null);
  const [stgOneHitId, setStgOneHitId] = useState(null);
  const [stgTwoHitId, setstgTwoHitId] = useState(null);
  const [t_experian_log_id, sett_experian_log_id] = useState(null);

  const [showRejection, setShowRejection] = useState(false);

  const formRef = useRef(null);
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    const { fullName, mobileNumber, panNumber, email, pinCode } = formState;

    if (!fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    } else if (!/^[A-Za-z\s]{3,50}$/.test(fullName)) {
      newErrors.fullName =
        "Name should only contain letters and spaces (3-50 characters)";
    }

    if (!mobileNumber) {
      newErrors.mobileNumber = "Please enter your mobile number";
    } else if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid 10-digit mobile number";
    }

    if (!panNumber) {
      newErrors.panNumber = "Please enter your PAN number";
    } else if (!panRegex.test(panNumber.toUpperCase())) {
      newErrors.panNumber =
        "Please enter a valid PAN number (e.g., ABCDE1234F)";
    }

    if (!pinCode) {
      newErrors.pinCode = "Please enter your pincode";
    } else if (!/^\d{6}$/.test(pinCode)) {
      newErrors.pinCode = "Please enter a valid 6-digit pincode";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle name change and split into first/last name
  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^A-Za-z\s]/g, "");
    const nameParts = value.trim().split(" ");
    const firstName = nameParts.length > 0 ? nameParts[0] : "";
    const lastName =
      nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

    setFormState((prev) => ({
      ...prev,
      fullName: value,
      firstName,
      lastName,
    }));

    // Clear the error when the user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, fullName: "" }));
  };

  // Handle mobile number change
  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setFormState((prev) => ({ ...prev, mobileNumber: value }));
    }

    // Clear the error when the user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, mobileNumber: "" }));
  };

  // Handle PAN number change
  const handlePanChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (value.length <= 10) {
      setFormState((prev) => ({ ...prev, panNumber: value }));
    }

    // Clear the error when the user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, panNumber: "" }));
  };

  // Handle email change
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setFormState((prev) => ({ ...prev, email: value }));

    // Clear the error when the user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
  };

  // Handle pincode change
  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) {
      setFormState((prev) => ({ ...prev, pinCode: value }));
    }

    // Clear the error when the user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, pinCode: "" }));
  };

  // Backend connection first page
  const handleFirstPageSubmit = async (e) => {
    e.preventDefault();
    try {
      const queryParams = new URLSearchParams(location.search);
      const channel = queryParams.get("channel") || "";
      const dsa = queryParams.get("dsa") || "";
      const source = queryParams.get("source") || "";
      const subSource = queryParams.get("sub_source") || "";
      const subDsa = queryParams.get("sub_dsa") || "";
      const urllink = location.search?.split("?")[1] || "null";

      const formData1 = new FormData();
      formData1.append("firstName", formState.firstName);
      formData1.append("lastName", formState.lastName);
      formData1.append("mobileNumber", formState.mobileNumber);
      formData1.append("panNumber", formState.panNumber);
      formData1.append("email", formState.email);
      formData1.append("pinCode", formState.pinCode);
      formData1.append("dsa", dsa);
      formData1.append("campaign", urllink);
      formData1.append("channel", channel);
      formData1.append("source", source);
      formData1.append("sub_source", subSource);
      formData1.append("sub_dsa", subDsa);

      console.log("Before response");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}rupeekngold_new`,
        formData1
      );

      console.log("After response");

      if (response.data.code === 0) {
        console.log("The response is 0");
        setStgOneHitId(response.data.obj.stgOneHitId);
        setstgTwoHitId(response.data.obj.stgTwoHitId);
        sett_experian_log_id(response.data.obj.t_experian_log_id);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form validated");
      const submittedData = { ...formState };
      handleFirstPageSubmit(e);
      setFormData(submittedData);
      setShowSuccess(true);
    }
  };

  // Handle back navigation
  const handleBack = () => {
    setShowSuccess(false);
  };

  // Early return for success state
  if (showSuccess) {
    {
      console.log(
        "The formState mobile number on first page is : ",
        formState.mobileNumber
      );
    }
    return (
      <RupeekSecondPage
        formState={formState}
        formData={formData}
        onBack={handleBack}
      />
    );
  }

  // if(showRejection) {
  //   return <IndiaGoldRejectPage/>;
  // }

  return (
    <div className={`${roboto.className} page-container`}>
      <div className="carousel-background">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
      <div
        className="newfirstcard-container"
        style={{ boxSizing: "content-box" }}
      >
        <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
          {/* Full Name Field */}
          <div className={styles.formGroup}>
            <label style={{ fontWeight: "bold" }}>Full name (as per PAN)</label>
            <input
              type="text"
              value={formState.fullName}
              onChange={handleNameChange}
              placeholder="Enter your full name"
              className={styles.input}
              maxLength={50}
            />
            {errors.fullName && (
              <p style={{ color: "red" }}>{errors.fullName}</p>
            )}
          </div>

          {/* Mobile Number Field */}
          <div className={styles.formGroup}>
            <label style={{ fontWeight: "bold" }}>Mobile number</label>
            <input
              type="tel"
              value={formState.mobileNumber}
              onChange={handleMobileChange}
              placeholder="Enter 10-digit mobile number"
              className={styles.input}
              maxLength={10}
            />
            {errors.mobileNumber && (
              <p style={{ color: "red" }}>{errors.mobileNumber}</p>
            )}
          </div>

          {/* PAN Number Field */}
          <div className={styles.formGroup}>
            <label style={{ fontWeight: "bold" }}>PAN number</label>
            <input
              type="text"
              value={formState.panNumber}
              onChange={handlePanChange}
              placeholder="Enter PAN number"
              className={styles.input}
              maxLength={10}
            />
            {errors.panNumber && (
              <p style={{ color: "red" }}>{errors.panNumber}</p>
            )}
          </div>

          {/* Email Field */}
          <div className={styles.formGroup}>
            <label style={{ fontWeight: "bold" }}>Email</label>
            <input
              type="email"
              value={formState.email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className={styles.input}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>

          {/* Pincode Field */}
          <div className={styles.formGroup}>
            <label style={{ fontWeight: "bold" }}>Pincode</label>
            <input
              type="number"
              value={formState.pinCode}
              onChange={handlePincodeChange}
              placeholder="Enter 6-digit pincode"
              className={styles.input}
              maxLength={6}
            />
            {errors.pinCode && <p style={{ color: "red" }}>{errors.pinCode}</p>}
          </div>

          <div className={styles.formGroup}>
            <label>
              {showFullConsent ? (
                <>
                  You hereby consent to CreditHaat being appointed as your
                  authorized representative to receive your Credit Information
                  from Experian for the purpose of accessing credit worthiness
                  and availing pre-approved offers (“End Use Purpose”). You
                  hereby agree to Terms and Conditions. I authorize CreditHaat,
                  its partner financial institutes/lenders and their
                  representatives to Call, SMS or communicate via WhatsApp
                  regarding my application. This consent overrides any
                  registration for DNC / NDNC. I confirm I am in India, I am a
                  major and a resident of India and I have read and I accept
                  CreditHaat Privacy Policy Click here to read the{" "}
                  <Link href="https://www.credithaat.com/privacy">
                    {" "}
                    PRIVACY POLICY{" "}
                  </Link>
                  &{" "}
                  <Link href="https://www.credithaat.com/termsC">
                    {" "}
                    TERMS OF SERVICE
                  </Link>
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
            {errors.consent && <p style={{ color: "red" }}>{errors.consent}</p>}
          </div>

          <div className={styles.formGroup}>
            <label>
              {showConsent ? (
                <>
                  By agreeing and accepting the terms and conditions set out
                  herein, you provide your express consent to EarlySalary
                  Services Private Limited(fibe), Whizdm Innovations Pvt Ltd,
                  Upwards Fintech Services Pvt Ltd, Tata Capital Financial
                  Services Ltd, SmartCoin Financials Pvt Ltd, MWYN Tech Pvt Ltd,
                  L&T Finance Ltd, Krazybee Services Pvt Ltd, Infocredit
                  Services Pvt. Ltd, Incred Financial Services, IIFL Finance
                  Ltd, EQX Analytics Pvt Ltd, EPIMoney Pvt Ltd, Bhanix finance
                  and Investment LTd, Aditya Birla Finance Ltd to access the
                  credit bureaus and credit information report and credit score.
                  You also hereby irrevocably and unconditionally consent to
                  usage of such credit information being provided by credit
                  bureaus.
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
            <br /> A sample loan calculation for ₹1,00,000 borrowed for 1 year,
            with interest rate @13% per annum*, is as provided below: <br />
            Processing fee (@ 2%) = ₹2,000 + GST = ₹2,360
          </div>
          <div className={styles.stickyButton}>
            <button
              type="submit"
              className={`${styles.button} ${styles.submitButton}`}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RupeekFirstPage;
