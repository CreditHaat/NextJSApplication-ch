"use client"

import React, { useState, useEffect } from 'react';
import otpimage from  '../../images/otpimagess.png';
import Image from 'next/image';
import Link from 'next/link';
import { BiFontSize, BiLeftArrow } from 'react-icons/bi';
import {roboto} from "./fonts";

function OTPVerification({ verifyOTP, upotp, otpStatus, setUpOtp }) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [tempOtp, setTempOtp] = useState("");

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
      // setUpOtp(newOtp.join(""));
      // console.log(upotp);

      setTempOtp(newOtp.join(""));
      // if(index<=5){
        setUpOtp(newOtp.join(""));
      // }

    }
  };


  useEffect(() => {
    if (otpStatus === "Incorrect OTP! Try Again..") {
      resetOtp();

    }
  }, [otpStatus]);

  // We are using this useEffect for calling the otpVarify function when the user enters the otp
  useEffect(() => {
    if (upotp.length === 6) {

      console.log("oTP LENGTH IS : ", upotp.length);
      verifyOTP();
      setTempOtp('');

    }
  }, [upotp]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOTP = otp.join("");

    // alert('OTP submitted: ' + enteredOTP);

    // Check OTP here and redirect if successful
    // if (enteredOTP === "123456") {
    //   window.location.href = '/add-info'; // Redirect upon successful OTP verification
    // }
  };

  const resetOtp = () => {
    setOtp(new Array(6).fill(""));
  };



  //We are using this useEffect for calling the otpVarify function when the user enters the otp

  /////////////////////////////
  return (
    <div className={` ${roboto.className} otp-container`}>
      {/* <h2 style={{ marginBottom: '40px', textAlign: 'center',color:'#3e2780' }}>OTP Verification</h2> */}
      <Image
                  src={otpimage}
                  width={300}
                  height={300}
                  layout="intrinsic"
                  alt="otpimage"
                />
                <p className='para1' style={{fontSize: '20px', color:'#000000' }}>
                  Please check message
                  </p>
                <p className='para' style={{fontSize: '20px', color:'rgba(0, 0, 0, 0.71)', marginTop:'-10px' }}>We've sent a code on mobile  number</p>  
      <form style={{ textAlign: 'center',    background: 'linear-gradient(to top, #999999, #ffffff)',  // Gradient from bottom (#999999) to top (#ffffff)
 }} onSubmit={handleSubmit} className='linear'>
        <div style={{ textAlign: 'center' }} className="otp-inputs">
          {otp.map((data, index) => (
            <input style={{ height:'40px',width:'40px',margin:'5px',borderRadius:'2px',border:'solid #3e2780 1px',textAlign:'center' }}
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


        {/* {setUpOtp(otp.join(''))} */}
        <p style={{ color: 'red', textAlign: 'center' }}>{otpStatus}</p>

        <div className="input-group mb-2 mt-5 text-center">
          <p className={ `${roboto.className} terms-text`} style={{ height: '40px', overflowX: 'hidden', overflowY: 'auto', marginTop:'-15px'}}>
            {/* By clicking "Send OTP" button and accepting the terms and conditions set out here in, you provide your express consent to Social Worth Technologies Private Limited, Whizdm Innovations Pvt Ltd, Upwards Fintech Services Pvt Ltd, Tata Capital Financial Services Ltd, SmartCoin Financials Pvt Ltd, MWYN Tech Pvt Ltd, L&T Finance Ltd, Krazybee Services Pvt Ltd, Infocredit Services Pvt. Ltd, Incred Financial Services, IIFL Finance Ltd, EQX Analytics Pvt Ltd, EPIMoney Pvt Ltd, Bhanix finance and Investment LTd, Aditya Birla Finance Ltd to access the credit bureaus and credit information report and credit score. You also hereby irrevocably and unconditionally consent to usage of such credit information being provided by credit bureaus */}
            You hereby consent to CreditHaat being appointed as your authorized representative
              to receive your Credit Information from Experian for the purpose of accessing credit worthiness and availing pre-approved offers (“End Use Purpose”). You hereby agree to Terms and Conditions.
              I authorize CreditHaat, its partner financial institutes/lenders and their representatives to Call, SMS or communicate via WhatsApp regarding my application. This consent overrides any registration for DNC / NDNC.
              I confirm I am in India, I am a major and a resident of India and I have read and I accept CreditHaat Privacy Policy Click here to read the <Link href='/privacy'>PRIVACY POLICY</Link> & <Link href='/terms'>TERMS OF SERVICE </Link>
              <br></br>  
              By agreeing and accepting the <Link href='/terms'>terms and conditions</Link> set out herein, you provide your express consent to Social Worth Technologies Private Limited, Whizdm Innovations Pvt Ltd, Upwards Fintech Services Pvt Ltd, Tata Capital Financial Services Ltd, SmartCoin Financials Pvt Ltd, MWYN Tech Pvt Ltd, L&T Finance Ltd, Krazybee Services Pvt Ltd, Infocredit Services Pvt. Ltd, Incred Financial Services, IIFL Finance Ltd, EQX Analytics Pvt Ltd, EPIMoney Pvt Ltd, Bhanix finance and Investment LTd, Aditya Birla Finance Ltd to access the credit bureaus and credit information report and credit score. You also hereby irrevocably and unconditionally consent to usage of such credit information being provided by credit bureaus.                  
                  
          </p>
        </div>
        {/* <button style={{marginTop:'0px',backgroundColor:'#ffffff',color:'black',padding:'10px',borderRadius:'10px',width:'140px',marginRight:'80px'}} className="otpclose-btnn" >cancel</button> */}
        <button onClick={verifyOTP} style={{marginTop:'0px', marginBottom:'10px', backgroundColor:'#6039d2',color:'white',padding:'10px',borderRadius:'10px', border:'none',width:'200px', height:'50px', fontSize:'larger'}} className={`${roboto.className} button-container verify-button`}>Verify</button>
      </form>
    </div>
  );
}

export default OTPVerification;