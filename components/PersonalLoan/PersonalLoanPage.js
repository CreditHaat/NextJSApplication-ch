"use client"

import React from 'react'
import FAQ from '../Homepage/FAQ'
import Review from '../Homepage/Review'
import Partner from './Partner'
import Fourdiv from '../Homepage/Fourdiv'
import Eligibility from './Eligibility'
import FirstC from './FirstC'

const PersonalLoanPage = () => {
  return (
    <>
    <br/>
    <FirstC/>
    
    <Fourdiv/>
    <br/><br/>
    <Eligibility/>
    <br/><br/>
    <Review/>
    <br/><br/>
    <FAQ/>

    <Partner/>
    </>
  )
}

export default PersonalLoanPage;