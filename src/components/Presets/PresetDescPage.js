import React from "react";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PresetDescPage.css";
import { register } from "swiper/element/bundle";

register();

const PresetDescPage = () => {
    const swiperElRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Preset Description | GAKUYEN EDUCATION';
      }, []);

    return (
        <div className="preset-desc-page page-section">
            <Link to="/store">
                <button className="back-to-btn">
                    &lt; Back to Presets Shop
                </button>
            </Link>
            <div className="preset-desc-page-content">
                <div className="preset-desc-page-img img-container">
                    <img
                        src="https://via.placeholder.com/500x400"
                        alt="preset-desc-page-img"
                    />
                </div>
                <div className="preset-desc-page-info preset-name-price item-name-price">
                    <h1>Preset Name</h1>
                    <p>Lorem ipsum dolor sit amet</p>
                    <p>$10</p>
                    <button className="darkgray-background" data-item-id="">Add to Cart</button>
                </div>
                <div className="second-row-desc">
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
                    loop="true"
                    autoplay="true"
                >
                    <swiper-slide>
                        <div className="carousel-img-container">
                            <img
                                src="https://via.placeholder.com/400x300"
                                alt="slider content"
                            />
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <div className="carousel-img-container">
                            <img
                                src="https://via.placeholder.com/400x300"
                                alt="slider content"
                            />
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <div className="carousel-img-container">
                            <img
                                src="https://via.placeholder.com/400x300"
                                alt="slider content"
                            />
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <div className="carousel-img-container">
                            <img
                                src="https://via.placeholder.com/400x300"
                                alt="slider content"
                            />
                        </div>
                    </swiper-slide>
                </swiper-container>

                <div className="preset-desc-page-img img-container">
                    <img
                        src="https://via.placeholder.com/400x300"
                        alt="preset-desc-page-img"
                    />
                </div>

                <div className="preset-desc-page-info whats-included">
                    <h4>What's Included</h4>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </p>
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
