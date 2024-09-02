import React from "react";
// import Navbar from "./Navbar";
import MainForm from "./MainForm";
import SmartCoinFooter from "./SmartCoinFooter"
import "./page.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

const MainComponent = () => {
  return (
    <>
    <div style={{fontFamily:"sans-serif"}}>
    {/* <Navbar /> */}
      <MainForm />
      <SmartCoinFooter/>
    </div>
      
    </>
  );
};

export default MainComponent;
