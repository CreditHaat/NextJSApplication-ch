import React from 'react'
import Footer from '../../components/Footer'
import NavBar from '../../components/Header1/NavBar'
import dynamic from "next/dynamic";

const BuisnessLoanPage = dynamic (
    ()=>import('../../components/BusinessLoan/BusinessLoanPage'),
    {
      ssr:false,
    }
  )

const page = () => {
  return (
    <div>
      <NavBar/>
      <BuisnessLoanPage/>
      <Footer/>
    </div>
  )
}

export default page