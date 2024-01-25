import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import Link from "next/link"

export default async  function Navbar({children}:any) {
  const supabase = createServerComponentClient({cookies})
  const {data} = await  supabase.auth.getSession()
  if(data.session){
    redirect('/dashboard')
  }
  

  return (
    <>
    <div className="navbar flex justify-between  py-10 px-20 bg-orange-200	 text-black">

      <Link href='/'>
        <h2 className="text-4xl">Task</h2>
      </Link>
      <div className="theme">

      </div>
        <div className="right ">
            <div className="buttons flex gap-20 text-2xl  ">
                <Link href='/auth/login' className="bg-blue-300 hover:bg-blue-400 px-3 py-1 rounded-lg transition-all">Log In </Link>
                <Link href='/auth/signup' className="bg-orange-400 hover:bg-orange-500 px-3 py-1 rounded-lg transition-all">Sign Up </Link>
            </div>
        </div>
    </div>
    {children}
    </>
  )
}

