
const Footer = () => {
  return (<>
    <footer class="footer" style={{backgroundColor:"#F2EDFF80",marginTop:"50px",paddingTop:"30px",paddingBottom:"30px"}}>
    <section class="container">
      <div class="row" style={{flexDirection:'row'}}>
      
        <div class="col-lg-4">
          <h5 class="footer-logo">CreditHaat</h5>
          <strong class="footer-disc">Borrow more-simply and quickly</strong>
        </div>
       <div class="col-6 col-sm-3 col-lg-2">
          <b>Product</b>
          <ul class="footer-link">

            <li class="footer-link_item">
              <a class="footer-link_item" href="/personal">Personal loan</a>
            </li>
            <li class="footer-link_item">
              <a class="footer-link_item" href="/business">Business loan</a>
            </li>
            <li class="footer-link_item">
              <a class="footer-link_item" href="/credit">Credit card</a>
            </li>
            <li class="footer-link_item">
              <a class="footer-link_item" href="/upcoming">Upcoming products</a>
            </li>
          </ul>
        </div>
        <div class="col-6 col-sm-3 col-lg-2">
          <b>Resource</b>
          <ul class="footer-link">
            <li class="footer-link_item">
              <a class="footer-link_item" href="/faq">FAQs</a>
            </li>
            <li class="footer-link_item">
              <a class="footer-link_item" href='/lending'>Lending partners</a>
            </li>
            <li class="footer-link_item">
              <a class="footer-link_item" href="/acquisition">Acquisition partners</a>
            </li>
            <li class="footer-link_item">
              <a class="footer-link_item" href="/gro">Grievance Redressal Process</a>
            </li>
            <li class="footer-link_item">
              <a class="footer-link_item" href="score">Credit score</a>
            </li>
          </ul>
        </div>
        <div class="col-6 col-sm-3 col-lg-2">
          <b>Social</b>
          <ul class="footer-link">
            <li class="footer-link_item">
              <a class="footer-link_item" href="https://www.facebook.com/CreditHaat">Facebook</a>
            </li>
            <li class="footer-link_item">
              <a class="footer-link_item" href="https://www.linkedin.com/company/credithaat/">Linkedin</a>
            </li>
          </ul>
        </div>

      </div>
    </section>
    
    
    <div class="copy-right container">
      <div class="row">
        <div class="col-sm">
          &#169;2022 CreditHaat.
        </div>
        <div class="col-sm">All righs reserved
        </div>
        <div class="col-sm text-right">
          <a href="/terms">Terms of service</a>
        </div>
        <div class="col-sm text-right">
          <a href="/privacy">Privacy policy</a>
        </div>
        <div class="col-sm text-right">
          <a href="/support">Contact Us</a>
        </div>
      </div>
    </div>
  </footer>

  <style>
    {
      `
        a{
          text-decoration: none;
          color:inherit;
        }
      `
    }
  </style>

  </>

  )
}

export default Footer