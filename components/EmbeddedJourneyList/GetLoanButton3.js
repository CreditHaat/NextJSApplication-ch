"use client"

import React from 'react'
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

const GetLoanButton = ({ lender }) => {

    const [lenderProduct, setLenderProduct] = useState('');
    const [productsArr, setProductsArr] = useState([]);
    const [lenderCpi, setLenderCpi] = useState('');
    const [lenderApplicationLink, setLenderApplicationLink] = useState('');
    const [lender_id, setLender_id] = useState('');

    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const searchParams = useSearchParams();
    const mobileNumber = searchParams.get('mobilenumber');
    const SSO = searchParams.get('sso');
    const [stgOneHitId, setStgOneHitId] = useState(null);
    const [stgTwoHitId, setstgTwoHitId] = useState(null);
    const [t_experian_log_id, sett_experian_log_id] = useState(null);


    useEffect(() => { //This will be called when the user clicks on the getLoan button 
        if (lenderProduct !== '') {
            handleOTPComponent();
        }
    }, [lenderProduct, productsArr, lenderCpi, lenderApplicationLink, lender_id])

    useEffect(()=>{
        if(isOtpVerified){
            console.log("Updated OTP verified value is t: ",isOtpVerified);
        }else{
            console.log("Updated OTP verified value is f: ",isOtpVerified);
        }
        
    },[isOtpVerified])

    const handleOTPComponent = () => {
        OTPGenerate();
    };

    const OTPGenerate = async () => {
        // e.preventDefault();

        if (!isOtpVerified) {
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
                setIsOtpVerified(true);

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


    return (
        <>
            <button onClick={(e) => {
                setLenderProduct(lender.product);
                setProductsArr((prevProductsArr) => [...prevProductsArr, lender.product]);
                setLenderCpi(lender.cpi);
                setLenderApplicationLink(lender.applicationlink)
                setLender_id(lender.product_id);
            }} size="small"
                variant="contained"
                className="getLoanButton">

                Get Loan
            </button>
        </>

    )
}

export default GetLoanButton
