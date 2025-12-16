"use client"
import React, { useState, useRef,useEffect } from "react";
import './BlApplyPrimeMasterSecond.css';
import listimage1 from '../NewPlApplyD/newplimages/finalimage2.png';
import listimage2 from '../NewPlApplyD/newplimages/finalimage3.png';
import listimage3 from '../NewPlApplyD/newplimages/plimage33.png';
import styles from '../NewPlApplyD/NewPlFirstPage.module.css';
import EmblaCarousel from '../NewPlApplyD/Emblacarousel/js/EmblaCarousel';
import NewBlListPage from "../NewBlJourneyD/NewBlListPage";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import Loader from "../NewBlJourneyD/LendersLoader";
import RedirectionLoader from "../NewBlJourneyD/RedirectionLoader";
import ApplicationLoader from "../NewBlJourneyD/ApplicationLoader";
import { FaEnvelope, FaHome, FaBuilding, FaCalendar, FaMapPin, FaArrowLeft } from 'react-icons/fa'; // Font Awesome icons for React
import ErrorPopup from '../NewBlJourneyD/ErrorPopup';
import Select from 'react-select';
import IndiaGoldSuccessPage from "./NewBlSuccessPage";
import IndiaGoldRejectPage from './NewBlRejectPage';
// import {Roboto} from '@next/font/google';
import {Roboto} from 'next/font/google';
const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const OPTIONS = { direction: 'rtl', loop: true };
const SLIDES = [
  { imageUrl: listimage1 },
  { imageUrl: listimage2 },
  { imageUrl: listimage3 },
];



