import React, { useState, useEffect, useRef } from "react";
import logo2 from '../NewPersonalLoanImages/happy image3.png'
// import './Form.css'
import happyImage from '../NewPersonalLoanImages/happy image3.png'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FaArrowLeft } from 'react-icons/fa';
import AddInfoPageImage from '../NewPersonalLoanImages/AddInfoPageImage.png';
// import AddInfoPageImg from '../NewPersonalLoanImages/AddInfoPageImg.png';
import './AddInfo.css';
import AddInfoPageImg from '../NewPersonalLoanImages/AddInfoPageImage2.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Height, WidthFull } from "@mui/icons-material";
import { width } from "@mui/system";
import DatePicker1 from './DatePicker'
import Image from 'next/image';

function AddInfo({ handleAddInfoFormSubmit, handleAddInfoFormSubmit2, pan1, dob1, income1, salaryType1, setPan1, setDob1, setIncome1, setSalaryType1, email1, pincode1, homePin1, setEmail1, setPincode1, setHomePin1, companyName1, setCompnanyName1, goToLendersList, dobFlag, ResidentialPincodeFlag }) {

    const [step, setStep] = useState(1); // State to track the current step
    // const [profession, setProfession] = useState('');
    const [pan, setPan] = useState('');
    const [dob, setDob] = useState('');
    const [income, setIncome] = useState('');
    const [salaryType, setSalaryType] = useState('');
    const [email, setEmail] = useState('');
    const [pincode, setPincode] = useState(''); // Set initial state to an empty string
    const [homePin, setHomePin] = useState(''); //set te home Pin 

    const [companyName, setCompanyName] = useState('');

    const [touchStartX, setTouchStartX] = useState(0); // State to track touch start position
    const [errorMessage, setErrorMessage] = useState(''); // State to track error message

    const [panErrorFlag, setPanErrorFlag] = useState(false); //We will set this panErrorFlag as false if error comes else we will set this panErrorFlag as true
    // const [dobFlag, setDobFlag] = useState(true);
    // const [homePinFlag, setHomePinFlag] = useState(true);

    const [selectedDate, setSelectedDate] = useState(null);

    const inputRef = useRef(null);
    const formContainerRef = useRef(null);

    const scrollToInput = () => {
        // inputRef.current is the DOM node of the input field
        if (inputRef.current && window.innerWidth < 768) {
            inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        }
    };

    useEffect(() => {
        // Adjusted logic to prevent premature step change on income field change
        let timer;
        if (dobFlag === true) {
            if (income && parseInt(income) >= 0 && pan && panErrorFlag && salaryType && dob) {
                timer = setTimeout(() => {
                    const syntheticEvent = {
                        preventDefault: () => { },
                        // Add other properties as needed
                    };
                    handleAddInfoFormSubmit(syntheticEvent);
                    setStep(2);
                }, 500); // Adjust delay as needed
            }
        } else {
            if (income && parseInt(income) >= 0 && pan && panErrorFlag && salaryType) {
                timer = setTimeout(() => {
                    const syntheticEvent = {
                        preventDefault: () => { },
                        // Add other properties as needed
                    };
                    handleAddInfoFormSubmit(syntheticEvent);
                    setStep(2);
                }, 500); // Adjust delay as needed
            }
        }

        return () => clearTimeout(timer); // Cleanup on unmount or change
    }, [panErrorFlag, pan, income, salaryType, dob]);

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            setErrorMessage('Invalid email address');
        } else {
            setErrorMessage('');
        }
    }, [email]);


    useEffect(() => {
        const panRegex = /^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/;
        if (pan && !panRegex.test(pan)) {
            setErrorMessage(prevErrorMessage => prevErrorMessage ? prevErrorMessage : 'Invalid PAN');
            setPanErrorFlag(false);
        } else {
            setErrorMessage(prevErrorMessage => prevErrorMessage === 'Invalid PAN' ? '' : prevErrorMessage);
            setPanErrorFlag(true);
        }
    }, [pan])

    useEffect(() => {
        const pincodeRegex = /^[1-9][0-9]{5}$/;
        if (pincode && !pincodeRegex.test(pincode)) {
            setErrorMessage(prevErrorMessage => prevErrorMessage ? prevErrorMessage : 'Invalid Office pincode');
        } else {
            setErrorMessage(prevErrorMessage => prevErrorMessage === 'Invalid Office pincode' ? '' : prevErrorMessage);
        }
    }, [pincode]);

    useEffect(() => {
        const pincodeRegex = /^[1-9][0-9]{5}$/;
        if (homePin && !pincodeRegex.test(homePin)) {
            setErrorMessage(prevErrorMessage => prevErrorMessage ? prevErrorMessage : 'Invalid Residential pincode');
        } else {
            setErrorMessage(prevErrorMessage => prevErrorMessage === 'Invalid Residential pincode' ? '' : prevErrorMessage);
        }
    }, [homePin]);



    useEffect(() => {
        if (ResidentialPincodeFlag === true) {
            if (email && pincode && !errorMessage && companyName && pincode.length === 6 && homePin.length === 6 && homePin) {
                const syntheticEvent = {
                    preventDefault: () => { },
                    // Add other properties as needed
                };
                console.log("Before handleAddInfoFormSubmit2");
                handleAddInfoFormSubmit2(syntheticEvent);

                goToLendersList(); // Move to next step if email, pincode, and no error
            }
        } else {
            if (email && pincode && !errorMessage && companyName && pincode.length === 6) {
                const syntheticEvent = {
                    preventDefault: () => { },
                    // Add other properties as needed
                };
                handleAddInfoFormSubmit2(syntheticEvent);

                goToLendersList(); // Move to next step if email, pincode, and no error
            }
        }

    }, [email, companyName, pincode, errorMessage]);

    const handleDateChange = date => {
        setDob(date);
        setDob1(date);
    };

    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e) => {
        const endX = e.changedTouches[0].clientX;
        const deltaX = endX - touchStartX;
        if (deltaX < -50 && step < 2 && pan && income && salaryType && parseInt(income) >= 0) {
            setStep(step + 1); // Swipe left to go forward
        }
    };

    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const [inputMode, setInputMode] = useState("text");

    const handleInputChange = (value, fieldName) => {
        // Check if the previous field is filled before accepting input for the current field
        switch (fieldName) {
            case 'income':

                if (!pan) {
                    setErrorMessage('Please fill the PAN Details first.');
                    return;
                }
                // if (!dob) {
                //     setErrorMessage('Please enter your DOB first');
                //     return;
                // }
                if (errorMessage) {
                    return;
                }
                break;



            case 'salaryType':
                if (!income) {
                    setErrorMessage('Please fill the income field first and provide valid income');
                    return;
                }
                setSalaryType(value);


                setErrorMessage('');
                break;

            case 'companyName':
                if (!email) {
                    setErrorMessage('please fill the email field first.');
                    return;
                }
                break;

            case 'pincode':
                if (!companyName) {
                    setErrorMessage('Please fill the CompanyName field first.');
                    return;
                }
                break;

            case 'homePin':
                if (!pincode) {
                    setErrorMessage('Please fill the pincode field first.');
                    return;
                }
                break;


            default:
                break;
        }

        // If previous field is filled, update the state and clear error message
        switch (fieldName) {
            case 'PAN':
                if (value.length < 5) {
                    // First 5 characters: uppercase alphabets
                    setInputMode("text");
                  } else if (value.length < 9) {
                    // Next 4 characters: numeric
                    setInputMode("numeric");
                  } else {
                    // Last character: uppercase alphabet  
                    setInputMode("text");
                  }

                  if(value.length<=10)
                    {
                        setPan(value.toUpperCase());
                setPan1(value.toUpperCase());
                    }

                setErrorMessage('');
                break;

            case 'dob':
                setDob(value);
                setDob1(value);

            case 'income':
                setIncome(value);
                setIncome1(value);

                setErrorMessage('');
                break;
            case 'salaryType':
                setSalaryType(value);
                setSalaryType1(value);

                setErrorMessage('');
                break;
            case 'email':
                setEmail(value);
                setEmail1(value);
                break;
            case 'pincode':
                if (value.length <= 6) {
                    setPincode(value);
                    setPincode1(value);
                }
                // else{
                //     // setErrorMessage('Only 6 digit pincode allowed')
                // }

                break;

            case 'companyName':
                setCompanyName(value);
                setCompnanyName1(value);
                break;

            case 'homePin':
                if (value.length <= 6) {
                    setHomePin(value);
                    setHomePin1(value);
                }

                break;

            default:
                break;
        }
    };

    return (
        <>
        <div>
        <section ref={formContainerRef} className="container banner" style={{ borderRadius: '20px', marginTop: '10px', backgroundColor: '#f2edff' }}>
                <div className="row py-md-5 px-md-5" style={{ display: "flex" }}>
                    <div className="col-md-6">
                        <div className="row" style={{ display: "flex" }}>


                            {/* <img
                                // src="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/site-banner-ladypic.png"
                                src={AddInfoPageImg}
                                className="figure-img img-fluid banner_img"
                                alt="..."

                            /> */}
                            <Image
                            src={AddInfoPageImg}
                            className="figure-img img-fluid banner_img"
                            width={400}
                            Height={200}
                            alt="..."/>

                        </div>
                    </div>


                    <div className="col-md-6 py-md-5 px-md-5" style={{ justifyContent: "center", alignItems: "center" }}>
                        <div className="slide-container">{/* This div is also used for slide  */}
                            {step === 1 && (
                                <div>
                                    {/* From Here We will add the form Contents which should slide after filling all the details */}
                                    <div className="row" style={{ display: "flex" }}>
                                        <div className="input-group mb-5">
                                            <input ref={inputRef} type="text" className="form-control textBox" placeholder="PAN" onFocus={scrollToInput} aria-label="Last Name" aria-describedby="last-name-icon" name="lastName"

                                                style={{ textTransform: 'uppercase' }}
                                                value={pan && pan1}
                                                onChange={(e) => handleInputChange(e.target.value, 'PAN')}
                                                inputMode={inputMode}
                                            />

                                        </div>

                                        {/* {dobFlag &&
                                            <>

                                                <div className="input-group mb-5">

                                                    <div className="date">
                                                        <DatePicker
                                                            className="form-control"
                                                            selected={dob && dob1}
                                                            onChange={handleDateChange}
                                                            dateFormat="dd/MM/yyyy" // Customize date format as per your requirement
                                                            isClearable // Optional: Adds a clear button to clear the date
                                                            placeholderText="Select a date" // Placeholder text when no date is selected
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        } */}

                                        {dobFlag &&
                                            <div className="input-group mb-5">
                                                <DatePicker1 dob={dob} dob1={dob1} setDob={setDob} setDob1={setDob1} handleDateChange={handleDateChange} setErrorMessage={setErrorMessage} />
                                            </div>
                                        }


                                        <div className="input-group mb-5">
                                            <input ref={inputRef} type="number" className="form-control textBox" placeholder="Enter Your Monthly Income" onFocus={scrollToInput} aria-label="Last Name" aria-describedby="last-name-icon" name="lastName"
                                                value={income && income1}
                                                onChange={(e) => handleInputChange(e.target.value, 'income')}
                                            />

                                        </div>

                                        <div className="input-group mb-5">
                                            <select className="form-select textBox" aria-label="First Name" aria-describedby="first-name-icon"
                                                value={salaryType && salaryType1}
                                                onChange={(e) => handleInputChange(e.target.value, 'salaryType')}
                                            >
                                                <option value="">Select Your Salary Type</option>
                                                <option value="0">Cash</option>
                                                <option value="1">Check</option>
                                                <option value="2">Bank Transfer</option>
                                            </select>
                                        </div>

                                    </div>
                                    {/* Form content ends here */}
                                    <div className="input-group mb-5 justify-content-center">
                                        <button type="submit" className="btn" style={{ backgroundColor: "#3e2780", color: "#ffffff", padding: "5px", width: "150px" }}>Next →</button>
                                    </div>
                                </div>
                            )}

                            {/* Here we will write the code for second form */}

                            {step === 2 && (
                                <div>

                                    {/* From here we will add the content for second form */}
                                    <div className="row" style={{ display: "flex" }}>

                                        <div className="input-group mb-5">
                                            <input ref={inputRef} type="email" placeholder="Personal email" className="form-control" onFocus={scrollToInput} aria-label="Last Name" aria-describedby="last-name-icon"
                                                value={email}
                                                onChange={(e) => handleInputChange(e.target.value, 'email')}
                                            />

                                        </div>

                                        <div className="input-group mb-5">
                                            <input ref={inputRef} type="text" className="form-control textBox" placeholder="Company name" onFocus={scrollToInput} aria-label="Last Name" aria-describedby="last-name-icon" name="lastName"
                                                value={companyName && companyName1}
                                                onChange={(e) => handleInputChange(e.target.value, 'companyName')}
                                            />

                                        </div>

                                        <div className="input-group mb-5">
                                            <input ref={inputRef} type="number" placeholder="Office pincode" onFocus={scrollToInput} className="form-control" aria-label="Last Name" aria-describedby="last-name-icon"
                                                value={pincode}
                                                onChange={(e) => handleInputChange(e.target.value, 'pincode')}

                                            />

                                        </div>

                                        {
                                            ResidentialPincodeFlag &&
                                            <div className="input-group mb-5">
                                                <input type="number" placeholder="Enter Your Residential Pincode" className="form-control" aria-label="Last Name" aria-describedby="last-name-icon"
                                                    value={homePin}
                                                    onChange={(e) => handleInputChange(e.target.value, 'homePin')}

                                                />

                                            </div>
                                        }





                                    </div>
                                    {/* Content for second form ends here */}

                                    <div className="input-group mb-5 justify-content-center">
                                        <button type="submit" className="btn" style={{ backgroundColor: "#3e2780", color: "#ffffff", padding: "5px", width: "150px" }}>Next →</button>
                                    </div>

                                </div>
                            )}

                        </div>
                        <div className="dot-container">
                            <span className={`dot ${step === 1 ? 'active' : ''}`}></span>
                            <span className={`dot ${step === 2 ? 'active' : ''}`}></span>
                        </div>
                        {errorMessage && <div className="text-danger">{errorMessage}</div>}
                        {step > 1 && <FaArrowLeft className="arrow-left" style={{ marginBottom: '30px' }} onClick={prevStep} />}

                    </div>



                </div>
            </section>
            <br />
            <style>
                {`
          @media (max-width: 768px) {
            .input-group mb-3{
               width:100%
            }
             
            .row {
              flex-direction: column;
            }
            .col-md-6 {
              width: 100%;
            }
            .banner_img {
              max-width: 100%; /* Adjust width as needed */
              height: auto; /* Ensures image does not distort */
              margin: 1rem auto; /* Adds some space around the image */
            }
          }
        `}
            </style>

            <style>
                {`
                    .date{
                        width: 100%;
                    }
                    .react-datepicker-wrapper {
                        display: inline-block;
                        padding: 0;
                        border: 0;
                        width: 100%;
                    }
                `}
            </style>
        </div>
            

        </>
    );

}

export default AddInfo;