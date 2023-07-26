import React from "react";
import './PresetsHP.css';

const PresetsHP = () => {
    return (
        <div className="presets-hp">
            <div className="upper-container">
                <div className="upper-container-text">
                    <h2>Presets</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <button className="shop-presets-btn darkgray-background">Shop Presets</button>
                </div>
                <div className="image-container">
                    <img src="https://source.unsplash.com/random/?film"></img>
                </div>
            </div>
            <div className="bottom-container image-container">
                <img src="https://source.unsplash.com/random/?photography"></img>
                <img src="https://source.unsplash.com/random/?preset"></img>
                <img src="https://source.unsplash.com/random/?sun"></img>
            </div>
        </div>
    )
}

export default PresetsHP;