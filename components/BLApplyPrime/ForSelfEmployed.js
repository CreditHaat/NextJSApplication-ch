"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import './ForSelfEmployed.css'; // Import the CSS module from the same directory
import NewNavBar from "../NewPersonalLoan/Other Components/Navbar";
import SmartCoinFooter from "../SmartCoin/SmartCoinFooter";
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import ErrorPopup from "../../components/BLApplyPrime/SmartCoinErrorPopup";
import ApplicationPopup from "../../components/BLApplyPrime/ApplicationPopup";
import ApplicationLoader from './ApplicationLoader';
import RedirectionLoader from "./RedirectionLoader";

export default function ForSelfEmployed({cpi, lenderProduct, mainFormData, dobFlag, residentialPincodeFlag, setActiveContainer }) {
  const [formData, setFormData] = useState({
    pan: '',
    email: '',
    dob: '',
    address: '',
    pincode: '',
    itr: '' // New field for ITR
  });

  const [formErrors, setFormErrors] = useState({});
  const router = useRouter(); // Initialize useRouter

  const [errorPopup, setErrorPopup] = useState(false);
  const[applicationPopup ,setApplicationPopup] = useState(false);
  const [link, setLink] = useState(null);
  const [apiExecutionLoader, setApiExecutionLoader] = useState(false);
  const [redirectionLinkLoader, setRedirectionLinkLoader] = useState(false);
  const [progress, setProgress] = useState(50); // Initial progress

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when component mounts
  }, []);

useEffect(() => {
  updateProgress(); // Update progress when formData changes
}, [formData]);


const handleChange = (e) => {
  const { name, value } = e.target;

  let updatedValue = value;

  if (name === 'pincode') {
    updatedValue = value.replace(/\D/g, '').slice(0, 6);
  } else if (name === 'pan') {
    updatedValue = value.toUpperCase();
  }

  setFormData((prevData) => ({ ...prevData, [name]: updatedValue }));
  validateField(name, updatedValue); // Validate field on change
};

  const validateField = (name, value) => {
    let errors = { ...formErrors };
  
    switch (name) {
      case 'pan':
        if (!value.trim()) {
          errors.pan = 'PAN is required';
        } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) {
          errors.pan = 'PAN is invalid';
        } else {
          delete errors.pan; // Remove error if valid
        }
        break;
      case 'email':
        if (!value.trim()) {
          errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errors.email = 'Invalid email address';
        } else {
          delete errors.email; // Remove error if valid
        }
        break;
      case 'dob':
        if (dobFlag) {
          if (!value.trim()) {
            errors.dob = 'Date of birth is required';
          } else {
            delete errors.dob; // Remove error if valid
          }
        }
        break;
      case 'address':
        if (!value.trim()) {
          errors.address = 'Address is required';
        } else {
          delete errors.address; // Remove error if valid
        }
        break;
      case 'pincode':
        if (residentialPincodeFlag) {
          if (!value.trim()) {
            errors.pincode = 'Pincode is required';
          } else if (!/^\d{6}$/.test(value)) {
            errors.pincode = 'Invalid pincode';
          } else {
            delete errors.pincode; // Remove error if valid
          }
        }
        break;
      case 'itr':
        if (!value) {
          errors.itr = 'ITR status is required';
        } else {
          delete errors.itr; // Remove error if valid
        }
        break;
      default:
        break;
    }
  
    setFormErrors(errors);
    return !errors[name]; // Return true if no error for the field
  };
  

  const updateProgress = () => {
    const totalFields = Object.keys(formData).length;
    const completedFields = Object.values(formData).filter(value => value).length;

    // Add base 50% to the percentage of fields filled
    const progressPercentage = 50 + ((completedFields / totalFields) * 50);
    setProgress(Math.min(progressPercentage, 100));
  };



  const validateForm = () => {
    const errors = {};

    if (!formData.pan.trim()) {
      errors.pan = 'PAN is required';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
      errors.pan = 'PAN is invalid';
    }
    if (!formData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email address';

    if(dobFlag){
      if (!formData.dob) errors.dob = 'Date of birth is required';
    // Add more validation for DOB if needed
    }
    

    if (!formData.address) errors.address = 'Address is required';

    if(residentialPincodeFlag){
      if (!formData.pincode) errors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) errors.pincode = 'Invalid pincode';
    }
    

    if (!formData.itr) errors.itr = 'ITR status is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

 // ......................................steps count code---------------------------------------

 const handleDataLayerStage = (stage) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({'stage': stage});
};


