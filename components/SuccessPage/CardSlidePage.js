"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image"; // Import Image from 'next/image' if you're using Next.js
import styles from "./CardSlidePage.module.css";
import rejhdfclogo from "../RejectionPage/Rejectionpageimages/rejhdfclogo.png";
import rejsection4image from "../RejectionPage/Rejectionpageimages/rejsection4image.png";

const CardSlidePage = ({ json, handleAdClick }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [rotationDirection, setRotationDirection] = useState(1);
  const intervalRef = useRef(null); // Use useRef to keep track of interval ID
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const totalCards = 3; // Number of cards
  const slideInterval = 3000;

  // Card data for each step, including logo, text, and image
  const cardData = [
    {
      logo: rejhdfclogo,
      text: "Earn rewards, enjoy cashback,  and access exclusive  perks—all with low fees!",
      img: rejsection4image,
      link: "https://example.com/apply-now-step-1", // Link for the first card
    },
    {
      logo: rejhdfclogo,
      text: "Maximize savings, <br/> unlock  rewards, and <br/> enjoy premium benefits!",
      img: rejsection4image,
      link: "https://example.com/apply-now-step-2", // Link for the second card
    },
    {
      logo: rejhdfclogo,
      text: "Enjoy seamless <br/> shopping,  earn fantastic <br/> rewards!",
      img: rejsection4image,
      link: "https://example.com/apply-now-step-3", // Link for the third card
    },
    // {
    //   logo: rejhdfclogo,
    //   text: "Enjoy Tejas Seamless <br/> shopping,  earn fantastic <br/> rewards!",
    //   img: rejsection4image,
    //   link: "https://example.com/apply-now-step-3", // Link for the third card
    // },
  ];

  const [securedCards, setSecuredCards] = useState(null);
  useState(() => {
    if (json) {
      <>
        {json.lenderDetails.map((card, index) => (
          <>
            {
              (card.product_type === 1) ? (setSecuredCards(card)) : (<></>)
            }
          </>
        ))}
      </>
    } else {
      console.log("Their are no cards");
    }
  }, [])

  // useState(() => {
  //   if (securedCards !== null) {
  //     return (
  //       <>

  //       </>
  //     )
  //   }
  // }, [securedCards])

  // Function to handle card rotation
  const rotateCards = (direction) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setRotationDirection(direction); // Set rotation direction based on button clicked

    // Update currentCard
    setCurrentCard((prev) => (prev + direction + totalCards) % totalCards);

    // Clear the existing interval to prevent unwanted rotations during interaction
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Reset animation state after a timeout
    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match this with your CSS transition time
  };

  // Auto-slide effect
  useEffect(() => {
    // Create interval and store ID in ref
    intervalRef.current = setInterval(() => {
      rotateCards(1); // Rotate to the next card automatically
    }, slideInterval);

    // Cleanup the interval when component unmounts
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []); // No dependencies to ensure continuous auto-sliding

  useEffect(() => {


    // Detect if screen width is less than 768px (mobile view)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    // Set initial value
    handleResize();
    // Attach resize listener
    window.addEventListener("resize", handleResize);

    return () => {
      // Cleanup listener on component unmount
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Track touch start position
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  // Track touch end position
  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  // Determine the direction of swipe when touch ends
  const handleTouchEnd = () => {
    const touchDelta = touchStartX - touchEndX;

    // Determine if swipe is large enough to count as a swipe (e.g., 50px difference)
    if (touchDelta > 50) {
      // Swipe left (show next card)
      rotateCards(1);
    } else if (touchDelta < -50) {
      // Swipe right (show previous card)
      rotateCards(-1);
    }
  };

  // Function to calculate card styles for the 3D carousel effect
  const getCardStyle = (index) => {
    const rotationPerCard = 360 / totalCards; // Degree of rotation for each card
    const baseRotation = (index - currentCard + totalCards) % totalCards;

    const isPreviousCard = (index === (currentCard - 1 + totalCards) % totalCards);
    const isNextCard = (index === (currentCard + 1) % totalCards);

    // Modify translateXDistance and translateZDistance based on mobile or desktop view
    const translateZDistance = isMobile ? 80 : 200; // Adjust for mobile view
    const translateXDistance = isPreviousCard
      ? isMobile
        ? 80
        : 100 // Move previous card slightly for mobile
      : isNextCard
        ? isMobile
          ? -80
          : -100 // Move next card slightly for mobile
        : 0;

    return {
      transform: `rotateY(${baseRotation * rotationPerCard}deg) translateZ(${translateZDistance}px) translateX(${translateXDistance}px)`,
      opacity: baseRotation === 0 ? 1 : 0.7, // Opacity control for current vs. other cards
    };
  };

  return (
    (json)
      ?
      (<>
        {console.log("The json inside the return of the card slide page is the : ", json)}
        <div
          className={styles.successclasspage}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {console.log("The json in cardSlidePage is : ", json)}
          <div className={styles.rejsection4}>
            <div className={styles.carousel3dWrapper}>
              <div className={`${styles.carousel3d} ${isAnimating ? styles.animating : ""}`}>
                {json.lender_details.map((card, index) => (

                  (card.product_type===1)?
                  (<>
                    <div
                    key={index}
                    className={`${styles.carouselCard} ${index === currentCard ? styles.active : ""}`}
                    style={getCardStyle(index)}
                  >
                    <div className={styles.rejsect4card}>
                      {/* Render the logo */}
                      <div className={styles.cardLogo}>
                        <Image src={card.logo} alt={`Logo ${index + 1}`} width={100} height={100} />
                      </div>
                      {/* to flex text and image */}
                      <div className={styles.imgtbflex}>
                        {/* container for text and button */}
                        <div className={styles.cardContent}>
                          {/* Render the card text */}
                          <div
                            className={styles.cardText}
                            dangerouslySetInnerHTML={{ __html: card.description }} // Use this for rendering HTML content in text
                          ></div>

                          {/* "Apply Now" button with a unique link for each card */}
                          <div className={styles.cardButton}>
                            <a href={card.link} target="_blank" rel="noopener noreferrer">
                              <button onClick={()=>handleAdClick(card.product_id, card.applicationlink)} className={styles.applyNowButton}>Apply Now</button>
                            </a>
                          </div>
                        </div>

                        {/* Render the image */}
                        <div className={styles.cardImage}>
                          <Image src={rejsection4image} alt={`Card Image ${index + 1}`} width={300} height={200} />
                        </div>
                      </div>
                    </div>
                  </div>
                  </>):
                  (<>
                    {/* <div>No Secured Cards available</div> */}
                  </>)
                  
                ))}
              </div>
              {/* Navigation buttons */}
              <button
                className={`${styles.carouselButton} ${styles.prevButton}`}
                onClick={() => rotateCards(-1)} // Set direction to -1 for Previous
                aria-label="Previous"
              >
                {/* SVG for left arrow */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 19l-7-7 7-7" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                className={`${styles.carouselButton} ${styles.nextButton}`}
                onClick={() => rotateCards(1)} // Set direction to 1 for Next
                aria-label="Next"
              >
                {/* SVG for right arrow */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5l7 7-7 7" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </>)
      :
      (<>
        <div
          className={styles.successclasspage}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {console.log("The json in cardSlidePage is : ", json)}
          <div className={styles.rejsection4}>
            <div className={styles.carousel3dWrapper}>
              <div className={`${styles.carousel3d} ${isAnimating ? styles.animating : ""}`}>
                {cardData.map((card, index) => (
                  <div
                    key={index}
                    className={`${styles.carouselCard} ${index === currentCard ? styles.active : ""}`}
                    style={getCardStyle(index)}
                  >
                    <div className={styles.rejsect4card}>
                      {/* Render the logo */}
                      <div className={styles.cardLogo}>
                        <Image src={card.logo} alt={`Logo ${index + 1}`} width={100} height={100} />
                      </div>
                      {/* to flex text and image */}
                      <div className={styles.imgtbflex}>
                        {/* container for text and button */}
                        <div className={styles.cardContent}>
                          {/* Render the card text */}
                          <div
                            className={styles.cardText}
                            dangerouslySetInnerHTML={{ __html: card.text }} // Use this for rendering HTML content in text
                          ></div>

                          {/* "Apply Now" button with a unique link for each card */}
                          <div className={styles.cardButton}>
                            <a href={card.link} target="_blank" rel="noopener noreferrer">
                              <button className={styles.applyNowButton}>Apply Now</button>
                            </a>
                          </div>
                        </div>

                        {/* Render the image */}
                        <div className={styles.cardImage}>
                          <Image src={card.img} alt={`Card Image ${index + 1}`} width={300} height={200} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Navigation buttons */}
              <button
                className={`${styles.carouselButton} ${styles.prevButton}`}
                onClick={() => rotateCards(-1)} // Set direction to -1 for Previous
                aria-label="Previous"
              >
                {/* SVG for left arrow */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 19l-7-7 7-7" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                className={`${styles.carouselButton} ${styles.nextButton}`}
                onClick={() => rotateCards(1)} // Set direction to 1 for Next
                aria-label="Next"
              >
                {/* SVG for right arrow */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5l7 7-7 7" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </>)

  );
};

export default CardSlidePage;
