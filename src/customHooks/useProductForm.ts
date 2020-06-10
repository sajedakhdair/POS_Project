import { useState, useEffect } from "react"
import { ProductFormErrors, Category, Product } from "../types";
import { checkProductInformation, isThereAnyProductError } from "../utils"
import React from "react";
import { fetchCategories } from "../apis/fetchCategories";
import { fetchGetProductById, fetchStoreImageFileAsUrl } from "../apis/fetchProducts";

const useProductForm = (onSubmit: Function, onClose: Function, id?: string) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product>();
    const [disabledButton, setDisabledButton] = useState(false);
    const [circularProgress, setCircularProgress] = useState(false);
    const [imgSource, setImagSource] = useState<any>();
    const [productInfo, setProductInfo] = useState<Product>({
        id: 0,
        name: "",
        rawPrice: '',
        price: '',
        tax: '',
        category: "",
        code: "",
        image: "",
        description: "",
        quantity: 0,
        expirationDate: "",
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
                setProductInfo({ ...productInfo, ...data });
            }).catch((error) => {
                console.error(error);
            })
        }
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProductInfo({ ...productInfo, [name]: value });
    };

    const handleUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        let fileInput = event.target.files ? event.target.files[0] : "";
        let pathTofile = event.target.value;

        await fetchStoreImageFileAsUrl(fileInput, pathTofile).then((response) => {
            setImagSource(response.image.url)
        });
    };

    useEffect(() => {
        setProductInfo({ ...productInfo, image: `${imgSource}` })
    }, [imgSource])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const productFormErrors: ProductFormErrors = checkProductInformation(productInfo);
        const hasErrors: boolean = isThereAnyProductError(productFormErrors);
        let productCodeValidationStatus: boolean;
        if (!hasErrors) {
            setDisabledButton(true);
            if (id) {
                productCodeValidationStatus = await onSubmit(selectedProduct, productInfo)
            }
            else {
                productCodeValidationStatus = await onSubmit(productInfo)
            }
            if (productCodeValidationStatus) {
                setCircularProgress(true);
                setTimeout(() => {
                    onClose();
                }, 3000);
            }
            else {
                setErrors({ ...productFormErrors, codeError: "product code must be unique" })
                setCircularProgress(false);
                setDisabledButton(false);
            }
        }
        else {
            setErrors(productFormErrors)
        };
    }

    const returnValues = {
        handleChange, handleSubmit, handleUploadImage,
        productInfo, setProductInfo, errors, categories, disabledButton, circularProgress,
    }
    return returnValues
};

export default useProductForm;
