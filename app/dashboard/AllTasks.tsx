
import { useEffect, useState } from "react";
import { MyContext } from './MyContext';
import { useContext } from 'react';
import BackToTop from "./features/BackToTop";
import UpdateTask from "./features/UpdateTask";
import DeleteTask from "./features/DeleteTask";

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

//all tasks
export default  function AllTasks() {
  const [input,showInput]= useState(false)
  const [allTasks,setTasks] = useState<any[]>([])
  const { inputValue, setInputValue } = useContext(MyContext);
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
    //make line
    const  MakeLine = (_id:any) =>{
      setLine((prevLine:any) => {
        const updatedLine = prevLine.includes(_id)
          ? prevLine.filter((taskId:any) => taskId !== _id)
          : [...prevLine, _id];
    
        return updatedLine;
      });
    }
const fetchData = async () => {
  try {
    const tasks = await getData();
    setTasks(tasks);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

useEffect(() => {
  fetchData();
}, [inputValue]); 

return (
  <div  className="allTasks pt-20">
     {allTasks
     .slice()
     .reverse()
     .map((Task:any) =>(
       <div   key={Task._id}  className="mb-4 relative max-w-[800px] h-full break-words ">
             <h2 onClick={() => MakeLine(Task._id)}  className={`relative rounded-md shadow-xl
              text-black py-4   px-5 outline-none hover:bg-gray-200 cursor-pointer text-start 
              overflow-hidden ${line.includes(Task._id) ?' bg-gray-200 !important text-gray-600': 'bg-white'} `}>
                <label>{Task.task}</label>
                {line.includes(Task._id) &&(
                    <div className=" absolute top-7 w-full overflow-hidden bg-gray-600 h-[2px] "></div>
                    )}
                  
            </h2>
           <UpdateTask  key={Task._id} taskId={Task._id} task={Task} setTasks={setTasks} />
           <DeleteTask key={Task._id} taskId={Task._id} setTasks={setTasks}/>
        <BackToTop/>
        
      </div>
     ))}
  </div>
)
}