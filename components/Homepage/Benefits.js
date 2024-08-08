import React from 'react'
import a from '../../images/9041360_person_check_fill_icon.svg';
import b from '../../images/4280489_outlined_shield_secure_security_icon.svg';
import c from '../../images/9040032_bag_check_icon.svg';

const Benefits = () => {
  return (
    <>
    <section class="container">
    <div class="row">
      <div class="benefits-home">
        <h2>Benefits Of CreditHaat</h2>
      </div>
      <div class="benefits-home_disc">
        Borrow More Money - Simply & Quickly.
      </div>
      <div class="col-md-6 col-lg-4 col-xl-3">
        <div class="benefits-home_list">
          <div class="benefits-home_listf">&#8377;
          </div>
          <div class="benefits-home_lists">
            Flexible loan
          </div>
          <div class="benefits-home_listd">
            Choose from a variety of loans for your needs
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4 col-xl-3">
        <div class="benefits-home_list">
          <div class="benefits-home_listf">
          <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" style={{color:"#3E2780",fill:"currentColor"}}>       
              <image href={a} height="30" width="30"/>
          </svg>
          </div>
          <div class="benefits-home_lists">
            100% digital process to avail loans
          </div>
          <div class="benefits-home_listd">
            Choose from a variety of loans for your needs
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4 col-xl-3">
        <div class="benefits-home_list">
          <div class="benefits-home_listf">
          <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" style={{color:"#3E2780",fill:"currentColor"}}>       
              <image href={b} height="30" width="30"/>
          </svg>
          </div>
          <div class="benefits-home_lists">
            Safe & Secure
          </div>
          <div class="benefits-home_listd">
            Choose from a variety of loans for your needs
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4 col-xl-3">
        <div class="benefits-home_list">
          <div class="benefits-home_listf">
          <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" style={{color:"#3E2780",fill:"currentColor"}}>       
              <image href={c} height="30" width="30"/>
          </svg>
          </div>
          <div class="benefits-home_lists">
            Best rates
          </div>
          <div class="benefits-home_listd">
            Choose from a variety of loans for your needs
          </div>
        </div>
        </div>
      </div></section>

    </>
  )
}

export default Benefits;