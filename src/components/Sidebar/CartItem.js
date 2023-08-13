import React from "react";
import "./CartItem.css"

const CartItem = ({ item }) => {
    return (
        <div className="cart-item">
            <div className="image-wrapper">
                <img src={item.imagePath} alt={item.name} />
            </div>
            <div className="item-details">
                <p className="name">{item.name}</p>
                <p className="product-number">{item.productNum}</p>
                <p className="price">{item.price}</p>
            </div>
        </div>
    );
};

export default CartItem;
