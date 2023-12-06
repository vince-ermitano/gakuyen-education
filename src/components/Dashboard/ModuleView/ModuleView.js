import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { setTheOdyssey } from "../../../features/CoursesSlice";
import ReactPlayer from "react-player";
import "./ModuleView.css";
import ModulePreview from "./ModulePreview";
import { toast } from "sonner";
import CryptoJS from "crypto-js";

const ModuleView = () => {
    // const dispatch = useDispatch();
    document.title = "The Odyssey Dashboard | Modules";

    const theOdyssey = useSelector((state) => state.courses.theOdyssey);
    const isPurchasedItemsLoaded = useSelector(
        (state) => state.user.isPurchasedItemsLoaded
    );
    const [isRehydrated, setIsRehydrated] = useState(false);
    const AES = CryptoJS.AES;

    useEffect(() => {
        window.scrollTo(0, 0);

        if (Object.keys(theOdyssey).length > 0) {
            setIsRehydrated(true);
        }
    }, [theOdyssey]);

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
    } catch (err) {
        console.log(err);
        toast.error(
            "Error fetching your owned items. Attempting to refetch..."
        );

        setTimeout(() => {
            window.location.href = "/dashboard";
        }, 3000);
    }

    // if (Object.keys(theOdyssey).length === 0) {
    //     // fetch theOdyssey from server
    //     fetch(`${process.env.REACT_APP_SERVER_URL}/the-odyssey`)
    //     .then((res) => {
    //         if (res.ok) {
    //             return res.json();
    //         }
    //         return res.text().then((text) => {
    //             throw new Error(text);
    //         });
    //     })
    //     .then((data) => {
    //         console.log(data);
    //         dispatch(setTheOdyssey(data));
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    // }

    return (
        <div className="module-view">
            <div className="module-view-left-side">
                <div className="headers">
                    <h1>Modules</h1>
                    <div className="module-filters">
                        <ul>
                            <li>
                                <button>All</button>
                            </li>
                            <li>
                                <button>Active</button>
                            </li>
                            <li>
                                <button>Completed</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="modules-container">
                    {(!isRehydrated || !isPurchasedItemsLoaded) && (
                        <p>Loading...</p>
                    )}
                    {Object.keys(theOdyssey).length !== 0 &&
                        Object.keys(theOdyssey).map((moduleId) => {
                            if (
                                "MC-01" in userOwnedItems ||
                                moduleId === "M-05"
                            ) {
                                return (
                                    <ModulePreview
                                        key={moduleId}
                                        id={moduleId}
                                        title={theOdyssey[moduleId].title}
                                        description={
                                            theOdyssey[moduleId].description
                                        }
                                        thumbnail={theOdyssey[moduleId].image}
                                        type="module"
                                        activated={true}
                                    />
                                );
                            } else {
                                return (
                                    <ModulePreview
                                        key={moduleId}
                                        id={moduleId}
                                        title={theOdyssey[moduleId].title}
                                        description={
                                            theOdyssey[moduleId].description
                                        }
                                        thumbnail={theOdyssey[moduleId].image}
                                        type="module"
                                        activated={false}
                                    />
                                );
                            }
                        })}
                </div>
            </div>
            <div className="module-content desktop">
                <div className="video-player-wrapper">
                    <ReactPlayer
                        className="react-player"
                        url="https://vimeo.com/891428690?share=copy"
                        width="100%"
                        height="100%"
                        controls
                        playing={false}
                    />
                </div>
                <h1>Welcome to The Odyssey</h1>
                <p>
                    We’re excited to have you here! Each module on the left side
                    of your screen is broken into sub-sections for easy
                    navigation. When I mention a specific file or link - it will
                    be located beneath the description of each applicable video.
                    We designed the course to be viewed in sequential order -
                    but there are no rules! Feel free to skip around and find
                    the information that might be most applicable to your
                    situation.
                </p>
            </div>
        </div>
    );
};

export default ModuleView;
