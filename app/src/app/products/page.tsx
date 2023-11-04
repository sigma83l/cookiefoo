import getAllProducts from "@/lib/getAllProducts";
import { Suspense } from "react";
import Product from "./components/Product";
import Loading from "./components/Loading";
import style from './styles/product.module.css';

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const products = async () => {
  const products = await getAllProducts();
  // await sleep(10000)
  
  return (
    <div className={style.productWrapper} >
    <Suspense fallback={<Loading />}>
      {
        products.map((prod) => (
          <Product key={prod.id} product={prod}></Product>
        ))
      }
    </Suspense>
    </div>
  );
};

export default products;
