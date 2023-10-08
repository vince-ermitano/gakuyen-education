import React from "react";
import './BestSellersItem.css'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentProduct } from "../../features/ShopSlice";
import { convertToSlug } from "../../helpers";

const BestSellersItem = ({ product, productId }) => {

    const itemName = product ? product.name : "The Odyssey - Creative\nMasterclass";
    const itemSlug = product ? convertToSlug(product.name) : "item-name";
    const itemImagePath = "https://archive.org/download/placeholder-image/placeholder-image.jpg";
    const itemType = product ? product.type : "";

    // react router dom
    const navigate = useNavigate();

    // redux
    const dispatch = useDispatch();

    const handleOnClick = () => {

        dispatch(setCurrentProduct(productId));

        switch (itemType) {
            case "Preset":
                navigate(`/store/presets/${itemSlug}`);
                break;
            case "Masterclass":
                navigate(`/store/masterclass/${itemSlug}`);
                break;
            case "Transition":
                navigate(`/store/transitions/${itemSlug}`);
                break;
            default:
                break;
        }
    };
    
    return (
        <div className="item" onClick={handleOnClick}>
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