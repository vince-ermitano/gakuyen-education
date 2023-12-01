import React from "react";
import "./CourseBanner.css";
import Dropdown from "../Dropdown/Dropdown";
import { toggleLoginSidebar } from "../../features/SidebarSlice";
import { useDispatch } from "react-redux";

const CourseBanner = () => {

    const dispatch = useDispatch();

    const claimModule = () => {
        dispatch(toggleLoginSidebar());
    }


    return (
        <section id="course-banner" className="page-section" data-aos="fade-up">
            <div id="course-banner-content" data-aos="fade-up">
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
                <button className="claim-btn" onClick={claimModule}>Claim</button>
            </div>
        </section>
    );
};

export default CourseBanner;
