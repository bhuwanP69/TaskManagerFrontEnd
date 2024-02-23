'use client'

import React, { useEffect, useRef, useState } from 'react'
import LogoutButton from './LogoutButton'
import Link from 'next/link';
import SearchInput from '../dashboard/features/InputSearch';

export default function Navbar({user,params}:any) {
  let storedTheme
  if (typeof localStorage !== 'undefined') {
    storedTheme = localStorage.getItem('theme');
  }
  
  const [theme, setTheme] = useState(storedTheme || 'light');
  const [sun,setSun]= useState(true)
  const [moon,setMoon]= useState(false)
  const [showRight,setShowRight] = useState(false)
  const moreInfoRef = useRef<HTMLDivElement>(null);
  
  const handleBar = () => {
    setShowRight((prevShow) => !prevShow)
  };
  
  const handleX =() =>{
    setShowRight(false)
  }

  useEffect(() => {
    // Update body background color based on the theme
    document.body.style.backgroundColor = theme === 'light' ? '#ededed' : '#333232';
    document.body.style.color = theme === 'light' ? '#333232' : '#d4d2d2';
  }, [theme]);

  const handleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if(sun){
      setMoon(!moon)
      setSun(!sun)
    }
    if(moon){
      setSun(!sun)
      setMoon(!moon)
    }
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleClickOutside = (event:any) =>{
    if(moreInfoRef.current && !moreInfoRef.current.contains(event.target)){
    setShowRight(false)
    }

  }
  useEffect(()=>{
    document.addEventListener('mousedown',handleClickOutside);
    return ()=>{
      document.removeEventListener('mousedown',handleClickOutside)
    }
  },[])
 
  return (
    <nav className=' flex relative items-center justify-between pt-10 pb-10  px-5 md:px-14'>
      <Link href = "/dashboard">
        <h1 className='text-3xl'>Task </h1>
      </Link>
      
      <SearchInput/>
      <div onClick={handleBar} className="  bars block md:hidden cursor-pointer pl-3 pr-1">
          <i className="fa-solid fa-bars text-3xl"></i>
          </div>
          {/* smaller screen */}
          {showRight &&
         
          <div ref={moreInfoRef} className={`right border border-gray-700 smaller absolute top-5
           text-black  bg-blue-200 right-5  rounded-md
            items-center gap-5  grid   md:hidden px-10 pt-10 sm:pt-12 pb-5  `}>  
        <div className="theme pl-32 hover:bg-blue-300 rounded-md transition-all pt-1" onClick={handleTheme}>
          {sun &&
          <div className="sun cursor-pointer text-3xl">
          {/* @ts-ignore */}
        <iconify-icon icon="ph:sun-thin"></iconify-icon>
          </div>
          }
          {moon && 
        
          <div className="moon cursor-pointer text-3xl">
          {/* @ts-ignore */}
          <iconify-icon icon="ph:moon"></iconify-icon>
          </div>
          }

        </div>
        {user && <span className=' text-lg sm:text-xl'>Hello, {user.email}</span>}
        <LogoutButton/>
        <div onClick={handleX} className="x  bg-red-300 hover:bg-red-400 px-3 
        py-1 rounded-md cursor-pointer absolute top-3 right-5">
        <i className="fa-solid fa-x"></i>
        </div>
        </div>
 }
 {/* big screen  */}
        <div className="right  md:flex hidden items-center gap-10">
        
        <div className="theme" onClick={handleTheme}>
          {sun &&
          <div className="sun cursor-pointer text-3xl">
          {/* @ts-ignore */}
        <iconify-icon icon="ph:sun-thin"></iconify-icon>
          </div>
          }
          {moon && 
        
          <div className="moon cursor-pointer text-3xl">
          {/* @ts-ignore */}
          <iconify-icon icon="ph:moon"></iconify-icon>
          </div>
          }

        </div>
        {user && <span className=' text-lg sm:text-xl'>Hello, {user.email}</span>}
        <LogoutButton/>
        </div>
      


    </nav>
  )
}
