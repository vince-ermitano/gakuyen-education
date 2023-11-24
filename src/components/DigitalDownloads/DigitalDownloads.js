import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import "./DigitalDownloads.css";
import { BsDownload } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import { convertToSlug } from "../../helpers";
import { toast } from "sonner";

const DigitalDownloads = () => {
    document.title = "Digital Downloads | The Odyssey";
    window.scrollTo(0, 0);

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    const [tokenCheckPending, setTokenCheckPending] = useState(true);
    const [purchasedItems, setPurchasedItems] = useState([]);
    const [tokenIsValid, setTokenIsValid] = useState(false);
    const products = useSelector((state) => state.shop.products);
    const productsAreLoading = useSelector((state) => state.shop.isLoading);
    const isLoading = tokenCheckPending || productsAreLoading;

    const filterDownloadedItems = useCallback((items, products) => {
        const filteredItems = items.filter((item) => {
            return products[item].type !== "Masterclass";
        });

        return filteredItems;
    }, []);

    
    useEffect(() => {
        const checkIfTokenIsValid = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_SERVER_URL}/check-download-token?token=${token}`
                );
    
                if (response.ok) {
                    console.log('response is ok');
                    const items = await response.json();
                    setPurchasedItems(items);
                    setTokenIsValid(true);
                } else {
                    const text = await response.text();
                    toast.error(text);
                }
            } catch (e) {
                console.error(e);
            }
    
            setTokenCheckPending(false);
        };

        checkIfTokenIsValid();
    }, [token, filterDownloadedItems]);

    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        }

        console.log('tokenIsValid', tokenIsValid);
        console.log('tokenCheckPending', tokenCheckPending);

        if (!tokenCheckPending && !tokenIsValid) {
            setTimeout(() => {
                navigate("/");
            }, 3000);
        }
    }, [navigate, token, tokenCheckPending, tokenIsValid]);

    if (!token) {
        return (
            <section id="digital-downloads">
                <h1>Your Downloads</h1>
            </section>
        );
    }
    if (isLoading) {
        return (
            <section id="digital-downloads">
                <h1>Your Downloads</h1>
                <p>Loading...</p>
            </section>
        );
    }
    return (
        <section id="digital-downloads">
            <h1>Your Downloads</h1>
            { filterDownloadedItems(purchasedItems, products).map((item, index) => {

                const downloadName = convertToSlug(products[item].name) + ".zip";
                return (
                    <div className="download-container" key={index}>
                        <h2>{products[item].name}</h2>
                        <a href={products[item].link_to_download} download={downloadName}>
                            <BsDownload />
                        </a>
                    </div>
                );
            })}
            <p>
                Make sure you complete the downloads! These links will expire
                after 24 hours.
            </p>
        </section>
    );
};

export default DigitalDownloads;
