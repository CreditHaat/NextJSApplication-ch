"use client"

import { Accordion, AccordionSummary } from '@mui/material'
import React from 'react'
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import a from '../../images/experian.png';
import b from '../../images/score.jpg';
import './PageCredit.css'


const theme = createTheme({
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          position: 'static' // Remove the box shadow here
        },
      },
    },
  },
});

const PageCreditScore = () => {

  return (
    <>
      <section class="container banner" style={{ paddingBottom: "2%" }}>
        <div class="row">
          <div class="col-md-12 text-end">
            <p class="banner_description" style={{ marginTop: "30px", fontSize: "20px", color: "#858691" }}>
              Credit score powered by.<img src={a} style={{ width: "90px", height: "30px" }} />
            </p>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3" style={{ width: "48%" }}>
            <h1 class="banner_title" style={{ fontSize: '50px' }}>
              <span class="text-cont" style={{ color: "#3E2780", fontSize: '50px' }}>Credit</span><br />
              Score</h1>
            <p class="banner_description" style={{ color: '#858691', fontSize: '30px' }}>
              Check your credit score.
            </p>
          </div>

          <div class="col-md-3" style={{ width: "48%" }}>
            <img class="scoreup" style={{ width: "150px", height: "100px", marginTop: "75px" }} src={b} alt="..." />
          </div>

        </div>
        <div class="row">
          <div class="col-md-6 name" style={{ display: "block" }}>
            <div class="row">
              <div class="col-md-12">
                <div class="input-group mb-3">
                  <input type="text" style={{ display: "block" }} id="nameInputField" required class="form-control" placeholder="First name"
                    aria-label="Enter your firstname" aria-describedby="enterName" name="firstname" />
                </div>
              </div>
              <div class="emsgfirstname" style={{ color: "red", display: "none" }}><p>First name can't be empty</p></div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="input-group mb-3">
                  <input type="text" style={{ display: "block" }} id="nameInputField" required class="form-control" placeholder="Last name"
                    aria-label="Enter your lastname" aria-describedby="enterName" name="lastname" />
                </div>
              </div>
              <div class="emsglastname" style={{ color: "red", display: "none" }}><p>Last name can't be empty</p></div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="input-group mb-3">
                  <input type="number" style={{ display: "block" }} id="mobileInputField" required class="form-control" placeholder="Mobile number"
                    aria-label="Enter your mobile no" aria-describedby="enterMobileNo" name="mobileNumber" />
                </div>
              </div>
              <div class="emsgmobile" style={{ color: "red", display: "none" }}><p>Mobile No can't be empty</p></div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="input-group mb-3">
                  <input type="text" style={{ display: "block" }} id="emailInputField" required class="form-control" placeholder="Email"
                    aria-label="Enter your email" aria-describedby="enterEmail" name="email" />
                </div>
              </div>
              <div class="emsgemail" style={{ color: "red", display: "none" }}><p>Email Id can't be empty</p></div>

            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="input-group mb-3">
                  <input type="text" style={{
                    display: "block", width: "100%", textTransform: "uppercase"
                  }} id="emailInputField" required class="form-control" placeholder="PAN"
                    aria-label="Enter your PAN" aria-describedby="enterEmail" name="pan" />
                </div>
              </div>
              <div class="emsgpan" style={{ color: "red", display: "none" }}><p>PAN can't be empty</p></div>

            </div>

            <div class="col-md-12">
              <div class="input-group mb-3">
                <input id="iagree" type="checkbox" name="iagree" style={{ itemAlign: "left" }} />
                <p style={{ fontSize: "12px", color: "#858691", textAlign: "left" }} class="agreepara scroll">You hereby consent to CreditHaat being appointed as your authorized representative to receive your Credit
                  Information from Experian for the purpose of accessing credit worthiness and availing pre-approved offers (“End Use
                  Purpose”). You hereby agree to <a href="/experianterms">Terms and Conditions.</a> <br />
                  I authorize CreditHaat and its representatives to Call, SMS or
                  communicate via WhatsApp regarding my application. This consent
                  overrides any registration for DNC / NDNC. I confirm I am in India,
                  I am a major and a resident of India and I have read and I accept
                  CreditHaat Privacy Policy Click here to read the <a
                    href="/privacy">PRIVACY POLICY</a>&nbsp;&&nbsp;<a
                      href="/terms">TERMS OF SERVICE</a>
                </p>
              </div>
            </div>

            <div id="msgfailed" style={{ width: "100%", lineHeight: "30px", fontSize: "14px", color: "red", marginTop: "0px", textAlign: "center" }}></div>

            <div class="row send" style={{ display: "block" }}>
              <div class="col-md-12" style={{ buttonColor: "#3e2780" }}>

                <div class="btn btn-primary createaccount-home_btn text-center"
                  style={{
                    marginTop: "20px", width: "100%", background: "#3e2780", color: "#32e70", border: "1px solid #eee",
                    borderRadius: "30px", boxShadow: "5px 5px 5px #eee", textShadow: "none", height: "40px", margin: "auto"
                  }}
                  id="btnsubmit">Send OTP</div>
              </div>
            </div>

            <div class="row sending" style={{ display: "none" }}>
              <div class="col-md-12" style={{ buttonColor: "#3e2780" }}>
                <div
                  class="btn btn-primary btn btn-primary createaccount-home_btn text-center"
                  style={{ width: "100%", marginTop: "20px" }}>
                  <span class="spinner-border spinner-border-sm" role="status"
                    aria-hidden="true"></span> Sending...
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6 otpfield" style={{ display: "none" }}>
            <div class="row">
              <div class="col-md-12">
                <div class="input-group mb-3">
                  <input class="otpclr" type="text" style={{ display: "block", width: "100%" }} id="nameInputField" required placeholder="Enter OTP"
                    aria-label="" aria-describedby="enterOTP" name="otp" />
                </div>

                <div id="msg" style={{ width: "100%", lineHeight: "30px", fontSize: "14px", color: "red", marginTop: "0px", textAlign: "center" }}></div>

              </div>
              <p style={{ color: "#3e2780", textAlign: "center", display: "none" }} id="count"> Resend OTP in <span id="countdowntimer"> 60 </span> Seconds</p>
            </div>
            <div class="row">
              <div class="col-md-12" style={{ buttonColor: "#3e2780" }}>
                <div class="btn btn-primary createaccount-home_btn text-center" style={{ marginTop: "20px", width: "49%", display: "block", float: "left" }} id="btnprev">Previous</div>
                <div class="btn btn-primary createaccount-home_btn text-center" style={{ marginTop: "20px", width: "49%", display: "block", float: "right" }} id="btnsubmitOTP">Submit</div>
                <div class="btn btn-primary createaccount-home_btn text-center" style={{ marginTop: "20px", width: "49%", display: "none", float: "right" }} id="sendotp2">Send OTP</div>
                <div class="btn btn-primary createaccount-home_btn text-center" style={{ marginTop: "20px", width: "49%", display: "none", float: "right" }} id="sendingp2">Sending...</div>
                <div class="btn btn-primary createaccount-home_btn text-center" style={{ marginTop: "20px", width: "49%", display: "none" }} id="btnsubmiting">
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></div>
              </div>
            </div>
          </div>

          <div class="col-md-6 text-center scoredown">
            <figure class="figure">
              <img src={b} style={{ maxWidth: "450px", minWidth: "300px", height: "300px" }} class="figure-img img-fluid banner_img" alt="..." />
            </figure>
          </div>

        </div>
      </section>
      {
        /*
        2nd section below
        */
      }
      <section class="container banner" style={{ paddingTop: "2%" }}>
        <div class="infor">
          <h3 class="banner_title" style={{ fontSize: "20px", color: "#858691" }}>
            What is credit score?
          </h3>
          <p class="banner_title" style={{ fontSize: "20px", color: "#858691" }}>
            A Credit Score, also commonly referred to as Credit Score, is a 3-digit number that represents how well you have managed credit, like a home loan or personal loan or your credit cards, in the past. It is primarily a measure of your ability to borrow - calculated basis your past behavior with credit.<br />

            Simply put, your credit score shows lenders whether you are a reliable borrower or a risky one, and the likelihood of you repaying a new loan responsibly. When you apply for any kind of loan or a credit card, the lender bank or NBFC takes a close look at your credit report and credit history that is maintained in your credit report.

            Your credit score is calculated out of 900. The higher your credit score, the more likely lenders are to approve you for new credit. Usually, a credit score of 750 and above is considered a standard benchmark and preferred by lenders for any kind of loan or a credit card.<br /><br />


            Credit or Credit Information Bureau (India) Limited is a credit bureau that maintains and
            calculates your Credit score. While Credit is the oldest, there are three other credit bureaus in India
            that provide you with your credit report - Experian, CRIF High Mark and Equifax. Each credit bureau
            calculates your credit score independently on the basis of your credit information that is provided to them
            by banks and NBFCs on a regular basis. Each credit bureau has its own model for calculating your credit score; hence,
            your score from each bureau is likely to vary.
          </p>
        </div>
      </section>
      <section class='container' >
        <div class="faq-main_home"><h2>FAQs</h2></div>
        <div class="faq-main_disc text-center">We aim to solve your credit needs - simlpe and hassle free.CreditHaat is a one-stop shop for all your
          credit needs
        </div>

        <div style={{ width: '100%' }}>
          <ThemeProvider theme={theme}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"

              >
                <Typography sx={{
                  fontFamily: 'Noto Sans', fontStyle: 'normal', borderBottomColor: "red", fontWeight: 500, fontSize: '20px',
                  color: '#18181C'
                }}>
                  Why is your Credit Score important?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{
                  fontFamily: 'Noto Sans', fontStyle: 'normal', fontWeight: 500, fontSize: '16px',
                  lineHeight: '27px', letterSpacing: '0.02em', color: '#18181C'
                }}>
                  Your credit score is one of the first things that a lender Bank or NBFC will look at while evaluating your loan or credit card application. In case your Credit score or Credit score is low, the lender might reject the application without even considering it further.<br />
                  If the credit score is high, the lender will look into other details to determine if the applicant is creditworthy. Thus, a good credit score increases the chances of your loan application being approved.<br />
                  However, your credit score is not the only factor considered for a person’s ability to secure new credit. Lenders also take into consideration your income, debt to income ratio, employment history, profession, etc. before approving or rejecting the application.
                  A strong credit score would not only help you access credit, but it may also help reduce your interest outgo for a loan. Many Banks and NBFCs provide preferential low interest rates to applicants with a good credit score.

                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography sx={{
                  fontFamily: 'Noto Sans', fontStyle: 'normal', borderBottomColor: "red", fontWeight: 500, fontSize: '20px',
                  color: '#18181C'
                }}>
                  How is your Credit Score calculated?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{
                  fontFamily: 'Noto Sans', fontStyle: 'normal', fontWeight: 500, fontSize: '16px',
                  lineHeight: '27px', letterSpacing: '0.02em', color: '#18181C'
                }}>
                  Your credit score depends on a lot of factors that a credit bureau takes into consideration while calculating your Credit score. These factors depict your credit behaviour in the past and are reported to Banks and NBFCs every time you apply for a credit product. Some of the key factors that influence your credit score are:<br />
                  <strong>Loan Repayment History:</strong> Timely payments can boost up your credit score and help in improving it significantly. Defaulting on your EMIs or making late payments negatively affects your Credit score. Your loan repayment history has a high impact on your Credit score calculation.<br />
                  <strong>Duration of Credit History:</strong>strong The duration or age of your credit history also affects your credit score. If you have used credit cards/loans for a long period of time and made timely payments on them, then it's a sign of disciplined credit behaviour. It has a medium impact on your credit score.<br />
                  <strong>Number of Hard Inquiries:</strong> Every time you apply for a new credit product, the lender makes an inquiry about your credit score. Such inquiries by lenders and financial institutions are known as hard inquiries. Too many hard inquiries may negatively affect your credit score as it shows you to be credit hungry. Multiple hard enquiries at the same time may have a considerable short-term impact on your credit score.<br />
                  <strong>Credit Utilization Ratio:</strong> The ratio of the credit amount you spend to the credit amount available to you is known as the credit utilization ratio. You should try to refrain from utilising more than 30% of your available credit on a regular basis to have a good credit utilization ratio. Even though having CUR in the range of 60-70% barely has an impact on credit score but having a high credit utilization ratio or maxing out your credit limit frequently indicates a higher dependency on credit and a potentially high repayment burden, which may negatively impact your credit score.<br />
                  <strong>Credit Mix:</strong> If you have taken different kinds of loans like personal loan, auto loan, home loan and have responsibly paid it back, it shows your ability to handle different kinds of credit. Also, if you have taken too many unsecured loans like personal loans, it shows you are credit hungry and are too dependent on credit. This may work against you. However, credit mix has a low impact on your credit score and it’s unlikely that a lender will reject you just because you do not have an optimum mix of credit products.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{
                  fontFamily: 'Noto Sans', fontStyle: 'normal', borderBottomColor: "red", fontWeight: 500, fontSize: '20px',
                  color: '#18181C'
                }}>
                  Benefits of maintaining a High Credit Score
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{
                  fontFamily: 'Noto Sans', fontStyle: 'normal', fontWeight: 500, fontSize: '16px',
                  lineHeight: '27px', letterSpacing: '0.02em', color: '#18181C'
                }}>
                  <div><p>Though credit score is not the only thing that lenders look at when considering a loan or credit card application, it is arguably one of the most important ones. Maintaining a good credit score comes with several benefits that include:<br /><br />

                  Greater chances of your loan applications being approved, as a high Credit score indicates higher creditworthiness and lower risk for the lender</p><br /><br />
                  </div>
                  <div>
                  <ul>
                  <li>You are more likely to receive lower interest rates on loans</li>
                  <li>ou can get easy and quick approval for your loan and credit card applications</li>
                  <li>Access to pre-approved loans based on your eligibility</li>
                  <li>You can avail higher limit on your credit cards</li>
                  <li>Discount on processing fees and other charges</li>
                  </ul>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{
                  fontFamily: 'Noto Sans', fontStyle: 'normal', borderBottomColor: "red", fontWeight: 500, fontSize: '20px',
                  color: '#18181C'
                }}>
                  What to do if your credit score is low?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{
                  fontFamily: 'Noto Sans', fontStyle: 'normal', fontWeight: 500, fontSize: '16px',
                  lineHeight: '27px', letterSpacing: '0.02em', color: '#18181C'
                }}>
                  A low credit score can make it difficult for you to get your loan or credit card applications approved. You can take the following steps and adhere strictly to it to improve your credit score again:<br /><br />
                  Start paying your loan EMIs and credit card bills on time. Do not miss payments under any circumstances.<br />
                  Reduce your excessive dependency on credit and try to reduce your credit utilization ratio, especially if you max out your credit card limit regularly<br /><br />
                  In case of errors in your credit report, get it rectified at the earliest from the credit bureau. For this, you should check your credit score online regularly through Paisabazaar and if there’s a fall, do check the report for errors.<br /><br />
                  Avoid applying for multiple loans or credit cards very frequently. It is advisable to wait for six months from availing the latest credit instrument before you apply for credit again.<br /><br />
                  Avoid closing your oldest credit card. A longer credit history helps lenders take credit-related decisions with more confidence.<br /><br />
                  Keep a good mix of secured (eg. home loan, car loan, etc.) and unsecured credit (personal loan, credit card, etc.) in your profile.<br /><br />
                  Seek expert advice from Paisabazaar’s Credit Advisory Services to improve your credit score significantly.

                </Typography>
              </AccordionDetails>
            </Accordion>
          </ThemeProvider>
        </div>
      </section>
    </>
  )
}

export default PageCreditScore