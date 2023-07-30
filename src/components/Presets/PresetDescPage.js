import React from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import "./PresetDescPage.css";
import { register } from "swiper/element/bundle";

register();

const PresetDescPage = () => {
    const swiperElRef = useRef(null);

    return (
        <div className="preset-desc-page">
            <Link to="/store">
                <button>&lt; Back to Presets Shop</button>
            </Link>
            <div className="preset-desc-page-content">
                <div className="preset-desc-page-img">
                    <img
                        src="https://via.placeholder.com/400x300"
                        alt="preset-desc-page-img"
                    />
                </div>
                <div className="preset-desc-page-info">
                    <h3>Preset Name</h3>
                    <p>Lorem ipsum dolor sit amet</p>
                    <p>$10</p>
                    <button className="darkgray-background" >Add to Cart</button>
                </div>
                <div>
                    <h4>Lorem ipsum dolor sit amet</h4>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </p>
                </div>

                <swiper-container
                    ref={swiperElRef}
                    slides-per-view="1"
                    navigation="true"
                >
                    <swiper-slide>
                        <img src="https://via.placeholder.com/400x300" />
                    </swiper-slide>
                    <swiper-slide>
                        <img src="https://via.placeholder.com/400x300" />
                    </swiper-slide>
                    <swiper-slide>
                        <img src="https://via.placeholder.com/400x300" />
                    </swiper-slide>
                    <swiper-slide>
                        <img src="https://via.placeholder.com/400x300" />
                    </swiper-slide>
                </swiper-container>

                <div className="preset-desc-page-img">
                    <img
                        src="https://via.placeholder.com/400x300"
                        alt="preset-desc-page-img"
                    />
                </div>

                <div className="preset-desc-page-info">
                    <h4>What's Included</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.</p>
                    <ul>
                        <li>Included Item</li>
                        <li>Included Item</li>
                        <li>Included Item</li>
                        <li>Included Item</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PresetDescPage;
