import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

const Lenders = () => {

    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4,setOpen4]=useState(false);
    const [open5,setOpen5]=useState(false);
    const [open6,setOpen6]=useState(false);
    const [open7,setOpen7]=useState(false);


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
    const handleClickOpen4 = () => {
      setOpen4(true);
    };
    const handleClickOpen5 = () => {
      setOpen5(true);
    };
    const handleClickOpen6 = () => {
      setOpen6(true);
    };
    const handleClickOpen7 = () => {
      setOpen7(true);
    };
    const handleClose = () => {
      setOpen(false);
      setOpen1(false);
      setOpen2(false);
      setOpen3(false);
      setOpen4(false);
      setOpen5(false);
      setOpen6(false);
      setOpen7(false);

    };
  return (
    <>
  <Card sx={{ maxWidth: {sm:250,md:500,lg:800},marginLeft:{lg:'250px',md:'170px',sm:'0px'},marginTop:'10px' }}>
  <CardMedia
        component="img"
        alt="logo"
        style={{height:'40px',width:'auto',marginLeft:'30px',marginTop:'20px'}}
        image="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/KreditBee.png"
      />
    <Card sx={{display:'flex',flexDirection:['column','row','row'],}}>
    
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily:'Noto Serif'}}>
        KreditBee
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontFamily:'Noto Serif',fontSize:'20px'}}>
        Amount range:₹1,000-₹3,00,000<br/>
          Features:Personal Loans for Salaried Individuals
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}}>Apply Now</Button>
        <Button size="small"  variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}} 
        onClick={handleClickOpen}>Know More</Button>
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
          GrievanceRedressalOfficer: Ms. Meghana Shah<br/>
Company name: Finnovation Tech Solutions Private Limited<br/>
Tel: 080-44292200<br/>
Email: help@kreditbee.in<br/>
CustomerCare: 080-44292200,help@kreditbee.in<br/>
Loans on KreditBee are provided by RBI regulated NBFCs - a complete list along with the lender’s details can be found on the following link - https://www.kreditbee.in/grievance-
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
        style={{height:'50px',width:'auto',marginLeft:'30px',marginTop:'20px'}}
        image="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/Moneytap+-+logo.png"
      />
    <Card sx={{display:'flex',flexDirection:['column','row','row'],}}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily:'Noto Serif'}}>
        Moneytap
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontFamily:'Noto Serif',fontSize:'20px'}}>
        Amount range:₹3,000-₹5 Lakh<br/>
          Features:Digital Credit Line
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
        style={{height:'50px',width:'auto',marginLeft:'30px',marginTop:'20px'}}
        image="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/MoneyView+-+logo.png"
      />
    <Card sx={{display:'flex',flexDirection:['column','row','row'],}}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily:'Noto Serif'}}>
        MoneyView
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontFamily:'Noto Serif',fontSize:'20px'}}>
        Amount range:₹5,000-₹5,00,000<br/>
          Features:Personal Loans for Salaried and <br/>
          Self Employed Individuals
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}}>Apply Now</Button>
       <Button size="small"  variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}}
         onClick={handleClickOpen1}>Know More</Button>
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
          GrievanceRedressalOfficer: Mr. Venkatraman Narayan<br/>
Company name: Whizdm Innovations Private Limited<br/>
Tel: +91-8045692002<br/>
Email: grievance@moneyview.in<br/>
CustomerCare: +91-8045692002<br/>
Loans on MoneyView are provided by RBI regulated NBFCs - a complete list can be found here - https://moneyview.in/our-lending-partn
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
        style={{height:'50px',width:'auto',marginLeft:'30px',marginTop:'20px'}}
        image="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/mPokket+-+Logo.png"
      />
    <Card sx={{display:'flex',flexDirection:['column','row','row'],}}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily:'Noto Serif'}}>
        Mpocket
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontFamily:'Noto Serif',fontSize:'20px'}}>
        Amount range:₹2,000-₹30,000<br/>
          Features:Short term personal loans
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
        style={{height:'50px',width:'auto',marginLeft:'30px',marginTop:'20px'}}
        image="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/Navi+-+Logo.png"
      />
    <Card sx={{display:'flex',flexDirection:['column','row','row'],}}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily:'Noto Serif'}}>
        Navi
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontFamily:'Noto Serif',fontSize:'20px'}}>
        Amount range:₹10,000-₹10,00,000<br/>
          Features:Short term personal loans
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}}>Apply Now</Button>
       <Button size="small"  variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}} 
        onClick={handleClickOpen2}>Know More</Button>
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
           CustomerCare: Loan: help@navi.com<br/>
