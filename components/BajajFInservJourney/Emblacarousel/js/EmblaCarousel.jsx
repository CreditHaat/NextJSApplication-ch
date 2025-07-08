"use client";

import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import "../css/sandbox.css";
import "../css/embla.css";

const EmblaCarousel = (props) => {
  const { slides, options } = props;
  // const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect(); // Update the selected index on mount

    return () => {
      emblaApi.off("select", onSelect);
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
        {/* <div className="embla__pagination">
          {slides &&
            slides.map((_, index) => (
              <button
                key={index}
                className={`embla__pagination__dot ${
                  index === selectedIndex ? "is-active" : ""
                }`}
                onClick={() => emblaApi.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
        </div> */}
      </section>
      <style>
        {`
          .embla {
            max-width: 48rem;
            margin: auto;
            position: relative; /* To position the dots relative to the carousel */
            --slide-height: 13rem;
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
        `}
      </style>
    </>
  );
};

export default EmblaCarousel;
