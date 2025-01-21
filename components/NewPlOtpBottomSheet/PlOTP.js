// "use client"

// import React, { useState, useEffect, useRef } from 'react';
// import otpimage from  '../../images/otpimagess.png';
// import Image from 'next/image';
// import Link from 'next/link';
// import { BiFontSize, BiLeftArrow } from 'react-icons/bi';
// import {Roboto} from '@next/font/google';

// const roboto = Roboto({
//   weight: ['400', '700'],
//   subsets: ['latin'],
// });


// function OTPVerification({ verifyOTP, upotp, otpStatus, setUpOtp }) {
//   const otpInputRefs = useRef(Array(6).fill().map(() => React.createRef()));
//   const [otp, setOtp] = useState(new Array(6).fill(""));
//   const [tempOtp, setTempOtp] = useState("");

//   const handleChange = (e, index) => {
//     const value = e.target.value;

//     // If backspace is pressed or input is numeric
//     if (e.keyCode === 8 || !isNaN(value)) {
//       let newOtp = [...otp];

//       // If backspace is pressed and the input field is empty
//       if (e.keyCode === 8 && value === "" && index !== 0) {
//         // Move focus to previous input field
//         document.getElementsByName("otp")[index - 1].focus();
//         // Clear the value of current input field
//         newOtp[index - 1] = "";
//       } else if (index >= 0 && index < 6) {
//         // If input is numeric and index is within range
//         newOtp[index] = value;
//         // Move focus to next input field
//         if (index < 5 && value !== "") {
//           document.getElementsByName("otp")[index + 1].focus();
//         }
//       }

//       setOtp(newOtp);
//       // setUpOtp(newOtp.join(""));
//       // console.log(upotp);

//       setTempOtp(newOtp.join(""));
//       // if(index<=5){
//         setUpOtp(newOtp.join(""));
//       // }

//     }
//   };

// //------------------Code for otp autofill-----------------------------------------------------

// const inputRef = useRef(null);
// const formRef = useRef(null);
// // const router = useRouter();
// // const [otp, setOTP] = useState('');
// const [otpMethod, setOtpMethod] = useState('manual');
// const [debugInfo, setDebugInfo] = useState('');

// useEffect(() => {
//     // Comprehensive Web OTP API support check
//     const checkWebOTPSupport = () => {
//         // Detailed debug information
//         const debugDetails = {
//             hasOTPCredential: 'OTPCredential' in window,
//             userAgent: navigator.userAgent,
//             isAndroid: /Android/i.test(navigator.userAgent),
//             isChrome: /Chrome/i.test(navigator.userAgent),
//             isSecureContext: window.isSecureContext
//         };

//         // Convert debug details to string for display
//         setDebugInfo(JSON.stringify(debugDetails, null, 2));

//         // Comprehensive check for Web OTP API
//         const checkConditions = () => {
//             // Check if the Web OTP API is supported
//             if (!('OTPCredential' in window)) {
//                 console.log("Web OTP API not supported in this browser");
//                 return false;
//             }

//             // Additional checks can be added here
//             const isAndroidChrome = 
//                 /Android/i.test(navigator.userAgent) &&  
//                 /Chrome/i.test(navigator.userAgent);  

//             if (!isAndroidChrome) {
//                 console.log("Not Android Chrome");
//                 return false;
//             }

//             // Ensure secure context (HTTPS)
//             if (!window.isSecureContext) {
//                 console.log("Not in a secure context");
//                 return false;
//             }

//             return true;
//         };

//         // Determine OTP method
//         if (checkConditions()) {
//             // alert('Web OTP API fully supported');
//             console.log('Web OTP API fully supported');
//             setupWebOTPRetrieval();
//         } else {
//             console.log('Web OTP API not fully supported');
//             setOtpMethod('manual');
//         }
//     };

//     const setupWebOTPRetrieval = () => {
//         const abortController = new AbortController();

//         const handleOTPRetrieval = async () => {
//             try {
//                 if (abortController.signal.aborted) {
//                     // alert("Signal Already Aborted");
//                     console.log('Signal already aborted');
//                     return;
//                 }

//                 const credential = await navigator.credentials.get({
//                     otp: { transport: ['sms'] },
//                     signal: abortController.signal
//                 });

