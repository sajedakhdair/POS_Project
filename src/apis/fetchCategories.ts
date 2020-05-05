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

export const fetchValidateCategoryName = async (name: string): Promise<boolean> => {
    return fetchCategories().then((data) => {
        const result = data.filter(category => category.name === name)
        if (result.length === 0)
            return true
        else return false
    })
}

export const fetchEditCategory = async (selectedCategory: Category, name: string
): Promise<boolean> => {
    const validationStatus = await fetchValidateCategoryName(name);
    if (!validationStatus)
        return false
    else {
        let updatedCategory = { ...selectedCategory, name: name };
        await fetch(`http://localhost:3001/categories/${selectedCategory.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedCategory)
        }).catch((error) => {
            console.error(error);
        });
        return true;
    }
};