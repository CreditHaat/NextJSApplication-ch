"use client";
import React, { useState, useRef, useEffect } from "react";
// import newploanimageone from "./SmartCoin_Images/image.png";
import Image from "next/image";
import "./page.css";
import "bootstrap/dist/css/bootstrap.min.css";
import newploanimageone from "./SmartCoin_Images/smartcoin-next-image.png";
// import "./MainComponent.css";
import axios from "axios";
// import otpimage from './SmartCoinImages/otpimage.png';
import otpimage from "./SmartCoin_Images/otpimage.png";
import SmartCoinSecondPage from "./SmartCoinSecondPage";
import SmartCoinThirdPage from "./SmartCoinThirdPage";
import OtpVerifyLoader from "./SmartCoinOtpVerifyLoader";
import ApplicationPopup from "./SmartCoinApplicationPopup";
import ErrorPopup from "./SmartCoinErrorPopup";
import ApplicationLoader from "../NewPersonalLoan/Other Components/ApplicationLoader";

export const Form = () => {
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    profession: "",
  });

  const [showOTPModal, setShowOTPModal] = useState(false);
  const [activeContainer, setActiveContainer] = useState("otpVerification");
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
  const otpInputRefs = useRef([]);
  const [otpStatus, setOtpStatus] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [activeSecondForm, setActiveSecondForm] = useState(false);
  const [ResidentialPincodeFlag, setResidentialPincodeFlag] = useState(true);
  const [isCameFromBackend, setIsCameFromBackend] = useState(false);
  // const [link, setLink] = useState("https://www.google.com");
  const [link, setLink] = useState("");
  const [errorPopup, setErrorPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [stgOneHitId, setStgOneHitId] = useState(null);
  const [stgTwoHitId, setstgTwoHitId] = useState(null);
  const [t_experian_log_id, sett_experian_log_id] = useState(null);
  const [dobFlag, setDobFlag] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    profession: "",
  });

  useEffect(() => {
    // Initialize refs array with refs to each OTP input field
    otpInputRefs.current = otpInputs.map(
      (_, i) => otpInputRefs.current[i] || React.createRef()
    );
  }, [otpInputs]);

  const validateForm = () => {
    let valid = true;
    const errors = {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      profession: "",
    };

    // First Name validation
    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
      valid = false;
    } else if (!/^[a-zA-Z]*$/g.test(formData.firstName.trim())) {
      errors.firstName = "First Name should contain only letters";
      valid = false;
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
      valid = false;
    } else if (!/^[a-zA-Z]*$/g.test(formData.lastName.trim())) {
      errors.lastName = "Last Name should contain only letters";
      valid = false;
    }

    // Mobile Number validation
    if (!formData.mobileNumber.trim()) {
      errors.mobileNumber = "Mobile Number is required";
      valid = false;
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber.trim())) {
      errors.mobileNumber =
        "Mobile Number should start with a digit between 6 to 9 and be 10 digits long";
      valid = false;
    }

    // Profession validation
    if (!formData.profession.trim()) {
      errors.profession = "Profession is required";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleCloseOTPModal = () => {
    setShowOTPModal(false);
    // Clear OTP inputs when modal is closed
    setOtpInputs(["", "", "", "", "", ""]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (validateForm()) {
      handleFormSubmit(e); //This will save the data to the backend
      setShowOTPModal(true);
    }
  };

  const handleFirstNameChange = (e) => {
    // Remove any digits from the input value
    const value = e.target.value.replace(/\d/g, "");
    setFormData({ ...formData, firstName: value });

    // Clear error message when user starts typing valid input
    if (formErrors.firstName) {
      setFormErrors({ ...formErrors, firstName: "" });
    }
  };

  const handleLastNameChange = (e) => {
    // Remove any digits from the input value
    const value = e.target.value.replace(/\d/g, "");
    setFormData({ ...formData, lastName: value });

    // Clear error message when user starts typing valid input
    if (formErrors.lastName) {
      setFormErrors({ ...formErrors, lastName: "" });
    }
  };

  const handleNext = () => {
    console.log("Inside handle next");
    setActiveContainer("formUpdatedSecond");
    setActiveSecondForm(true);
  };

  const handleMobileNumberChange = (e) => {
    // Remove any non-digit characters from the input value
    const value = e.target.value.replace(/\D/g, "").slice(0, 10); // Keep only the first 10 digits
    setFormData({ ...formData, mobileNumber: value });

    // Clear error message when user starts typing valid input
    if (formErrors.mobileNumber) {
      setFormErrors({ ...formErrors, mobileNumber: "" });
    }
  };

  const handlePrevious = () => {
    setActiveSecondForm(false);
    setActiveContainer("formUpdated");
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
      formData1.append("firstName", formData.firstName);
      formData1.append("lastName", formData.lastName);
      formData1.append("profession", formData.profession);
      formData1.append("dsa", dsa);
      formData1.append("channel", channel);
      formData1.append("source", source);
      formData1.append("sub_source", subSource);
      formData1.append("campaign", urllink);
      formData1.append("sub_dsa", subDsa);

      // const response = await axios.post(`${process.env.REACT_APP_BASE_URL}chfronetendotpgenerator`, formData1, {
      //     headers: {
      //         'Content-Type': 'application/json',
      //     },
      // });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}chfronetendotpgenerator_new`,
        formData1
      );

      if (response.data.code === 0) {
        setStgOneHitId(response.data.obj.stgOneHitId);
        setstgTwoHitId(response.data.obj.stgTwoHitId);
        sett_experian_log_id(response.data.obj.t_experian_log_id);
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
  };

  const verify_otp_credithaat_from_backend = async (e) => {
    // e.preventDefault();
    setOtpLoader(true);
    try {
      const formData1 = new FormData();
      formData1.append("mobileNumber", formData.mobileNumber);
      formData1.append("otp", otpInputs.join(""));
      formData1.append("stgOneHitId", stgOneHitId);
      formData1.append("stgTwoHitId", stgTwoHitId);
      formData1.append("t_experian_log_id", t_experian_log_id);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}verifyOTPNewPersonalloan`,
        formData1
      );

      console.log("Otp response code is : ", response.data.code);

      if (response.data.code === 0) {
        setDobFlag(false);
        setOtpVerified(true);
        setActiveContainer("formUpdated");
        setShowOTPModal(false);
        setResidentialPincodeFlag(false);
        setOtpLoader(false);
      } else if (response.data.code === 1) {
        setDobFlag(true);
        setOtpVerified(true);
        setActiveContainer("formUpdated");
        setShowOTPModal(false);
        setResidentialPincodeFlag(false);
        setOtpLoader(false);
      } else if (response.data.code === 2) {
        setDobFlag(false);
        setOtpVerified(true);
        setActiveContainer("formUpdated");
        setShowOTPModal(false);
        setResidentialPincodeFlag(true);
        setOtpLoader(false);
      } else if (response.data.code === 3) {
        setDobFlag(true);
        setOtpVerified(true);
        setActiveContainer("formUpdated");
        setShowOTPModal(false);
        setResidentialPincodeFlag(true);
        setOtpLoader(false);
      } else {
        setOtpLoader(false);
        setOtpStatus("Incorrect OTP! Try Again..");
        console.log("Otp incorrect");
        setOtpInputs(["", "", "", "", "", ""]);
      }

      if (response.status === 200) {
      } else {
        console.error("Submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const getLoanBackend = async (e) => {
    console.log("Inside get loan backend");

    setIsLoading(true);

    e.preventDefault();

    try {
      const formData1 = new FormData();
      formData1.append("mobileNumber", formData.mobileNumber);
      // formData1.append("firstName", formData.firstName);
      // formData1.append("lastName", formData.lastName);
      // formData1.append("emptype", "salaried");
      // formData1.append("email", "deshmukht100@gmail.com");
      // formData1.append("pincode", "411014");
      // formData1.append("pan", "ABCDE1234F");
      // // formData1.append("dob", formData.dob);
      // formData1.append("income", "90000");
      // formData1.append("paymenttype", "Bank Transfer");
      // formData1.append("gender", "male");

      // setlenderName(productname);

      // console.log("product name is T_ : ", productname);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}submitapi_smartcoin`,
        formData1
      //   // {
      //   //   headers: {
      //   //     "Content-Type": "application/json",
      //   //     token: "Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=", // Add your token here
      //   //   },
      //   // }
      );

      console.log("after backend");

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      if (response.data.code === 0) {
        console.log("inside when code is 0 ");
        setIsCameFromBackend(true);
        // var redirectionlink =
        //   response.data.data.lender_details[0].applicationlink;
        // setLink(redirectionlink);

        var redirectionlink = response.data.msg;
        setLink(redirectionlink);
        // {!setIsLoading && <ApplicationPopup link={link}/>}
      }

      if (response.data.code === -1) {
        // setIsCameFromBackend(true);
        setErrorPopup(true); //This will be true when the code will be -1
      }
    } catch (error) {}
  };

  const [otpLoader, setOtpLoader] = useState(false);

  return (
    <>
      <div className="ploancontainer">
        {otpLoader && <OtpVerifyLoader />}
        {isLoading && <ApplicationLoader />}
        {isCameFromBackend && <ApplicationPopup link={link} />}
        {errorPopup && (
          <ErrorPopup setErrorPopup={setErrorPopup} lenderName={"smartcoin"} formData={formData} />
        )}

        {activeContainer === "otpVerification" && !otpVerified && (
          <div className="ploanrow">
            <div className="ploan-col-md-6">
              {/* <div className="ploan-text-container">
              <h1>Your personal loan awaits!</h1>
            </div> */}
              <div className="ploan-image-container">
                {/* <img src={newploanimageone} alt="Placeholder" /> */}
                <Image
                  src={newploanimageone}
                  width={800}
                  height={800}
                  alt="Placeholder"
                  layout="intrinsic"
                  style={{borderRadius:"10px"}}
                />
              </div>
            </div>
            <div className="ploan-col-md-6-pl">
              <form onSubmit={handleSubmit}>
                <h2 style={{textAlign:"center"}}>Details</h2>
                <div className="ploan-form-group">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleFirstNameChange}
                  />
                  {formErrors.firstName && (
                    <span className="error">{formErrors.firstName}</span>
                  )}
                </div>
                <div className="ploan-form-group">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleLastNameChange}
                  />
                  {formErrors.lastName && (
                    <span className="error">{formErrors.lastName}</span>
                  )}
                </div>
                <div className="ploan-form-group">
                  <input
                    type="text"
                    id="mobileNumber"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    inputMode="numeric"
                    value={formData.mobileNumber}
                    onChange={handleMobileNumberChange}
                  />
                  {formErrors.mobileNumber && (
                    <span className="error">{formErrors.mobileNumber}</span>
                  )}
                </div>
                <div className="ploan-form-group">
                  <select
                    id="profession"
                    name="profession"
                    value={formData.profession}
                    onChange={(e) => {
                      setFormData({ ...formData, profession: e.target.value });
                      setFormErrors({ ...formErrors, profession: "" }); // Clear profession error on change
                    }}
                    onBlur={(e) =>
                      setFormErrors({
                        ...formErrors,
                        profession: e.target.value
                          ? ""
                          : "Occupation is required",
                      })
                    }
                  >
                    <option value="">Occupation</option>
                    <option value="Salaried">Salaried</option>
                    <option value="Self Employed">Self employed</option>
                    <option value="Business">Business</option>
                  </select>
                  {formErrors.profession && (
                    <span className="error">{formErrors.profession}</span>
                  )}
                </div>
                <div className="input-group mb-2 ">
                  <p
                    className="terms-text"
                    style={{
                      color: "#000000a6",
                      height: "40px",
                      textAlign: "justify",
                      overflowX: "hidden",
                      overflowY: "auto",
                      fontSize: "13px",
                    }}
                  >
                    By clicking "Apply now" button and accepting the terms and
                    conditions set out here in, you provide your express consent
                    to Social Worth Technologies Private Limited, Whizdm
                    Innovations Pvt Ltd, Upwards Fintech Services Pvt Ltd, Tata
                    Capital Financial Services Ltd, SmartCoin Financials Pvt
                    Ltd, MWYN Tech Pvt Ltd, L&T Finance Ltd, Krazybee Services
                    Pvt Ltd, Infocredit Services Pvt. Ltd, Incred Financial
                    Services, IIFL Finance Ltd, EQX Analytics Pvt Ltd, EPIMoney
                    Pvt Ltd, Bhanix finance and Investment LTd, Aditya Birla
                    Finance Ltd to access the credit bureaus and credit
                    information report and credit score. You also hereby
                    irrevocably and unconditionally consent to usage of such
                    credit information being provided by credit bureaus
                  </p>
                </div>

                <div style={{width:"100%", textAlign:"center"}}>
                <button type="submit" className="ploan-btn-btn-primary">
                  Apply now
                </button>
                </div>

                
              </form>
            </div>
          </div>
        )}
        {/* OTP Verification Modal */}
        {showOTPModal && (
          <div className="modal-background">
            <div className="modal-container" style={{ width: "350px" }}>
              <div className="loan-modal-content">
                {/* Close button */}
                <button className="otpclose" onClick={handleCloseOTPModal}>
                  X
                </button>
                <h3>Verify OTP</h3>
                {/* <img src={otpimage} alt='otpimage'></img> */}
                <Image
                  src={otpimage}
                  width={300}
                  height={300}
                  layout="intrinsic"
                  alt="otpimage"
                />
                <p>
                  An OTP has been sent to your mobile number. Please enter the
                  OTP to proceed.
                </p>
                <div className="otp-input-container">
                  {otpInputs.map((otp, index) => (
                    <input
                      key={index}
                      ref={otpInputRefs.current[index]}
                      type="text"
                      maxLength="1"
                      value={otp}
                      onChange={(e) =>
                        handleOtpInputChange(index, e.target.value)
                      }
                      className="otp-input"
                      inputMode="numeric"
                    />
                  ))}
                </div>

                <p style={{ color: "red", textAlign: "center" }}>{otpStatus}</p>

                <div>
                  <button
                    onClick={handleVerifyOTP}
                    className="ploan-btn-btn-primary"
                  >
                    Verify OTP
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeContainer === "formUpdated" &&
          otpVerified &&
          !activeSecondForm && (
            <SmartCoinSecondPage
              onNext={handleNext}
              dobFlag={dobFlag}
              mainFormData={formData}
            />
          )}

        {activeContainer === "formUpdatedSecond" && activeSecondForm && (
          <SmartCoinThirdPage
            onPrevious={handlePrevious}
            mainFormData={formData}
            getLoanBackend={getLoanBackend}
            setIsLoading2={setIsLoading}
            // getLendersList={getLendersList}
            // setIsLoadingforLoader={setIsLoading}
            ResidentialPincodeFlag={ResidentialPincodeFlag}
          />
        )}
      </div>
    </>
  );
};

export default Form;
