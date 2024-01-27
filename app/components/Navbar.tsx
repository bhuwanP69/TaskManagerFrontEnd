'use client'

import React, { useEffect, useState } from 'react'
import LogoutButton from './LogoutButton'
import Link from 'next/link';

export default function Navbar({user}:any) {
  let storedTheme
  if (typeof localStorage !== 'undefined') {
    storedTheme = localStorage.getItem('theme');
  }
  
  const [theme, setTheme] = useState(storedTheme || 'light');
  const [sun,setSun]= useState(true)
  const [moon,setMoon]= useState(false)

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

  return (
    <nav className=' flex items-center justify-between pt-10 pb-10 px-14'>
      <Link href = "/dashboard">
        <h1 className='text-3xl'>Task </h1>
      </Link>

        <div className="right flex items-center gap-10">
          
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
        {user && <span className='text-xl'>Hello, {user.email}</span>}
        <LogoutButton/>
        </div>


    </nav>
  )
}
