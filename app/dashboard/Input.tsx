import { useState } from "react";
import { MyContext } from "./MyContext";
import AllTasks from "./AllTasks";
import { Suspense } from 'react'

export default function Input() {
    const [inputValue, setInputValue] = useState('');
    const [inputError,setInputError] = useState('')
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setInputValue(e.target.value)
    }

    const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) =>{
        if(e.key === 'Enter'){
            handlePostRequest()
            setInputValue('');
        }
    }
    const  handlePostRequest =async() =>{
        const tasks = {task: inputValue };
        const ServerUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;
    try {
        const response = await fetch(`${ServerUrl}`, {
            method: 'POST',
            body: JSON.stringify(tasks),
            headers: {
                'Content-type': 'application/json',
            },
        });
        setInputError('')

        const data = await response.json(); 
    } catch (error) {
        console.log(error)
        setInputError('An error occurred while adding Task ');
    }
    }

  return (
    <div className="input">
         <div className="input">
                <input 
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Add your Tasks...."
                    className="w-full py-4 bg-white rounded-md
                     shadow-xl text-black pl-5 outline-none z-10"
                />
            </div>
            {inputError && <p className="error z-30 text-red-300 pt-1">{inputError}</p>}
            <MyContext.Provider value={{ inputValue, setInputValue }}>
                 <Suspense fallback={<p>Loading feed...</p>}>
                    <AllTasks/>
                 </Suspense>
            </MyContext.Provider>

    </div>
  )
}