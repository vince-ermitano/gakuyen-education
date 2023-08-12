import React, { useEffect } from "react";
import ShopNav from "../ShopNav/ShopNav";
import "./Shop.css";
import ShopItem from "./ShopItem";
import { products } from "../../products/products.js";

const Shop = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "The Shop | GAKUYEN EDUCATION";
    }, []);

    return (
        <div className="shop">
            <h1>The Shop</h1>
            <ShopNav />
            <div className="shop-content">
                <ShopItem product={products.presets.ultimate_preset_pack} itemType="preset" itemImagePath="/ultimate_preset_pack_1_400x400.jpg" itemPrice="$39.95" itemName="ultimate transition pack"/>
                <ShopItem product={products.presets.ultimate_transition_pack} itemType="preset" itemImagePath="/ultimate_transition_pack_1_400x400.jpg" itemPrice="$19.95" itemName="ultimate preset pack"/>
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
