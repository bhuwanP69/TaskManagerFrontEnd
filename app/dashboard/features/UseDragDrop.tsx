import { useState } from "react";
import { useTaskStore } from "../store/hookstore";
export default function UseDragDrop() {
    const [draggedTitle, setDraggedTitle] = useState<any>(null);
    const {tTask,setTasks}:any = useTaskStore()
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

    const dragIndex = tTask.findIndex(
      (titles: any) => titles.task === draggedTitle.task
    );
    const targetIndex = tTask.findIndex(
      (titles: any) => titles.task === targetTitle
    );

    //reorder the task
    const newTask = [...tTask];
    const [dragItem] = newTask.splice(dragIndex, 1);
    //1 = splice one ite
    newTask.splice(targetIndex, 0, dragItem); //0 = splice zero item just replace
    setTasks(newTask);
  };

return { dragStart, dragEnd, dragOver, dragDrop };
}
