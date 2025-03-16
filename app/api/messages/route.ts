import { NextResponse } from "next/server";
import { z } from "zod";
import { messages,addMessage,getMessage,updateMessage,deleteMessage } from "./db";

type MessageType = {
    id:number,
    name:string,
    message:string,
    createdAt:string
}

const MessageSchema = z.object({
    name:z.string().min(1,"名前は必須です！"),
    message:z.string().min(5,"メッセージは5文字以上で！")
})

export async function POST(req:Request):Promise<NextResponse>{
    
    try{
        const body = await req.json();
        console.log("受け取ったデータ:", body);

        const result = MessageSchema.safeParse(body);

        if(!result.success){
            return NextResponse.json({error:"無効なデータです",details:result.error.errors},{status:400})
        }
    
        const newMessage:MessageType = {
            id:messages.length+1,
            name:result.data.name,
            message:result.data.message,
            createdAt: new Date().toISOString(),
        };
    
        addMessage(newMessage);
    
        return NextResponse.json({message:"データを保存しました！",data:newMessage})
    } catch(error) {
        if(error instanceof z.ZodError){
            return NextResponse.json({error:"無効なデータです",details:error.errors},{status:404})
        }
        
        return NextResponse.json({error:"サーバーエラーが発生しまし"},{status:500})
    }
    
}

export async function GET(){
    return NextResponse.json({messages:getMessage()})
}

export async function PATCH(req:Request):Promise<NextResponse>{
    try{
        const body = await req.json();
        const {id,message} = body

        if(!id || !message){
            return NextResponse.json({error:"IDとメッセージは必須です！"},{status:400});
        }

        const updatedMessage = updateMessage(Number(id),message);

        if(!updatedMessage){
            return NextResponse.json({error:"メッセージが見つかりません！"},{status:404});
        }

        return NextResponse.json({message:"メッセージを更新しました！",data:updatedMessage});
    }catch(error){
        console.error("エラー発生！",error)
        return NextResponse.json({error:"サーバーエラーが発生しました"},{status:500})
    }
}

export async function DELETE(req:Request):Promise<NextResponse>{
    try{
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");

        if(!id){
            return NextResponse.json({ error: "ID は必須です！" }, { status: 400 });
        }

       const deletedMessage = deleteMessage(Number(id))

       if(!deletedMessage){
        return NextResponse.json({ error: "メッセージが見つかりません！" }, { status: 404 });
       }

       return NextResponse.json({ message: "メッセージを削除しました！", data: deletedMessage });
    }catch (error) {
        console.error("エラー発生！",error)
        return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 });
      }
}