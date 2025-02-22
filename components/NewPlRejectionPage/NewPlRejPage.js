"use client"
import React, { useState, useEffect, useRef } from 'react';
import './NewPlRejPage.css';
import RejectionPageNavbar from '../RejectionPage/RejectionPageNavbar'
import RejectionPageFooter from "../RejectionPage/RejectionPageFooter";
import Image from "next/image";
import faqimage1 from '../RejectionPage/Rejectionpageimages/rejectionimage.png';
import rejmoneyviewimage from '../RejectionPage/Rejectionpageimages/rejmoneyviewimage.png';
import rejzypeimage from '../RejectionPage/Rejectionpageimages/rejzypeimage.png';
import rejhdfclogo from '../RejectionPage/Rejectionpageimages/rejhdfclogo.png';
import rejsection4image from '../RejectionPage/Rejectionpageimages/rejsection4image.png';
import anqlogo from '../RejectionPage/Rejectionpageimages/anqlogo.png';
import walletimg from '../RejectionPage/Rejectionpageimages/walletimg.png';
import walletimg2 from '../RejectionPage/Rejectionpageimages/walletimg2.png';
import walletimg3 from '../RejectionPage/Rejectionpageimages/walletimg3.png';
import rejectionimage2 from '../RejectionPage/Rejectionpageimages/rejimagenew.png';
import boatlogo from '../RejectionPage/Rejectionpageimages/boatlogo.png';
import boatimage from '../RejectionPage/Rejectionpageimages/boatimage.png';
// import GoldCardImage from '../RejectionPage/Rejectionpageimages/securedecom.png';
import { useSwipeable } from 'react-swipeable';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
// import CardSlidePage from '../SuccessPage/CardSlidePage';
import NewCardSlidePage from './NewCardSlidePage';
import ScrollSpySection from "../RejectionPage/ScrollSpySection";
import $ from 'jquery';
import axios from "axios";
import EmblaCarousel from './Emblacarousel/js/EmblaCarousel';
import listimage1 from '../NewPlApplyD/newplimages/newchange11.png';
import listimage2 from '../NewPlApplyD/newplimages/newchange3.png';
import listimage3 from '../NewPlApplyD/newplimages/plimage33.png';
// import faqimage from './FaqImages/faqimage.png';
import Link from "next/link";
import {Roboto} from '@next/font/google';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});
    
    function NewPlRejPage({lenderName, lender_id}) {
        var json;
        var count = 0;

  const [globalResponse, setGlobalResponse] = useState(null);
  const [showCards, setShowCards] = useState(false); // State to control card visibility 
  const [windowWidth, setWindowWidth] = useState(0);
  const [cardAnimation, setCardAnimation] = useState("");
  const [animationClass, setAnimationClass] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
        // Update window width on resize
        // Update window width on resize
  useEffect(() => { 
    setMobileNumber(localStorage.getItem('mobileNumberForRejection'));
    handleSecuredCards();
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
        
        const toggleShowCards = () => {
            setShowCards(!showCards);
        
            // window.history.back();
            const url = `https://app.credithaat.com/embedded_journey?sso=yes&mobilenumber=${mobileNumber}`;
            window.location.href = url;
        
            // router.push({
            //   pathname: '/embedded_journey',
            //   query: {
            //     mobilenumber: '8010489800', 
            //     sso: 'yes' 
            //   }
            // })
            // setRejectionPage(false);
            // setRejectionPage2(true);
        
            console.log(lenderName);
        
            $(`.${lender_id}`).css("display", "none");
        
          };
        

          const OPTIONS = { direction: 'rtl', loop: true };
  const SLIDES = [
    { imageUrl: listimage1 },
    { imageUrl: listimage2 },
    { imageUrl: listimage3 },
  ];

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

    const handleSecuredCards = async () => {
        // e.preventDefault();
        try {
          const formData1 = new FormData();
          console.log("mobileNumber is : ", mobileNumber);
          formData1.append('mobilenumber', localStorage.getItem('mobileNumberForRejection'));
          const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}ad_product_list`, formData1, {
            headers: {
              'Content-Type': 'application/json',
              'token': 'Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=' // Add your token here
            }
          });
    
          if (response.data.code === 200) {
            console.log("The response.data.data is : ", response.data.data);
            json = response.data.data;
            console.log("Beofore setting the globalResponse json : ",json);
            setGlobalResponse(response.data.data);
            console.log("json is : ", json);
          }
    
          console.log("Response is :: ", response);
    
        } catch (error) {
          console.log(error);
        }
      }

    const handleAdClick=async(productId,productLink)=>{
        // e.preventDefault();
        try{
    
          const formData1 = new FormData();
          formData1.append('productId', productId);
          formData1.append('phone',mobileNumber);
          formData1.append('channel', "credithaat");
    
          const response = axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}h5/cpiClick_adproduct`, formData1);
    
          window.location.href= productLink;
    
        }catch(error){
          console.log(error);
        }
      }

return (
        <>
        <div className="Rejcarousel-background">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
      <div className={`${roboto.className}`}>
      <div className="newRejfirstcard-container" style={{ boxSizing: 'content-box' }}>
        <ScrollSpySection>
        <div className="rejsection2" >
        <div className="error-icon" style={{marginLeft: '30px'}}>
    <i className="fas fa-times">X</i> {/* This renders the X */}
  </div>
  <div className='sorrytext' style={{textAlign: 'center', marginTop: '10px'}}>
  <p>Sorry! Application not accepted</p>
  </div>
                
            </div>
</ScrollSpySection>
<ScrollSpySection>
      {/* Show More Options Button */}
      <div className="showmorebutton">
      <button onClick={toggleShowCards} className="show-more-button">
        {showCards ? 'Check less options' : 'Check more options...'}
      </button>
      </div>
      </ScrollSpySection>
            {/*---------------------------------------------------------------------------- */}
            <ScrollSpySection>
  <div className="rejsection4">
    <ScrollSpySection>
      <h3 style={{ fontWeight: 'bold' }}>Credit cards</h3>
    </ScrollSpySection>
    <NewCardSlidePage json={globalResponse} handleAdClick={handleAdClick} />
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
{
          (globalResponse) ?
            (<>
              <div className="card-container-secured" >
                {/* {rejsection5Cards.map((card, index) => ( */}
                {globalResponse.lender_details.map((card, index) => (
                  (card.product_type === 0) ?
                    (<>
                      {/* {count++} */}
                      <div
                      
                        key={index}
                        className={`rejsect5card ${index === currentSecuredCardIndex ? 'active' : ''}`}
                        onClick={() =>{ handleCardChange(index); handleAdClick(card.product_id,card.applicationlink);} } // Optional: Change card on click
                      >
                        <div className="card-front">
                          <div className="sect5logo">
                            <Image
                              src={card.logo}
                              alt={`secured-card-logo-${index + 1}`}
                              width={80}
                              height={200}
                              layout="intrinsic"
                              style={{ marginBottom:"20px",marginTop:'5px'}}

                            />
                          </div>
                          <div className="cardimgtext5">
                            <div className="cardimgtext5t">
                              <p dangerouslySetInnerHTML={{ __html: card.description }} />
                            </div>
                            {/* {
                    
                              (card.product === "IndiaGold")?(<><div className="goldrejsect5image">
                                <Image
                                  src={GoldCardImage}
                                  alt={`secured-card-image-${index + 1}`}
                                  width={100}
                                  height={400}
                                  layout="intrinsic"
                                />
                              </div></>)
                              :
                                (card.product === "Rupeek")?
                                (<><div className="goldrejsect5image">
                                <Image
                                  src={GoldCardImage}
                                  alt={`secured-card-image-${index + 1}`}
                                  width={100}
                                  height={200}
                                  layout="intrinsic"
                                />
                                </div></>)
                                :
                                (card.product === "iiflgoldloan")?
                                (<><div className="goldrejsect5image">
                                <Image
                                  src={GoldCardImage}
                                  alt={`secured-card-image-${index + 1}`}
                                  width={100}
                                  height={200}
                                  layout="intrinsic"
                                />
                               </div> </>)
                                :
                                (card.product === "Abhiloans")?
                                (<><div className="mutualrejsect5image">
                                <Image
                                  src={GoldCardImage}
                                  alt={`secured-card-image-${index + 1}`}
                                  width={100}
                                  height={200}
                                  layout="intrinsic"
                                />
                               </div> </>)
                                :
                                (card.product === "MeraKal")?
                                (<><div className="mutualrejsect5image">
                                <Image
                                  src={GoldCardImage}
                                  alt={`secured-card-image-${index + 1}`}
                                  width={100}
                                  height={200}
                                  layout="intrinsic"
                                />
                               </div> </>)
                                :
                                (card.product === "EarlySalary")?
                                (<><div className="mutualrejsect5image">
                                <Image
                                  src={GoldCardImage}
                                  alt={`secured-card-image-${index + 1}`}
                                  width={100}
                                  height={200}
                                  layout="intrinsic"
                                />
                               </div> </>)
                                :
                              (<><div className="rejsect5image">
                              <Image
                                src={walletimg3}
                                alt={`secured-card-image-${index + 1}`}
                                width={600}
                                height={600}
                                layout="intrinsic"
                              />
                            </div></>)
                            } */}
                          </div>
                        </div>
                      </div>
                    </>) :
                    (<></>)

                ))}

              </div>
              {/* Pagination Lines */}
              <div className="pagination-lines">
                {Array.from({ length: count }).map((_, index) => (
                  <div
                    key={index}
                    className={`line ${index === currentSecuredCardIndex ? 'active' : ''}`} // Corrected className syntax
                    onClick={() => handleGroupChange(index)}
                  />
                ))}
              </div>

            </>) :
            (<>
            </>)
        }
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
            // <div 
            //     key={currentRejCardIndex} 
            //     className={`rejsect6card active`} 
            // >
            //     <div className="logoflex">
            //         <div className="sect6logo">
            //             <Image
            //                 src={rejsection6Cards[currentRejCardIndex].logo}
            //                 alt="rejhdfclogo"
            //                 width={200}
            //                 layout="intrinsic"
            //             />
            //         </div>
            //         <div className="logotext">
            //             <p>Best deals</p>
            //         </div>
            //     </div>
            //     <div className="cardimgtext6">
            //         <div className="cardimgtext6t">
            //         <p dangerouslySetInnerHTML={{ __html: rejsection6Cards[currentRejCardIndex].text }} />
            //         </div>
            //         <div className="rejsect6image">
            //             <Image
            //                 src={rejsection6Cards[currentRejCardIndex].img}
            //                 alt="rejsection6image"
            //                 width={300}
            //                 layout="intrinsic"
            //             />
            //         </div>
            //     </div>
            // </div>
            <>
            {
              (globalResponse) ?
                (
                  <>
                    {/* {Array.from({ length: 2 }).map((_, index) => { */}

                    {/* const cardIndex = (currentRejCardIndex + index) % totalRejCards; */}
                    {globalResponse.lender_details.map((card, cardIndex) => {

                      return (
                        <>
                          {
                            (card.product_type === 2) ?
                              (<>
                                <div
                                  onClick={()=> handleAdClick(card.product_id,card.applicationlink)}
                                  key={cardIndex}
                                  style={{height:"200px"}}
                                  className={`rejsect6card active`}
                                >
                                  <div className="logoflex">
                                    <div className="sect6logo">
                                      <Image
                                        src={card.logo}
                                        alt="rejhdfclogo"
                                        width={200}
                                        height={200}
                                        layout="intrinsic"
                                      />
                                    </div>
                                    <div className="logotext">
                                      <p>Best deals</p>
                                    </div>
                                  </div>
                                  <div className="cardimgtext6">
                                    <div className="cardimgtext6t">
                                      <p dangerouslySetInnerHTML={{ __html: card.description }} />
                                    </div>
                                    <div className="rejsect6image">
                                      <Image
                                        src={card.product_img}
                                        alt="rejsection6image"
                                        width={300}
                                        height={300}
                                        style={{marginTop:'-20px'}}
                                        layout="intrinsic"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </>) :
                              (<>
                              </>)
                          }
                        </>

                      );
                    })}

                  </>) :
                (<>
                </>)
            }
          </>
        ) : (
            // Display the current and next card for mobile
            // <>
            //     {Array.from({ length: 2 }).map((_, index) => {
            //         const cardIndex = (currentRejCardIndex + index) % totalRejCards;
            //         return (
            //             <div 
            //                 key={cardIndex} 
            //                 className={`rejsect6card ${index === 0 ? 'active' : ''}`} 
            //             >
            //                 <div className="logoflex">
            //                     <div className="sect6logo">
            //                         <Image
            //                             src={rejsection6Cards[cardIndex].logo}
            //                             alt="rejhdfclogo"
            //                             width={200}
            //                             layout="intrinsic"
            //                         />
            //                     </div>
            //                     <div className="logotext">
            //                         <p>Best deals</p>
            //                     </div>
            //                 </div>
            //                 <div className="cardimgtext6">
            //                     <div className="cardimgtext6t">
            //                     <p dangerouslySetInnerHTML={{ __html: rejsection6Cards[cardIndex].text }} />
            //                     </div>
            //                     <div className="rejsect6image">
            //                         <Image
            //                             src={rejsection6Cards[cardIndex].img}
            //                             alt="rejsection6image"
            //                             width={300}
            //                             layout="intrinsic"
            //                         />
            //                     </div>
            //                 </div>
            //             </div>
            //         );
            //     })}
            // </>
            <>
            {
              (globalResponse) ?
                (
                  <>
                    {/* {Array.from({ length: 2 }).map((_, index) => { */}

                    {/* const cardIndex = (currentRejCardIndex + index) % totalRejCards; */}
                    {globalResponse.lender_details.map((card, cardIndex) => {

                      return (
                        <>
                          {
                            (card.product_type === 2) ?
                              (<>
                                <div
                                onClick={()=> handleAdClick(card.product_id,card.applicationlink)}
                                  key={cardIndex}
                                  className={`rejsect6card ${cardIndex === 0 ? 'active' : ''}`}
                                >

                                  <div className="logoflex">
                                    <div className="sect6logo">
                                      <Image
                                        src={card.logo}
                                        alt="rejhdfclogo"
                                        width={200}
                                        height={200}
                                        layout="intrinsic"
                                      />
                                    </div>
                                    <div className="logotext">
                                      <p>Best deals</p>
                                    </div>
                                  </div>
                                  <div className="cardimgtext6">
                                    <div className="cardimgtext6t">
                                      <p dangerouslySetInnerHTML={{ __html: card.description }} />
                                    </div>
                                    <div className="rejsect6image">
                                      <Image
                                        // src={card.logo}
                                        src={card.product_img}
                                        alt="rejsection6image"
                                        width={300}
                                        height={300}
                                        style={{ marginTop: "5px", marginLeft: "2px", marginBottom: "10px" }}
                                        layout="intrinsic"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </>) :
                              (<>
                              </>)
                          }
                        </>

                      );
                    })}

                  </>) :
                (<>
                </>)
            }
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
            </div>
            </div>
       <RejectionPageFooter/>
        </>
        
      );
    }
    
    export default NewPlRejPage