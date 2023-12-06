// import { toast } from "react-toastify";
import { toast } from "sonner";
import { calculateTotalPrice } from "./features/ShopSlice";
import CryptoJS from "crypto-js";
// import { auth } from "./config/firebaseConfig";

const AES = CryptoJS.AES;
const MAIN_LAUNCH_DATE = new Date("2023-12-08T03:00:00Z");
const LAUNCH_DATE = new Date("2023-12-08T03:00:00Z");
// const LAUNCH_DATE = new Date("2023-12-06T03:00:00Z");
// const MAIN_LAUNCH_DATE = new Date("2023-12-03T03:00:00Z");


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

export const checkIfPassedMainLaunchDate = () => {
    const currentTime = new Date().getTime();
    return currentTime > MAIN_LAUNCH_DATE;
}

export const checkIfPassedLaunchDate = () => {
    const currentTime = new Date().getTime();
    return currentTime > LAUNCH_DATE;
};

export function getTimeUntilSpecificDate() {

    const currentTime = new Date().getTime();

    const distance = MAIN_LAUNCH_DATE - currentTime;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, "0");

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    ).toString().padStart(2, "0");

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0");

    const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, "0");

    return `${days}:${hours}:${minutes}:${seconds}`;
}

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
    const userDirectory = document.querySelectorAll(".user-directory > *");
    hamburger.classList.toggle("is-active");

    if (hamburger.classList.contains("is-active")) {
        hamburgerMenu.classList.add("is-active");
        changeHeaderTextAndLogoToColor("black");

        for (const link of userDirectory) {
            link.style.backgroundColor = "transparent";
        }
        disableScroll();
    } else {
        hamburgerMenu.classList.remove("is-active");

        if (path === "/") {
            changeHeaderTextAndLogoToColor("white");


            for (const link of userDirectory) {
                if (window.innerWidth < 768) {
                    link.style.backgroundColor = "transparent";
                } else {
                    link.style.backgroundColor = "#282c34";
                }
            }
        } else {
            changeHeaderTextAndLogoToColor("black");
            for (const link of userDirectory) {
                link.style.backgroundColor = "transparent";
            }
        }
        enableScroll();
    }

    // updateBackgroundColorBasedOnWindowSize();
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
        document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "center" });
    }
};

export const updateBackgroundColorBasedOnWindowSize = () => {
    const userDirectory = document.querySelectorAll(".user-directory > *");
    
    if (window.innerWidth < 768) {
        for (const link of userDirectory) {
            link.style.backgroundColor = "transparent";
        }
    }

};

export const checkHeaderColor = (currentPath) => {
    if (currentPath.includes("/dashboard")) {
        return;
    }

    const userDirectoryLinks = document.querySelectorAll(
        ".user-directory span"
    );
    const userDirectory = document.querySelectorAll(".user-directory > *");
    const logo = document.querySelector(".header .logo svg");
    const cartSvg = document.querySelector(".header .user-directory svg");
    const hamburgerMenu = document.getElementById("hamburger-menu");

    if (hamburgerMenu.classList.contains("is-active")) {
        userDirectory.forEach((link) => {
            link.style.backgroundColor = "transparent";
        });
        userDirectoryLinks.forEach((link) => {
            link.style.color = "black";
        });
        // logo.src = "/theodyssey_s.png";
        logo.style.fill = "black";
        cartSvg.style.color = "black";
        return;
    }

    if (currentPath !== "/") {

        logo.style.fill = "black";
        userDirectory.forEach((link) => {
            link.style.backgroundColor = "transparent";
        });
        userDirectoryLinks.forEach((link) => {
            link.style.backgroundColor = "transparent";
        });
        // logo.src = "/theodyssey_s.png";
        cartSvg.style.color = "black";
    } else {
        userDirectoryLinks.forEach((link) => {
            link.style.color = "white";
        });
        userDirectory.forEach((link) => {
            link.style.backgroundColor = "#282c34";
        });
        // logo.src = "/theodysseywhite_s.png";
        logo.style.fill = "white";
        cartSvg.style.color = "white";
    }
    // updateBackgroundColorBasedOnWindowSize();
};

export const openNewWindow = (path) => {
    const newTab = window.open(path, "_blank");

    if (newTab) {
        newTab.focus();
    }
}

const authorized = [
    "kailange07@gmail.com",
    "peace.k.gates@gmail.com",
    "gakuyen@yahoo.com",
    "vincexermitano@gmail.com",
    "christianly23@gmail.com",
    "Monicakrystal@icloud.com",
    "hello@josephsb.com",
    "vermitan@ucsd.edu",
    "hello@gmail.com",
    "michellencreates@gmail.com",
];

export const checkIfAuthorized = (email) => {
    return authorized.includes(email);
};