//                 if (inputRef.current && credential) {
//                     console.log("otp is :: ",credential.code);
//                     // alert(credential.code);
//                     // setOTP(credential.code || '');
//                     setOtpMethod('automatic');
//                 }

//                 if(otpInputRefs.current && credential){
//                   // alert(credential.code);
//                   // setOtpInputs(credential.code);
//                   const otpArray = credential.code.split('').slice(0, 6);
//             while (otpArray.length < 6) {
//                 otpArray.push('');
//             }
            
//             // setOtpInputs(otpArray);
//             setOtp(otpArray);
//             setUpOtp(otpArray);
//             setTempOtp(otpArray);
//                   setOtpMethod('automatic');
//                 }
//             } catch (error) {
//                 console.error('OTP Retrieval Error:', error);
//                 setOtpMethod('manual');
//             }
//         };

//         handleOTPRetrieval();

//         return () => {
//             setTimeout(() => {
//                 abortController.abort();
//             }, 5000);
            
//         };
//     };

//     // Initial support check
//     checkWebOTPSupport();
// }, []);

// const handleOTPChange = (e) => {
//     const inputValue = e.target.value;
//     if (/^\d*$/.test(inputValue)) {
//         setOTP(inputValue);
//     }
// };



// //-------------------------------------------------------------------------------------------

//   useEffect(() => {
//     if (otpStatus === "Incorrect OTP! Try Again..") {
//       resetOtp();

//     }
//   }, [otpStatus]);

//   // We are using this useEffect for calling the otpVarify function when the user enters the otp
//   useEffect(() => {
//     if (upotp.length === 6) {

//       console.log("oTP LENGTH IS : ", upotp.length);
//       verifyOTP();
//       setTempOtp('');

//     }
//   }, [upotp]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const enteredOTP = otp.join("");

//     // alert('OTP submitted: ' + enteredOTP);

//     // Check OTP here and redirect if successful
//     // if (enteredOTP === "123456") {
//     //   window.location.href = '/add-info'; // Redirect upon successful OTP verification
//     // }
//   };

//   const resetOtp = () => {
//     setOtp(new Array(6).fill(""));
//   };



//   //We are using this useEffect for calling the otpVarify function when the user enters the otp

//   /////////////////////////////
//   return (
//     <div className={` ${roboto.className} otp-container`}>
//       {/* <h2 style={{ marginBottom: '40px', textAlign: 'center',color:'#3e2780' }}>OTP Verification</h2> */}
//       <Image
//                   src={otpimage}
//                   width={300}
//                   height={300}
//                   layout="intrinsic"
//                   alt="otpimage"
//                 />
//                 <p className='para1' style={{fontSize: '20px', color:'#000000' }}>
//                   Please check SMS
//                   </p>
//                 <p className='para' style={{fontSize: '20px', color:'rgba(0, 0, 0, 0.71)', marginTop:'-10px' }}>We've sent a sms on mobile  number</p>  
//       <form style={{ textAlign: 'center',    background: 'linear-gradient(to top, #999999, #ffffff)',  // Gradient from bottom (#999999) to top (#ffffff)
//  }} onSubmit={handleSubmit} className='linear'>
//         <div style={{ textAlign: 'center' }} className="otp-inputs">
//           {otp.map((data, index) => (
//             <input style={{ height:'40px',width:'40px',margin:'5px',borderRadius:'2px',border:'solid #3e2780 1px',textAlign:'center' }}
//               type="number"
//               name="otp"
//               maxLength="1"
//               key={index}
//               value={data}
//               onChange={(e) => handleChange(e, index)}
//               onKeyDown={(e) => handleChange(e, index)}
//             />
//           ))}
//         </div>


//         {/* {setUpOtp(otp.join(''))} */}
//         <p style={{ color: 'red', textAlign: 'center' }}>{otpStatus}</p>

       
//         {/* <button style={{marginTop:'0px',backgroundColor:'#ffffff',color:'black',padding:'10px',borderRadius:'10px',width:'140px',marginRight:'80px'}} className="otpclose-btnn" >cancel</button> */}
//         <button onClick={verifyOTP} style={{marginTop:'0px', marginBottom:'20px', backgroundColor:'#6039d2',color:'white',padding:'10px',borderRadius:'10px', border:'none',width:'200px', height:'50px', fontSize:'larger'}} className={`${roboto.className} button-container verify-button`}>Verify</button>
//       </form>
//     </div>
//   );
// }

