"use client"

import card_img from '../../images/hdfc-card.jpg';
import {Button, Typography } from '@mui/material'; 
import React, { useEffect, useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import logo from '../../images/hdfc-logo..png'



const ListPage = () => {

  const [storedUserData, setStoredUserData] = useState(sessionStorage.getItem('sucessData'));

//   if (typeof window !== 'undefined') {
//     // Code that accesses sessionStorage
//     console.log("Inside");
//     setStoredUserData(sessionStorage.getItem('sucessData'));
//     // const mydata = JSON.parse(storedUserData);
//     // Rest of your code
// }else{
//   // const storedUserData = null;
  
// }

const mydata = JSON.parse(storedUserData);

  // const storedUserData = sessionStorage.getItem('sucessData');
  

  useEffect(() => {
    // Generate confetti CSS dynamically
    let css = '';
    const colors = ['#d13447', '#ffbf00', '#263672', '#7b2cbf', '#2eb67d', '#ff7f50', '#6495ed', '#ffd700', '#ff69b4', '#32cd32']; // Add more colors here

    for (let i = 0; i <= 150; i++) {
      const width = Math.random() * 8;
      const height = width * 0.4;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const top = '-10%';
      const left = `${Math.random() * 100}%`;
      const opacity = Math.random() + 0.5;
      const rotation = Math.random() * 360;
      const animationDuration = 4 + Math.random();
      const animationDelay = Math.random();
      
      css += `
        .confetti-${i} {
          width: ${width}px;
          height: ${height}px;
          background-color: ${color};
          top: ${top};
          left: ${left};
          opacity: ${opacity};
          transform: rotate(${rotation}deg);
          animation: drop-${i} ${animationDuration}s ${animationDelay}s infinite;
          position: absolute;
        }
        .background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(#ffdd9d4d, #b385f091); /* Specify the linear gradient */
          z-index: -1;
        }
        @keyframes drop-${i} {
          100% {
            top: 110%;
            left: calc(${left} + ${Math.random() * 15}%);
          }
        }
      `;
    }



    // Create a style element and add generated CSS to it
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    // Prevent scrolling
    document.body.style.overflow = 'hidden';
    // No cleanup function needed
  }, []);
  
  return (
    <div style={{background:'linear-gradient(rgb(0 0 0 / 7%), rgb(153 153 153 / 17%))', overflowY: 'auto', maxHeight: '100vh'}}>
      <div className="wrapper">
        {Array.from({ length: 150 }, (_, i) => (
          <div key={i} className={`confetti-${i}`} >
            </div>
        ))}</div> 
    <div className="semilcircle-container">
    <div className="semilcircle"></div>
  </div>
  <div className="content" style={{marginTop:'-50px'}}>
    <h1 style={{ fontFamily: 'Raleway', textAlign: 'center', fontWeight: 600, color: 'rgba(70,68,68,0.90)' }}>
      Congratulations
    </h1>
    <p style={{ fontFamily: 'Raleway', textAlign: 'center', fontWeight: 300, color: 'rgba(0,0,0,0.98)' }}>
      Your ideal credit card lineup is here!<br />
      Choose the one that fits you perfectly.
    </p>
  </div> <br/>
  

  <div className="heading-container">
    <span className="section heading" style={{fontWeight:'bold'}}>Postpaid Cards</span>
    </div>
  <div className="card-container" style={{ padding: '50px 0' }}>
  {mydata.data.lender_details.filter(lender => lender.card_type === 1).map((lender, index) => (
    <div key={index} className="card" style={{ margin: '10px', borderRadius: '10px', background: 'linear-gradient(rgb(217 217 217 / 49%), rgb(115 115 115 / 89%))', maxWidth:'400px', maxHeight:'auto', minWidth:'350px',minHeight:'auto'  }}>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', width: '50%', padding: '15px', justifyContent: 'center', margin: 'auto' }}>
          <div style={{ width: '100%', height: '60%', padding: '10px' }}>
            <img src={lender.logo} alt='creditlogo' style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
        <div style={{ display: 'flex', width: '50%', padding: '15px', justifyContent: 'center', margin: 'auto' }}>
          <div style={{ width: '100%', height: '100%', padding: '10px' }}>
            <img src={lender.card_img} alt='creditlogo' style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', padding: '10px', marginTop: 'auto' }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '20px', fontFamily:'Raleway', height: '20px', backgroundColor: 'gray', borderRadius: '50%', marginRight: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span>&#10003;</span>
            </div>
            {lender.point_one}
          </li>
          <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '20px', fontFamily:'Raleway', height: '20px', backgroundColor: 'gray', borderRadius: '50%', marginRight: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span>&#10003;</span>
            </div>
            {lender.point_two}
          </li>
          <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '20px', fontFamily:'Raleway', height: '20px', backgroundColor: 'gray', borderRadius: '50%', marginRight: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span>&#10003;</span>
            </div>
            {lender.point_three}
          </li>
          <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '20px', fontFamily:'Raleway', height: '20px', backgroundColor: 'gray', borderRadius: '50%', marginRight: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span>&#10003;</span>
            </div>
            {lender.point_four}
          </li>
        </ul>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'column' }}>
        <div style={{ backgroundColor: 'blueviolet', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', height: '40px', width: '120px', textAlign: 'center', marginBottom: '10px', display: 'inline-block', cursor: 'pointer' }} variant='{contained}' onClick={() => window.location.href = lender.applicationlink} >Apply</div>
      </div>
    </div>
  ))}
</div>


<div className="heading-container">
<h2 className="section heading" style={{fontWeight:'bold'}}>Prepaid Cards</h2>
</div>
<div className="card-container" style={{ padding: '50px 0' }}>
  {mydata.data.lender_details.filter(lender => lender.card_type === 0).map((lender, index) => (
    <div key={index} className="card" style={{ margin: '10px', borderRadius: '10px', background: 'linear-gradient(rgb(217 217 217 / 49%), rgb(115 115 115 / 89%))', maxWidth:'400px', maxHeight:'auto', minWidth:'350px',minHeight:'auto'  }}>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', width: '50%', padding: '15px', justifyContent: 'center', margin: 'auto' }}>
          <div style={{ width: '100%', height: '60%', padding: '10px' }}>
            <img src={lender.logo} alt='creditlogo' style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
        <div style={{ display: 'flex', width: '50%', padding: '15px', justifyContent: 'center', margin: 'auto' }}>
          <div style={{ width: '100%', height: '100%', padding: '10px' }}>
            <img src={lender.card_img} alt='creditlogo' style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', padding: '10px', marginTop: 'auto' }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '20px', fontFamily:'Raleway', height: '20px', backgroundColor: 'gray', borderRadius: '50%', marginRight: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span>&#10003;</span>
            </div>
            {lender.point_one}
          </li>
          <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '20px', fontFamily:'Raleway', height: '20px', backgroundColor: 'gray', borderRadius: '50%', marginRight: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span>&#10003;</span>
            </div>
            {lender.point_two}
          </li>
          <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '20px', fontFamily:'Raleway', height: '20px', backgroundColor: 'gray', borderRadius: '50%', marginRight: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span>&#10003;</span>
            </div>
            {lender.point_three}
          </li>
          <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '20px', fontFamily:'Raleway', height: '20px', backgroundColor: 'gray', borderRadius: '50%', marginRight: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span>&#10003;</span>
            </div>
            {lender.point_four}
          </li>
        </ul>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'column' }}>
        <div style={{ backgroundColor: 'blueviolet', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', height: '40px', width: '120px', textAlign: 'center', marginBottom: '10px', display: 'inline-block', cursor: 'pointer' }} variant='{contained}' onClick={() => window.location.href = lender.applicationlink} >Apply</div>
      </div>
    </div>
  ))}
</div> 
     

        <style>
   {`

   .semilcircle-container {
  position: relative;
  margin-bottom: 20px;
 
}

.semilcircle {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 65vw;
  width: 100%;
  background-color: rgb(151 71 255 / 35%);
  opacity: 0.8;
  border-radius: 50%;
}

@media (min-width: 1024px) {
  .semilcircle {
    height: 60vh;
    top: -100px;
  }


}

  
  .confetti-0, .confetti-1, .confetti-2 {
    display: none; /* Hide some of the confetti for desktop view */
  }

  .background {
    display: none; /* Hide the background confetti for desktop view */
  }

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 50px; /* Adjust the margin for the confetti wrapper */
  }

  
  .card-container { 
    display: flex; flex-wrap: wrap; justify-content: center;
   }

.card { 
  width: 100%; 
  max-width: 400px; /* Adjust the max-width as needed */ 
  margin: 10px; padding: 10px; 
  border-radius: 10px; 
  background: linear-gradient(rgb(217 217 217 / 49%), rgb(115 115 115 / 89%));
   display: flex;
    flex-direction: column; 
    position: relative; }

.card-content {
   display: flex; 
   flex-direction: row;
    align-items: flex-start; 
  }



.card-image {
   flex: 1; 
   margin-top: 5px; 
  }

.card-points {
   font-family: 'Raleway';
    font-weight: 600;
     margin-left: 10px; /* Adjust the margin as needed */ 
    }

@media (min-width: 767px) { 
  .card { 
    width: 800px; 
    max-width: none; 
  }

.card-logo {
   flex: 0 0 100px; /* Adjust the width as needed for desktop */
   }

.card-image {
   margin-top: 0; 
  } 
}

  .box {
    width: 300px;
    margin: 20px;
  }

  .box img {
    width: 50px; /* Adjust the icon size */
  }

  .box h2 {
    font-size: 20px; /* Adjust the heading size */
  }

  .box p {
    font-size: 16px; /* Adjust the paragraph size */
  }
}


.heading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  margin-top: 40px;
}

.heading-container .heading {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 24px; /* Adjust the font size as needed */
  color: black; /* Adjust the text color as needed */
  width: 100%;
  position: relative;
}

.heading-container .heading:before,
.heading-container .heading:after {
  content: "";
  flex: 1;
  border-top: 2px dashed black; /* Adjust the line color as needed */
  margin: 0 10px; /* Adjust the space between the line and text as needed */
}

@media (min-width: 768px) {
  .heading-container {
    align-items: flex-start; /* For left alignment on desktop view */
    margin-top: 30px;
  }
  
  .heading-container .heading {
    justify-content: flex-start; /* For left alignment on desktop view */
  }
}



   `}
 </style>
  </div>
  
  )
}

export default ListPage;