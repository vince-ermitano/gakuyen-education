import React from "react";
import './ShopNav.css';

// import { NavLink } from "react-router-dom";

const ShopNav = ({setSearchParams}) => {

    return (
        <nav className="shop-nav">
            <ul>
                {/* <li>SHOP ALL</li> */}
                {/* <li><NavLink to="/store">SHOP ALL</NavLink></li> */}
                <li onClick={() => setSearchParams( { filter: 'all' })}>SHOP ALL</li>
                <li onClick={() => setSearchParams( { filter: 'masterclass' })}>MASTERCLASS</li>
                <li onClick={() => setSearchParams( { filter: 'lut' })}>LUTS</li>
                <li onClick={() => setSearchParams( { filter: 'preset' })}>PRESETS</li>
                <li onClick={() => setSearchParams( { filter: 'transition' })}>TRANSITIONS</li>
                <li onClick={() => setSearchParams( { filter: 'soundfx' })}>SOUND FX</li>
                {/* <li>BUSINESS</li>
                <li>WORKFLOW</li>
                <li>EDITING</li>
                <li>CONNECTION</li> */}
            </ul>
        </nav>
    );
}

export default ShopNav;