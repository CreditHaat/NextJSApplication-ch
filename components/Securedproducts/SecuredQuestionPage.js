"use client";
import React, { useState, useRef, useEffect } from "react";
import './SecuredQuestionPage.css';
import Image from "next/image";
import Link from "next/link";
import { FaRupeeSign, FaMoneyBillWave, FaMapPin, FaGem, FaHouseUser, FaRegBuilding, FaDollarSign, FaUserClock } from 'react-icons/fa';
import EmblaCarousel from '../NewBlJourneyD/Emblacarousel/js/EmblaCarousel';
import listimage1 from './securedpageimages/securedbanner1.png';
import listimage2 from './securedpageimages/Securedbanner22.png';
import listimage3 from './securedpageimages/Securedbanner33.png';
import styles from '../NewBlJourneyD/NewBlFirstFormPage.module.css';
import { Roboto } from '@next/font/google';
import axios from "axios";
import { FaArrowLeft } from 'react-icons/fa';
import NewRupeekListPage from "./SecuredProductListPage";
import IndiaGoldRejectPage from "../GoldJourney/GoldProductRejectPage";
import IndiaGoldSuccessPage from '../GoldJourney/GoldProductSuccessPage';
// Import jewelry icons
import banglesIcon from '../IndiaGold/NewJwellaryImages/bracelet.png';
import mangalsutraIcon from "../IndiaGold/NewJwellaryImages/mangalsutra.png";
import earringIcon from '../IndiaGold/NewJwellaryImages/earrings.png';
import necklaceIcon from '../IndiaGold/NewJwellaryImages/necklace.png';
import coinIcon from "../IndiaGold/NewJwellaryImages/game-coin.png";
import goldbarIcon from '../IndiaGold/NewJwellaryImages/goldbar2.png';
import Select from 'react-select';
import ApplicationPopup from "../BLApplyPrime/SmartCoinApplicationPopup";
import OTPBottomSheet from '../NewPlOtpBottomSheet/PlOTPBottomSheet';
import OtpVerifyLoader from "../NewPlApplyD/OtpVerifyLoader";
import RedirectionLoader from "../NewPlApplyD/RedirectionLoader";
import RedirectionLoaderBeforeOtp from "./Loaderbeforeotp";
import LoaderBeforeApiResponse from "./LoaderBeforeApiResponse";
import Loader from "../NewPlApplyD/LendersLoader";
import PortfolioPopup from "./PortfolioPopup"; // Adjust path if needed

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

const JWELLARY_TYPES = [
  { value: 'NA', label: 'Select jwellary type', icon: null },
  { value: 'bangles', label: 'Bangles', icon: banglesIcon },
  { value: 'mangalsutra', label: 'MangalSutra', icon: mangalsutraIcon },
  { value: 'earring', label: 'Earring', icon: earringIcon },
  { value: 'necklace', label: 'Necklace', icon: necklaceIcon },
  { value: 'coin', label: 'Coin', icon: coinIcon },
  { value: 'bars', label: 'Bars', icon: goldbarIcon },
  { value: 'other', label: 'Other', icon: null },
];

const SecuredQuestionPage = ({ formData, formState, searchParams, setActiveContainer, mobilenumber, firstName, lastName, pan }) => {

  const [fullUrl, setFullUrl] = useState('');

  useEffect(() => {
    const url = window.location.origin + window.location.pathname + window.location.search;
    // console.log("url is:", url);
    setFullUrl(url);
  }, []);

  const [responseproductname, setResponseProductName] = useState('');

  const queryParams = Object.fromEntries(new URLSearchParams(searchParams));
  const page = queryParams.page;
  const [listPage, setListPage] = useState(false);
  const [mobileNumber, setMobileNumber] = useState();

  useEffect(() => {
    if (page == 2) {
      // console.log("Inside when the page is 2");
      setMobileNumber(localStorage.getItem('mobileNumberForRejection'));
      // console.log("The mobile in the local Storage is :: ",localStorage.getItem('mobileNumberForRejection'))
    } else {
      // console.log("In else");
    }
  }, [])

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setIsOtpVerified(queryParams.get("otpVerified") === "true");

    // Check if user came from rejection page
    setCameFromRejection(queryParams.get("source") === "secured_loan");
  }, []);

  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [cameFromRejection, setCameFromRejection] = useState(false)
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
  const otpInputRefs = useRef([]);
  const [otpStatus, setOtpStatus] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [isOtpBottomSheetVisible, setIsOtpBottomSheetVisible] = useState(false);
  const [upotp, setUpOtp] = useState("");
  const [otpLoader, setOtpLoader] = useState(false);
  const [stgOneHitId, setStgOneHitId] = useState(null);
  const [stgTwoHitId, setstgTwoHitId] = useState(null);
  const [t_experian_log_id, sett_experian_log_id] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // State variables for gold
  const [loanType, setLoanType] = useState('');
  const [desiredLoanAmount, setDesiredLoanAmount] = useState('');
  const [jwellaryLocation, setJwellaryLocation] = useState('');
  const [jwellaryType, setJwellaryType] = useState('');
  // const [goldForm, setGoldForm] = useState('');
  const [marketValue, setMarketValue] = useState('');
  const [loanpurpose, setLoanPurpose] = useState('');

  // for Property 
  //  const [propertytype, setPropertyType] = useState("");
  //   const [propertyvalue, setPropertyValue] = useState("");
  //   const [propertypinCode, setPropertyPinCode] = useState("");
  //   const [loanamount, setLoanAmount] = useState("");
  //   const [ownedtime, setOwnedTime] = useState("");
  //   const[propertyloanpurpose, setPropertyLoanPurpose] = useState("");

  // for mutual fund 
  const [mutualfundmarketValue, setMutualFundMarketValue] = useState("");
  const [mutualfundloanamount, setMutualFundLoanAmount] = useState("");
  const [mutualfundloanpurpose, setMutualFundLoanPurpose] = useState("");

  // for Insurance

  const [insurancetype, setInsuranceType] = useState("");
  const [insuranceloanamount, setInsuranceLoanAmount] = useState("");
  const [insuranceloanpurpose, setInsuranceLoanPurpose] = useState('');

  //  for Stocks/Shares

  const [sharesloanamount, setSharesLoanAmount] = useState("");
  const [sharesloanpurpose, setSharesLoanPurpose] = useState("");
  const [sharesmarketValue, setSharesMarketValue] = useState("");

  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef(null);
  const [showFullConsent, setShowFullConsent] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  var json = null;
  const [lenderDetails, setLenderDetails] = useState(null);
  const [isCameFromBackend, setIsCameFromBackend] = useState(false);
  const [rejectPage, setRejectPage] = useState(false);
  const [successPage, setSuccessPage] = useState(false);
  const [link, setLink] = useState("");
  const [lenderProduct, setLenderProduct] = useState(null);
  const [cpi, setCpi] = useState(0);
  const [redirectionLinkLoaderotp, setRedirectionLinkLoaderotp] = useState(false);
   const[redirectionLinkLoader, setRedirectionLinkLoader] = useState(false);
   const[loaderBeforeApiResponse, setLoaderBeforeApiResponse] = useState(false);
  const [apiExecutionLoader, setApiExecutionLoader] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [availablePortfolioValue, setAvailablePortfolioValue] = useState(null);
