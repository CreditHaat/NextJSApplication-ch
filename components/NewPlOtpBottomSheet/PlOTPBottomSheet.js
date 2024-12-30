import React, { useState, useRef ,useEffect} from 'react';
import OTP from './PlOTP';

const PlOTPBottomSheet = ({isVisible, verifyOTP, upotp, otpStatus, setUpOtp}) => {
  //  const [isVisible, setIsVisible] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputRefs = useRef([]);
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  // const toggleVisibility = () => {
  //   setIsVisible(!isVisible);
  // };

  

 // Side effect to trigger the animation when isVisible changes
 useEffect(() => {
  if (isVisible) {
    setIsSheetVisible(true);  // Show the sheet when it's visible
  } else {
    // Delay hiding the sheet to allow the slide-up animation
    setTimeout(() => setIsSheetVisible(false), 300); // Make sure this timeout matches the animation duration
  }
}, [isVisible]);
  
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
    padding: '1px',
    width: '100%',
    backgroundColor: 'white',
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.8s ease-out', // Animation timing
    transform: isSheetVisible ? 'translateY(0)' : 'translateY(100%)', // Slide up/down effect
    textAlign: 'center',
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    // padding: '1px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9995, // Ensure it's on top of other content
    transition: 'opacity 0.3s ease-out', // Fade-in/fade-out effect for the background
    opacity: isSheetVisible ? 1 : 0, // Fade in/out overlay with the sheet
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

export default PlOTPBottomSheet;
