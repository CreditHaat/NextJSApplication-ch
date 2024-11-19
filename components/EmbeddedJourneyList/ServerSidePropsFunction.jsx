"use server"

import axios from "axios";
import CHEmbeddedListCards from './CHEmbeddedListCards';
import Loader from './Toader';
import EmbeddedListNavbar from './EmbeddedListNavbar';
import CompanyPerformance from './CompanyPerformance';
// import EmblaCarousel from "../../components/NewBlJourneyD/Emblacarousel/js/EmblaCarousel";
import EmblaCarousel from "../../components/EmbeddedJourneyList/Emblacarousel/js/EmblaCarousel";
// import listimage1 from '../../components/NewBlJourneyD/newblimages/newblfirstpageimg11.png';
// import listimage2 from '../../components/NewBlJourneyD/newblimages/newblfirstpageimg2.png';
// import listimage3 from '../../components/NewBlJourneyD/newblimages/newblfirstpageimg33.png';
import listimage1 from '../../components/NewBlJourneyD/newblimages/banner11.png';
import listimage2 from '../../components/NewBlJourneyD/newblimages/banner22.png';
import listimage3 from '../../components/NewBlJourneyD/newblimages/banner333.png';

const OPTIONS = { direction: 'rtl', loop: true };
const SLIDES = [
  { imageUrl: listimage1 },
  { imageUrl: listimage2 },
  { imageUrl: listimage3 },
  // { imageUrl: listimage1 },
  // { imageUrl: listimage2 },
];




const getData = async ({searchParams}) => {

    const formData1 = new FormData();
    formData1.append('mobilenumber',searchParams.mobilenumber);
    
    const response =await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}lenderslist1`, formData1, {
                headers: {
                  'Content-Type': 'application/json',
                  'token': 'Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=' // Add your token here
                }
              })

    // if(!response.ok){
    //     throw Error;
        
    // }
    // return response.json();
    return response.data;
}

const getUrlLink = (searchParams) => {
  return Object.keys(searchParams).length ? 
    Object.entries(searchParams)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
    : 'null';
};

// const OTPGenerate = async ({searchParams}) => {
//   // e.preventDefault();

//   // const localStatus = localStorage.getItem('verifiedOTP');
//   // if(localStatus){
//     // console.log("localStorage valule is :: ",localStatus);
//   // }

//   // const localStatus = false;

//   // if (localStatus === "false") {
//       try {
//           // setIsVisible(true);
//           const queryParams = Object.fromEntries(new URLSearchParams(searchParams));
//           // const queryParams = new URLSearchParams(location.search);

//           // Retrieve values for the specified parameters
//           // const channel = queryParams.get('channel') || '';
//           const channel = queryParams.channel;
//           // const dsa = queryParams.get('dsa') || '';
//           const dsa = queryParams.dsa;
//           // const source = queryParams.get('source') || '';
//           const source = queryParams.source;
//           // const subSource = queryParams.get('sub_source') || '';
//           const subSource = queryParams.sub_source;
//           // const subDsa = queryParams.get('sub_dsa') || '';
//           const subDsa = queryParams.sub_dsa;

//           // console.log(mobileNumber);
//           // console.log("Inside OTP Generate....................., mobileNumber : ", mobileNumber);

//           // const urllink = location.search?.split('?')[1] || 'null';
//           const urllink = getUrlLink(searchParams);

//           const formData1 = new FormData();
//           formData1.append('mobilenumber',searchParams.mobilenumber);
//           // formData1.append('userPhoneNumber', mobileNumber);
//           // formData1.append('firstName', formData.firstName);
//           // formData1.append('lastName', formData.lastName);
//           // formData1.append('profession', formData.profession);
//           formData1.append('dsa', dsa);
//           formData1.append('channel', channel);
//           formData1.append('source', source);
//           formData1.append('sub_source', subSource);
//           formData1.append('campaign', urllink);
//           formData1.append('sub_dsa', subDsa);


//           // const response = await axios.post(`${process.env.REACT_APP_BASE_URL}chfronetendotpgenerator`, formData1, {
//           //     headers: {
//           //         'Content-Type': 'application/json',
//           //     },
//           // });

//           console.log("Inside the OTPGenerate");

//           const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}chEmbeddedList_OTPGenerate`, formData1);

//           console.log("After the OTP Generate");

//           if (response.data.code === 0) {

//               setStgOneHitId(response.data.obj.stgOneHitId);
//               setstgTwoHitId(response.data.obj.stgTwoHitId);
//               sett_experian_log_id(response.data.obj.t_experian_log_id);

//           }

//           console.log("tejas", response);

//           if (response.status === 200) {
//               console.log('Submission successful:', response.data);
//           } else {
//               console.error('Submission failed:', response.statusText);
//           }
//       } catch (error) {
//           console.error('Error submitting form:', error);
//       }
//   // } 
//   // else {
//       // console.log("Inside else");
//       // getLoanBackend(lenderProduct);
//   // }

// };

const ServerSidePropsFunction = async ({params, searchParams}) => {
    const response = await getData({searchParams});

    // const response = await OTPGenerate({searchParams});

    // response=null;

    const queryParams = Object.fromEntries(new URLSearchParams(searchParams));
    const header = queryParams.ch_header;
    const mobile = queryParams.mobilenumber;

  return (
    <div>

      {/* <button> Get Otp </button> */}

      {/* <h2>Login Page</h2> */}
      <div>
        {/* {
            JSON.stringify(response.data)
        } */}

        {
          <Loader/>
        }
        {/* <EmbeddedListNavbar/> */}

        {
          (!header || header==='yes')?(
            <div className='Performanceheader' style={{marginTop:'0px', marginBottom:'15px'}}>
             {/* <CompanyPerformance/> */}
          {/* <div className="carousel-background"> */}
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      {/* </div> */}
          </div>
          

          ):(<></>)
        }

         {/* <div className='Performanceheader' style={{marginTop:'3px', marginBottom:'15px'}}>
             <CompanyPerformance/>
           </div> */}

        {
          
            // <CHEmbeddedListCards json1 = {response.data}/>
        }
        {
          <CHEmbeddedListCards json1={response.data} mobile={mobile}/>
        }
      </div>
    </div>
  )

  
}

export default ServerSidePropsFunction

