"use cilent"

import React, { useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
// import { useNavigate } from 'react-router-dom';
import './FileAnimation.css';
import { Button } from '@mui/material';
import image1 from '../../images/creditcardgif.gif';
import axios from 'axios';
import Image from 'next/image'
import {useRouter} from 'next/navigation';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  
const Dialogbox = () => {
    const [open,setOpen] = React.useState(true);
    
    // const navigate=useNavigate();
    const router = useRouter();
    // Include 'navigate' in the dependency array
     
    const handleClose = () => {
      setOpen(false);
    };
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Create a FormData object
  /*const formData = new FormData();
  formData.append('userPhoneNumber', userPhoneNumber);*/
  
  
  // Add data to the FormData
  const userPhoneNumber = sessionStorage.getItem('userPhoneNumber');
  
  
  // Convert FormData to JSON object
  const data = {
    mobilenumber: userPhoneNumber 
  };
  
          
          console.log("hitting api");
        
          const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}api/creditcard/submit`, data, {
            headers: {
              'Content-Type': 'application/json',
              'token': 'Y3JlZGl0aGFhdHRlc3RzZXJ2ZXI=' // Add your token here
            }
          });
        
          console.log(response.data);
          if(response.data.code ===200)
          {
            sessionStorage.setItem('sucessData',JSON.stringify(response.data));
            //  navigate('/list')
             router.push('/list');
          }
          else{
            
          }
        } catch (error) {
          console.error('Error:', error);
        }
    };
      fetchData();
    }, []);
    
  return (
    <Dialog 
    className="blink-animation"
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    aria-describedby="alert-dialog-slide-description"
   //PaperProps={{ sx: { borderRadius: "10px", animation: 'spin 1s linear infinite;', border:' 5px solid transparent;'}}}
    PaperProps={{ sx: { borderRadius: "10px"}}}
    
      >
     
      
  {/* {<img src={image1} alt='animation' height={200} width={300} style={{margin:'auto'}}/> */}
  <Image
  src={image1}
  width={300}
  height={200}
  style={{margin:'auto'}}
  alt='animation'/>
{/* }   */}
    <DialogTitle style={{fontFamily:'Raleway',textAlign:'center',fontWeight:600,fontSize:'18px'}}>{" Processing...Your next step is just around the corner! "}</DialogTitle>
    <DialogContent>
      
     
    </DialogContent>
    
  </Dialog>
  )
}

export default Dialogbox