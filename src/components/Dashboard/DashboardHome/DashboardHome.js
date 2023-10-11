import React from "react";
import { useSelector } from "react-redux";
import "./DashboardHome.css";
import { BiSlider, BiPalette, BiSupport, BiBook } from "react-icons/bi";
import { BsArrowRightShort } from "react-icons/bs";
import { FaFilm } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";


const DashboardHome = () => {

    const navigate = useNavigate();
    const AES = CryptoJS.AES;

    const goToPresets = () => {
        navigate("/dashboard/presets");
    }

    const goToLuts = () => {
        navigate("/dashboard/luts");
    }

    const goToTransitions = () => {
        navigate("/dashboard/transitions");
    }

    const goToShop = () => {
        navigate("/store");
    }

    const handleContinueLearning = () => {
        navigate("/dashboard/modules");
    }

    const goToAccountSettings = () => {
        navigate("/dashboard/settings");
    }

    const isPurchasedItemsLoaded = useSelector((state) => state.user.isPurchasedItemsLoaded);
    const isProductsLoading = useSelector((state) => state.shop.isLoading);
    const products = useSelector((state) => state.shop.products);
    const userInfo = useSelector((state) => state.user.userInfo);
    const loaded = isPurchasedItemsLoaded && !isProductsLoading;


    let purchasedItems;


    if (loaded) {
        purchasedItems = JSON.parse(
            AES.decrypt(
                localStorage.getItem("purchasedItems"),
                process.env.REACT_APP_SECRET_KEY
            ).toString(CryptoJS.enc.Utf8)
        );
    } else {
        purchasedItems = {};
    }



    return (
        <div id="dashboard-home-container">
            {/* TODO: Replace Name with user's name */}
            <h1>
                <span>Welcome,</span> {userInfo.firstName}
            </h1>
            <div id="dashboard-home-cards-container">
                <div
                    className="dashboard-home-card"
                    id="continue-learning-card"
                >
                    <h2>The Odyssey</h2>
                    <div className="image-container">
                        <img
                            src="https://images.squarespace-cdn.com/content/v1/61a46cc601b4c521a42206d3/1645248046833-OM3EL5XT9ZNDQ3EW2RZE/Night3-A.jpeg?format=750w"
                            alt="The Odyssey Thumbnail"
                        />
                    </div>
                    <button onClick={handleContinueLearning}>Continue Learning</button>
                </div>
                <div className="dashboard-home-card" id="my-items-card">
                    <h2>My Items</h2>
                    <div className="go-to-items-btn" onClick={goToPresets}>
                        <div className="icon_w_text">
                            <BiSlider />
                            <span>Presets</span>
                        </div>
                        <BsArrowRightShort />
                    </div>
                    <div className="go-to-items-btn" onClick={goToLuts}>
                        <div className="icon_w_text">
                            <BiPalette />

                            <span>LUTs</span>
                        </div>
                        <BsArrowRightShort />
                    </div>
                    <div className="go-to-items-btn" onClick={goToTransitions}>
                        <div className="icon_w_text">
                            <FaFilm />
                            <span>Transitions</span>
                        </div>
                        <BsArrowRightShort />
                    </div>
                    <button onClick={goToShop}>Visit Shop</button>
                </div>
                <div className="right-most-card">
                    <div
                        className="dashboard-home-card"
                        id="account-settings-card"
                        onClick={goToAccountSettings}
                    >
                        <h2>Account Settings</h2>
                        <VscAccount />
                    </div>
                    <div
                        className="dashboard-home-card"
                        id="contact-us-card"
                    >
                        <BiSupport />
                    </div>
                    <div
                        className="dashboard-home-card"
                        id="order-history-card"
                    >
                        <h2>Order History</h2>

                        { !loaded && <p>Loading...</p>}
                        { loaded && Object.keys(purchasedItems).length === 0 && <p>You haven't purchased anything yet!</p>}
                        { loaded && Object.keys(purchasedItems).length > 0 && Object.keys(purchasedItems).map((key) => {
                            return (
                                <div className="order-history-item" key={key}>
                                    {products[key].type === "Masterclass" && <BiBook />}
                                    {products[key].type === "Preset" && <BiSlider />}
                                    {products[key].type === "Lut" && <BiPalette />}
                                    {products[key].type === "Transition" && <FaFilm />}
                                    <p className="product-name">{products[key].name}</p>
                                    <p className="purchase-date">{purchasedItems[key]}</p>
                                </div>
                            );
                        })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
