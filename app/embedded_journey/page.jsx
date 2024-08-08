// import BaseComponent from '../../components/EmbeddedJourneyList/BaseComponent'
import React from 'react'
import ServerSidePropsFunction from '../../components/EmbeddedJourneyList/ServerSidePropsFunction';

const page = ({ params, searchParams }) => {
  return (
    <div>
      {/* <BaseComponent/> */}
      <ServerSidePropsFunction params={params} searchParams={searchParams}  />
    </div>
  )
}

export default page
