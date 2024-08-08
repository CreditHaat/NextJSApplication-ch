// "use client"

import { SettingsInputSvideo } from '@mui/icons-material';
import {create} from 'zustand';

interface GenerationState{
    isLoading:boolean
    setIsLoading: (isLoading:boolean) => void
}

export const useGenerationStore = create<GenerationState>()((set)=>({
    isLoading:false,
    setIsLoading: (isLoading:boolean) => set({isLoading})

}))