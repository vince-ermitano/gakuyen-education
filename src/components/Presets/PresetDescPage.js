import React from "react";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./PresetDescPage.css";
import { register } from "swiper/element/bundle";
import { handleAddToCart } from "../../helpers";
// import { addProductToCart } from "../../features/ShopSlice";

register();


/**
 * TODO:
 * - Create JS file to store all product description content
 *     - Use to populate this page
 * - Add switch statement to set current product to account for when users directly navigate to this page
 */

// TODO: Either gray out or remove add to cart button if item is already in cart or notify user that item is already in cart when users click add to cart button
const PresetDescPage = () => {
    const swiperElRef = useRef(null);

    // redux
    const dispatch = useDispatch();
    const currentProductId = useSelector((state) => state.shop.currentProduct); // PROBABLY DISCARD THIS
    const products = useSelector((state) => state.shop.products);
    const currentProduct = products[currentProductId];

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
                    <h1>{currentProduct.name}</h1>
                    <p>Lorem ipsum dolor sit amet</p>
                    <p>$10</p>
                    <button
                        className="darkgray-background"
                        data-item-id={currentProductId}
                        onClick={(e) => {
                            handleAddToCart(e, dispatch);
                        }}
                    >
                        Add to Cart
                    </button>
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
