import React from "react";
import './ModulePreview.css';
import { useNavigate } from "react-router-dom";

const ModulePreview = (props) => {

    const navigate = useNavigate();

    const handleClick = () => {
        if (props.type === "module") {
            navigate(`/dashboard/modules/${props.id}/videos`);
        } else {
            console.log("clicked on video");
            const videoView = document.querySelector(".module-content");
            videoView.classList.add("active");
        }
    };
    return (
        <div className='module-preview' onClick={handleClick}>
            <div className='module-preview-img-container'>

            </div>
            <div className='module-preview-info'>
                <h3>{props.title}</h3>
                <p>{props.description}</p>
            </div>
        </div>
    )
};

export default ModulePreview;