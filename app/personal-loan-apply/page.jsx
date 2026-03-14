import React from 'react'
import NewPlPage from '../../components/Pl_New_journey/SecondPage'
import NewPlPage2 from '../../components/Pl_New_journey/ThirdPagePl'
import NewPlApplyDS from '../../components/Pl_New_journey/PlApplyDS'
import FirstPage from '../../components/Pl_New_journey/FirstPage'

function page({params, searchParams}) {
  return (
    <div>
      <FirstPage params={params} searchParams={searchParams}/>

      {/* <Plpagefirst params={params} searchParams={searchParams}/> */}
      {/* <NewPlPage/> */}
      {/* <NewPlApplyDS/> */}
      {/* <NewPlPage2/> */}
    </div>
  )
}

export default page
