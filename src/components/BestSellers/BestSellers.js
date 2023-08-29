import React from "react";
import "./BestSellers.css";
import BestSellersItem from "./BestSellersItem";
import { useSelector } from "react-redux";

const BestSellers = () => {

    const products = useSelector((state) => state.shop.products);

    const productsAreLoading = useSelector((state) => state.shop.isLoading);

    return (
        <div className="best-sellers page-section">
            <h2>Best Sellers</h2>
            <div className="item-container">
                { productsAreLoading && <div>Loading...</div>}
                {/* {Object.values(products).map((product) => (
                    <BestSellersItem key={product.id} product={product} />
                ))} */}
                {Object.keys(products).map((productId) => (
                    <BestSellersItem
                        key={productId}
                        product={products[productId]}
                        productId={productId}
                    />
                ))}
            </div>
        </div>
    );
};

export default BestSellers;
