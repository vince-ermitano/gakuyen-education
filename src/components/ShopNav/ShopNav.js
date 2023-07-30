import React from "react";
import './ShopNav.css';
import { NavLink } from "react-router-dom";

const ShopNav = () => {
    return (
        <div className="shop-nav">
            <ul>
                {/* <li>SHOP ALL</li> */}
                <li><NavLink to="/store">SHOP ALL</NavLink></li>
                <li>PRESETS</li>
                <li>MASTERCLASS</li>
            </ul>
        </div>
    );
}

export default ShopNav;