import React from 'react';
import { useEffect, useState } from "react";


export default function MakeLine({taskId,setLine}:any) {
  
 /
  return (
    <div>
         <div onClick={handleClick}  className="circle delete
             absolute -left-10 text-2xl top-2 cursor-pointer  p-1">
                <div className="group relative ">
            <i className="fa-regular fa-circle text-2xl"></i>
            <div className="check absolute -top-[1px] left-1 hidden group-hover:block  transition-all ">
            <i className="fa-solid fa-check text-lg text-gray-700"></i>
            </div>
           
                </div>
            </div>

       
    </div>
  )
}
