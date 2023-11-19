// import { toast } from "react-toastify";
import { toast } from "sonner";
import { calculateTotalPrice } from "./features/ShopSlice";
import CryptoJS from "crypto-js";
// import { auth } from "./config/firebaseConfig";

const AES = CryptoJS.AES;

export const disableScroll = () => {
    document.body.style.overflow = "hidden";
};

export const enableScroll = () => {
    document.body.style.overflow = "auto";
};

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
        .toLowerCase() // Convert to lowercase
        .replace(/[^\w\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Replace consecutive hyphens with a single hyphen
        .trim(); // Trim any leading/trailing spaces
}

export function convertFromSlug(slug) {
    return slug
        .replace(/-/g, " ") // Replace hyphens with spaces
        .toLowerCase(); // Convert to lowercase
}

export const getProductIdFromProductName = (productName, products) => {
    for (const productId in products) {
        if (products[productId].name.toLowerCase() === productName) {
            return productId;
        }
    }
};

export const handleAddToCart = (e, dispatch) => {
    // notify user that item has been added to cart if item is already in cart
    if (JSON.parse(localStorage.getItem("cart"))[e.target.dataset.itemId]) {
        toast.error("Item has already been added to cart");
    } else {
        localStorage.setItem(
            "cart",
            JSON.stringify({
                ...JSON.parse(localStorage.getItem("cart")),
                [e.target.dataset.itemId]: 1,
            })
        );

        dispatch(calculateTotalPrice());

        toast.success("Item has been added to cart");
    }
};

export const filterProductsOnShop = (products, filter) => {
    if (filter === "all") {
        return products;
    }

    let filteredProducts = {};

    for (const product in products) {
        if (products[product].type.toLowerCase() === filter) {
            filteredProducts[product] = products[product];
        }
    }

    return filteredProducts;
};

export const filterProducts = (ownedProducts, filter, products) => {
    let filteredProducts = {};

    for (const product in ownedProducts) {
        if (products[product].type === filter) {
            filteredProducts[product] = ownedProducts[product];
        }
    }

    return filteredProducts;
};

export const filterProductsNotOwned = (ownedProducts, filter, products) => {
    let filteredProducts = {};

    for (const product in products) {
        if (products[product].type === filter && !ownedProducts[product]) {
            filteredProducts[product] = 1;
        }
    }

    return filteredProducts;
};

export const updateCartAfterRemovalOfDupes = (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
};

export const setUserOwnedItemsIfNull = () => {
    if (localStorage.getItem("purchasedItems") === null) {
        const encrypted = AES.encrypt(
            JSON.stringify({}),
            process.env.REACT_APP_SECRET_KEY
        ).toString();
        localStorage.setItem("purchasedItems", encrypted);
    }
};

export const toggleHamburger = (path) => {
    const hamburger = document.querySelector(".hamburger");
    const hamburgerMenu = document.getElementById("hamburger-menu");
    hamburger.classList.toggle("is-active");

    console.log(path);

    if (hamburger.classList.contains("is-active")) {
        hamburgerMenu.classList.add("is-active");
        changeHeaderTextAndLogoToColor("black");
        disableScroll();
    } else {
        hamburgerMenu.classList.remove("is-active");

        if (path === "/") {
            changeHeaderTextAndLogoToColor("white");
        } else {
            changeHeaderTextAndLogoToColor("black");
        }
        enableScroll();
    }
};

export const changeHeaderTextAndLogoToColor = (color) => {
    const headerText = document.querySelectorAll(".header-text");

    headerText.forEach((text) => {
        text.style.color = color;
    });

    document.querySelector(".header .logo svg").style.fill = color;
};

export const scrollIntoView = (id) => {
    const element = document.getElementById(id);

    if (element) {
        document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    }
};

export const checkHeaderColor = (currentPath) => {
    if (currentPath.includes("/dashboard")) {
        return;
    }

    const userDirectoryLinks = document.querySelectorAll(
        ".user-directory span"
    );
    const logo = document.querySelector(".header .logo svg");
    const cartSvg = document.querySelector(".header .user-directory svg");
    const hamburgerMenu = document.getElementById("hamburger-menu");

    if (hamburgerMenu.classList.contains("is-active")) {
        userDirectoryLinks.forEach((link) => {
            link.style.color = "black";
        });
        // logo.src = "/theodyssey_s.png";
        logo.style.fill = "black";
        cartSvg.style.color = "black";
        return;
    }

    if (currentPath !== "/") {
        userDirectoryLinks.forEach((link) => {
            link.style.color = "black";
        });
        // logo.src = "/theodyssey_s.png";
        cartSvg.style.color = "black";
    } else {
        userDirectoryLinks.forEach((link) => {
            link.style.color = "white";
        });
        // logo.src = "/theodysseywhite_s.png";
        logo.style.fill = "white";
        cartSvg.style.color = "white";
    }
};
