import React from "react";
import './ShopNav_v2.css';
import { NavLink } from "react-router-dom";

const ShopNavV2 = () => {
    return (
        <div className="shop-nav-v2">
            <div className="img-container">
                <ul>
                    {/* <li>SHOP ALL</li> */}
                    <li><NavLink to="/store">SHOP ALL</NavLink></li>
                    <li><NavLink to="/">BUSINESS</NavLink></li>
                    <li><NavLink to="/">WORKFLOW</NavLink></li>
                    <li><NavLink to="/">EDITING</NavLink></li>
                    <li><NavLink to="/">CONNECTION</NavLink></li>
                </ul>
            </div>
        </div>
    );
}

export default ShopNavV2;