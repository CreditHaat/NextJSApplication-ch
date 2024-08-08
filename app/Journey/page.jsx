import React from 'react';
// import BaseComponent from '../../components/EmbeddedJourneyList/BaseComponent'
import ServerSidePropsFunction from '../../components/EmbeddedJourneyList/ServerSidePropsFunction';

const Page = ({ params, searchParams }) => {
  return (
    // React Fragment shorthand
    <>
      {/* Commented out JSX */}
      {/* <BaseComponent/> */}
      <ServerSidePropsFunction params={params} searchParams={searchParams}  />
      {console.log(params)}
      {console.log(searchParams.mobilenumber)}
    </>
  );
};

export default Page;
