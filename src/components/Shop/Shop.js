import React, { useEffect } from "react";
import ShopNav from "../ShopNav/ShopNav";
import "./Shop.css";
import ShopItem from "./ShopItem";
// import { products } from "../../products/products.js";
import { useSelector } from "react-redux";

const Shop = () => {

    const products = useSelector((state) => state.shop.products);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "The Shop | GAKUYEN EDUCATION";
    }, []);

    return (
        <div className="shop">
            <h1>The Shop</h1>
            <ShopNav />
            <div className="shop-content">
            {Object.values(products).map((product) => (
                <ShopItem key={product.id} product={product} />
            ))}

            </div>
        </div>
    );
};

export default Shop;
