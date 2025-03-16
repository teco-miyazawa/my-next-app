"use client"; 

// useStateの解説
// import {useState}from "react"

// export default function Counter(){
//     const [count,setCount] = useState(0)

//     return (
//         <div>
//             <p>現在のカウント{count}</p>
//             <button onClick={()=>setCount(count+1)}>ボタン</button>
//         </div>
//     )
// }

// import { useEffect } from "react";

// export default function Example(){
//     useEffect( ()=> {
//         console.log("ページが表示されたときに実行！")
//     },[]);

//     return <h1>useEffectの例</h1>
// }

import { useParams } from "next/navigation";
import { useEffect, useState} from "react"

type Post = {
    userId:number,
    id:number,
    title:string,
    body:string
}

export default function PostPage(){
    const {id} = useParams();
    const [post,setPost] = useState<Post | null>(null)

    useEffect(() => {
        async function fetchPost(){
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
            const data = await res.json();
            setPost(data);
        }
        fetchPost();
    },[id]);

    if(!post) return <p>Loading...</p>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    )
} 