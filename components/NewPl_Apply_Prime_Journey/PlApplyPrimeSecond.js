"use client"
import React, { useState, useRef,useEffect } from "react";
import './PlApplyPrimeSecond.css';
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
import { FaEnvelope, FaHome, FaBuilding, FaCalendar, FaMapPin, FaArrowLeft, FaDollarSign } from 'react-icons/fa'; // Font Awesome icons for React
import ErrorPopup from '../NewBlJourneyD/ErrorPopup';
import Select from 'react-select';
import IndiaGoldSuccessPage from "../IndiaGold/IndiaGoldSuccessPage";
import RejectPage from "@components/IndiaGold/RejectPage";
// import {Roboto} from '@next/font/google';
import {Roboto} from '@next/font/google';
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



const PlApplyPrimeSecond = ({dobFlag, firstName, lastName, mainFormData, getLendersList, genderFlag, addressFlag, residentialPincodeFlag, setActiveContainer}) => {
    const [formErrors, setFormErrors] = useState({
        email: "",
        address:"",
        dob: "",
        gender: "",  
        // officeAddress: "",
        companyName: "",  
        // officeemail: "",
        // officePincode: "",
        residentialPincode: "",
        // ITR: "",
        // businessType: "",
        // businessAge: "",
        // governmentLicense: "",
        loanAmount:"",
      });

      const [formData, setFormData] = useState({
        email: "",
        address: "",
        dob: "",
        gender: "",
        // officeAddress: "",
        companyName: "",
        // officeemail: "",
        // officePincode: "",
        residentialPincode: "",
        // ITR: "",
        // businessType: "",
        // businessAge: "",
        // governmentLicense: "",
        loanAmount:"",
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
      companyName: "",
      residentialPincode: "",
    loanAmount:"",
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
    
    if (!formData.loanAmount) {
        errors.loanAmount = "Loan amount is required";
        valid = false;
      } else if (isNaN(formData.loanAmount) || formData.loanAmount <= 0) {
        errors.loanAmount = "Loan amount must be a positive number";
        valid = false;
      }
      

      if (mainFormData.profession === "Business" || mainFormData.profession === "Self employed") {
         // Validate Company Name
    if (!formData.companyName.trim()) {
        errors.companyName = "Company Name is required";
        valid=false;
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
  

  // Calculate the completion percentage whenever formData changes
  useEffect(() => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(value => value !== '').length;
    const completionPercentage = (filledFields / totalFields) * 100;

    setProgress(completionPercentage);
  }, [formData]);

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
      // formData1.append("officeemail",formData.officeemail);
    //   formData1.append("officePincode",formData.officePincode);
    //   formData1.append("officeAddress",formData.officeAddress);
      // formData1.append("companyName", formData.companyName);
      formData1.append("pincode", formData.residentialPincode);
      formData1.append("loanAmount",formData.loanAmount);
  // Conditionally add business-related fields only if profession is "Business"
  if (mainFormData.profession === "Business" || mainFormData.profession === "Self employed") {
    formData1.append("companyName",formData.companyName);
  }else{
    formData1.append("companyName","");
  }
      // setIsLoadingforLoader(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}NewPl_Apply_Prime_Second`,
        formData1
      );

      // if(cpi===1){
        // apiExecutionBackend(lenderProduct);
      // } 
      if(response.data.code === 0){
        setSuccessPage(true);
      }
      if(response.data.code === 116){
        setSuccessPage(true);
      }
      if(response.data.code === 335){
        setSuccessPage(true);
      }
      if(response.data.code === 113){
        setSuccessPage(true);
      }
      if(response.data.code === 8900){
        setSuccessPage(true);
      }
    //   if(response.data.code === 1111)
    //   {
    //     setRejectPage(true);
    //   }


      if (response.data.code === 3200) {
        //Here when the code is 0 we are calling lendersList backend which will give us lendersList accrding to user
        getLendersList(e);
        // setSuccessPage(true);
        // getLoanBackend(e);
      }
      if (response.status === 200) {
      } else {
        console.error("Submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
 
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

  const handleBackButton = () => {
    setActiveContainer('newplfirstpage'); // Switch the active container to 'NewPlPage'
  };

  return (
    <>
    {successPage && 
      
      <IndiaGoldSuccessPage/>}
      {rejectPage && 
      
      <RejectPage/>}
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
    {!successPage && 
    <div className={`${roboto.className} page-container`}>
      <div className="carousel-background">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
      <div className="newfirstcard-container" style={{ boxSizing: 'content-box' }}>
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
          {formErrors.gender && <p style={{ color: 'red' }}>{formErrors.gender}</p>}
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
          {formErrors.dob && <div className="error-message">{formErrors.dob}</div>}
        </div>
      {/* )} */}
    </div>

 
  <>
  {/* <div className={styles.formGroup}>
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
      <FaBuilding /> 
    </span>
  </div>
  {formErrors.officeAddress && (
    <span className="error">{formErrors.officeAddress}</span>
  )}
</div> */}



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


{/* <div className={styles.formGroup}>
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
      <FaMapPin />
    </span>
  </div>
  {formErrors.officePincode && (
    <span className="error">{formErrors.officePincode}</span>
  )}
</div> */}

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

<div className={styles.formGroup}>
  <div className={styles.inputWrapper} style={{ position: 'relative' }}>
    <input
      type="text"
      id="loanAmount"
      name="loanAmount"
      placeholder="Enter Loan Amount"
      inputMode="numeric"
      value={formData.loanAmount}
      className={styles.input}
      onChange={(e) => {
        const value = e.target.value.replace(/\D/g, ""); // Allow only digits
        setFormData({ ...formData, loanAmount: value });
        if (formErrors.loanAmount) {
          setFormErrors({ ...formErrors, loanAmount: "" });
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
      <FaDollarSign /> {/* Dollar sign icon for loan amount */}
    </span>
  </div>
  {formErrors.loanAmount && (
    <span className="error">{formErrors.loanAmount}</span>
  )}
</div>


{(mainFormData.profession === 'Business' || mainFormData.profession === "Self employed") && (
<>

<div className={styles.formGroup}>
  <div className={styles.inputWrapper} style={{ position: 'relative' }}>
    <input
      type="text"
      id="companyName"
      name="companyName"
      placeholder="Enter Company Name"
      value={formData.companyName}
      className={styles.input}
      onChange={(e) => {
        setFormData({ ...formData, companyName: e.target.value });
        if (formErrors.companyName) {
          setFormErrors({ ...formErrors, companyName: "" });
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
  {formErrors.companyName && (
    <span className="error">{formErrors.companyName}</span>
  )}
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

export default PlApplyPrimeSecond;
