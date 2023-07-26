import React from "react";
import './BestSellersItem.css'

const BestSellersItem = () => {
    return (
        <div className="item">
            <div className="item-image">
                <img src="https://archive.org/download/placeholder-image/placeholder-image.jpg" alt="item" />
            </div>
            <div className="item-info">
                <span className="item-name">The Odyssey - Creative<br></br>Masterclass</span>
            </div>
        </div>
    )
}

export default BestSellersItem;