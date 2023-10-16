import React from "react";
import { useMediaQuery } from "react-responsive";
import "./BestSellers.css";
import BestSellersItem from "./BestSellersItem";
import { useSelector } from "react-redux";

const BestSellers = () => {

    const products = useSelector((state) => state.shop.products);

    const productsAreLoading = useSelector((state) => state.shop.isLoading);

    const isMobile = useMediaQuery({ maxWidth: 768 });
    const maxMobileItems = 3;

    return (
        <div className="best-sellers page-section">
            <h2>Best Sellers</h2>
            <div className="item-container">
                { productsAreLoading && <div>Loading...</div>}
                {/* {Object.values(products).map((product) => (
                    <BestSellersItem key={product.id} product={product} />
                ))} */}
                {Object.keys(products).map((productId, index) => (

                    (!isMobile || (isMobile &&  index < maxMobileItems)) ? (

                        <BestSellersItem
                            key={productId}
                            product={products[productId]}
                            productId={productId}
                        />
                    ) : null
                ))}
            </div>
        </div>
    );
};

export default BestSellers;
