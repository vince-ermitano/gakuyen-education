import React from "react";
import "./CourseBanner.css";
import Dropdown from "../Dropdown/Dropdown";

const CourseBanner = () => {


    return (
        <section id="course-banner" className="page-section">
            <div id="course-banner-content">
                <h2>The Odyssey</h2>
                <h3>Creative Masterclass</h3>
                <hr></hr>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                </p>
                <div id="select-financing-group">
                    <Dropdown type={'finance'} idForInput={'financing-option'} idForDropdown={'financing-dropdown'} />
                    <button>Add to Cart</button>
                </div>
                <h3>Claim Your Free Module NOW!</h3>
                <button className="claim-btn">Claim</button>
            </div>
        </section>
    );
};

export default CourseBanner;
