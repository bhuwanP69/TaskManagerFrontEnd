'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
    const router = useRouter()
    const handleLogout = async () =>{
        const supabase = createClientComponentClient()
        const {error}  = await supabase.auth.signOut()
        if(!error){
          router.push('/')
        }
      }
  return (
    <button className="bg-blue-200 hover:bg-blue-300 px-3 py-2 text-xl rounded-lg transition-all "  onClick={handleLogout}>
        Logout
    </button>
  )
}
