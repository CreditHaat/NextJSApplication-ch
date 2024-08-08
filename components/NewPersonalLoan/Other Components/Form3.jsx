import './Form.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewFormPageImage from '../NewPersonalLoanImages/NewFormPageImage.png';
import Image from 'next/image'
import FormInputs from './FormInputs';
import Consent from './Consent';
import FormSubmitBtn from './FormSubmitBtn';
import FormComponentsWrapper from './FormComponentsWrapper';
// import EmblaCarousel from './Emblacarousel/js/EmblaCarousel';
import EmblaCarousel from './Emblacarousel/js/BaseEmblaCarousel';



// import FormPageCarousel from './FormPageCarousel';


const Form3 = () => {



    return (
        <>
            <div className='container'>
                <section className="container banner" style={{ borderRadius: '20px', marginTop: '10px', backgroundColor: '#f2edff' }}>
                    <div className="row py-md-5 px-md-5" style={{ display: "flex" }}>
                        {/* style={{height:'220px'}} */}
                        <div className="col-md-6">

                            {/* ------------------------Carousel Component------------------------------------------------ */}

                            {/* <Image
                                src={NewFormPageImage}
                                className="img-fluid"
                                width={500}
                                height={500}
                                layout='intrensic'
                                alt='Banner Image'
                                style={{marginBottom:"20px"}}
                            /> */}
                            {/* <FormPageCarousel /> */}
                            <EmblaCarousel/>
                            {/*----------------- Carousel Component Ends Here---------------------------------------- */}

                        </div>
                        <div className="col-md-6 py-md-5 px-md-5" style={{ justifyContent: "center", alignItems: "center" }}>
                            <h4 style={{ textAlign: 'center', color: '#3e2780' }}>Check Eligibility</h4>
                            <div className="row" style={{ display: "flex" }}>
                                <form>
                                    {/* <FormInputs/>
                    <Consent/>
                    <FormSubmitBtn/> */}
                                    <FormComponentsWrapper />
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* here we will call the review component */}



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
                height: auto; /* Ensures */}
    `}

                </style>
            </div>


        </>
    )
}

export default Form3
