import React from "react";
import "./Hamburger_v2.css";
import { toggleHamburger } from "../../helpers";

const Hamburger = () => {

    return (
        <div className="hamburger" id="hamburger-6" onClick={toggleHamburger}>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
        </div>
    );
}

export default Hamburger;