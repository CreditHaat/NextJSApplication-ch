import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import './LendersList.css'; // Ensure this file is correctly imported and styled
import adityabirlaimage from './BLApplyImages/adityabirlaimage.png';
import axios from 'axios';
import ApplicationPopup from './ApplicationPopup';
import ApplicationLoader from './ApplicationLoader';
import ErrorPopup from './ErrorPopup';

function LendersList({ companies, formData, redirectLinkMethod, getLoanBackendMethod }) {
    const [showConfetti, setShowConfetti] = useState(false);

    // --------------------------Usestates for backend -----------------------------------------------------------------
    const [link, setLink] = useState('www.google.com');
    // const [isLoading, setIsLoading] = useState(false);
    const [lenderName, setlenderName] = useState(null);
    const [isCameFromBackend, setIsCameFromBackend] = useState(false);
    const [errorPopup, setErrorPopup] = useState(false);

    const [aplicationLink, setApplicationLink] = useState(null);
    const [cpi, setCpi] = useState('0');

    // -----------------------------------------------------------------------------------------------------------------

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowConfetti(false);
        }, 2000); // Stop confetti after 3 seconds

        return () => clearTimeout(timeout);
    }, []);

    // Handle undefined or null companies prop
    if (!companies || companies.length === 0) {
        return (
            <div className="congratulations-container">
                <div className="congratulations-message">
                    <h3>🎉 Congrats, Money Maestro! 🎉</h3><br></br>
                    <p>Form filled flawlessly! Pick your champion and let's <br></br>get that cash dash started! 💸🏃‍♂️</p>
                </div>
                <div className="company-names">
                    <div className='company-names-first'>
                        <img src={adityabirlaimage} alt='Lenderimage'></img>
                        <p>Aditya Birla Capital</p>
                        <hr className="company-divider" />
                    </div>
                    <div className='company-names-second'>
                        <p> You are pre-approved for</p>
                        <h4>Max-Loan Amount-500000</h4>
                    </div>
                    <div>
                        <button className="congraths-button">Continue</button>
                    </div>
                </div>
                {/* Render celebratory confetti */}
                {showConfetti && (
                    <div className="confetti-container">
                        {[...Array(100)].map((_, index) => (
                            <div key={index} className="confetti-piece" style={{ left: `${Math.random() * 100}vw`, top: `${Math.random() * 100}vh`, backgroundColor: getRandomColor(), transform: `rotate(${Math.random() * 360}deg)` }} />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    const getLoanBackend = async (e,productname) => {

        console.log("Inside get loan backend");

        setIsLoading(true);
    
        e.preventDefault();
    
        try{
          const formData1 = new FormData();
        formData1.append('mobilenumber', formData.mobileNumber);
        formData1.append('product', productname);
    
        setlenderName(productname);

        console.log("product name is T_ : ",productname);
    
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}apiExecution`, formData1, {
          headers: {
              'Content-Type': 'application/json',
              'token': 'Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=' // Add your token here
          }
        });

        console.log("after backend");
    
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);

        if(response.data.code === 0){
            console.log("inside when code is 0 ");
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

    // Render when there are loan providers
    return (
        <>
        {/* {!isLoading && isCameFromBackend && <ApplicationPopup link={link} lenderName={lenderName}/>} */}
        {/* {!isLoading && errorPopup && <ErrorPopup setErrorPopup={setErrorPopup} lenderName={lenderName}/>} */}
        {/* {isLoading && <ApplicationLoader/>} */}

        <div className="congratulations-container" style={{padding:"0px"}}>
            {/* <div className="congratulations-message">
                <h1>🎉 Congrats, Money Maestro! 🎉</h1>
                <p>Form filled flawlessly! Pick your champion and let's get that cash dash started! 💸🏃‍♂️</p>
            </div> */}
            {/* <div className="company-names"> */}
                {/* <h2>Loan providers:</h2> */}
                <ul style={{listStyle:"none", padding:"0px"}}>
                    {companies.lender_details.map((company, index) => (
                        <li key={index}>
                            <div className="company-names">
                                <div className='company-names-first'>
                                    <img src={company.logo} alt='Lenderimage'></img>
                                    <p>{company.product}</p>
                                    <hr className="company-divider" />
                                </div>
                                <div className='company-names-second'>
                                    <p> You are pre-approved for</p>
                                    <h4>Max-Loan Amount-{company.maxloanamount}</h4>
                                </div>
                                <div>
                                    {company.cpi === 1 ? (
                                        
                                        // <button style={{backgroundColor: "#fdc638", color:"#3e2780"}} onClick={() => window.location.href = company.applicationlink}
                                        <button style={{backgroundColor: "#fdc638", color:"#3e2780"}} onClick={()=>redirectLinkMethod(company.applicationlink)}
                                            size="small"
                                            variant="contained"
                                            className="congraths-button"
                                        >
                                            Select
                                            {/* Submit Application */}
                                        </button>
                                    ) : (

                                        // <button onClick={(e) => getLoanBackend(e, company.product)}
                                        <button style={{backgroundColor: "#fdc638", color:"#3e2780"}} onClick={(e) => getLoanBackendMethod(e, company.product)}
                                            size="small"
                                            variant="contained"
                                            className="congraths-button"
                                        >
                                            Select
                                            {/* Submit Application */}
                                        </button>
                                    )}
                                    {/* <button className="congraths-button">Continue</button> */}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            {/* </div> */}
            {/* Render celebratory confetti */}
            {showConfetti && (
                <div className="confetti-container">
                    {[...Array(100)].map((_, index) => (
                        <div key={index} className="confetti-piece" style={{ left: `${Math.random() * 100}vw`, top: `${Math.random() * 100}vh`, backgroundColor: getRandomColor(), transform: `rotate(${Math.random() * 360}deg)` }} />
                    ))}
                </div>
            )}
        </div>
        </>

    );
}

// Function to generate random colors for confetti
function getRandomColor() {
    const colors = ['#FFD700', '#FF6347', '#ADFF2F', '#8A2BE2', '#FF69B4'];
    return colors[Math.floor(Math.random() * colors.length)];
}

export default LendersList;
