import React from "react";
import "./Hamburger_v2.css";
import { toggleHamburger } from "../../helpers";
import { useLocation } from "react-router-dom";

const Hamburger = () => {

    const location = useLocation();
    const pathname = location.pathname;

    return (
        <div className="hamburger" id="hamburger-6" onClick={() => {toggleHamburger(pathname)}}>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
        </div>
    );
}

export default Hamburger;