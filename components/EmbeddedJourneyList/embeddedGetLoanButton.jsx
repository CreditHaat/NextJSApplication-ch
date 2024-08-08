import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';

const embeddedGetLoanButton = ({lenderProduct, productsArr, lenderCpi, lenderApplicationLink, lender_id, setLenderProduct,setProductsArr,setLenderCpi, setLenderApplicationLink, setLender_id, lender,isOtpVerified, setIsVisible, mobileNumber, setStgOneHitId, setstgTwoHitId, sett_experian_log_id, getLoanBackend}) => {


  // useEffect(()=>{
  //   const localStorage = localStorage.get('isOtpVerified');
  //   if(localStorage){
  //     setIsOtpVerified(localStorage)
  //   }
    
  // },[])

  

  // useEffect(()=>{
  //   if(isOtpVerified){
  //     console.log("Inside embedded is otp cerified is t",isOtpVerified);
  //   }else{
  //     console.log("Inside embedded is otp cerified is f",isOtpVerified);
  //   }
  // },[isOtpVerified])

  // const [lenderProduct, setLenderProduct] = useState('');
  // const [lenderCpi, setLenderCpi] = useState('');
  // const [lenderApplicationLink, setLenderApplicationLink] = useState('');
  // const [lender_id, setLender_id] = useState('');
  // const [productsArr, setProductsArr] = useState([]);

  useEffect(() => { //This will be called when the user clicks on the getLoan button 
    if (lenderProduct !== '') {
        handleOTPComponent();
        console.log("Inside Usestate of lender product productsArr ", productsArr);
        console.log("Inside Usestate of lender product lenderProduct ",lenderProduct);
        console.log("Inside Usestate of lender product lenderCpi ",lenderCpi);
        console.log("Inside Usestate of lender product lenderApplicationLink ",lenderApplicationLink);
        console.log("Inside Usestate of lender product lender_id ",lender_id);

    }
}, [lenderProduct, productsArr, lenderCpi, lenderApplicationLink, lender_id])

// useEffect(()=>{
//   console.log("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");
//   if(lenderProduct !== ''){
//     handleOTPComponent();
//   }
// },[lenderProduct])

const handleOTPComponent = () => {
  OTPGenerate();

  // setIsVisible(true);

};

const OTPGenerate = async () => {
  // e.preventDefault();

  const localStatus = localStorage.getItem('verifiedOTP');
  if(localStatus){
    console.log("localStorage valule is :: ",localStatus);
  }

  if (localStatus === "false") {
      try {
          setIsVisible(true);
          const queryParams = new URLSearchParams(location.search);

          // Retrieve values for the specified parameters
          const channel = queryParams.get('channel') || '';
          const dsa = queryParams.get('dsa') || '';
          const source = queryParams.get('source') || '';
          const subSource = queryParams.get('sub_source') || '';
          const subDsa = queryParams.get('sub_dsa') || '';

          console.log(mobileNumber);
          console.log("Inside OTP Generate....................., mobileNumber : ", mobileNumber);

          const urllink = location.search?.split('?')[1] || 'null';

          const formData1 = new FormData();
          formData1.append('userPhoneNumber', mobileNumber);
          // formData1.append('firstName', formData.firstName);
          // formData1.append('lastName', formData.lastName);
          // formData1.append('profession', formData.profession);
          formData1.append('dsa', dsa);
          formData1.append('channel', channel);
          formData1.append('source', source);
          formData1.append('sub_source', subSource);
          formData1.append('campaign', urllink);
          formData1.append('sub_dsa', subDsa);


          // const response = await axios.post(`${process.env.REACT_APP_BASE_URL}chfronetendotpgenerator`, formData1, {
          //     headers: {
          //         'Content-Type': 'application/json',
          //     },
          // });

          const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}chEmbeddedList_OTPGenerate`, formData1);

          if (response.data.code === 0) {

              setStgOneHitId(response.data.obj.stgOneHitId);
              setstgTwoHitId(response.data.obj.stgTwoHitId);
              sett_experian_log_id(response.data.obj.t_experian_log_id);

          }

          console.log("tejas", response);

          if (response.status === 200) {
              console.log('Submission successful:', response.data);
          } else {
              console.error('Submission failed:', response.statusText);
          }
      } catch (error) {
          console.error('Error submitting form:', error);
      }
  } else {
      console.log("Inside else");
      getLoanBackend(lenderProduct);
  }

};

  return (
    <div className="action-button">

                <button size="small"
                    onClick={(e) => {
                        setLenderProduct(lender.product);
                        setProductsArr((prevProductsArr) => [...prevProductsArr, lender.product]);
                        setLenderCpi(lender.cpi);
                        setLenderApplicationLink(lender.applicationlink);
                        setLender_id(lender.product_id);
                        // handleOTPComponent();
                    }}
                    variant="contained"
                    className="getLoanButton">

                    Get Loan
                </button>
                {/* </Link> */}
            </div>
  )
}

export default embeddedGetLoanButton
