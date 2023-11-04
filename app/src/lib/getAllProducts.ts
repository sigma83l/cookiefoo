import { Product } from "../../types";

const BASE_URL = "http://localhost:3000/api/products";

export default async function getAllProducts(): Promise<Array<Product>> {
  try {
    const Products = await fetch(BASE_URL , { next: {revalidate: 10}});
    if (!Products.ok) {
      throw new Error(`Failed to fetch data. Status: ${Products.status}`);
    }

    return await Products.json() as Array<Product>;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}