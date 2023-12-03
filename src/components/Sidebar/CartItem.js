import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./CartItem.css"
import { VscClose } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { calculateTotalPrice } from "../../features/ShopSlice";

// TODO: Refactor to get image from file

const CartItem = ({ itemId }) => {

    const dispatch = useDispatch();

    const [remove, setRemove] = useState(false);
    const [isRehydrated, setIsRehydrated] = useState(false);

    const products = useSelector((state) => state.shop.products);

    const handleOnRemove = () => {
        const currentCart = JSON.parse(localStorage.getItem('cart'));
        delete currentCart[itemId];
        localStorage.setItem('cart', JSON.stringify(currentCart));

        // remove CartItem from CartSidebar
        setRemove(true);

        // recalculate total price
        dispatch(calculateTotalPrice());
    }

    let itemName;
    let itemPrice;

    if (!isRehydrated) {
        itemName = "Loading...";
        itemPrice = "Loading...";
    } else {
        itemName = products[itemId].name;
        itemPrice = products[itemId].price;
    }

    useEffect(() => {
        if (Object.keys(products).length > 0) {
            setIsRehydrated(true);
        }
    }, [products]);


    return (

        isRehydrated ? (
            <div className={`cart-item ${remove ? "remove" : ""}`}>
                <div className="image-and-details">
                    <div className="image-wrapper">
                        <img src={products[itemId].images[0]} alt={itemName} />
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
        ) : (
            <p>Loading...</p>
        )
    );
};

export default CartItem;
