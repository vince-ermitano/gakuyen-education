import React from "react";
import { Link } from "react-router-dom";
import "./ShopItem.css";

const ShopItem = (props) => {
    const customClass = `shop-item ${props.itemType}`;
    const itemImagePath = props.itemImagePath;
    const itemName = props.itemName;
    const itemPrice = props.itemPrice;

    return (
        <div className="shop-item">
            <Link to="/preset-desc">
                <div className={customClass}>
                    <div className="shop-item-img">
                        <img
                            src={
                                itemImagePath
                                    ? itemImagePath
                                    : "https://via.placeholder.com/400x400"
                            }
                            alt="shop-item-img"
                        />
                    </div>
                    <div className="shop-item-info">
                        <h3>{itemName ? itemName : "Item Name"}</h3>
                        <p>{itemPrice ? itemPrice : "Item Price"}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ShopItem;
