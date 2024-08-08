"use client"

import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import axios from 'axios';
// import CHEmbeddedList from './CHEmbeddedList'
import Toader from '../NewPersonalLoan/Other Components/Toader'
import OTPBottomSheet from './OTPBottomSheet';
import OTP from './OTP';
// import { useLocation, useNavigate } from 'react-router-dom';
import ApplicationPopup from '../NewPersonalLoan/Other Components/ApplicationPopup';
import ErrorPopup from './ErrorPopup';
import OtpVerifyLoader from '../NewPersonalLoan/Other Components/OtpVerifyLoader'
import ApplicationLoader from '../NewPersonalLoan/Other Components/ApplicationLoader';
import LinkLoader from './LinkLoader.js';
// import Router, { useRouter} from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import CHEmbeddedListCards from './CHEmbeddedListCards';

const CHEmbeddedList = () => {

    // const Router = useRouter();

    const [CHEmbeddedListFlag, showCHEmbeddedListFlag] = useState(false);
    const [divContent, setDivContent] = useState('');
    const [lenderDetails, setLenderDetails] = useState([]);
    const [tempFlag, setTempFlag] = useState();
    const [toaderFlag, setToaderFlag] = useState(false);
    const [isVisible, setIsVisible] = useState(false);//This is for toggle OTP div
    const [isGettingLenders, setIsGettingLenders] = useState(false);
    const [isCameFromBackend, setIsCameFromBackend] = useState();
    const [errorPopup, setErrorPopup] = useState(false);
    const [errorPopup2, setErrorPopup2] = useState(false);
  
    const [upotp, setUpOtp] = useState('');
    // const location = useLocation();

    const [otpStatus, setOtpStatus] = useState('');
    const [lenderProduct, setLenderProduct] = useState('');
  
    const [link, setLink] = useState("https://www.google.com");
    const [lenderName, setlenderName] = useState("NA");
  
    const [isOtpVerified, setIsOtpVerified] = useState(false);
  
    const [otpVerifyLoader, setOtpVerifyLoader] = useState(false);
    const [apiExecutionLoader, setApiExecutionLoader] = useState(false);
    const [lenderCpi, setLenderCpi] = useState('');
    const [lenderApplicationLink, setLenderApplicationLink] = useState('');
    const [redirectionLinkLoader, setRedirectionLinkLoader] = useState(false);
  
    const [lender_id, setLender_id] = useState('');
  
    // const [formData2, setFormData2] = useState();
  
    var json = null;
  
    // const { search } = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    // const params = new URLSearchParams(search);
    // const mobileNumber = queryParams.get('mobilenumber');
    // const SSO = queryParams.get('sso');

    const searchParams = useSearchParams();
    const mobileNumber = searchParams.get('mobilenumber');
    const SSO = searchParams.get('sso');
  
    const [stgOneHitId, setStgOneHitId] = useState(null);
    const [stgTwoHitId, setstgTwoHitId] = useState(null);
    const [t_experian_log_id, sett_experian_log_id] = useState(null);
  
    const getLendersList = async () => {
  
      setIsGettingLenders(true);
  
  
      if (!mobileNumber) {
        console.error('Mobile number not available');
        return;
      }
  
      try {
  
        const formData1 = new FormData();
        formData1.append('mobilenumber', mobileNumber);
        console.log("Inside get lenders list2 & mobileNumber is : ", mobileNumber)
        const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}lenderslist1`, formData1, {
          headers: {
            'Content-Type': 'application/json',
            'token': 'Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=' // Add your token here
          }
        });
  
        console.log(response);
  
        setToaderFlag(false);
  
        if (response.data.code === 200) {
          console.log('Submission successful from Lenders Backend:', response.data);
          json = response.data.data;
          setLenderDetails(json);
          console.log("Recieved Data from backend ", json);
  
          setTempFlag(true);
          setIsGettingLenders(false);
  
        }
  
        if (response.status === 200) {
  
  
  
        } else {
          console.error('Submission failed:', response.statusText);
        }
  
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };
  
    useEffect(() => {
      getLendersList();
  
      if(SSO === 'yes'){
        setIsOtpVerified(true);
      }
  
    }, []);
  
    useEffect(() => {
      if (tempFlag === true) {
        console.log(mobileNumber);
        showCHEmbeddedListFlag(true);
        console.log("json : ", json);
        console.log("lenderDetails : ", lenderDetails);
        console.log("tempFlag : ", tempFlag);
      }
    }, [tempFlag, json, lenderDetails]);
  
    const OTPGenerate = async () => {
      // e.preventDefault();
  
      if (isOtpVerified === false) {
        try {
          setIsVisible(true);
          const queryParams = new URLSearchParams(location.search);
  
          // Retrieve values for the specified parameters
          const channel = queryParams.get('channel') || '';
          const dsa = queryParams.get('dsa') || '';
          const source = queryParams.get('source') || '';
          const subSource = queryParams.get('sub_source') || '';
          const subDsa = queryParams.get('sub_dsa') || '';
  
          console.log(mobileNumber);
          console.log("Inside OTP Generate....................., mobileNumber : ", mobileNumber);
  
          const urllink = location.search?.split('?')[1] || 'null';
  
          const formData1 = new FormData();
          formData1.append('userPhoneNumber', mobileNumber);
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
  
          const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}chEmbeddedList_OTPGenerate`, formData1);
  
          if (response.data.code === 0) {
  
            setStgOneHitId(response.data.obj.stgOneHitId);
            setstgTwoHitId(response.data.obj.stgTwoHitId);
            sett_experian_log_id(response.data.obj.t_experian_log_id);
  
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
      } else {
        getLoanBackend(lenderProduct);
      }
  
    };
  
    const getLoanBackend = async (productname) => {
  
      // If lenderCpi is 1, redirect to lender.applicationlink
  
      console.log(lenderCpi);
  
      if (lenderCpi === 1) {
        setRedirectionLinkLoader(true);
        const timer = setTimeout(() => {
          setRedirectionLinkLoader(false);
          window.location.href = lenderApplicationLink;
        }, 3000);
          
          //setRedirectionLinkLoader(false);
          // return; // Exit the function to avoid further execution
      }else{
        console.log("Inside get Loan Backend");
      // e.preventDefault();
  
      setApiExecutionLoader(true);
  
      console.log("Inside get Loan Backend");
  
      try {
        const formData1 = new FormData();
        formData1.append('mobilenumber', mobileNumber);
        formData1.append('product', productname);
  
        setlenderName(productname);
  
        const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}apiExecution`, formData1, {
          headers: {
            'Content-Type': 'application/json',
            'token': 'Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=' // Add your token here
          }
        });
  
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
          console.log("Inside when data.code is 0")
          setOtpStatus('');
  
          setIsOtpVerified(true);
  
          getLoanBackend(lenderProduct);
  
          setIsVisible(false);
  
          const timer = setTimeout(() => {
            setOtpVerifyLoader(false);
          }, 1000);
  
  
          // setDobFlag(false);
          // setResidentialPincodeFlag(false);
          // setTimeout(() => {
          //   setOtpLoader(false);
          //   setShowOTPVerification(false);
          //   setShowAddInfo(true);
          // }, 3000);
  
  
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
  
    const handleOtpChange = (newValue) => {
      setUpOtp(newValue);
    };

  return (
    <>
        <div>
        {redirectionLinkLoader && <LinkLoader lendername={lenderProduct}/>}
        {!otpVerifyLoader && apiExecutionLoader && <ApplicationLoader />}
        {otpVerifyLoader && <OtpVerifyLoader />}
        {!apiExecutionLoader && errorPopup && <ErrorPopup setErrorPopup={setErrorPopup} setErrorPopup2={setErrorPopup2} lenderName={lenderProduct} lender_id={lender_id} setLender_id={setLender_id}/>}
        {isCameFromBackend && <ApplicationPopup link={link} lenderName={lenderName} />}
        {isGettingLenders && <Toader />}
        {

          CHEmbeddedListFlag && <CHEmbeddedListCards json1={lenderDetails} mobileNumber={mobileNumber} OTPGenerate={OTPGenerate} isVisible={isVisible} setIsVisible={setIsVisible} lenderProduct={lenderProduct} setLenderProduct={setLenderProduct} errorPopup2={errorPopup2} lenderApplicationLink={lenderApplicationLink} lenderCpi={lenderCpi} setLenderCpi={setLenderCpi} setLenderApplicationLink={setLenderApplicationLink} lender_id={lender_id} setLender_id={setLender_id} SSO={SSO} />
        }{isVisible && <OTPBottomSheet isVisible={isVisible} verifyOTP={verifyOTP} upotp={upotp} otpStatus={otpStatus} setUpOtp={setUpOtp} />}
      </div>
    </>
  )
}

export default CHEmbeddedList
