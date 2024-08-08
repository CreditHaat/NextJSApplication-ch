import React from 'react'
import './css/Review.css';

const Review = () => {
  return (
    <>
    <section class="user-review_section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <div class="reviw-snap">
              <div class="reviw-snap_img">
                <div class="reviw-profile_card">
                  <div class="reviw-profile_card-img">
                    <img style={{height:"60px",width:"60px"}}
     src="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/Deepak.jpeg" />
                  </div>
                  <div class="reviw-profile_name">
                    <h6>Deepak</h6>
                    <div class="reviw-profile_work">
                      <h6>Engineer</h6>
                    </div>
                  </div>
                </div>
                <div class="reviw-snap_cont">
                  <p style={{fontSize:"auto", display: "flex"}}>
                     Applying for a loan from CreditHaat is so easy and hasselfree. The platform helped me avail a loan of ₹5 Lacs within 4 hours!
                  </p>
                </div>
              </div>
              <div class="reviw-snap_img">
                <div class="reviw-profile_card">
                  <div class="reviw-profile_card-img">
                    <img style={{height:"60px",width:"60px"}} src="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/Ekta.jpeg" />
                  </div>
                  <div class="reviw-profile_name">
                    <h6> Ekta </h6>
                    <div class="reviw-profile_work">
                      <h6>Sales Executive</h6>
                    </div>
                  </div>
                </div>

                <div class="reviw-snap_cont">
                  <p>
                     CreditHaat’s simple application process helped me find the best loan offer. In addition, their helpful loan executives helped me complete the loan application in no time.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="reviw-snap_main">
              What our users have to say
            </div>
            <div class="reviw-snap_disc">
              <p>Thousands have already Successfully used CreditHaat and they have a lot of
                nice things to say about us</p>
            </div>
            <div class="reviw-snap_cont">
              <p>I needed funds to deal with an emergency. With CreditHaat I received money in my account within minutes.</p>
            </div>
            <div class="reviw-profile_card">
              <div class="reviw-profile_card-img">
                <img style={{height:"60px",width:"60px"}} src="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/Santosh.jpeg" />
              </div>
              <div class="reviw-profile_name">
                <h6> Santosh </h6>
                <div class="reviw-profile_work">
                  <h6>Business Man</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  )
}

export default Review