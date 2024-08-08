import Review from '@components/Homepage/Review'
import Form from './Other Components/Form2'
import styles from './MainComponent.module.css'
import './Other Components/Form.css';
// import { useGenerationStore } from '@components/NewPersonalLoan/state/GenerationState';
// import { useContext } from 'react';
// import { UserContext } from '@context/UserContext';
// import userContext from './context/UserContext';

const MainComponent2 = () => {

    // const { user, setUser } = useContext(userContext);

    // const {setIsLoading} = useGenerationStore();

  return (
    <>
    
    <div className={styles.lowerDiv}>
    {/* <div className={`container ${isTransitioning ? 'transitioning' : ''}`}> */}
    <div className='container'>
    <Form/>
    </div>
    
    {/* </div> */}
    
    <Review/>
    </div>
        
        
    </>
  )
}

export default MainComponent2
