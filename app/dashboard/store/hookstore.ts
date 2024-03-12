import { create } from 'zustand'

 export const useInputStore = create((set) => ({
    inputValue:'',
    setInputValue:(newValue:any) => set({inputValue:newValue})

}))