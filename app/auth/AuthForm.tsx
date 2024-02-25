import  { useState } from 'react'

export default function AuthForm({handleSubmit}:any) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [showEye, setShowEye] = useState(true);
    const [eyeSlash, setEyeSlash] = useState(false);
    const togglePassword = () => {
      setPasswordVisible(!passwordVisible);
    };
    const hideEye = () =>{
      setShowEye(!showEye)
      setEyeSlash(!eyeSlash)
    }
   
    
  return (
    <form onSubmit={(e) => handleSubmit(e,email,password)} className=' pt-10  flex flex-col  items-start sm:items-center px-5 sm:px-0 justify-start sm:justify-center  '>
      <div className="grid gap-10 pb-10">
        <label className=''>
            <span className='pr-5 text-xl sm:text-2xl pl-10'>Email:</span>
            <input type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className='border-gray-500  border-[1px] text-black w-64
              sm:w-72 h-10 p-3 outline-none'
            />
        </label>
        <label className='flex'>
            <span className='pr-5 text-xl sm:text-2xl'>Password:</span>
            <input   type={passwordVisible ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className='border-gray-500 border-[1px] text-black w-56  sm:w-72 h-10 p-3 outline-none'
            
            />
            <div className="eye pl-3 pt-2">
              <p onClick={togglePassword}>
                {showEye &&
                <i  onClick = {hideEye}className="fa-regular fa-eye-slash text-xl"></i>
                }
                {eyeSlash &&
                <i onClick={hideEye} className="fa-regular fa-eye text-xl"></i>
                }

              </p>
            </div>
            
            
        </label>
            </div>
            <div className="button pl-32 sm:pl-0">

        <button className='bg-blue-200 hover:bg-blue-300 text-black px-5 py-2 rounded-lg text-xl transition-all   '>Submit</button>
            </div>

    </form>
  )
}
