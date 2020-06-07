import { useState, useEffect } from "react"
import { ProductFormErrors, Category, Product } from "../types";
import { checkProductInformation, isThereAnyProductError } from "../utils"
import React from "react";
import { fetchCategories } from "../apis/fetchCategories";

const useProductForm = (onSubmit: Function, onClose: Function, id?: string) => {
    const [categories, setCategories] = useState<Category[]>([]);
    useEffect(() => {
        fetchCategories()
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []); 

    const [productInformation, setValues] = useState<Product>({
        id: 0,
        name: "Name",
        rawPrice: '0',
        price: '0',
        tax: '0',
        category: "Category",
        code: "000000",
        image: "",
        description: "Enter Product description",
        quantity: 0,
        expirationDate: new Date().toString(),
        stockCount: 0
    });

    const [errors, setErrors] = useState({
        nameError: "",
        rawPriceError: "",
        priceError: "",
        codeError: "",
        categoryError: "",
        expirationDateError: "",
        stockCountError: ""
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues({ ...productInformation, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const productFormErrors: ProductFormErrors = checkProductInformation(productInformation);
        const hasErrors: boolean = isThereAnyProductError(productFormErrors);
        if (!hasErrors) {
        }
        else {
            setErrors(productFormErrors)
        };
    };

    const returnValues = {
        handleChange, handleSubmit,
        productInformation, setValues, errors, categories
    }
    return returnValues
};

export default useProductForm;
