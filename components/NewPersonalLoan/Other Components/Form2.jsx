// import Carousel1 from "./Carousel"
// import Carousel from './Carousel';
import { useState, useEffect } from 'react';

// import Consent from './Consent';
// import CarouselComponent from './CarouselComponent';
import './Form.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewFormPageImage from '../NewPersonalLoanImages/NewFormPageImage.png';
import Image from 'next/image'
// import NewFormPageImage from '../NewPersonalLoanImages/NewFormPageImage.png';
import NewFormPageImage2 from '../NewPersonalLoanImages/FormPageImage2.png';
import NewFormPageImage3 from '../NewPersonalLoanImages/FormPageImage3.png';

import dynamic from 'next/dynamic';

const DynamicCarouselComponent = dynamic(() => import('./CarouselComponent'), {
  ssr: false
});

const DynamicConsentComponent = dynamic(() => import('./Consent'), {
  ssr: false
});


const Form2 = () => {

    return (
        <>
            <section className="container banner" style={{ borderRadius: '20px', marginTop: '10px', backgroundColor: '#f2edff' }}>
                <div className="row py-md-5 px-md-5" style={{ display: "flex" }}>
                    {/* style={{height:'220px'}} */}
                    <div className="col-md-6">
                        {/* <CarouselComponent/>
                      <Image
                      src={NewFormPageImage}
                      width={500}
                      height={500}
                      layout='intrensic'
                      alt='image'/> */}

{/* ------------------------Carousel Component------------------------------------------------ */}
<div
                            id="carouselExampleIndicators"
                            className="relative"
                            data-twe-carousel-init
                            data-twe-ride="carousel"
                        >
                            {/* Carousel Indicators */}
                            <div
                                className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
                                data-twe-carousel-indicators
                            >
                                <button
                                    type="button"
                                    data-twe-target="#carouselExampleIndicators"
                                    data-twe-slide-to="0"
                                    data-twe-carousel-active
                                    className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                                    aria-current="true"
                                    aria-label="Slide 1"
                                ></button>
                                <button
                                    type="button"
                                    data-twe-target="#carouselExampleIndicators"
                                    data-twe-slide-to="1"
                                    className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                                    aria-label="Slide 2"
                                ></button>
                                <button
                                    type="button"
                                    data-twe-target="#carouselExampleIndicators"
                                    data-twe-slide-to="2"
                                    className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                                    aria-label="Slide 3"
                                ></button>
                            </div>

                            {/* Carousel Items */}
                            <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
                                {/* First item */}
                                <div
                                    className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                                    data-twe-carousel-item
                                    data-twe-carousel-active
                                >
                                    {/* <img
            src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp"
            className="block w-full"
            alt="Wild Landscape"
          /> */}
                                    <Image
                                        src={NewFormPageImage}
                                        width={300}
                                        height={300}
                                        className='block w-full'
                                        alt='image 1' />
                                </div>
                                {/* Second item */}
                                <div
                                    className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                                    data-twe-carousel-item
                                >
                                    {/* <img
            src="https://mdbcdn.b-cdn.net/img/new/slides/042.webp"
            className="block w-full"
            alt="Camera"
          /> */}
                                    <Image
                                        src={NewFormPageImage2}
                                        width={300}
                                        height={300}
                                        className='block w-full'
                                        alt='image 2' />
                                </div>
                                {/* Third item */}
                                <div
                                    className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                                    data-twe-carousel-item
                                >
                                    {/* <img
            src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp"
            className="block w-full"
            alt="Exotic Fruits"
          /> */}
                                    <Image
                                        src={NewFormPageImage3}
                                        width={300}
                                        height={300}
                                        className='block w-full'
                                        alt='image 3' />
                                </div>
                            </div>

                            {/* Carousel Controls - Prev/Next */}
                            <button
                                className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                                type="button"
                                data-twe-target="#carouselExampleIndicators"
                                data-twe-slide="prev"
                            >
                                <span className="inline-block h-8 w-8">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-6 w-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 19.5L8.25 12l7.5-7.5"
                                        />
                                    </svg>
                                </span>
                                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                    Previous
                                </span>
                            </button>
                            <button
                                className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                                type="button"
                                data-twe-target="#carouselExampleIndicators"
                                data-twe-slide="next"
                            >
                                <span className="inline-block h-8 w-8">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-6 w-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                        />
                                    </svg>
                                </span>
                                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                    Next
                                </span>
                            </button>
                        </div>


{/*----------------- Carousel Component Ends Here---------------------------------------- */}

                    </div>
                    <div className="col-md-6 py-md-5 px-md-5" style={{ justifyContent: "center", alignItems: "center" }}>
                        <h4 style={{ textAlign: 'center', color: '#3e2780' }}>Check Eligibility</h4>
                        <div className="row" style={{ display: "flex" }}>
                            <form>
                                <div className="input-group mb-5">
                                    <input type="text" className={`form-control textBox `} placeholder="First name" aria-label="First Name" aria-describedby="first-name-icon" name="firstName" style={{ border: '1px solid #3e2780', borderRadius: '5px', borderRight: 'none', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }} />
                                    <span className="input-group-text" id="first-name-icon" style={{ border: '1px solid #3e2780', borderRadius: '5px', borderLeft: 'none', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}><i className="bi bi-person"></i></span>
                                </div>
                                <div className="input-group mb-5">
                                    <input type="text" className={`form-control textBox `} placeholder="Last name" aria-label="Last Name" aria-describedby="last-name-icon" name="lastName" style={{ border: '1px solid #3e2780', borderRadius: '5px', borderRight: 'none', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }} />
                                    <span className="input-group-text" id="last-name-icon" style={{ border: '1px solid #3e2780', borderRadius: '5px', borderLeft: 'none', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}><i className="bi bi-person"></i></span>

                                </div>
                                <div className="input-group mb-5">
                                    <select className={`form-select textBox `} aria-label="First Name" aria-describedby="first-name-icon"

                                        style={{ border: '1px solid #3e2780', borderRadius: '5px' }}
                                    >
                                        <option value="">Profession Type </option>
                                        <option>Salaried</option>
                                        <option value="Self employed">Self Employed</option>
                                        <option value="Business">Business</option>
                                    </select>

                                </div>
                                <div className="input-group mb-2" >
                                    <input type="number" className={`form-control textBox `} placeholder="Mobile number" aria-label="Mobile Number" aria-describedby="mobile-number-icon" name="mobileNumber" style={{ border: '1px solid #3e2780', borderRadius: '5px', borderRight: 'none', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }} />
                                    <span className="input-group-text" id="mobile-number-icon" style={{ border: '1px solid #3e2780', borderRadius: '5px', borderLeft: 'none', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }} ><i className="bi bi-phone"></i></span>

                                </div>
                                {/* <div className="input-group mb-2 text-center">
                                    <p className="terms-text" style={{ display: 'none' }}>
                                        By clicking "Send OTP" button, you agree to our <a href="https://loan.credithaat.com/tnc">Terms and Conditions</a>
                                    </p>
                                </div> */}

                                <div className="input-group mb-2 text-center">
                                    <p className="terms-text" style={{ height: '40px', overflowX: 'hidden', overflowY: 'auto' }}>
                                        By clicking "Send OTP" button and accepting the terms and conditions set out here in, you provide your express consent to Social Worth Technologies Private Limited, Whizdm Innovations Pvt Ltd, Upwards Fintech Services Pvt Ltd, Tata Capital Financial Services Ltd, SmartCoin Financials Pvt Ltd, MWYN Tech Pvt Ltd, L&T Finance Ltd, Krazybee Services Pvt Ltd, Infocredit Services Pvt. Ltd, Incred Financial Services, IIFL Finance Ltd, EQX Analytics Pvt Ltd, EPIMoney Pvt Ltd, Bhanix finance and Investment LTd, Aditya Birla Finance Ltd to access the credit bureaus and credit information report and credit score. You also hereby irrevocably and unconditionally consent to usage of such credit information being provided by credit bureaus
                                    </p>
                                </div>
                                {
                                    // <Consent/>
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
    )
}

export default Form2
