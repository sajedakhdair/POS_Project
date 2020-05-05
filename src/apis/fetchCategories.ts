import { Category } from "../types";

export const fetchCategories = async (): Promise<Category[]> => {
    return await fetch("http://localhost:3001/categories")
        .then((response) => response.json())
};

export const fetchDeleteCategory = async (id: string) => {
    await fetch(`http://localhost:3001/categories/${id}`, {
        method: "DELETE",
    }).catch((error) => {
        console.error(error);
    });
};