import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ShopItem.css";
import { convertToSlug } from "../../helpers";
import { setCurrentProduct } from "../../features/ShopSlice";

const ShopItem = ({ product, productId, productMainImg }) => {
    const customClass = product ? `shop-item-${product.type}` : "shop-item-null";
    const itemImagePath = productMainImg;
    const itemName = product ? product.name : "Item Name";
    const itemSlug = product ? convertToSlug(product.name) : "item-name";
    const itemPrice = product ? product.price : "Item Price";
    const itemType = product ? product.type : "Item Type";

    //react router dom
    const navigate = useNavigate();

    //redux
    const dispatch = useDispatch();

    const handleOnClick = () => {

        dispatch(setCurrentProduct(productId));

        switch (itemType) {
            case "Preset":
                navigate(`presets/${itemSlug}`);
                break;
            case "Transition":
                navigate(`transitions/${itemSlug}`);
                break;
            case "Masterclass":
                navigate(`masterclass/${itemSlug}`);
                break;
            case "SoundFX":
                navigate(`soundfx/${itemSlug}`);
                break;
            default:
                break;
        }
    };

    return (
        <div className="shop-item" onClick={handleOnClick}>
            {/* <Link to="/preset-desc"> */}
                <div className={customClass}>
                    <div className="shop-item-img">
                        <img
                            src={itemImagePath}
                            alt="shop-item-img"
                        />
                    </div>
                    <div className="shop-item-info">
                        <h3>{itemName}</h3>
                        <p>${itemPrice.toFixed(2)}</p>
                    </div>
                </div>
            {/* </Link> */}
        </div>
    );
};

export default ShopItem;
