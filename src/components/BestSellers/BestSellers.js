import React from "react";
import "./BestSellers.css";
import BestSellersItem from "./BestSellersItem";
import { useSelector } from "react-redux";

const BestSellers = () => {

    const products = useSelector((state) => state.shop.products);

    const productsAreLoading = useSelector((state) => state.shop.isLoading);

    if (productsAreLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className="best-sellers page-section">
            <h2>Best Sellers</h2>
            <div className="item-container">
                {Object.values(products).map((product) => (
                    <BestSellersItem key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default BestSellers;
