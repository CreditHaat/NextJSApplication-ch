"use client"

import { useEffect, useState } from "react";
import OTPVerification from "./OTPVerification";
import axios from "axios";
import OtpVerifyLoader from './OtpVerifyLoader';
import AddInfo from './AddInfo';
import Navbar from './Navbar';
import Loader from './Toader';
import NewFooter from './NewFooter';
import LendersList from './LendersList';

const OtpMainComponent = () => {

    const [upotp, setUpotp] = useState('');
    const [otpStatus, setOtpStatus] = useState('');
    const [formData, setFormData] = useState({});
    const [stgOneHitId, setStgOneHitId] = useState(null);
    const [stgTwoHitId, setstgTwoHitId] = useState(null);
    const [t_experian_log_id, sett_experian_log_id] = useState(null);
    const [showAddInfo, setShowAddInfo] = useState(false);
    const [pan, setPan] = useState('');
    const [dob, setDob] = useState('');
    const [income, setIncome] = useState('');
    const [salaryType, setSalaryType] = useState('');
    const [email, setEmail] = useState('');
    const [pincode, setPincode] = useState('');
    const [homePin, setHomePin] = useState('');

    const [companyName, setCompanyName] = useState('');
    const [dobFlag, setDobFlag] = useState(true);
    const [ResidentialPincodeFlag, setResidentialPincodeFlag] = useState(true);
    const [showOTPVerification, setShowOTPVerification] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [lenderDetails, setLenderDetails] = useState([]);
    const [lenderProduct, setLenderProduct] = useState();
    const [showLendersList, setShowLendersList] = useState(false);

    var json = null;

    useEffect(() => {
        const savedFormData = localStorage.getItem('formData');
        const savedStg1 = localStorage.getItem('stgOneHitId');
        const savedStg2 = localStorage.getItem('stgTwoHitId');
        const savedStg3 = localStorage.getItem('t_experian_log_id');
        if (savedFormData) {
            console.log("Inside saveDFormData", savedFormData);
            const formDataObj = JSON.parse(savedFormData);
            setFormData(formDataObj);
            console.log(formDataObj.mobileNumber); // Output: 8010489800
            // You can also set it to state if needed
            // setFormData(formDataObj);
        }
        if(savedStg1){
            console.log("Inside savedStg1",savedStg1);
            const formDataObj = JSON.parse(savedStg1);
            console.log("after savedStg1",savedStg1);
            setStgOneHitId(formDataObj);
            console.log("after savedStg1 2",savedStg1);
        }if(savedStg2){
            console.log("Inside savedStg2",savedStg2);
            const formDataObj = JSON.parse(savedStg2);
            console.log("after savedStg2",savedStg2);
            setstgTwoHitId(formDataObj);
            console.log("after savedStg2 2",savedStg2);
        }if(savedStg3){
            if(savedStg3 != undefined){
                console.log("Inside savedStg3",savedStg3);
            const formDataObj = savedStg3;
            console.log("after savedStg3",savedStg3);
            sett_experian_log_id(formDataObj);
            console.log("Inside savedStg3 2",savedStg3);
            }
            
        }
    }, []);


    const [otpLoader, setOtpLoader] = useState(false);

    const handleOtpChange = (newValue) => {
        setUpotp(newValue);
    };

    const handleOTPVerification = (e) => {
        // console.log(upotp+'call');
        verify_otp_credithaat_from_backend(e);
        // setShowOTPVerification(false); //We will be shifting this two functions into "verify_otp_credithaat_from_backend(e);" this function
        // setShowAddInfo(true);
    };

    const verify_otp_credithaat_from_backend = async (e) => {
        // e.preventDefault();
        const formDataFetch = localStorage.getItem('formData')
        if (formDataFetch) {
            console.log("Hey Bro");
            setFormData(JSON.parse(formDataFetch));
        }
        setOtpLoader(true);
        try {
            const formData1 = new FormData();
            console.log("FormData.monileNumber is : ", localStorage.getItem('formData').mobileNumber);
            formData1.append('mobileNumber', formData.mobileNumber);
            formData1.append('otp', upotp);
            formData1.append('stgOneHitId', stgOneHitId);
            formData1.append('stgTwoHitId', stgTwoHitId);
            formData1.append('t_experian_log_id', t_experian_log_id);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}verifyOTPNewPersonalloan`, formData1);

            console.log("Response is : ", response);

            if (response.data.code === 0) {
                setDobFlag(false);
                setResidentialPincodeFlag(false);
                setTimeout(() => {
                    setOtpLoader(false);
                    setShowOTPVerification(false);
                    setShowAddInfo(true);
                }, 3000);


            }
            else if (response.data.code === 1) {
                setDobFlag(true);
                setResidentialPincodeFlag(false);
                setTimeout(() => {
                    setOtpLoader(false);
                    setShowOTPVerification(false);
                    setShowAddInfo(true);
                }, 3000);


            }

            else if (response.data.code === 2) {
                setResidentialPincodeFlag(true);
                setDobFlag(false);
                setTimeout(() => {
                    setOtpLoader(false);
                    setShowOTPVerification(false);
                    setShowAddInfo(true);
                }, 3000);


            }
            else if (response.data.code === 3) {
                setResidentialPincodeFlag(true);
                setDobFlag(true);
                setTimeout(() => {
                    setOtpLoader(false);
                    setShowOTPVerification(false);
                    setShowAddInfo(true);
                }, 3000);


            }
            else {
                setOtpLoader(false);
                setOtpStatus("Incorrect OTP! Try Again..");
                // setShowAddInfo(true);//To remove this once the otp response problem is solved
                // setShowOTPVerification(false); //To remove this once the otp response problem is solved
                // setOtpStatus("Incorrect OTP! Try Again..");
            }


            if (response.status === 200) {
            } else {
                console.error('Submission failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleAddInfoFormSubmit = async (e) => {
        e.preventDefault();
        try {

            const formData1 = new FormData();
            formData1.append('mobileNumber', formData.mobileNumber);
            formData1.append('pan', pan);
            formData1.append('dob', dob);
            formData1.append('income', income);
            formData1.append('salaryType', salaryType);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}secondpageNewpersonalloan`, formData1);

            if (response.data.code === 0) {

            }

            if (response.status === 200) {
            } else {
                console.error('Submission failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    //This is the backend for AddInfo second form
    const handleAddInfoFormSubmit2 = async (e) => {
        e.preventDefault();
        try {

            const formData1 = new FormData();
            formData1.append('mobileNumber', formData.mobileNumber);
            formData1.append('email', email);
            formData1.append('pincode', pincode);
            formData1.append('homePin', homePin);
            formData1.append('companyName', companyName);

            setIsLoading(true);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}thirdpageNewpersonalloan`, formData1);

            if (response.data.code === 0) {


                //Here when the code is 0 we are calling lendersList backend which will give us lendersList accrding to user
                getLendersList(e);

            }


            if (response.status === 200) {

            } else {
                console.error('Submission failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleAddInfo = (e) => {

        // handleAddInfoFormSubmit2(e);

        // setShowAddInfo(false);
        // setShowLendersList(true);
    }

    const handleOnGetLoan = (e) => {

        //Here we will call our function which will go to backend on the click of getLoan button
        //getLoanBackend(e);

        // setShowLendersList(false);
        // showBankNames(true);
    }

    //We will use this function to call the lendersList from backend
    const getLendersList = async (e) => {

        e.preventDefault();
        try {

            const formData1 = new FormData();
            formData1.append('mobilenumber', formData.mobileNumber);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}lenderslist`, formData1, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': 'Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=' // Add your token here
                }
            });

            setTimeout(() => {
                setIsLoading(false);
            }, 3000);

            if (response.data.code === 200) {
                json = response.data.data;
                setLenderDetails(json);

                setShowAddInfo(false);
                setShowLendersList(true);
            }

            if (response.status === 200) {

            } else {
                console.error('Submission failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    return (
        <div className="container">
            <Navbar />
            {showOTPVerification &&
                <OTPVerification verifyOTP={handleOTPVerification} upotp={upotp} handleOtpChange={handleOtpChange} otpStatus={otpStatus} formData={formData} />
            }
            {showAddInfo && (

                <AddInfo handleAddInfoFormSubmit={handleAddInfoFormSubmit} handleAddInfoFormSubmit2={handleAddInfoFormSubmit2} pan1={pan} dob1={dob} income1={income} salaryType1={salaryType} setPan1={setPan} setDob1={setDob} setIncome1={setIncome} setSalaryType1={setSalaryType} email1={email} pincode1={pincode} homePin1={homePin} setEmail1={setEmail} setPincode1={setPincode} setHomePin1={setHomePin} companyName1={companyName} setCompnanyName1={setCompanyName} goToLendersList={handleAddInfo} dobFlag={dobFlag} ResidentialPincodeFlag={ResidentialPincodeFlag} />

            )}
            {showLendersList && (

                <LendersList json1={lenderDetails} onGetLoan={handleOnGetLoan} lenderProduct={lenderProduct} setLenderProduct={setLenderProduct} formData={formData} />

            )}
            {showAddInfo &&
                <NewFooter />
            }
            {otpLoader &&
                <OtpVerifyLoader />
            }
            {isLoading &&
                <Loader />
            }
        </div>
    )
}

export default OtpMainComponent
