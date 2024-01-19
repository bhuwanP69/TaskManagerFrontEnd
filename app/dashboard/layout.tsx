import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Navbar from "../components/Navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default  async function DashboardLayout({children}:any) {
    const supabase = createServerComponentClient({cookies})
    const {data} = await supabase.auth.getSession()

    if(!data.session){
        redirect('/auth/login')
    }

  return (
    <main>
        <Navbar  user = {data.session.user}/>
        {children}
        
    </main>
  )
}
