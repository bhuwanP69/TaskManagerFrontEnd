'use client'

import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='text-center pt-44 text-xl'>
      <h2>Oops you are in wrong page</h2>
      <p className='pb-10'>Could not find requested resource</p>
      <Link href="/" className='bg-red-400 px-4 py-2
       rounded-xl hover:underline transition-all' >Return Home</Link>
    </div>
  )
}