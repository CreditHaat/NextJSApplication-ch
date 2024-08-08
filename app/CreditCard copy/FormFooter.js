
// import React from 'react'
// import { Box, Divider, Typography } from '@mui/material'

// import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import Carousel from 'react-multi-carousel';
// import './FormFooter.css';
// import 'react-multi-carousel/lib/styles.css';
// import logo1 from '../../images/logo1.png';
// import logo2 from '../../images/logo2.png';
// import logo3 from '../../images/logo3.png';
// import logo4 from '../../images/logo4.png';
// import logo5 from '../../images/logo5.png';
// // import { Link } from 'react-router-dom';
// import {Link} from 'next/link';


// const responsive = {
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 5, // Display 5 logos at a time on desktop
//     slidesToSlide: 5,
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 3, // Display 3 logos at a time on tablets
//     slidesToSlide: 3,
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1, // Display 1 logo at a time on mobile
//     slidesToSlide: 1,
//   },
// };

// const images = [
//   logo1,
//   logo2,
//   logo3,
//   logo4,
//   logo5
//   // Add more image URLs as needed
// ];

// const FormFooter = () => {
//   return (
//     <>
//       {/*<Carousel
//         swipeable={true}
//         draggable={true}
//         showDots={false}
//         responsive={responsive}
//         ssr={true}
//         infinite={true}
//         autoPlay={false}
//         keyBoardControl={true}
//         customTransition="all .5"
//         transitionDuration={500}
//         containerClass="carousel-container"
//         dotListClass="custom-dot-list-style"
//         itemClass="carousel-item-padding-20-px"
//       >
//         {/* Display logos with images */}
//        {/* {images.map((image, index) => (
//           <div key={index} className="logo">
//             <img src={image} />
//           </div>
//         ))}
//       </Carousel>*/}
    // <Box style={{padding:'15px',borderRadius:'5px',background:'rgba(158, 153, 45, 0.21)'}} >
    // <Link href="https://www.facebook.com/CreditHaat">
    //   <a style={{ textDecoration: 'none' }}>
    //     <FacebookOutlinedIcon fontSize='large' style={{ marginRight: '10px' }} />
    //   </a>
    // </Link>
    //  <Link to='https://www.linkedin.com/authwall?trk=bf&trkInfo=AQHWeFf-zoQMCwAAAX8vfJxQVbpS3r1zhH0G1-z1acajNSzujRSQtxOsMU185R39ouzVadGTw4t98zJhUqyKMxPa9HNQRKLaHCWMqbSybvab5IAhit2J583xeVRoWIyKI88N-dE=&originalReferer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2Fcredithaat%2F%3FviewAsMember%3Dtrue'>
    //  <a style={{textDecoration:'none'}}>
    //   <LinkedInIcon fontSize='large' /></a></Link> 
    //   <Typography style={{fontSize:'12px',fontWeight:600,color:'rgba(0, 0, 0, 0.57)',fontFamily:'Raleway'}}>
    //   © Vibhuprada Services Private Limited | All Rights Reserved with Copyright & TradeMarks
    //   </Typography>
    //   <Divider sx={{backgroundColor:'rgba(0, 0, 0, 0.35)',height:'1px'}} variant='middle'/>
    //   <Typography style={{color:'rgba(0, 0, 0, 0.57)',fontFamily:'Raleway',fontSize:'12px',fontWeight:500}}>
    //   Office No. 10 & 11, 1st Floor, Tower B, Downtown City Vista, Survey Number 58/2, Fountain Road, Kharadi Pune, Maharashtra 411014 India
    //   </Typography>
    // </Box>
//     </>
//   )
// }

// export default FormFooter;

import React from 'react'
import { Box, Divider, Typography } from '@mui/material'

import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Carousel from 'react-multi-carousel';
import './FormFooter.css';
import 'react-multi-carousel/lib/styles.css';
import logo1 from '../../images/logo1.png';
import logo2 from '../../images/logo2.png';
import logo3 from '../../images/logo3.png';
import logo4 from '../../images/logo4.png';
import logo5 from '../../images/logo5.png';
// import { Link } from 'react-router-dom';
import {Link} from 'next/link';


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5, // Display 5 logos at a time on desktop
    slidesToSlide: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3, // Display 3 logos at a time on tablets
    slidesToSlide: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1, // Display 1 logo at a time on mobile
    slidesToSlide: 1,
  },
};

const images = [
  logo1,
  logo2,
  logo3,
  logo4,
  logo5
  // Add more image URLs as needed
];

const FormFooter = () => {
  return (
    <>
    
    <Box style={{padding:'15px',borderRadius:'5px',background:'rgba(158, 153, 45, 0.21)'}} >
    {/* <Link href="https://www.facebook.com/CreditHaat"> */}
      <a href="https://www.facebook.com/CreditHaat" style={{ textDecoration: 'none' }}>
        <FacebookOutlinedIcon fontSize='large' style={{ marginRight: '10px' }} />
      </a>
    {/* </Link> */}
     {/* <Link href='https://www.linkedin.com/authwall?trk=bf&trkInfo=AQHWeFf-zoQMCwAAAX8vfJxQVbpS3r1zhH0G1-z1acajNSzujRSQtxOsMU185R39ouzVadGTw4t98zJhUqyKMxPa9HNQRKLaHCWMqbSybvab5IAhit2J583xeVRoWIyKI88N-dE=&originalReferer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2Fcredithaat%2F%3FviewAsMember%3Dtrue'> */}
     <a  href='https://www.linkedin.com/authwall?trk=bf&trkInfo=AQHWeFf-zoQMCwAAAX8vfJxQVbpS3r1zhH0G1-z1acajNSzujRSQtxOsMU185R39ouzVadGTw4t98zJhUqyKMxPa9HNQRKLaHCWMqbSybvab5IAhit2J583xeVRoWIyKI88N-dE=&originalReferer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2Fcredithaat%2F%3FviewAsMember%3Dtrue' style={{textDecoration:'none'}}>
      <LinkedInIcon fontSize='large' /></a> 
      <Typography style={{fontSize:'12px',fontWeight:600,color:'rgba(0, 0, 0, 0.57)',fontFamily:'Raleway'}}>
      © Vibhuprada Services Private Limited | All Rights Reserved with Copyright & TradeMarks
      </Typography>
      <Divider sx={{backgroundColor:'rgba(0, 0, 0, 0.35)',height:'1px'}} variant='middle'/>
      <Typography style={{color:'rgba(0, 0, 0, 0.57)',fontFamily:'Raleway',fontSize:'12px',fontWeight:500}}>
      Office No. 10 & 11, 1st Floor, Tower B, Downtown City Vista, Survey Number 58/2, Fountain Road, Kharadi Pune, Maharashtra 411014 India
      </Typography>
    </Box>
    </>
  )
}

export default FormFooter