const BlApplyPrimeMasterSecond = ({dobFlag, firstName, lastName, mainFormData, getLendersList, genderFlag, addressFlag, residentialPincodeFlag, setActiveContainer}) => {
    const [formErrors, setFormErrors] = useState({
        email: "",
        address:"",
        dob: "",
        gender: "",  
        officeAddress: "",
        // companyName: "",  
        // officeemail: "",
        officePincode: "",
        residentialPincode: "",
        // ITR: "",
        businessType: "",
        businessAge: "",
        governmentLicense: "",
      });

      const [formData, setFormData] = useState({
        email: "",
        address: "",
        dob: "",
        gender: "",
        officeAddress: "",
        // companyName: "",
        // officeemail: "",
        officePincode: "",
        residentialPincode: "",
        // ITR: "",
        businessType: "",
        businessAge: "",
        governmentLicense: "",
      });

  const [consent, setConsent] = useState(false);
  const [terms, setTerms] = useState(false);
  const [showFullConsent, setShowFullConsent] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [errors, setErrors] = useState({}); // Object to store error messages
  const formRef = useRef(null);

  // const[ActiveContainer, setActiveContainer]= useState("NewBlFirstPage");
  const [isLoading, setIsLoading] = useState(false);
  var json = null;
  const [lenderDetails, setLenderDetails] = useState(null);

  const [lenderProduct, setLenderProduct] = useState(null);
  const [cpi,  setCpi] = useState(0);
  const[redirectionLinkLoader, setRedirectionLinkLoader] = useState(false);
  const [apiExecutionLoader, setApiExecutionLoader] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const[applicationPopup ,setApplicationPopup] = useState(false);
  const [progress, setProgress] = useState(0);
const [successPage, setSuccessPage] = useState(false);
const [rejectPage, setRejectPage] = useState(false);
const [responseproductname, setResponseProductName] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when component mounts
  }, []);

  const validateForm = () => {
    let valid = true;
    const errors = {
     
      email: "",
      address: "",
      dob: "",
      gender: "",  
      officeAddress: "",  
      // companyName: "",
      // officeemail: "",
      officePincode: "",
      residentialPincode: "",
    //   ITR: "",
    businessType: "",
    businessAge: "",
    governmentLicense: "",
    };

   
    if (!formData.dob){
      errors.dob = 'Date of birth is required';
      valid=false;
    } 

    if (!formData.email){
      errors.email = 'Email is required';
      valid=false;
    } 
    else if (!/\S+@\S+\.\S+/.test(formData.email)){
      errors.email = 'Invalid email address';
      valid=false;
    } 


    // if(addressFlag){
      // Validate Address
    if (!formData.address.trim()) {
      errors.address = "Address is required";
      valid=false;
    }
    // }
    

    // if(genderFlag){
      if (!formData.gender){
        errors.gender = 'Gender is required';
        valid=false;
      } 
    // }

    // if(residentialPincodeFlag){
      if(!formData.residentialPincode)
      {
        errors.residentialPincode = 'Home pincode is required';
      }
    // }
    


    // if (!formData.ITR) errors.ITR = 'ITR is required';

    if (!formData.officeAddress.trim()) {
      errors.officeAddress = "Company Name is required";
      valid=false;
    }

    // Validate Company Name
    // if (!formData.companyName.trim()) {
    //     errors.companyName = "Company Name is required";
    //     valid=false;
    //   }
  
      // if (!formData.officeemail){
      //   errors.officeemail = 'Office Email is required';
      //   valid=false;
      // } 
      // else if (!/\S+@\S+\.\S+/.test(formData.officeemail)){
      //   errors.officeemail = 'Invalid email address';
      //   valid=false;
      // } 


      // Validate Office Pincode
      if (!formData.officePincode.trim()) {
        errors.officePincode = "Office Pincode is required";
        valid=false;
      } else if (
        formData.officePincode.length !== 6 ||
        !/^\d{6}$/.test(formData.officePincode)
      ) {
        errors.officePincode = "Invalid pincode format";
        valid=false;
      }
      if (mainFormData.profession === "Business") {
       // Check businessType validation again to ensure it's correct before moving forward
  if (!formData.businessType || formData.businessType === 'NA') {
    errors.businessType = "Business type is required";  // Set the error message
    valid = false;
  } else {
    errors.businessType = "";  // Clear error if the profession is valid
  }


       // Check businessAge validation again to ensure it's correct before moving forward
  if (!formData.businessAge || formData.businessAge === 'NA') {
    errors.businessAge = "Business age is required";  // Set the error message
    valid = false;
  } else {
    errors.businessAge = "";  // Clear error if the profession is valid
  }

   // Check profession validation again to ensure it's correct before moving forward
   if (!formData.governmentLicense || formData.governmentLicense === 'NA') {
    errors.governmentLicense = "Government license is required";  // Set the error message
    valid = false;
  } else {
    errors.governmentLicense = "";  // Clear error if the profession is valid
  }
      }


    setFormErrors(errors);
    console.log("The form errors are ",errors);
    return valid;
  };


  const handleDateChange2 = (date) => {
    console.log("Inside handle date change");
    const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
    setFormData({ ...formData, dob: formattedDate });

    console.log("The changed date is :: ", formattedDate);

    // (date) => setFormData({ ...formData, dob: date })
  };

  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  const sixtyYearsAgo = new Date(
    today.getFullYear() - 60,
    today.getMonth(),
    today.getDate()
  );

  const handleDataLayerStage = (stage) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'stage': stage});
  };
  
 // Function to handle form field changes
 const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Calculate the completion percentage whenever formData changes
  useEffect(() => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(value => value !== '').length;
    const completionPercentage = (filledFields / totalFields) * 100;

    setProgress(completionPercentage);
  }, [formData]);

  // Custom Option component (same as your previous one)
const CustomOption = (props) => {
  const { data, innerRef, innerProps, selectOption, isSelected } = props;

  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        padding: '10px',
        position: 'relative',
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span>{data.label}</span>
        <input
          type="radio"
          name="profession"
          value={data.value}
          checked={isSelected}
          onChange={() => selectOption(data)}
        />
      </div>

      <hr
        style={{
          margin: '5px 0',
          border: '0',
          borderTop: '1px solid #ddd',
          width: '100%',
        }}
      />
    </div>
  );
};
// Define options for the new fields
const businessTypeOptions = [
  { value: 'Proprietary Firm', label: 'Proprietary Firm' },
  { value: 'Partnership', label: 'Partnership' },
  { value: 'One Person Company', label: 'One Person Company' },
  { value: 'Private Limited Company', label: 'Private Limited Company' },
  { value: 'Other', label: 'Other' }
];

const governmentLicenseOptions = [
  { value: 'GUMASTA', label: 'GUMASTA' },
  { value: 'Shop Act', label: 'Shop Act' },
  { value: 'MSME Certificate', label: 'MSME Certificate' },
  { value: 'Udyog Aadhaar', label: 'Udyog Aadhaar' },
  { value: '0', label: 'None of these available' },

];

