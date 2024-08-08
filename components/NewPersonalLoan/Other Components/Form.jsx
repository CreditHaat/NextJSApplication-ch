

import { useEffect, useState, lazy, Suspense, useRef } from "react";
import './Form.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormPageCarousel from "./FormPageCarousel";
import Consent from "./Consent";
import Image from 'next/image';
import NewFormPageImage from '../NewPersonalLoanImages/NewFormPageImage.png';
import NewFormPageImage2 from '../NewPersonalLoanImages/FormPageImage2.png';
import NewFormPageImage3 from '../NewPersonalLoanImages/FormPageImage3.png';
import Carousel from './MyCarousel';

// const FormPageCarousel = lazy(() => import("./FormPageCarousel"));

function FormPage({ formData, handleChange, onSubmit, setFormData }) {
    const [errors, setErrors] = useState({});

    const inputRef = useRef(null);
    const formContainerRef = useRef(null);
    const selectRef = useRef(null);

    // Function to scroll the form container
    const scrollToInput = () => {
        // inputRef.current is the DOM node of the input field
        if (inputRef.current && window.innerWidth < 768) {
            inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        }
    };

    // Function to scroll the form container to the select element
    const scrollToSelect = () => {
        if (selectRef.current && window.innerWidth < 768) {
            selectRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        }
    };

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
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(e);
        }
    };

    useEffect(() => {
        // handleChange(e);
    }, [formData.profession]);

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

    return (
        <>
            <section ref={formContainerRef} className="container banner" style={{ borderRadius: '20px', marginTop: '10px', backgroundColor: '#f2edff' }}>
                <div className="row py-md-5 px-md-5" style={{ display: "flex" }}>
                    {/* style={{height:'220px'}} */}
                    <div className="col-md-6">
                        {
                            
                            // <Suspense>
                                // <FormPageCarousel />
                                // <Carousel/>
                            // </Suspense>
                        }


                    </div>
                    <div className="col-md-6 py-md-5 px-md-5" style={{ justifyContent: "center", alignItems: "center" }}>
                        <h4 style={{ textAlign: 'center', color: '#3e2780' }}>Check Eligibility</h4>
                        <div className="row" style={{ display: "flex" }}>
                            <form onSubmit={handleSubmit}>
                                <div className="input-group mb-5">
                                    <input ref={inputRef} type="text" className={`form-control textBox ${errors.firstName ? 'is-invalid' : ''}`} placeholder="First name" onFocus={scrollToInput} aria-label="First Name" aria-describedby="first-name-icon" name="firstName" value={formData.firstName || ''} onChange={handleChange} style={{ border: '1px solid #3e2780', borderRadius: '5px', borderRight: 'none', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }} />
                                    <span className="input-group-text" id="first-name-icon" style={{ border: '1px solid #3e2780', borderRadius: '5px', borderLeft: 'none', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}><i className="bi bi-person"></i></span>
                                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                                </div>
                                <div className="input-group mb-5">
                                    <input ref={inputRef} type="text" className={`form-control textBox ${errors.lastName ? 'is-invalid' : ''}`} placeholder="Last name" onFocus={scrollToInput} aria-label="Last Name" aria-describedby="last-name-icon" name="lastName" value={formData.lastName || ''} onChange={handleChange} style={{ border: '1px solid #3e2780', borderRadius: '5px', borderRight: 'none', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }} />
                                    <span className="input-group-text" id="last-name-icon" style={{ border: '1px solid #3e2780', borderRadius: '5px', borderLeft: 'none', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}><i className="bi bi-person"></i></span>
                                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                                </div>
                                <div className="input-group mb-5">
                                    <select ref={selectRef} className={`form-select textBox ${errors.profession ? 'is-invalid' : ''}`} onFocus={scrollToSelect} aria-label="First Name" aria-describedby="first-name-icon"
                                        value={formData.profession || ''}
                                        style={{ border: '1px solid #3e2780', borderRadius: '5px' }}
                                        onChange={(e) => handleInputChange(e.target.value, 'profession') && handleChange}
                                    >
                                        <option value="">Profession Type </option>
                                        <option>Salaried</option>
                                        <option value="Self employed">Self Employed</option>
                                        <option value="Business">Business</option>
                                    </select>
                                    {errors.profession && <div className="invalid-feedback">{errors.profession}</div>}

                                </div>
                                <div className="input-group mb-2" >
                                    <input ref={inputRef} type="number" className={`form-control textBox ${errors.mobileNumber ? 'is-invalid' : ''}`} placeholder="Mobile number" onFocus={scrollToInput} aria-label="Mobile Number" aria-describedby="mobile-number-icon" name="mobileNumber" value={formData.mobileNumber || ''} onChange={handleChange} style={{ border: '1px solid #3e2780', borderRadius: '5px', borderRight: 'none', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }} />
                                    <span className="input-group-text" id="mobile-number-icon" style={{ border: '1px solid #3e2780', borderRadius: '5px', borderLeft: 'none', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }} ><i className="bi bi-phone"></i></span>
                                    {errors.mobileNumber && <div className="invalid-feedback">{errors.mobileNumber}</div>}
                                </div>
                                {/* <div className="input-group mb-2 text-center">
                                    <p className="terms-text" style={{ display: 'none' }}>
                                        By clicking "Send OTP" button, you agree to our <a href="https://loan.credithaat.com/tnc">Terms and Conditions</a>
                                    </p>
                                </div> */}

                                {/* <div className="input-group mb-2 text-center">
                                    <p className="terms-text" style={{ height: '40px', overflowX: 'hidden', overflowY: 'auto' }}>
                                        By clicking "Send OTP" button and accepting the terms and conditions set out here in, you provide your express consent to Social Worth Technologies Private Limited, Whizdm Innovations Pvt Ltd, Upwards Fintech Services Pvt Ltd, Tata Capital Financial Services Ltd, SmartCoin Financials Pvt Ltd, MWYN Tech Pvt Ltd, L&T Finance Ltd, Krazybee Services Pvt Ltd, Infocredit Services Pvt. Ltd, Incred Financial Services, IIFL Finance Ltd, EQX Analytics Pvt Ltd, EPIMoney Pvt Ltd, Bhanix finance and Investment LTd, Aditya Birla Finance Ltd to access the credit bureaus and credit information report and credit score. You also hereby irrevocably and unconditionally consent to usage of such credit information being provided by credit bureaus
                                    </p>
                                </div> */}
                                {
                                    <Consent/>
                                }
                                <div className="input-group mb-5 justify-content-center">
                                    <button type="submit" className="btn" style={{ backgroundColor: "#3e2780", color: "#ffffff", padding: "15px" }}>Send OTP</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* here we will call the review component */}



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
                        height: auto; /* Ensures */}
            `}

            </style>
        </>
    );
}

export default FormPage;