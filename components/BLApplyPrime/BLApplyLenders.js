"use client"

import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import './BLApplyLenders.css'; // Ensure this file is correctly imported and styled
import adityabirlaimage from './BLApplyImages/adityabirlaimage.png';
import Image from 'next/image';
export default function BLApplyLenders({ companies }) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when component mounts
  }, []);

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
        <div className="company-names">
            <div className='company-names-first'>
            <Image 
            src={adityabirlaimage} 
            alt='Lenderimage'
            width={100}
            height={100}/>
          <p>Aditya Birla Capital</p>
          <hr className="company-divider" /> 
            </div>
           <div className='company-names-second'>
           <p> You are pre-approved for</p>
           <h4>Max-Loan Amount-500000</h4>
           </div>
           <div>
           <button className="congraths-button">Select</button>
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

  // Render when there are loan providers
  return (
    <div className="congratulations-container">
      <div className="company-names">
        <h2>Loan providers:</h2>
        <ul>
          {companies.map((company, index) => (
            <li key={index}>{company}</li>
          ))}
        </ul>
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

// Function to generate random colors for confetti
function getRandomColor() {
  const colors = ['#FFD700', '#FF6347', '#ADFF2F', '#8A2BE2', '#FF69B4'];
  return colors[Math.floor(Math.random() * colors.length)];
}

