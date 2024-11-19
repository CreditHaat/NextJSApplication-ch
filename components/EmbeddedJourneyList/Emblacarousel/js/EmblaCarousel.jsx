// "use client"

// import React from 'react'
// import Autoplay from 'embla-carousel-autoplay'
// import useEmblaCarousel from 'embla-carousel-react'
// import Image from 'next/image'
// import '../css/sandbox.css'
// import '../css/embla.css'

// const EmblaCarousel = (props) => {
//   const { slides, options } = props
//   const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

//   return (<>
//     <section className="embla" dir="rtl">
//       <div className="embla__viewport" ref={emblaRef}>
//         <div className="embla__container">
//             {
//                 (slides)?(
//                     slides.map((slide, index) => (
//                         <div className="embla__slide" key={index}>
//                           <div className="embla__slide__number">
//                             {/* {index + 1} */}
//                           {/* <img className="embla__slide__image" src={slide.imageUrl} alt={`Slide ${index + 1}`} /> */}
//                           <Image
//                           src={slide.imageUrl}
//                           className='img-fluid'
//                           width={550}
//                           height={180}
//                           layout='intrensic'
//                         //   className="embla__slide__image"
//                           alt={`Slide ${index + 1}`}/>
//                           </div>
//                         </div>
//                       ))
//                     ):(<div></div>)
//             }
          
//         </div>
//       </div>
//     </section>
//     <style>
//                     {`

//                     .embla{
//                         max-width: 48rem;
//                         margin: auto;
//                         --slide-height:15rem;
//                         --slide-spacing:0.9rem;
//                         --slide-size:100%;
//                     }
//                     /* Styles for desktop view */
//                     @media (min-width: 768px) {
//                       .embla {
//                         --slide-height: 15rem; /* Adjust height for desktop */
//                         --slide-spacing: 1.5rem; /* Adjust spacing for desktop */
//                         --slide-size: 100%; /* Adjust size for desktop */
//                       }
          
                    
//                     }
            
//     `}

//                 </style>
//     </>
//   )
// }

// export default EmblaCarousel

"use client"

import React, { useEffect, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import '../css/sandbox.css';
import '../css/embla.css';

const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect(); // Update the selected index on mount

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <>
      <section className="embla" dir="rtl">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {slides ? (
              slides.map((slide, index) => (
                <div className="embla__slide" key={index}>
                  <div className="embla__slide__number">
                    <Image
                      src={slide.imageUrl}
                      className="img-fluid"
                      width={550}
                      height={180}
                      layout="intrinsic"
                      alt={`Slide ${index + 1}`}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
        </div>
        {/* Pagination Dots */}
        <div className="embla__pagination">
          {slides &&
            slides.map((_, index) => (
              <button
                key={index}
                className={`embla__pagination__dot ${index === selectedIndex ? 'is-active' : ''}`}
                onClick={() => emblaApi.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
        </div>
      </section>

      <style>
        {`
          .embla {
            max-width: 48rem;
            margin: auto;
            position: relative;
            --slide-height: 15rem;
            --slide-spacing: 0.9rem;
            --slide-size: 100%;
          }

          .embla__viewport {
            overflow: hidden;
            position: relative;
          }

          .embla__pagination {
            position: absolute;
            bottom: 30px; /* Position dots at the bottom of the images */
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 0.5rem;
            justify-content: center;
          }

          .embla__pagination__dot {
            width: 8px;
            height: 8px;
            background: rgba(255, 255, 255, 0.5); /* Semi-transparent white */
            border-radius: 50%;
            border: none;
            cursor: pointer;
            transition: background 0.3s ease;
          }

          .embla__pagination__dot.is-active {
            background: rgba(255, 255, 255, 1); /* Fully white for active dot */
          }

          /* Styles for desktop view */
          @media (min-width: 768px) {
            .embla {
              --slide-height: 15rem; /* Adjust height for desktop */
              --slide-spacing: 1.5rem; /* Adjust spacing for desktop */
              --slide-size: 100%; /* Adjust size for desktop */
            }
          }
        `}
      </style>
    </>
  );
};

export default EmblaCarousel;


// import React from 'react';
// import Autoplay from 'embla-carousel-autoplay';
// import useEmblaCarousel from 'embla-carousel-react';
// import Image from 'next/image';
// import styles from './stylename.module.css';  // Adjust the path according to your actual CSS module location
// import '../css/base.css'
// import '../css/sandbox.css'
// import '../css/embla.css'

// const EmblaCarousel = (props) => {
//   const { slides, options } = props;
//   const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

//   return (
//     <>
//       <section className={styles.embla} dir="rtl">
//         <div className={styles.embla__viewport} ref={emblaRef}>
//           <div className={styles.embla__container}>
//             {slides ? (
//               slides.map((slide, index) => (
//                 <div className={styles.embla__slide} key={index}>
//                   <div className={styles.embla__slide__number}>
//                     <Image
//                       src={slide.imageUrl}
//                       className='img-fluid'
//                       width={400}
//                       height={170}
//                       layout='intrinsic'
//                       alt={`Slide ${index + 1}`}
//                     />
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div></div>
//             )}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default EmblaCarousel;

