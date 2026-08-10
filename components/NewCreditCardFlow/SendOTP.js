"use client";
import react from "react";
import React, { useState, useEffect, useCallback, useRef } from "react";
import "../../components/NewCreditCardFlow/SendOTP.css";
import { Poppins } from "next/font/google";
import axios from "axios";
import Image from "next/image";
import Footernew from "../FooterNew/Footernew";
import PartnerList from "../NewCreditCardFlow/PartnerList";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function SendOTP({
  params,
  searchParams,
  mobile,
  setMobile,
  setActiveContainer,
}) {
  // const [activeContainer, setActiveContainer] = useState("SendOTP");
  const [showOTPbottomsheet, setShowOTPbottomsheet] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const otpRefs = useRef([]);
  const otpAutoFilledRef = useRef(false);
  const otpSessionIdRef = useRef(null);
  // const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    mobile: "",
  });
  const [stgOneHitId, setStgOneHitId] = useState(null);
  const [stgTwoHitId, setStgTwoHitId] = useState(null);
  const [t_experian_log_id, setTExperianLogId] = useState(null);

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setMobile(value);
    }
    // Remove red border when user starts typing
    if (mobileError) {
      setMobileError(false);
    }
  };

  useEffect(() => {
    if (showOTPbottomsheet) {
      setTimeout(() => {
        document.getElementById("otp-0")?.focus();
      }, 100);
    }
  }, [showOTPbottomsheet]);

  const handleSendOTP = () => {
    if (mobile.length !== 10) {
      setMobileError(true);
      return;
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

  const validateForm = () => {
    let errors = {};

    if (!mobile.trim()) {
      errors.mobile = "Mobile number is required";
      setMobileError(true);
    } else if (mobile.length !== 10) {
      errors.mobile = "Mobile number must be 10 digits";
      setMobileError(true);
    } else if (!/^[6-9]/.test(mobile)) {
      errors.mobile = "Mobile number must start with 6-9";
      setMobileError(true);
    } else {
      setMobileError(false);
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const resetOtp = useCallback(() => {
    setOtp(["", "", "", "", "", ""]);
    otpAutoFilledRef.current = false;
    setTimeout(() => otpRefs.current[0]?.focus(), 10);
  }, []);

  const handleCheckEligibility = async () => {
    if (isLoading) return;
    if (!validateForm()) return;
    const finalMobile = mobile.replace(/\D/g, "").slice(-10);

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
      fd.append("profession", "");
      fd.append("income", "");
      fd.append("paymentType", "");
      fd.append("pan", "");
      fd.append("dsa", dsa);
      fd.append("channel", channel);
      fd.append("source", source);
      fd.append("sub_source", subSource);
      fd.append("campaign", urllink);
      fd.append("sub_dsa", subDsa);

      fd.append("deviceId", getDeviceId());

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}chfronetendotpgenerator_Creditcard_new`,
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
        setFormErrors({
          mobile: "Failed to send OTP. Please try again.",
        });
      }
    } catch (err) {
      console.error("Send OTP error:", err);
      setFormErrors({
        mobile: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

//  const handleCheckEligibility = () => {
//   if (!validateForm()) return;

//   setOtp(["", "", "", "", "", ""]);
//   setOtpError("");
//   setShowOTPbottomsheet(true);
// };

  const handleVerifyOTP = useCallback(async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setOtpError("Please enter complete 6-digit OTP");
      return;
    }
    setIsLoading(true);

    try {
      const fd = new FormData();
      fd.append("mobileNumber", mobile.replace(/\D/g, "").slice(-10));
      fd.append("otp", otpString);
      fd.append("stgOneHitId", stgOneHitId);
      fd.append("stgTwoHitId", stgTwoHitId);
      fd.append("t_experian_log_id", t_experian_log_id);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}verifyOTPNewPersonalloan_creditcard_new`,
        fd
      );

      // if ([0].includes(res.data.code)) {
      if (res.data.code === 0) {
        setShowOTPbottomsheet(false);
        // setGoToMainForm(true);
        setActiveContainer("PersonalDetails");
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
  }, [otp, mobile, stgOneHitId, stgTwoHitId, t_experian_log_id, resetOtp]);

//   const handleVerifyOTP = () => {
//   setShowOTPbottomsheet(false);
//   setActiveContainer("PersonalDetails");
// };

  const closeBottomSheet = () => {
    setShowOTPbottomsheet(false);
    setOtpError("");
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length === 6) {
      setOtp(value.split(""));
      setOtpError("");
      document.getElementById("otp-5")?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setOtpError("");

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");

    if (pasted.length === 6) {
      const otpArray = pasted.split("");
      setOtp(otpArray);
      document.getElementById("otp-5")?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  return (
    <>
         <Image
    src="/Credithaat_logo.png"
    alt="Logo"
    width={60}
    height={60}
    className="pageLogo"
  />

      <div className={`${poppins.className} container`}>
        <div className="card">

          <div className="imageContainer">
             <Image
              src="/phoneCard.png"
              alt="phone"
              width={180}
              height={180}
              className="heroImage"
            />
          </div>

          <h1 className="title">
            Find The Right 
            <br />
            Credit Card For You
          </h1>

          <p className="subtitle">
            Get personalised card recommendations based on your profile and
            compare options from multiple banks - all in one place.
          </p>

          <div className={`phoneInput ${mobileError ? "errorInput" : ""}`}>
            <div className="countryCode">
                  <Image
                src="/India_flag.png"
                alt="India"
                width={20}
                height={14}
                className="flagIcon"
             />
              <span>+91</span>
            </div>
            <input
              suppressHydrationWarning
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="tel"
              value={mobile}
              onChange={handleMobileChange}
              placeholder="Enter Mobile Number"
              maxLength={10}
            />
          </div>

          <button
            suppressHydrationWarning
            className={` sendOtpButton ${isLoading ? "loading" : ""}`}
            onClick={handleCheckEligibility}
            disabled={isLoading}
          >
            <span>{isLoading ? "Sending..." : "Send OTP"}</span>
          </button>

          <div className="privacyConsent">
            <p>
              <i>Free , Takes ~2 minutes - No Credit Enquiry Logged</i>
              <br />
              By submitting this form, you have read and agree to the{" "}
              {/* <br /> */}
              <a
                href="https://www.credithaat.com/termsC"
                target="_blank"
                rel="noopener noreferrer"
                className="policyLink"
              >
                Terms & Conditions ,{" "}
              </a>
              {/* <br /> */}
              <a
                href="https://www.credithaat.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="policyLink"
              >
                Privacy Policy
              </a>
            </p>
          </div>

          {/* Why Cards From CreditHaat */}
          <div className="whyCardsSection">
            <div className="sectionDivider1">
              <h3>WHY CHECK WITH CREDITHAAT?</h3>
            </div>
         <div className="whyCardsList1">

  <div className="featureItem">
    <div className="featureTitle">
      <span className="tick">✔</span>
      <span>Personalised recommendations</span>
    </div>

    <ul className="subPoints">
      <li>Cards matched to your profile</li>
    </ul>
  </div>

  <div className="featureItem">
    <div className="featureTitle">
      <span className="tick">✔</span>
      <span>10+ partner banks</span>
    </div>

    <ul className="subPoints">
      <li>Compare your options in one place</li>
    </ul>
  </div>

  <div className="featureItem">
    <div className="featureTitle">
      <span className="tick">✔</span>
      <span>Check before you apply</span>
    </div>

    <ul className="subPoints">
      <li>Explore cards you're more likely to qualify for</li>
    </ul>
  </div>

   <div className="featureItem">
    <div className="featureTitle">
      <span className="tick">✔</span>
      <span>Assistance from an expert</span>
    </div>

    <ul className="subPoints">
      <li>Experts to clarify any doubts around benefits and cost.</li>  
    </ul>
  </div>

</div>
          </div>
          {/* <div className="secureData">
          <img src="/Security_icon.png" alt="Security" />
          <p>Your data is 100% secure</p>
        </div> */}
         <div className="secureData">
         <Image
          src="/Security_icon.png"
          alt="Security"
          width={35}
          height={35}
          className="securityIcon"
        />
       <p>Your data is 100% secure</p>
       </div>

          {/* Our Partner Banks */}
          <div className="partnerBanksSection">
            <div className="sectionDivider">
              <span className="dashLine"></span>
              <h3>10+ PARTNER BANKS</h3>
              <span className="dashLine"></span>
            </div>
          </div>
          <div className="partnerBanks">
            <PartnerList />
          </div>

          {/* <div className="banksMarqueeWrapper">
              <div className="banksMarqueeTrack">
               
                <div className="bankLogoCard">
                  <Image src="/HDFCLogo.png" alt="HDFC Bank" width={100} height={60} />
                </div>
                <div className="bankLogoCard">
                  <Image src="/SBICardLogo.png" alt="SBI Card" width={100} height={60} />
                </div>
                <div className="bankLogoCard">
                  <Image src="/YesBankLogo.png" alt="Yes Bank" width={100} height={40} />
                </div>
                <div className="bankLogoCard">
                  <Image src="/axisbanklogo.png" alt="Axis Bank" width={100} height={40} />
                </div>
                <div className="bankLogoCard">
                  <Image src="/IciciBankLogo.png" alt="ICICI Bank" width={95} height={40} />
                </div>
                <div className="bankLogoCard">
                  <Image src="/IDFCFirstBankLogo.png" alt="Bank 6" width={100} height={30} />
                </div>
                <div className="bankLogoCard">
                  <Image src="/RupiCardLogo.png" alt="Bank 7" width={100} height={30} />
                </div>

                
                <div className="bankLogoCard">
                  <Image src="/HDFCLogo.png" alt="HDFC Bank" width={100} height={60} />
                </div>
                <div className="bankLogoCard">
                  <Image src="/SBICardLogo.png" alt="SBI Card" width={100} height={60} />
                </div>
                <div className="bankLogoCard">
                  <Image src="/YesBankLogo.png" alt="Yes Bank" width={100} height={40} />
                </div>
                <div className="bankLogoCard">
                  <Image src="/axisbanklogo.png" alt="Axis Bank" width={100} height={40} />
                </div>
                <div className="bankLogoCard">
                  <Image src="/IciciBankLogo.png" alt="ICICI Bank" width={95} height={40} />
                </div>
                <div className="bankLogoCard">
                  <Image src="/IDFCFirstBankLogo.png" alt="Bank 6" width={100} height={40} />
                </div>
                <div className="bankLogoCard">
                  <Image src="/RupiCardLogo.png" alt="Bank 7" width={100} height={40} />
                </div>
              </div>
            </div> */}

          {/* OTP Bottom Sheet */}
          {showOTPbottomsheet && (
            <div className="bottomSheetOverlay" onClick={closeBottomSheet}>
              <div
                className="otpBottomSheet"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="crossButton1" onClick={closeBottomSheet}>
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

                <div className="otpHeader">
                  <h2>
                    Check your messages
                    <br /> for the OTP
                  </h2>
                  <p>
                    We have sent a code on <br />
                    <span className="otpSpan">{mobile}</span>
                  </p>
                </div>

                <div className="otpInputContainerNew">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      // ref={(el) => (otpRefs.current[index] = el)}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={digit}
                      maxLength={1}
                      onChange={(e) => handleOtpChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={handlePaste}
                      className={`otpBox1 ${otpError ? "otpInputError" : ""}`}
                      autoComplete="one-time-code"
                      data-form-type="other"
                    />
                  ))}
                </div>

                {otpError && <div className="errorMessage">{otpError}</div>}

                <button
                  className={`sendOtpButton ${isLoading ? "loading" : ""}`}
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
 <Footernew/>
    </>
  );
}
export default SendOTP;
