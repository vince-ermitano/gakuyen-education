import React from "react";
import './BestSellers.css';
import BestSellersItem from "./BestSellersItem";

const BestSellers = () => {
    return (
        <div>
            <h2>Best Sellers</h2>
            <div className="item-container">
                <BestSellersItem />
                <BestSellersItem />
                <BestSellersItem />
                <BestSellersItem />
            </div>
        </div>
    )
}

export default BestSellers;