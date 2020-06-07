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

export const fetchValidateProductCode = (code: string): Promise<boolean> => {
    return fetchProducts().then((data) => {
        const result = data.filter(product => product.code === code)
        return (result.length === 0)
    })
}

export const fetchAddProduct = (product: Product) => {
    return fetchValidateProductCode(product.code).then((result) => {
        if (result === true) {
            fetch(`${baseProductsUrl}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(product)
            }).then((response) => response.json())
        }
        return result
    })
}