const handleSubmit = (e) => {
  e.preventDefault();

  if (validateForm()) {
    handleDataLayerStage(4); // Track step 2 when the form is submitted
    StoreDataToBackendForSelfEmployed(e);
    console.log('Form data:', formData);
    // router.push('/next-page'); // Uncomment and modify the route as needed
  }
};


  const handlePreviousClick = () => {
    // Navigate to the lenders list page
    // console.log("Previous button clicked");
    // router.push('/BLApplyLenders');
    setActiveContainer("LendersList");
    
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

  // Here we will write a finction which will add the data to the backend and call the api if the cpi is 1 else will redirect to that particular page of the lender

  const StoreDataToBackendForSelfEmployed = async (e) => {
    // setIsLoading2(true);
    e.preventDefault();
    try {
      const formData1 = new FormData();
      formData1.append("mobileNumber", mainFormData.mobileNumber);
      formData1.append("pan",formData.pan);
      formData1.append("email",formData.email);
      formData1.append("dob",formData.dob);
      formData1.append("homePin",formData.pincode);
      formData1.append("address",formData.address);
      formData1.append("itr",formData.itr);


      // setIsLoadingforLoader(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}BLApplyPrime_SelfEmployed`,
        formData1
      );

      apiExecutionBackend(e);

      if (response.data.code === 0) {
        //Here when the code is 0 we are calling lendersList backend which will give us lendersList accrding to user
        // getLendersList(e);
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

  const apiExecutionBackend = async (productname) => {

    console.log(productname);
  
    // If lenderCpi is 1, redirect to lender.applicationlink

    console.log(cpi);

    if (cpi === 1) {
      setRedirectionLinkLoader(true);
      const timer = setTimeout(() => {
        setRedirectionLinkLoader(false);
        const lenderApplicationLink = localStorage.getItem('applicationLink');
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


  return (
    <>
    {
      redirectionLinkLoader && <RedirectionLoader/>
    }
    {
      apiExecutionLoader && <ApplicationLoader/>
    }

{
  applicationPopup && <ApplicationPopup link={link}/>
}
    {
      errorPopup && <ErrorPopup lenderName={lenderProduct} formData={mainFormData} setErrorPopup={setErrorPopup} />
    }
      {/* <NewNavBar /> */}
      <div className="blapply-selfemployedpage">
      <div className="progress-container">
         <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
        <form onSubmit={handleSubmit}>
          {/* <h2 style={{textAlign:""}}>Details</h2> */}

          <div className="blapply-selfemployed-group">
            <input
              type="text"
              id="pan"
              name="pan"
              value={formData.pan}
              onChange={handleChange}
              placeholder="PAN"
            />
            {formErrors.pan && <span className="error">{formErrors.pan}</span>}
          </div>

          <div className="blapply-selfemployed-group">
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            {formErrors.email && <span className="error">{formErrors.email}</span>}
          </div>

          {/* {
            dobFlag && 
            <div className="blapply-selfemployed-group">
            <input
              type="text"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              placeholder="Date of Birth"
            />
            {formErrors.dob && <span className="error">{formErrors.dob}</span>}
          </div>
          } */}

          {
            dobFlag &&
            <>
            <div className="blapply-selfemployed-group">
            <DatePicker
                    selected={formData.dob}
                    onChange={handleDateChange2}
                    dateFormat="dd/MM/yyyy"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={150}
                    maxDate={eighteenYearsAgo}
                    minDate={sixtyYearsAgo} // Use minYear here
                    placeholderText="Date of birth"
                  />

                  {formErrors.dob && (
                    <div className="pploan-invalid-feedback">{formErrors.dob}</div>
                  )}
                  </div>
            </>
          }
          

          <div className="blapply-selfemployed-group">
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
            />
            {formErrors.address && <span className="error">{formErrors.address}</span>}
          </div>

{
  residentialPincodeFlag &&
<div className="blapply-selfemployed-group">
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              maxLength="6" // Restrict input to 6 characters
              inputMode="numeric" // Restrict to numeric input
            />
            {formErrors.pincode && <span className="error">{formErrors.pincode}</span>}
          </div>
}
          

          <div className="blapply-selfemployed-group">
            <p>ITR?</p>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="itr"
                  value="yes"
                  checked={formData.itr === 'yes'}
                  onChange={handleChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="itr"
                  value="no"
                  checked={formData.itr === 'no'}
                  onChange={handleChange}
                />
                No
              </label>
            </div>
            {formErrors.itr && <span className="error">{formErrors.itr}</span>}
          </div>
          <button type="button" className="blapply-selfemployedp-button" onClick={handlePreviousClick} style={{color:"#3e2780", marginRight: "10px"}}>Previous</button>
          <button type="submit" className="blapply-selfemployed-button" style={{color:"#3e2780"}}>Submit</button>
        </form>
      </div>
      <SmartCoinFooter />
    </>
  );
}
