import React from 'react'
import LogoutButton from './LogoutButton'

export default function Navbar({user}:any) {
  return (
    <nav className=' flex items-center justify-between pt-10 pb-10 px-14'>
        <h1 className='text-3xl'>Task </h1>
        <div className="right flex items-center gap-10">
        {user && <span className='text-xl'>Hello, {user.email}</span>}
        <LogoutButton/>
        </div>


    </nav>
  )
}
