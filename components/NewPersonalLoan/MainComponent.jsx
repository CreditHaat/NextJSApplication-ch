"use client"

import { useEffect, useState, lazy, Suspense } from "react";
// import { useEffect } from "react";
import styles from './MainComponent.module.css'
import axios from 'axios';
import './Other Components/Form.css';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useRouter } from 'next/router';
import FormPage from './Other Components/Form';
import Navbar from "./Other Components/Navbar";
import Review from "./Other Components/Review";
// import { useRouter } from 'next/router';

function MainComponent({router}) {

    // const router = useRouter();
    // Usestates for maintaining the single page application without refreshing the page


    const [showForm, setShowForm] = useState(true);
    const [showOTPVerification, setShowOTPVerification] = useState(false);
    const [showAddInfo, setShowAddInfo] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false); // Track transition state
    const [showLendersList, setShowLendersList] = useState(false);
    const [showBankNames, setShowBankNames] = useState(false);

    const [stgOneHitId, setStgOneHitId] = useState(null);
    const [stgTwoHitId, setstgTwoHitId] = useState(null);
    const [t_experian_log_id, sett_experian_log_id] = useState(null);
    const [upotp, setUpotp] = useState('');
    const [otpStatus, setOtpStatus] = useState('');

    const [lenderDetails, setLenderDetails] = useState([]);
    var json = null;

    const [lenderProduct, setLenderProduct] = useState();

    const [isLoading, setIsLoading] = useState(false);
    const [otpLoader, setOtpLoader] = useState(false);

    const [dobFlag, setDobFlag] = useState(true);
    const [ResidentialPincodeFlag, setResidentialPincodeFlag] = useState(true);

    /*--------------------------------HERE WE WILL CREATE A USESTATES FOR SENDIND THE FORM DATA TO BACKEND-------------------*/

    const [formData, setFormData] = useState({});

    // const [addInfoData, setAddInfoData] = useState(new AddInfoData())

    const [pan, setPan] = useState('');
    const [dob, setDob] = useState('');
    const [profession, setProfession] = useState('');
    const [income, setIncome] = useState('');
    const [salaryType, setSalaryType] = useState('');

    const [email, setEmail] = useState('');
    const [pincode, setPincode] = useState('');
    const [homePin, setHomePin] = useState('');

    const [companyName, setCompanyName] = useState('');

    // const location = useLocation();
    
    // const router = useRouter();

    /*-----------------------------FORM DATA TRANSFER END*-------------------------------------------------------------------*/
    const[channel, setChannel] = useState();
    const[dsa,setDsa] = useState();
    const[source, setSource] = useState();
    const[subSource, setSubSource] = useState();
    const[subDsa, setSubDsa] = useState();


    // useEffect(()=>{
    //     console.log(router.query);
    //     if(router.query!=null){
    //         setChannel(router.query.channel || '');
    //         setDsa(router.query.dsa || '');
    //         setSource(router.query.source || '');
    //         setSubSource(router.query.sub_source || '');
    //         setSubDsa(router.query.sub_dsa || '');
    //     }
        
    // },router.query)

    // useEffect(() => {
    //     // Parse query parameters using URLSearchParams
    //     const queryParams = new URLSearchParams(router.asPath.split('?')[1] || '');
        
    //     // Retrieve individual query parameters
    //     setChannel(queryParams.get('channel') || '');
    //     setDsa(queryParams.get('dsa') || '');
    //     setSource(queryParams.get('source') || '');
    //     setSubSource(queryParams.get('sub_source') || '');
    //     setSubDsa(queryParams.get('sub_dsa') || '');
    
    //     // You can also set these values to component state or use them as needed
    //   }, [router.asPath]); // useEffect will run whenever router.asPath changes

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {



            // const { channel, dsa, source, subSource, subDsa } = router.query;
            // const channel = router.query.channel || '';
            // const dsa = router.query.dsa || '';
            // const source = router.query.source || '';
            // const subSource = router.query.sub_source || '';
            // const subDsa = router.query.sub_dsa || '';

            // console.log("Before queryparams");
            // const queryParams = new URLSearchParams(location.search);
            // consolelog("After QueryParams");

            // // Retrieve values for the specified parameters
            // const channel = queryParams.get('channel') || '';
            // const dsa = queryParams.get('dsa') || '';
            // // console.log("after dsa");
            // const source = queryParams.get('source') || '';
            // const subSource = queryParams.get('sub_source') || '';
            // const subDsa = queryParams.get('sub_dsa') || '';

            // const urllink = location.search?.split('?')[1] || 'null';
            if(router!=null){
                // const urllink = router.asPath.split('?')[1] || '';
            }else{
                const urllink=null;
            }
            const urllink=null;

            const formData1 = new FormData();
            formData1.append('userPhoneNumber', formData.mobileNumber);
            formData1.append('firstName', formData.firstName);
            formData1.append('lastName', formData.lastName);
            formData1.append('profession', formData.profession);
            formData1.append('dsa', dsa);
            formData1.append('channel', channel);
            formData1.append('source', source);
            formData1.append('sub_source', subSource);
            formData1.append('campaign', urllink);
            formData1.append('sub_dsa', subDsa);
            console.log("Before Submitting");


            // const response = await axios.post(`${process.env.REACT_APP_BASE_URL}chfronetendotpgenerator`, formData1, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            // });

            const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}chfronetendotpgenerator_new`, formData1);

            if (response.data.code === 0) {

                setStgOneHitId(response.data.obj.stgOneHitId);
                setstgTwoHitId(response.data.obj.stgTwoHitId);
                sett_experian_log_id(response.data.obj.t_experian_log_id);

            }

            if (response.status === 200) {
            } else {
                console.error('Submission failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const verify_otp_credithaat_from_backend = async (e) => {
        // e.preventDefault();

        setOtpLoader(true);
        try {
            const formData1 = new FormData();
            formData1.append('mobileNumber', formData.mobileNumber);
            formData1.append('otp', upotp);
            formData1.append('stgOneHitId', stgOneHitId);
            formData1.append('stgTwoHitId', stgTwoHitId);
            formData1.append('t_experian_log_id', t_experian_log_id);

            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}verifyOTPNewPersonalloan`, formData1);

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

            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}secondpageNewpersonalloan`, formData1);

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

            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}thirdpageNewpersonalloan`, formData1);

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


    //We will use this function to call the lendersList from backend
    const getLendersList = async (e) => {

        e.preventDefault();
        try {

            const formData1 = new FormData();
            formData1.append('mobilenumber', formData.mobileNumber);

            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}lenderslist`, formData1, {
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

    useEffect(() => {
    }, [lenderDetails]);

    //This funtion is used to call the backend on getLoan button


    const handleOtpChange = (newValue) => {
        setUpotp(newValue);
    };

    const handleOTPVerification = (e) => {
        // console.log(upotp+'call');
        verify_otp_credithaat_from_backend(e);
        // setShowOTPVerification(false); //We will be shifting this two functions into "verify_otp_credithaat_from_backend(e);" this function
        // setShowAddInfo(true);
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


    const handleSubmit = (e) => {//This handle Submit is only for Form Page 
        setIsTransitioning(true); // Start transition animation
        setTimeout(() => {
            setShowForm(false);
            setShowOTPVerification(true);
            setIsTransitioning(false);
            // setShowLendersList(false);
            // setShowBankNames(false);
            handleFormSubmit(e);//Called the function which will send the form data from frontend to backend
            // End transition animation after a delay
        }, 500); // Adjust delay time as needed
    };

    const handleChange = (e) => {//This function is used to handle the change that we make in the form
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    return (
        <>
            <div className={styles.upperDiv}>
                    <Navbar />
            </div>
            <div className={styles.lowerDiv}>
                <div className={`container ${isTransitioning ? 'transitioning' : ''}`}>
                    {showForm && (
                            <FormPage onSubmit={handleSubmit} formData={formData} handleChange={handleChange} setFormData={setFormData} />
                       
                    )}
                    
                </div>
                <div>
                    <Review/>
                </div>
            </div>



        </>
    );
};

export default MainComponent;

