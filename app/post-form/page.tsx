"use client";
import { useState,useEffect } from "react";

type MessageType = {
    id:string,
    name:string,
    message:string,
    createdAt:string
}

export default function PostForm(){
    const [name,setName] = useState<string>("");
    const [message,setMessage] = useState<string>("");
    const [messages,setMessages] = useState<MessageType[]>([]);

    useEffect(() => {
        fetch("/api/messages")
        .then((res) => res.json())
        .then((data)=>setMessages(data.messages));
    },[])

    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault();

        // if(!name.trim()){
        //     alert("名前は必須です！")
        //     return;
        // }

        // if(!message.trim()){
        //     alert("メッセージは必須です！");
        //     return;
        // }

         // API へ POST リクエストを送る
         const res = await fetch("/api/messages",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({name,message}),
         })

         const result = await res.json();
         setMessages([...messages,result.data]);
         setName("");
         setMessage("");
    }

    return(
        <div>
            <h1>フォーム</h1>
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                placeholder="名前を入力"
                value={name}
                onChange={(e)=> setName(e.target.value)}
                 />
                 <input 
                 type="text"
                placeholder="メッセージを入力"
                value={message}
                onChange={(e)=> setMessage(e.target.value)}
                 />

                 <button type="submit">送信</button>
            </form>

            <h2>保存されたメッセージ</h2>
            <ul>
                {messages.map((msg)=>(
                    <li key={msg.id}>
                        <strong>{msg.name}</strong>:{msg.message}<em>{msg.createdAt}</em>
                    </li>
                ))}
            </ul>
        </div>
    );
}