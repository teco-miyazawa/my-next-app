"use client";
import { useState } from "react";

type MessageType = {
    id:number,
    name:string,
    message:string,
    createdAt: string;
}

type MessageItemProps = {
    msg:MessageType,
    onEdit:(id:number,message:string) => void,
    onDelete:(id:number) => void,
}

export default function MessageItem({msg,onEdit,onDelete}:MessageItemProps){
    const [editMode,setEditMode] = useState(false);
    const [editMessage,setEditMessage] = useState(msg.message);

    return(
        <li className="message-item">
            <strong>{msg.name}</strong>:
            {editMode ? (
                <input 
                type="text"
                value={editMessage}
                onChange={(e)=>setEditMessage(e.target.value)}
                 />
            ):(
                msg.message
            )}
            ({msg.createdAt})
            {editMode ? (
                <button className="edit" onClick={()=>{onEdit(msg.id,editMessage);setEditMode(false)}}>保存</button>
            ):(
                <button className="edit" onClick={()=>{setEditMode(true)}}>編集</button>
            )}
            <button className="delete" onClick={()=>onDelete(msg.id)}>削除</button>
        </li>
    )
}