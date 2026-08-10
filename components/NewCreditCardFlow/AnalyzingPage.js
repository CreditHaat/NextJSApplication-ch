"use client";
import React, { useEffect, useState } from "react";
import "../../components/NewCreditCardFlow/AnalyzingPage.css";
import { IoChevronBack } from "react-icons/io5";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function AnalyzingPage({ setActiveContainer, mobile, subscriberNames }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [benefitIndex, setBenefitIndex] = useState(0);
  const benefits = [
    {
      title: "Earn Reward Points",
      desc: "Get reward points on shopping, dining and travel.",
    },
    {
      title: "Airport Lounge Access",
      desc: "Enjoy complimentary airport lounge visits.",
    },
    {
      title: "Cashback Benefits",
      desc: "Save money on daily purchases with cashback.",
    },
    {
      title: "EMI Conversion",
      desc: "Convert large purchases into easy monthly EMIs.",
    },
    {
      title: "Build Credit Score",
      desc: "Regular payments help your credit score.",
    },
  ];

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < 4) {
          // was: prev < 3
          return prev + 1;
        }
        clearInterval(stepTimer);
        return prev;
      });
    }, 5000);
    return () => clearInterval(stepTimer);
  }, []);

  useEffect(() => {
    const benefitTimer = setInterval(() => {
      setBenefitIndex((prev) => (prev + 1) % benefits.length);
    }, 5000);
    return () => clearInterval(benefitTimer);
  }, []);

  useEffect(() => {
    if (currentStep === 4) {
      const redirectTimer = setTimeout(() => {
        setActiveContainer("EligibleCards");
      }, 1000);
      return () => clearTimeout(redirectTimer);
    }
  }, [currentStep]);

  const progressValues = [20, 40, 60, 80, 100];
  const progress = progressValues[currentStep];

  const handleBack = () => {
    setActiveContainer("PersonalDetails");
  };

  return (
    <div className={`${poppins.className} processingContainer`}>
      <div className="Card3">
        <div className="backButtonLoad" onClick={handleBack}>
          <IoChevronBack />
        </div>

        {/* <div className="topImage">
          <img src="/Analyzing_Process.png" alt="Credit Card" />
        </div> */}
         <div className="topImage">
        <Image
         src="/Analyzing_Process.png"
         alt="Credit Card"
         width={240}
         height={240} // Adjust based on your image's aspect ratio
         className="topImageIcon"
         priority
        />
       </div>

        <h2>Analyzing Your Profile...</h2>

        <p className="subtitle">
          Please wait while we find the best credit cards for you
        </p>

        <div className="benefitBox">
          <h3>{benefits[benefitIndex].title}</h3>
          <p>{benefits[benefitIndex].desc}</p>
        </div>

        <div className="steps">
          {/* Personal Details */}
          <div className="stepRow">
            <div className="left">
              <span
                className={`icon ${
                  currentStep === 0
                    ? "progress"
                    : currentStep > 0
                    ? "completed"
                    : ""
                }`}
              >
                {currentStep > 0 ? "✓" : "●"}
              </span>
              <span>Personal Details</span>
            </div>
            <span
              className={
                currentStep === 0
                  ? "progressText"
                  : currentStep > 0
                  ? "completedText"
                  : ""
              }
            >
              {currentStep === 0
                ? "In Progress"
                : currentStep > 0
                ? "Completed"
                : ""}
            </span>
          </div>

          {/* Income Details */}
          <div className="stepRow">
            <div className="left">
              <span
                className={`icon ${
                  currentStep === 1
                    ? "progress"
                    : currentStep > 1
                    ? "completed"
                    : ""
                }`}
              >
                {currentStep > 1 ? "✓" : "●"}
              </span>
              <span>Income Details</span>
            </div>
            <span
              className={
                currentStep === 1
                  ? "progressText"
                  : currentStep > 1
                  ? "completedText"
                  : ""
              }
            >
              {currentStep === 1
                ? "In Progress"
                : currentStep > 1
                ? "Completed"
                : ""}
            </span>
          </div>

          {/* Credit Assessment */}
          <div className="stepRow">
            <div className="left">
              <span
                className={`icon ${
                  currentStep === 2
                    ? "progress"
                    : currentStep > 2
                    ? "completed"
                    : ""
                }`}
              >
                {currentStep > 2 ? "✓" : "●"}
              </span>
              <span>Credit Assessment</span>
            </div>
            <span
              className={
                currentStep === 2
                  ? "progressText"
                  : currentStep > 2
                  ? "completedText"
                  : ""
              }
            >
              {currentStep === 2
                ? "In Progress"
                : currentStep > 2
                ? "Completed"
                : ""}
            </span>
          </div>

          {/* Finding Best Matches */}
          <div className="stepRow">
            <div className="left">
              <span
                className={`icon ${
                  currentStep === 3
                    ? "progress"
                    : currentStep > 3
                    ? "completed"
                    : ""
                }`}
              >
                {currentStep > 3 ? "✓" : "●"}
              </span>
              <span>Finding Best Matches</span>
            </div>
            <span
              className={
                currentStep === 3
                  ? "progressText"
                  : currentStep > 3
                  ? "completedText"
                  : ""
              }
            >
              {currentStep === 3
                ? "In Progress"
                : currentStep > 3
                ? "Completed"
                : ""}
            </span>
          </div>
        </div>

        <div className="progressWrapper">
          <div className="progressBar" style={{ width: `${progress}%` }} />
        </div>

        <div className="percent">{progress}%</div>
      </div>
    </div>
  );
}

export default AnalyzingPage;
