import React, { useEffect } from "react";
import ShopNav from "../ShopNav/ShopNav";
import "./Shop.css";
import ShopItem from "./ShopItem";
import { useSearchParams } from "react-router-dom";
// import { products } from "../../products/products.js";
import { useSelector } from "react-redux";
import { filterProductsOnShop } from "../../helpers";

const Shop = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const products = useSelector((state) => state.shop.products);
    const productsAreLoading = useSelector((state) => state.shop.isLoading);

    // filter based on the search params
    const filter = searchParams.get("filter");
    
    const filteredProducts = filterProductsOnShop(products, filter);
    
    
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "The Shop | GAKUYEN EDUCATION";
        
        if (!filter) {
            setSearchParams({ filter: "all" });
        }
    }, [searchParams, setSearchParams, filter]);

    return (
        <div className="shop">
            <h1>The Shop</h1>
            <ShopNav setSearchParams={setSearchParams}/>
            <div className="shop-content">
                {productsAreLoading && <div>Loading...</div>}

                {Object.keys(filteredProducts).map((productId) => (
                    <ShopItem
                        key={productId}
                        product={products[productId]}
                        productId={productId}
                    />
                ))}
            </div>
        </div>
    );
};

export default Shop;
