"use client"
import React from 'react'
// import List from '../../components/CreditCard/ListPage';

import dynamic from "next/dynamic";

const List = dynamic (
  ()=>import("../../components/CreditCard/ListPage"),
  {
    ssr:false,
  }
)

const page = () => {
  return (
    <div>
      <List/>
    </div>
  )
}

export default page
