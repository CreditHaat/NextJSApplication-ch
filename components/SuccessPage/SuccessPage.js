"use client"
import React, {useEffect, useRef, useState} from "react";
import { useRouter } from 'next/navigation';
import './SuccessPage.css';
import RejectionPageNavbar from "../RejectionPage/RejectionPageNavbar";
import RejectionPageFooter from '../RejectionPage/RejectionPageFooter';
import Image from "next/image";
import faqimage1 from './successpageimages/rejectionimage.png';
import rejmoneyviewimage from './successpageimages/rejmoneyviewimage.png';
import rejzypeimage from './successpageimages/rejzypeimage.png';
import rejhdfclogo from './successpageimages/rejhdfclogo.png';
import successimage from './successpageimages/successimage.png';
import anqlogo from './successpageimages/anqlogo.png';
import walletimg from './successpageimages/walletimg.png';
import walletimg2 from './successpageimages/walletimg2.png';
import walletimg3 from './successpageimages/walletimg3.png';
import rejectionimage2 from './successpageimages/rejectionimage4.png';
import boatlogo from './successpageimages/boatlogo.png';
import boatimage from './successpageimages/boatimage.png';
import rejsection4image from './successpageimages/rejsection4image.png';
import { useSwipeable } from 'react-swipeable';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ScrollSpySection from "../RejectionPage/ScrollSpySection";
import CardSlidePage from './CardSlidePage';

