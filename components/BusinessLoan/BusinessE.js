import React from 'react'

const BusinessE = () => {
  return (
    <>
      <section class="container" id="applyCreditCard">
      <div class=" row" style={{marginTop:"20px"}}>
       
        <div class="col-md-6">
          <div class="createaccount-home_con">
           Business loan eligibility criteria
          </div>
          <div class="createaccount-home_item">
            <p>
             You can access business loan at your convenience.
            </p>
          </div>

           <ol class="eligibility-list">
            <li class="eligibility-list_item">Age - 21 to 62 years</li>
            <li class="eligibility-list_item">
              Minimum monthly income - ₹18,000
            </li>
            <li class="eligibility-list_item">
              Residence - must be a resident of india
            </li>
            <li class="eligibility-list_item">
              Interest rate starting from 15% p.a.
            </li>
          </ol>
        </div>
        <div class="col-md-6">
          <div class="createaccount-home_con">
            Document needed for business loan
          </div>
          <div class="createaccount-home_item">
            <p>
            Grow your business with CreditHaat’s simple process for business loans

           </p>
          </div>

         <ol class="eligibility-list">
            <li class="eligibility-list_item">
              Identity proof
            </li>
            <li class="eligibility-list_item">
              Address proof
            </li>
            <li class="eligibility-list_item">
              Business proof
            </li>
            <li class="eligibility-list_item">
              Photo - selfie
            </li>
            <li class="eligibility-list_item">
              Proof of income - bank statement
            </li>
            <li class="eligibility-list_item">
              <i>Optional - ITR,GST</i>
            </li>
          </ol>
        </div>
        <div class="col-md-12" style={{marginTop:"30px", marginBottom:"-10px"}}>
          <center>
            <a class="footer-link_item" onclick="window.location.href='h5/personalloannew_bureau'">
            <button class="btn btn-primary createaccount-home_btn" style={{borderRadius:"25px",backgroundColor:"#3E2780",textAlign:"left",color:"white"}}>
                Apply business loan</button>
              </a>
          </center>
        </div>
      </div>

    </section>
    </>
  )
}

export default BusinessE