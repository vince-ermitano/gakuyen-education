import React from "react";
import "./DashboardHome.css";
import { BiSlider, BiPalette, BiSupport } from "react-icons/bi";
import { BsArrowRightShort } from "react-icons/bs";
import { FaFilm } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";


const DashboardHome = () => {

    return (
        <div id="dashboard-home-container">
            {/* TODO: Replace Name with user's name */}
            <h1>
                <span>Welcome,</span> Kai
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
                    <button>Continue Learning</button>
                </div>
                <div className="dashboard-home-card" id="my-items-card">
                    <h2>My Items</h2>
                    <div className="go-to-items-btn">
                        <div className="icon_w_text">
                            <BiSlider />
                            <span>Presets</span>
                        </div>
                        <BsArrowRightShort />
                    </div>
                    <div className="go-to-items-btn">
                        <div className="icon_w_text">
                            <BiPalette />

                            <span>LUTs</span>
                        </div>
                        <BsArrowRightShort />
                    </div>
                    <div className="go-to-items-btn">
                        <div className="icon_w_text">
                            <FaFilm />
                            <span>Transitions</span>
                        </div>
                        <BsArrowRightShort />
                    </div>
                    <button>Visit Shop</button>
                </div>
                <div className="right-most-card">
                    <div
                        className="dashboard-home-card"
                        id="account-settings-card"
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
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
