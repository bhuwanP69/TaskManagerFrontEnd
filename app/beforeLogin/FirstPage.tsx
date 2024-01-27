
export default function FirstPage() {
  return (
    <main className="main-body px-32 py-10 text-center text-Text">
        <h1 className="text-4xl pb-10">You can list tasks for your busy schedule</h1>
            <h2 className="text-2xl pb-10">You can add tasks by using
             <span className="text-blue-300 pl-2">Log In</span> or
              <span className="text-orange-400 pl-2">Sign Up</span> only </h2>
            <div className="input">
                <input 
                    type="text"
                    disabled
                    placeholder="Add your Tasks...."
                    className="w-full py-4 bg-white rounded-md shadow-xl text-black pl-5 outline-none z-10"
                />
            </div>
    </main>
  )
}
