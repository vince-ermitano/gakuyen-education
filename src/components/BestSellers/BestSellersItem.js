import React from "react";
import './BestSellersItem.css'

const BestSellersItem = (props) => {

    const itemName = props.itemName;
    const itemImagePath = props.imagePath;

    return (
        <div className="item">
            <div className="item-image">
                <img src={itemImagePath ? itemImagePath : "https://archive.org/download/placeholder-image/placeholder-image.jpg" } alt="item" />
            </div>
            <div className="item-info">
                <span className="item-name">{itemName ? itemName : "The Odyssey - Creative\nMasterclass"}</span>
            </div>
        </div>
    )
}

export default BestSellersItem;