"use client"

import React from 'react'
// import Dialogb from '../../components/CreditCard/Dialogbox';
import { UserProvider } from '../../context/ContextFile'
// import { BrowserRouter } from 'react-router-dom';

import dynamic from "next/dynamic";

const Dialogb = dynamic (
  ()=>import("../../components/CreditCard/Dialogbox"),
  {
    ssr:false,
  }
)

const page = () => {
  return (
    // <BrowserRouter>
    <UserProvider>
    <div>
      <Dialogb/>
    </div>
    </UserProvider>
    // </BrowserRouter>
  )
}

export default page
