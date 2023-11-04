export type ProductId = {
    params: {productId: string};
} 

export type Product = {
    id: string;
    name: string
    description: string,
    img_src: string,
    ingredients: Array<string>, 
    price_per_kilo: number,
}