import React, { useState, useRef } from 'react';
import OTP from './OTP';

const OTPBottomSheet = ({isVisible, verifyOTP, upotp, otpStatus, setUpOtp}) => {
  // const [isVisible, setIsVisible] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputRefs = useRef([]);

  // const toggleVisibility = () => {
  //   setIsVisible(!isVisible);
  // };

  
  const handleSubmitOtp = () => {
    const otpValue = otp.join('');
    console.log('Submitted OTP:', otpValue);
    // Add your OTP submission logic here
  };

  const bottomSheetStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: 'white',
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-out',
    transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
    padding: '20px', // Add padding for better layout
    textAlign: 'center', // Center align content
    borderTopLeftRadius:"15px",
    borderTopRightRadius:"15px",
  };

  const inputStyle = {
    width: '40px',
    height: '40px',
    margin: '0 5px',
    fontSize: '20px',
    textAlign: 'center',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  };

  const handleUpOtp=()=>{
    setUpOtp(1);
  }

  return (
    <>
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9995, // Ensure it's on top of other content
      }}
    >
      {/* <button onClick={toggleVisibility}>Show OTP Bottom Sheet</button> */}
      <div style={bottomSheetStyle}>
        {<OTP verifyOTP={verifyOTP} upotp={upotp} otpStatus={otpStatus} setUpOtp={setUpOtp}/>}
      </div>
      </div>
    </>
  );
};

export default OTPBottomSheet;
