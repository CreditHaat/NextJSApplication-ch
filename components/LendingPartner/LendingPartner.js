"use client"

import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Lenders from './Lenders';
import a from '../../images/bhanix.png';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const LendingPartner = () => {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3,setOpen3]=useState(false);
  const handleClickOpen = () => {
    setOpen(true);  
  };
  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClickOpen3 = () => {
    setOpen3(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpen1(false);
    setOpen2(false);
    setOpen3(false);
  };
  return (
    <>
     <section class="container banner" style={{paddingTop:"4%",paddingBottom:"4%"}}>
    <div class="row">
      <div class="col-md-6">
    <h1 class="banner_title">
        <span class="text-cont" style={{color: "#3E2780"}}>Lending</span>&nbsp;<span class="text-cont" style={{color:"#000"}} >partner</span>
        </h1>
      </div>
      <div class="col-md-6 text-center">
      </div>
    </div>
  </section>
  
  <Card sx={{ maxWidth: {sm:250,md:500,lg:800},marginLeft:{lg:'250px',md:'170px',sm:'0px'} }}>
  <CardMedia
        component="img"
        alt="logo"
        style={{height:'50px',width:'60px',marginLeft:'30px',marginTop:'20px'}}
        image="https://creditsaison.in/_nuxt/img/CS%20Logo.2f0b731.svg"
      />
    <Card sx={{display:'flex',flexDirection:['column','row','row'],}}>
    
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily:'Noto Serif'}}>
        Credit Saison
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontFamily:'Noto Serif',fontSize:'20px'}}>
        Amount range:₹20,000-₹5,00,000<br/>
          Features:Personal Loans for Salaried Individuals
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}}>Apply Now</Button>
        <Button size="small"  variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}} onClick={handleClickOpen}>
          Know More</Button>
        <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography  gutterBottom style={{fontFamily:'Noto Serif',color:'#3E2780',fontSize:'18px'}}>
          GrievanceRedressalOfficer: Preethi Nair<br/>
          Company name: Credit Saison india<br/>
Tel: +919962003070<br/>
Email: grievance@creditsaison-in.com,preethi.nair@creditsaison-in.com<br/>
CustomerCare: support@creditsaison-in.com<br/>
paperless process,money transfer in within 24 hours<br/>
          </Typography> 
        </DialogContent> 
      </BootstrapDialog>
      </CardActions>
    </Card>
    </Card>

    <Card sx={{ maxWidth: {sm:250,md:500,lg:800},marginLeft:{lg:'250px',md:'170px',sm:'0px'},marginTop:'10px' }}>
  <CardMedia
        component="img"
        alt="logo"
        style={{height:'70px',width:'auto',marginLeft:'30px',marginTop:'20px'}}
        image={a}
      />
    <Card sx={{display:'flex',flexDirection:['column','row','row'],}}>
    
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily:'Noto Serif'}}>
        Bhanix Finance And Investment
        Limited
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontFamily:'Noto Serif',fontSize:'20px'}}>
        Amount range:₹1,000 - ₹4,00,000<br/>
          Features:Personal Loans for Salaried Individuals
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}}>Apply Now</Button>
       <a href='https://bhanixfinance.com/products.html'><Button size="small"  variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}} >Know More</Button>
       </a>   
        
          
      </CardActions>
    </Card>
    </Card>

    <Card sx={{ maxWidth: {sm:250,md:500,lg:800},marginLeft:{lg:'250px',md:'170px',sm:'0px'},marginTop:'10px' }}>
  <CardMedia
        component="img"
        alt="logo"
        style={{height:'40px',width:'40px',marginLeft:'30px',marginTop:'20px'}}
        image="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/Fibe.png"
      />
    <Card sx={{display:'flex',flexDirection:['column','row','row'],}}>
    
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily:'Noto Serif'}}>
        Fibe
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontFamily:'Noto Serif',fontSize:'20px'}}>
        Amount range:₹8,0 000-₹5,00,000<br/>
          Features:Personal Loans for Salaried Individuals
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}}>Apply Now</Button>
      <Button size="small"  variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}} onClick={handleClickOpen1}>Know More</Button>    
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open1}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography  gutterBottom style={{fontFamily:'Noto Serif',color:'#3E2780',fontSize:'18px'}}>
          GrievanceRedressalOfficer: Mr. Ankit Sundriyal<br/>
