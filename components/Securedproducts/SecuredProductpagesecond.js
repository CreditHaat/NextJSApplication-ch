"use client"
import React, { useState, useRef,useEffect } from "react";
import './SecuredProductpagesecond.css';
import listimage1 from '../NewPlApplyD/newplimages/finalimage2.png';
import listimage2 from '../NewPlApplyD/newplimages/finalimage3.png';
import listimage3 from '../NewPlApplyD/newplimages/plimage33.png';
import styles from '../NewPlApplyD/NewPlFirstPage.module.css';
import EmblaCarousel from '../NewPlApplyD/Emblacarousel/js/EmblaCarousel';
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
import IndiaGoldSuccessPage from "../NewBl_Prime_Master_Journey/NewBlSuccessPage";
import IndiaGoldRejectPage from '../NewBl_Prime_Master_Journey/NewBlRejectPage';
import QuestionPage from './SecuredQuestionPage';
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



const SecuredProductpagesecond = ({dobFlag, firstName, lastName, mainFormData, genderFlag, addressFlag, residentialPincodeFlag, setActiveContainer}) => {
    const [formErrors, setFormErrors] = useState({
        email: "",
        address:"",
        dob: "",
        gender: "",  
        residentialPincode: "",
        loanGuarantee: "",
      });

      const [formData, setFormData] = useState({
        email: "",
        address: "",
        dob: "",
        gender: "",
        residentialPincode: "",
        loanGuarantee: "",
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
      loanGuarantee: "",
    };

   
    if (dobFlag && !formData.dob){
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


    if(addressFlag){
      // Validate Address
    if (!formData.address.trim()) {
      errors.address = "Address is required";
      valid=false;
    }
    }
    

    if(genderFlag){
      if (!formData.gender){
        errors.gender = 'Gender is required';
        valid=false;
      } 
    }

    if(residentialPincodeFlag){
      if(!formData.residentialPincode)
      {
        errors.residentialPincode = 'Home pincode is required';
      }
    }


   // Check profession validation again to ensure it's correct before moving forward
   if (!formData.loanGuarantee || formData.loanGuarantee === 'NA') {
    errors.loanGuarantee = "Loan guarantee is required";  // Set the error message
    valid = false;
  } else {
    errors.loanGuarantee = "";  // Clear error if the profession is valid
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
  

  useEffect(() => {
    // Count total visible fields based on flags
    let totalVisibleFields = 0;
  
    // Always visible fields
    totalVisibleFields++; // Email field is always visible
    totalVisibleFields++; // Loan Guarantee field is always visible
  
    // Fields based on flags
    if (addressFlag) totalVisibleFields++;
    if (genderFlag) totalVisibleFields++;
    if (dobFlag) totalVisibleFields++;
    if (residentialPincodeFlag) totalVisibleFields++;
  
    // Count the filled fields based on visible ones
    let filledFields = 0;
  
    // Always visible fields
    if (formData.email) filledFields++; // Check if email is filled
    if (formData.loanGuarantee) filledFields++; // Check if loanGuarantee is filled
  
    // Fields based on flags
    if (addressFlag && formData.address) filledFields++;
    if (genderFlag && formData.gender) filledFields++;
    if (dobFlag && formData.dob) filledFields++;
    if (residentialPincodeFlag && formData.residentialPincode) filledFields++;
  
    // Calculate progress percentage
    const completionPercentage = (filledFields / totalVisibleFields) * 100;
    setProgress(completionPercentage);
  }, [formData, addressFlag, genderFlag, dobFlag, residentialPincodeFlag]); // Add flags as dependencies
  

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

const loanGuaranteeOptions = [ 
{ value: 'Gold', label: 'Gold' },
// { value: 'Property', label: 'Property' },
{ value: 'Mutual Funds', label: 'Mutual Funds' },
{ value: 'Insurance', label: 'Insurance' },
{ value: 'Shares/Stocks', label: 'Shares/Stocks' },

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

  const [isLoanGuaranteeMenuOpen, setIsLoanGuaranteeMenuOpen] = useState(false);
  const [activeContainer, setActiveContainerState] = useState("SecuredProductpagesecond");

  const handleLoanGuaranteeChange = (selectedOption) => {
    setFormData({ ...formData, loanGuarantee: selectedOption.value });
    setTimeout(() => setIsLoanGuaranteeMenuOpen(false), 200);

    // Clear error if a valid selection is made
    if (selectedOption.value) {
      setFormErrors({ ...formErrors, loanGuarantee: '' });
    }

    setIsLoanGuaranteeMenuOpen(false);
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
     
    }else{
      console.log("form not validated");
    }
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
      formData1.append("loanGuarantee",formData.loanGuarantee);  
      formData1.append("pincode", formData.residentialPincode);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}SecuredProductSecondpage`,
        formData1
      );


      if (response.data.code === 0) {
        //Here when the code is 0 we are calling lendersList backend which will give us lendersList accrding to user
        // getLendersList(e);
        // setResponseProductName("LTPL");
        // setRejectPage(true);
        setActiveContainerState("QuestionPage");
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
     {activeContainer === "QuestionPage" && 
     <QuestionPage formData={formData} setActiveContainer={setActiveContainerState} mobilenumber={mainFormData.mobileNumber}/>}
    { activeContainer ==="SecuredProductpagesecond" && activeContainer!=='QuestionPage' && 
    <div className={`${roboto.className} page-container`}>
      <div className="securedsecondcarousel-background">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
      <div className="securedsecondfirstcard-container" style={{ boxSizing: 'content-box' }}>
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
            <div className="progress-bar">
            <div className="step-number">3</div>
              <div className="progress-bar-fill" style={{ width: '0%' }}></div>
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


 {
  addressFlag && (
  <>
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
  </> 
 )} 



<div>
      {/* Gender Selection */}
     {genderFlag && ( 
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
          {formErrors.gender && <p className="error-message" style={{ color: 'red' }}>{formErrors.gender}</p>}
        </div>
     )} 

      {/* DOB Date Picker */}
      {dobFlag && ( 
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
          {formErrors.dob && <div className="error-message" style={{color:'red'}}>{formErrors.dob}</div>}
        </div>
      )} 
    </div>

  <>

 {
  residentialPincodeFlag && (
   <> 
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
</>
  )}
        <div className={styles.formGroup}>
          <Select
            id="loanGuarantee"
            name="loanGuarantee"
            value={loanGuaranteeOptions.find(option => option.value === formData.loanGuarantee)}
            options={loanGuaranteeOptions}
            onChange={handleLoanGuaranteeChange}
            styles={customStyles}
            placeholder="What is your security?"
            menuIsOpen={isLoanGuaranteeMenuOpen}
            onFocus={() => setIsLoanGuaranteeMenuOpen(true)}
            onBlur={() => setIsLoanGuaranteeMenuOpen(false)}
            isSearchable={false}
            components={{ Option: CustomOption }}
          />
          {formErrors.loanGuarantee && <span className="error">{formErrors.loanGuarantee}</span>}
        </div>

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

export default SecuredProductpagesecond;
