
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

export default function DeleteTask({ taskId, setTasks }:any) {
  const audioUrl = "/audio/ting.mp3";
  const playAudio =async() => {
    const audio = document.getElementById("audio") as HTMLAudioElement;
    if (audio) {
        await audio.play();
        console.log('audio playing');
      }
    }
    
  const handleDelete= async ()=>{
     await playAudio()

    await deleteData(taskId, setTasks);
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
            
    </main>
  )
}
