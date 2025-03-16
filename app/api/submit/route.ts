import { NextResponse } from "next/server";

type PostFormData = {
    name:string,
    message:string
}

type ApiResponse = {
    message:string,
    receivedData:PostFormData
}

export async function POST(req:Request):Promise<NextResponse<ApiResponse>>{
    const data:PostFormData = await req.json();
    console.log("受け取ったデータ:",data);

    return NextResponse.json({message:"データを受け取りました！",receivedData:data})
}