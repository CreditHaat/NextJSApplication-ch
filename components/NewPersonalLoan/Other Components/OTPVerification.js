"use client"

import React, { useState, useEffect, useRef } from 'react';
import './OTPVerification.css';

function OTPVerification({ verifyOTP, handleOtpChange, upotp, otpStatus, formData}) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [tempOtp, setTempOtp] = useState("");

  const hiddenButtonRef = React.useRef(null);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // If backspace is pressed or input is numeric
    if (e.keyCode === 8 || !isNaN(value)) {
      let newOtp = [...otp];

      // If backspace is pressed and the input field is empty
      if (e.keyCode === 8 && value === "" && index !== 0) {
        // Move focus to previous input field
        document.getElementsByName("otp")[index - 1].focus();
        // Clear the value of current input field
        newOtp[index - 1] = "";
      } else if (index >= 0 && index < 6) {
        // If input is numeric and index is within range
        newOtp[index] = value;
        // Move focus to next input field
        if (index < 5 && value !== "") {
          document.getElementsByName("otp")[index + 1].focus();
        }
      }

      setOtp(newOtp);

      if (e.keyCode!== 8 && newOtp.join("").length === 6) {
        // Move focus to hidden button to hide numeric keypad
        
        console.log("Form Data of useState is : ",formData);
        console.log("Form from OTP VErification useState formData.mobileNumber ",formData.mobileNumber);
        if (hiddenButtonRef.current) {
          hiddenButtonRef.current.focus();
        }
      }         

      setTempOtp(newOtp.join(""));
    
    }
  };


  

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOTP = otp.join("");

   

    // Check OTP here and redirect if successful
    // if (enteredOTP === "123456") {
    //   window.location.href = '/add-info'; // Redirect upon successful OTP verification
    // }
  };

    const resetOtp = () => {
    setOtp(new Array(6).fill(""));
  };

  useEffect(() => {
        if (otpStatus === "Incorrect OTP! Try Again..") {
          resetOtp();

        }
      }, [otpStatus]); 
//We are using this useEffect for calling the otpVarify function when the user enters the otp
      useEffect(() => {
        
        if(upotp.length===6){
          verifyOTP();
          if(hiddenButtonRef.current){
            hiddenButtonRef.current.focus();
          }
        }
          
          // setTempOtp('');
      }, [upotp]);
/////////////////////////////
  return (
    <div className="otp-container" style={{ borderRadius: '20px', marginTop: '10px', backgroundColor: '#f2edff' }}>
      <h2>Mobile Number Verification</h2>
      <h4 ref={hiddenButtonRef}  style={{paddingLeft:'0px'}} className="terms-text">Please enter OTP to verify mobile number</h4>
      <form style={{textAlign:'center'}} onSubmit={handleSubmit}>
        <div style={{textAlign:'center'}} className="otp-inputs">
          {otp.map((data, index) => (
            <input
              type="number"
              name="otp"
              maxLength="1"
              key={index}
              value={data}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleChange(e, index)}
            />
          ))}
        </div>

            {handleOtpChange(otp.join(''))}
            <p style={{color:'red', textAlign:'center'}}>{otpStatus}</p>

        <button  onClick={verifyOTP} className="button-container  verify-button">Verify</button>

        <button ref={hiddenButtonRef} style={{position:'absolute', left:'-9999px'}} tabIndex="-1"></button>
      </form>
    </div>
  );
}

export default OTPVerification;