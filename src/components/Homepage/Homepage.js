import React from "react";
import HeroBanner from "../HeroBanner/HeroBanner";
import ShopNav from "../ShopNav/ShopNav";
import BestSellers from "../BestSellers/BestSellers";
import PresetsHP from "../PresetsHP/PresetsHP";

const Homepage = () => {
    return (
        <div className="homepage">
            <HeroBanner />
            <ShopNav />
            <BestSellers />
            <PresetsHP />
        </div>
    )
}

export default Homepage;