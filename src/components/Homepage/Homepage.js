import React from "react";
import HeroBanner from "../HeroBanner/HeroBanner";
import ShopNav from "../ShopNav/ShopNav";
import BestSellers from "../BestSellers/BestSellers";
import PresetsHP from "../PresetsHP/PresetsHP";
import Testimonials from "../Testimonials/Testimonials";
import MasterclassHP from "../MasterclassHP/MasterclassHP";
import './Homepage.css'

const Homepage = () => {
    return (
        <div className="homepage">
            <HeroBanner />
            <ShopNav />
            <BestSellers />
            <PresetsHP />
            <MasterclassHP />
            <Testimonials />
        </div>
    )
}

export default Homepage;