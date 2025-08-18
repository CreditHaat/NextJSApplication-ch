"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import "./BLApplyPageFirst.css"; // Import the CSS module from the same directory
import blimage1 from "./BLApplyImages/blappyimage1.png";
import NewNavBar from "../../components/NewPersonalLoan/Other Components/Navbar";
import SmartCoinFooter from "../SmartCoin/SmartCoinFooter";
import BLApplyLenders from "./BLApplyLenders";
import axios from "axios";
import otpimage from "./BLApplyImages/otpimage.jpeg";
import LendersList from "./LendersList";
import Loader from "./LendersLoader";
import OtpVerifyLoader from "./OtpVerifyLoader";
import ForSelfEmployed from "./ForSelfEmployed";
import ForSalaried from "./ForSalaried";

export default function BLPageFirst() {
  const [formData, setFormData] = useState({
    pan: "",
    mobileNumber: "",
    occupation: "",
    monthlyincome: "",
    profession: "",
    PaymentType: "",
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

    if (name === "pan") {
      // Remove non-alphabetical characters except spaces
      const sanitizedValue = value.replace(/[^a-zA-Z\s]/g, "");
      const nameParts = sanitizedValue.trim().split(" ");
      const fname = nameParts.length > 0 ? nameParts[0] : "";
      const surname =
        nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

      setLastname(surname);
      setFirstName(fname);

      // Validate name
      if (sanitizedValue.trim() === "") {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          pan: "Name is required",
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          pan: "",
        }));
      }
    }

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
    if (name === "monthlyincome") {
      if (/^\d+$/.test(value) || value === "") {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          monthlyincome: "",
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          monthlyincome: "Invalid monthly income",
        }));
      }
    }

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

    if (!formData.pan) errors.pan = "Name is required";
    if (!formData.mobileNumber)
      errors.mobileNumber = "Mobile number is required";
    else if (!/^[6789]\d{9}$/.test(formData.mobileNumber))
      errors.mobileNumber =
        "Mobile number must start with 6, 7, 8, or 9 and be 10 digits long";

    if (!formData.occupation) errors.occupation = "Occupation is required";
    if (!formData.monthlyincome)
      errors.monthlyincome = "Monthly income is required";
    else if (!/^\d+$/.test(formData.monthlyincome))
      errors.monthlyincome = "Invalid monthly income";

    if (!formData.PaymentType) errors.PaymentType = "Payment type is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const updateProgress = () => {
    let completedFields = 0;
    const totalFields = 5;

    Object.values(formData).forEach((value) => {
      if (value) completedFields++;
    });

    // Calculate progress and cap it at 50%
    const progressPercentage = (completedFields / totalFields) * 100;
    setProgress(Math.min(progressPercentage, 50));
  };

  const [activeContainer, setActiveContainer] = useState("FirstPage");

  // ......................................steps count code---------------------------------------

  const handleDataLayerStage = (stage) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ stage: stage });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleDataLayerStage(1); // Track step 2 when the form is submitted
      setOtpModal(true);
      handleFormSubmit(e);
    }
  };

  const handleFormSubmit = async (e) => {
    console.log("Inside this function 1");
    e.preventDefault();

    function handleDataLayerStart(
      flag,
      mobile_number,
      emptype,
      PaymentType,
      monthlyincome
    ) {
      console.log("INside handledatalayer , ", flag, mobile_number, emptype);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        mobileNumber: mobile_number,
        flag: flag,
        employmentType: emptype,
        PaymentType: PaymentType,
        monthlyincome: monthlyincome,
      });
    }

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
      formData1.append("income", formData.monthlyincome);
      formData1.append("profession", formData.occupation);
      formData1.append("paymentType", formData.PaymentType);
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
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}chfronetendotpgenerator_BLApplyPrime`,
        formData1
      );

      if (response.data.code === 0) {
        setStgOneHitId(response.data.obj.stgOneHitId);
        setstgTwoHitId(response.data.obj.stgTwoHitId);
        sett_experian_log_id(response.data.obj.t_experian_log_id);

        console.log("Before handleDataLayerStart");

        handleDataLayerStart(
          response.data.obj.user_exist,
          formData.mobileNumber,
          formData.occupation,
          formData.PaymentType,
          formData.monthlyincome
        );

        console.log("After handleDataLayerStart");
      }

      if (response.status === 200) {
      } else {
        console.error("Submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
      formData1.append("otp", otpInputs.join(""));
      formData1.append("stgOneHitId", stgOneHitId);
      formData1.append("stgTwoHitId", stgTwoHitId);
      formData1.append("t_experian_log_id", t_experian_log_id);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}verifyOTPNewPersonalloan`,
        formData1
      );

      if (response.data.code === 0) {
        setDobFlag(false);
        setResidentialPincodeFlag(false);
        setOtpStatus("");
        setOtpLoader(false);
        // setActiveContainer("LendersList");
        getLendersList(e);
        handleDataLayerStage(2);

        // setActiveContainer("")
        // setOtpModal(false);
      } else if (response.data.code === 1) {
        setDobFlag(true);
        setResidentialPincodeFlag(false);
        setOtpStatus("");
        setOtpLoader(false);
        // setActiveContainer("LendersList");
        getLendersList(e);
        handleDataLayerStage(2);
      } else if (response.data.code === 2) {
        setDobFlag(false);
        setResidentialPincodeFlag(true);
        setOtpStatus("");
        setOtpLoader(false);
        // setActiveContainer("LendersList");
        getLendersList(e);
        handleDataLayerStage(2);
      } else if (response.data.code === 3) {
        setDobFlag(true);
        setResidentialPincodeFlag(true);
        setOtpStatus("");
        setOtpLoader(false);
        // setActiveContainer("LendersList");
        getLendersList(e);
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

  const redirectLinkMethod = (applicationLink) => {
    setCpi(1); //HERE WE SET THE CPI to see if we have to redirect the user or to hit the api if cpi is 1 then we will set the redirection link else we will hit the api
    console.log("Inside the redirect link method");
    localStorage.setItem("applicationLink", applicationLink);
    if (formData.occupation === "Salaried") {
      handleDataLayerStage(3); // Track step 2 when the form is submitted
      setActiveContainer("forSalaried");
    } else {
      setActiveContainer("forSelfEmployed");
      handleDataLayerStage(3);
    }
  };

  const getLoanBackendMethod = (e, lenderProduct) => {
    setCpi(0);
    setLenderProduct(lenderProduct);
    handleDataLayerStage(3); // Track step 2 when the form is submitted
    setActiveContainer("forSalaried");
    if (formData.occupation === "Salaried") {
      setActiveContainer("forSalaried");
    } else {
      setActiveContainer("forSelfEmployed");
    }
  };

  return (
    <>
      {activeContainer !== "LendersList" && <NewNavBar />}

      {
        activeContainer === "forSelfEmployed" && (
          <ForSelfEmployed
            cpi={cpi}
            lenderProduct={lenderProduct}
            mainFormData={formData}
            dobFlag={dobFlag}
            residentialPincodeFlag={residentialPincodeFlag}
            setActiveContainer={setActiveContainer}
          />
        ) //here we will be calling sendin this api to the next page
      }

      {activeContainer === "forSalaried" && (
        <ForSalaried
          cpi={cpi}
          lenderProduct={lenderProduct}
          mainFormData={formData}
          dobFlag={dobFlag}
          residentialPincodeFlag={residentialPincodeFlag}
          setActiveContainer={setActiveContainer}
        />
      )}

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

      {activeContainer === "FirstPage" && (
        <div className={`blapplycontainer ${otpModal ? "blur" : ""}`}>
          <div className="blapplyrow">
            <div className="blapply-col-md-6">
              <div className="blapply-image-container">
                <Image
                  src={blimage1}
                  alt="Placeholder"
                  width={500}
                  height={500}
                />
              </div>
            </div>
            <div className="blapply-col-md-6-pl">
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <form onSubmit={handleSubmit}>
                {/* <h2>Check eligibility in 3 steps</h2> */}
                <div className="blapply-form-group">
                  <input
                    type="text"
                    id="pan"
                    name="pan"
                    value={formData.pan}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Name as per PAN"
                  />
                  {formErrors.pan && (
                    <span className="error">{formErrors.pan}</span>
                  )}
                </div>
                <div className="blapply-form-group">
                  <input
                    type="number"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="Mobile number"
                    inputMode="numeric"
                    maxLength="10"
                  />
                  {formErrors.mobileNumber && (
                    <span className="error">{formErrors.mobileNumber}</span>
                  )}
                </div>
                {/* <div className="blapply-form-group">
                  <input type="text" id="occupation" name="occupation" value={formData.occupation} onChange={handleChange} placeholder="Occupation" />
                  {formErrors.occupation && <span className="error">{formErrors.occupation}</span>}
                </div> */}
                {/* -------------------------------------------------------- */}

                <div className="blapply-form-group">
                  <select
                    id="profession"
                    name="profession"
                    value={formData.occupation}
                    onChange={(e) => {
                      setFormData({ ...formData, occupation: e.target.value });
                      setFormErrors({ ...formErrors, occupation: "" }); // Clear profession error on change
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
                  {formErrors.occupation && (
                    <span className="error">{formErrors.occupation}</span>
                  )}
                </div>

                {/* ----------------------------------------------------------- */}
                <div className="blapply-form-group">
                  <input
                    type="number"
                    id="monthlyincome"
                    name="monthlyincome"
                    value={formData.monthlyincome}
                    onChange={handleChange}
                    placeholder="Monthly income"
                    inputMode="numeric"
                  />
                  {formErrors.monthlyincome && (
                    <span className="error">{formErrors.monthlyincome}</span>
                  )}
                </div>
                <div className="blapply-form-group">
                  <select
                    id="profession"
                    name="profession"
                    value={formData.PaymentType}
                    onChange={(e) => {
                      setFormData({ ...formData, PaymentType: e.target.value });
                      setFormErrors({ ...formErrors, PaymentType: "" }); // Clear profession error on change
                    }}
                    onBlur={(e) =>
                      setFormErrors({
                        ...formErrors,
                        PaymentType: e.target.value
                          ? ""
                          : "Payment Type is required",
                      })
                    }
                  >
                    {/* id="profession" name="profession" value={formData.PaymentType} onChange={handleChange}> */}
                    <option value="">Payment type</option>
                    <option value="0">Cash</option>
                    <option value="1">Check</option>
                    <option value="2">Bank transfer</option>
                  </select>
                  {formErrors.PaymentType && (
                    <span className="error">{formErrors.PaymentType}</span>
                  )}
                </div>
                <div className="blapply-group mb-2">
                  <p
                    className="terms-text"
                    style={{
                      color: "#000000a6",
                      height: "40px",
                      textAlign: "justify",
                      overflowX: "hidden",
                      overflowY: "auto",
                    }}
                  >
                    By clicking "Send OTP" button and accepting the terms and
                    conditions set out here in, you provide your express consent
                    to EarlySalary Services Private Limited(fibe), Whizdm
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
                <button
                  type="submit"
                  className="blapply-button"
                  style={{ color: "#3e2780" }}
                >
                  Apply
                </button>
              </form>
            </div>
          </div>

          {/* OTP Verification Modal */}
          {otpModal && (
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

                  <p style={{ color: "red", textAlign: "center" }}>
                    {otpStatus}
                  </p>

                  <div style={{ textAlign: "center" }}>
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

          <div className="blapply-textsection">
            CreditHaat does not charge any fees from the user. A sample loan
            calculation for ₹1,00,000 borrowed for 1 year, with interest rate
            @13% per annum*, is as provided below: Processing fee (@ 2%) =
            ₹2,000 + GST = ₹2,360 Interest = ₹7,181 EMI = ₹8,932 Total amount to
            be repaid after a year = ₹1,10,129/- *Interest Rate varies based on
            your risk profile The maximum Annual Interest Rate (APR) can go up
            to 36%
          </div>
          <SmartCoinFooter />
        </div>
      )}
    </>
  );
}
