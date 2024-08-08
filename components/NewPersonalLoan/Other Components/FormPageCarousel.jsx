// "use client"
import './FormPageCarousel.css'; // Import your CSS file for styling
import NewFormPageImage from '../NewPersonalLoanImages/NewFormPageImage.png';
import NewFormPageImage2 from '../NewPersonalLoanImages/FormPageImage2.png';
import NewFormPageImage3 from '../NewPersonalLoanImages/FormPageImage3.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Image from 'next/image';

const Carousel = () => {

  return (
    <>
      <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="2000">
            {/* <img src={NewFormPageImage3} className="d-block w-100" alt="..."/> */}
            <Image src={NewFormPageImage}
              classNameName='object-container'
              alt='promptopia logo'
              width={300}
              height={150}
              layout="intrensic"
            />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            {/* <img src={NewFormPageImage2} className="d-block w-100" alt="..."/> */}
            <Image src={NewFormPageImage2}
              classNameName='object-container'
              alt='promptopia logo'
              width={300}
              height={150}
              layout="intrensic"
            />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            {/* <img src={NewFormPageImage} className="d-block w-100" alt="..."/> */}
            <Image src={NewFormPageImage3}
              classNameName='object-container'
              alt='promptopia logo'
              width={300}
              height={150}
              layout="intrensic"
            />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Carousel;
