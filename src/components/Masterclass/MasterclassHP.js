import React from 'react';
import './MasterclassHP.css';
import { Link } from 'react-router-dom';

const MasterclassHP = () => {
    return (
      <div className="masterclass-hp page-section">
        <h2>Creative Masterclass</h2>
        <div className="img-container">
            {/* <img src="https://source.unsplash.com/random/?film,landscape" alt=""></img> */}
            <img src="https://images.squarespace-cdn.com/content/v1/61a46cc601b4c521a42206d3/1645248051840-X2CFVIPTMA3SADJBHWPW/Night4-A.jpeg?format=750w" alt=""></img>
        </div>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
         Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        {/* <button className="shop-presets-btn darkgray-background">Learn More</button> */}
        <Link to="/the-odyssey-creative-masterclass">Learn More</Link>
      </div>
    );
}

export default MasterclassHP;