import React from 'react'

const Eligibility = () => {
  return (
    <>
      <section class="container" id="applyCreditCard">
      <div class=" row" style={{marginTop:"20px"}}>
       
        <div class="col-md-6">
          <div class="createaccount-home_con">
           Personal loan eligibility criteria
          </div>
          <div class="createaccount-home_item">
            <p>
             You can access personal loan at your convenience.
            </p>
          </div>

           <ol class="eligibility-list">
            <li class="eligibility-list_item">Age - 21 to 62 years</li>
            <li class="eligibility-list_item">
              Minimum monthly income - ₹12,000
            </li>
            <li class="eligibility-list_item">
              Residence - must be a resident of india
            </li>
            <li class="eligibility-list_item">
              Interest rate starting from 10.99% p.a.
            </li>
          </ol>
        </div>
        <div class="col-md-6">
          <div class="createaccount-home_con">
            Document needed for personal loan
          </div>
          <div class="createaccount-home_item">
            <p>
              Avail hassle free loans from CreditHaat’s simple process and minimum documentation
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
              <i>Optional - salary slip</i>
            </li>
          </ol>
        </div>
        <div class="col-md-12" style={{marginTop:"30px", marginBottom:"-10px"}}>
          <center>
            <a class="footer-link_item" onclick="window.location.href='h5/personalloannew_bureau'">
            <button class="btn btn-primary createaccount-home_btn" style={{borderRadius:"25px",backgroundColor:"#3E2780",textAlign:"left",color:"white"}}>
                Apply personal loan</button>
              </a>
          </center>
        </div>
      </div>

    </section>
    </>
  )
}

export default Eligibility