Loans on NAVI are provided by RBI regulated NBFC - Navi Finserv Private Limited
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
        style={{height:'50px',width:'auto',marginLeft:'30px',marginTop:'20px'}}
        image='https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/NIRA-logo.png'
      />
    <Card sx={{display:'flex',flexDirection:['column','row','row'],}}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily:'Noto Serif'}}>
        Nira	
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontFamily:'Noto Serif',fontSize:'20px'}}>
        Amount range:₹5,000-₹100,000	<br/>
          Features:Short term personal loans
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
           GrievanceRedressalOfficer: Goutham R<br/>
Company name: Shuhari Tech Ventures Private Limited<br/>
Email: goutham.r@nirafinance.com<br/>
CustomerCare: support@nirafinance.com<br/>
Loans on NIRA are provided by RBI regulated NBFCs - a complete list along with the lender’s details can be found on the following link - https://nirafinance.com/#partners
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
        style={{height:'50px',width:'auto',marginLeft:'30px',marginTop:'20px'}}
        image='https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/Prefr.png'
      />
    <Card sx={{display:'flex',flexDirection:['column','row','row'],}}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily:'Noto Serif'}}>
        Prefr	
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontFamily:'Noto Serif',fontSize:'20px'}}>
        Amount range:₹10,000-₹3,00,000	<br/>
          Features:Personal Loans for Salaried <br/>
           Self Employed Individuals
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}}>Apply Now</Button>
       <Button size="small"  variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}} 
        onClick={handleClickOpen4}>Know More</Button>
        <BootstrapDialog
         onClose={handleClose}
         aria-labelledby="customized-dialog-title"
         open={open4}
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
           GrievanceRedressalOfficer: Mr. Moksh Jain<br/>
Company name: Shuhari Tech Ventures Private Limited<br/>
Tel: 9341 300 300<br/>
Email: nodal.officer@prefr.com<br/>
CustomerCare: 9341 300 300<br/>
info@prefr.com
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
        style={{height:'50px',width:'auto',marginLeft:'30px',marginTop:'20px'}}
        image="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/Privo.png"
      />
    <Card sx={{display:'flex',flexDirection:['column','row','row'],}}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily:'Noto Serif'}}>
        Privo
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontFamily:'Noto Serif',fontSize:'20px'}}>
        Amount range:₹20,000-₹2,00,000<br/>
          Features:Personal Loans for Salaried and<br/>
           Self Employed Individuals
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
        style={{height:'50px',width:'auto',marginLeft:'30px',marginTop:'20px'}}
        image='https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/Stash+Fin+-+logo.jpeg'
      />
    <Card sx={{display:'flex',flexDirection:['column','row','row'],}}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily:'Noto Serif'}}>
        StashFin
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontFamily:'Noto Serif',fontSize:'20px'}}>
        Amount range:₹1000-₹5,00,000	<br/>
          Features:Personal Loans for Salaried <br/>
           Self Employed Individuals
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}}>Apply Now</Button>
       <Button size="small"  variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}} 
        onClick={handleClickOpen6}>Know More</Button>
        <BootstrapDialog
         onClose={handleClose}
         aria-labelledby="customized-dialog-title"
         open={open6}
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
           <CloseIcon/>
         </IconButton>
         <DialogContent dividers>
           <Typography  gutterBottom style={{fontFamily:'Noto Serif',color:'#3E2780',fontSize:'18px'}}>
          <br/> GrievanceRedressalOfficer: Mr. Sanjeev Walia<br/>
