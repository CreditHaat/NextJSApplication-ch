import React from 'react'
// import OtpVerification from '../../components/NewPersonalLoan/Other Components/OTPVerification'
// import OtpMainComponet from '../../components/NewPersonalLoan/Other Components/OtpMainComponent';
import dynamic from "next/dynamic";

const OtpMainComponet = dynamic (
  ()=>import("../../components/NewPersonalLoan/Other Components/OtpMainComponent"),
  {
    ssr:false,
  }
)

const page = () => {
  return (
    <div>
      {/* <OtpVerification/> */}
      <OtpMainComponet/>
    </div>
  )
}

export default page
