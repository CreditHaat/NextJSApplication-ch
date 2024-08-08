// LendersList.jsx
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import './LendersList.css'; // Importing the CSS file
// import fibeImg from '../images/fibelogo.jpg';
import fibeImg from '../NewPersonalLoanImages/fibelogo.jpg';
import coin from '../NewPersonalLoanImages/SmartCoin.png';
import ltfs from '../NewPersonalLoanImages/ltfs.png';
import axios from 'axios';
import ApplicationLoader from './ApplicationLoader';
import ApplicationPopup from './ApplicationPopup';
import ErrorPopup from './ErrorPopup';


const LendersList = ({ json1, onGetLoan, lenderProduct, setLenderProduct,formData}) => {

  // const [formData2, setFormData2] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [link, setLink] = useState("https://www.google.com");
  const [isCameFromBackend, setIsCameFromBackend] = useState();
  const [lenderName, setlenderName] = useState("NA");

  const [errorPopup, setErrorPopup] = useState(false);


  const getLoanBackend = async (e,productname) => {

    setIsLoading(true);

    e.preventDefault();

    try{
      const formData1 = new FormData();
    formData1.append('mobilenumber', formData.mobileNumber);
    formData1.append('product', productname);

    setlenderName(productname);

    const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}apiExecution`, formData1, {
      headers: {
          'Content-Type': 'application/json',
          'token': 'Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=' // Add your token here
      }
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    

    

    if(response.data.code === 0){
      setIsCameFromBackend(true);
      var redirectionlink = response.data.data.lender_details[0].applicationlink;
      setLink(redirectionlink);
      // {!setIsLoading && <ApplicationPopup link={link}/>}
    }

    if(response.data.code === -1){

      setErrorPopup(true); //This will be true when the code will be -1
    }


    }catch(error){

    }

};



return (
<>
    {!isLoading && isCameFromBackend && <ApplicationPopup link={link} lenderName={lenderName}/>}
    {!isLoading && errorPopup && <ErrorPopup setErrorPopup={setErrorPopup} lenderName={lenderName}/>}
    {isLoading && <ApplicationLoader/>}

    {/* {loadLendersList && <LendersList/>} */}



    <div>
      {json1.lender_details.map((lender, index) => (
        <div key={index} className="card-container">
          <div className="card-content">
          <div className="" style={{width:'50%',float:'left',margin:'auto'}}>
          <div className="text-content" style={{width:'50%',padding:'10px',margin:'auto',marginLeft:'0px'}}>
            <img alt="logo" src={lender.logo} className="logo" style={{display:'flex',justifyContent:'center',width:'100%',height:'auto',maxWidth:'120px',minWidth:'90px'}} />
            </div>
            </div>
            <div className="text-content" style={{width:'50%',float:'right'}}>
              <Typography variant="h5" component="div" className="title" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                {lender.product}
              </Typography>
              <Typography variant="body2" color="textSecondary" className="data" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                {lender.description}
              </Typography>
              </div>
          </div>
          <div className="details">
            <div className="detail">
              <Typography variant="body2" color="textSecondary" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                <span className="detail-label">{lender.maxloanamount}</span> <br />Max Amount
              </Typography>
            </div>
            <div className="detail">
              <Typography variant="body2" color="textSecondary" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                <span className="detail-labels" >{lender.tenure}</span> <br />Tenure
              </Typography>
            </div>
            <div className="detail">
              <Typography variant="body2" color="textSecondary" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                <span className="detail-labels" >{lender.interest}</span> <br />Interest
              </Typography>
            </div>
          </div>
          <div className="action-button">
            {/* <Link to={`/NewPersonalLoan/${lender.product}`} className="getLoanButtonLink"> */}

            {lender.cpi === 1 ? (
              <button onClick={() => window.location.href = lender.applicationlink}
                size="small"
                variant="contained"
                className="getLoanButton"
              >
                Submit Application
              </button>
              ) : (

                <button onClick={(e) => getLoanBackend(e, lender.product)}
                size="small"
                variant="contained"
                className="getLoanButton"
              >
                Submit Application
              </button>
            )}


            {/* </Link> */}
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

// export default LendersList;


export default LendersList;
