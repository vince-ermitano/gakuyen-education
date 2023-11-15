import React from "react";
import "./CourseOverview.css";
import { Link } from "react-router-dom";

const ModuleCard = () => {
    return (
        <div className="card module-card">
            <div className="img-box">
                <img
                    src="https://images.squarespace-cdn.com/content/v1/61a46cc601b4c521a42206d3/1645247530516-W6T4CGAKV3VH484U8OHK/DSC01014-1.jpeg?format=1000w"
                    alt="Module"
                />
            </div>
            <div className="content">
                <h2>Module #</h2>
                <h3>Module Title</h3>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Architecto, hic? Magnam eum error saepe doloribus corrupti
                    repellat quisquam alias doloremque!
                </p>
                <Link to="/store/masterclass/the-odyssey-creative-masterclass?module=module_1" className="btn">
                    Learn More
                </Link>
            </div>
        </div>
    );
};

export default ModuleCard;
