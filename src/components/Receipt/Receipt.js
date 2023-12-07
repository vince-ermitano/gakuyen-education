import React, { useCallback, useEffect, useState } from "react";
import "./Receipt.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as Logo } from "../logo.svg";
import { BiArrowBack } from "react-icons/bi";
import { toast } from "sonner";
import { setTotalPrice } from "../../features/ShopSlice";
import { FIRST48 } from "../../helpers";


const Receipt = () => {
    document.title = "Thank You For Your Order! | The Odyssey";
    window.scrollTo(0, 0);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const searchParams = new URLSearchParams(location.search);
    const session_id = searchParams.get("session_id");
    const paypal_id = searchParams.get("paypal_id");
    const downloadToken = searchParams.get("download_token");
    const hasDownloads = searchParams.get("has_downloads");
    const [purchasedIsLoading, setPurchasedIsLoading] = useState(true);
    const [purchasedItems, setPurchasedItems] = useState({});
    const products = useSelector((state) => state.shop.products);
    const productsAreLoading = useSelector((state) => state.shop.isLoading);
    const isLoading = purchasedIsLoading || productsAreLoading;
    const [socialAccount, setSocialAccount] = useState("");
    const [questions, setQuestions] = useState("");

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify([]));
        toast.success("Payment successful! Check your email for your receipt.");
        dispatch(setTotalPrice(0));
    }, [dispatch]);
    console.log(Date.now() < FIRST48 && "MC-01" in purchasedItems)

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

                if (Date.now() < FIRST48 && "MC-01" in items) {
                    console.log("MC-01 in items");
                }
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

    const getPayPalPurchaseDetails = useCallback(async (sessionId) => {
        await fetch(
            `${process.env.REACT_APP_SERVER_URL}/paypal-purchased-items?session_id=${sessionId}`
        )
            .then((res) => {
                if (res.ok) return res.json();
                return res.text().then((text) => Promise.reject(text));
            })
            .then((items) => {
                console.log(items);

                let itemsObject = {};

                items.forEach((item) => {
                    itemsObject[item] = 1;
                });

                setPurchasedItems(itemsObject);
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
        if (!session_id && !paypal_id) {
            navigate("/");
            return;
        }

        if (session_id) {
            getPurchaseDetails(session_id);
        } else {
            getPayPalPurchaseDetails(paypal_id);
        }

    }, [session_id, navigate, getPurchaseDetails, getPayPalPurchaseDetails, paypal_id]);

    const handleOnSubmit = (e) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_SERVER_URL}/report-card`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                socialAccount: socialAccount,
                questions: questions,
            }),
        })
            .then((res) => {
                if (res.ok) return res.text();
                return res.text().then((text) => Promise.reject(text));
            })
            .then((text) => {
                toast.success("Report card submitted successfully!");
                setSocialAccount("");
                setQuestions("");
                document.querySelector(".report-card-form").style.display = 'none';
            })
            .catch((e) => {
                console.error(e);
                toast.error("Failed to submit report card. Reach out to us!");
            });
    }

    const form = (
        <form onSubmit={handleOnSubmit} className="report-card-form">
            <h2>The Odyssey Report Card</h2>
            <p>Thank you for ordering The Odyssey - a Creative Masterclass</p>
            <div>
                <label htmlFor="social-account">
                    Please submit your social account (LINK):{" "}
                </label>
                <br></br>
                <input type="text" maxLength={100} required name="social-account" id="social-account" value={socialAccount} onChange={(e) => setSocialAccount(e.target.value)} />
            </div>
            <div>
                <label htmlFor="questions">
                    Please submit THREE questions - related to your account that
                    you would like insight, guidance, or tips with. These can be
                    in regards to building your brand, scaling your audience or
                    even simply figuring out what niche you should focus on or
                    feedback on video/photo content.{" "}
                </label>
                <br></br>
                <textarea
                    name="questions"
                    id="questions"
                    cols="30"
                    rows="10"
                    value={questions}
                    onChange={(e) => setQuestions(e.target.value)}
                    maxLength={1000}
                    required
                ></textarea>
                <p>
                    We will return a Report Card as soon as possible with
                    detailed responses and actionable advice in response to your
                    questions. We’re excited to join your Odyssey.
                </p>
            </div>
            <button type="submit">Submit</button>
        </form>
    );

    if ((!session_id && !paypal_id) || isLoading) {
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
                    Order ID <span>{session_id}</span><span>{paypal_id}</span>
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

            {Date.now() < FIRST48 && "MC-01" in purchasedItems && form }
            <button onClick={() => navigate("/")}>
                <BiArrowBack />
                Back to Home
            </button>
        </section>
    );
};

export default Receipt;
