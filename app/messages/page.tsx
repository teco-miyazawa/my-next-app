"use client";

import { useState,useEffect } from "react";
import MessageItem from "./components/MessageItem"
import "./globals.css";

type MessageType = {
    id:number,
    name:string,
    message:string,
    createdAt: string;
}

export default function MessagePage(){
    const [messages,setMessages] = useState<MessageType[]>([]);
    const [name,setName] = useState("");
    const [message,setMessage] = useState("");

    // メッセージ一覧を取得
    useEffect(()=>{
        fetch("api/messages")
        .then((res)=>res.json())
        .then((data)=>setMessages(data.messages))
        .catch((error)=>console.error("データ取得エラー:",error))
    },[]);

    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault();
        const res = await fetch("/api/messages",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({name,message}),
        });

        if(res.ok){
            const newMessage = await res.json();
            setMessages((prev)=>[...prev,newMessage.data]);
            setName("");
            setMessage("");
        }else{
            console.error("メッセージ送信エラー:", await res.json())
        }
    }

    // メッセージを編集
    const handleEdit = async(id:number,newMessage:string) =>{
        const res = await fetch("/api/messages",{
            method:"PATCH",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({id,message:newMessage}),
        });

        if(res.ok){
            const updatedMessage = await res.json();
            setMessages((prev)=>
                prev.map((msg) => (msg.id === id ? updatedMessage.data : msg))
            );
        }else{
            console.error("メッセージ編集エラー:",await res.json());
        }
    };

    // メッセージを削除
    const handleDelete = async(id:number) =>{
        const res = await fetch(`/api/messages?id=${id}`,{
            method:"DELETE"
        });

        if(res.ok){
            setMessages((prev)=>prev.filter((msg)=>msg.id !== id));
        }else{
            console.error("メッセージ削除エラー:",await res.json());
        }
    }

    return(
        <div className="messages-container">
            <h1>メッセージ一覧</h1>
            <form onSubmit={handleSubmit} style={{marginBottom: "20px"}}>
                <input
                 type="text"
                 placeholder="名前"
                 value={name}
                 onChange={(e)=>setName(e.target.value)}
                 required
                 />
                 <input 
                 type="text"
                 placeholder="メッセージ"
                 value={message}
                 onChange={(e)=>setMessage(e.target.value)}
                 required
                  />
                  <button type="submit">送信！</button>
            </form>
            <ul>
                {messages.map((msg)=>(
                    <MessageItem key={msg.id} msg={msg} onEdit={handleEdit} onDelete={handleDelete}></MessageItem>
                ))}
            </ul>
        </div>
    )
}