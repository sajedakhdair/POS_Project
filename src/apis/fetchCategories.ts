import { Category } from "../types";

export const fetchCategories = async (): Promise<Category[]> => {
    return await fetch("http://localhost:3001/categories")
        .then((response) => response.json())
};