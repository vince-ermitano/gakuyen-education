import React from "react";

const ShopItem = () => {
  return (
    <div className="shop-item">
        <div className="shop-item-img">
            <img src="https://via.placeholder.com/400x300" alt="shop-item-img" />
        </div>
        <div className="shop-item-info">
            <h3>Item Name</h3>
            <p>Item Price</p>
        </div>
    </div>
  );
};

export default ShopItem;
