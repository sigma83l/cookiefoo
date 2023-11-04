import { Product } from "../../types";

const BASE_URL = "http://localhost:3000/api/products/";

export default async function getProductById(id: string): Promise<Product> {
  try {
    console.log(BASE_URL+ id)
    const url = BASE_URL+ id
    const Products = await fetch(url, { next: {revalidate: 5}});
    if (!Products.ok) {
      throw new Error(`Failed to fetch data. Status: ${Products.status}`);
    }

    return await Products.json() as Product;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}