// import faqimage from './FaqImages/faqimage.png';
import Link from "next/link";
// {link, lenderName}
    
    function SuccessPage({params, searchParams}) {
        const [showCards, setShowCards] = useState(false); // State to control card visibility 
        const [windowWidth, setWindowWidth] = useState(0);        
        const [cardAnimation, setCardAnimation] = useState("");
        const [animationClass, setAnimationClass] = useState("");

        // const queryParams = Object.fromEntries(new URLSearchParams(searchParams));
        const queryParams = searchParams ?? {};
    const link = queryParams.link;
    const lenderName = queryParams.lenderName;


    console.log("Link inside the sucessPage is :: ",link);
    console.log("lenderName inside the success page is :: ",lenderName);

        // Update window width on resize
        useEffect(() => {
            const handleResize = () => setWindowWidth(window.innerWidth);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);
        
        const toggleShowCards = () => {
            setShowCards(!showCards);
            window.location.href = link;
          };

          

          const cards = [
            {
              logo: rejhdfclogo,
              text: "Earn rewards, <br/> enjoy cashback, and  access exclusive <br/> perks—all <br/> with <br/> low fees!",
              img: rejsection4image,
            },

            {
              logo: rejhdfclogo,
              text: "Maximize savings, <br/> unlock <br/> rewards, <br/> and <br/> enjoy premium benefits!",
              img: rejsection4image,
            },
            {
                logo: rejhdfclogo,
                text: "Enjoy seamless <br/> shopping, <br/> earn <br/> fantastic <br/> rewards!",
                img: rejsection4image,
              },
            // Add more card objects here if needed
          ];
        
          const [currentIndex, setCurrentIndex] = useState(0);
          const nextCards = () => {
            setAnimationClass("fade-out");
            setTimeout(() => {
                setCurrentCardIndex((prevIndex) => (prevIndex + cardsToShow) % cards.length);
                setAnimationClass("");
            }, 500); // Match this duration with your CSS animation duration
        };
    
        const prevCards = () => {
            setAnimationClass("fade-out");
            setTimeout(() => {
                setCurrentCardIndex((prevIndex) => (prevIndex - cardsToShow + cards.length) % cards.length);
                setAnimationClass("");
            }, 500);
        };
        
          const handleDotClick = (index) => {
            if (index !== currentIndex) {
                setCardAnimation("card-fade-out");
                setTimeout(() => {
                    setCurrentIndex(index);
                    setCardAnimation("card-fade-in");
                }, 500); // Match this with your fade-out duration
            }
        };
    
        useEffect(() => {
            const interval = setInterval(() => {
                setCardAnimation("card-fade-out");
                setTimeout(() => {
                    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
                    setCardAnimation("card-fade-in");
                }, 500); // Match this with your fade-out duration
            }, 3000);
    
            return () => clearInterval(interval);
        }, [cards.length]);
    
        const handleSwipeLeft = () => {
          setCardAnimation("card-fade-out");
          setTimeout(() => {
              setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
              setCardAnimation("card-fade-in");
          }, 500); // Match this with your fade-out duration
      };
      
      const handleSwipeRight = () => {
          setCardAnimation("card-fade-out");
          setTimeout(() => {
              setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
              setCardAnimation("card-fade-in");
          }, 500);
      };
      const [zoomInEffect, setZoomInEffect] = useState(false);
  // Function to handle swipe actions
  const handleSwipe = (direction) => {
    if (direction === 'LEFT') {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    } else if (direction === 'RIGHT') {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
    }
  }
// Use swipe handlers
const updateIndex = (newIndex) => {
  if (newIndex < 0) {
    newIndex = cards.length - 1;
  } else if (newIndex >= cards.length) {
    newIndex = 0;
  }
  setCurrentIndex(newIndex);
};

const swipeHandlers = useSwipeable({
  onSwipedLeft: () => {
    setCardAnimation('swipe-left');
    updateIndex(currentIndex + 1);
  },
  onSwipedRight: () => {
    setCardAnimation('swipe-right');
    updateIndex(currentIndex - 1);
  },
  onTap: () => setZoomInEffect(true),
});

useEffect(() => {
  const timer = setTimeout(() => {
    setCardAnimation('');
    setZoomInEffect(false);
  }, 500);
  return () => clearTimeout(timer);
}, [cardAnimation, zoomInEffect]);
          
// Additional cards for the secured cards section
const [currentSecuredGroupIndex, setCurrentSecuredGroupIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(3); // Default to 3 cards for larger screens

    const rejsection5Cards = [
        { logo: anqlogo, text: "FD Secured <br/> Freedom!", img: walletimg3 },
        { logo: anqlogo, text: "Your card for <br/> great savings!", img: walletimg2 },
        { logo: anqlogo, text: "Reliable financial <br/> support!", img: walletimg },
        { logo: anqlogo, text: "Flexibility and <br/> security!", img: walletimg3 },
        { logo: anqlogo, text: "Join our secured <br/> card program!", img: walletimg2 },
        { logo: anqlogo, text: "Your card for <br/> great savings!", img: walletimg2 },
    ];
    const [currentSecuredCardIndex, setCurrentSecuredCardIndex] = useState(0);
    const totalCards = rejsection5Cards.length; 

    const getVisibleSecuredCards = () => {
        const startIndex = currentSecuredGroupIndex * cardsToShow;
        return securedCards.slice(startIndex, startIndex + cardsToShow);
    };

    useEffect(() => {
        const handleResize = () => {
            setCardsToShow(window.innerWidth <= 768 ? 2 : 3); // 2 cards for mobile, 3 for larger screens
        };

        handleResize(); // Call on initial render
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

  // Function to handle card change on dot click
const handleCardChange = (index) => {
  setCurrentSecuredCardIndex(index);
};


 useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSecuredCardIndex((prevIndex) => (prevIndex + 1) % rejsection5Cards.length);
    }, 3000); // Change the time interval as needed

    return () => clearInterval(interval); // Cleanup on unmount
  }, [rejsection5Cards.length]);

   const slideLeft = () => {
    setCurrentSecuredCardIndex((prevIndex) => (prevIndex - 1 + rejsection5Cards.length) % rejsection5Cards.length);
  };

  // Function to slide right
  const slideRight = () => {
    setCurrentSecuredCardIndex((prevIndex) => (prevIndex + 1) % rejsection5Cards.length);
  };

    const handlers = useSwipeable({
      onSwipedLeft: () => {
          setCurrentSecuredGroupIndex((prevIndex) => (prevIndex + 1) % totalGroups);
      },
      onSwipedRight: () => {
          setCurrentSecuredGroupIndex((prevIndex) => (prevIndex - 1 + totalGroups) % totalGroups);
      },
      preventDefaultTouchmoveEvent: true,
      trackMouse: true // Allows mouse swipe on desktop
  });
  

const rejsection6Cards = [
  {
      logo: boatlogo,
      text: "Get Boat, Swipe & Save!",
      img: boatimage,
  },
  {
      logo: boatlogo,
      text: "Discover New <br/> Deals!",
      img: boatimage,
  }
];
const totalRejCards = rejsection6Cards.length;
const [currentRejCardIndex, setCurrentRejCardIndex] = useState(0);

// Update the window width on resize
useEffect(() => {
  const handleResize = () => setWindowWidth(window.innerWidth);
  handleResize(); // Set initial value
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

// Use swipeable handlers for card swiping
const rejHandlers = useSwipeable({
  onSwipedLeft: () => {
    setCurrentRejCardIndex((prevIndex) => (prevIndex + 1) % totalRejCards);
  },
  onSwipedRight: () => {
    setCurrentRejCardIndex((prevIndex) => (prevIndex - 1 + totalRejCards) % totalRejCards);
  },
  preventDefaultTouchmoveEvent: true,
  trackMouse: true,
});

// Auto-slide through the cards every 3 seconds
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentRejCardIndex((prevIndex) => (prevIndex + 1) % totalRejCards);
  }, 3000); // Change the interval time as needed

  return () => clearInterval(interval); // Cleanup on unmount
}, [totalRejCards]);

    const [isVisible, setIsVisible] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false); // Optionally reset when not visible
                }
            },
            {
                threshold: 0.1, // Trigger when 10% of the element is visible
            }
        );

        if (textRef.current) {
            observer.observe(textRef.current);
        }

        return () => {
            if (textRef.current) {
                observer.unobserve(textRef.current);
            }
        };
    }, []);


      return (
        <>
        <div>
            <RejectionPageNavbar/>
        </div>
        <div className="successclasspage">
            <div className="successflexcontainer">  
            <div className="successimagesection">
          <Image 
          src={successimage}
          alt="successimage"
        //   width={400}
          layout="intrinsic"
          />
        </div>
        <div className="successtextsection">
               <h1  className={`text-justify scrollanimation ${isVisible ? 'visible' : ''}`}
                    ref={textRef}>Congrats! Your <br className="displaydekstop"/> Application is <br className="displaydekstop"/> Successful!</h1>
            </div>
        </div>
        </div>
        <ScrollSpySection>
        <div className="successsection2" >
                <p>Hooray 🎉 Your loan application has been successfully created. To complete the process, simply click 'Apply Now' and move forward to finalize your loan. </p>
            </div>
</ScrollSpySection>

      {/* Show More Options Button */}
      <div className="showmorebutton">
      <button onClick={toggleShowCards} className="show-more-button">
        {showCards ? 'Click to continue' : 'Click to continue...'}
      </button>
      </div>
     
            {/*---------------------------------------------------------------------------- */}

               {/* Other components remain unchanged */}
               <ScrollSpySection>
  <div className="rejsection4">
    <ScrollSpySection>
      <h3 style={{ fontWeight: 'bold' }}>Credit cards</h3>
    </ScrollSpySection>
    
    <CardSlidePage/>
  </div>
</ScrollSpySection>

<ScrollSpySection>
<div className="rejsection5">
  <div className="rejsection5heading">
    <h3 style={{fontWeight: 'bold'}}>Secured products</h3>
    </div>
</div>
</ScrollSpySection>
<ScrollSpySection>
<div className="card-container-secured">
    {rejsection5Cards.map((card, index) => (
        <div 
            key={index} 
            className={`rejsect5card ${index === currentSecuredCardIndex ? 'active' : ''}`} 
            onClick={() => handleCardChange(index)} // Optional: Change card on click
        >
            <div className="card-front">
                <div className="sect5logo">
                    <Image
                        src={card.logo}
                        alt={`secured-card-logo-${index + 1}`}
                        width={200}
                        layout="intrinsic"
                    />
                </div>
                <div className="cardimgtext5">
                    <div className="cardimgtext5t">
                        <p dangerouslySetInnerHTML={{ __html: card.text }} />
                    </div>
                    <div className="rejsect5image">
                        <Image
                            src={card.img}
                            alt={`secured-card-image-${index + 1}`}
                            width={600}
                            layout="intrinsic"
                        />
                    </div>
                </div>
            </div>
        </div>
    ))}

            </div>
            {/* Pagination Lines */}
  <div className="pagination-lines">
    {Array.from({ length: totalCards }).map((_, index) => (
      <div
        key={index}
        className={`line ${index === currentSecuredCardIndex ? 'active' : ''}`} // Corrected className syntax
        onClick={() => handleGroupChange(index)}
      />
    ))}
  </div>
            </ScrollSpySection>
            <ScrollSpySection>
 <div className="rejsection6">
    <h3 style={{fontWeight: 'bold'}}>Discover other great offers!</h3>
</div>
</ScrollSpySection>
<ScrollSpySection>
<div className="rejsect6card-container" {...rejHandlers}>
    <div className="rejsect6card-scroll">
        {/* Render one card for desktop and two for mobile */}
        {windowWidth > 768 ? (
            // Display only the current card for desktop
            <div 
                key={currentRejCardIndex} 
                className={`rejsect6card active`} 
            >
                <div className="logoflex">
                    <div className="sect6logo">
                        <Image
                            src={rejsection6Cards[currentRejCardIndex].logo}
                            alt="rejhdfclogo"
                            width={200}
                            layout="intrinsic"
                        />
                    </div>
                    <div className="logotext">
                        <p>Best deals</p>
                    </div>
                </div>
                <div className="cardimgtext6">
                    <div className="cardimgtext6t">
                    <p dangerouslySetInnerHTML={{ __html: rejsection6Cards[currentRejCardIndex].text }} />
                    </div>
                    <div className="rejsect6image">
                        <Image
                            src={rejsection6Cards[currentRejCardIndex].img}
                            alt="rejsection6image"
                            width={300}
                            layout="intrinsic"
                        />
                    </div>
                </div>
            </div>
        ) : (
            // Display the current and next card for mobile
            <>
                {Array.from({ length: 2 }).map((_, index) => {
                    const cardIndex = (currentRejCardIndex + index) % totalRejCards;
                    return (
                        <div 
                            key={cardIndex} 
                            className={`rejsect6card ${index === 0 ? 'active' : ''}`} 
                        >
                            <div className="logoflex">
                                <div className="sect6logo">
                                    <Image
                                        src={rejsection6Cards[cardIndex].logo}
                                        alt="rejhdfclogo"
                                        width={200}
                                        layout="intrinsic"
                                    />
                                </div>
                                <div className="logotext">
                                    <p>Best deals</p>
                                </div>
                            </div>
                            <div className="cardimgtext6">
                                <div className="cardimgtext6t">
                                <p dangerouslySetInnerHTML={{ __html: rejsection6Cards[cardIndex].text }} />
                                </div>
                                <div className="rejsect6image">
                                    <Image
                                        src={rejsection6Cards[cardIndex].img}
                                        alt="rejsection6image"
                                        width={300}
                                        layout="intrinsic"
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </>
        )}
    </div>
    {/* Pagination Dots (Visible only on Desktop View) */}
    {windowWidth > 768 && (
          <div className="pagination-dots">
            {Array.from({ length: totalRejCards }).map((_, index) => (
              <div
                key={index}
                className={`dot ${index === currentRejCardIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
              ></div>
            ))}
          </div>
        )}
</div>

</ScrollSpySection>
              <div>
            </div>
       <RejectionPageFooter/>
        </>
      );
    }
    
    export default SuccessPage