import React from "react";
import "./BestSellers.css";
import BestSellersItem from "./BestSellersItem";
import { products } from "../../products/products.js";

const BestSellers = () => {
    return (
        <div className="best-sellers page-section">
            <h2>Best Sellers</h2>
            <div className="item-container">
                <BestSellersItem
                    product={products.presets.ultimate_transition_pack}
                />
                <BestSellersItem
                    product={products.presets.ultimate_preset_pack}
                />
                <BestSellersItem />
                <BestSellersItem />
            </div>
        </div>
    );
};

export default BestSellers;
