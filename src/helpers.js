import { toast } from "react-toastify";
import { calculateTotalPrice } from "./features/ShopSlice";
// import { auth } from "./config/firebaseConfig";

export const TOAST_POSITION = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
};

export function convertToSlug(input) {
    return input
        .toLowerCase()                   // Convert to lowercase
        .replace(/[^\w\s-]/g, '')         // Remove special characters
        .replace(/\s+/g, '-')            // Replace spaces with hyphens
        .replace(/-+/g, '-')             // Replace consecutive hyphens with a single hyphen
        .trim();                         // Trim any leading/trailing spaces
}

export const handleAddToCart = (e, dispatch) => {

    // notify user that item has been added to cart if item is already in cart
    if (JSON.parse(localStorage.getItem("cart"))[e.target.dataset.itemId]) {
        toast.error("Item has already been added to cart", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
        });
    } else {
        localStorage.setItem(
            "cart",
            JSON.stringify({
                ...JSON.parse(localStorage.getItem("cart")),
                [e.target.dataset.itemId]: 1,
            })
        );

        dispatch(calculateTotalPrice());

        toast.success("Item has been added to cart", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
        });
    }

};

export const filterProducts = (ownedProducts, filter, products) => {
    let filteredProducts = {};

    for (const product in ownedProducts) {
        if (products[product].type === filter) {
            filteredProducts[product] = ownedProducts[product];
        }
    }

    return filteredProducts;
}

export const filterProductsNotOwned = (ownedProducts, filter, products) => {
    let filteredProducts = {};

    for (const product in products) {
        if (products[product].type === filter && !ownedProducts[product]) {
            filteredProducts[product] = 1;
        }
    }

    return filteredProducts;
}

export const updateCartAfterRemovalOfDupes = (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
};