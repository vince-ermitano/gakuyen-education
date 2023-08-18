import React from "react";
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
            <p>Right Side</p>
        </div>
    );
};

export default ModuleView;
