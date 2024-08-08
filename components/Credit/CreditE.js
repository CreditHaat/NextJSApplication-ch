import React from 'react'

const CreditE = () => {
  return (
    <>
      <section class="container" id="applyCreditCard">
      <div class=" row" style={{marginTop:"20px"}}>
       
        <div class="col-md-6">
          <div class="createaccount-home_con">
          Find the best credit card for you        
            </div>
          <div class="createaccount-home_item">
            <p>
             You can access credit card at your convenience.
            </p>
          </div>

           <ol class="eligibility-list">
            <li class="eligibility-list_item">Age - 25 to 60 years</li>                            
            <li class="eligibility-list_item">
              Minimum monthly income - 
              <ul>
                <li>Salaried- ₹18,000</li>     
                <li>Self-employed-₹30,000</li>
              </ul>
            </li>
            <li class="eligibility-list_item">
              Residence - must be a resident of india
            </li>
            
          </ol>
        </div>
        <div class="col-md-6">
          <div class="createaccount-home_con">
          Avail a credit card in hassle free manner</div>
          <div class="createaccount-home_item">
            <p>
            Receive amazing benefits on your credit card
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
            Photo-selfie
            </li>
            <li class="eligibility-list_item">
            Aadhaar and PAN linked to mobile number       
                 </li>
           
          </ol>
        </div>
        <div class="col-md-12" style={{marginTop:"30px", marginBottom:"-10px"}}>
          <center>
            <a class="footer-link_item" onclick="window.location.href='h5/personalloannew_bureau'">
            <button class="btn btn-primary createaccount-home_btn" style={{borderRadius:"25px",backgroundColor:"#3E2780",textAlign:"left",color:"white"}}>
                Apply for Credit Card</button>
              </a>
          </center>
        </div>
      </div>

    </section>
    </>
  )
}

export default CreditE