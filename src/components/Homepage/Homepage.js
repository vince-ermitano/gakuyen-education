import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
// import HeroBanner from "../HeroBanner/HeroBanner";
// import ShopNav from "../ShopNav/ShopNav";
import ShopNavV2 from "../ShopNav/ShopNavV2";
import BestSellers from "../BestSellers/BestSellers";
import PresetsHP from "../Presets/PresetsHP";
import Testimonials from "../Testimonials/Testimonials";
import MasterclassHP from "../Masterclass/MasterclassHP";
import './Homepage.css'
import { toast } from "react-toastify";


const Homepage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const session_id = searchParams.get("session_id");
    
    useEffect(() => {
        const verifyPurchase = async () => {
            await fetch(
                `${process.env.REACT_APP_SERVER_URL}/success?session_id=${session_id}`
            )
                .then((res) => {
                    if (res.ok)
                        return toast.success(
                            "Payment successful! Check your email for your receipt."
                        );
                    return res.json().then((json) => Promise.reject(json));
                })
                .catch((e) => {
                    console.error(e.error);
                    toast.error("Payment failed. Please try again.");
                });
        };

        document.title = "Home | GAKUYEN EDUCATION";


        if (session_id) {
            verifyPurchase();
        }
    }, [session_id]);


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