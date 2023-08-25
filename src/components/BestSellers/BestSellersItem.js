import React from "react";
import './BestSellersItem.css'
import { useNavigate } from "react-router-dom";

const BestSellersItem = ({ product }) => {

    // const itemName = props.itemName;
    // const itemImagePath = props.imagePath;
    // const itemType = props.itemType;

    const itemName = product ? product.name : "The Odyssey - Creative\nMasterclass";
    const itemImagePath = "https://archive.org/download/placeholder-image/placeholder-image.jpg";
    const itemType = product ? product.type : "";

    const navigate = useNavigate();

    const redirectToPresetDesc = () => {
        if (itemType === "preset") {
            navigate("/preset-desc");
        }
    }

    return (
        <div className="item" onClick={() => redirectToPresetDesc()}>
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