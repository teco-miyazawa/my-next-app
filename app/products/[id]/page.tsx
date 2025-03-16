"use client"; 
import { useParams } from "next/navigation";

const products = [
    {id:1,name:"ノートPC",price:150000},
    {id:2,name:"スマートフォン",price:80000},
    {id:3,name:"ワイヤレスイヤホン",price:20000}
]

export default function ProductPage(){
    const params = useParams();
    const productId =  params.id;
    const product = products.find((p)=>p.id === Number(productId));

    return(
        <div>
            <h1>商品ページ</h1>
            {product ? (
                <div>
                    <h2>{product.name}</h2>
                    <p>価格：{product.price}</p>
                </div>
            ) : (
                <p>商品が見つかりませんでした。</p>
            )}
            <p>商品ID：{productId}</p>
        </div>
    )
}