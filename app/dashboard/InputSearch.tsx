import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InputSearch() {
  const [query,setQuery] = useState('')

    const router = useRouter();
    //handle change 
    const handleChange=(e:any) =>{
      e.preventDefault();
      const inputValue = e.target.value;
      console.log(`Searching for ${query}`)
      setQuery(inputValue)

  }
  //handle search 
  const handleSearch =() =>{
    if(query){
      return router.push(`/?q=${query}`)
     
    } 
    if(!query) return router.push('/')

  }
  const handleKeyPress = (e:any) =>{
    if(e.key=== 'Enter') return handleSearch()
  }
  return (
    <main>
        {/* search */}
        <form onSubmit={handleSearch} className="middle flex gap-10 items-center pl-32 ">
          <input type="search" disabled placeholder="search..."  value ={query??''} onChange ={handleChange} onKeyDown = {handleKeyPress}className="p-2  w-[400px] rounded-lg outline-none pl-4 "/>
          <button disabled className="bg-gray-300 py-0 h-7 px-4 rounded-lg hover:bg-gray-400 transition-all relative cursor-pointer  group">Search
          <p className="absolute  hidden top-10 left-10 bg-gray-50 p-1 rounded-lg whitespace-nowrap group-hover:flex">Working on it </p>
          </button>
        </form>

    </main>
  )
}