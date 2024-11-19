import React from 'react'
import SuccessPage from '../../components/SuccessPage/SuccessPage'
function page({params, searchParams}) {
  return (
    <div style={{fontFamily:"sans-serif"}}>
      <SuccessPage params={params} searchParams={searchParams}/>
    </div>
  )
}

export default page
