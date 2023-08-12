import React from "react";
import './BestSellersItem.css'
import { useNavigate} from "react-router-dom";

const BestSellersItem = (props) => {

    const itemName = props.itemName;
    const itemImagePath = props.imagePath;
    const itemType = props.itemType;

    const navigate = useNavigate();

    const redirectToPresetDesc = () => {
        if (itemType === "preset") {
            console.log("redirecting to preset desc");
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