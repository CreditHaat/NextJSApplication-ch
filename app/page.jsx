// import HomePage from '@/components/HomePage'
// import MainComponent from '@components/NewPersonalLoan/MainComponent'
// import HomePage from '@/components/HomePage';
// import HomePage from '@'
// import HomePage from '@/components/HomePage'
import HomePage from '../components/HomePage'
import { redirect } from "next/navigation";


const page = () => {
  return (
    <>
        {/* <HomePage/> */}
        {/* <HomePage/> */}
        {/* <MainComponent/> */}
        {redirect("https://www.credithaat.com")}
    </>
  )
}

export default page