const [showPortfolioPopup, setShowPortfolioPopup] = useState(false);


  const CustomOption = (props) => {
    const { data, innerRef, innerProps, selectOption, isSelected, fieldType } = props;

    // Check if the current field is Jewelry Type and has an image
    const hasImage = fieldType === 'jewelry' && data.icon !== null;

    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          padding: '2px',
          position: 'relative', // Ensures that the radio button is placed on the right side
          paddingLeft: '10px',
          paddingRight: '10px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center', // Align the label and image vertically
          }}
        >
          {/* If the fieldType is 'jewelry' and the option has an image, display the image */}
          {hasImage && (
            <Image
              src={data.icon}
              alt={data.label}
              style={{
                marginRight: '20px',  // Reduced margin between image and label
                width: '20px',       // Image width
                height: '20px',      // Image height
              }}
            />
          )}
          <span>{data.label}</span> {/* Label on the left */}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '5px' }}>
          {/* Keep the radio button aligned to the right */}
          <input
            type="radio"
            name="option"
            value={data.value}
            checked={isSelected}
            onChange={() => selectOption(data)} // Select option when radio button is clicked
          />
        </div>

        {/* Optional horizontal line */}
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



  const loanpurposeOptions = [
    { value: "NA", label: 'Select loan purpose' },
    { value: 'domestic', label: 'Domestic purpose' },
    { value: 'acquisition', label: 'Acquisition of property' },
    { value: 'equipment', label: 'Purchase of equipment' },
    { value: 'workingcap', label: 'Working capital' },
    { value: 'businesspremisesrenovation', label: 'Renovation of current business premises' },
    { value: 'education', label: 'Education' },
    { value: 'homerenovation', label: 'Home renovation' },
    { value: 'holiday', label: 'Holiday or recreation' },
    { value: 'personalbusiness', label: 'Perosnal business' },
  ];

  // const propertyvalueoptions =[
  //  { value: 'NA', label: 'Select property value'},
  //  { value: '5000000-10000000', label: '50L - 1Cr' },
  //  { value: '10000000-30000000', label: '1Cr - 3Cr'},
  //  {value: '>30000000', label: 'Greater than 3Cr'}
  // ];

  // const propertytypeoptions = [
  //   {value: 'NA', label: 'Select property type'},
  //   {value: 'Residential', label: 'Residential'},
  //   {value: 'Commercial', label: 'Commercial'},
  //   {value: 'Land', label: 'Land'}
  // ];

  const insurancetypeoptions = [
    { value: 'NA', label: 'Select insurance type' },
    { value: 'Life Insurance', label: 'Life Insurance' },
    { value: 'Health Insurance', label: 'Health Insurance' },
    { value: 'Vehicle Insurance', label: 'Vehicle Insurance' },
    { value: 'Home Insurance', label: 'Home Insurance' }
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

  const [isLoanPurposeMenuOpen, setIsLoanPurposeMenuOpen] = useState(false);
  const [isJwellaryTypeMenuOpen, setIsJwellaryTypeMenuOpen] = useState(false);
  // const [isPropertyValueMenuOpen, setIsPropertyValueMenuOpen] = useState(false);
  // const [isPropertyTypeMenuOpen, setIsPropertyTypeMenuOpen] = useState(false);
  const [isInsuranceTypeMenuOpen, setIsInsuranceTypeMenuOpen] = useState(false);
  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (formData.loanGuarantee === "Gold") {
      if (!loanType) {
        newErrors.loanType = "Please select a loan type";
      }

      if (!desiredLoanAmount) {
        newErrors.desiredLoanAmount = "Please enter desired loan amount";
      } else if (parseInt(desiredLoanAmount) < 10000) {
        newErrors.desiredLoanAmount = "Loan amount must be greater than ₹10,000";
      }

      if (!jwellaryLocation) {
        newErrors.jwellaryLocation = "Please select jewellery location";
      }

      if (!jwellaryType || jwellaryType === 'NA') {
        newErrors.jwellaryType = "Please select a jewellery type";
      }

      if (!loanpurpose || loanpurpose === 'NA') {
        newErrors.loanpurpose = "Please select a valid loan purpose";
      }

      if (!marketValue || parseInt(marketValue) <= 0) {
        newErrors.marketValue = "Please enter a valid market value of the gold";
      }
    }
    // Property question
    //   if (formData.loanGuarantee === "Property"){
    //   if (!propertyvalue || propertyvalue === 'NA') {
    //     newErrors.propertyvalue = "Please select your property value.";
    //   }
    //   if (!propertytype || propertytype === 'NA') {
    //     newErrors.propertytype = "Please select a property type.";
    //   }
    //   if (!/^\d{6}$/.test(propertypinCode)) {
    //     newErrors.propertypinCode = "Please enter a valid 6-digit pin code.";
    //   }
    //   if (!loanamount) {
    //     newErrors.loanamount = "Please enter a loan amount.";
    //   }
    //   if(!ownedtime){
    //     newErrors.ownedtime = "Please enter owned time";
    //   }
    //   if (!propertyloanpurpose || propertyloanpurpose === 'NA') {
    //     newErrors.propertyloanpurpose = "Please select a valid loan purpose";
    //   }
    // }
    // for Mutual fund question
    if (formData.loanGuarantee === "Mutual Funds") {
      if (!mutualfundloanamount) {
        newErrors.mutualfundloanamount = "Please enter loan amount";
      }

      if (!mutualfundmarketValue) {
        newErrors.mutualfundmarketValue = "Please enter market value";
      }
      if (!mutualfundloanpurpose || mutualfundloanpurpose === 'NA') {
        newErrors.mutualfundloanpurpose = "Please select a loan purpose";
      }
    }
    // for insurance
    if (formData.loanGuarantee === "Insurance") {
      if (!insurancetype || insurancetype === 'NA') {
        newErrors.insurancetype = "Please select a insurance type.";
      }

      if (!insuranceloanamount) {
        newErrors.insuranceloanamount = "Please enter loan amount";
      }
      if (!insuranceloanpurpose || insuranceloanpurpose === 'NA') {
        newErrors.insuranceloanpurpose = "Please select a loan purpose";
      }
    }

    if (formData.loanGuarantee === "Shares/Stocks") {
      if (!sharesloanpurpose || sharesloanpurpose === 'NA') {
        newErrors.sharesloanpurpose = "Please select a loan purpose";
      }
      if (!sharesloanamount) {
        newErrors.sharesloanamount = "Please enter loan amount";
      }
      if (!sharesmarketValue) {
        newErrors.sharesmarketValue = "Please enter market value";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  // Backend connection third page
  const handleSecondPageSubmit = async (e) => {
    console.log("came from rejection page",cameFromRejection);
    e.preventDefault();
    try {

      const formData1 = new FormData();
      if (page == 2) {
        formData1.append('mobileNumber', mobilenumber);
        formData1.append('firstName', firstName);
        formData1.append('lastName', lastName);
        formData1.append('pan', pan);
        formData1.append('cameFromRejection',cameFromRejection);
        let shouldTakeOtp = cameFromRejection && loanGuarantee === "Mutual Funds";
    
        if (!cameFromRejection) {
          shouldTakeOtp = true; // Always take OTP if not coming from rejection
        }
    
        if (shouldTakeOtp) {
          formData1.append("otp", upotp);
        }
      } else {
        formData1.append('mobileNumber', mobilenumber);
        formData1.append('firstName', firstName);
        formData1.append('lastName', lastName);
        formData1.append('pan', pan);
        formData1.append('cameFromRejection',cameFromRejection);
        console.log("cameFromRejection:", cameFromRejection);
        console.log("loanGuarantee:", formData.loanGuarantee);

        let shouldTakeOtp = false;

if (!cameFromRejection) { 
  // If NOT coming from rejection, always take OTP
  shouldTakeOtp = true;
} else if (cameFromRejection && formData.loanGuarantee === "Mutual Funds") { 
  // If coming from rejection, take OTP ONLY if loan guarantee is "Mutual Funds"
  shouldTakeOtp = true;
}

console.log("cameFromRejection:", cameFromRejection);
console.log("loanGuarantee:", formData.loanGuarantee);
console.log("Final shouldTakeOtp value:", shouldTakeOtp);

if (shouldTakeOtp) {
  formData1.append("otp", upotp);
}

      }
      formData1.append("loanGuarantee", formData.loanGuarantee);
      if (formData.loanGuarantee === "Gold") {
        formData1.append('loanType', loanType);
        formData1.append('desiredLoanAmount', desiredLoanAmount);
        formData1.append('jwellaryLocation', jwellaryLocation);
        formData1.append('jwellaryType', jwellaryType);
        formData1.append('loanpurpose', loanpurpose);
        formData1.append('marketValue', marketValue);
      } else {
        formData1.append('loanType', "");
        formData1.append('desiredLoanAmount', "");
        formData1.append('jwellaryLocation', "");
        formData1.append('jwellaryType', "");
        formData1.append('loanpurpose', "");
        formData1.append('marketValue', "");
      }


      // if (formData.loanGuarantee === "Property") {
      // formData1.append("propertytype",propertytype);
      // formData1.append("propertyvalue", propertyvalue);
      // formData1.append("propertypinCode", propertypinCode);
      // formData1.append("loanamount", loanamount);
      // formData1.append('ownedtime',ownedtime);
      // formData1.append('propertyloanpurpose', propertyloanpurpose);
      // }else{
      //   formData1.append("propertytype","");
      //   formData1.append("propertyvalue", "");
      //   formData1.append("propertypinCode", "");
      //   formData1.append("loanamount", "");
      //   formData1.append('ownedtime',"");
      //   formData1.append('propertyloanpurpose', "");
      // }

      // for mutual fund data
      if (formData.loanGuarantee === "Mutual Funds") {
        formData1.append("mutualfundloanamount", mutualfundloanamount);
        formData1.append("mutualfundmarketValue", mutualfundmarketValue);
        formData1.append('mutualfundloanpurpose', mutualfundloanpurpose);
      } else {
        formData1.append("mutualfundloanamount", "");
        formData1.append("mutualfundmarketValue", "");
        formData1.append('mutualfundloanpurpose', "");
      }

      // for insurance
      if (formData.loanGuarantee === "Insurance") {
        formData1.append("insurancetype", insurancetype);
        formData1.append("insuranceloanamount", insuranceloanamount);
        formData1.append('insuranceloanpurpose', insuranceloanpurpose);
      } else {
        formData1.append("insurancetype", "");
        formData1.append("insuranceloanamount", "");
        formData1.append('insuranceloanpurpose', "");
      }

      // for Shares/Stocks
      if (formData.loanGuarantee === "Shares/Stocks") {
        formData1.append("sharesloanamount", sharesloanamount);
        formData1.append('sharesloanpurpose', sharesloanpurpose);
        formData1.append("sharesmarketValue", sharesmarketValue);
      } else {
        formData1.append("sharesloanamount", "");
        formData1.append('sharesloanpurpose', "");
        formData1.append("sharesmarketValue", "");
      }

      setLoaderBeforeApiResponse(true);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}SecuredProductQuestionpage`, formData1);

      // console.log("The response of indiagold_Sec_Page is : ", response);

      if (response.data.code === 0) {
        // setListPage(true);
        setTimeout(() => {
          setLoaderBeforeApiResponse(false);
        }, 2000); 

        // setRedirectionLinkLoaderotp(true);
        setTimeout(() => {
          setRedirectionLinkLoaderotp(false); // Hide loader after API response
          setIsOtpBottomSheetVisible(true); // Show OTP Bottom Sheet
        }, 2000); 

        setStgOneHitId(response.data.obj.stgOneHitId);
        setstgTwoHitId(response.data.obj.stgTwoHitId);
        sett_experian_log_id(response.data.obj.t_experian_log_id);
        handleDataLayerStart(response.data.obj.user_exist, formData.mobileNumber, formData.profession);

        // setIsOtpBottomSheetVisible(true);
        // getLendersList(e);
        // setRejectPage(true);
      } else if (response.data.code === 1) {
        setIsOtpBottomSheetVisible(false);

        const formData2 = new FormData();
        formData2.append("mobileNumber", mobilenumber);
        formData2.append('otp', upotp);
        formData2.append('pan', pan);
        formData2.append('dob', formData.dob);
        try {
          const response2 = await axios.post(
            `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}verifyOTPAbhiloanSecond`,
            formData2
          );
          console.log("response is:", response2);

          if (response2.data.code === -1) {
              setLoaderBeforeApiResponse(false);
            setIsOtpBottomSheetVisible(false);
            setSuccessPage(false);
            setRejectPage(true);

          } else if (response2.data.code === 0) {
              setLoaderBeforeApiResponse(false); 
              const extractedPortfolioValue = response2.data.msg.match(/\d+/)?.[0]; // Extract number from message
              // setPortfolioValue(extractedPortfolioValue);
              setAvailablePortfolioValue(extractedPortfolioValue);
              setShowPortfolioPopup(true);
            // getLendersList(e);
          }
        } catch (Error) {
          console.log(Error);
        }

      } else if(response.data.code === 2){
        setLoaderBeforeApiResponse(false); 
        getLendersList(e);
      }
      else if (response.data.code === -1) {
      }
    } catch (error) {
    }
  };


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // if(formData.loanGuarantee === 'Mutual Funds'){
      // setIsOtpBottomSheetVisible(true);
      // }
      handleSecondPageSubmit(e);
    }
  };

  const handleBackButton = () => {
    setActiveContainer('SecuredProductpagesecond'); // Switch the active container to 'NewPlPage'
  };

  const handleLoanTypeChange = (value) => {
    setLoanType(value);
    setErrors(prev => ({ ...prev, loanType: "" }));
  };

  const handleDesiredLoanAmountChange = (value) => {
    setDesiredLoanAmount(value);
    setErrors(prev => ({ ...prev, desiredLoanAmount: "" }));
  };

  const handleJwellaryLocationChange = (value) => {
    setJwellaryLocation(value);
    setErrors(prev => ({ ...prev, jwellaryLocation: "" }));
  };

  const handleSelectJwellaryType = (selectedOption) => {
    // Update the state with just the selected value
    setJwellaryType(selectedOption.value); // Only store the value

    // Clear error if a valid selection is made (i.e., not 'NA' or empty string)
    if (selectedOption.value !== 'NA' && selectedOption.value !== '') {
      setErrors(prev => ({ ...prev, jwellaryType: '' })); // Clear error for valid selection
    } else {
      setErrors(prev => ({ ...prev, jwellaryType: 'Please select a jewellery type' })); // Set error for 'NA' selection
    }

    // Optionally, close the menu when the user selects an option
    setIsJwellaryTypeMenuOpen(false);
  };



  const handleLoanPurposeChange = (selectedOption) => {
    // Update the loan purpose with just the selected value, not the entire object
    setLoanPurpose(selectedOption.value); // Only store the value

    // Clear error if a valid selection is made (i.e., anything other than 'NA' or '')
    if (selectedOption.value !== 'NA' && selectedOption.value !== '') {
      setErrors(prev => ({ ...prev, loanpurpose: '' })); // Clear error for valid selection
    }

    // Optionally, close the menu when the user selects an option
    setIsLoanPurposeMenuOpen(false);
  };


  const handleMarketValueChange = (value) => {
    setMarketValue(value);
    setErrors(prev => ({ ...prev, marketValue: "" }));
  };

  // for property onchange functions are following

  // const handlePropertyTypeChange = (selectedOption) => {
  //   setPropertyType(selectedOption.value); // Only store the value

  //   if (selectedOption.value !== 'NA' && selectedOption.value !== '') {
  //     setErrors(prev => ({ ...prev, propertytype: '' })); 
  //   }
  //   setIsPropertyTypeMenuOpen(false);
  // };

  // const handlePropertyValueChange = (selectedOption) => {
  //   setPropertyValue(selectedOption.value); 

  //   if (selectedOption.value !== 'NA' && selectedOption.value !== '') {
  //     setErrors(prev => ({ ...prev, propertyvalue: '' })); 
  //   }
  //   setIsPropertyValueMenuOpen(false);
  // };

  // const handlePropertyPincodeChange = (value) => {
  //   setPropertyPinCode(value);
  //   setErrors(prev => ({ ...prev, propertypinCode: "" }));
  // };

  // const handlePropertyLoanAmountChange = (value) => {
  //   setLoanAmount(value);
  //   setErrors(prev => ({ ...prev, loanamount: "" }));
  // };

  // const handleOwnedTimeChnage = (value) => {
  //   setOwnedTime(value);
  //   setErrors(prev => ({ ...prev, ownedtime: "" }));
  // };

  // const handlePropertyLoanPurposeChange = (selectedOption) => {
  //   setPropertyLoanPurpose(selectedOption.value); 

  //   if (selectedOption.value !== 'NA' && selectedOption.value !== '') {
  //     setErrors(prev => ({ ...prev, propertyloanpurpose: '' })); 
  //   }
  //   setIsLoanPurposeMenuOpen(false);
  // };

  // for mutual fund onchange functions are following

  const handleMutualFundLoanAmountChange = (value) => {
    setMutualFundLoanAmount(value);
    setErrors(prev => ({ ...prev, mutualfundloanamount: "" }));
  };

  const handleMutualFundMarketValueChange = (value) => {
    setMutualFundMarketValue(value);
    setErrors(prev => ({ ...prev, mutualfundmarketValue: "" }));
  };

  const handleMutualFundLoanPurposeChange = (selectedOption) => {
    // Update the loan purpose with just the selected value, not the entire object
    setMutualFundLoanPurpose(selectedOption.value); // Only store the value
    setTimeout(() => setIsLoanPurposeMenuOpen(false), 0);

    // Clear error if a valid selection is made (i.e., anything other than 'NA' or '')
    if (selectedOption.value !== 'NA' && selectedOption.value !== '') {
      setErrors(prev => ({ ...prev, mutualfundloanpurpose: '' })); // Clear error for valid selection
    }

    // Optionally, close the menu when the user selects an option
    setIsLoanPurposeMenuOpen(false);
  };


  // for insurance

  const handleInsuranceTypeChange = (selectedOption) => {
    // Update the loan purpose with just the selected value, not the entire object
    setInsuranceType(selectedOption.value); // Only store the value

    // Clear error if a valid selection is made (i.e., anything other than 'NA' or '')
    if (selectedOption.value !== 'NA' && selectedOption.value !== '') {
      setErrors(prev => ({ ...prev, insurancetype: '' })); // Clear error for valid selection
    }
    setIsLoanPurposeMenuOpen(true); // Open the loan purpose dropdown menu

    // Optionally, close the menu when the user selects an option
    setIsInsuranceTypeMenuOpen(false);
  };


  const handleInsuranceLoanAmountChange = (value) => {
    setInsuranceLoanAmount(value);
    setErrors(prev => ({ ...prev, insuranceloanamount: "" }));
  };

  const handleInsuranceLoanPurposeChange = (selectedOption) => {
    // Update the loan purpose with just the selected value, not the entire object
    setInsuranceLoanPurpose(selectedOption.value); // Only store the value

    // Clear error if a valid selection is made (i.e., anything other than 'NA' or '')
    if (selectedOption.value !== 'NA' && selectedOption.value !== '') {
      setErrors(prev => ({ ...prev, insuranceloanpurpose: '' })); // Clear error for valid selection
    }

    // Optionally, close the menu when the user selects an option
    setIsLoanPurposeMenuOpen(false);
  };

  // for Shares/Stocks

  const handleSharesLoanAmountChange = (value) => {
    setSharesLoanAmount(value);
    setErrors(prev => ({ ...prev, sharesloanamount: "" }));
  };

  const handleSharesLoanPurposeChange = (selectedOption) => {
    // Update the loan purpose with just the selected value, not the entire object
    // console.log("Selected option:", selectedOption); 
    setSharesLoanPurpose(selectedOption.value); // Only store the value

    // Clear error if a valid selection is made (i.e., anything other than 'NA' or '')
    if (selectedOption.value !== 'NA' && selectedOption.value !== '') {
      setErrors(prev => ({ ...prev, sharesloanpurpose: '' })); // Clear error for valid selection
    }

    // Optionally, close the menu when the user selects an option
    setIsLoanPurposeMenuOpen(false);
  };

  const handleSharesMarketValueChange = (value) => {
    setSharesMarketValue(value);
    setErrors(prev => ({ ...prev, sharesmarketValue: "" }));
  };


  useEffect(() => {
    let totalVisibleFields = 0;
    let filledFields = 0;

    // Check the selected loan guarantee option and count visible fields
    if (formData.loanGuarantee === 'Gold') {
      // Count Gold Loan related fields
      totalVisibleFields += 6; // There are 5 fields related to Gold loan
      if (loanType) filledFields++; // Loan Type
      if (desiredLoanAmount) filledFields++; // Desired Loan Amount
      if (jwellaryLocation) filledFields++; // Jewellery Location
      if (jwellaryType) filledFields++; // Jewellery Type
      if (marketValue) filledFields++; // Market Value of Gold
      if (loanpurpose) filledFields++; // Loan purpose of gold
    } else if (formData.loanGuarantee === 'Mutual Funds') {
      // Count Mutual Fund Loan related fields
      totalVisibleFields += 3; // There are 4 fields related to Mutual Fund loan
      if (mutualfundloanamount) filledFields++; // Loan Amount
      if (mutualfundmarketValue) filledFields++; // Mutual Fund Market Value
      if (mutualfundloanpurpose) filledFields++; //Mutual fund loan purpose
    } else if (formData.loanGuarantee === 'Insurance') {
      totalVisibleFields += 3;
      if (insurancetype) filledFields++;
      if (insuranceloanamount) filledFields++;
      if (insuranceloanpurpose) filledFields++;
    } else if (formData.loanGuarantee === 'Shares/Stocks') {
      totalVisibleFields += 3;
      if (sharesloanamount) filledFields++;
      if (sharesloanpurpose) filledFields++;
      if (sharesmarketValue) filledFields++;
    }

    // Calculate the progress percentage
    const completionPercentage = (filledFields / totalVisibleFields) * 100;
    setProgress(completionPercentage);

  }, [formData, loanType, desiredLoanAmount, jwellaryLocation, jwellaryType, marketValue,
    mutualfundloanamount, mutualfundmarketValue, insurancetype, insuranceloanamount, loanpurpose, mutualfundloanpurpose, insuranceloanpurpose,
    sharesloanamount, sharesloanpurpose, sharesmarketValue]);


  const getLendersList = async (e) => {
    setIsLoading(true);

    // e.preventDefault();
    try {
      // Sending data as a JSON object
      const requestData = {
        mobilenumber: mobilenumber,
        loanGuarantee: formData.loanGuarantee
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}lenderslist_newrsecuredproductjourney`, requestData, {
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
        setListPage(true);
      }

      if (response.status === 200) {
        // Do something if status is 200
      } else {
        console.error('Submission failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  const apiExecutionBackend = async (productname, lenderCpi, productId) => {

    // If lenderCpi is 1, redirect to lender.applicationlink
    setResponseProductName(productname);

    if (lenderCpi === 1) {
      setRedirectionLinkLoader(true);

      const formData1 = new FormData();
      formData1.append("userId", 1);
      formData1.append("phone", mobilenumber);
      formData1.append("productId", productId);
      formData1.append("channel", "creditHaat");
      formData1.append("fullUrl", fullUrl);


      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}h5/cpiClickNewSec`, formData1);

      } catch (error) {
      }

      const timer = setTimeout(() => {
        setRedirectionLinkLoader(false);
        const lenderApplicationLink = localStorage.getItem('applicationLink');
        window.location.href = lenderApplicationLink;
      }, 3000);

    } else {
      setApiExecutionLoader(true);

      //--------code of h5/cpiClickNewSec` -----------------------------------------------------

      try {

        const formData1 = new FormData();
        formData1.append("userId", 1);
        formData1.append("phone", mobilenumber);
        formData1.append("productId", productId);
        formData1.append("channel", "creditHaat");
        formData1.append("fullUrl", fullUrl);
        const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}h5/cpiClickNewSec`, formData1);

      } catch (error) {
      }

      //--------code of h5/cpiClickNewSec` end -----------------------------------------------------

      setRedirectionLinkLoader(true);

      try {
        const formData1 = new FormData();
        formData1.append('mobileNumber', mobilenumber);
        formData1.append('product', productname);
        formData1.append('pan', pan);
        formData1.append('dob', formData.dob);

        const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}SecuredProductList`, formData1, {
          // headers: {
          //   'Content-Type': 'application/json',
          //   'token': 'Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=' // Add your token here
          // }
        });

        setRedirectionLinkLoader(false);
        if (response.data.code === 0) {

          setSuccessPage(true);
          setRejectPage(false);
        } else if (response.data.code === 212) {
          setRejectPage(true);
          setSuccessPage(false);
        } else if (response.data.code === -1) {
          setRejectPage(true);
        } else if (response.data.code === 101) {
          var redirectionlink = response.data.msg;
          setLink(redirectionlink);
          window.location.href = redirectionlink;
        } else if (response.data.code === 102) {
          var redirectionlink = response.data.msg;
          setLink(redirectionlink);
          window.location.href = redirectionlink;
        } else if (response.data.code === 103) {
          var redirectionlink = response.data.msg;
          setLink(redirectionlink);
          window.location.href = redirectionlink;
        }

        // console.log("for partner page", response);

      } catch (error) {

      }
    }

  };

  const handleVerifyOTP = (e) => {
    verify_otp_credithaat_from_backend(e);
    // setIsOtpBottomSheetVisible(false);
  };

  const verify_otp_credithaat_from_backend = async (e) => {
    setOtpLoader(true);
    let apiType = "";
    try {
        const formData1 = new FormData();
        formData1.append("mobileNumber", mobilenumber);
        formData1.append("otp", upotp);
        formData1.append("pan", pan);
        formData1.append("dob", formData.dob);

        if (formData.loanGuarantee !== "Mutual Funds") {
            formData1.append("stgOneHitId", stgOneHitId);
            formData1.append("stgTwoHitId", stgTwoHitId);
            formData1.append("t_experian_log_id", t_experian_log_id);
        }

        // Declare response before using it inside conditions
        let response;

        if (["Gold", "Insurance", "Shares/Stocks"].includes(formData.loanGuarantee)) {
            response = await axios.post(
                `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}verifyOTPNewPersonalloan`,
                formData1
            );
            apiType = "verifyOTPNewPersonalloan";
        } else {
            response = await axios.post(
                `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}verifyOtpAbhiLoan`,
                formData1
            );
            apiType = "verifyOtpAbhiLoan";
        }

        console.log("The OTP response is :: ", response);

        if ([0, 1, 2, 3].includes(response.data.code)) {
            setOtpVerified(true);
            setOtpLoader(false);
            setIsOtpBottomSheetVisible(false);
            setOtpInputs(["", "", "", "", "", ""]);
            setUpOtp('');
            if (apiType === "verifyOtpAbhiLoan") {
              // ✅ Show Portfolio Popup only for `verifyOtpAbhiLoan`
              const extractedPortfolioValue = response.data.msg.match(/\d+/)?.[0]; // Extract number
              setAvailablePortfolioValue(extractedPortfolioValue);
              setShowPortfolioPopup(true);
          } else {
              // ✅ Call `getLendersList(e)` for any other API response
              getLendersList(e);
          }
            // getLendersList(e);
        } else if (response.data.code === -1) {
            // setRejectPage(true);
            getLendersList(e);
            setIsOtpBottomSheetVisible(false);
            setSuccessPage(false);
        } else {
            setOtpLoader(false);
            setOtpStatus("Incorrect OTP! Try Again..");
            setOtpInputs(["", "", "", "", "", ""]);
        }

    } catch (error) {
        console.error("Error submitting form:", error);
    }
};


  const redirectLinkMethod = (lenderProduct, applicationLink, productId) => {
    setCpi(1);
    localStorage.setItem('applicationLink', applicationLink);

    apiExecutionBackend(lenderProduct, 1, productId);


  }

  const getLoanBackendMethod = (e, lenderProduct, productId) => {

    setCpi(0);
    setLenderProduct(lenderProduct);
    // handleDataLayerStage(2); // Track step 2 when the form is submitted
    apiExecutionBackend(lenderProduct, 0, productId);

  }

  return (
    <>
    {showPortfolioPopup && (
  <PortfolioPopup 
    availablePortfolioValue={availablePortfolioValue} 
    onClose={() => {
      setShowPortfolioPopup(false);
      getLendersList(); // Call getLendersList after closing the popup
    }} 
  />
)}
    {
        isLoading && <Loader/>
      }
      {isCameFromBackend && <ApplicationPopup link={link} />}
      {
        !rejectPage && listPage
      }
       {
      redirectionLinkLoaderotp && <RedirectionLoaderBeforeOtp/>
    }
    {
      redirectionLinkLoader && <RedirectionLoader/>
    }
    {
      loaderBeforeApiResponse && <LoaderBeforeApiResponse/>
    }
      {!rejectPage && successPage && <IndiaGoldSuccessPage product={responseproductname} />}
      {!successPage && rejectPage && <IndiaGoldRejectPage />}
      {!rejectPage && !successPage && listPage &&

        <NewRupeekListPage companies={lenderDetails} redirectLinkMethod={redirectLinkMethod} getLoanBackendMethod={getLoanBackendMethod} mobileNumber={mobilenumber} />}
      {
        !listPage && !rejectPage &&

        <div className={`${roboto.className} page-container`}>
          <div className="securedcarousel-background">
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
          </div>
          <div className="securedfirstcard-container" style={{ boxSizing: 'content-box' }}>
            <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
              {/* Loan Type Radio Buttons */}

              <div className="progress-bar-container">
                <div className="progress-bar">
                  <div className="step-number">1</div>
                  <div className="progress-bar-fill"></div>
                </div>
                <div className="progress-bar">
                  <div className="step-number">2</div>
                  <div className="progress-bar-fill"></div>
                </div>
                <div className="progress-bar">
                  <div className="step-number">3</div>
                  <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                </div>
              </div>

              {formData.loanGuarantee === 'Gold' && (
                <>

                  {/* Desired Loan Amount */}
                  <div className={styles.formGroup} style={{ position: 'relative' }}>
                    <label className={styles.label}>Desired loan amount (₹)</label>
                    <input
                      type="number"
                      value={desiredLoanAmount}
                      //   onChange={(e) => setDesiredLoanAmount(e.target.value)}
                      onChange={(e) => handleDesiredLoanAmountChange(e.target.value)}
                      inputMode="numeric"
                      placeholder="Enter amount (min ₹10,000)"
                      className={styles.input}
                      min="10000"
                    />
                    <span
                      className={styles.icon}
                      style={{
                        position: 'absolute',
                        right: '15px',
                        top: '50%',
                        // transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        color: '#00000061',
                      }}
                    >
                      <FaRupeeSign />
                    </span>
                    {errors.desiredLoanAmount && <p className="error">{errors.desiredLoanAmount}</p>}
                  </div>

                  <div className={styles.formGroup} style={{ position: 'relative' }}>
                    <label className={styles.label}>What is the current market value of the gold (₹)?</label>
                    <input
                      type="number"
                      value={marketValue}
                      inputMode="numeric"
                      onChange={(e) => handleMarketValueChange(e.target.value)}
                      placeholder="Enter current market value"
                      className={styles.input}
                      min="0"
                    />
                    <span
                      className={styles.icon}
                      style={{
                        position: 'absolute',
                        right: '15px',
                        top: '65%',
                        // transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        color: '#00000061',
                      }}
                    >
                      <FaRupeeSign />
                    </span>
                    {errors.marketValue && <p className="error">{errors.marketValue}</p>}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Purpose of loan</label>
                    <Select
                      value={loanpurposeOptions.find(option => option.value === formData.loanpurpose)}
                      options={loanpurposeOptions}
                      styles={customStyles}
                      onChange={handleLoanPurposeChange}
                      menuIsOpen={isLoanPurposeMenuOpen}
                      onFocus={() => setIsLoanPurposeMenuOpen(true)}
                      onBlur={() => setIsLoanPurposeMenuOpen(false)}
                      isSearchable={false}
                      components={{ Option: CustomOption }} // Use the custom option component
                      placeholder="Select a purpose of loan"  // Custom placeholder text
                    />
                    {errors.loanpurpose && <p className="error">{errors.loanpurpose}</p>}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Select loan type</label>
                    <div className={styles.radioGroup}>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          value="new"
                          checked={loanType === 'new'}
                          //onChange={(e) => setLoanType(e.target.value)}
                          onChange={(e) => handleLoanTypeChange(e.target.value)}
                          className={styles.radioInput}
                        />
                        Get a new gold <br></br>loan
                      </label>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          value="shift"
                          checked={loanType === 'shift'}
                          // onChange={(e) => setLoanType(e.target.value)}
                          onChange={(e) => handleLoanTypeChange(e.target.value)}
                          className={styles.radioInput}
                        />
                        Shift your gold<br style={{ marginLeft: "2%" }}></br> loan
                      </label>
                    </div>
                    {errors.loanType && <p className="error">{errors.loanType}</p>}
                  </div>



                  {/* jwellary Location Radio Buttons */}
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Where is your jewellery?</label>
                    <div className={styles.radioGroup}>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          value="home"
                          checked={jwellaryLocation === 'home'}
                          //   onChange={(e) => setJwellaryLocation(e.target.value)}
                          onChange={(e) => handleJwellaryLocationChange(e.target.value)}
                          className={styles.radioInput}
                        />
                        At home
                      </label>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          value="bank"
                          checked={jwellaryLocation === 'bank'}
                          //   onChange={(e) => setJwellaryLocation(e.target.value)}
                          onChange={(e) => handleJwellaryLocationChange(e.target.value)}
                          className={styles.radioInput}
                        />
                        Bank locker
                      </label>
                    </div>
                    {errors.jwellaryLocation && <p className="error">{errors.jwellaryLocation}</p>}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Type of jewellery</label>
                    <Select
                      // value={jwellaryType}
                      value={JWELLARY_TYPES.find(option => option.value === formData.jwellaryType)}
                      onChange={handleSelectJwellaryType}
                      options={JWELLARY_TYPES}
                      styles={customStyles}
                      // error={errors.jwellaryType}
                      menuIsOpen={isJwellaryTypeMenuOpen}
                      onFocus={() => setIsJwellaryTypeMenuOpen(true)}
                      onBlur={() => setIsJwellaryTypeMenuOpen(false)}
                      isSearchable={false}
                      components={{
                        Option: (props) => <CustomOption {...props} fieldType="jewelry" /> // Pass the necessary props like `fieldType`
                      }}
                      placeholder="Select a jwellary type"  // Custom placeholder text
                    />
                    {errors.jwellaryType && <p className="error">{errors.jwellaryType}</p>}
                  </div>

                </>
              )}
              {/* {formData.loanGuarantee === 'Property' && (
            <> */}

              {/* <div className={styles.formGroup}>
          <div className={styles.inputWrapper} style={{ position: 'relative' }}>
            <label className={styles.label}>Desired loan amount</label>
            <input
              type="number"
              placeholder="Eg. 50000"
              value={loanamount}
              onChange={(e) => handlePropertyLoanAmountChange(e.target.value)}
              className={styles.input}
              maxLength={6}
            />
             <span
      className={styles.icon}
      style={{
        position: 'absolute',
        right: '10px',
        top: '50%',
        color: '#00000061',
        // transform: 'translateY(-50%)',
        cursor: 'pointer',
      }}
    >
      <FaMoneyBillWave /> 
    </span>
</div>
            {errors.loanamount && <p className="error">{errors.loanamount}</p>}
          </div> */}

              {/* <div className={styles.formGroup}>
            <label className={styles.label}>Estimated property value</label>
            <Select
               value={propertyvalueoptions.find(option => option.value === formData.propertyvalue)}
               options={propertyvalueoptions}
               styles={customStyles} 
              onChange={handlePropertyValueChange}
              menuIsOpen={isPropertyValueMenuOpen}
              onFocus={() => setIsPropertyValueMenuOpen(true)}
              onBlur={() => setIsPropertyValueMenuOpen(false)}
              isSearchable={false}
              components={{ Option: CustomOption }} // Use the custom option component
              placeholder="Select a property value"  // Custom placeholder text
            />
            {errors.propertyvalue && <p className="error">{errors.propertyvalue}</p>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Purpose of loan</label>
            <Select
               value={loanpurposeOptions.find(option => option.value === formData.propertyloanpurpose)}
               options={loanpurposeOptions}
               styles={customStyles} 
              onChange={handlePropertyLoanPurposeChange}
              menuIsOpen={isLoanPurposeMenuOpen}
              onFocus={() => setIsLoanPurposeMenuOpen(true)}
              onBlur={() => setIsLoanPurposeMenuOpen(false)}
              isSearchable={false}
              components={{ Option: CustomOption }} // Use the custom option component
              placeholder="Select a purpose of loan"  // Custom placeholder text
            />
            {errors.propertyloanpurpose && <p className="error">{errors.propertyloanpurpose}</p>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Type of property</label>
            <Select
               value={propertytypeoptions.find(option => option.value === formData.propertytype)}
               options={propertytypeoptions}
               styles={customStyles} 
              onChange={handlePropertyTypeChange}
              menuIsOpen={isPropertyTypeMenuOpen}
              onFocus={() => setIsPropertyTypeMenuOpen(true)}
              onBlur={() => setIsPropertyTypeMenuOpen(false)}
              isSearchable={false}
              components={{ Option: CustomOption }} // Use the custom option component
              placeholder="Select a property type"  // Custom placeholder text
            />
            {errors.propertytype && <p className="error">{errors.propertytype}</p>}
          </div>
        

          <div className={styles.formGroup}>
          <div className={styles.inputWrapper} style={{ position: 'relative' }}>
            <label style={{ fontWeight: 'bold' }}>Property pincode</label>
            <input
              type="number"
              placeholder="Eg. 123456"
              value={propertypinCode}
              onChange={(e) => handlePropertyPincodeChange(e.target.value)}
              className={styles.input}
              maxLength={6}
            />
            <span
      className={styles.icon}
      style={{
        position: 'absolute',
        right: '10px',
        top: '50%',
        color: '#00000061',
        // transform: 'translateY(-50%)',
        cursor: 'pointer',
      }}
    >
      <FaMapPin /> 
    </span>
    </div>
            {errors.propertypinCode && <p className="error">{errors.propertypinCode}</p>}
          </div> */}


              {/* <div className={styles.formGroup}>
          <div className={styles.inputWrapper} style={{ position: 'relative' }}>
  <label className={styles.label}>How long have you had the property?</label>
  <input
    type="text"
    value={ownedtime}
    onChange={(e) => handleOwnedTimeChnage(e.target.value)}
    placeholder="Years of ownership "
    className={styles.input}
    min="0"
  />
  <span
      className={styles.icon}
      style={{
        position: 'absolute',
        right: '10px',
        top: '50%',
        color: '#00000061',
        // transform: 'translateY(-50%)',
        cursor: 'pointer',
      }}
    >
      <FaUserClock /> 
    </span>
  </div>
  {errors.ownedtime && <p className="error">{errors.ownedtime}</p>}
</div> */}
              {/* </>
   )} */}

              {formData.loanGuarantee === 'Mutual Funds' && (
                <>
                  <div className={styles.formGroup}>
                    <div className={styles.inputWrapper} style={{ position: 'relative' }}>
                      <label style={{ fontWeight: 'bold' }}>Desired loan amount</label>
                      <input
                        type="number"
                        placeholder="Eg. 50000"
                        value={mutualfundloanamount}
                        inputMode="numeric"
                        onChange={(e) => handleMutualFundLoanAmountChange(e.target.value)}
                        className={styles.input}
                        maxLength={6}
                      />
                      <span
                        className={styles.icon}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          color: '#00000061',
                          // transform: 'translateY(-50%)',
                          cursor: 'pointer',
                        }}
                      >
                        <FaRupeeSign /> {/* Map pin (location) icon */}
                      </span>
                    </div>
                    {errors.mutualfundloanamount && <p className="error">{errors.mutualfundloanamount}</p>}
                  </div>

                  <div className={styles.formGroup}>
                    <div className={styles.inputWrapper} style={{ position: 'relative' }}>
                      <label className={styles.label}>What is the current market value of the mutual fund?</label>
                      <input
                        type="number"
                        value={mutualfundmarketValue}
                        onChange={(e) => handleMutualFundMarketValueChange(e.target.value)}
                        placeholder="Enter current market value"
                        className={styles.input}
                        inputMode="numeric"
                        min="0"
                      />
                      <span
                        className={styles.icon}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '60%',
                          color: '#00000061',
                          // transform: 'translateY(-50%)',
                          cursor: 'pointer',
                        }}
                      >
                        <FaRupeeSign /> {/* Map pin (location) icon */}
                      </span>
                    </div>
                    {errors.mutualfundmarketValue && <p className="error">{errors.mutualfundmarketValue}</p>}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Purpose of loan</label>
                    <Select
                      value={loanpurposeOptions.find(option => option.value === formData.mutualfundloanpurpose)}
                      options={loanpurposeOptions}
                      styles={customStyles}
                      onChange={handleMutualFundLoanPurposeChange}
                      menuIsOpen={isLoanPurposeMenuOpen}
                      onFocus={() => setIsLoanPurposeMenuOpen(true)}
                      onBlur={() => setIsLoanPurposeMenuOpen(false)}
                      isSearchable={false}
                      components={{ Option: CustomOption }} // Use the custom option component
                      placeholder="Select a purpose of loan"  // Custom placeholder text
                    />
                    {errors.mutualfundloanpurpose && <p className="error">{errors.mutualfundloanpurpose}</p>}
                  </div>

                </>
              )}

              {formData.loanGuarantee === 'Insurance' && (
                <>

                  <div className={styles.formGroup}>
                    <div className={styles.inputWrapper} style={{ position: 'relative' }}>
                      <label style={{ fontWeight: 'bold' }}>Desired loan amount</label>
                      <input
                        type="number"
                        placeholder="Eg. 50000"
                        value={insuranceloanamount}
                        inputMode="numeric"
                        onChange={(e) => handleInsuranceLoanAmountChange(e.target.value)}
                        className={styles.input}
                        maxLength={6}
                      />
                      <span
                        className={styles.icon}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          color: '#00000061',
                          // transform: 'translateY(-50%)',
                          cursor: 'pointer',
                        }}
                      >
                        <FaRupeeSign /> {/* Map pin (location) icon */}
                      </span>
                    </div>
                    {errors.insuranceloanamount && <p className="error">{errors.insuranceloanamount}</p>}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Insurance type</label>
                    <Select
                      value={insurancetypeoptions.find(option => option.value === formData.insurancetype)}
                      options={insurancetypeoptions}
                      styles={customStyles}
                      onChange={handleInsuranceTypeChange}
                      menuIsOpen={isInsuranceTypeMenuOpen}
                      onFocus={() => setIsInsuranceTypeMenuOpen(true)}
                      onBlur={() => setIsInsuranceTypeMenuOpen(false)}
                      isSearchable={false}
                      components={{ Option: CustomOption }} // Use the custom option component
                      placeholder="Select insurance type"  // Custom placeholder text
                    />
                    {errors.insurancetype && <p className="error">{errors.insurancetype}</p>}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Purpose of loan</label>
                    <Select
                      value={loanpurposeOptions.find(option => option.value === formData.insuranceloanpurpose)}
                      options={loanpurposeOptions}
                      styles={customStyles}
                      onChange={handleInsuranceLoanPurposeChange}
                      menuIsOpen={isLoanPurposeMenuOpen}
                      onFocus={() => setIsLoanPurposeMenuOpen(true)}
                      onBlur={() => setIsLoanPurposeMenuOpen(false)}
                      isSearchable={false}
                      components={{ Option: CustomOption }} // Use the custom option component
                      placeholder="Select a purpose of loan"  // Custom placeholder text
                    />
                    {errors.insuranceloanpurpose && <p className="error">{errors.insuranceloanpurpose}</p>}
                  </div>

                </>
              )}

              {formData.loanGuarantee === 'Shares/Stocks' && (
                <>
                  <div className={styles.formGroup}>
                    <div className={styles.inputWrapper} style={{ position: 'relative' }}>
                      <label style={{ fontWeight: 'bold' }}>Desired loan amount</label>
                      <input
                        type="number"
                        placeholder="Eg. 50000"
                        value={sharesloanamount}
                        inputMode="numeric"
                        onChange={(e) => handleSharesLoanAmountChange(e.target.value)}
                        className={styles.input}
                        maxLength={6}
                      />
                      <span
                        className={styles.icon}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          color: '#00000061',
                          // transform: 'translateY(-50%)',
                          cursor: 'pointer',
                        }}
                      >
                        <FaRupeeSign /> {/* Map pin (location) icon */}
                      </span>
                    </div>
                    {errors.sharesloanamount && <p className="error">{errors.sharesloanamount}</p>}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Purpose of loan</label>
                    <Select
                      value={loanpurposeOptions.find(option => option.value === formData.sharesloanpurpose)}
                      options={loanpurposeOptions}
                      styles={customStyles}
                      onChange={handleSharesLoanPurposeChange}
                      menuIsOpen={isLoanPurposeMenuOpen}
                      onFocus={() => setIsLoanPurposeMenuOpen(true)}
                      onBlur={() => setIsLoanPurposeMenuOpen(false)}
                      isSearchable={false}
                      components={{ Option: CustomOption }} // Use the custom option component
                      placeholder="Select a purpose of loan"  // Custom placeholder text
                    />
                    {errors.sharesloanpurpose && <p className="error">{errors.sharesloanpurpose}</p>}
                  </div>

                  <div className={styles.formGroup}>
                    <div className={styles.inputWrapper} style={{ position: 'relative' }}>
                      <label className={styles.label}>What is the current market value of the shares/stocks?</label>
                      <input
                        type="number"
                        value={sharesmarketValue}
                        inputMode="numeric"
                        onChange={(e) => handleSharesMarketValueChange(e.target.value)}
                        placeholder="Enter current market value"
                        className={styles.input}
                        min="0"
                      />
                      <span
                        className={styles.icon}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '60%',
                          color: '#00000061',
                          // transform: 'translateY(-50%)',
                          cursor: 'pointer',
                        }}
                      >
                        <FaRupeeSign /> {/* Map pin (location) icon */}
                      </span>
                    </div>
                    {errors.sharesmarketValue && <p className="error">{errors.sharesmarketValue}</p>}
                  </div>
                </>
              )}

              <button onClick={handleBackButton} className="back-button">
                <FaArrowLeft />
              </button>

              <div className={styles.stickyButton}>
                <button type="submit" className={`${styles.button} ${styles.submitButton}`}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      }

      {/* OTP Bottom Sheet Modal */}
      {isOtpBottomSheetVisible && (
        <OTPBottomSheet
          isVisible={isOtpBottomSheetVisible}
          verifyOTP={handleVerifyOTP}
          upotp={upotp}
          otpStatus={otpStatus}
          setUpOtp={setUpOtp}
        />
      )}

    </>
  );
};

export default SecuredQuestionPage;