import React from "react";
import './PresetsHP.css';

const PresetsHP = () => {
    return (
      <div className="presets-hp">
        <div className="grid-container">
          <div className="grid-item grid-text">
            <div id="presets-hp-text">
              <h2>Presets</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <button className="shop-presets-btn darkgray-background">
                Shop Presets
              </button>
            </div>
          </div>
          <div className="grid-item">
            <img src="https://source.unsplash.com/random/?film,landscape"></img>
          </div>
          <div className="grid-item">
            <img src="https://source.unsplash.com/random/?film"></img>
          </div>
          <div className="grid-item">
            <img src="https://source.unsplash.com/random/?film"></img>
          </div>
          <div className="grid-item">
            <img src="https://source.unsplash.com/random/?film"></img>
          </div>
        </div>
      </div>
    );
}

export default PresetsHP;