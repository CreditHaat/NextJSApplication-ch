"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import './ForSalaried.css'; // Import the CSS module from the same directory
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

export default function ForSelfEmployed({cpi, lenderProduct, mainFormData, dobFlag, residentialPincodeFlag }) {
  const [formData, setFormData] = useState({
    pan: '',
    email: '',
    dob: '',
    address: '',
    pincode: '',
    companyName: '', // New field for Company Name
    officePincode: '', // New field for Office Pincode
  });

  const [formErrors, setFormErrors] = useState({});
  // const [isOfficialInfoVisible, setOfficialInfoVisible] = useState(false); // Manage collapsible state
  const router = useRouter(); // Initialize useRouter

  const [errorPopup, setErrorPopup] = useState(false);
  const[applicationPopup ,setApplicationPopup] = useState(false);
  const [link, setLink] = useState(null);
  const[redirectionLinkLoader, setRedirectionLinkLoader] = useState(false);
  const [apiExecutionLoader, setApiExecutionLoader] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when component mounts
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'pincode' || name === 'officePincode') {
      // Remove non-digit characters and restrict to 6 digits
      const cleanedValue = value.replace(/\D/g, '').slice(0, 6);
      setFormData((prevData) => ({ ...prevData, [name]: cleanedValue }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.pan) errors.pan = 'PAN is required';
    if (!formData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email address';


    if(dobFlag){
      // console.log("Inside if")
      if (!formData.dob) errors.dob = 'Date of birth is required';
    // Add more validation for DOB if needed
    }
    

    if (!formData.address) errors.address = 'Address is required';

    if(residentialPincodeFlag){
      if (!formData.pincode) errors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) errors.pincode = 'Invalid pincode';

    }
    
    if (!formData.companyName ) errors.companyName = 'Company name is required';
    if (!formData.officePincode ) errors.officePincode = 'Office pincode is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Process form data and navigate to the next page
      console.log('Form data:', formData);
      StoreDataToBackendForSalaried(e);
      // router.push('/next-page'); // Uncomment and modify the route as needed
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
      formData1.append("pan",formData.pan);
      formData1.append("email",formData.email);
      formData1.append("dob",formData.dob);
      formData1.append("homePin",formData.pincode);
      formData1.append("address",formData.address);
      formData1.append("companyName",formData.companyName);
      formData1.append("officePincode",formData.officePincode);


      // setIsLoadingforLoader(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}BLApplyPrime_Salaried`,
        formData1
      );

      // if(cpi===1){
        apiExecutionBackend(lenderProduct);
      // }

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
        // setRedirectionLinkLoader(false);
        const lenderApplicationLink = localStorage.getItem('applicationLink');
        window.location.href = lenderApplicationLink;
        // window.location.href = lenderApplicationLink;
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
      {/* <NewNavBar /> */}
      <div className="blapply-salariedpage">
        <form onSubmit={handleSubmit}>
          {/* <h2>Check eligibility in 3 steps</h2> */}

          <div className="blapply-salaried-group">
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

          <div className="blapply-salaried-group">
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
            <div className="blapply-salaried-group">
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

          

          <div className="blapply-salaried-group">
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
  <div className="blapply-salaried-group">
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
          

          <div className="blapply-salaried-group">
            {/* <button type="button" className="collapsible-button" onClick={toggleOfficialInfo}> */}
              {/* {isOfficialInfoVisible ? '-' : '+'} Official Information */}
            {/* </button> */}
            {/* {isOfficialInfoVisible && ( */}
              <div className="collapsible-content">
                <div className="blapply-salaried-group">
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Company Name"
                  />
                  {formErrors.companyName && <span className="error">{formErrors.companyName}</span>}
                </div>

                <div className="blapply-salaried-group">
                  <input
                    type="text"
                    id="officePincode"
                    name="officePincode"
                    value={formData.officePincode}
                    onChange={handleChange}
                    placeholder="Office Pincode"
                    maxLength="6" // Restrict input to 6 characters
                    inputMode="numeric" // Restrict to numeric input
                  />
                  {formErrors.officePincode && <span className="error">{formErrors.officePincode}</span>}
                </div>
              </div>
            {/* )} */}
          </div>

          <button type="submit" className="blapply-salaried-button" style={{color:"#3e2780"}}>Submit</button>
        </form>
      </div>
      <SmartCoinFooter />
    </>
  );
}