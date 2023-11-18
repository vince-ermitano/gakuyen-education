import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { setTheOdyssey } from "../../../features/CoursesSlice";
import ReactPlayer from "react-player";
import "./ModuleView.css";
import ModulePreview from "./ModulePreview";

const ModuleView = () => {

    // const dispatch = useDispatch();
    document.title = 'The Odyssey Dashboard | Modules'

    const theOdyssey = useSelector((state) => state.courses.theOdyssey);
    const [ isRehydrated, setIsRehydrated ] = useState(false);


    useEffect(() => {
        window.scrollTo(0, 0);

        if (Object.keys(theOdyssey).length > 0) {
            setIsRehydrated(true);
        }
    }, [theOdyssey]);
        

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
                    { !isRehydrated && <p>Loading...</p> }
                    { Object.keys(theOdyssey).length !== 0 && Object.keys(theOdyssey).map((moduleId) => {
                        return (
                            <ModulePreview
                                key={moduleId}
                                id={moduleId}
                                title={theOdyssey[moduleId].title}
                                description={theOdyssey[moduleId].description}
                                type='module'
                            />
                        );
                    })}
                    {/* <ModulePreview />
                    <ModulePreview />
                    <ModulePreview />
                    <ModulePreview />
                    <ModulePreview />
                    <ModulePreview />
                    <ModulePreview />
                    <ModulePreview />
                    <ModulePreview />
                    <ModulePreview /> */}
                </div>
            </div>
            <div className="module-content desktop">
                <div className="video-player-wrapper">
                    <ReactPlayer
                        className="react-player"
                        url="https://www.youtube.com/watch?v=fyNns5amxRk"
                        width="100%"
                        height="100%"
                        controls
                        playing={false}
                    />
                </div>
                <h1>Module Title</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </p>
                <h2>Attached Files</h2>
            </div>
        </div>
    );
};

export default ModuleView;
