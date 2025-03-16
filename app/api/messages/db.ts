type MessageType={
    id:number,
    name:string,
    message:string,
    createdAt:string
}

export const messages : MessageType[] = [];

// データを追加する関数
export const addMessage = (message:MessageType)=>{
    messages.push(message);
}

// データを取得する関数
export const getMessage = () =>{
    return messages;
}

export const updateMessage = (id:number,newMessage:string)=>{
    const message = messages.find((msg)=>msg.id===id);
    if(message){
        message.message = newMessage;
        return message
    }

    return null;
}

export const deleteMessage = (id:number) =>{
    const index = messages.findIndex((msg)=>msg.id===id);
    if(index !== -1){
        return messages.splice(index,1)[0];
    }

    return null;
}

