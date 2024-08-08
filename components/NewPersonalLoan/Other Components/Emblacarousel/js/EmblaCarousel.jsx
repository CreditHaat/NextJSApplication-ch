"use client"

import React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import '../css/sandbox.css'
import '../css/embla.css'

const EmblaCarousel = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  return (<>
    <section className="embla" dir="rtl">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
            {
                (slides)?(
                    slides.map((slide, index) => (
                        <div className="embla__slide" key={index}>
                          <div className="embla__slide__number">
                            {/* {index + 1} */}
                          {/* <img className="embla__slide__image" src={slide.imageUrl} alt={`Slide ${index + 1}`} /> */}
                          <Image
                          src={slide.imageUrl}
                          className='img-fluid'
                          width={450}
                          height={180}
                          layout='intrensic'
                        //   className="embla__slide__image"
                          alt={`Slide ${index + 1}`}/>
                          </div>
                        </div>
                      ))
                    ):(<div></div>)
            }
          
        </div>
      </div>
    </section>
    <style>
                    {`

                    .embla{
                        max-width: 48rem;
                        margin: auto;
                        --slide-height:15rem;
                        --slide-spacing:0.9rem;
                        --slide-size:100%;
                    }
            
    `}

                </style>
    </>
  )
}

export default EmblaCarousel

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

