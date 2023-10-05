import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./PresetLutView.css";
import PresetLutCard from "./PresetLutCard";
import { BsDownload } from "react-icons/bs";
import { filterProducts, filterProductsNotOwned } from "../../../helpers";
import CryptoJS from "crypto-js";

const PresetLutView = () => {

    const location = useLocation();
    const currentPath = location.pathname;
    const AES = CryptoJS.AES;


    const products = useSelector((state) => state.shop.products);
    const userOwnedItems = JSON.parse(AES.decrypt(useSelector((state) => state.user.purchasedItems), process.env.REACT_APP_SECRET_KEY).toString(CryptoJS.enc.Utf8));

    let ownedItemsForCurrentPage;
    let unownedItemsForCurrentPage;

    if (currentPath.includes("/dashboard/presets")) {
        const ownedPresets = filterProducts(userOwnedItems, "Preset", products);
        ownedItemsForCurrentPage = ownedPresets;

        const unownedPresets = filterProductsNotOwned(userOwnedItems, "Preset", products);
        unownedItemsForCurrentPage = unownedPresets;
    } else if (currentPath.includes("/dashboard/luts")) {
        const ownedLuts = filterProducts(userOwnedItems, "Lut", products);
        ownedItemsForCurrentPage = ownedLuts;

        const unownedLuts = filterProductsNotOwned(userOwnedItems, "Lut", products);
        unownedItemsForCurrentPage = unownedLuts;
    } else if (currentPath.includes("/dashboard/transitions")) {
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
    }

    console.log(ownedItemsForCurrentPage);
    console.log(unownedItemsForCurrentPage);



    useEffect(() => {
        // TODO: change document title to reflect current category
        document.title = "My Items | Gakuyen Education";
    }, [currentPath, products]);
    return (
        <div id="preset-lut-view">
            <section id="preset-lut-view-left">
                <section id="user-owned-presets-luts">
                    <h2>My Presets</h2>
                    <div
                        id="user-owned-presets-luts-container"
                        className="presets-luts-container"
                    >

                        { Object.keys(ownedItemsForCurrentPage).length === 0 ? <p>You don't own any presets yet!</p> : Object.keys(ownedItemsForCurrentPage).map((key) => {
                            return <PresetLutCard isOwned="true" />;
                        })}

                    </div>
                </section>
                <section id="user-unowned-presets-luts">
                    <h2>Not Yet Owned</h2>
                    <div
                        id="user-unowned-presets-luts-container"
                        className="presets-luts-container"
                    >
                        { Object.keys(unownedItemsForCurrentPage).length === 0 ? <p>Coming soon!</p> : Object.keys(unownedItemsForCurrentPage).map((key) => {
                            return <PresetLutCard isOwned="false" />;
                        })}
                    </div>
                </section>
            </section>
            <section id="preset-lut-view-right">
                <div className="preset-lut-image-container"></div>
                <h1>Preset Name</h1>
                <p>preset</p>
                <h2>Description</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div id="preset-info">
                    <h3>Info</h3>
                    <div id="preset-lut-size-info">
                        <span>Size</span>
                        <span>200 MB</span>
                    </div>
                    <div id="preset-lut-type-info">
                        <span>Type</span>
                        <span>Preset</span>
                    </div>
                </div>
                <button>
                    <pre>
                        Download <BsDownload />
                    </pre>
                </button>
            </section>
        </div>
    );
};

export default PresetLutView;
