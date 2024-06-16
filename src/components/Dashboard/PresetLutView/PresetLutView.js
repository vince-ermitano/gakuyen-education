import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./PresetLutView.css";
import PresetLutCard from "./PresetLutCard";
import { BsDownload } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { filterProducts, filterProductsNotOwned } from "../../../helpers";
import CryptoJS from "crypto-js";
// import { db } from "../../../config/firebaseConfig";
// import { collection, getDocs } from "firebase/firestore";
// import { useDispatch } from "react-redux";
// import { setLoading } from "../../../features/ShopSlice";
// import { toast } from "react-toastify";
import { toast } from "sonner";


const PresetLutView = () => {
    // const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;
    const AES = CryptoJS.AES;

    const [detailsSidebarIsOpen, setDetailsSidebarIsOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState({});
    const [currentItemIsOwned, setCurrentItemIsOwned] = useState(false);
    const isPurchasedItemsLoaded = useSelector((state) => state.user.isPurchasedItemsLoaded);
    const isProductsLoading = useSelector((state) => state.shop.isLoading);
    const authorized = useSelector((state) => state.user.authorized);
    const products = useSelector((state) => state.shop.products);
    let loadingOrComingSoonMessage;
    let title;

    const loadingOrComingSoonStyle = {
        height: '300px',
        display: 'flex',
        alignItems: 'center',
    }

    if (isProductsLoading) {
        loadingOrComingSoonMessage = "Loading...";
    } else {
        loadingOrComingSoonMessage = "Coming soon!";
    }

    const downloadFile = (downloadUrl) => {
        // Create a virtual anchor element
        const anchor = document.createElement("a");
        anchor.href = downloadUrl;

        // // Set the download attribute with the desired filename
        // anchor.download = props.fileName;

        // Append the anchor to the body
        document.body.appendChild(anchor);

        // Trigger a click on the anchor to start the download
        anchor.click();

        // Remove the anchor from the body
        document.body.removeChild(anchor);

    }

    const handleCheckItOut = (e) => {
        if (!authorized) return;

        if (!currentItemIsOwned) {
            navigate("/store");
        } else {
            const target = e.target.closest("button");
            const downloadUrl = target.dataset.downloadurl;

            downloadFile(downloadUrl);
        }
    };

    // const userOwnedItems = JSON.parse(AES.decrypt(useSelector((state) => state.user.purchasedItems), process.env.REACT_APP_SECRET_KEY).toString(CryptoJS.enc.Utf8));

    // TODO: if user tampers with localStorage, throw an error

    let userOwnedItems;

    try {
        if (isPurchasedItemsLoaded) {
            userOwnedItems = JSON.parse(
                AES.decrypt(
                    localStorage.getItem("purchasedItems"),
                    process.env.REACT_APP_SECRET_KEY
                ).toString(CryptoJS.enc.Utf8)
            );
        } else {
            userOwnedItems = {};
        }
    } catch(err) {
        console.log(err);
        toast.error("Error fetching your owned items. Attempting to refetch...");

        setTimeout(() => {
            window.location.href = "/dashboard";
        }, 3000);
    }

    let ownedItemsForCurrentPage;
    let unownedItemsForCurrentPage;

    if (currentPath.includes("/dashboard/presets")) {
        document.title = 'The Odyssey Dashboard | My Presets'
        title = 'My Presets'

        const ownedPresets = filterProducts(userOwnedItems, "Preset", products);
        ownedItemsForCurrentPage = ownedPresets;

        const unownedPresets = filterProductsNotOwned(
            userOwnedItems,
            "Preset",
            products
        );
        unownedItemsForCurrentPage = unownedPresets;
    } else if (currentPath.includes("/dashboard/luts")) {
        document.title = 'The Odyssey Dashboard | My LUTs'
        title = 'My LUTs'

        const ownedLuts = filterProducts(userOwnedItems, "Lut", products);
        ownedItemsForCurrentPage = ownedLuts;

        const unownedLuts = filterProductsNotOwned(
            userOwnedItems,
            "Lut",
            products
        );
        unownedItemsForCurrentPage = unownedLuts;
    } else if (currentPath.includes("/dashboard/transitions")) {
        document.title = 'The Odyssey Dashboard | My Transitions'
        title = 'My Transitions'

        const ownedTransitions = filterProducts(
            userOwnedItems,
            "Transition",
            products
        );
        ownedItemsForCurrentPage = ownedTransitions;

        const unownedTransitions = filterProductsNotOwned(
            userOwnedItems,
            "Transition",
            products
        );
        unownedItemsForCurrentPage = unownedTransitions;
    } else if (currentPath.includes("/dashboard/soundfx")) {
        document.title = 'The Odyssey Dashboard | My Sound FX'
        title = 'My Sound FX'

        const ownedSoundFX = filterProducts(userOwnedItems, "SoundFX", products);
        ownedItemsForCurrentPage = ownedSoundFX;

        const unownedSoundFX = filterProductsNotOwned(
            userOwnedItems,
            "SoundFX",
            products
        );
        unownedItemsForCurrentPage = unownedSoundFX;
    }

    return (
        <div id="preset-lut-view">
            <section id="preset-lut-view-left">
                <button className="mobile back-to-dashboard-home-btn" onClick={() => navigate("/dashboard/main")}><BiArrowBack />Back</button>
                <section id="user-owned-presets-luts">
                    <h2>{title}</h2>
                    <div
                        id="user-owned-presets-luts-container"
                        className="presets-luts-container"
                    >
                        {Object.keys(ownedItemsForCurrentPage).length === 0 ? (
                            <p style={loadingOrComingSoonStyle}>You don't own any yet!</p>
                        ) : (
                            Object.keys(ownedItemsForCurrentPage).map((key) => {
                                return (
                                    <PresetLutCard
                                        isOwned="true"
                                        key={key}
                                        item={products[key]}
                                        setDetails={setDetailsSidebarIsOpen}
                                        detailsIsOpen={detailsSidebarIsOpen}
                                        setCurrentItem={setCurrentItem}
                                        setCurrentItemIsOwned={
                                            setCurrentItemIsOwned
                                        }
                                        downloadFile={downloadFile}
                                        downloadUrl={products[key].link_to_download}
                                    />
                                );
                            })
                        )}
                    </div>
                </section>
                <section id="user-unowned-presets-luts">
                    <h2>Not Yet Owned</h2>
                    <div
                        id="user-unowned-presets-luts-container"
                        className="presets-luts-container"
                    >
                        {Object.keys(unownedItemsForCurrentPage).length ===
                        0 ? (
                            <p style={loadingOrComingSoonStyle}>{loadingOrComingSoonMessage}</p>
                        ) : (
                            Object.keys(unownedItemsForCurrentPage).map(
                                (key) => {
                                    return (
                                        <PresetLutCard
                                            isOwned="false"
                                            key={key}
                                            item={products[key]}
                                            setDetails={setDetailsSidebarIsOpen}
                                            detailsIsOpen={detailsSidebarIsOpen}
                                            setCurrentItem={setCurrentItem}
                                            setCurrentItemIsOwned={
                                                setCurrentItemIsOwned
                                            }
                                        />
                                    );
                                }
                            )
                        )}
                    </div>
                </section>
            </section>
            <section
                id="preset-lut-view-right"
                className={detailsSidebarIsOpen ? "open" : ""}
            >
                <button onClick={() => setDetailsSidebarIsOpen(false)}><BiArrowBack />Back</button>
                <div className="preset-lut-image-container"></div>
                <h1>{currentItem?.name}</h1>
                <p>{currentItem?.type}</p>
                <h2>Description</h2>
                <p>
                    {currentItem?.description?.description_1}
                </p>
                <div id="preset-info">
                    <h3>Info</h3>
                    <div id="preset-lut-size-info">
                        <span>Size</span>
                        <span>{currentItem?.size}</span>
                    </div>
                    <div id="preset-lut-type-info">
                        <span>Type</span>
                        <span>{currentItem?.type}</span>
                    </div>
                </div>
                <button onClick={(e) => handleCheckItOut(e)} data-downloadurl={currentItem?.link_to_download}>
                    {currentItemIsOwned ? (
                        <pre>
                            Download <BsDownload />
                        </pre>
                    ) : (
                        <pre>Check It Out</pre>
                    )}
                </button>
            </section>
        </div>
    );
};

export default PresetLutView;
