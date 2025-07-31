"use client"

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
// import OTPBottomSheet from './OTPBottomSheet';
import OTPBottomSheet from '../NewEmbeddedOtpBottomSheet/EmbeddedPlOtpBottomSheet';
import OtpVerifyLoader from '../NewPersonalLoan/Other Components/OtpVerifyLoader';

const OTPComponent = ({mobile}) => {

    const inputRefs = useRef([]);

    const searchParams = useSearchParams();
    const mobileNumber = searchParams.get('mobilenumber');
    const SSO = searchParams.get('sso');
    const chaid = searchParams.get('chaid');

    const [stgOneHitId, setStgOneHitId] = useState(null);
    const [stgTwoHitId, setstgTwoHitId] = useState(null);
    const [t_experian_log_id, sett_experian_log_id] = useState(null);
    const [upotp, setUpOtp] = useState('');
    const [otpStatus, setOtpStatus] = useState('');
    const [otpVerifyLoader, setOtpVerifyLoader] = useState(false);
    const [otpVerifyLoader2, setOtpVerifyLoader2] = useState(true);

    const [checkVerifyFlag, setCheckVerifyFlag] = useState(false);

    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [isVisible, setIsVisible] = useState(false);//This is for toggle OTP div

    useEffect(() => {
        // getLendersList();
        localStorage.setItem('verifiedOTP',false);

        if (SSO === 'yes') {
            setIsOtpVerified(true);
            localStorage.setItem('verifiedOTP',true);
        }else{
            OTPGenerate();
        }



    }, []);

    const verifyOTP = async (e) => {
        // e.preventDefault();

        // setOtpLoader(true);
        setOtpVerifyLoader(true);

        try {
            const formData1 = new FormData();
            formData1.append('mobileNumber', mobile);
            formData1.append('otp', upotp);
            formData1.append('stgOneHitId', stgOneHitId);
            formData1.append('stgTwoHitId', stgTwoHitId);
            formData1.append('t_experian_log_id', t_experian_log_id);

            console.log("Before the verifyOtpNewPersonal");

            const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}verifyOTPEmbedded`, formData1);

            // if (response.data.code === 0 || response.data.code !== -1) {
            //     console.log("Inside when data.code is 0");
            //     // setIsOtpVerified(true);
            //     setCheckVerifyFlag(true);
            //     setIsOtpVerified(true);
            //     localStorage.setItem('verifiedOTP',true);
            //     console.log("The check Verify flag is : ",checkVerifyFlag);
            //     setOtpStatus('');
            //     // getLoanBackend(lenderProduct);
            //     setIsVisible(false);
            //     const timer = setTimeout(() => {
            //         setOtpVerifyLoader(false);
            //     }, 1000);


            // } else if(response.data.code === -1){
            //     // setOtpLoader(false);
            //     console.log("Incorrect OTP");
            //     setOtpStatus("Incorrect OTP! Try Again..");
            //     const timer = setTimeout(() => {
            //         setOtpVerifyLoader(false);
            //     }, 1000);
            // }

            if(response.data.code === -288){
                setOtpStatus("Incorrect OTP! Try Again..");
                const timer = setTimeout(() => {
                    setOtpVerifyLoader(false);
                }, 1000);
                setTimeout(() => inputRefs.current[0]?.focus(), 50);
                setUpOtp("");
                setOtpInputs
                return;
            }

            if (response.data.code === 0 || response.data.code !== -1) {
            // if (!response.data.code === -288 && !response.data.code === -1 || response.data.code === 0) {
                console.log("Inside when data.code is 0");
                // setIsOtpVerified(true);
                setCheckVerifyFlag(true);
                setIsOtpVerified(true);
                localStorage.setItem('verifiedOTP',true);
                console.log("The check Verify flag is : ",checkVerifyFlag);
                setOtpStatus('');
                // getLoanBackend(lenderProduct);
                setIsVisible(false);
                const timer = setTimeout(() => {
                    setOtpVerifyLoader(false);
                }, 1000);


            } else if(response.data.code === -1){
                // setOtpLoader(false);
                // console.log("Incorrect OTP");
                setOtpStatus("Incorrect OTP! Try Again..");
                const timer = setTimeout(() => {
                    setOtpVerifyLoader(false);
                }, 1000);
                setUpOtp("");
                setTimeout(() => inputRefs.current[0]?.focus(), 50);
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

    const OTPGenerate = async () => {
        // e.preventDefault();
      
        // const localStatus = localStorage.getItem('verifiedOTP');
        // if(localStatus){
          // console.log("localStorage valule is :: ",localStatus);
        // }
      
        // const localStatus = false;
      
        // if (localStatus === "false") {
            try {
                const timer = setTimeout(() => {
                    setIsVisible(true)
                }, 4000);
                ;
                // const queryParams = Object.fromEntries(new URLSearchParams(searchParams));
                const queryParams = new URLSearchParams(location.search);
      
                // Retrieve values for the specified parameters
                const channel = queryParams.get('channel') || '';
                // const channel = queryParams.channel;
                const dsa = queryParams.get('dsa') || '';
                // const dsa = queryParams.dsa;
                const source = queryParams.get('source') || '';
                // const source = queryParams.source;
                const subSource = queryParams.get('sub_source') || '';
                // const subSource = queryParams.sub_source;
                const subDsa = queryParams.get('sub_dsa') || '';
                // const subDsa = queryParams.sub_dsa;
      
                // console.log(mobileNumber);
                // console.log("Inside OTP Generate....................., mobileNumber : ", mobileNumber);
      
                const urllink = location.search?.split('?')[1] || 'null';
                // const urllink = getUrlLink(searchParams);

                console.log("urll link is :: ",urllink);
      
                const formData1 = new FormData();

                console.log("SearchParams mobile number is :: ",mobile);
                formData1.append('userPhoneNumber',mobile);
                // formData1.append('userPhoneNumber', mobileNumber);
                // formData1.append('firstName', formData.firstName);
                // formData1.append('lastName', formData.lastName);
                // formData1.append('profession', formData.profession);
                formData1.append('dsa', dsa);
                formData1.append('channel', channel);
                formData1.append('source', source);
                formData1.append('sub_source', subSource);
                formData1.append('campaign', urllink);
                formData1.append('sub_dsa', subDsa);
      
      
                // const response = await axios.post(`${process.env.REACT_APP_BASE_URL}chfronetendotpgenerator`, formData1, {
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                // });
      
                console.log("Inside the OTPGenerate");
      
                const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}chEmbeddedList_OTPGenerate`, formData1);
      
                console.log("After the OTP Generate");

                if(response.data.code === -11){
                    alert(response.data.msg);
                    return;
                }
                if(response.data.code === -10){
                    alert(response.data.msg);
                    return;
                }
      
                if (response.data.code === 0) {
      
                    setStgOneHitId(response.data.obj.stgOneHitId);
                    setstgTwoHitId(response.data.obj.stgTwoHitId);
                    sett_experian_log_id(response.data.obj.t_experian_log_id);
      
                }
      
                console.log("tejas", response);
      
                if (response.status === 200) {
                    console.log('Submission successful:', response.data);
                } else {
                    console.error('Submission failed:', response.statusText);
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        // } 
        // else {
            // console.log("Inside else");
            // getLoanBackend(lenderProduct);
        // }
      
      };

  return (
    <>
        {otpVerifyLoader && <OtpVerifyLoader />}
        {isVisible && <OTPBottomSheet isVisible={isVisible} verifyOTP={verifyOTP} upotp={upotp} otpStatus={otpStatus} setUpOtp={setUpOtp} inputRefs={inputRefs} />}
        
    </>
  )
}

export default OTPComponent