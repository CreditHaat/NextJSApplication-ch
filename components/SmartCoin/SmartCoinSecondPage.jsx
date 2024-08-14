import React, { useState } from "react";
// import "./PLoanSecondPage.css";
import "./SmartCoinSecondPage.css";
// import ploaniagetwo from "./ProductsImages/ploanimagecorousel2.png";
import ploanimagetwo from "./SmartCoin_Images/ploanimagecorousel2.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { format } from "date-fns";
import Image from "next/image";
import newploanimageone from "./SmartCoin_Images/smartcoin-next-image.png";

const SmartCoinSecondPage = ({ onNext, dobFlag, mainFormData }) => {
  const [formData, setFormData] = useState({
    income: "",
    paymentType: "",
    pan: "",
    dob: "", // Initialize dob as null for react-datepicker
  });
  const minYear = new Date().getFullYear() - 59; // Example: Define minYear here

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Income field allows only numeric input
    if (name === "income" && !/^\d*$/.test(value)) {
      return; // Ignore non-numeric characters
    }

    // PAN field validation
    if (name === "pan") {
      // Remove any non-alphanumeric characters
      const formattedValue = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

      // Validate PAN format
      if (
        formattedValue.length <= 10 &&
        /^[A-Z]{0,5}[0-9]{0,4}[A-Z]?$/.test(formattedValue)
      ) {
        setFormData({
          ...formData,
          [name]: formattedValue,
        });
      }

      // Clear error message when user starts typing again
      setErrors({
        ...errors,
        [name]: "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });

      // Clear error message when user starts typing again
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dob: date,
    });

    setErrors({
      ...errors,
      dob: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", formData);
      handleAddInfoFormSubmit(e);
      onNext(); // Proceed to next step if validation passes
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate Income
    if (!formData.income.trim()) {
      newErrors.income = "Income is required";
      valid = false;
    } else if (!/^\d+$/.test(formData.income)) {
      newErrors.income = "Income should be numeric";
      valid = false;
    } else if (parseInt(formData.income) < 0) {
      newErrors.income = "Income should be positive";
      valid = false;
    }

    // Validate Payment Type (just checking if it's not empty for now)
    if (!formData.paymentType) {
      newErrors.paymentType = "Payment type is required";
      valid = false;
    }

    // Validate PAN
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.pan)) {
      newErrors.pan = "PAN should be in format ABCDE1234F";
      valid = false;
    }

    // Validate DOB
    if (dobFlag && !formData.dob) {
      newErrors.dob = "Date of birth is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleAddInfoFormSubmit = async (e) => {
    console.log("Inside handle Add info form submit");
    // e.preventDefault();
    e.preventDefault();
    try {
      const formData1 = new FormData();
      formData1.append("mobileNumber", mainFormData.mobileNumber);
      formData1.append("pan", formData.pan);
      formData1.append("dob", formData.dob);
      formData1.append("income", formData.income);
      formData1.append("salaryType", formData.paymentType);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}secondpageNewpersonalloan`,
        formData1
      );

      if (response.data.code === 0) {
      }

      if (response.status === 200) {
      } else {
        console.error("Submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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

  return (
    <>
      <div className="pploancontainer">
        <div className="pploanrow">
          <div className="pploan-col-md-6">
            <div className="pploan-text-container">
              {/* <h1>Apply in a flash, and get the cash!</h1> */}
            </div>
            <div className="pploan-image-container">
              {/* <img src={ploaniagetwo} alt="ploanimg" /> */}
              {/* <Image
                src={ploanimagetwo}
                width={500}
                height={500}
                layout="intrinsic"
                alt="secondImage"
              /> */}
              <Image
                  src={newploanimageone}
                  width={800}
                  height={800}
                  alt="secondImage"
                  layout="intrinsic"
                  style={{borderRadius:"10px"}}
                />
            </div>
          </div>
          <div className="pploan-col-md-6-pl">
            <h2 style={{textAlign:"center"}}>Personal Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="pploan-form-group">
                <input
                  type="text"
                  className={`pploan-form-control ${
                    errors.income ? "is-invalid" : ""
                  }`}
                  id="income"
                  name="income"
                  placeholder="Income"
                  value={formData.income}
                  onChange={handleChange}
                  inputMode="numeric"
                />
                {errors.income && (
                  <div className="pploan-invalid-feedback">{errors.income}</div>
                )}
              </div>
              <div className="pploan-form-group">
                <select
                  className={`pploan-form-control ${
                    errors.paymentType ? "is-invalid" : ""
                  }`}
                  id="paymentType"
                  name="paymentType"
                  value={formData.paymentType}
                  onChange={handleChange}
                >
                  <option value="">Select payment type</option>
                  <option value="0">Cash</option>
                  <option value="1">Check</option>
                  <option value="2">Bank transfer</option>
                </select>
                {errors.paymentType && (
                  <div className="pploan-invalid-feedback">
                    {errors.paymentType}
                  </div>
                )}
              </div>
              <div className="pploan-form-group">
                <input
                  type="text"
                  className={`pploan-form-control ${
                    errors.pan ? "is-invalid" : ""
                  }`}
                  id="pan"
                  name="pan"
                  placeholder="PAN"
                  onChange={handleChange}
                  autoCapitalize="characters"
                  value={formData.pan}
                />
                {errors.pan && (
                  <div className="pploan-invalid-feedback">{errors.pan}</div>
                )}
              </div>

              {dobFlag && (
                <div className="pploan-form-group">
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

                  {errors.dob && (
                    <div className="pploan-invalid-feedback">{errors.dob}</div>
                  )}
                </div>
              )}
              <div style={{width:"100%", textAlign:"center"}}>
              <button type="submit" className="pploan-btn-btn-primary">
                Next
              </button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmartCoinSecondPage;
