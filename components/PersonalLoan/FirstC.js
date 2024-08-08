import React from "react";
import { BiSolidCheckShield } from "react-icons/bi";
import {HiOutlineArrowCircleRight  } from "react-icons/hi";

const FirstC = () => {
  return (
    <>
      <section className="container banner">
        <div className="row" style={{ display: "flex" }}>
          <div className="col-md-6">
            <h1
              class="banner_title"
              style={{
                fontFamily: "'Noto Sans'",
                fontWeight: "500",
              }}
            >
              <span class="text-cont" style={{ color: "#3e2780" }}>
                Getting a 
              </span>
              <br />
              Personal Loan
            </h1>
            <p
              class="banner_description"
              style={{
                fontFamily: "'Noto Sans'",
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "20px",
                letterSpacing: "0.02em",
                color: "#858691",
                marginTop: "20px"
              }}
            >
             Personal loans for everyone avail loans from ₹500 to 
             <br></br>
             ₹25Lacs
            </p>
            <p
              class="usp-home_item"
              style={{
                marginTop:"5px",
                paddingTop:'0px',
                fontWeight: "500",
                fontSize: "15px",
                fontFamily: "'Noto Sans'",
              }}
            >
              Start Now
            </p>
            <div class="row">
              <div className="col-md-6">
                <div className="input-group mb-3" style={{ display: "flex", width:"100%", flexWrap:"nowrap"}}>
                  <input
                    type="text"
                    style={{
                      borderTopRightRadius: "0",
                      borderBottomRightRadius: "0",
                      width: "7cm",
                      height: "37px",
                      minWidth: "0",
            
                    }}
                    id="mobileInputField"
                    required
                    className="form-control"
                    placeholder="Enter your phone number"
                    aria-label="Enter your number"
                    aria-describedby="enterMobileNo"
                    name="mobileNumber"
                    maxLength={10}
                  />
                  <button
                    style={{
                      display: "block",
                      background: "#363062",
                      transition: "background-color 0.3s", // Smooth transition on hover
                    }}
                    type="button"
                    id="mobileInputFieldbtn"
                    className="btn btn-primary btn-sm"
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "blue")
                    } // Change background color on hover
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#363062")
                    } // Revert back to original color
                  >
                    <HiOutlineArrowCircleRight  style={{ color: "white" }} />
                  </button>
                </div>
              </div>
            </div>
            
            <BiSolidCheckShield />
            <span>Safe secure and protected</span>
          </div>
          <div className="col-md-6 text-center">
            <figure className="figure">
              <img
                src="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/site-banner-ladypic.png"
                className="figure-img img-fluid banner_img"
                alt="..."
                style={{
                  height: "auto",
                  width: "100%",
                  maxWidth: "300px",
                  margin: "0 auto 1rem",
                }}
              />
            </figure>
          </div>
        </div>
      </section>
      <br />
      <style>
        {`
          @media (max-width: 768px) {
            .input-group mb-3{
               width:100%
            }
             
            .row {
              flex-direction: column;
            }
            .col-md-6 {
              width: 100%;
            }
            .banner_img {
              max-width: 100%; /* Adjust width as needed */
              height: auto; /* Ensures image does not distort */
              margin: 1rem auto; /* Adds some space around the image */
            }
          }
        `}
      </style>
    </>
  );
};

export default FirstC;