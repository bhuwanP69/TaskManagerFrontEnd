'use client'
import { useState } from "react";

export default function DeleteTask({ taskId, setTasks }:any) {
  const audioUrl = "/audio/ting.mp3";
  const ServerUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;
  const [deleteError,setDeleteError] =useState('')
  const [showDelete,setShowDelete] =useState(false)

  const playAudio =async() => {
    const audio = document.getElementById("audio") as HTMLAudioElement;
    if (audio) {
        await audio.play();
      }
    }

    // Delete the data
  const deleteData = async () => {
    try {
      const response = await fetch(`${ServerUrl}/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        setDeleteError('Delete not successful');
      }
       if(response.ok) {
        setTasks((prevTasks: any) => prevTasks.filter((task: any) =>
         task._id !== taskId)); 
      }
     

    } catch (error) {
      setDeleteError('An error occurred while deleting');
    }
  };
  const handleDelete= async ()=>{
    setDeleteError('');
      setShowDelete(true)
      await playAudio() 
    await deleteData();
  }
  return (
    <main>
   <div onClick={handleDelete}  className="circle delete
             absolute -left-10 text-2xl top-2 cursor-pointer  p-1">
                <div className="group relative ">
            <i className="fa-regular fa-circle text-2xl"></i>
            <div className="check absolute -top-[1px] left-1 hidden group-hover:block  transition-all ">
            <i className="fa-solid fa-check text-lg"></i>
            </div>
            <audio id="audio" src={audioUrl}></audio>
                </div>
            </div>
            {showDelete &&(
             <p className={` z-30 fixed bottom-10   transform
              left-10 
             bg-gray-800 w-36 h-10 py-2 text-green-400
              rounded-md transition-all `}> 1 task completed</p> 
              )} 

            {deleteError && <p className="error z-30 text-red-300 pt-1">{deleteError}</p>}
    </main>
  )
}
