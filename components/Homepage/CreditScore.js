import React from 'react';
import sm from '../../images/sm1.png';

const CreditScore = () => {
  return (
    <>
    <section class="container" id="applyPersonalLoan">
    <div class="row">
      <div class="col-md-12">
        <h2 class="createaccount-home_section">
          Credit score
        </h2>
        <p class="createaccount-home_disc">
          Check your credit score report absolutely FREE
        </p>
      </div>
      <div class="col-md-6">
        <div class="createaccount-home_con">
          Let our algorithms help you
        </div>
        <div class="createaccount-home_item">
          <p>
            You can access credit score at your convenience.
          </p>
        </div>

        <ol class="eligibility-list">
          <li class="eligibility-list_item">Reduce rates on your existing Loans.</li>
          <li class="eligibility-list_item">
             Suggest Better Rewards Credit Cards.
          </li>
          <li class="eligibility-list_item">
            Tips on Improving Credit Score.
          </li>
          <li class="eligibility-list_item">
            Credit score requires accurate details to ensure accuracy & security.
          </li>
        </ol>
      </div>
      
       <div class="col-md-6 text-center">
        <figure class="figure">
          <img src={sm} style={{width:"320px",height:"200px"}}  alt="..." />   
        </figure>
      </div> 
        <div class="col-md-12" style={{textAlign:"center"}}>
          <a class="footer-link_item" href="/score">
          <button class="btn  createaccount-home_btn"
           style={{borderRadius:"25px",backgroundColor:"#3E2780",textAlign:"left",color:"white"}}>
            Check credit score</button>
        </a>
          </div>

      </div>
  </section>
    </>
  )
}

export default CreditScore