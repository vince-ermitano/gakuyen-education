import React from "react";
import ReactPlayer from "react-player";
import "./ModuleView.css";
import ModulePreview from "./ModulePreview";

const ModuleView = () => {
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
                    <ModulePreview />
                    <ModulePreview />
                    <ModulePreview />
                    <ModulePreview />
                    <ModulePreview />
                    <ModulePreview />
                    <ModulePreview />
                    <ModulePreview />
                    <ModulePreview />
                    <ModulePreview />
                </div>
            </div>
            <div className="module-content">
                <div className="video-player-wrapper">
                    <ReactPlayer
                        className="react-player"
                        url="https://www.youtube.com/watch?v=fyNns5amxRk"
                        width="100%"
                        height="100%"
                        controls
                        playing
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
                <p>text</p>
                <p>text</p>
                <p>text</p>
                <p>text</p>
                <p>text</p>
                <p>text</p>
                <p>text</p>
                <p>text</p>
                <p>text</p>
                <p>text</p>
            </div>
        </div>
    );
};

export default ModuleView;
