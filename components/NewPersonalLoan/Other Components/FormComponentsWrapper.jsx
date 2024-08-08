"use client"

import React, {useEffect, useState} from 'react'
import FormInputs from './FormInputs'
import FormSubmitBtn from './FormSubmitBtn'
import Consent from './Consent'
import axios from 'axios';


// import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { SharedStateProvider, useSharedState } from './SharedStateContext';

const FormComponentsWrapper = () => {

  const router = useRouter();

  const[formData,setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const [stgOneHitId, setStgOneHitId] = useState(null);
  const [stgTwoHitId, setstgTwoHitId] = useState(null);
  const [t_experian_log_id, sett_experian_log_id] = useState(null);

  const validateForm = () => {     
    const errors = {};
    if (!formData.firstName) {
        errors.firstName = "First name is required";
    } else if (!/^[a-zA-Z]*$/.test(formData.firstName)) {
        errors.firstName = "First name must contain only letters";
    }
    if (!formData.lastName) {
        errors.lastName = "Last name is required";
    } else if (!/^[a-zA-Z]*$/.test(formData.lastName)) {
        errors.lastName = "Last name must contain only letters";
    }
    if (!formData.mobileNumber) {
        errors.mobileNumber = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
        errors.mobileNumber = "Please enter a valid 10-digit mobile number";
    }
    if (!formData.profession) {
        errors.profession = "Profession is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
};

const handleChange = (e) => {//This function is used to handle the change that we make in the form
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleInputChange = (value, fieldName) => {
  switch (fieldName) {
      case 'profession': {
          setFormData({
              ...formData,
              [fieldName]: value
          });
          break;
      }
  }
}


const handleSubmit = (e) => {//This handle Submit is only for Form Page 
  // setIsTransitioning(true); // Start transition animation
  setTimeout(() => {
      // setShowForm(false);
      // setShowOTPVerification(true);
      // setIsTransitioning(false);
      // setShowLendersList(false);
      // setShowBankNames(false);

      if(validateForm()){
        localStorage.setItem('formData',JSON.stringify(formData));
        console.log("form Data from First page is : ",localStorage.getItem('formData'));
        router.push("/OtpVerification")
        handleFormSubmit(e);
      }
      //Called the function which will send the form data from frontend to backend
      // End transition animation after a delay
  }, 500); // Adjust delay time as needed
};

const handleFormSubmit = async (e) => {
  e.preventDefault();
  
  try {

      const queryParams = new URLSearchParams(location.search);

      // Retrieve values for the specified parameters
      const channel = queryParams.get('channel') || '';
      const dsa = queryParams.get('dsa') || '';
      const source = queryParams.get('source') || '';
      const subSource = queryParams.get('sub_source') || '';
      const subDsa = queryParams.get('sub_dsa') || '';

      const urllink = location.search?.split('?')[1] || 'null';

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


      // const response = await axios.post(`${process.env.REACT_APP_BASE_URL}chfronetendotpgenerator`, formData1, {
      //     headers: {
      //         'Content-Type': 'application/json',
      //     },
      // });

      const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}chfronetendotpgenerator_new`, formData1);

      if (response.data.code === 0) {
          setStgOneHitId(response.data.obj.stgOneHitId);
          localStorage.setItem('stgOneHitId',JSON.stringify(response.data.obj.stgOneHitId));
          setstgTwoHitId(response.data.obj.stgTwoHitId);
          localStorage.setItem('stgTwoHitId',JSON.stringify(response.data.obj.stgTwoHitId));
          sett_experian_log_id(response.data.obj.t_experian_log_id);
          console.log("in form components wrapper t_log_  :  ",response.data.obj.t_experian_log_id)
          localStorage.setItem('t_experian_log_id',JSON.stringify(response.data.obj.t_experian_log_id));

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
    <SharedStateProvider>

    
    <div>
      <FormInputs errors={errors} formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} handleInputChange={handleInputChange}/>
      <Consent/>
      <FormSubmitBtn handleSubmit={handleSubmit}/>
    </div>
    </SharedStateProvider>
  )
}

export default FormComponentsWrapper
