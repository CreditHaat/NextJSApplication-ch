import React from 'react'
import Footer from '../../components/Footer'
import NavBar from '../../components/Header1/NavBar'
import dynamic from "next/dynamic";

const PersonalLoanPage = dynamic (
    ()=>import('../../components/PersonalLoan/PersonalLoanPage'),
    {
      ssr:false,
    }
  )

const page = () => {
  return (
    <div>
      <NavBar/>
      <PersonalLoanPage/>
      <Footer/>
    </div>
  )
}

export default page