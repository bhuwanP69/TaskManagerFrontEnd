'use client'

import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
//components
import AuthForm from "../AuthForm"
import { useState } from "react"

export default function Signup() {
    const router = useRouter()
    const [error, setError] = useState('')

    const handleSubmit = async (e: any, email: any, password: any) => {
        e.preventDefault()
        setError('')

        const supabase = createClientComponentClient()
        const ServerUrl = process.env.SERVER_URI;
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/api/auth`
            }
        })
        if (error) {
            setError(error.message)
        }
        if (!error) {
            router.push('/auth/verify')
        }
    }
    return (
        <main className="pt-5">
            <h2 className="text-center  text-3xl sm:text-4xl"> This is Sign Up page</h2>
            <AuthForm handleSubmit={handleSubmit} />
            {error &&
                <div className="error text-xl bg-green-100  text-center pt-4 w-80  absolute top-2/3  left-1/3">{error}</div>
            }

        </main>
    )
}
