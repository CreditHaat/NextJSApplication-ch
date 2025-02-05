"use client"
import React, { useState, useRef,useEffect } from "react";
import './NewPlPage2.css';
import listimage1 from './newplimages/finalimage2.png';
import listimage2 from './newplimages/finalimage3.png';
import listimage3 from './newplimages/plimage33.png';
import styles from './NewPlFirstPage.module.css';
import EmblaCarousel from './Emblacarousel/js/EmblaCarousel';
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



const NewPlPage2 = ({dobFlag, mainFormData, getLendersList, genderFlag, addressFlag, residentialPincodeFlag, setActiveContainer}) => {
    const [formErrors, setFormErrors] = useState({
        email: "",
        address:"",
        dob: "",
        gender: "",  
        companyName: "",  
        officeemail: "",
        officePincode: "",
        residentialPincode: "",
        // ITR: "",
      });

      const [formData, setFormData] = useState({
        email: "",
        address: "",
        dob: "",
        gender: "",
        companyName: "",
        officeemail: "",
        officePincode: "",
        residentialPincode: "",
        // ITR: "",
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
      officeemail: "",
      officePincode: "",
      residentialPincode: "",
    //   ITR: "",
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
    


    // if (!formData.ITR) errors.ITR = 'ITR is required';


    // Validate Company Name
    if (!formData.companyName.trim()) {
        errors.companyName = "Company Name is required";
        valid=false;
      }
  
      if (!formData.officeemail){
        errors.officeemail = 'Office Email is required';
        valid=false;
      } 
      else if (!/\S+@\S+\.\S+/.test(formData.officeemail)){
        errors.officeemail = 'Invalid email address';
        valid=false;
      } 


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
      formData1.append("gender",formData.gender);
      formData1.append("address",formData.address);
      formData1.append("dob",formData.dob);   
      formData1.append("email",formData.email);     
      formData1.append("officeemail",formData.officeemail);
      formData1.append("officePincode",formData.officePincode);
      formData1.append("companyName", formData.companyName);
      formData1.append("pincode", formData.residentialPincode);


      // setIsLoadingforLoader(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}PlApplyNew_Salaried`,
        formData1
      );

      // if(cpi===1){
        // apiExecutionBackend(lenderProduct);
      // }

      if (response.data.code === 0) {
        //Here when the code is 0 we are calling lendersList backend which will give us lendersList accrding to user
        getLendersList(e);
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


{
  addressFlag && 
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
    </span>s
  </div>
  {formErrors.address && (
    <span className="error">{formErrors.address}</span>
  )}
</div>
  </>
}



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
          {formErrors.gender && <p style={{ color: 'red' }}>{formErrors.gender}</p>}
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
              showYearDropdown
              yearDropdownItemNumber={50}
              scrollableYearDropdown
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
      )}
    </div>

 
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



<div className={styles.formGroup}>
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
      <FaEnvelope /> {/* Envelope (email) icon */}
    </span>
  </div>
  {formErrors.officeemail && (
    <span className="error">{formErrors.officeemail}</span>
  )}
</div>


<div className={styles.formGroup}>
  <div className={styles.inputWrapper} style={{ position: 'relative' }}>
    <input
      type="text"
      id="officePincode"
      name="officePincode"
      placeholder="Enter work Pincode"
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

{
  residentialPincodeFlag &&
  <>
    <div className={styles.formGroup}>
  <div className={styles.inputWrapper} style={{ position: 'relative' }}>
    <input
      type="text"
      id="residentialPincode"
      name="residentialPincode"
      placeholder="Enter home pincode"
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
}
<button onClick={handleBackButton} className="back-button">
  <FaArrowLeft />
</button>
      
    {/* <div className={styles.formGroup}>
  <label style={{ fontWeight: 'bold' }}>ITR available for last 2 years</label>
  <div className={styles.radioGroup}>
    {['Yes', 'No'].map((ITR) => (
      <label style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }} key={ITR}>
        <input
          type="radio"
          value={ITR}
          checked={formData.ITR === ITR}
          onChange={(e) => {
            setFormData({ ...formData, ITR: e.target.value });
            setFormErrors({ ...formErrors, ITR: "" });
          }}
          style={{ marginRight: '8px' }}
        />
        {ITR}
      </label>
    ))}
  </div>
  {formErrors.ITR && <p style={{ color: 'red' }}>{formErrors.ITR}</p>}
</div> */}



  </>



          {/* <div className={styles.formGroup}>
            <label> */}
              {/* <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  setErrors((prevErrors) => ({ ...prevErrors, consent: "" }));
                }}
              /> */}
              {/* {showFullConsent ? (
                <>
                 You hereby consent to CreditHaat being appointed as your authorized representative
              to receive your Credit Information from Experian for the purpose of accessing credit worthiness and availing pre-approved offers (“End Use Purpose”). You hereby agree to Terms and Conditions.
              I authorize CreditHaat, its partner financial institutes/lenders and their representatives to Call, SMS or communicate via WhatsApp regarding my application. This consent overrides any registration for DNC / NDNC.
              I confirm I am in India, I am a major and a resident of India and I have read and I accept CreditHaat Privacy Policy Click here to read the PRIVACY POLICY & TERMS OF SERVICE
                  <span onClick={() => setShowFullConsent(false)} style={{ color: "blue", cursor: "pointer", textDecoration: "none" }}>
                    Show Less
                  </span>
                </>
              ) : (
                <>
                 You hereby consent to CreditHaat being appointed as your authorized representative...
                  <span onClick={() => setShowFullConsent(true)} style={{ color: "blue", cursor: "pointer", textDecoration: "none" }}>
                    Read More
                  </span>
                </>
              )} */}
            {/* </label>
            {errors.consent && <p style={{ color: 'red' }}>{errors.consent}</p>}
          </div> */}

          {/* <div className={styles.formGroup}>
            <label> */}
              {/* <input
                type="checkbox"
                checked={terms}
                onChange={(e) => {
                  setTerms(e.target.checked);
                  setErrors((prevErrors) => ({ ...prevErrors, terms: "" }));
                }}
              /> */}
               {/* {showConsent ? (
                <>
                  By agreeing and accepting the terms and conditions set out herein, you provide your express consent to Social Worth Technologies Private Limited, Whizdm Innovations Pvt Ltd, Upwards Fintech Services Pvt Ltd, Tata Capital Financial Services Ltd, SmartCoin Financials Pvt Ltd, MWYN Tech Pvt Ltd, L&T Finance Ltd, Krazybee Services Pvt Ltd, Infocredit Services Pvt. Ltd, Incred Financial Services, IIFL Finance Ltd, EQX Analytics Pvt Ltd, EPIMoney Pvt Ltd, Bhanix finance and Investment LTd, Aditya Birla Finance Ltd to access the credit bureaus and credit information report and credit score. You also hereby irrevocably and unconditionally consent to usage of such credit information being provided by credit bureaus.                  
                  <span onClick={() => setShowConsent(false)} style={{ color: "blue", cursor: "pointer", textDecoration: "none" }}>
                    Show Less
                  </span>
                </>
              ) : (
                <>
                  By agreeing and accepting the terms and conditions set out herein, you provide your...
                  <span onClick={() => setShowConsent(true)} style={{ color: "blue", cursor: "pointer", textDecoration: "none" }}>
                    Read More
                  </span>
                </>
              )} */}
            {/* </label>
            {errors.terms && <p style={{ color: 'red' }}>{errors.terms}</p>}
          </div> */}
          {/* <div style={{marginBottom:"50px"}}>
          Calculation:<br/> CreditHaat does not charge any fees from the user.<br/> A sample loan calculation for ₹1,00,000 borrowed for 1 year, with interest rate @13% per annum*, is as provided below: <br/>
          Processing fee (@ 2%) = ₹2,000 + GST = ₹2,360
          </div> */}
              <div className={styles.stickyButton}>
              <button type="submit" className={`${styles.button} ${styles.submitButton}`}>Next</button>
              {/* className={`w-full  ${styles.submitButton}`} */}
              </div>
          
        </form>
      </div>
    </div>
    </>
  );
};

export default NewPlPage2;
