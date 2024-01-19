
import { useEffect, useState } from "react";
import { MyContext } from './MyContext';
import { useContext } from 'react';
import debounce from 'lodash/debounce';

 //get the data 
export async function getData():Promise<any>{
  const ServerUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;  
  if (!ServerUrl) {
    throw new Error('Server URL is not defined');
  }

  const res = await fetch(`${ServerUrl}`, { next: { revalidate: 0 } });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();

  }

  //delete the data 
async function deleteData(_id:any,setTasks:any){
  const ServerUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;
    const response = await fetch(`${ServerUrl}/${_id}`,{
      method:'DELETE',
    })
    if(!response.ok){
      console.log('delete  is not successfully')
    }else{
      setTasks((prevTasks:any) => prevTasks.filter((task:any) => task._id !== _id));
    }
}
//all tasks
export default  function AllTasks() {
  const [allTasks,setTasks] = useState<any[]>([])
  const [line,setLine]  = useState<any[]>(() =>{
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      const storedLine = localStorage.getItem('line');
      return storedLine ? JSON.parse(storedLine):[]
    }
   
  })
  useEffect(() =>{
    localStorage.setItem('line',JSON.stringify(line))
  },[line]);
  const { inputValue, setInputValue } = useContext(MyContext);
 
  const handleDelete= async (_id:any)=>{
    await deleteData(_id,setTasks)
  }
    //make line
  const  MakeLine = (_id:any) =>{
    setLine((prevLine:any) => {
      const updatedLine = prevLine.includes(_id)
        ? prevLine.filter((taskId:any) => taskId !== _id)
        : [...prevLine, _id];
  
      return updatedLine;
    });
  }
  
const fetchDataDebounced = debounce(async () => {
  try {
    const tasks = await getData();
    setTasks(tasks);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}, 0o0); // Adjust the debounce delay as needed

useEffect(() => {
  fetchDataDebounced();
}, [inputValue]);

return (
  <div  className="allTasks pt-20">
     {allTasks.map((Task:any) =>(
         <div   key={Task._id}  className="mb-4 relative max-w-[800px] break-words ">
             <h2  onClick={()=> MakeLine(Task._id)}  className={`relative bg-white rounded-md shadow-xl
              text-black py-4   px-5 outline-none hover:bg-gray-200 cursor-pointer text-start 
              overflow-hidden ${line.includes(Task._id) ? 'bg-gray-200 !important text-gray-500': 'bg-white'} `}>
                <p  className="">{Task.task}</p>
                  {line.includes(Task._id) &&(
                    <div className=" absolute top-7 w-full overflow-hidden bg-gray-400 h-[2px] "></div>
                    )}
            </h2>
            <div onClick={() =>handleDelete(Task._id)} className="delete absolute -right-20 text-2xl top-3 cursor-pointer  p-1">
        <i className="fa-solid fa-trash "></i>
        </div>
      </div>
     ))}
     
  </div>
)
}