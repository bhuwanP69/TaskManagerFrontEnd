'use client'
import { useEffect, useState } from "react"

export default function BackToTop() {
    const [showTop ,setShowTop] = useState(false)
    useEffect(()=>{
        const handleScroll = () =>{
            const showButton = window.scrollY > 200;
            setShowTop(showButton)
        }

        window.addEventListener('scroll',handleScroll)

        return  () =>{
            window.removeEventListener('scroll',handleScroll)
        }
    },[])

    const handleTop = ()=>{
        window.scrollTo({
            top:0,
            behavior:'smooth'
        })

    }
  return (
   <main>
    { showTop && 
    <button onClick={handleTop} className="none fixed bottom-5  right-5  z-50
    bg-orange-500 px-2 py-1 rounded-lg transition-all ">
    <i className="fa-solid fa-arrow-up"></i>
    </button>
    }
   </main>
  )
}
