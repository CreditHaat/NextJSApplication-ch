"use client";
import React, { useState, useRef, useEffect } from "react";
import "../../components/NewCreditCardFlow/PersonalDetails.css";
import { IoChevronBack } from "react-icons/io5";
import { Poppins } from "next/font/google";
import axios from "axios";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function PersonalDetails({
  params,
  searchParams,
  prefillMobile,
  formData,
  setFormData,
  setActiveContainer,
  setSubscriberNames,
}) {
  const [errors, setErrors] = useState({});
  const [isProfessionOpen, setIsProfessionOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const dropdownRef = useRef(null);
  const dropdownRefPayment = useRef(null);
  const [lastname, setLastname] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [formErrors, setFormErrors] = useState({});


  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfessionOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const professions = ["Salaried", "Self Employed", "Business"];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRefPayment.current &&
        !dropdownRefPayment.current.contains(event.target)
      ) {
        setIsPaymentOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "name") {
      const sanitizedValue = value.replace(/[^a-zA-Z\s]/g, "");
      const capitalizedValue = sanitizedValue
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");

      const nameParts = capitalizedValue.trim().split(" ");
      const fname = nameParts.length > 0 ? nameParts[0] : "";
      const surname =
        nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

      setLastname(surname);
      setFirstName(fname);

      if (capitalizedValue.trim() === "") {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          fullname: "Name is required",
        }));
      } else {
        setFormErrors((prevErrors) => ({ ...prevErrors, name: "" }));
      }

      setFormData((prevData) => ({ ...prevData, [name]: capitalizedValue }));
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      return; // 🔑 raw value se overwrite hone se rokne ke liye
    }

    if (name === "salary") {
      updatedValue = value.replace(/\D/g, "");
    }
    if (name === "pincode") {
      updatedValue = value.replace(/\D/g, "").slice(0, 6);
    }
    if (name === "panNumber") {
      let panValue = value.toUpperCase();
      let formattedValue = "";
      for (let i = 0; i < panValue.length && i < 10; i++) {
        const char = panValue[i];
        if (i < 5) {
          if (/[A-Z]/.test(char)) formattedValue += char;
        } else if (i < 9) {
          if (/[0-9]/.test(char)) formattedValue += char;
        } else {
          if (/[A-Z]/.test(char)) formattedValue += char;
        }
      }
      updatedValue = formattedValue;
    }

    setFormData((prevData) => ({ ...prevData, [name]: updatedValue }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const paymentTypeOptions = [
    { value: "NA", label: "Select Payment Type" },
    { value: "2", label: "Bank Transfer" },
    { value: "1", label: "Cheque" },
    { value: "0", label: "Cash" },
  ];

  function handleDataLayerStart(flag, mobile_number, emptype) {
    console.log("INside handledatalayer , ", flag, mobile_number, emptype);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      mobileNumber: mobile_number,
      flag: flag,
      employmentType: emptype,
    });
  }

  const getPanInputMode = (value) => {
  const len = value.length;
  if (len < 5) return "text";     // first 5 chars: letters
  if (len < 9) return "numeric";  // next 4 chars: digits
  return "text";                  // last char: letter
};

  const handleFormSubmit = async (e) => {
    console.log("Inside this function 1");
    e.preventDefault();
    console.log("Inside this function");
    try {
      const queryParams = new URLSearchParams(location.search);
      // Retrieve values for the specified parameters
      const formData1 = new FormData();
      formData1.append("userPhoneNumber", prefillMobile); // ✅ same as before, untouched
      formData1.append("firstName", firstName);
      formData1.append("lastName", lastname);
      formData1.append("profession", formData.profession);
      formData1.append("income", formData.salary);
      formData1.append("paymentType", formData.paymentType);
      formData1.append("pan", formData.panNumber);
      formData1.append("pincode", formData.pincode);
      formData1.append("fullname", formData.name);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}new_creditcard_secondPage`,
        formData1
      );

      if (
        response.data.code === 0 ||
        response.data.code === 1 ||
        response.data.code === 2 ||
        response.data.code === 3
      ) {
        setActiveContainer("AnalyzingPage");

        const user = response.data.obj.user;
        const subscriberNames = response.data.obj.subscriberNames || [];
        setSubscriberNames(subscriberNames);
        handleDataLayerStart(
          // user.user_exist,
          prefillMobile,
          formData.profession
        );
      }

      if (response.status === 200) {
        // console.error("Submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


//   const handleFormSubmit = (e) => {
//   e.preventDefault();

//   // Skip backend completely
//   setSubscriberNames([]);

//   // Navigate directly to the next page
//   setActiveContainer("AnalyzingPage");
// };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Required";

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!formData.panNumber.trim()) {
      newErrors.panNumber = "Required";
    } else if (!panRegex.test(formData.panNumber)) {
      newErrors.panNumber = "Required";
    }
    if (!formData.salary.trim()) newErrors.salary = "Required";
    if (!formData.profession) newErrors.profession = "Required";
    if (!formData.paymentType) newErrors.paymentType = "Required"; 
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Required";
    } else if (formData.pincode.length !== 6) {
      newErrors.pincode = "Pincode must be 6 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleFormSubmit(e);
    }
  };

  const handleBack = () => {
    setActiveContainer("SendOTP");
  };

  return (
    <div className={`${poppins.className} container2`}>
      <div className="card2">
        <div className="pageHeader">
          <div className="backButton1" onClick={handleBack}>
            <IoChevronBack />
          </div>
          <h1 className="mainHeading1">Let's Find Your Best Card Options</h1>
          <p className="subHeading1">
            A few details help us match you 
            <br />
            with cards that fit your profile
          </p>
        </div>

        <div className="inputGroup">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name As Per PAN"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "errorInput" : ""}
          />
        </div>

        <div className="inputGroup">
          <label>Pan Number</label>
          <input
            type="text"
            name="panNumber"
            placeholder="Enter PAN"
            value={formData.panNumber}
            onChange={handleChange}
            inputMode={getPanInputMode(formData.panNumber)}
            className={errors.panNumber ? "errorInput" : ""}
          />
        </div>

        <div className="dropdown" ref={dropdownRef}>
          <label>Profession</label>
          <div
            className={`dropdownHeader 
    ${errors.profession ? "errorInput" : ""}
    ${formData.profession ? "selectedProfession" : ""}
  `}
            onClick={() => {
              setIsProfessionOpen(!isProfessionOpen);
              setIsPaymentOpen(false);
            }}
          >
            {formData.profession || "Select Profession"}
            <span className="downIcon"></span>
          </div>

          {isProfessionOpen && (
            <div className="dropdownList">
              {professions.map((item) => (
                <div
                  key={item}
                  className="dropdownItem"
                  onClick={() => {
                    setFormData({ ...formData, profession: item });
                    setErrors({ ...errors, profession: "" });
                    setIsProfessionOpen(false);
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="inputGroup">
          <label>Monthly Salary</label>
          <input
            type="tel"
            name="salary"
            placeholder="Enter Salary"
            value={formData.salary}
            onChange={handleChange}
            className={errors.salary ? "errorInput" : ""}
          />
        </div>

        <div className="dropdown" ref={dropdownRefPayment}>
          <label>Payment Type</label>
          <div
            className={`dropdownHeader
      ${errors.paymentType ? "errorInput" : ""}
      ${formData.paymentType ? "selectedpaymentType" : ""}
    `}
            onClick={() => {
              setIsPaymentOpen(!isPaymentOpen);
              setIsProfessionOpen(false);
            }}
          >
            {paymentTypeOptions.find(
              (option) => option.value === formData.paymentType
            )?.label || "Select Payment Type"}
            <span className="downIcon"></span>
          </div>

          {isPaymentOpen && (
            <div className="dropdownList">
              {paymentTypeOptions
                .filter((option) => option.value !== "NA")
                .map((option) => (
                  <div
                    key={option.value}
                    className="dropdownItem"
                    onClick={() => {
                      setFormData({ ...formData, paymentType: option.value });
                      setErrors({ ...errors, paymentType: "" });
                      setIsPaymentOpen(false);
                    }}
                  >
                    {option.label}
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="inputGroup">
          <label>Pincode</label>
          <input
            type="tel"
            name="pincode"
            placeholder="Enter Pincode"
            value={formData.pincode}
            onChange={handleChange}
            className={errors.pincode ? "errorInput" : ""}
          />
        </div>

        <button className="submitBtn" onClick={handleSubmit}>
          Show My Card Options
        </button>

        <div className="whyCardsSection">
            <div className="sectionDivider2">
              <h3>Why do we need these details?</h3>
            </div> 
        <div className="whyCardsList">
       <ul>
         We use your profile to understand which credit cards you are more likely to qualify for and recommend suitable options for your consideration.
      </ul>
    </div>
   </div>

        <div className="secureData">
         <Image
          src="/Security_icon.png"
          alt="Security"
          width={35}
          height={35}
          className="securityIcon"
        />
       <p>Your data is 100% secure</p>
       </div>
      </div>
    </div>
  );
}

export default PersonalDetails;