Company name: Social Worth Technologies Private Limited<br/>
Tel: 020- 67639797<br/>
Email: grievance@fibe.in<br/>
CustomerCare: 020- 67639797,care@fibe.in<br/>
Loans on Fibe are provided by RBI regulated NBFCs - a complete list can be found on - https://www.fibe.in/our-lending-partners
          </Typography> 
        </DialogContent> 
      </BootstrapDialog>
      </CardActions>
    </Card>
    </Card>

    <Card sx={{ maxWidth: {sm:250,md:500,lg:800},marginLeft:{lg:'250px',md:'170px',sm:'0px'},marginTop:'10px' }}>
  <CardMedia
        component="img"
        alt="logo"
        style={{height:'40px',width:'40px',marginLeft:'30px',marginTop:'20px'}}
        image="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/Finnable+-+Logo.png"

      />
    <Card sx={{display:'flex',flexDirection:['column','row','row'],}}>
    
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily:'Noto Serif'}}>
        Finnable
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontFamily:'Noto Serif',fontSize:'20px'}}>
        Amount range:₹50,000 - ₹10,00,000<br/>
          Features:Personal Loans for Salaried Individuals
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}}>Apply Now</Button>
       <Button size="small"  variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}} >Know More</Button>
      
        
          
      </CardActions>
    </Card>
    </Card>

    <Card sx={{ maxWidth: {sm:250,md:500,lg:800},marginLeft:{lg:'250px',md:'170px',sm:'0px'},marginTop:'10px' }}>
  <CardMedia
        component="img"
        alt="logo"
        style={{height:'40px',width:'auto',marginLeft:'30px',marginTop:'20px'}}
        image="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/Finzy_Logo%403x.png"


      />
    <Card sx={{display:'flex',flexDirection:['column','row','row'],}}>
    
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily:'Noto Serif'}}>
        Finzy
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontFamily:'Noto Serif',fontSize:'20px'}}>
        Amount range:₹50,000 - ₹5,00,000<br/>
          Features:Personal Loans for Salaried Individuals
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}}>Apply Now</Button>
       <Button size="small"  variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}} >Know More</Button>
      
        
          
      </CardActions>
    </Card>
    </Card>

    <Card sx={{ maxWidth: {sm:250,md:500,lg:800},marginLeft:{lg:'250px',md:'170px',sm:'0px'},marginTop:'10px' }}>
  <CardMedia
        component="img"
        alt="logo"
        style={{height:'50px',width:'60px',marginLeft:'30px',marginTop:'20px'}}
        image="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/FlexiLoans.png"

      />
    <Card sx={{display:'flex',flexDirection:['column','row','row'],}}>
    
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily:'Noto Serif'}}>
        FlexiLoans
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontFamily:'Noto Serif',fontSize:'20px'}}>
        Amount range:₹50,000-₹1,00,00,000<br/>
          Features:Unsecured Business Loans for MSMEs
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}}>Apply Now</Button>
        <Button size="small"  variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}} onClick={handleClickOpen2}>
          Know More</Button>
        <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open2}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography  gutterBottom style={{fontFamily:'Noto Serif',color:'#3E2780',fontSize:'18px'}}>
          GrievanceRedressalOfficer: Mr. Manish Lunia<br/>
