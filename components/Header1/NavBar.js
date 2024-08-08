"use client"

import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
import Link from 'next/link';
import "./NavBar.css";
import { HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
import i from '../../images/logo1-removebg-preview.png';
import Image from 'next/image';

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          {/* <img className="nav-logo.icon" src={i} alt="logo_pic" height={'40px'} width={'45px'} style={{marginLeft:'30px'}}/> */}
          <Image
          src={i}
          className="nav-logo.icon"
          width={45}
          height={45}
          style={{marginLeft:'30px'}}
          alt="logo_pic"
          />
          <Link href="/" className="nav-logo">
            <span>CreditHaat</span>  
          </Link>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link href="/personal"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick} style={{color:'black'}}>
                Personal Loan
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/business"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}  style={{color:'black'}}>
              
                Business Loan
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/credit"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}  style={{color:'black'}}>
              
              Credit Card
              </Link>
            </li>
            
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}

            {click ? (
              <span className="icon">
                <HamburgetMenuClose />{" "}
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuOpen />
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
