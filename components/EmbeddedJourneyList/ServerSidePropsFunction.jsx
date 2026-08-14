"use server"

import axios from "axios";
import CHEmbeddedListCards from './CHEmbeddedListCards';
import Loader from './Toader';
import EmbeddedListNavbar from './EmbeddedListNavbar';
import CompanyPerformance from './CompanyPerformance';
import EmblaCarousel from "../../components/EmbeddedJourneyList/Emblacarousel/js/EmblaCarousel";
import listimage1 from '../../components/NewBlJourneyD/newblimages/banner11.png';
import listimage2 from '../../components/NewBlJourneyD/newblimages/banner22.png';
import listimage3 from '../../components/NewBlJourneyD/newblimages/banner333.png';
import { headers } from "next/headers";

const OPTIONS = { direction: 'rtl', loop: true };
const SLIDES = [
  { imageUrl: listimage1 },
  { imageUrl: listimage2 },
  { imageUrl: listimage3 },
  // { imageUrl: listimage1 },
  // { imageUrl: listimage2 },
];




const getData = async (searchParams) => {

    const formData1 = new FormData();
    formData1.append('mobilenumber',searchParams.mobilenumber);
    formData1.append('cpi',searchParams.cpi);
    formData1.append('sso',searchParams.sso);

    try{
      console.log('BASE URL:', process.env.NEXT_PUBLIC_REACT_APP_BASE_URL);

      const response =await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}lenderslist1`, formData1, {
        headers: {
          'Content-Type': 'application/json',
          'token': 'Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=', // Add your token here
           "X-Forwarded-For": searchParams.userIP,
        }
      })
      return response.data;
    }catch(error){
      console.log(error);
    }
    
    return null;
    
   }

   const getClientIP = async () => {
  const headersList = await headers();

  const forwardedFor = headersList.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return headersList.get("x-real-ip") || null;
};

const ServerSidePropsFunction = async ({params, searchParams}) => {
    // const response = await getData({searchParams});

    // const response = await OTPGenerate({searchParams});

    // response=null;

    // const queryParams = Object.fromEntries(new URLSearchParams(searchParams));
    // const queryParams = searchParams ?? {};
    const queryParams = await searchParams; // ✅ THIS IS REQUIRED

    const header = queryParams.ch_header;
    const mobile = queryParams.mobilenumber;
    const cpi = queryParams.cpi;
    const sso = queryParams.sso;

    // const response = await getData(queryParams);
    const userIP = await getClientIP();

  const response = await getData({
    ...queryParams,
    userIP,
  });


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
        {(response!==null)?(<CHEmbeddedListCards json1={response.data} mobile={mobile}/>):(<CHEmbeddedListCards json1={null} mobile={mobile}/>)
          
        }
      </div>
    </div>
  )

  
}

export default ServerSidePropsFunction