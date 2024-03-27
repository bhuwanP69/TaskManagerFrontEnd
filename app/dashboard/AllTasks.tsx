"use client";
import { useEffect, useState } from "react";
import BackToTop from "./features/BackToTop";
import UpdateTask from "./features/UpdateTask";
import DeleteTask from "./features/DeleteTask";
import { getData } from "./GetData";
import { useInputStore, useTaskStore } from "./store/hookstore";
import UseDragDrop from "./features/UseDragDrop";

//all tasks
export default function AllTasks() {
  const { inputValue }: any = useInputStore();
  const {tTask,setTasks} = useTaskStore()
  const [fetchError, setFetchError] = useState("");

  const { dragStart, dragEnd, dragOver, dragDrop } = UseDragDrop();
  
  const [line, setLine] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      const storedLine = localStorage.getItem("line");
      return storedLine ? JSON.parse(storedLine) : [];
    }
  });
  useEffect(() =>{
    localStorage.setItem("line",JSON.stringify(line))
  },[line])
  const MakeLine = (_id: any) => {
    setLine((prevLine): any => {
      const updatedLine = new Set(prevLine); //arr -> set
      if (updatedLine.has(_id)) {
        updatedLine.delete(_id);
      } else {
        updatedLine.add(_id);
      }
      return Array.from(updatedLine); // set -> arr
    });
  };
  const fetchData = async () => {
    try {
      const tasks: any = await getData();
      setTasks(tasks);
      setFetchError("");
    } catch (error) {
      setFetchError("Error fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [tTask]);

  return (
    <div className="allTasks relative  pt-24 pl-5 md:pl-0 pr-20 md:pr-0">
      <div className="today absolute -left-2 top-5 pb-10 z-20">
        <h2 className=" text-2xl font-bold">Today</h2>
        <div className="tasks flex pl-2">
          <div className="group relative pr-2 ">
            <i className="fa-regular fa-circle text-sm"></i>
            <div className="check absolute -top-[1px] left-[1px]  pl-[1px]">
              <i className="fa-solid fa-check text-xs"></i>
            </div>
          </div>
          <p className="">{tTask.length} tasks</p>
        </div>
      </div>
      {Array.isArray(tTask) && tTask.length > 0 ? (
        tTask
          .slice()
          .reverse()
          .map((Task: any) => (
            <div
              key={Task._id}
              draggable="true"
              onDragStart={() => dragStart(Task)}
              onDragOver={dragOver}
              onDragEnd={dragEnd}
              onDrop={dragDrop}
              className="mb-4  relative border
         rounded-md max-w-[800px] h-full break-words "
            >
              <h2
                onClick={() => MakeLine(Task._id)}
                className={`relative rounded-md shadow-xl
              text-black py-4   px-5 outline-none hover:bg-gray-100 cursor-pointer text-start 
              overflow-hidden
               ${
                 line.includes(Task._id)
                   ? " bg-blue-50 text-gray-500 hover:bg-blue-50"
                   : "bg-white"
               } `}
              >
                <label className=" relative">
                  {Task.task}

                  {line.includes(Task._id) && (
                    <div
                      className=" absolute top-[10px] -left-[1px] w-full
                  overflow-hidden bg-gray-500 h-[1.3px] "
                    ></div>
                  )}
                </label>
              </h2>

              <DeleteTask
                key={Task._id}
                taskId={Task._id}
                setTasks={setTasks}
              />
              <UpdateTask
                key={Task._id}
                taskId={Task._id}
                task={Task}
                setTasks={setTasks}
              />
              <BackToTop />
            </div>
          ))
      ) : (
        <p>{fetchError}</p>
      )}
    </div>
  );
}
