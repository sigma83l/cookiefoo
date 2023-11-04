import { ProductId } from "../../../../types";
import getProductById from '../../../lib/getProductById';
import '../../globals.css';
import style from '../styles/product.module.css';
import Image from "next/image";
import '../styles/forms.css';
import React, { useState } from "react";
import OrderForm from "../components/OrderForm";

export async function generateMetadata({ params }: ProductId){
  const product = await getProductById(params.productId);
  if(!product) return {
    title: "product not found!"
  }
  return {
    title: product.name,
    description: product.description
  }
}

export default async function Page({ params }: ProductId){
  const product = await getProductById(params.productId);

  return (
    <article className={style.productDetailedWrapper}>
    <div key={product.id} className={style.productCardDetailed}>
      <h1>
        {product.name}
      </h1>
      <p>
        {"\t"+product.description}
      </p>
      <br />
      <h1>
       <i>Ingredients:</i>
      </h1>
      <ul>
      {product.ingredients.map(ingredient=> (
      <li key={product.id}><h3>{ingredient}</h3></li>
      ))}
      </ul>
      <h2>
        <i>Price Per Kilo: {product.price_per_kilo.toString()}</i>
      </h2>
      <Image 
      alt={product.name}
      height={500}
      width={500}
      src={product.img_src}
      />
    </div>
    <OrderForm />
    </article>
  )
}
