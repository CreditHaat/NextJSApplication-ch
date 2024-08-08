import React from "react";
import a from '../../images/credit11.png';
import Image from 'next/image';


const CreditFirstC = () => {
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
              Credit Card
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
           Apply for the best credit card from leading banks.
            </p> 
          </div>
          <div className="col-md-6 text-center">
            <figure className="figure">
              {/* <img
                src=
                {a}
                className="figure-img img-fluid banner_img"
                alt="..."
                style={{
                  height: "auto",
                  width: "100%",
                  maxWidth: "400px",
                  margin: "0 auto 1rem",
                }}
              /> */}

                <Image
                src={a}
                className="figure-img img-fluid banner_img"
                width={400}
                height={400}
                layout="intrensic"
                style={{
                  height: "auto",
                  width: "100%",
                  maxWidth: "400px",
                  margin: "0 auto 1rem",
                }}
                alt="Image"/>

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

export default CreditFirstC;