import React from "react";
import "./PresetLutCard.css";
import { BsDownload } from "react-icons/bs";

const PresetLutCard = (props) => {

    // TODO: replace images once we have them

    return (
        <div className='preset-lut-card'>
            <div className="preset-lut-card-image">
                <img
                    src="https://images.squarespace-cdn.com/content/v1/61a46cc601b4c521a42206d3/1645248050136-SZU0QNE11HSW5HMNKRIH/Night1-A.jpeg?format=1000w"
                    alt="preset"
                />
            </div>
            <p>{props.item.name}</p>
            {props.isOwned === "true" ? <BsDownload /> : <button>Check it out</button>}
        </div>
    );
};

export default PresetLutCard;
