import React from 'react'
// import PageCreditScore from '../../components/CreditScore/PageCreditScore';
// import credit from '../../components/Credit/CreditMain';
import Footer from '../../components/Footer';
import NavBar from '../../components/Header1/NavBar';
import dynamic from "next/dynamic";

const Credit = dynamic (
    ()=>import('../../components/Credit/CreditMain'),
    {
      ssr:false,
    }
  )

const page = () => {
  return (
    <div>
      <NavBar/>
      <Credit/>
      <Footer/>
    </div>
  )
}

export default page