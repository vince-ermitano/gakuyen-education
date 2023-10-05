import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
// import HeroBanner from "../HeroBanner/HeroBanner";
// import ShopNav from "../ShopNav/ShopNav";
// import ShopNavV2 from "../ShopNav/ShopNavV2";
import BestSellers from "../BestSellers/BestSellers";
import PresetsHP from "../Presets/PresetsHP";
import Testimonials from "../Testimonials/Testimonials";
import MasterclassHP from "../Masterclass/MasterclassHP";
import "./Homepage.css";
import { toast } from "react-toastify";
import { auth } from "../../config/firebaseConfig";
import { setTotalPrice } from "../../features/ShopSlice";
import { setLoginSidebar } from "../../features/SidebarSlice";

const Homepage = () => {
    const dispatch = useDispatch();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const session_id = searchParams.get("session_id");
    const showLogin = searchParams.get("show_login");

    
    useEffect(() => {

        if (showLogin === "true") {
            dispatch(setLoginSidebar(true));
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && session_id) {
                console.log(user);
                console.log(auth.currentUser.email);
                verifyPurchase();
            } else if (session_id) {
                verifyPurchase();
                return;
            } else {
                return;
            }
        });

        const verifyPurchase = async () => {
            await fetch(
                `${process.env.REACT_APP_SERVER_URL}/success?session_id=${session_id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: auth.currentUser?.email,
                    }),
                }
            )
                .then((res) => {
                    if (res.ok) {
                        localStorage.setItem("cart", JSON.stringify([]));
                        toast.success(
                            "Payment successful! Check your email for your receipt.",
                            {
                                position: "top-center",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                progress: undefined,
                            }
                        );
                        dispatch(setTotalPrice(0));
                    } else return res.text();
                })
                .then((errorMessage) => {
                    return Promise.reject(errorMessage);
                })
                .catch((e) => {
                    if (!e) return;
                    console.error(e);
                    toast.error(e, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        progress: undefined,
                    });
                });
        };

        document.title = "Home | GAKUYEN EDUCATION";

        return () => {
            unsubscribe();
        };
    }, [session_id, dispatch, showLogin]);

    return (
        <div className="homepage">
            {/* <HeroBanner /> */}
            {/* <ShopNav /> */}
            {/* <ShopNavV2 /> */}
            <BestSellers />
            <PresetsHP />
            <MasterclassHP />
            <Testimonials />
        </div>
    );
};

export default Homepage;
