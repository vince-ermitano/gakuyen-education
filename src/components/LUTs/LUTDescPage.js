import React from "react";
import { useRef, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../Presets/PresetDescPage.css";
import "./LUTDescPage.css";
import { register } from "swiper/element/bundle";
import {
    handleAddToCart,
    convertFromSlug,
    getProductIdFromProductName,
} from "../../helpers";
import { BiArrowBack } from "react-icons/bi";
import DOMPurify from 'dompurify';

register();

const LUTDescPage = () => {
    const swiperElRef = useRef(null);
    const [isRehydrated, setIsRehydrated] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const products = useSelector((state) => state.shop.products);

    // redux
    const dispatch = useDispatch();
    // const currentProductId = useSelector((state) => state.shop.currentProduct); // PROBABLY DISCARD THIS

    let { name } = useParams();

    name = convertFromSlug(name);

    let currentProductId;
    let currentProduct;
    let numCarouselImgs;

    if (!isRehydrated) {
        currentProduct = {};
        currentProductId = "";
        document.title = "The Odyssey | Loading...";
    } else {
        currentProductId = getProductIdFromProductName(name, products);
        currentProduct = products[currentProductId];
        numCarouselImgs = currentProduct.num_carousel_images;

        console.log(numCarouselImgs);
        document.title = "The Odyssey | " + currentProduct.name;
    }

    useEffect(() => {
        window.scrollTo(0, 0);

        if (Object.keys(products).length > 0) {
            setIsRehydrated(true);
        }
    }, [products]);

    useEffect(() => {
        // Function to check if the viewport is mobile
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768); // Adjust the threshold as needed
        };

        // Initial check when the component mounts
        checkIfMobile();

        // Event listener for window resize
        const handleResize = () => {
            checkIfMobile();
        };

        // Attach the event listener
        window.addEventListener("resize", handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    
    if (!isRehydrated) {
        return <div className="preset-desc-page page-section"></div>;
    }


    return (
        <div className="preset-desc-page page-section lut-desc-page">
            <Link to="/store">
                <button className="back-to-btn">
                    &lt; Back to Presets Shop
                </button>
            </Link>
            <div className="preset-desc-page-content">
                {isMobile && (
                    <Link to="/store">
                        <button className="mobile-back-to-btn">
                            <BiArrowBack />
                        </button>
                    </Link>
                )}

                <div className="preset-desc-page-img img-container">
                    <img
                        src={products[currentProductId].images[0]}
                        alt="preset-desc-page-img"
                    />
                </div>
                <div className="preset-desc-page-info preset-name-price item-name-price">
                    <h1>{currentProduct.name}</h1>
                    <p>${currentProduct.price.toFixed(2)}</p>
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
                {currentProduct.description_alt.map((item, index) => (
                    <div 
                    key={index}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item) }}
                    />
                ))}
                </div>

                <swiper-container
                    ref={swiperElRef}
                    slides-per-view="1"
                    navigation="true"
                    loop="true"
                    autoplay="true"
                >
                    {numCarouselImgs > 1 && Array.from(Array(numCarouselImgs).keys()).map((i) => (
                        <swiper-slide key={i}>
                            <div className="carousel-img-container">
                                <img
                                    src={currentProduct.images[i + 1]}
                                    alt="slider content"
                                />
                            </div>
                        </swiper-slide>
                    ))}
                </swiper-container>

                <div className="preset-desc-page-img img-container grid-last-item" style={{display: 'none'}}>
                    <img
                        src={
                            currentProduct.images[
                                currentProduct.images.length - 1
                            ]
                        }
                        alt="preset-desc-page-img"
                    />
                </div>

                <div className="preset-desc-page-info whats-included" style={{display: 'none'}}>
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

export default LUTDescPage;
