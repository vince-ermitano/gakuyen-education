import React, { useEffect } from "react";
import ShopNav from "../ShopNav/ShopNav";
import "./Shop.css";
import ShopItem from "./ShopItem";

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
                <ShopItem itemType="preset" itemImagePath="/ultimate_preset_pack_1_400x400.jpg" itemPrice="$39.95" itemName="ultimate transition pack"/>
                <ShopItem itemType="preset" itemImagePath="/ultimate_transition_pack_1_400x400.jpg" itemPrice="$19.95" itemName="ultimate preset pack"/>
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
