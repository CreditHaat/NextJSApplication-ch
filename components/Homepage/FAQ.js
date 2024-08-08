"use client"

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const theme = createTheme({
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          position:'static' // Remove the box shadow here
        },
      },
    },
  },
});



export default function FAQ() {
  return (
    <>
    <section class='container'>
     <div class="faq-main_home"><h2>FAQs</h2></div>
                <div class="faq-main_disc text-center">We aim to solve your credit needs - simlpe and hassle free.CreditHaat is a one-stop shop for all your
              credit needs
    </div>
   
    <div style={{width:'100%'}}>
    <ThemeProvider theme={theme}>
  <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{

           // use summary background color
            
            color: 'success.dark', // use summary default color
            
            
            
            }}
        >
          <Typography sx={{fontFamily:'Noto Sans',fontStyle:'normal',borderBottomColor:"red", fontWeight: 500,fontSize:'20px',
  color: '#18181C'}}> 
  Will taking a loan from CreditHaat be costly?
</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{
             fontFamily: 'Noto Sans',fontStyle:'normal',fontWeight:500,fontSize:'20px',
             lineHeight: '27px',letterSpacing: '0.02em',color: '#18181C'}}>
          CreditHaat has tied up with the best lenders in India. CreditHaat ensures that users find the best loan offer for themselves.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{fontFamily:'Noto Sans',fontStyle:'normal',borderBottomColor:"red", fontWeight: 500,fontSize:'20px',
  color: '#18181C'}}> 
           Does CreditHaat charge any fees from users?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{
             fontFamily: 'Noto Sans',fontStyle:'normal',fontWeight:500,fontSize:'20px',
             lineHeight: '27px',letterSpacing: '0.02em',color: '#18181C'}}>
          No CreditHaat does not charge any fees from its users.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{fontFamily:'Noto Sans',fontStyle:'normal',borderBottomColor:"red", fontWeight: 500,fontSize:'20px',
  color: '#18181C'}}>  Is sharing personal information safe?
</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{
             fontFamily: 'Noto Sans',fontStyle:'normal',fontWeight:500,fontSize:'20px',
             lineHeight: '27px',letterSpacing: '0.02em',color: '#18181C'}}>  
          Yes, CreditHaat uses the best encryption and security mechanisms to protect user information.

          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{fontFamily:'Noto Sans',fontStyle:'normal',borderBottomColor:"red", fontWeight: 500,fontSize:'20px',
  color: '#18181C'}}> 
           Will CreditHaat team help in completing loan application?
</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{
             fontFamily: 'Noto Sans',fontStyle:'normal',fontWeight:500,fontSize:'20px',
             lineHeight: '27px',letterSpacing: '0.02em',color: '#18181C'}}>  
          CreditHaat’s experienced loan executives will provide users all the help to complete the loan application.

          </Typography>
        </AccordionDetails>
      </Accordion>
      </ThemeProvider>
      </div>
      </section>
            </>
  );
}
