import React from "react";
import HeroBanner from "../HeroBanner/HeroBanner";
import ShopNav from "../ShopNav/ShopNav";
import BestSellers from "../BestSellers/BestSellers";

const Homepage = () => {
    return (
        <div className="homepage">
            <HeroBanner />
            <ShopNav />
            <BestSellers />
        </div>
    )
}

export default Homepage;