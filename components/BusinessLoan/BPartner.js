import React from 'react'
import b from '../../images/finanace.png';
import d from '../../images/tata-img.png';
import a from '../../images/INDI.png';
import c from '../../images/loan-fl.png';

import Image from 'next/image';



const BPartner = () => {
  return (
    <>
      <section class="container usp-home text-center">
        <div class="row text-center" style={{ marginLeft: "0px", marginRight: "0px" }}>
          <div class="col-md-12">
            <div class="faq-main">
              <div class="faq-main_home"><h1>50+ Partner lenders including</h1></div>
            </div>                                                                                                                                                                                                                
            <br />
          </div>

          <div class="col-md-6">
            <div class="row" style={{
              marginLeft: "0px", marginRight: "0px",
              justifyContent: "center", flexDirection: 'row'
            }}>
              {/* <img  src={b} 
                                    style={{width:"90px", height:"50px", marginRight:"%"}}  viewBox="0 0 16 16"/> */}
              <Image
                src={b}
                width={90}
                height={90}
                style={{ width: "90px", height: "50px", marginRight: "%" }} />
              &nbsp;&nbsp;
              {/* <img  src={d} 
                                    style={{width:"110px", height:"40px",marginLeft:"30%"}} viewBox="0 0 16 16"/> */}
              <Image
                src={d}
                width={110}
                height={40}
                style={{ width: "110px", height: "40px", marginLeft: "30%" }} />
            </div>
          </div>
          <br /><br />
          <div class="col-md-6">
            <div class="row" style={{
              marginLeft: "0px", marginRight: "0px",
              justifyContent: "center", flexDirection: 'row'
            }}>
              {/* <img  src={c}
                                style={{width:"80px", height:"50px", marginRight:"30%"}} viewBox="0 0 16 16"/> */}

              <Image
                src={c}
                width={80}
                height={50}
                style={{ width: "80px", height: "50px", marginRight: "30%" }} />
              &nbsp;&nbsp;
              {/* <img src={a}
                style={{ width: "80px", height: " 45px" }} viewBox="0 0 16 16" /> */}
                <Image
                src={a}
                width={80}
                height={45}
                style={{ width: "80px", height: "45", marginRight: "30%" }} />
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default BPartner