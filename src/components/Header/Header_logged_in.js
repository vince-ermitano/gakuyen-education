
import React from "react";
import './Header_logged_in.css';
import Hamburger from '../Hamburger/Hamburger';

const Header = () => {
    return (
        <div className="header">
            <div className="logo">
                <span>GAKUYEN EDUCATION</span>
            </div>
            <Hamburger />
            <div className="user-directory">
                <span>MY ACCOUNT</span>
                <span>CART</span>
            </div>
        </div>
    );
}

export default Header;