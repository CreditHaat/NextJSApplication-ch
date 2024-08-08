import React from 'react'
import GROFile from '../../components/GRO/GROFile';
import Footer from '../../components/Footer'
import NavBar from '../../components/Header1/NavBar'

const page = () => {
  return (
    <div>
      <NavBar/>
      <GROFile/>
      <Footer/>
    </div>
  )
}

export default page
