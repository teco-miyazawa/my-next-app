import Link from "next/link"

export default function About(){
    return (
      <div>
        <h1>Hello!</h1>
        <p>これは Next.js 15 のルーティングテストページです。</p>
        <Link href="/">ホームに戻る</Link>
      </div>  
    );
}