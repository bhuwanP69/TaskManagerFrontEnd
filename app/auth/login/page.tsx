'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";

//components
import AuthForm from "../AuthForm";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Login() {
    const router = useRouter()
    const [error,setError] = useState('')

    const handleSubmit = async(e:any,email:any,password:any) =>{
        e.preventDefault()
        setError('')

        const supabase = createClientComponentClient();

        const {error} = await supabase.auth.signInWithPassword({
            email,
            password
        })
        if(error){
            setError(error.message)
        }
        if(!error){
            router.push('/dashboard')
        }

    }
    // const handleGoogleSignIn = async () => {
    //     setError('');
    //     const supabase = createClientComponentClient();
    //         const { error } = await supabase.auth.signInWithOAuth({
    //             provider: 'google',
    //         });
            
    //         if (error) {
    //             setError(error.message);
    //         }if (!error) {
    //             router.push('/dashboard');
    //         }
  
    //     }
    


  return (
    <main className="pt-5">
        <h2 className="text-center text-4xl "> This is Login Page </h2>
        <AuthForm handleSubmit = {handleSubmit}/>
        {/* <p className="text-center pt-5">or</p>
        <div className=" pt-1 text-center">

        <button onClick={handleGoogleSignIn} className="bg-blue-500 text-white p-2 mt-4">
        Sign in with Google
        </button>
        </div> */}
        {error &&
        <div className="">

        <div className="error text-xl bg-green-100 h-16 text-center pt-4 w-80 
         absolute top-1/2  left-2/3">{error}</div>

        </div>
        }
    </main>
  )
}
