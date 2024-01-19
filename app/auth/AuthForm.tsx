import  { useState } from 'react'

export default function AuthForm({handleSubmit}:any) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    

  return (
    <form onSubmit={(e) => handleSubmit(e,email,password)} className=' pt-10  flex flex-col  items-center justify-center  '>
      <div className="grid gap-10 pb-10">
        <label className=''>
            <span className='pr-5 text-2xl pl-10'>Email:</span>
            <input type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className='border-gray-500 border-[1px]   w-72 h-10 p-3 outline-none'
            
            />
        </label>
        <label>
            <span className='pr-5 text-2xl'>Password:</span>
            <input type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className='border-gray-500 border-[1px]  w-72 h-10 p-3 outline-none'
            
            />
        </label>
            </div>
        <button className='bg-blue-200 hover:bg-blue-300 px-5 py-2 rounded-lg text-xl transition-all  '>Submit</button>

    </form>
  )
}
