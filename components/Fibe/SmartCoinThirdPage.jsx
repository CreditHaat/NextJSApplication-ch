import React, { useState } from "react";
// import "./PLoanThirdPage.css";
import "./SmartCoinThirdPage.css";
// import ploanimagecorousel3 from "./SmartCoin_Images/ploanimagecorousel3.png";
import ploanimagecorousel3 from "./SmartCoin_Images/ploanimagecorousel3.png";
import axios from "axios";
import Image from "next/image";
import newploanimageone from "./SmartCoin_Images/smartcoin-next-image.png";
import earlysalary from "./SmartCoin_Images/fibepartnetlogo.png";

const SmartCoinThirdPage = ({
  onPrevious,
  mainFormData,
  getLendersList,
  setIsLoadingforLoader,
  ResidentialPincodeFlag,
  getLoanBackend,
  setIsLoading2,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    companyName: "",
    officePincode: "",
    residentialPincode: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === "companyName") {
      // Allow alphanumeric characters, spaces, dots (.), hyphens (-), and commas (,)
      formattedValue = value.replace(/[^a-zA-Z0-9\s.\-,]/g, "");
    } else if (name === "email") {
      // Limit email length to 30 characters
      formattedValue = value.slice(0, 30);
    } else {
      // For other fields like pincode, restrict to numeric characters and max length 6
      formattedValue = value.replace(/\D/, "");
      formattedValue = formattedValue.slice(0, 6);
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });

    // Clear error message when user starts typing again
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateEmail = (email) => {
    // Regular expression for email validation with max length 30 characters
    return /^[A-Za-z0-9._%+-]{1,30}@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/i.test(
      email
    );
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();

    const newErrors = {};

    // Validate Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Validate Company Name
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company Name is required";
    }

    // Validate Office Pincode
    if (!formData.officePincode.trim()) {
      newErrors.officePincode = "Office Pincode is required";
    } else if (
      formData.officePincode.length !== 6 ||
      !/^\d{6}$/.test(formData.officePincode)
    ) {
      newErrors.officePincode = "Invalid pincode format";
    }

    // Validate Residential Pincode (if needed)
    if (ResidentialPincodeFlag) {
      console.log("Residential pincode flag is : ", ResidentialPincodeFlag);
      if (
        formData.residentialPincode &&
        (formData.residentialPincode.length !== 6 ||
          !/^\d{6}$/.test(formData.residentialPincode))
      ) {
        newErrors.residentialPincode = "Invalid pincode format";
      }
    } else {
      console.log(
        "Residential pincode flag is false : ",
        ResidentialPincodeFlag
      );
    }

    // Check for any empty fields
    Object.keys(formData).forEach((key) => {
      if (ResidentialPincodeFlag && !formData[key].trim()) {
        newErrors[key] = "This field is required";
      }
    });

    // Set errors if any validation fails
    setErrors(newErrors);

    // Disable or enable button based on errors
    if (Object.keys(newErrors).length > 0) {
      // There are errors, disable the button
      return;
    }

    // No errors, proceed with form submission or navigation to next step
    console.log("Form submitted:", formData);

    handleAddInfoFormSubmit2(e);
  };

  // Determine button disabled state based on errors
  const isButtonDisabled = Object.keys(errors).some((key) => errors[key]);

  const handleAddInfoFormSubmit2 = async (e) => {
    setIsLoading2(true);
    e.preventDefault();
    try {
      const formData1 = new FormData();
      formData1.append("mobileNumber", mainFormData.mobileNumber);
      formData1.append("email", formData.email);
      formData1.append("pincode", formData.officePincode);
      formData1.append("homePin", formData.residentialPincode);
      formData1.append("companyName", formData.companyName);

      // setIsLoadingforLoader(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}thirdpageNewpersonalloan`,
        formData1
      );

      if (response.data.code === 0) {
        //Here when the code is 0 we are calling lendersList backend which will give us lendersList accrding to user
        // getLendersList(e);
        getLoanBackend(e);
      }

      if (response.status === 200) {
      } else {
        console.error("Submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <>
      <div className="spploancontainer">
        <div className="spploanrow">
          <div className="spploan-col-md-6">
            <div className="spploan-text-container">
              {/* <h1>Quick apply, and reach for the sky!</h1> */}
            </div>
            <div className="spploan-image-container">
              {/* <img src={ploanimagecorousel3} alt="Placeholder" /> */}
              {/* <Image
                src={ploanimagecorousel3}
                width={300}
                height={300}
                layout="intrinsic"
                alt="Image"
              /> */}
              <Image
                  src={earlysalary}
                  width={500}
                  height={500}
                  alt="thirdImage"
                  layout="intrinsic"
                  style={{borderRadius:"10px"}}
                />
            </div>
          </div>
          <div className="spploan-col-md-6-pl">
            <div className="spploan-form-container">
              <h2 style={{textAlign:"center"}}>Work Details</h2>
              <form onSubmit={handleSubmit}>
                <div className="spploan-form-group">
                  <input
                    type="email"
                    className={`spploan-form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="spploan-invalid-feedback">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="spploan-form-group">
                  <input
                    type="text"
                    className={`spploan-form-control ${
                      errors.companyName ? "is-invalid" : ""
                    }`}
                    id="companyName"
                    name="companyName"
                    placeholder="Company name"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                  {errors.companyName && (
                    <div className="spploan-invalid-feedback">
                      {errors.companyName}
                    </div>
                  )}
                </div>
                <div className="spploan-form-group">
                  <input
                    type="text"
                    className={`spploan-form-control ${
                      errors.officePincode ? "is-invalid" : ""
                    }`}
                    id="officePincode"
                    name="officePincode"
                    placeholder="Office pincode"
                    value={formData.officePincode}
                    onChange={handleChange}
                    pattern="[0-9]{6}"
                    maxLength="6"
                    inputMode="numeric"
                  />
                  {errors.officePincode && (
                    <div className="spploan-invalid-feedback">
                      {errors.officePincode}
                    </div>
                  )}
                </div>
                {ResidentialPincodeFlag && (
                  <div className="spploan-form-group">
                    <input
                      type="text"
                      className={`spploan-form-control ${
                        errors.residentialPincode ? "is-invalid" : ""
                      }`}
                      id="residentialPincode"
                      name="residentialPincode"
                      placeholder="Residential pincode"
                      value={formData.residentialPincode}
                      onChange={handleChange}
                      pattern="[0-9]{6}"
                      maxLength="6"
                      inputMode="numeric"
                    />
                    {errors.residentialPincode && (
                      <div className="spploan-invalid-feedback">
                        {errors.residentialPincode}
                      </div>
                    )}
                  </div>
                )}

                <button
                  type="button"
                  className="spploan-prev-btn-primary"
                  onClick={onPrevious}
                >
                  {" "}
                  Previous
                </button>
                <button
                  type="submit"
                  className="spploan-btn-btn-primary"
                  disabled={isButtonDisabled}
                >
                  Submit
                </button>
              </form>

              {/* Error message for empty fields */}
              {Object.keys(errors).length > 0 && (
                <div
                  className="spploan-invalid-feedback"
                  style={{ color: "red" }}
                >
                  Please fill out all required fields.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmartCoinThirdPage;