const ageOptions = [
  { value: '1', label: 'Less than 2 year' },
  { value: '2', label: '2-5 years' },
  { value: '3', label: 'Greater than 5 years' },
];

const customStyles = {
 
  input: (provided) => ({
    ...provided,
    padding: '8px',  // Padding for input text
    // borderRadius: '10px',  // Border radius for input
    width: '100%',  // Full width
    minHeight: '70px',
    border: 'none',  // Remove border for input itself
    cursor: 'pointer',
    borderRadius: '50px',
  }),
  menu: (provided) => ({
    ...provided,
    position: 'fixed', // Make the dropdown fixed relative to the viewport
    top: '50%',        // Vertically center the dropdown on the screen
    left: '50%',       // Horizontally center the dropdown on the screen
    transform: 'translate(-50%, -50%)', // Adjust the dropdown to be exactly centered
    width: '80%',      // Set the width of the dropdown (you can adjust it)
    maxWidth: '400px', // Set a max width for the dropdown
    zIndex: 9999,      // Ensure the dropdown appears on top of other content
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)', // Optional: Add shadow for a popup effect
    borderRadius: '10px',
  }),
  control: (provided) => ({
    ...provided,
    width: '100%', // Full width of the control
    borderRadius: '10px',
    minHeight: '50px',
  }),
  placeholder: (provided) => ({
    ...provided,
    padding: '12px',  // Padding for placeholder text
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: '0',  // Optional: Adjust padding of the dropdown indicator
  }),
  indicatorSeparator: () => ({
    display: 'none',  // Hide the indicator separator (optional)
  }),
};
const [isBusinessTypeMenuOpen, setIsBusinessTypeMenuOpen] = useState(false);
  const [isBusinessAgeMenuOpen, setIsBusinessAgeMenuOpen] = useState(false);
  const [isGovtLicenseMenuOpen, setIsGovtLicenseMenuOpen] = useState(false);

  const businessAgeRef = useRef(null);
  const governmentLicenseRef = useRef(null);

  // Handle focus change for each field
  const handleBusinessTypeChange = (selectedOption) => {
    setFormData({ ...formData, businessType: selectedOption.value });

    // Clear error if a valid selection is made
    if (selectedOption.value) {
      setFormErrors({ ...formErrors, businessType: '' });
    }

    setIsBusinessTypeMenuOpen(false);

    // Automatically focus on the next field (Business Age)
    if (businessAgeRef.current) {
      businessAgeRef.current.focus();
      setIsBusinessAgeMenuOpen(true); // Open the Business Age dropdown
    }
  };

  const handleBusinessAgeChange = (selectedOption) => {
    setFormData({ ...formData, businessAge: selectedOption.value });

    // Clear error if a valid selection is made
    if (selectedOption.value) {
      setFormErrors({ ...formErrors, businessAge: '' });
    }

    setIsBusinessAgeMenuOpen(false);

    // Automatically focus on the next field (Government License)
    if (governmentLicenseRef.current) {
      governmentLicenseRef.current.focus();
      setIsGovtLicenseMenuOpen(true); // Open the Government License dropdown
    }
  };

  const handleGovtLicenseChange = (selectedOption) => {
    setFormData({ ...formData, governmentLicense: selectedOption.value });

    // Clear error if a valid selection is made
    if (selectedOption.value) {
      setFormErrors({ ...formErrors, governmentLicense: '' });
    }

    setIsGovtLicenseMenuOpen(false);
  };

  const handleSubmit = (e) => {

    console.log("Inside handle Submit")
    e.preventDefault();
    if (validateForm()) {
      console.log("Inside validate form");
      // Process form data and navigate to the next page
      handleDataLayerStage(3); // Track step 2 when the form is submitted
      console.log("After Data layer stage");
      console.log('Form data:', formData);
      StoreDataToBackendForSalaried(e);
      // getLendersList(e);
      // setActiveContainer('LendersList');
      
      // router.push('/next-page'); // Uncomment and modify the route as needed
    }else{
      console.log("form not validated");
    }
  };
  const toggleOfficialInfo = () => {
    setOfficialInfoVisible((prev) => !prev);
  };

  const StoreDataToBackendForSalaried = async (e) => {
    // setIsLoading2(true);
    console.log("Inside handle form submit")
    e.preventDefault();
    try {
      const formData1 = new FormData();
      formData1.append("mobileNumber", mainFormData.mobileNumber);
      formData1.append("profession",mainFormData.profession);
      formData1.append("firstName",firstName);
      formData1.append("lastName",lastName);
      formData1.append("income",mainFormData.monthlyIncome);
      formData1.append("paymentType",mainFormData.paymentType);
      formData1.append("pan",mainFormData.pan);
      formData1.append("dsa", mainFormData.dsa);
      formData1.append("userId",mainFormData.userId);
      formData1.append("gender",formData.gender);
      formData1.append("address",formData.address);
      formData1.append("dob",formData.dob);   
      formData1.append("email",formData.email);  
      formData1.append("businessType",formData.businessType);
      formData1.append("businessAge",formData.businessAge);
      formData1.append("governmentLicense",formData.governmentLicense);  
      // formData1.append("officeemail",formData.officeemail);
      formData1.append("officePincode",formData.officePincode);
      formData1.append("officeAddress",formData.officeAddress);
      // formData1.append("companyName", formData.companyName);
      formData1.append("pincode", formData.residentialPincode);

  // Conditionally add business-related fields only if profession is "Business"
  if (mainFormData.profession === "Business") {
    formData1.append("businessType",formData.businessType);
    formData1.append("businessAge",formData.businessAge);
    formData1.append("governmentLicense",formData.governmentLicense); 
  }else{
    formData1.append("businessType","");
    formData1.append("businessAge","");
    formData1.append("governmentLicense","");
  }
      // setIsLoadingforLoader(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}NewBlPrimeMasterSecond`,
        formData1
      );

      // if(cpi===1){
        // apiExecutionBackend(lenderProduct);
      // }

      if (response.data.code === 0) {
        //Here when the code is 0 we are calling lendersList backend which will give us lendersList accrding to user
        getLendersList(e);
        // setResponseProductName("LTPL");
        // setRejectPage(true);
      }

      if (response.data.code === 1111) {
        console.log(response.data.msg);
        //Here when the code is 0 we are calling lendersList backend which will give us lendersList accrding to user
        // getLendersList(e);
        // getLoanBackend(e);
        setResponseProductName("LTPL");
        setSuccessPage(true);
      }

      if (response.data.code === 335) {
        setResponseProductName("EarlySalary");
        setSuccessPage(true);
      }
      if (response.data.code === 116) {
        setResponseProductName("Incred");
        setSuccessPage(true);
      }
      if (response.data.code === 112) {
        setResponseProductName("CASHe");
        setSuccessPage(true);
      }
      if (response.data.code === 113) {
        setResponseProductName("SmartCoin");
        setSuccessPage(true);
      }
      if (response.data.code === 114) {
        setResponseProductName("Zype");
        setSuccessPage(true);
      }
      if (response.data.code === 102) {
        setResponseProductName("Prefr");
        setSuccessPage(true);
      }
      if (response.data.code === 1) {
        setResponseProductName("IIFL-BL");
        // setSuccessPage(true);
        setRejectPage(true);
      }
      if (response.data.code === 111) {
        setResponseProductName("IIFL");
        setSuccessPage(true);
      }
      if (response.data.code === 101) {
        setResponseProductName("TataCapital");
        setSuccessPage(true);
      }
      if (response.data.code === -1) {
        // tata fail response
        // setSuccessPage(true);
        setRejectPage(true);
      }

      if (response.status === 200) {
      } else {
        console.error("Submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // const getLendersList = async (e) => {
  //   setIsLoading(true);
  
  //   e.preventDefault();
  //   try {
  
  //       const formData1 = new FormData();
  //       formData1.append('mobilenumber', mobileNumber);
  
  //       const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}lenderslist_blapplyprime`, formData1, {
  //           headers: {
  //               'Content-Type': 'application/json',
  //               'token': 'Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=' // Add your token here
  //           }
  //       });
  
  //       setTimeout(() => {
  //           setIsLoading(false);
  //       }, 3000);
  
  //       if (response.data.code === 200) {
  //           json = response.data.data;
  //           setLenderDetails(json);
  
  //           // // setShowAddInfo(false);
  //           // setShowLendersList(true);
  //           setActiveContainer("LendersList");
  //       }
  
  //       if (response.status === 200) {
  
  //       } else {
  //           console.error('Submission failed:', response.statusText);
  //       }
  //   } catch (error) {
  //       console.error('Error submitting form:', error);
  //   }
  // }; 
  const dobInputRef = useRef(null);  // Reference for the DatePicker input element

  // Handle gender selection
  const handleGenderChange = (e) => {
    const genderValue = e.target.value;
    setFormData({ ...formData, gender: genderValue });

    // Clear gender error
    setFormErrors({ ...formErrors, gender: "" });

    // Focus on DOB field after gender is selected
    if (dobInputRef.current) {
      // Add a small delay before focusing on the DOB input to ensure it's rendered
      setTimeout(() => {
        if (dobInputRef.current) {
          dobInputRef.current.setFocus(); // Focus on the DatePicker input element
        }
      }, 100); // Small delay of 100ms to ensure the DatePicker is rendered
    }
  };

  const apiExecutionBackend = async (productname) => {

    console.log(productname);
  
    // If lenderCpi is 1, redirect to lender.applicationlink

    console.log(cpi);

    if (cpi === 1) {
      setRedirectionLinkLoader(true);
      const timer = setTimeout(() => {
        // setRedirectionLinkLoader(false);
        const lenderApplicationLink = localStorage.getItem('applicationLink');
        window.location.href = lenderApplicationLink;
        // window.location.href = lenderApplicationLink;
      }, 3000);
        
        // setRedirectionLinkLoader(false);
        // return; // Exit the function to avoid further execution
    }else{
      console.log("Inside get Loan Backend");
    // e.preventDefault();

    setApiExecutionLoader(true);

    console.log("Inside get Loan Backend");

    try {
      const formData1 = new FormData();
      formData1.append('mobilenumber', mainFormData.mobileNumber);
      formData1.append('product', productname);

      // setlenderName(productname);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}apiExecution_bl_apply_prime_master`, formData1, {
        headers: {
          'Content-Type': 'application/json',
          'token': 'Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=' // Add your token here
        }
      });

      if (response.data.code === 0) {
        console.log("Inside get Loan Backend when code is 0");
        // setIsCameFromBackend(true);
        setApplicationPopup(true);
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
  const handleBackButton = () => {
    setActiveContainer('newplfirstpage'); // Switch the active container to 'NewPlPage'
  };

  return (
    <>
    {successPage && 
      
      <IndiaGoldSuccessPage product={responseproductname}/>}
      {
      rejectPage && <IndiaGoldRejectPage/>
      }
 {
      apiExecutionLoader && <ApplicationLoader/>
    }
    {
      redirectionLinkLoader && <RedirectionLoader/>
    }

{
  applicationPopup && <ApplicationPopup link={link}/>
}
    {
      errorPopup && <ErrorPopup lenderName={lenderProduct} formData={mainFormData} setErrorPopup={setErrorPopup} />
    }
    {!successPage && !rejectPage &&
    <div className={`${roboto.className} page-container`}>
      <div className="carousel-background">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
      <div className="blprimenewfirstcard-container" style={{ boxSizing: 'content-box' }}>
        <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>

           

        <div className="progress-bar-container">
            <div className="progress-bar">
            <div className="step-number">1</div>
              <div className="progress-bar-fill"></div>
            </div>
            <div className="progress-bar">
            <div className="step-number">2</div>
              <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>




        <div className={styles.formGroup}>
  <div className={styles.inputWrapper} style={{ position: 'relative' }}>
    <input
      type="email"
      id="email"
      name="email"
      placeholder="Enter Email"
      value={formData.email}
      className={styles.input}
      onChange={(e) => {
        setFormData({ ...formData, email: e.target.value });
        if (formErrors.email) {
          setFormErrors({ ...formErrors, email: "" });
        }
      }}
    />
    <span
      className={styles.icon}
      style={{
        position: 'absolute',
        right: '10px',
        top: '50%',
        color: '#00000061',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
      }}
    >
      <FaEnvelope />
    </span>
  </div>
  {formErrors.email && <span className="error">{formErrors.email}</span>}
</div>


{/* {
  addressFlag &&  */}
  {/* <> */}
<div className={styles.formGroup}>
  <div className={styles.inputWrapper} style={{ position: 'relative' }}>
    <input
      type="text"
      id="address"
      name="address"
      placeholder="Enter residential address"
      value={formData.address}
      className={styles.input}
      onChange={(e) => {
        setFormData({ ...formData, address: e.target.value });
        if (formErrors.address) {
          setFormErrors({ ...formErrors, address: "" });
        }
      }}
    />
    <span
      className={styles.icon}
      style={{
        position: 'absolute',
        right: '10px',
        top: '50%',
        color: '#00000061', // Adjusting the icon color
        transform: 'translateY(-50%)', // Center the icon vertically
        cursor: 'pointer',
      }}
    >   
      <FaHome />
    </span>
  </div>
  {formErrors.address && (
    <span className="error">{formErrors.address}</span>
  )}
</div>
  {/* </> */}
{/* } */}



<div>
      {/* Gender Selection */}
      {/* {genderFlag && ( */}
        <div className={styles.formGroup}>
          <label style={{ fontWeight: 'bold' }}>Gender</label>
          <div className={styles.radioGroup}>
            {['Male', 'Female', 'Other'].map((gender) => (
              <label key={gender} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <input
                  type="radio"
                  value={gender}
                  checked={formData.gender === gender}
                  onChange={handleGenderChange}
                  style={{ marginRight: '8px' }}
                />
                {gender}
              </label>
            ))}
          </div>
          {formErrors.gender && <div className="error">{formErrors.gender}</div>}
        </div>
      {/* )} */}

      {/* DOB Date Picker */}
      {/* {dobFlag && ( */}
       <div className={styles.formGroup}>
          <label style={{ fontWeight: 'bold' }}>Date of Birth</label>
          <div className="input-wrapper" style={{ position: 'relative' }}>
            <DatePicker
              selected={formData.dob}
              onChange={handleDateChange2}
              dateFormat="dd/MM/yyyy"
              className={styles.input}
              placeholderText="DD/MM/YYYY"
              ref={dobInputRef}  // Use the ref for the actual input element
              showYearDropdown // This enables the year selection dropdown
              yearDropdownItemNumber={50} // This controls how many years are shown in the dropdown
              scrollableYearDropdown // Allows you to scroll through years in the dropdown
            />
            <span
              className="icon"
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                color: '#00000061',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
              }}
            >
              <FaCalendar />
            </span>
          </div>
          {formErrors.dob && <div className="error">{formErrors.dob}</div>}
        </div>
      {/* )} */}
    </div>

 
  <>
  <div className={styles.formGroup}>
  <div className={styles.inputWrapper} style={{ position: 'relative' }}>
    <input
      type="text"
      id="officeAddress"
      name="officeAddress"
      placeholder="Enter office address"
      value={formData.officeAddress}
      className={styles.input}
      onChange={(e) => {
        setFormData({ ...formData, officeAddress: e.target.value });
        if (formErrors.officeAddress) {
          setFormErrors({ ...formErrors, officeAddress: "" });
        }
      }}
    />
    <span
      className={styles.icon}
      style={{
        position: 'absolute',
        right: '10px',
        top: '50%',
        color: '#00000061',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
      }}
    >
      <FaBuilding /> {/* Building icon */}
    </span>
  </div>
  {formErrors.officeAddress && (
    <span className="error">{formErrors.officeAddress}</span>
  )}
</div>



{/* <div className={styles.formGroup}>
  <div className={styles.inputWrapper} style={{ position: 'relative' }}>
    <input
      type="email"
      id="officeemail"
      name="officeemail"
      placeholder="Enter Work Email"
      value={formData.officeemail}
      className={styles.input}
      onChange={(e) => {
        setFormData({ ...formData, officeemail: e.target.value });
        if (formErrors.officeemail) {
          setFormErrors({ ...formErrors, officeemail: "" });
        }
      }}
    />
    <span
      className={styles.icon}
      style={{
        position: 'absolute',
        right: '10px',
        top: '50%',
        color: '#00000061',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
      }}
    >
      <FaEnvelope /> 
    </span>
  </div>
  {formErrors.officeemail && (
    <span className="error">{formErrors.officeemail}</span>
  )}
</div> */}


<div className={styles.formGroup}>
  <div className={styles.inputWrapper} style={{ position: 'relative' }}>
    <input
      type="text"
      id="officePincode"
      name="officePincode"
      placeholder="Enter office Pincode"
      inputMode="numeric"
      value={formData.officePincode}
      className={styles.input}
      onChange={(e) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 6); // Keep only digits and limit to 6
        setFormData({ ...formData, officePincode: value });
        // Close keyboard when 6 digits are entered
        if (value.length === 6) {
          e.target.blur(); // This will close the keyboard
        }
        if (formErrors.officePincode) {
          setFormErrors({ ...formErrors, officePincode: "" });
        }
      }}
    />
    <span
      className={styles.icon}
      style={{
        position: 'absolute',
        right: '10px',
        top: '50%',
        color: '#00000061',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
      }}
    >
      <FaMapPin /> {/* Map pin (location) icon */}
    </span>
  </div>
  {formErrors.officePincode && (
    <span className="error">{formErrors.officePincode}</span>
  )}
</div>

{/* {
  residentialPincodeFlag && */}
  {/* <> */}
    <div className={styles.formGroup}>
  <div className={styles.inputWrapper} style={{ position: 'relative' }}>
    <input
      type="text"
      id="residentialPincode"
      name="residentialPincode"
      placeholder="Enter residential pincode"
      inputMode="numeric"
      value={formData.residentialPincode}
      className={styles.input}
      onChange={(e) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 6); // Keep only digits and limit to 6
        setFormData({ ...formData, residentialPincode: value });
        if (formErrors.officePincode) {
          setFormErrors({ ...formErrors, residentialPincode: "" });
        }
      }}
    />
    <span
      className={styles.icon}
      style={{
        position: 'absolute',
        right: '10px',
        top: '50%',
        color: '#00000061',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
      }}
    >
      <FaMapPin /> {/* Map pin (location) icon */}
    </span>
  </div>
  {formErrors.residentialPincode && (
    <span className="error">{formErrors.residentialPincode}</span>
  )}
</div>

{mainFormData.profession === 'Business' && (
<>
{/* Business Type Field */}
<div className={styles.formGroup}>
          <Select
            id="businessType"
            name="businessType"
            value={businessTypeOptions.find(option => option.value === formData.businessType)}
            options={businessTypeOptions}
            onChange={handleBusinessTypeChange}
            styles={customStyles}
            placeholder="Select Business Type"
            menuIsOpen={isBusinessTypeMenuOpen}
            onFocus={() => setIsBusinessTypeMenuOpen(true)}
            onBlur={() => setIsBusinessTypeMenuOpen(false)}
            isSearchable={false}
            components={{ Option: CustomOption }}
          />
          {formErrors.businessType && <span className="error">{formErrors.businessType}</span>}
        </div>

        {/* Business Age Field */}
        <div className={styles.formGroup}>
          <Select
            id="businessAge"
            name="businessAge"
            value={ageOptions.find(option => option.value === formData.businessAge)}
            options={ageOptions}
            ref={businessAgeRef}
            onChange={handleBusinessAgeChange}
            styles={customStyles}
            placeholder="How old is the business?"
            menuIsOpen={isBusinessAgeMenuOpen}
            onFocus={() => setIsBusinessAgeMenuOpen(true)}
            onBlur={() => setIsBusinessAgeMenuOpen(false)}
            isSearchable={false}
            components={{ Option: CustomOption }}
          />
          {formErrors.businessAge && <span className="error">{formErrors.businessAge}</span>}
        </div>

        {/* Government License Field */}
        <div className={styles.formGroup}>
          <Select
            id="governmentLicense"
            name="governmentLicense"
            value={governmentLicenseOptions.find(option => option.value === formData.governmentLicense)}
            options={governmentLicenseOptions}
            ref={governmentLicenseRef}
            onChange={handleGovtLicenseChange}
            styles={customStyles}
            placeholder="Do you have any Government license?"
            menuIsOpen={isGovtLicenseMenuOpen}
            onFocus={() => setIsGovtLicenseMenuOpen(true)}
            onBlur={() => setIsGovtLicenseMenuOpen(false)}
            isSearchable={false}
            components={{ Option: CustomOption }}
          />
          {formErrors.governmentLicense && <span className="error">{formErrors.governmentLicense}</span>}
        </div>


</>
)}

  </>
{/* } */}
<button onClick={handleBackButton} className="back-button">
  <FaArrowLeft />
</button>

  {/* </> */}
              <div className={styles.stickyButton}>
              <button type="submit" className={`${styles.button} ${styles.submitButton}`}>Next</button>
              {/* className={`w-full  ${styles.submitButton}`} */}
              </div>
          
        </form>
      </div>
    </div>
}
    </>
  );
};

export default BlApplyPrimeMasterSecond;
