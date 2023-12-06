import React from "react";
import "./PresetLutCard.css";
import { useNavigate } from "react-router-dom";
import { BsDownload } from "react-icons/bs";
import { useSelector } from "react-redux";

const PresetLutCard = (props) => {

    const navigate = useNavigate();
    const authorized = useSelector((state) => state.user.authorized);

    const openDetailsSidebar = () => {

        if (!authorized) return;

        const detailsImageContainer = document.querySelector(".preset-lut-image-container");

        setTimeout(() => {
            detailsImageContainer.style.backgroundImage = `url(${props.item.images[1]})`;
        }, 300);

        if (props.detailsIsOpen) {
            props.setDetails(false);

            setTimeout(() => {
                props.setDetails(true);
            }, 400);
        } else {
            props.setDetails(true);
        }

        if (props.isOwned === "true") {
            props.setCurrentItemIsOwned(true);
        } else {
            props.setCurrentItemIsOwned(false);
        }

        props.setCurrentItem(props.item);
    };

    const handleGoToStore = () => {
        if (!authorized) return;
        navigate("/store");
    }

    return (
        <div className='preset-lut-card' onClick={openDetailsSidebar}>
            <div className="preset-lut-card-image">
                <img
                    src={props.item.images[0]}
                    alt="preset"
                />
            </div>
            <p>{props.item.name}</p>
            {props.isOwned === "true" ? <BsDownload onClick={() => props.downloadFile(props.downloadUrl)}/> : <button onClick={handleGoToStore}>Check it out</button>}
                
        </div>
    );
};

export default PresetLutCard;
