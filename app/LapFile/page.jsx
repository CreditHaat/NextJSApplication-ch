import React from 'react'
import LapSuccessPage from '../../components/LapFile/LapSuccessPage'
import LapPage from '../../components/LapFile/LapPage'
function page({params, searchParams}) {
  return (
    // <LapSuccessPage/> 
    <LapPage searchParams={searchParams}/>
  )
}

export default page