import { Category } from "../types";
import { formatDate } from "../utils";
const baseUrl = "http://localhost:3001"

export const fetchCategories = (): Promise<Category[]> => {
    return fetch(`${baseUrl}/categories`)
        .then((response) => response.json())
};

export const fetchCategoiesById = (id: number): Promise<Category> => {
    return fetch(`${baseUrl}/categories/${id}`)
        .then((response) => response.json())
};

export const fetchDeleteCategory = (id: string) => {
    return fetch(`${baseUrl}/categories/${id}`, {
        method: "DELETE",
    }).then((response) => response.json())
};

export const fetchValidateCategoryName = (name: string): Promise<boolean> => {
    return fetchCategories().then((data) => {
        const result = data.filter(category => category.name === name)
        return (result.length === 0)
    })
}

export const fetchEditCategory = (selectedCategory: Category, name: string
) => {
    return fetchValidateCategoryName(name).then((result) => {
        if (result === true) {
            let updatedCategory = { ...selectedCategory, name: name };
            fetch(`${baseUrl}/categories/${selectedCategory.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedCategory)
            }).then((response) => response.json())
        }
        return result
    })
};

export const fetchAddCategory = (name: string): Promise<boolean> => {
    const date = formatDate();
    const newCategory = { name: name, date: date };
    return fetchValidateCategoryName(name).then((result) => {
        if (result === true) {
            fetch(`${baseUrl}/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newCategory)
            }).then((response) => response.json())
        }
        return result
    })
} 