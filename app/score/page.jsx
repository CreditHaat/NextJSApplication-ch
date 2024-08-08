import React from 'react'
// import PageCreditScore from '../../components/CreditScore/PageCreditScore';
import Footer from '../../components/Footer'
import NavBar from '../../components/Header1/NavBar'
import dynamic from "next/dynamic";

const PageCreditScore = dynamic (
    ()=>import('../../components/CreditScore/PageCreditScore'),
    {
      ssr:false,
    }
  )

const page = () => {
  return (
    <div>
      <NavBar/>
      <PageCreditScore/>
      <Footer/>
    </div>
  )
}

export default page