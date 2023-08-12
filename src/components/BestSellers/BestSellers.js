import React from "react";
import './BestSellers.css';
import BestSellersItem from "./BestSellersItem";

const BestSellers = () => {
    return (
        <div className="best-sellers page-section">
            <h2>Best Sellers</h2>
            <div className="item-container">
                <BestSellersItem itemType="preset" itemName="ultimate transition pack" imagePath="/ultimate_transition_pack_1_400x400.jpg" />
                <BestSellersItem itemType="preset" itemName="ultimate preset pack" imagePath="/ultimate_preset_pack_1_400x400.jpg"/>
                <BestSellersItem />
                <BestSellersItem />
            </div>
        </div>
    )
}

export default BestSellers;