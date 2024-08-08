import React from 'react'
import Image from 'next/image'

const AcquisitionPartner = () => {
  return (
     <>
<main>
     <section class="container banner" style={{paddingTop:"8%",paddingBottom:"8%"}}>
      <div class="row">
        <div class="col-md-6">
           <h1>
          <span class="text-cont" style={{color: "#3E2780"}}>Acquisition</span><br/>
            partner
          </h1>
        </div>
        <div class="col-md-6 text-center">
          <figure class="figure">
            <a href="https://india1payments.in/">
            {/* <img src="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/India1-Logo.png" class="figure-img img-fluid banner_img" alt="..." /> */}
            <Image
             src="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/India1-Logo.png"
             className="figure-img img-fluid banner_img"
             width={400}
             height={300}
             layout="intrensic"
             alt="..."/>
            </a>
          </figure>
        </div>
      </div>
    </section>
  </main>

    </>
  )
}

export default AcquisitionPartner