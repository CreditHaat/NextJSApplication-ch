"use client"
import React, { useState, useRef } from "react";
import './NewBlFirstPage.css';
import listimage1 from './newblimages/newchange11.png';
import listimage2 from './newblimages/newchange3.png';
import listimage3 from './newblimages/newchange2.png';
import styles from '../NewBlJourneyD/NewBlFirstFormPage.module.css';
import EmblaCarousel from './Emblacarousel/js/EmblaCarousel';
import NewBlListPage from "./NewBlListPage";
import axios from "axios";
import Loader from "./LendersLoader";
import RedirectionLoader from "./RedirectionLoader";
import ApplicationLoader from "./ApplicationLoader";
import ErrorPopup from './ErrorPopup';
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

const NewBlFirstPage = () => {
  const [mobile, setMobile] = useState("");
  const [turnover, setTurnover] = useState("");
  const [documents, setDocuments] = useState([]);
  const [businessAge, setBusinessAge] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [consent, setConsent] = useState(false);
  const [terms, setTerms] = useState(false);
  const [showFullConsent, setShowFullConsent] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [errors, setErrors] = useState({}); // Object to store error messages
  const formRef = useRef(null);

  const[ActiveContainer, setActiveContainer]= useState("NewBlFirstPage");
  const [isLoading, setIsLoading] = useState(false);
  var json = null;
  const [lenderDetails, setLenderDetails] = useState(null);

  const [lenderProduct, setLenderProduct] = useState(null);
  const [cpi,  setCpi] = useState(0);
  const[redirectionLinkLoader, setRedirectionLinkLoader] = useState(false);
  const [apiExecutionLoader, setApiExecutionLoader] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);

  // const handleDocumentChange = (e) => {
  //   const value = e.target.value;
  //   setDocuments((prev) =>
  //     prev.includes(value) ? prev.filter((doc) => doc !== value) : [...prev, value]
  //   );
  //   setErrors((prevErrors) => ({ ...prevErrors, documents: "" })); // Clear document error
  // };

  const validateForm = () => {
    const newErrors = {};
    
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      newErrors.mobile = "Please enter a valid mobile number.";
    }

    if (!turnover) {
      newErrors.turnover = "Please select your business turnover.";
    }

    if (documents.length === 0) {
      newErrors.documents = "Please select at least one business document.";
    }

    if (!businessAge) {
      newErrors.businessAge = "Please select your business age.";
    }

    if (!businessType) {
      newErrors.businessType = "Please select a business type.";
    }

    if (!/^\d{6}$/.test(pinCode)) {
      newErrors.pinCode = "Please enter a valid 6-digit pin code.";
    }

    // if (!consent) {
    //   newErrors.consent = "Please consent to the authorization.";
    // }

    // if (!terms) {
    //   newErrors.terms = "Please accept the terms and conditions.";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleDataLayerStage = (stage) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'stage': stage});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {

      handleDataSubmit(e);

      // Form submission logic here if everything is valid

      // Here we will write the code to save the data to the backend and then create a lenders list for that businessOwner

      // -----------------------------------------------------------------------------------------------------------------
      console.log({
        mobile,
        turnover,
        documents,
        businessAge,
        businessType,
        pinCode,
        consent,
        terms,
      });
      // setActiveContainer("NewBlListPage");
    }
  };

  const documentOptions = [
    { id: 0, name: " GST" },
    { id: 1, name: " MSME/Udyam" },
    { id: 2, name: " ITR" },
    { id: 3, name: " Shop Act" }
  ];

  const businessAgeOptions = [
    {id: 0, name: " 0-2 Years"},
    {id: 1, name: " 2+ Years"}
  ]

  const handleDocumentChange = (e) => {
    const value = parseInt(e.target.value); // Convert to integer
    setDocuments((prev) =>
      prev.includes(value) 
        ? prev.filter((doc) => doc !== value) 
        : [...prev, value]
    );
    setErrors((prevErrors) => ({ ...prevErrors, documents: "" }));
  };

  const handleDataSubmit= async(e)=>{

    console.log("Inside the handleSubmit");

    e.preventDefault();

    function handleDataLayerStart(flag,mobile_number, emptype,PaymentType, monthlyincome) {
      console.log("INside handledatalayer , ",flag, mobile_number, emptype);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({'mobileNumber' : mobile_number, 'flag':flag, 'employmentType': emptype, 'PaymentType': PaymentType, 'monthlyincome': monthlyincome  });
    }

    try{

      const queryParams = new URLSearchParams(location.search);

      // Retrieve values for the specified parameters
      const channel = queryParams.get("channel") || "";
      const dsa = queryParams.get("dsa") || "";
      const source = queryParams.get("source") || "";
      const subSource = queryParams.get("sub_source") || "";
      const subDsa = queryParams.get("sub_dsa") || "";

      const urllink = location.search?.split("?")[1] || "null";

      const formData = new FormData();
      formData.append("mobileNumber", mobile);
      formData.append("businessTurnover", turnover);
      formData.append("availableDocuments", documents);
      formData.append("businessAge", businessAge);
      formData.append("businessType", businessType);
      formData.append("pincode", pinCode);
      formData.append("dsa", dsa);
      formData.append("channel", channel);
      formData.append("source", source);
      formData.append("sub_source", subSource);
      formData.append("campaign", urllink);
      formData.append("sub_dsa", subDsa);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}newbljourneyd`, formData);

      console.log("Response is :: ",response);

      

      if(response.data.code===0)
      {

        console.log("user_exist is :: ",response.data.obj.user_exist);
        console.log("Data added successfully");
        handleDataLayerStart(response.data.obj.user_exist,mobile,'Business', 'Bank Transfer', turnover); 
        getLendersList(e);
        handleDataLayerStage(1);
      }else{
        console.log("Something went wrong : ", response);
      }

    }catch(error)
    {
      console.log(error);
    }
  }

  const getLendersList = async (e) => {
    setIsLoading(true);

    e.preventDefault();
    try {
  
        const formData1 = new FormData();
        formData1.append('mobilenumber', mobile);
  
        const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}lenderslist_newbljourney`, formData1, {
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
            console.log("The json Data is :: ",json);
            setActiveContainer("NewBlListPage");
            // setLenderDetails(json);------------------------------
  
            // // setShowAddInfo(false);
            // setShowLendersList(true);
            // setActiveContainer("LendersList");-------------------------
        }
  
        if (response.status === 200) {
  
        } else {
            console.error('Submission failed:', response.statusText);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
    }
  };

  const getLoanBackendMethod=(e, lenderProduct)=>{

    setCpi(0);
    setLenderProduct(lenderProduct);
    handleDataLayerStage(2); // Track step 2 when the form is submitted
    apiExecutionBackend(lenderProduct, 0,0);

  }

  const apiExecutionBackend = async (productname, lenderCpi, productId) => {

    console.log(productname);

    console.log("Cpi is : ",lenderCpi);
    console.log("product id :: ",productId);
  
    // If lenderCpi is 1, redirect to lender.applicationlink

    console.log(cpi);

    if (lenderCpi === 1) {
      setRedirectionLinkLoader(true);

      // console.log("Mobile : ",mobile);
      // console.log("productId : ",productId);
      // const lenderApplicationLink1 = localStorage.getItem('applicationLink');
      // console.log("Before response application link is :: ",lenderApplicationLink1);

      const formData1 = new FormData();
      formData1.append("userId",1);
      formData1.append("phone", mobile );
      formData1.append("productId", productId);
      formData1.append("channel", "creditHaat");

      console.log("Before h5");

      
      try{
        const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}h5/cpiClickNew_bl`, formData1);
        // console.log("The response is : ",response);

        console.log("After h5");

      }catch(error)
      {
        console.log("The error is : ",error);
      }
      

      
      console.log("After response of cpiClickNew_bl")

      const timer = setTimeout(() => {
        setRedirectionLinkLoader(false);
        console.log("Before redirect");
        const lenderApplicationLink = localStorage.getItem('applicationLink');
        console.log("Before getting application link");
        window.location.href = lenderApplicationLink;
        console.log("After Redirect");
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
      formData1.append('mobilenumber', mobile);
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

  const redirectLinkMethod=(lenderProduct,applicationLink,productId)=>{   
    // console.log("mobile is ",mobile);                     
    // console.log("Lender Product Is :::::: ",lenderProduct);
    // console.log("Application LInk is :::::::: ",applicationLink);
    // console.log("prouct id is :: ",productId);
    console.log("Inside the redirect");
    setCpi(1);//HERE WE SET THE CPI to see if we have to redirect the user or to hit the api if cpi is 1 then we will set the redirection link else we will hit the api
    // console.log("Inside the redirect link method");
    localStorage.setItem('applicationLink', applicationLink);
    console.log("After the setting the link");
    console.log("Getting the link from the localStorage : ",localStorage.getItem('applicationLink'));
    handleDataLayerStage(2);

    // console.log("Before apiExecution");

    apiExecutionBackend(lenderProduct, 1, productId);

    // console.log("After apiExecution");
    // if(formData.occupation === "Salaried"){
    //   handleDataLayerStage(3); // Track step 2 when the form is submitted
    //   setActiveContainer("forSalaried");
    // }else{
    //   setActiveContainer("forSelfEmployed");
    //   handleDataLayerStage(3);
    // }
    

  }

  return (
    <>
    {
      errorPopup && <ErrorPopup lenderName={lenderProduct} mobileNumber={mobile} setErrorPopup={setErrorPopup} />
    }
    {
      apiExecutionLoader && <ApplicationLoader/>
    }
    {
      redirectionLinkLoader && <RedirectionLoader/>
    }
    {
        ActiveContainer === "NewBlListPage" && 
        // <LendersList companies={lenderDetails} formData={formData} redirectLinkMethod={redirectLinkMethod} getLoanBackendMethod={getLoanBackendMethod}/> 
        <NewBlListPage companies={lenderDetails} redirectLinkMethod={redirectLinkMethod} getLoanBackendMethod={getLoanBackendMethod} mobileNumber={mobile}/>
      }
    {
        isLoading && <Loader/>
      }
    {/* {
        ActiveContainer === 'NewBlListPage' && 
        <NewBlListPage/>
    } */}
    {
        ActiveContainer === 'NewBlFirstPage' &&

    <div className={`${roboto.className} page-container`}>
      <div className="carousel-background">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
      <div className="newfirstcard-container" style={{ boxSizing: 'content-box' }}>
        <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label style={{ fontWeight: 'bold' }}>Mobile number</label>
            <input
              type="number"
              placeholder="Eg. 123 456 7890"
              value={mobile}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[6-9]\d{0,9}$/.test(value) || value === "") {
                  setMobile(value);
                }
                setErrors((prevErrors) => ({ ...prevErrors, mobile: "" }));
              }}
              className={styles.input}
            />
            {errors.mobile && <p style={{ color: 'red' }}>{errors.mobile}</p>}
          </div>

          <div className={styles.formGroup}>
            <label style={{ fontWeight: 'bold' }}>Business turnover</label>
            <select value={turnover} onChange={(e) => {
              setTurnover(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, turnover: "" }));
            }} className={styles.select}>
              <option value="">None Selected</option>
              <option value="700000">Below 10L</option>
              <option value="5000000">10L - 50L</option>
              <option value="10000000">50L - 1Cr</option>
            </select>
            {errors.turnover && <p style={{ color: 'red' }}>{errors.turnover}</p>}
          </div>

          <div className={styles.formGroup}>
            <label style={{ fontWeight: 'bold' }}>Available business documents</label>
            <div className={styles.checkboxGroup}>
              {/* {["GST", "MSME", "Udyam", "Shop Act"].map((doc) => (
                <label key={doc}>
                  <input
                    type="checkbox"
                    value={doc}
                    onChange={handleDocumentChange}
                  /> {doc}
                </label>
              ))} */}
              {documentOptions.map((doc) => (
          <label key={doc.id} className="inline-flex items-center">
            <input
              type="checkbox"
              value={doc.id}
              checked={documents.includes(doc.id)}
              onChange={handleDocumentChange}
              className="mr-2"
            />
            <span>{doc.name}</span>
          </label>
        ))}
            </div>
            {errors.documents && <p style={{ color: 'red' }}>{errors.documents}</p>}
          </div>

          <div className={styles.formGroup}>
            <label style={{ fontWeight: 'bold' }}>How old is your business?</label>
            <div className={styles.radioGroup}>
              {/* {["0-2 Years", "2+ Years"].map((age) => (
                <label key={age}>
                  <input
                    type="radio"
                    value={age}
                    checked={businessAge === age}
                    onChange={(e) => {
                      setBusinessAge(e.target.value);
                      setErrors((prevErrors) => ({ ...prevErrors, businessAge: "" }));
                    }}
                  /> {age}
                </label>
              ))} */}
              {
                businessAgeOptions.map((age)=>(
                  <label style={{display:"flex"}} key={age.id}>
                    <input
                    style={{marginRight:"5px"}}
                    type="radio"
                    value={age.id}
                    checked={businessAge === age.id.toString()}
                    onChange={(e) => {
                      setBusinessAge(e.target.value);
                      setErrors((prevErrors) => ({ ...prevErrors, businessAge: "" }));
                    }}
                  />{age.name}
                  </label>
                ))
              }
            </div>
            {errors.businessAge && <p style={{ color: 'red' }}>{errors.businessAge}</p>}
          </div>

          <div className={styles.formGroup}>
            <label style={{ fontWeight: 'bold' }}>Business type</label>
            <select value={businessType} onChange={(e) => {
              setBusinessType(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, businessType: "" }));
            }} className={styles.select}>
              <option value="">Select business type</option>
              <option value="Proprietary Firm">Proprietary Firm</option>
              <option value="Partnership">Partnership</option>
              <option value="One Person Company">One Person Company</option>
              <option value="Private Limited Company">Private Limited Company</option>
              <option value="Other">Other</option>
            </select>
            {errors.businessType && <p style={{ color: 'red' }}>{errors.businessType}</p>}
          </div>

          <div className={styles.formGroup}>
            <label style={{ fontWeight: 'bold' }}>Pincode</label>
            <input
              type="number"
              placeholder="Eg. 123456"
              value={pinCode}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,6}$/.test(value)) {
                  setPinCode(value);
                }
                setErrors((prevErrors) => ({ ...prevErrors, pinCode: "" }));
              }}
              className={styles.input}
              maxLength={6}
            />
            {errors.pinCode && <p style={{ color: 'red' }}>{errors.pinCode}</p>}
          </div>

          <div className={styles.formGroup}>
            <label>
              {/* <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  setErrors((prevErrors) => ({ ...prevErrors, consent: "" }));
                }}
              /> */}
              {showFullConsent ? (
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
              )}
            </label>
            {errors.consent && <p style={{ color: 'red' }}>{errors.consent}</p>}
          </div>

          <div className={styles.formGroup}>
            <label>
              {/* <input
                type="checkbox"
                checked={terms}
                onChange={(e) => {
                  setTerms(e.target.checked);
                  setErrors((prevErrors) => ({ ...prevErrors, terms: "" }));
                }}
              /> */}
               {showConsent ? (
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
              )}
            </label>
            {errors.terms && <p style={{ color: 'red' }}>{errors.terms}</p>}
          </div>
          <div style={{marginBottom:"50px"}}>
          Calculation:<br/> CreditHaat does not charge any fees from the user.<br/> A sample loan calculation for ₹1,00,000 borrowed for 1 year, with interest rate @13% per annum*, is as provided below: <br/>
          Processing fee (@ 2%) = ₹2,000 + GST = ₹2,360
          </div>
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

export default NewBlFirstPage;
