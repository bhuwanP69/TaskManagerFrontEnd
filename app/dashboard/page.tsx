'use client'

import Input from "./Input"


export default function MainPage() {
    return (
        <div className="main-body px-32 py-10 text-center text-Text">
            <h1 className="text-4xl pb-10">You can list tasks for your busy schedule</h1>
           
            <div className="input">
              <Input/>
            </div>
        </div>
    )
}