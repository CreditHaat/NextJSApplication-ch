import React from 'react'
import a from '../../images/Incred.png';
import b from '../../images/finanace.png';
import c from '../../images/prefer-1.png';
import d from '../../images/tata-img.png';

import Image from 'next/image';

const Partner = () => {
  return (
    <>
        <section class="container usp-home text-center">
                    <div class="row text-center" style={{marginLeft:"0px",marginRight:"0px"}}>
                     <div class="col-md-12">
            <div class="faq-main">
                <div class="faq-main_home"><h1>50+ Partner lenders including</h1></div>
                 </div>
                 <br/>
                    </div>
                  
                    <div class="col-md-6">
                                <div class="row" style={{marginLeft:"0px",marginRight:"0px",
                                justifyContent:"center",flexDirection:'row'}}>
                                    <Image
                src={b}
                width={90}
                height={90}
                style={{ width: "90px", height: "50px", marginRight: "%" }} />
                                    &nbsp;&nbsp;
                                    <Image
                src={d}
                width={110}
                height={40}
                style={{ width: "110px", height: "40px", marginLeft: "30%" }} />
                                </div>
                                </div>
                                <br/><br/>
                           <div class="col-md-6">
                                <div class="row" style={{marginLeft:"0px",marginRight:"0px",
                                justifyContent:"center",flexDirection:'row'}}>
                                <Image
                src={c}
                width={110}
                height={40}
                style={{ width: "110px", height: "60px", marginLeft: "20%" }} />
                                &nbsp;&nbsp;
                                <Image
                src={a}
                width={110}
                height={40}
                style={{ width: "100px", height: "45px", marginLeft: "30%" }} />
                                </div>
                            </div>
                           
                        </div>
         </section>
    </>
  )
}

export default Partner