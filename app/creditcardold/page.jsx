"use client"

import React from 'react'
// import FirstPage from '../../components/CreditCard/FirstPage'
// import { UserProvider } from '../../contexts/UserContext';npm
import { UserProvider } from '../../context/ContextFile'
// import { BrowserRouter } from 'react-router-dom';
import dynamic from "next/dynamic";

const FirstPage = dynamic (
  ()=>import("../../components/CreditCard/FirstPage"),
  {
    ssr:false,
  }
)


const page = () => {
  return (
    <>
    {/* <BrowserRouter> */}
    <UserProvider>
    <div>
        
      <FirstPage/>
    </div>
    </UserProvider>
    {/* </BrowserRouter> */}
    
    </>
  )
}

export default page
