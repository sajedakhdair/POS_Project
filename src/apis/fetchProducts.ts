import { Product } from "../types";
const baseProductsUrl = "http://localhost:3001/Products"

export const fetchProducts = (): Promise<Product[]> => {
    return fetch(`${baseProductsUrl}`)
        .then((response) => response.json())
};

export const fetchDeleteProduct = (id: string) => {
    return fetch(`${baseProductsUrl}/${id}`, {
        method: "DELETE",
    }).then((response) => response.json())
};
