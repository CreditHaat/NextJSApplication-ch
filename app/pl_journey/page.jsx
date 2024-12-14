import React from 'react'
import NewPlPage from '../../components/NewPlApplyD/NewPlPage'
import NewPlPage2 from '../../components/NewPlApplyD/NewPlPage2'
import NewPlApplyDS from '../../components/NewPlApplyD/NewPlApplyDS'

function page({params, searchParams}) {
  return (
    <div>
      <NewPlPage params={params} searchParams={searchParams}/>
      {/* <NewPlPage2/> */}
      {/* <NewPlApplyDS/> */}
    </div>
  )
}

export default page
