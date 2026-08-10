"use client"
import React from "react";
import "../../components/NewCreditCardFlow/VerifyOTP.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400","500","600","700"]
});

function VerifyOTP() {
  return (
    <div className={`${poppins.className} container1`}> 
      <div className="card1">

        {/* <h2 className="title1">Verify OTP</h2> */}

        <input
         type="text"
         inputMode="numeric"
         pattern="[0-9]{6}"
         placeholder="Enter OTP"
         maxLength={6}
         className="otpInput"
        />

        <button className="verifyBtn">
          Verify OTP
        </button>

      </div>
    </div>
  );
}

export default VerifyOTP;