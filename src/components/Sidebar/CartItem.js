import React from "react";
import "./CartItem.css"
import { VscClose } from "react-icons/vsc";
import { useSelector } from "react-redux";

const CartItem = ({ item }) => {

    const products = useSelector((state) => state.shop.products);

    const itemName = products[item].name;
    const itemPrice = products[item].price;

    return (
        <div className="cart-item">
            <div className="image-and-details">
                <div className="image-wrapper">
                    <img src={item.imagePath} alt={item.name} />
                </div>
                <div className="item-details">
                    <p className="name">{itemName}</p>
                    <p className="product-number">{item}</p>
                    <p className="price">{itemPrice}</p>
                </div>
            </div>
            <div className="remove-button">
                <VscClose />
            </div>
        </div>
    );
};

export default CartItem;
