import { Product } from '../../../../types.d';
import Image from 'next/image';
import Link from 'next/link';
import style from '../styles/product.module.css';

const Product = ({product}: {product: Product}) => {
    const content =
        <div className={style.productCard} key={product.id}>
            <Link href={'http://localhost:3000/products/'+product.id}>
            <div
            className={style.cardImage}
            >
            <Image 
            alt={product.name}
            src={product.img_src}
            height={200}
            width={200}
            />
            </div>
            <nav>
              <h3>
                {product.name}
              </h3>  
              <h4>
                {product.price_per_kilo}
              </h4>  
            </nav>
            <nav>
              <p>
              <h5>
                <i>
                {product.description.slice(0,25)} {product.description.length > 25 && '...'}
                </i>
              </h5>
              </p>  
            </nav>
            <br />
            <div className={style.cardIngredients}>
              <h4 >
                DETAILS
              </h4>
            </div>
            </Link>
        </div>
  return content
}
export default Product

