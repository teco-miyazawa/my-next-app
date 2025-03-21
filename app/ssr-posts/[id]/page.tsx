export default async function PostPage({params}:{ params: { id: string } }){
    const id = decodeURIComponent(params.id);
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const post = await res.json()

    return(
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    )
}