// export default OTPVerification;

"use client"

import React, { useState, useEffect, useRef } from 'react';
import otpimage from '../../images/otpimagess.png';
import Image from 'next/image';
import { Roboto } from '@next/font/google';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

function OTPVerification({ verifyOTP, upotp, otpStatus, setUpOtp }) {
  const otpInputRefs = useRef(Array(6).fill().map(() => React.createRef()));
  const [otp, setOtp] = useState(new Array(6).fill(""));

  // Unified OTP update function to ensure consistent state updates
  const updateOTP = (newOtpArray) => {
    // Ensure we're working with an array of strings
    const normalizedOtp = newOtpArray.map(val => val.toString());
    setOtp(normalizedOtp);
    setUpOtp(normalizedOtp.join(""));
  };

  const handleManualChange = (e, index) => {
    const value = e.target.value;
    
    if (e.keyCode === 8 || !isNaN(value)) {
      let newOtp = [...otp];

      if (e.keyCode === 8 && value === "" && index !== 0) {
        document.getElementsByName("otp")[index - 1].focus();
        newOtp[index - 1] = "";
      } else if (index >= 0 && index < 6) {
        newOtp[index] = value;
        if (index < 5 && value !== "") {
          document.getElementsByName("otp")[index + 1].focus();
        }
      }

      updateOTP(newOtp);
    }
  };

  useEffect(() => {
    const setupWebOTPRetrieval = async () => {
      if (!('OTPCredential' in window)) return;

      try {
        const abortController = new AbortController();
        
        const credential = await navigator.credentials.get({
          otp: { transport: ['sms'] },
          signal: abortController.signal
        });

        if (credential) {
          const otpArray = credential.code.split('').slice(0, 6);
          while (otpArray.length < 6) {
            otpArray.push('');
          }
          
          // Use the unified update function for autofill
          updateOTP(otpArray);
        }

        return () => {
          setTimeout(() => abortController.abort(), 5000);
        };
      } catch (error) {
        console.error('OTP Retrieval Error:', error);
      }
    };

    if (window.isSecureContext && /Android/i.test(navigator.userAgent)) {
      setupWebOTPRetrieval();
    }
  }, []);

  useEffect(() => {
    if (otpStatus === "Incorrect OTP! Try Again..") {
      setOtp(new Array(6).fill(""));
      setUpOtp("");
    }
  }, [otpStatus]);

  useEffect(() => {
    if (upotp.length === 6) {
      verifyOTP();
    }
  }, [upotp, verifyOTP]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={`${roboto.className} otp-container`}>
      <Image
        src={otpimage}
        width={300}
        height={300}
        layout="intrinsic"
        alt="otpimage"
      />
      <p className='para1' style={{fontSize: '20px', color:'#000000'}}>
        Please check SMS
      </p>
      <p className='para' style={{fontSize: '20px', color:'rgba(0, 0, 0, 0.71)', marginTop:'-10px'}}>
        We've sent a sms on mobile number
      </p>
      <form style={{
        textAlign: 'center',
        background: 'linear-gradient(to top, #999999, #ffffff)',
      }} onSubmit={handleSubmit} className='linear'>
        <div style={{textAlign: 'center'}} className="otp-inputs">
          {otp.map((data, index) => (
            <input
              style={{
                height:'40px',
                width:'40px',
                margin:'5px',
                borderRadius:'2px',
                border:'solid #3e2780 1px',
                textAlign:'center'
              }}
              type="number"
              name="otp"
              maxLength="1"
              key={index}
              value={data}
              onChange={(e) => handleManualChange(e, index)}
              onKeyDown={(e) => handleManualChange(e, index)}
            />
          ))}
        </div>
        <p style={{color: 'red', textAlign: 'center'}}>{otpStatus}</p>
        <button 
          onClick={verifyOTP}
          style={{
            marginTop:'0px',
            marginBottom:'20px',
            backgroundColor:'#6039d2',
            color:'white',
            padding:'10px',
            borderRadius:'10px',
            border:'none',
            width:'200px',
            height:'50px',
            fontSize:'larger'
          }}
          className={`${roboto.className} button-container verify-button`}
        >
          Verify
        </button>
      </form>
    </div>
  );
}

export default OTPVerification;