
import { BestProducts } from './Homepage/BestProducts'
import CreditScore from './Homepage/CreditScore'
import KeyPartners from './Homepage/KeyPartners'
import Benefits from './Homepage/Benefits'
import Review from './Homepage/Review'
import Fourdiv from './Homepage/Fourdiv'
import Advantage from './Homepage/Advantage'
import GetLoan from './Homepage/GetLoan'
import FAQ from './Homepage/FAQ'
import NavBar from './Header1/NavBar';
import Footer from './Footer';

const HomePage = () => {
  return (
    <>
    <NavBar/>
    <br></br>
    <GetLoan/>
    <br/><br/>
    <BestProducts/>
    <br/><br/>
    <Advantage/>
    <br/><br/>
    <CreditScore/>
    <br/><br/>
    
    <Fourdiv/>
    <br/><br/>
    <KeyPartners/>
    <br/><br/>

    <Benefits/>
    <br/><br/>
    <Review/>
    
    <br/><br/>
    <FAQ/>
    <br></br>
    <Footer/>
    </>
  )
}

export default HomePage