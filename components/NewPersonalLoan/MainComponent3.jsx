import Form3 from "./Other Components/Form3"
import Navbar from "./Other Components/Navbar"
import NewFooter from './Other Components/NewFooter'
import LendingPartners from './Other Components/LendingPartners'
import NewKeyPartners from "./Other Components/NewKeyPartners"

const MainComponent3 = () => {

  return (
    <div>
      <Navbar/>
      <Form3 />
      
        <style>
        {
            `
.webtracfficdata {
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
}

.trafficbox {
flex: 1;
margin: 4px;
padding: 10px;
//   background-color: #f0f0f0;
background-color: white;
text-align: center;
}

/* Media query for desktop screens */
@media (min-width: 515px) {
.thirdblock {
display:none;
}
`
        }
    </style>


        <div className="container">
    <div className="webtracfficdata">
        <div className="trafficbox">
            <div className="row">
                <center><b>80L</b></center>
            </div>
            <div className="row">
                <center>Registered users</center>
            </div>
        </div>
        <div className="trafficbox" style={{borderLeft:'1px solid black'}}>
            <div className="row">
                <center><b>45+</b></center>
            </div>
            <div className="row">
                <center>Lending Partners</center>
            </div>
        </div>
        <div className="trafficbox" style={{borderLeft:'1px solid black'}}>
            <div className="row">
                <center><b>₹1200Cr+</b></center>
            </div>
            <div className="row">
                <center>Disbursed</center> <span className="thirdblock" style={{color:'white'}}>.</span>
            </div>
        </div>
    </div>
    </div>


        <LendingPartners/>

        <NewKeyPartners/>
      
      <NewFooter/>
    </div>
  )
}

export default MainComponent3
