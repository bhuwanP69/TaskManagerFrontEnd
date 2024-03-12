"use client";
import { useEffect, useState } from "react";
import BackToTop from "./features/BackToTop";
import UpdateTask from "./features/UpdateTask";
import DeleteTask from "./features/DeleteTask";
import { getData } from "./GetData";
import { useInputStore } from "./store/hookstore";

//all tasks
export default function AllTasks() {
  const { inputValue }: any = useInputStore();
  const [allTasks, setTasks] = useState<any[]>([]);
  const [draggedTitle, setDraggedTitle] = useState<any>(null);
  const [fetchError, setFetchError] = useState("");

  const [line, setLine] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      const storedLine = localStorage.getItem("line");
      return storedLine ? JSON.parse(storedLine) : [];
    }
  });
  useEffect(() => {
    localStorage.setItem("line", JSON.stringify(line));
  }, [line]);

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
  // drag and drop feature
  const dragStart = (title: any) => {
    setDraggedTitle(title);
  };
  const dragEnd = () => {
    setDraggedTitle(null);
  };
  const dragOver = (e: any) => {
    e.preventDefault(); // by default dropping inside element is disable
  };
  const dragDrop = (e: any) => {
    e.preventDefault();
    const targetTitle = e.target.textContent;

    const dragIndex = allTasks.findIndex(
      (titles: any) => titles.task === draggedTitle.task
    );
    const targetIndex = allTasks.findIndex(
      (titles: any) => titles.task === targetTitle
    );

    //reorder the task
    const newTask = [...allTasks];
    const [dragItem] = newTask.splice(dragIndex, 1);
    //1 = splice one ite
    newTask.splice(targetIndex, 0, dragItem); //0 = splice zero item just replace
    setTasks(newTask);
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
  }, [inputValue]);

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
          <p className="">{allTasks.length} tasks</p>
        </div>
      </div>
      {allTasks ? (
        allTasks
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
        <p>{fetchError || "Loading..."}</p>
      )}
    </div>
  );
}