Company name: Epimoney Private Limited<br/>
Tel: 022-62603800<br/>
Email: compliance@epimoney.com , nodal.grievance@epimoney.com<br/>
CustomerCare: 02268219595 ,connect@flexiloans.com<br/>
Link- https://flexiloans.com/co-lenders , privacy policy link - https://flexiloans.com/regulatory
          </Typography> 
        </DialogContent> 
      </BootstrapDialog>
      </CardActions>
    </Card>
    </Card>

    <Card sx={{ maxWidth: {sm:250,md:500,lg:800},marginLeft:{lg:'250px',md:'170px',sm:'0px'},marginTop:'10px' }}>
  <CardMedia
        component="img"
        alt="logo"
        style={{height:'40px',width:'auto',marginLeft:'30px',marginTop:'20px'}}
        image="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/Fullerton+-+logo.jpeg"


      />
    <Card sx={{display:'flex',flexDirection:['column','row','row'],}}>
    
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily:'Noto Serif'}}>
        Fullerton
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontFamily:'Noto Serif',fontSize:'20px'}}>
        Amount range:₹50,000 - ₹5,00,000<br/>
          Features:Personal Loans for Salaried Individuals
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}}>Apply Now</Button>
       <Button size="small"  variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}} >Know More</Button>
      
        
          
      </CardActions>
    </Card>
    </Card>

    <Card sx={{ maxWidth: {sm:250,md:500,lg:800},marginLeft:{lg:'250px',md:'170px',sm:'0px'},marginTop:'10px' }}>
  <CardMedia
        component="img"
        alt="logo"
        style={{height:'40px',width:'auto',marginLeft:'30px',marginTop:'20px'}}
        image="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/Home+Credit+-+logo.png"



      />
    <Card sx={{display:'flex',flexDirection:['column','row','row'],}}>
    
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily:'Noto Serif'}}>
        HomeCredit
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontFamily:'Noto Serif',fontSize:'20px'}}>
        Amount range:₹5,000-₹5,00,000<br/>
          Features:Personal Loans for Salaried Individuals
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}}>Apply Now</Button>
       <Button size="small"  variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}} >Know More</Button>
      
        
          
      </CardActions>
    </Card>
    </Card>

    <Card sx={{ maxWidth: {sm:250,md:500,lg:800},marginLeft:{lg:'250px',md:'170px',sm:'0px'},marginTop:'10px' }}>
  <CardMedia
        component="img"
        alt="logo"
        style={{height:'40px',width:'auto',marginLeft:'30px',marginTop:'20px'}}
        image="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/IIFL_Finance.jpg"
      />
    <Card sx={{display:'flex',flexDirection:['column','row','row'],}}>
    
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily:'Noto Serif'}}>
        IIFL-BL
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontFamily:'Noto Serif',fontSize:'20px'}}>
        Amount range:₹50,000-₹30,00,000<br/>
          Features:Personal Loans for Salaried Individuals
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}}>Apply Now</Button>
       <Button size="small"  variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}} >Know More</Button>
      
        
          
      </CardActions>
    </Card>
    </Card>

    <Card sx={{ maxWidth: {sm:250,md:500,lg:800},marginLeft:{lg:'250px',md:'170px',sm:'0px'},marginTop:'10px' }}>
  <CardMedia
        component="img"
        alt="logo"
        style={{height:'40px',width:'auto',marginLeft:'30px',marginTop:'20px'}}
        image="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/IIFL_Finance.jpg"
      />
    <Card sx={{display:'flex',flexDirection:['column','row','row'],}}>
    
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily:'Noto Serif'}}>
        IIFL-PL
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontFamily:'Noto Serif',fontSize:'20px'}}>
        Amount range:₹5,000-₹5,00,000<br/>
          Features:Personal Loans for Salaried Individuals
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}}>Apply Now</Button>
       <Button size="small"  variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}} >Know More</Button>
      
        
          
      </CardActions>
    </Card>
    </Card>

    <Card sx={{ maxWidth: {sm:250,md:500,lg:800},marginLeft:{lg:'250px',md:'170px',sm:'0px'},marginTop:'10px' }}>
  <CardMedia
        component="img"
        alt="logo"
        style={{height:'40px',width:'auto',marginLeft:'30px',marginTop:'20px'}}
        image="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/Incred_Logo.png"

      />
    <Card sx={{display:'flex',flexDirection:['column','row','row'],}}>
    
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily:'Noto Serif'}}>
        Incred
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontFamily:'Noto Serif',fontSize:'20px'}}>
        Amount range:₹10,000-₹10,00,000<br/>
          Features:Personal Loans for Salaried Individuals
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}}>Apply Now</Button>
       <a href="https://www.incred.com/grievance.html"><Button size="small"  variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}} >Know More</Button>
       </a>  
      </CardActions>
    </Card>
    </Card>

    <Card sx={{ maxWidth: {sm:250,md:500,lg:800},marginLeft:{lg:'250px',md:'170px',sm:'0px'},marginTop:'10px' }}>
  <CardMedia
        component="img"
        alt="logo"
        style={{height:'40px',width:'auto',marginLeft:'30px',marginTop:'20px'}}
        image="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/Indifi+-+Logo.png"
      />
    <Card sx={{display:'flex',flexDirection:['column','row','row'],}}>
    
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily:'Noto Serif'}}>
        Indifi
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontFamily:'Noto Serif',fontSize:'20px'}}>
        Amount range:₹1,00,000-₹2,00,00,000<br/>
          Features:Business loan
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}}>Apply Now</Button>
       <Button size="small"  variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}} 
       onClick={handleClickOpen3}>Know More</Button>
       <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open3}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography  gutterBottom style={{fontFamily:'Noto Serif',color:'#3E2780',fontSize:'18px'}}>
          GrievanceRedressalOfficer:<br/>
Company name: Indifi Technologies<br/>
Tel: 9696555444<br/>
Email: grievances@indifi.com<br/>
CustomerCare: 9696555444,cs@indifi.com<br/>
Loans on Indifi are provided by RBI regulated NBFCs - a complete list along with the lender’s details can be found on the following link - https://www.indifi.com
          </Typography> 
        </DialogContent> 
      </BootstrapDialog>  
      </CardActions>
    </Card>
    </Card>
 
    <Lenders/>
    </>
  )
}

export default LendingPartner