const RejectionPageFooter = () => {
    return (
      <>
        <div style={{zIndex: "-2" , backgroundColor:"#3e2780", padding:"25px" , bottom:"0px", marginTop: "60px", textAlign:"center"}}>
          <div className="copy-right container">
            <div className="row">
              <div className="col-sm" style={{ color: "white" }}>
                All rights reserved
              </div>
              <div className="col-sm text-right">
                <a href="https://www.credithaat.com/termsC" style={{ color: "white", textDecoration: "none" }}>
                  Terms of service
                </a>
              </div>
              <div className="col-sm text-right">
                <a href="https://www.credithaat.com/privacy" style={{ color: "white", textDecoration: "none" }}>
                  Privacy policy
                </a>
              </div>
              <div className="col-sm text-right">
                <a href="https://www.credithaat.com/ContactUs" style={{ color: "white", textDecoration: "none" }}>
                  Contact us
                </a>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          .footer {
            background-color: #3e2780;
            padding-top: 30px;
            padding-bottom: 30px;
            color: white;
            text-align: center;
            width: 100%;
            position: relative; /* Default for mobile */
            bottom: auto; /* Default for mobile */
            margin-top: 0; /* Default for mobile */
          }
  
          @media (min-width: 769px) {
            .footer {
              position: absolute; /* Apply only for desktop */
              bottom: 0; /* Apply only for desktop */
              margin-top: auto; /* Apply only for desktop */
            }
          }
        `}</style>
      </>
    );
  };
  
  export default RejectionPageFooter;