import CreditCardFirstPage from '../../components/CreditCardJourney/CreditCardFirstPage'
import React from 'react'
import CreditCardList from "../../components/CreditCardJourney/CreditCardList";

function page({params, searchParams}) {
  return (
    <div>
      <CreditCardFirstPage params={params} searchParams={searchParams}/>
      {/* <CreditCardList/> */}
    </div>
  )
}

export default page

