import { useState, useEffect } from "react"
import { ProductFormErrors, Category, Product } from "../types";
import { checkProductInformation, isThereAnyProductError } from "../utils"
import React from "react";
import { fetchCategories } from "../apis/fetchCategories";
import { fetchGetProductById } from "../apis/fetchProducts";

const useProductForm = (onSubmit: Function, onClose: Function, id?: string) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product>();
    const [disabledButton, setDisabledButton] = useState(false);
    const [circularProgress, setCircularProgress] = useState(false);

    useEffect(() => {
        fetchCategories()
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error(error);
            });
        if (id) {
            fetchGetProductById(id).then((data) => {
                setSelectedProduct(data)
                setValues(data);
            }).catch((error) => {
                console.error(error);
            })
        }
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
        let productCodeValidationStatus: boolean;
        if (!hasErrors) {
            setDisabledButton(true);
            if (id) {
                productCodeValidationStatus = await onSubmit(selectedProduct, productInformation)
            }
            else {
                productCodeValidationStatus = await onSubmit(productInformation)
            }
            if (productCodeValidationStatus) {
                setCircularProgress(true);
                setTimeout(() => {
                    onClose();
                }, 3000);
            }
            else {
                setErrors({ ...productFormErrors, codeError: "product code must be unique" })
                console.log(productFormErrors)
                setCircularProgress(false);
                setDisabledButton(false);
                onClose();
            }
        }
        else {
            setErrors(productFormErrors)
        };
    }

    const returnValues = {
        handleChange, handleSubmit,
        productInformation, setValues, errors, categories, disabledButton, circularProgress,
    }
    return returnValues
};

export default useProductForm;
