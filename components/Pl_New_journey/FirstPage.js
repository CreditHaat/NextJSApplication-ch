"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./FirstPage.module.css";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Roboto } from "next/font/google";
import NewPlPage from "./SecondPage" ;

import stopwatch from "../../images/Icons-stopwatch.png";
import calender from "../../images/Icons-calendar.png";
import chlogo from "../../images/Frame 48095781.png";
import exp from "../../images/Experiannew.png";
const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});
function FirstPage({ params, searchParams }) {
  const handleBoxClick = (inputRef) => {
    inputRef.current?.focus();
  };
  const mobileRef = useRef(null);

  const [mobileNumber, setMobileNumber]   = useState("");
  const [showOTPbottomsheet, setShowOTPbottomsheet] = useState(false);
  const [isLoading, setIsLoading]         = useState(false);
  const [otp, setOtp]                     = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError]           = useState("");
  const otpRefs                           = useRef([]);
  const otpAutoFilledRef                  = useRef(false);
  const otpSessionIdRef                   = useRef(null);

  const [formErrors, setFormErrors] = useState({
  mobileNumber: ""});

  const [showFullConsent,      setShowFullConsent]      = useState(false);
  const [showFullConsentTwo,   setShowFullConsentTwo]   = useState(false);
  const [showFullConsentThree, setShowFullConsentThree] = useState(false);

  // stg IDs from send-OTP response — needed for verify call
  const [stgOneHitId,       setStgOneHitId]       = useState(null);
  const [stgTwoHitId,       setStgTwoHitId]       = useState(null);
  const [t_experian_log_id, setTExperianLogId]    = useState(null);


  // Once verified, switch to NewPlPage
  const [goToMainForm, setGoToMainForm] = useState(false);

const handleMobileChange = (e) => {
  const value = e.target.value.replace(/\D/g, "");
  if (value.length <= 10) {
    setMobileNumber(value);

        if (formErrors.mobileNumber) {
      setFormErrors((prev) => ({ ...prev, mobileNumber: "" }));
    }
  }
};


 function getDeviceId() {
    let deviceId = localStorage.getItem("device_id");
    if (!deviceId) {
      deviceId = crypto.randomUUID();
      localStorage.setItem("device_id", deviceId);
    }
    return deviceId;
  }

  // ── Validate mobile ────────────────────────────────────────────
