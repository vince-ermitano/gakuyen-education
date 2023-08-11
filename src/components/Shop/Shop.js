import React, { useEffect } from "react";
import ShopNav from "../ShopNav/ShopNav";
import "./Shop.css";
import ShopItem from "./ShopItem";

const Shop = () => {

    useEffect(() => {
        document.title = "The Shop | GAKUYEN EDUCATION";
    }, []);

    return (
        <div className="shop">
            <h1>The Shop</h1>
            <ShopNav />
            <div className="shop-content">
                <ShopItem itemType="preset" />
                <ShopItem />
                <ShopItem />
                <ShopItem />
                <ShopItem />
                <ShopItem />
                <ShopItem />
            </div>
        </div>
    );
};

export default Shop;
