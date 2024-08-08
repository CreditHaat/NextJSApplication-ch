import React from 'react'
import './css/Advantage.css'
import a from '../../images/1814106_location_map_marker_icon.svg';
import b from '../../images/1814097_clock_schedule_time_icon.svg';
import c from '../../images/9040389_graph_down_arrow_icon.svg';
import d from '../../images/9044975_percentage_icon.svg';


const Advantage = () => {
  return (
    <>
    <section class="container">
      <div class="row" style= {{alignItem:"center"}}>
        <div class="col-md-6">
          <h2 class="advanteg-block_title">
            CreditHaat Advantage
          </h2>
          <p class="advanteg-block_disc">
            We have a variety of loan options to choose from, so you can
            find the perfect one for yourself.
          </p>
          <div class="row">
            <div class="col-md-6">
              <div class="advanteg-item">
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" style={{color:"#3E2780",fill:"currentColor"}}>       
              <image href={a} height="20" width="20"/>
              </svg>
                <h6 class="advanteg-item_title">Pan India</h6>
                <p class="advanteg-item_desc">
                  18000+ pin codes served.
                </p>
                <a href="https://loan.credithaat.com/h5/personal_loan?utm_source=homepage&utm_term=personal_loan&utm_medium=homepageApply4&utm_campaign=amt_pl" class="advanteg-item_link">Apply<i class="bi bi-arrow-right-short"> </i></a>
              </div>
            </div>
       
            <div class="col-md-6">
              <div class="advanteg-item">
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" style={{color:"#3E2780",fill:"currentColor"}}>       
              <image href={b} height="20" width="20"/>
              </svg>
                <h6 class="advanteg-item_title">Fast approval</h6>
                <p class="advanteg-item_desc">
                  Money in your account within 24Hr.
                </p>
                <a href="https://loan.credithaat.com/h5/personal_loan?utm_source=homepage&utm_term=personal_loan&utm_medium=homepageApply3&utm_campaign=amt_pl" class="advanteg-item_link">Apply<i class="bi bi-arrow-right-short"> </i></a>
              </div>
            </div>
        
            <div class="col-md-6">
              <div class="advanteg-item">
              <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" style={{color:"#3E2780",fill:"currentColor"}}>       
              <image href={c} height="15" width="15"/>
              </svg>
                <h6 class="advanteg-item_title">Lowest rates</h6>
                <p class="advanteg-item_desc">
                  Competitive interest rates based on your profile.
                </p>
                <a href="https://loan.credithaat.com/h5/personal_loan?utm_source=homepage&utm_term=personal_loan&utm_medium=homepageApply2&utm_campaign=amt_pl" class="advanteg-item_link">Apply<i class="bi bi-arrow-right-short"> </i></a>
              </div>
            </div>
            <div class="col-md-6">
              <div class="advanteg-item">
              <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" style={{color:"#3E2780",fill:"currentColor"}}>       
              <image href={d} height="15" width="15"/>
              </svg>
                <h6 class="advanteg-item_title">90% loans approved</h6>
                <p class="advanteg-item_desc">
                  Industry’s highest approval rates.
                </p>
                <a href="https://loan.credithaat.com/h5/personal_loan?utm_source=homepage&utm_term=personal_loan&utm_medium=homepageApply1&utm_campaign=amt_pl" class="advanteg-item_link">Apply<i class="bi bi-arrow-right-short"> </i></a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <figure class="figure">
            <img src="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/site-banner-gentlemanpic.png" class="figure-img img-fluid"  alt="..." />
          </figure>
        </div>
      </div>
    </section>
    
    </>
  )
}

export default Advantage