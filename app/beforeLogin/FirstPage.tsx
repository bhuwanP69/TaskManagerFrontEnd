'use client'
export default function FirstPage() {
  return (
    <main className="main-body px-10 md:px-32 py-10 text-center text-Text">
        <h1 className=" text-3xl sm:text-4xl pb-10">You can list tasks for your busy schedule</h1>
            <h2 className=" text-xl sm:text-2xl pb-10">You can add tasks by using
             <span className="text-blue-300 pl-2">Log In</span> or
              <span className="text-orange-400 pl-2">Sign Up</span> only </h2>
            <div className="input relative group transition-all ">
                <input 
                    type="text"
                    disabled
                    placeholder="Add your Tasks...."
                    className="w-full py-4 bg-white rounded-md shadow-xl 
                    text-black pl-5 outline-none z-10  "
                />
                <p className="hidden absolute group-hover:block -bottom-14
                 text-xl left-20 text-blue-400 transition-all  ">Please LogIn or SignUp </p>
            </div>
    </main>
  )
}
