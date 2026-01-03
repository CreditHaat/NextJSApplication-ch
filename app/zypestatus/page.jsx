import React from 'react'
import { Suspense } from "react";
import ZypeStatus from '../../components/ZypeStatus/ZypeStatus'
function page() {
  return (
    <Suspense>
    <div style={{fontFamily:"sans-serif"}}>
      <ZypeStatus/>
    </div>
    </Suspense>
  )
}

export default page