Company name: EQX Analytics Private Limited<br/>
Tel: +91-9953595222<br/>
Email: grievance.officer@stashfin.com<br/>
CustomerCare:info@StashFin.com
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
        image="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/tatacapital.png"
      />
    <Card sx={{display:'flex',flexDirection:['column','row','row'],}}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily:'Noto Serif'}}>
        Tata Capital
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontFamily:'Noto Serif',fontSize:'20px'}}>
        Amount range:₹1,00,000-₹75,00,000	<br/>
          Features:Personal Loans for Salaried <br/>
           Self Employed Individuals
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}}>Apply Now</Button>
       <Button size="small"  variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}} 
        onClick={handleClickOpen5}>Know More</Button>
        <BootstrapDialog
         onClose={handleClose}
         aria-labelledby="customized-dialog-title"
         open={open5}
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
           <CloseIcon/>
         </IconButton>
         <DialogContent dividers>
           <Typography  gutterBottom style={{fontFamily:'Noto Serif',color:'#3E2780',fontSize:'18px'}}>
          <br/> GrievanceRedressalOfficer: Rajesh Kumar<br/>
Company name: Tata Capital Limited<br/>
Tel: 022-68219546<br/>
Email: CCRO@tatacapital.com<br/>
CustomerCare: 022-68219546<br/>
connect@flexiloans.com
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
        style={{height:'50px',width:'auto',marginLeft:'30px',marginTop:'20px'}}
        image='https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/RupeeRedee+-+logo.png'
      />
    <Card sx={{display:'flex',flexDirection:['column','row','row'],}}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily:'Noto Serif'}}>
        RupeeRedee		
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontFamily:'Noto Serif',fontSize:'20px'}}>
        Amount range:₹2000-₹25,000	<br/>
          Features:Short term personal loans
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}}>Apply Now</Button>
       <Button size="small"  variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}} 
      >Know More</Button>
      </CardActions>
    </Card>
    </Card>

    <Card sx={{ maxWidth: {sm:250,md:500,lg:800},marginLeft:{lg:'250px',md:'170px',sm:'0px'},marginTop:'10px' }}>
  <CardMedia
        component="img"
        alt="logo"
        style={{height:'70px',width:'auto',marginLeft:'30px',marginTop:'20px'}}
        image='https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/Upwards+-+Logo.png'
      />
    <Card sx={{display:'flex',flexDirection:['column','row','row'],}}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily:'Noto Serif'}}>
        Upwards
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontFamily:'Noto Serif',fontSize:'20px'}}>
        Amount range:₹20,000 - ₹5,00,000<br/>
          Features:Short term personal loans 
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}}>Apply Now</Button>
       <Button size="small"  variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}} 
        onClick={handleClickOpen7}>Know More</Button>
        <BootstrapDialog
         onClose={handleClose}
         aria-labelledby="customized-dialog-title"
         open={open7}
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
           <CloseIcon/>
         </IconButton>
         <DialogContent dividers>
           <Typography  gutterBottom style={{fontFamily:'Noto Serif',color:'#3E2780',fontSize:'18px'}}>
          <br/> GrievanceRedressalOfficer: Mr. Venkatesh Dontul<br/>
Company name: Upwards Capital Private Limited<br/>
Tel: + 91 98921 56608<br/>
Email: venkatesh.dontul@go-upwards.com<br/>
CustomerCare: +91-77150 98615
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
        style={{height:'50px',width:'auto',marginLeft:'30px',marginTop:'20px'}}
        image='https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/Kissht+Logo-01.jpg'
      />
    <Card sx={{display:'flex',flexDirection:['column','row','row'],}}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily:'Noto Serif'}}>
        Kissht		
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontFamily:'Noto Serif',fontSize:'20px'}}>
        Amount range:₹40,000 - ₹2,00,000	<br/>
          Features:Instant credit line to solve<br/>
           your money problems.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}}>Apply Now</Button>
       <a href='https://kissht.com/customer_grievance'><Button size="small"  variant='contained' style={{background:'#3E2780',borderRadius:'0px',fontFamily:'Times New Roman',marginLeft:'30px'}} 
      >Know More</Button></a>
      </CardActions>
    </Card>
    </Card>
    </>
  )
}

export default Lenders