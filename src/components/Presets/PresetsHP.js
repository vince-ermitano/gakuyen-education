import React from "react";
import "./PresetsHP.css";

const PresetsHP = () => {
    return (
        <div className="presets-hp">
            <div className="grid-container">
                <div className="grid-item grid-text">
                    <div id="presets-hp-text">
                        <h2>Presets</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                        <button className="shop-presets-btn darkgray-background">
                            Shop Presets
                        </button>
                    </div>
                </div>
                <div className="grid-item">
                    {/* <img src="https://source.unsplash.com/random/?film,landscape" alt=""></img> */}
                    <img
                        src="https://images.squarespace-cdn.com/content/v1/61a46cc601b4c521a42206d3/1645248046833-OM3EL5XT9ZNDQ3EW2RZE/Night3-A.jpeg?format=750w"
                        alt=""
                    ></img>
                </div>
                <div className="grid-item">
                    {/* <img src="https://source.unsplash.com/random/?film" alt=""></img> */}
                    <img
                        src="https://images.squarespace-cdn.com/content/v1/61a46cc601b4c521a42206d3/1645247526671-F8QXSKJO9WXL86EJ8CC6/DSC07768-1-1.jpeg?format=750w"
                        alt=""
                    ></img>
                </div>
                <div className="grid-item">
                    {/* <img src="https://source.unsplash.com/random/?film" alt="" ></img> */}
                    <img
                        src="https://images.squarespace-cdn.com/content/v1/61a46cc601b4c521a42206d3/1645247604182-0PY2E2N98QFQI5ITG1BJ/gak-02567-copy-1.jpeg?format=1500w"
                        alt=""
                    ></img>
                </div>
                <div className="grid-item">
                    {/* <img src="https://source.unsplash.com/random/?film" alt=""></img> */}
                    <img
                        src="https://images.squarespace-cdn.com/content/v1/61a46cc601b4c521a42206d3/1645248050136-SZU0QNE11HSW5HMNKRIH/Night1-A.jpeg?format=750w"
                        alt=""
                    ></img>
                </div>
            </div>
        </div>
    );
};

export default PresetsHP;