const validateForm = () => {

  let errors = {};

  if (!mobileNumber.trim()) {
    errors.mobileNumber = "Mobile number is required";
  } 
  else if (mobileNumber.length !== 10) {
    errors.mobileNumber = "Mobile number must be 10 digits";
  }
  else if (!/^[6-9]/.test(mobileNumber)) {
    errors.mobileNumber = "Mobile number must start with 6-9";
  }

  setFormErrors(errors);

  return Object.keys(errors).length === 0;
};

  // ── Send OTP ───────────────────────────────────────────────────
  const handleCheckEligibility = async () => {
    if (isLoading) return;
    if (!validateForm()) return;
        const finalMobile = mobileNumber.replace(/\D/g, "").slice(-10);


    setIsLoading(true);

    try {           
      const queryParams = new URLSearchParams(location.search);

      // Retrieve values for the specified parameters
      const channel = queryParams.get("channel") || "";
      const dsa = queryParams.get("dsa") || "";
      const source = queryParams.get("source") || "";
      const subSource = queryParams.get("sub_source") || "";
      const subDsa = queryParams.get("sub_dsa") || "";
      const urllink = location.search?.split("?")[1] || "null";

      const fd = new FormData();
      fd.append("userPhoneNumber", finalMobile);
      fd.append("firstName", "");
      fd.append("lastName", "");
      fd.append("profession",  "");
      fd.append("income",      "");
      fd.append("paymentType", "");
      fd.append("pan",         "");
      fd.append("dsa",         dsa);
      fd.append("channel",     channel);
      fd.append("source",      source);
      fd.append("sub_source",  subSource);
      fd.append("campaign",    urllink);
      fd.append("sub_dsa",     subDsa);

      fd.append("deviceId", getDeviceId());


      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}chfronetendotpgenerator_PlApplyNew_NEW`,
        fd
      );

      if (res.data.code === 0) {
        setStgOneHitId(res.data.obj.stgOneHitId);
        setStgTwoHitId(res.data.obj.stgTwoHitId);
        setTExperianLogId(res.data.obj.t_experian_log_id);

        // Open OTP bottom sheet
        const sessionId = Date.now() + Math.random();
        otpSessionIdRef.current = sessionId;
        setOtp(["", "", "", "", "", ""]);
        setOtpError("");
        otpAutoFilledRef.current = false;
        setShowOTPbottomsheet(true);
        setTimeout(() => otpRefs.current[0]?.focus(), 100);
      } else {
        setFormErrors({ mobileNumber: "Failed to send OTP. Please try again." });
      }
    } catch (err) {
      console.error("Send OTP error:", err);
      setFormErrors({ mobileNumber: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  // ── OTP input handlers (same as NewLandingPage) ────────────────
  const handleOtpChange = (e, index) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");

    if (numericValue.length === 6) {
      setOtp(numericValue.split(""));
      setOtpError("");
      otpAutoFilledRef.current = true;
      setTimeout(() => otpRefs.current[5]?.focus(), 0);
      return;
    }
    if (numericValue.length > 1) {
      const newOtp = [...otp];
      numericValue.split("").forEach((d, i) => { if (index + i < 6) newOtp[index + i] = d; });
      setOtp(newOtp);
      setOtpError("");
      otpAutoFilledRef.current = true;
      setTimeout(() => otpRefs.current[Math.min(index + numericValue.length, 5)]?.focus(), 0);
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = numericValue;
    setOtp(newOtp);
    if (otpError) setOtpError("");
    if (numericValue && index < 5) setTimeout(() => otpRefs.current[index + 1]?.focus(), 0);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      if (newOtp[index]) { newOtp[index] = ""; setOtp(newOtp); }
      else if (index > 0) { newOtp[index - 1] = ""; setOtp(newOtp); setTimeout(() => otpRefs.current[index - 1]?.focus(), 0); }
      if (otpError) setOtpError("");
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const numeric = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
    if (numeric.length >= 6) {
      setOtp(numeric.slice(0, 6).split(""));
      setOtpError("");
      otpAutoFilledRef.current = true;
      setTimeout(() => otpRefs.current[5]?.focus(), 0);
    }
  };

  const resetOtp = useCallback(() => {
    setOtp(["", "", "", "", "", ""]);
    otpAutoFilledRef.current = false;
    setTimeout(() => otpRefs.current[0]?.focus(), 10);
  }, []);

  // ── Verify OTP ─────────────────────────────────────────────────
  const handleVerifyOTP = useCallback(async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setOtpError("Please enter complete 6-digit OTP");
      return;
    }
    setIsLoading(true);

    try {
      const fd = new FormData();
      fd.append("mobileNumber",      mobileNumber.replace(/\D/g, "").slice(-10));
      fd.append("otp",               otpString);
      fd.append("stgOneHitId",       stgOneHitId);
      fd.append("stgTwoHitId",       stgTwoHitId);
      fd.append("t_experian_log_id", t_experian_log_id);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}verifyOTPNewPersonalloan_NEW`,
        fd
      );

      // if ([0].includes(res.data.code)) {
      if(res.data.code === 0){
        setShowOTPbottomsheet(false);
        setGoToMainForm(true); // Go to NewPlPage
      } else {
        setOtpError("Incorrect OTP! Please try again.");
        resetOtp();
      }
    } catch (err) {
      console.error("Verify OTP error:", err);
      setOtpError("Verification failed. Please try again.");
      resetOtp();
    } finally {
      setIsLoading(false);
    }
  }, [otp, mobileNumber, stgOneHitId, stgTwoHitId, t_experian_log_id, resetOtp]);

  const closeBottomSheet = () => {
    setShowOTPbottomsheet(false);
    otpSessionIdRef.current = null;
    resetOtp();
    setOtpError("");
  };

  // WebOTP API (auto-fill from SMS)
  useEffect(() => {
    if (!showOTPbottomsheet || otpAutoFilledRef.current || !otpSessionIdRef.current) return;
    const currentSessionId = otpSessionIdRef.current;
    const abortController  = new AbortController();
    let hasAutoFilled = false;

    if ("OTPCredential" in window) {
      navigator.credentials
        .get({ otp: { transport: ["sms"] }, signal: abortController.signal })
        .then((otpCredential) => {
          if (otpCredential?.code && !hasAutoFilled && !otpAutoFilledRef.current && currentSessionId === otpSessionIdRef.current) {
            const code = otpCredential.code;
            if (code.length === 6) {
              hasAutoFilled = true;
              setOtp(code.split(""));
              setOtpError("");
              otpAutoFilledRef.current = true;
            }
          }
        })
        .catch((err) => { if (err.name !== "AbortError") console.log("WebOTP error:", err.message); });
    }
    return () => { abortController.abort(); hasAutoFilled = false; };
  }, [showOTPbottomsheet]);

  // ── Render NewPlPage after OTP verified ───────────────────────
  if (goToMainForm) {
    return (
      <NewPlPage
        params={params}
        searchParams={searchParams}
        prefillMobile={mobileNumber.replace(/\D/g, "").slice(-10)}
        onBack={() => setGoToMainForm(false)}
      />
    );
  }

  // ── Main UI ────────────────────────────────────────────────────
  return (
    <>
      {/* <div className={styles.topdiv} style={{ fontFamily: "normal" }}> */}
     <div className={`${styles.topdiv} ${roboto.className}`}>

        <div className={styles.mainContainer}>
          <div className={styles.container}>
            <div className={styles.topchildren}>
              <div className={styles.logoContainer}>
                <Image
                  src={chlogo}
                  width={140}
                  height={50}
                  className={styles.logo}
                  alt="Credithaat logo"
                  priority
                />
              </div>
            </div>

            <div className={styles.topBannerDiv}>
              <div className={styles.bannerText} >
                <h3>
                  Loans
                  <br />
                  Upto ₹10 Lacs,
                  <br />
                  Starting
                  <br /> 10.99 % p.a
                </h3>
              </div>
            </div>
            <div className={styles.children}>
              <div className={styles.topColorPrt}>
                <div className={styles.imageSection}>
                  <div className={styles.imageComponet}>
                    <Image
                      src={stopwatch}
                      width={60}
                      height={60}
                      className={styles.logosection}
                      alt="timer"
                      priority
                    />
                    <h3>
                      Offer generation <br /> <span>in 2 minutes</span>
                    </h3>
                  </div>
                  <div className={styles.imageComponet}>
                    <Image
                      src={calender}
                      width={60}
                      height={60}
                      className={styles.logosection2}
                      alt="calender"
                      priority
                    />
                    <h3 className={styles.imageh3}>
                      Flexible EMI tenure <br />
                      <span>upto 60 months</span>
                    </h3>
                  </div>
                </div>

                <div className={styles.newMobileFildAdd}>
                  <div
                    className={`${styles.fields} ${formErrors.mobileNumber ? styles.fieldserror : ""
                      }`}style={{marginBottom:"5%"}}
                    onClick={() => handleBoxClick(mobileRef)}
                  >
                    <input

                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      pattern="[0-9]*"
                      value={mobileNumber}
                      onChange={handleMobileChange}
                      placeholder="Enter mobile number"
                      className={`${styles.inputfield} ${
                        formErrors.mobileNumber ? styles.inputError : ""
                      }`}

                      // className={`${styles.inputfield} ${formErrors.mobileNumber ? styles.inputError : ""
                      //   }`}
                      maxLength={10}
                      ref={mobileRef}
                    />
                  </div>
                  <div className={styles.mobileFieldMessage}>
                    An OTP will be sent to your number
                    <br /> for verification.
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.children3}>
              <div className={styles.mobilefield}>
                <div>
                  <button
                    className={`${styles.btnelig} ${isLoading ? styles.loading : ""
                      }`}
                    onClick={handleCheckEligibility}
                    disabled={isLoading}
                  >
                    <span>
                      {isLoading ? "Checking..." : "Check eligibility"}
                    </span>
                  </button>
                  <h3 className={styles.termText}>
                    By proceeding, you agree to our{" "}
                    <a href="/terms">Terms & Conditions</a> <br/>and{" "}
                    <a href="/privacy">Privacy Policy</a>
                  </h3>
                </div>
                <div>
                  <div className={styles.formGroup1}>
                    <div className={styles.showText}>
                      {showFullConsent ? (
                        <>
                          You hereby consent to CreditHaat being appointed as your
                          authorized representative to receive your Credit
                          Information from Experian for the purpose of accessing
                          credit worthiness and availing pre-approved offers
                          {` ("End Use Purpose").`}
                          <span
                            onClick={() => setShowFullConsent(false)}
                            style={{
                              color: "#6039d2",
                              cursor: "pointer",
                              textDecoration: "none",
                            }}
                          >
                            {" "}
                            Show Less
                          </span>
                        </>
                      ) : (
                        <>
                          You hereby consent to CreditHaat being appointed as your
                          author...
                          <span
                            onClick={() => setShowFullConsent(true)}
                            style={{
                              color: "#6039d2",
                              cursor: "pointer",
                              textDecoration: "none",
                            }}
                          >
                            {" "}
                            Read More
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.showText}>
                      {showFullConsentTwo ? (
                        <>
                          I authorize Vibhuprada Services Private Limited
                          (CreditHaat), its partner financial institutes/lenders
                          and their representatives to Call, SMS or communicate
                          via WhatsApp regarding my application. This consent
                          overrides any registration for DNC / NDNC. I confirm I
                          am in India, I am a major and a resident of India
                          <span
                            onClick={() => setShowFullConsentTwo(false)}
                            style={{
                              color: "#6039d2",
                              cursor: "pointer",
                              textDecoration: "none",
                            }}
                          >
                            {" "}
                            Show Less
                          </span>
                        </>
                      ) : (
                        <>
                          I authorize Vibhuprada Services Private Limited
                          (CreditHaat), its...
                          <span
                            onClick={() => setShowFullConsentTwo(true)}
                            style={{
                              color: "#6039d2",
                              cursor: "pointer",
                              textDecoration: "none",
                            }}
                          >
                            {" "}
                            Read More
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.showText}>
                      {showFullConsentThree ? (
                        <>
                          You provide your express consent to CreditHaat
                          (Vibhuprada Services Private Limited) and its partners
                          to access the credit bureaus and credit information
                          report and credit score. You also hereby irrevocably
                          and unconditionally consent to usage of such credit
                          information being provided by credit bureaus.
                          <span
                            onClick={() => setShowFullConsentThree(false)}
                            style={{
                              color: "#6039d2",
                              cursor: "pointer",
                              textDecoration: "none",
                            }}
                          >
                            {" "}
                            Show Less
                          </span>
                        </>
                      ) : (
                        <>
                          You provide your express consent to CreditHaat and its
                          partners...
                          <span
                            onClick={() => setShowFullConsentThree(true)}
                            style={{
                              color: "#6039d2",
                              cursor: "pointer",
                              textDecoration: "none",
                            }}
                          >
                            {" "}
                            Read More
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.showText}>
                      By continuing; it is accepted that I have read/understood
                      approach for gradation risk.<span style={{ color: "#6039D2" }}><a className="mbnumber" href="https://www.credithaat.com/selectioncriteria" style={{ color: "#6039D" ,textDecoration:"none"}}>(gradation risk policy)</a></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.children5}>
              <div className={styles.textContainer}>
                <h3 className={styles.hedingEliText}>
                  Loan eligibility criteria
                </h3>
                <ul className={styles.customList} type="desc">
                  <li>Loan Amount Upto ₹10 lacs.</li>
                  <li>Tenure: 3 to 60 months.</li>
                  <li>
                    Rate of Interest (ROI): Starting from 10.99% per annum.
                  </li>
                  <li>Maximum APR: 45%.</li>
                  <li>
                    Processing Fee: 2.5% of loan amount + taxes as applicable.
                  </li>
                </ul>
              </div>

              <div className={styles.textContainer1}>
                <h3 className={styles.hedingEliText}>Credit score partner</h3>
                <Image
                  src={exp}
                  width={60}
                  height={60}
                  className={styles.logoExperian}
                  alt="Experiannew"
                  priority
                />
              </div>
            </div>
            <div className={styles.children}>

<div className={styles.textContainer2}>
  <h3 >* CreditHaat is a digital loan facilitator, not a lender. Loan approval and terms are at the sole discretion of our partner NBFCs/Banks.</h3>
</div>
</div>

            <div className={styles.children}>
              <div className={styles.textContainer2}>
                <h4 className={styles.hedingCal}>
                  CreditHaat does not charge any fees from the user.
                  <br />
                </h4>
                <span>
                  <br />
                  <p className={styles.linegap}>
                    Calculation: A sample loan calculation for ₹1,00,000
                    borrowed for 1 year, with interest rate @10.99% per annum*, is
                    as provided below:
                  </p>
                  <p className={styles.linegap}>
                    Processing fee (@ 2%) = ₹2,000 + GST = ₹2,360
                  </p>
                  <p className={styles.linegap}>Interest = ₹7,181</p>
                  <p className={styles.linegap}>EMI = ₹8,932</p>
                  <p
                    className={styles.linegap}
                    style={{ marginBottom: "10px" }}
                  >
                    Total amount to be repaid after a year = ₹1,10,129/-
                  </p>
                  <p
                    className={styles.linegap}
                    style={{ marginBottom: "10px" }}
                  >
                    *Interest Rate varies based on your risk profile
                    <br />
                    The maximum Annual Interest Rate (APR) can go up to 36%
                  </p>
                </span>
              </div>
            </div>

            <div className={styles.footer}>
              <div className={styles.companyText}>
                {/* <h3>
                  © Vibhuprada Services Private Limited <br /> All Rights
                  Reserved with Copyright & TradeMarks
                </h3> */}
                <h3>CreditHaat is a brand of Vibhuprada Services Private Limited, registered in India under the Companies Act, 2013 (CIN - U74999PN2020PTC194528)</h3>

              </div>
              <div className={styles.tandC}>
                <div>
                  <a href="/terms">Terms & Conditions</a>
                </div>
                <div>
                  <a href="/privacy">Privacy Policy</a>
                </div>
              </div>
              <div className={styles.lastChildsec}>We use cookies to improve your experience and analyze usage. By continuing, you agree to our <Link href="/privacy" style={{color:"#7C7C7C", textDecoration:"none"}}>Privacy Policy.</Link></div>

            </div>
          </div>

          {/* OTP Bottom Sheet */}
          {showOTPbottomsheet && (
            <div
              className={styles.bottomSheetOverlay}
              onClick={closeBottomSheet}
            >
              <div
                className={styles.otpBottomSheet}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className={styles.crossButton}
                  onClick={closeBottomSheet}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M13 1L1 13M1 1L13 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div className={styles.otpHeader}>
                  <h2>
                    Check your messages
                    <br /> for the OTP
                  </h2>
                  <p>
                    We have sent a code on <br />
                    <span className={styles.otpSpan}>
                      {mobileNumber.replace(/\D/g, "").slice(-10)}
                    </span>
                  </p>
                </div>

                <div className={styles.otpInputContainer}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={digit}
                      maxLength={6}
                      onChange={(e) => handleOtpChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={handlePaste}
                      className={`${styles.otpBox} ${otpError ? styles.otpInputError : ""
                        }`}
                      autoComplete="one-time-code"
                      data-form-type="other"
                    />
                  ))}
                </div>

                {otpError && (
                  <div className={styles.errorMessage}>{otpError}</div>
                )}

                <button
                  className={`${styles.nextButton} ${isLoading ? styles.loading : ""
                    }`}
                  onClick={handleVerifyOTP}
                  disabled={isLoading}
                >
                  <span>{isLoading ? "Verifying..." : "Verify"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}


export default FirstPage;
 