import React from "react";
import './ShopNav.css';
// import { NavLink } from "react-router-dom";

const ShopNav = () => {
    return (
        <nav className="shop-nav">
            <ul>
                {/* <li>SHOP ALL</li> */}
                {/* <li><NavLink to="/store">SHOP ALL</NavLink></li> */}
                <li>SHOP ALL</li>
                <li>BUSINESS</li>
                <li>WORKFLOW</li>
                <li>EDITING</li>
                <li>CONNECTION</li>
            </ul>
        </nav>
    );
}

export default ShopNav;