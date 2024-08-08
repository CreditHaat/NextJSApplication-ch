"use client"

import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const Support = () => {


  const [inital,setInital]=useState({
    name:"",
    email:"",
    message:""
  });

  const handleChange = (e) => {
    setInital({
        ...inital,
        [e.target.name]: e.target.value
    })
};

  const handleSubmit = (e) => {
    console.log(inital)
  };


  return (
    <>
 <Box
      sx={{
        display: "flex",  
        height: "100vh",
      }}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%" }}
        >
      <Grid item xs={12} md={4}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 600,
          mx: "auto",
          p:2,
          borderRadius: "12px",
        }}
      >
        <Typography variant="h3" align="center" mb={2} style={{fontFamily:'Noto serif'}}>
          Contact Us
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name='name'
            label="Full Name"
            value={inital.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            name='email'
            label="Email"
            value={inital.email}
            onChange={handleChange}
            margin="normal"
            required
            type="email"
          />
          <TextField
            fullWidth
            name='message'
            value={inital.message}
            label="Message"
            onChange={handleChange}
            margin="normal" 
            required
            multiline
            rows={4}
          />
          < Button
            fullWidth
            type="submit" style={{fontFamily:'Noto serif'}}
            sx={{
              mt: 2,
              backgroundColor:"#3E2780",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#3E2780",
              },
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
      </Box>
      </Grid>
      </Grid>
    </Box>
    </>
  )
}

export default Support