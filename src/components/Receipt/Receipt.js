import React, { useCallback, useEffect, useState } from "react";
import "./Receipt.css";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as Logo } from "../logo.svg";
import { BiArrowBack } from "react-icons/bi";
import { toast } from "sonner";

const Receipt = () => {
    document.title = "Thank You For Your Order! | The Odyssey";
    window.scrollTo(0, 0);

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const session_id = searchParams.get("session_id");
    const downloadToken = searchParams.get("download_token");
    const hasDownloads = searchParams.get("has_downloads");
    const [purchasedIsLoading, setPurchasedIsLoading] = useState(true);
    const [purchasedItems, setPurchasedItems] = useState({});
    const products = useSelector((state) => state.shop.products);
    const productsAreLoading = useSelector((state) => state.shop.isLoading);
    const isLoading = purchasedIsLoading || productsAreLoading;


    const getPurchaseDetails = useCallback(async (sessionId) => {
        await fetch(
            `${process.env.REACT_APP_SERVER_URL}/purchased-items?session_id=${sessionId}`
        )
            .then((res) => {
                if (res.ok) return res.json();
                return res.text().then((text) => Promise.reject(text));
            })
            .then((items) => {
                console.log(items);
                setPurchasedItems(items);
            })
            .catch((e) => {
                console.error(e);
                toast.error(e + " Redirecting to home page...");

                setTimeout(() => {
                    navigate("/");
                }, 3000);
            });

        setPurchasedIsLoading(false);
    }, [navigate]);

    const calculateTotalPrice = () => {
        let total = 0;
        Object.keys(purchasedItems).forEach((item) => {
            total += products[item].price;
        });
        return total;
    };

    useEffect(() => {
        if (!session_id) {
            navigate("/");
            return;
        }

        getPurchaseDetails(session_id);
    }, [session_id, navigate, getPurchaseDetails]);

    if (!session_id || isLoading) {
        return (
            <section id="receipt-section">
                <p>Loading...</p>
            </section>
        );
    }
    return (
        <section id="receipt-section">
            <div className="receipt-header">
                <Logo />
                <h1>Thank you for your order!</h1>
                <p>
                    Order ID <span>{session_id}</span>
                </p>
            </div>
            <div className="order-details">
                <h2>Order Details</h2>
                <hr></hr>
                {Object.keys(purchasedItems).map((item, index) => {
                    return (
                        <div className="order-details-item" key={index}>
                            <p>{item}</p>
                            <p>${products[item].price}</p>
                        </div>
                    );
                })}
                <hr></hr>
                <div className="order-details-item total">
                    <p>Total</p>
                    <p>${calculateTotalPrice()}</p>
                </div>
            </div>
            {hasDownloads === "true" && (
                <button
                    onClick={() =>
                        navigate(`/digital-downloads?token=${downloadToken}`)
                    }
                >
                    Go To Downloads
                </button>
            )}
            <button onClick={() => navigate("/")}>
                <BiArrowBack />
                Back to Home
            </button>
        </section>
    );
};

export default Receipt;
