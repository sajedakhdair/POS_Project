import { Product } from "../types";
import { formatPrice } from "../utils";
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

export const fetchValidateProductCode = (code: string, id?: number): Promise<boolean> => {
    return fetchProducts().then((data) => {
        const result = data.filter(product => (product.code === code && (id ? product.id !== id : true)))
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
                body: JSON.stringify({
                    ...product, price: formatPrice(product.price),
                    rawPrice: formatPrice(product.rawPrice)
                })
            }).then((response) => response.json())
        }
        return result
    })
}

export const fetchGetProductById = (id: string): Promise<Product> => {
    return fetch(`${baseProductsUrl}/${id}`)
        .then((response) => response.json())
};

export const fetchEditProduct = (selectedProduct: Product, editedProduct: Product
) => {
    return fetchValidateProductCode(editedProduct.code, editedProduct.id).then((result) => {
        if (result === true) {
            fetch(`${baseProductsUrl}/${editedProduct.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...selectedProduct, ...editedProduct })
            }).then((response) => response.json())
        }
        return result
    })
};