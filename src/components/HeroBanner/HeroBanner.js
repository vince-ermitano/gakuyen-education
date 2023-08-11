import React from "react";
import './HeroBanner.css';
import ShopNav from "../ShopNav/ShopNav";

const HeroBanner = () => {

    // return (
    //     <div className="hero-banner" style={{ textAlign: 'center' }}>
    //         <h1>Lorem ipsum dolor sit amet <br></br>consectetur adipiscing elit</h1>
    //         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
    //         <p>by GAKU</p>
    //     </div>
    // )
    return (
        <div className="hero-banner" style={{ textAlign: "center" }}>
            <div className="img-container">
                <img src="/LandingPage2.jpg" alt="landing page" />
                <ShopNav />
            </div>
        </div>
    );
}

export default HeroBanner;