import { Product } from "../types";
const baseProductsUrl = "http://localhost:3001/Products"

export const fetchProducts = (): Promise<Product[]> => {
    return fetch(`${baseProductsUrl}`)
        .then((response) => response.json())
};
