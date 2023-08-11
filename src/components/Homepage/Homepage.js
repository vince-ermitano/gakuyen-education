import React, { useEffect } from "react";
// import HeroBanner from "../HeroBanner/HeroBanner";
// import ShopNav from "../ShopNav/ShopNav";
import ShopNavV2 from "../ShopNav/ShopNavV2";
import BestSellers from "../BestSellers/BestSellers";
import PresetsHP from "../Presets/PresetsHP";
import Testimonials from "../Testimonials/Testimonials";
import MasterclassHP from "../Masterclass/MasterclassHP";
import './Homepage.css'

const Homepage = () => {

    useEffect(() => {
        document.title = 'Home | GAKUYEN EDUCATION';
      }, []);


    return (
        <div className="homepage">
            {/* <HeroBanner /> */}
            {/* <ShopNav /> */}
            <ShopNavV2 />
            <BestSellers />
            <PresetsHP />
            <MasterclassHP />
            <Testimonials />
        </div>
    )
}

export default Homepage;