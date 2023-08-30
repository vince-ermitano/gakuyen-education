import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./CartItem.css"
import { VscClose } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { calculateTotalPrice } from "../../features/ShopSlice";

// TODO: Refactor to get image from file

const CartItem = ({ itemId }) => {

    const dispatch = useDispatch();

    const [remove, setRemove] = useState(false);

    const products = useSelector((state) => state.shop.products);

    const itemName = products[itemId].name;
    const itemPrice = products[itemId].price;

    const handleOnRemove = () => {
        const currentCart = JSON.parse(localStorage.getItem('cart'));
        delete currentCart[itemId];
        localStorage.setItem('cart', JSON.stringify(currentCart));

        // remove CartItem from CartSidebar
        setRemove(true);

        // recalculate total price
        dispatch(calculateTotalPrice());
    }

    return (
        <div className={`cart-item ${remove ? "remove" : ""}`}>
            <div className="image-and-details">
                <div className="image-wrapper">
                    <img src={'/ultimate_preset_pack_1_400x400.jpg'} alt={itemName} />
                </div>
                <div className="item-details">
                    <p className="name">{itemName}</p>
                    <p className="product-number">{itemId}</p>
                    <p className="price">${itemPrice}</p>
                </div>
            </div>
            <div className="remove-button" onClick={handleOnRemove}>
                <VscClose />
            </div>
        </div>
    );
};

export default CartItem;
