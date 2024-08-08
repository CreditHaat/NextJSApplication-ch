"use client"

import React, { useContext, useState,useEffect ,useRef,createRef} from 'react'
import gif from '../../images/secondpageimagecc.png';
import second from '../../images/secondpageimage.png';
import Animation from './Animation';
import { Box, Button,FormControl,Grid,InputLabel,MenuItem,Select,TextField, Typography } from '@mui/material';
import FormFooter from './FormFooter';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { useNavigate } from 'react-router-dom';
import './Root.css';
import './Basicform.css';
import { UserContext } from '../../context/ContextFile';
import axios from 'axios';
import Image from 'next/image';
import {useRouter} from 'next/navigation';


const SecondFormPage = () => {
  const [pincode, setPincode] = useState('');
  const [income, setIncome] = useState('');
  const [employee, setEmployee] = useState('');
  const [companyName, setCompanyName] = useState('');
  const { user, updateUser } = useContext(UserContext);
  // const navigate=useNavigate();
  const [errorMessages, setErrorMessages] = useState({});

  const router = useRouter();

  

  const change = (e) => {
    setPincode(e.target.value);
  };

  const handleChange = (event) => {
    setEmployee(event.target.value);
  };

  const handleChange1 = (event) => {
    setIncome(event.target.value);
  };

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };
 
  const validateForm = () => {
    const errors = {
      employee: typeof employee === 'string' && employee.trim() === '' ? 'Employee Type is required' : '',
      income: typeof income === 'string' && income.trim() === '' ? 'Income is required' : '',
      pincode: typeof pincode === 'string' && pincode.trim() === '' ? 'Pincode is required' : '',
      companyName: employee === 'salaried' && (typeof companyName === 'string' && companyName.trim() === '') ? 'Company Name is required' : ''

    };
    setErrorMessages(errors);
    return Object.values(errors).every((error) => error === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //setLoading(true); // Always set loading to true when the form is submitted

    if (validateForm()) {
      console.log("Form Validated");
      handleVerification();   
    
    } else {
      console.log('Please fill in all required fields');
    }
  };

  const handleVerification = async () => {
    
    try {

      console.log("Inside handle Verification");

    const no=sessionStorage.getItem('userPhoneNumber');
    console.log("value from session is : ",no);
     const formData = new FormData();
     formData.append('employee', employee);
     formData.append('income', income);
     formData.append('pincode',pincode);
     formData.append('companyName',companyName)
     formData.append('userPhoneNumber',no);

     console.log("employee is  : ",employee);
     
     // Send the OTP verification request to the backend
     const response1 = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}creditcardsecond`, formData);
      sessionStorage.setItem('userData', JSON.stringify(response1.data.obj));
      // navigate('/dialogb');
      router.push('/dialogb');
      // Handle the response from the backend
     
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <>    
    <div style={{background:'linear-gradient(rgb(0 0 0 / 7%), rgb(153 153 153 / 17%))'}}>
    <Animation/>
    <section className="container banner">
        <div className="row" style={{ display: "flex" }}>
        <div className="col-md-6" style={{textAlign:'end'}}>
        <h5 
              class="banner_title"
              style={{
                fontFamily: 'Raleway',
                fontWeight: '800',
                color: 'rgba(0, 0, 0, 0.98)',
              }}
            >  
                  Step into a World of Benefits:<br/>
                 with Your Credit Card! 
            </h5>
            <figure className="figure">
              {/* <img
                src={gif}
                className="figure-img img-fluid banner_img"
                alt="..."
                style={{
                  
                  borderRadius:'20px',
                  marginLeft:'auto',
                  display:'block',
                  width: "100%",
                  maxWidth: "300px",
                  opacity:'0.7'
                }}
              /> */}

              <Image
              src={gif}
              className="figure-img img-fluid banner_img"
              width={200}
              height={200}
              layout='intrensic'
              style={{
                  
                borderRadius:'20px',
                marginLeft:'auto',
                display:'block',
                width: "100%",
                maxWidth: "300px",
                opacity:'0.7'
              }}
              alt="..."
              />
            </figure>
          </div>
          <div className="col-md-6" id="Con">
          <Box
      sx={{
        display: "flex",  
        
      }}
    >
     <Grid
        container
        direction="column"
        alignItems="left"
        justifyContent="left"
        sx={{ height: "100%" }}
        >
    <Grid item xs={12} md={4}>
    <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          maxWidth: 600,
          mx: "auto",
          p:2,
          borderRadius: "12px",
        }}
      >
          
         <Typography variant="h6" align="left" style={{fontFamily:'Raleway', textAlign:'center', fontSize:'15px', fontWeight:'700'}}>
         Moving Forward
                 </Typography>
        <Typography  align="" mb={2} style={{ textAlign:'center',fontSize:'16px', fontWeight:'600', color:'rgba(0, 0, 0, 0.68)'}}>
     Review and Submit Your Application       
           </Typography>
         <form>
         <TextField name="pincode" type='number'  fullWidth label="Pincode" 
         placeholder="Pincode" variant="standard" required 
        value={pincode}
        onChange={change}
      onInput={(e)=>{ e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,6)}} min={1}
     />
      <Typography style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
              {errorMessages.pincode}
          </Typography>
          <TextField name="income" type='number' fullWidth required
           label="Monthly Income" placeholder="Monthly Income" variant="standard" 
           value={income} onChange={handleChange1}
           style={{marginTop:'5px'}}  
           />
            <Typography style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
               {errorMessages.income}
             </Typography>
        
             <FormControl variant="standard" sx={{ width: '100%' ,marginTop:'5px'}} >
                          <InputLabel id="demo-simple-select-standard-label">Employment Type</InputLabel>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label="Employee Type"
                            sx={{ width: '100%' }}
                            value={employee}
                            required
                            onChange={handleChange}
                          >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value={'salaried'}>Salaried</MenuItem>
                            <MenuItem value={'self-employed'}>Self-Employed</MenuItem>
                            <MenuItem value={'business'}>Business</MenuItem>
                          </Select>
                        </FormControl>
                        <Typography style={{ color: 'red', fontSize: '14px' }}>{errorMessages.employee}</Typography>
     {employee === 'salaried' && (
        <TextField 
          name="companyName" 
          fullWidth 
          label="Company Name" 
          placeholder="Company Name" 
          variant="standard" 
          value={companyName}
          required
          onChange={handleCompanyNameChange}
          style={{marginTop:'5px'}} 
        />
      )}
    <Typography style={{ color: 'red', fontSize: '14px' }}>{errorMessages.companyName}</Typography>
    
      <Box sx={{display:'flex',marginTop:'10px'}}>
        <a href='/creditcard' style={{marginLeft:'10px',color:'inherit',opacity:0.6,border:'2px solid background: rgba(217, 217, 217, 0.49)',
        borderRadius:'7px',padding:'5px',background:'#80808057'}}>
          <ArrowBackIcon fontSize='large' />
        </a>
        <Button variant='contained'
         style={{marginLeft:'5%',width:'85%', backgroundColor:'#9747FF', height:'50px',borderRadius:'15px'}}
         onClick={handleSubmit}
          >Submit</Button>
      </Box>
         </form>
     </Box>   
    </Grid>      
    </Grid>    
    </Box>       
 </div>
       
        </div>
      </section>
      <style>
        {`
         
         @media (min-width: 768px) {
          .col-md-6 {
            flex: 0 0 auto;
            width: 50%;
            margin-top:7%;
         }
         .banner_title{
     font-size:26px;
         }
        }
          @media (max-width: 768px) {
            .input-group mb-3{
               width:100%
            }

            .banner_title{
              font-size:15px;
              text-align: center;
             margin-left: 9.5%;   

            }
             
            .row {
              flex-direction: column;
            }
            .col-md-6 {
              width: 100%;
            }
            .banner_img {
              max-width: 100%; /* Adjust width as needed */
              height: 180px; /* Ensures image does not distort */
              margin: 1rem auto; /* Adds some space around the image */
            }
          }
        `}
      </style>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
    {/* <img src={second} alt="Credit Card" style={{ maxWidth: '100%', height: 'auto' }} /> */}
    <Image
    src={second}
    width={200}
    height={200}
    layout='intrensic'
    style={{ maxWidth: '100%', height: 'auto' }}
    alt="Credit Card"
    />
  </div>


  

      <FormFooter/>
      </div>
    </>
  )
}

export default SecondFormPage;