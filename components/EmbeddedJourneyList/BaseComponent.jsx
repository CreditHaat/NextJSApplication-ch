import React from 'react'
import CHEmbeddedList from './CHEmbeddedList';
import EmbeddedListNavbar from './EmbeddedListNavbar';
import CompanyPerformance from './CompanyPerformance';

const BaseComponent = () => {
  return (
    <div>
        <EmbeddedListNavbar/>
        <div className='Performanceheader' style={{marginTop:'3px', marginBottom:'15px'}}>
            <CompanyPerformance/>
          </div>
      <CHEmbeddedList/>
    </div>
  )
}

export default BaseComponent
