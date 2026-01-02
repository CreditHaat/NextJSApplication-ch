"use client"

import React, { useState, useEffect, useRef } from 'react';
import otpimage from '../../images/otpimagess.png';
import Image from 'next/image';
import Link from 'next/link';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    weight: ['400', '700'],
    subsets: ['latin'],
});

function OTPVerification({ verifyOTP, upotp, otpStatus, setUpOtp, inputRefs }) {
    const otpInputRefs = useRef(Array(6).fill().map(() => React.createRef()));
    const [otp, setOtp] = useState(new Array(6).fill(""));

    useEffect(()=>{
        if(upotp === ""){
            setOtp(new Array(6).fill(""));
        }
    },[upotp])

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

    // useEffect(() => {
    //     if (otpStatus === "Incorrect OTP! Try Again..") {
    //         setOtp(new Array(6).fill(""));
    //         setUpOtp("");
    //     }
    // }, [otpStatus]);

    useEffect(() => {
    if (otpStatus === "Incorrect OTP! Try Again..") {
      // Clear internal state
      setOtp(new Array(6).fill(""));
      setUpOtp("");
      setTimeout(() => inputRefs.current[0]?.focus(), 50);

      // Clear actual input DOM values
      otpInputRefs.current.forEach((ref) => {
        if (ref?.current) {
          ref.current.value = "";
        }
      });

      // Optionally refocus the first input
      otpInputRefs.current[0]?.current?.focus();
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
            <p className='para1' style={{ fontSize: '20px', color: '#000000' }}>
                Please check SMS
            </p>
            <p className='para' style={{ fontSize: '20px', color: 'rgba(0, 0, 0, 0.71)', marginTop: '-10px' }}>
                We've sent a sms on mobile number
            </p>
            <form style={{
                textAlign: 'center',
                background: 'linear-gradient(to top, #999999, #ffffff)',
            }} onSubmit={handleSubmit} className='linear'>
                <div style={{ textAlign: 'center' }} className="otp-inputs">
                    {otp.map((data, index) => (
                        <input
                            style={{
                                height: '40px',
                                width: '40px',
                                margin: '5px',
                                borderRadius: '2px',
                                border: 'solid #3e2780 1px',
                                textAlign: 'center'
                            }}
                            ref={(el) => (inputRefs.current[index] = el)}
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
                <p style={{ color: 'red', textAlign: 'center' }}>{otpStatus}</p>

                <div className="input-group mb-2 mt-5 text-center">
                    <p className={`${roboto.className} terms-text`} style={{ height: '40px', overflowX: 'hidden', overflowY: 'auto', marginTop: '-15px' }}>
                        {/* By clicking "Send OTP" button and accepting the terms and conditions set out here in, you provide your express consent to Social Worth Technologies Private Limited, Whizdm Innovations Pvt Ltd, Upwards Fintech Services Pvt Ltd, Tata Capital Financial Services Ltd, SmartCoin Financials Pvt Ltd, MWYN Tech Pvt Ltd, L&T Finance Ltd, Krazybee Services Pvt Ltd, Infocredit Services Pvt. Ltd, Incred Financial Services, IIFL Finance Ltd, EQX Analytics Pvt Ltd, EPIMoney Pvt Ltd, Bhanix finance and Investment LTd, Aditya Birla Finance Ltd to access the credit bureaus and credit information report and credit score. You also hereby irrevocably and unconditionally consent to usage of such credit information being provided by credit bureaus */}
                        You hereby consent to CreditHaat being appointed as your authorized representative
                        to receive your Credit Information from Experian for the purpose of accessing credit worthiness and availing pre-approved offers (“End Use Purpose”). You hereby agree to Terms and Conditions.
                        I authorize CreditHaat, its partner financial institutes/lenders and their representatives to Call, SMS or communicate via WhatsApp regarding my application. This consent overrides any registration for DNC / NDNC.
                        I confirm I am in India, I am a major and a resident of India and I have read and I accept CreditHaat Privacy Policy Click here to read the <Link href='/privacy'>PRIVACY POLICY</Link> & <Link href='/terms'>TERMS OF SERVICE </Link>
                        <br></br>
                        By agreeing and accepting the <Link href='/terms'>terms and conditions</Link> set out herein, you
            provide your express consent to Arysefin, Aditya Birla Capital
            Limited, EarlySalary Services Private Limited(fibe), Bajaj Finserv
            Limited, PaywithRing, Whizdm Innovations Pvt Ltd, Upwards Fintech
            Services Pvt Ltd, Tata Capital Financial Services Ltd, SmartCoin
            Financials Pvt Ltd, MWYN Tech Pvt Ltd, L&T Finance Ltd, Krazybee
            Services Pvt Ltd, Infocredit Services Pvt. Ltd, Incred Financial
            Services, IIFL Finance Ltd, EQX Analytics Pvt Ltd, EPIMoney Pvt Ltd,
            Bhanix finance and Investment LTd, HeroFINCORP, RapidMoney, Zype,
            BrightLoans, HDB, Aditya Birla Finance Ltd to access the credit
            bureaus and credit information report and credit score. You also
            hereby irrevocably and unconditionally consent to usage of such
            credit information being provided by credit bureaus.

                    </p>
                </div>

                <button
                    onClick={verifyOTP}
                    style={{
                        marginTop: '0px',
                        marginBottom: '20px',
                        backgroundColor: '#6039d2',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '10px',
                        border: 'none',
                        width: '200px',
                        height: '50px',
                        fontSize: 'larger'
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