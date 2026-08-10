"use client";
import React, { useState } from "react";
import SendOTP from "../../components/NewCreditCardFlow/SendOTP";
import PersonalDetails from "../../components/NewCreditCardFlow/PersonalDetails";
import AnalyzingPage from "../../components/NewCreditCardFlow/AnalyzingPage";
import EligibleCards from "../../components/NewCreditCardFlow/EligibleCards";
import CardDetails from "../../components/NewCreditCardFlow/CardDetails";

function Page({ params, searchParams }) {
  const [activeContainer, setActiveContainer] = useState("SendOTP");
  const [mobile, setMobile] = useState("");
  const [subscriberNames, setSubscriberNames] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    panNumber: "",
    salary: "",
    profession: "",
    paymentType: "",
    pincode: "",
    fullname: "",
  });

  return (
    <div>
      {activeContainer === "SendOTP" && (
        <SendOTP
          params={params}
          searchParams={searchParams}
          mobile={mobile}
          setMobile={setMobile}
          setActiveContainer={setActiveContainer}
        />
      )}

      {activeContainer === "PersonalDetails" && (
        <PersonalDetails
          prefillMobile={mobile}
          formData={formData}
          setFormData={setFormData}
          setActiveContainer={setActiveContainer}
          setSubscriberNames={setSubscriberNames}
        />
      )}

      {activeContainer === "AnalyzingPage" && (
        <AnalyzingPage
          setActiveContainer={setActiveContainer}
          mobile={mobile}
          subscriberNames={subscriberNames}
        />
      )}

      {activeContainer === "EligibleCards" && (
        <EligibleCards
          setActiveContainer={setActiveContainer}
          mobilenumber={mobile}
          subscriberNames={subscriberNames}
        />
      )}

      {activeContainer === "CardDetails" && (
        <CardDetails
          setActiveContainer={setActiveContainer}
          mobileno={mobile}
        />
      )}
    </div>
  );
}

export default Page;
