'use client'

import { useState, useEffect, useRef } from "react";
import DeleteTask from "./DeleteTask";

async function getData() {
  const ServerUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;  
  if (!ServerUrl) {
    throw new Error('Server URL is not defined');
  }
  const res = await fetch(`${ServerUrl}`,  { next: { revalidate: 0 } });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default function SearchInput() {
  const [inputValue, setInputValue] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showIcon, setShowIcon] = useState(true);
  const [showX, setShowX] = useState(false);
  const [title, setTitle] = useState<any[]>([]);
  const [notFound, setNotFound] = useState(false);
  const moreInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const data = await getData();

        const findUser = data.filter((user:any) => {
          if (inputValue) {
            return user.task.toLowerCase().includes(inputValue.toLowerCase());
          } else {
            return true;
          }
        });

        setTitle(findUser);
        setNotFound(findUser.length === 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    handleSearch();
  }, [inputValue]);

  const handleChange = (event:any) => {
    event.preventDefault();
    const inputValue = event.target.value;
    setShowSearch(true)
    setInputValue(inputValue);
    setShowX(inputValue.length > 0);
  };

  const handleSearch = () => {
    setShowSearch(true);
  };
  const handleInput = () => {
    setShowInput((prevshow) => !prevshow);
    setShowIcon(false)
  };

  const handleKeyPress = (event:any) => {
    if (event.key === "Enter") return handleSearch();
  };

  const handleX = () => {
    setInputValue('');
    setShowX(false);
  };
  const handleClickOutside = (event:any) =>{
    if(moreInfoRef.current && !moreInfoRef.current.contains(event.target)){
    setShowSearch(false)
    }

  }
  useEffect(()=>{
    document.addEventListener('mousedown',handleClickOutside);
    return ()=>{
      document.removeEventListener('mousedown',handleClickOutside)
    }
  },[])

  return (
    <div className="searchInput relative  border-slate-500
     flex flex-row items-center gap-5 p-1 rounded-[15px] w-96">
     
      <label onClick={handleInput} className="pl-2 pt-1">
        <i className="fa-solid fa-magnifying-glass cursor-pointer   p-2 rounded-md  hover:bg-gray-50"></i>
      </label>
     
{showInput && 
<div className="border border-black rounded-md">
      <input
      type="text"
      id="inputId"
      placeholder="Search here"
      value={inputValue}
      onClick={() => setShowSearch(true)}
      onChange={handleChange}
      onKeyDown={handleKeyPress}
      className="bg-[transparent]  outline-none border-none w-full py-3 pl-2 pr-3"
      />
      </div>
    }

      {showX && (
        <div className="button">
        <button onClick={handleX} className="bg-red-200  text-black px-2 pb-1 text-lg rounded-lg">
          x
        </button>
        </div>
      )}

      {showSearch && (
        <div ref={moreInfoRef} className='bg-gray-200 rounded-md text-black
        pl-8 w-[380px] sm:w-[700px] overflow-x-hidden h-[300px] sm:h-[450px]
          z-40 border absolute border-black top-20 -left-16 sm:-left-10 pr-20'>
          <main className='pl-10 '>
            <h2 className='pb-10 pt-10 font-serif text-lg'>Search Results</h2>

            {notFound ? (
              <p>No results found</p>
            ) : (
              title.map((Title) => (
                <div key={Title.id} className="div  relative ">
                  <p className=" py-4 text-lg  pl-5 rounded-md bg-gray-100 hover:bg-gray-300 mb-5 cursor-pointer">{Title.task}</p>
                  <DeleteTask key={Title._id} taskId={Title._id} setTasks={setTitle}/>
                </div>
              ))
            )}
          </main>
        </div>
      )}
    </div>
  );
}
