"use client";
import { useState } from "react";

export default function FormPage(){
    const [name,setName] = useState("");

    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault();
        console.log("入力された名前:",name);
    };

    return(
        <div>
            <h1>フォーム</h1>
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder="名前"
                 />
                 <button type="submit">送信</button>
            </form>
        </div>
    )
}