"use client"

// import { Main } from 'next/document';
import MainComponent from './MainComponent'
import { useRouter} from 'next/navigation';
import { useState, useEffect } from 'react';

const MainComponentBackend = () => {

    const router = useRouter();
    const [routerData, setRouterData] = useState('');
    const [isRouterInit, setIsRouterInit] = useState(false);

    useEffect(()=>{
        setRouterData(router)
        setIsRouterInit(true);
    },router)

  return (
    <div>
        { isRouterInit &&
            <MainComponent router={routerData}/>}
    </div>
  )
}

export default MainComponentBackend
