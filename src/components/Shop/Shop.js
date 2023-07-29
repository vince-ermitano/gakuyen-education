import React from "react";
import ShopNav from "../ShopNav/ShopNav";
import "./Shop.css";
import ShopItem from "./ShopItem";

const Shop = () => {
  return (
    <div className="shop">
      <h1>The Shop</h1>
      <ShopNav />
      <div className="shop-content">
        <ShopItem />
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