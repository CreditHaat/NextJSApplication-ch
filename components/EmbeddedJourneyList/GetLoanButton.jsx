"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import OTPBottomSheet from './OTPBottomSheet';
import LinkLoader from './LinkLoader';
import ApplicationPopup from '../NewPersonalLoan/Other Components/ApplicationPopup';
import ApplicationLoader from '../NewPersonalLoan/Other Components/ApplicationLoader';
import OtpVerifyLoader from '../NewPersonalLoan/Other Components/OtpVerifyLoader';
import ErrorPopup from './ErrorPopup';
import Temporary from './temporary';
import EmbeddedGetLoanButton from './embeddedGetLoanButton';

const GetLoanButton = ({ lender }) => {

    const [lenderProduct, setLenderProduct] = useState('');
    const [lenderCpi, setLenderCpi] = useState('');
    const [lenderApplicationLink, setLenderApplicationLink] = useState('');
    const [lender_id, setLender_id] = useState('');
    const [lenderName, setlenderName] = useState("NA");
    const [productsArr, setProductsArr] = useState([]);
    const [otpVerifiedState, setOtpVerifiedState] = useState(null);
    const [isVisible, setIsVisible] = useState(false);//This is for toggle OTP div

    const searchParams = useSearchParams();
    const mobileNumber = searchParams.get('mobilenumber');
    const SSO = searchParams.get('sso');

    const [stgOneHitId, setStgOneHitId] = useState(null);
    const [stgTwoHitId, setstgTwoHitId] = useState(null);
    const [t_experian_log_id, sett_experian_log_id] = useState(null);
    const [upotp, setUpOtp] = useState('');
    const [otpStatus, setOtpStatus] = useState('');
    const [otpVerifyLoader, setOtpVerifyLoader] = useState(false);
    const [otpVerifyLoader2, setOtpVerifyLoader2] = useState(true);

    const [redirectionLinkLoader, setRedirectionLinkLoader] = useState(false);
    const [apiExecutionLoader, setApiExecutionLoader] = useState(false);
    const [isCameFromBackend, setIsCameFromBackend] = useState(false);

    const [link, setLink] = useState("https://www.google.com");
    const [errorPopup, setErrorPopup] = useState(false);
    const [errorPopup2, setErrorPopup2] = useState(false);
    const [checkVerifyFlag, setCheckVerifyFlag] = useState(false);

    const [isOtpVerified, setIsOtpVerified] = useState(false);
    // const localOTpStatus = localStorage.getItem('verifiedOTP')

    useEffect(() => {
        // getLendersList();
        localStorage.setItem('verifiedOTP',false);

        if (SSO === 'yes') {
            setIsOtpVerified(true);
            localStorage.setItem('verifiedOTP',true);
        }

    }, []);

    

    const getLoanBackend = async (productname) => {

        // If lenderCpi is 1, redirect to lender.applicationlink

        console.log("lender Cpi is : ", lenderCpi);

        if (lenderCpi === 1) {
            setRedirectionLinkLoader(true);
            const timer = setTimeout(() => {
                setRedirectionLinkLoader(false);
                window.location.href = lenderApplicationLink;
            }, 3000);

            //setRedirectionLinkLoader(false);
            // return; // Exit the function to avoid further execution
        } else {
            console.log("Inside get Loan Backend");
            // e.preventDefault();

            setApiExecutionLoader(true);

            console.log("Inside get Loan Backend");

            try {
                const formData1 = new FormData();
                console.log("Mobile Number before is : ", mobileNumber);
                formData1.append('mobilenumber', mobileNumber);
                console.log("mobileNumber after is : ", mobileNumber);
                formData1.append('product', productname);
                console.log("product name after is : ", productname);

                setlenderName(productname);

                console.log("Before the apiExecution");

                const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}apiExecution`, formData1, {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': 'Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=' // Add your token here
                    }
                });

                console.log("After the apiExecution");



                if (response.data.code === 0) {
                    console.log("Inside get Loan Backend when code is 0");
                    setIsCameFromBackend(true);

                    const timer = setTimeout(() => {
                        setApiExecutionLoader(false);
                    }, 3000);
                    var redirectionlink = response.data.data.lender_details[0].applicationlink;
                    setLink(redirectionlink);
                    // {!setIsLoading && <ApplicationPopup link={link}/>}
                }
                else if (response.data.code === -1) {
                    console.log(-1);
                    setErrorPopup(true);
                    const timer = setTimeout(() => {
                        setApiExecutionLoader(false);
                    }, 3000);

                    // setErrorPopup(true); //This will be true when the code will be -1
                } else {
                    const timer = setTimeout(() => {
                        setApiExecutionLoader(false);
                    }, 3000);
                }

                console.log("for partner page", response);

            } catch (error) {

            }
        }


    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const verifyOTP = async (e) => {
        // e.preventDefault();

        // setOtpLoader(true);
        setOtpVerifyLoader(true);

        try {
            const formData1 = new FormData();
            formData1.append('mobileNumber', mobileNumber);
            formData1.append('otp', upotp);
            formData1.append('stgOneHitId', stgOneHitId);
            formData1.append('stgTwoHitId', stgTwoHitId);
            formData1.append('t_experian_log_id', t_experian_log_id);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}verifyOTPNewPersonalloan`, formData1);

            if (response.data.code === 0) {
                console.log("Inside when data.code is 0");
                // setIsOtpVerified(true);
                setCheckVerifyFlag(true);
                setIsOtpVerified(true);
                localStorage.setItem('verifiedOTP',true);
                console.log("The check Verify flag is : ",checkVerifyFlag);
                setOtpStatus('');
                getLoanBackend(lenderProduct);
                setIsVisible(false);
                const timer = setTimeout(() => {
                    setOtpVerifyLoader(false);
                }, 1000);


            } else {
                // setOtpLoader(false);
                console.log("Incorrect OTP");
                setOtpStatus("Incorrect OTP! Try Again..");
                const timer = setTimeout(() => {
                    setOtpVerifyLoader(false);
                }, 1000);
            }

            console.log(response);

            if (response.status === 200) {
                console.log('Submission successful:', response.data);
            } else {
                console.error('Submission failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <>
            {
                <EmbeddedGetLoanButton lenderProduct={lenderProduct} lenderCpi={lenderCpi} lenderApplicationLink={lenderApplicationLink} lender_id={lender_id} setLenderProduct={setLenderProduct} setLenderApplicationLink={setLenderApplicationLink} setLenderCpi={setLenderCpi} setLender_id={setLender_id} setProductsArr={setProductsArr} lender={lender} isOtpVerified={isOtpVerified} setIsVisible={setIsVisible} mobileNumber={mobileNumber} setStgOneHitId={setStgOneHitId} setstgTwoHitId={setstgTwoHitId} sett_experian_log_id={sett_experian_log_id} setIsOtpVerified={setIsOtpVerified} getLoanBackend={getLoanBackend}/>
            }

            {isVisible && <OTPBottomSheet isVisible={isVisible} verifyOTP={verifyOTP} upotp={upotp} otpStatus={otpStatus} setUpOtp={setUpOtp} />}
            {redirectionLinkLoader && <LinkLoader lendername={lenderProduct} />}
            {otpVerifyLoader && <OtpVerifyLoader />}
            {!apiExecutionLoader && errorPopup && <ErrorPopup setErrorPopup={setErrorPopup} setErrorPopup2={setErrorPopup2} lenderName={lenderProduct} lender_id={lender_id} setLender_id={setLender_id} productsArr={productsArr}/>}
            {!otpVerifyLoader && apiExecutionLoader && <ApplicationLoader />}
            {isCameFromBackend && <ApplicationPopup link={link} lenderName={lenderName} />}

        </>
    )
}

export default GetLoanButton

// onClick={(e) => {
//     setLenderProduct(lender.product);
//     setProductsArr((prevProductsArr) => [...prevProductsArr, lender.product]);
//     setLenderCpi(lender.cpi);
//     setLenderApplicationLink(lender.applicationlink)
//     setLender_id(lender.product_id);
//   }}
