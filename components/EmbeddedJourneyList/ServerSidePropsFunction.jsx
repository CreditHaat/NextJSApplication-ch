"use server"

import axios from "axios";
import CHEmbeddedListCards from './CHEmbeddedListCards';
import Loader from './Toader';
import EmbeddedListNavbar from './EmbeddedListNavbar';
import CompanyPerformance from './CompanyPerformance';


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

const ServerSidePropsFunction = async ({params, searchParams}) => {
    const response = await getData({searchParams});

    const queryParams = Object.fromEntries(new URLSearchParams(searchParams));
    const header = queryParams.ch_header;

  return (
    <div>
      {/* <h2>Login Page</h2> */}
      <div>
        {/* {
            JSON.stringify(response.data)
        } */}

        {
          <Loader/>
        }
        <EmbeddedListNavbar/>

        {
          (!header || header==='yes')?(
            <div className='Performanceheader' style={{marginTop:'3px', marginBottom:'15px'}}>
            <CompanyPerformance/>
          </div>

          ):(<></>)
        }

         {/* <div className='Performanceheader' style={{marginTop:'3px', marginBottom:'15px'}}>
             <CompanyPerformance/>
           </div> */}

        {
          
            <CHEmbeddedListCards json1 = {response.data}/>
        }
      </div>
    </div>
  )

  
}

export default ServerSidePropsFunction

