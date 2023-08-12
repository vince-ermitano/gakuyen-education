import React from "react";
import { Link } from "react-router-dom";
import "./ShopItem.css";

const ShopItem = ({ product }) => {
    const customClass = product ? `shop-item ${product.type}` : "shop-item";
    const itemImagePath = product ? product.imagePath : "https://via.placeholder.com/400x400";
    const itemName = product ? product.name : "Item Name";
    const itemPrice = product ? product.price : "Item Price";
    // const customClass = `shop-item ${props.itemType}`;
    // const itemImagePath = props.itemImagePath;
    // const itemName = props.itemName;
    // const itemPrice = props.itemPrice;

    return (
        <div className="shop-item">
            <Link to="/preset-desc">
                <div className={customClass}>
                    <div className="shop-item-img">
                        <img
                            src={itemImagePath}
                            alt="shop-item-img"
                        />
                    </div>
                    <div className="shop-item-info">
                        <h3>{itemName}</h3>
                        <p>{itemPrice}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ShopItem;
