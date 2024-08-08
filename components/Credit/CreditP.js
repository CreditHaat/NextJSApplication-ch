import React from 'react'
import a from '../../images/yes_bank-1.png';
import b from '../../images/asus.png';
import c from '../../images/first.jpg';
import Image from 'next/image'


const CreditP = () => {
  return (
    <>
      <section class="container usp-home text-center">
        <div class="row text-center" style={{ marginLeft: "0px", marginRight: "0px" }}>
          <div class="col-md-12" >
            <div class="faq-main">
              <div class="faq-main_home"><h1>50+ Partner lenders including</h1></div>
              <br />
            </div>
          </div>

          <div class="col-md-12">
            <div class="container text-center">
              <div class="row">
                <div class="col">
                <Image
                src={a}
                alt="Description of the image"
                width={100}
                height={50}
              // layout="responsive"
              // objectFit="contain"
              />
                </div>
                <div class="col">
                <Image
                src={b}
                alt="Description of the image"
                width={100}
                height={50}
              // layout="responsive"
              // objectFit="contain"
              />
                </div>
                <div class="col">
                <Image
                src={c}
                alt="Description of the image"
                width={100}
                height={50}
              // layout="responsive"
              // objectFit="contain"
              />
                </div>
              </div>
            </div>
            
          </div>

          <div class="col-md-6" style={{ marginLeft: "0px", marginRight: "0px", justifyContent: "center" }}>
            <div class="row" style={{ marginLeft: "0px", marginRight: "0px", justifyContent: "center" }}>

            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default CreditP