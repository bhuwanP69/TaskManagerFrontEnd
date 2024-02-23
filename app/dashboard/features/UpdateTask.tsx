import { useEffect, useRef, useState } from "react";

export default function UpdateTask({ taskId,task, setTasks }:any) {
  const[error,setError] = useState(null)
  const [show,setShow] = useState(false)
  const [updatedTask,setUpdatedTask] = useState(task?.task || '')
  const moreInfoRef = useRef<HTMLDivElement>(null);
  
//  update the data
async function updateData(_id:any,updatedTask:any,setTasks:any){
  const serverUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;
  try{

    const response = await fetch(`${serverUrl}/${_id}`,{
      method:'PUT',
    body: JSON.stringify({ task: updatedTask }), // Include the updated task in the request body
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if(!response.ok){
    console.log('update not successful')
   
  }if(response.ok){
    setTasks((prevTasks:any) => 
    prevTasks.map((task:any) =>
     task._id === _id ?{...task, task:updatedTask}:task
      )
      );
      console.log('update is successful')
      
      
    }
  }catch(error){
    console.error("error updating Task...",error)
  }
  }
  
  const handleInputChange = (e:any) =>{
    setUpdatedTask(e.target.value)
  }
 const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) =>{
    if(e.key === 'Enter'){
        handleSave(taskId)
    }
}
  const handleSave = async(_id:any) =>{
    setShow(false)
    await updateData(_id,updatedTask,setTasks)
  }
  
    const handleShow = () =>{
      setShow(!show)
      
    
    }
    const handleClickOutside = (event:any) =>{
      if(moreInfoRef.current && !moreInfoRef.current.contains(event.target)){
        setShow(false)
      }

    }
    useEffect(()=>{
      document.addEventListener('mousedown',handleClickOutside);
      return ()=>{
        document.removeEventListener('mousedown',handleClickOutside)
      }
    },[])

   
  return (
    <div className="">
         <div  onClick={handleShow} className="update bg-gray-50 text-black px-3 py-2
          rounded-md absolute  top-1 -right-24 text-lg cursor-pointer hover:bg-gray-200 transition-all 
             ">Update</div>   
             { show && 
                <div ref={moreInfoRef} className="input h-60 md:h-80 w-[380px] sm:w-[500px] md:w-[700px] lg:w-[900px] bg-[#d1d1d1]  border
                 border-gray-400
                fixed  left-4 sm:left-32 lg:left-40 md:left-20 right-44 top-1/3  z-20 text-lg rounded-md transition-all ">
                  <div className="input pt-10">
                <input value={updatedTask} onKeyPress={handleKeyPress} onChange={handleInputChange} type="text" className=" w-80 md:w-[500px] h-16 md:h-20 text-black px-3 outline-none  rounded-md"/>
                  </div>
                <div className="button pt-10 ">
                <button onClick={ ()=> handleSave(taskId)} className=" bg-orange-400 hover:bg-orange-500
                 text-black transition-all
                 px-10 py-1 rounded-lg text-lg cursor-pointer">save</button>
                </div>
                </div>
}
    </div>
  )
  }
