import React from "react";
import './ModulePreview.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentVideo } from "../../../features/CoursesSlice";

const ModulePreview = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = (e) => {
        if (props.type === "module") {
            navigate(`/dashboard/modules/${props.id}/videos`);
        } else {
            console.log("clicked on video");
            console.log(e.target);
            const videoView = document.querySelector(".module-content");
            const activeModulePreview = document.querySelector(".module-preview.active");
            const newActiveModulePreview = e.target.closest(".module-preview");
            
            if (activeModulePreview) {
                activeModulePreview.classList.remove("active");
            }
            
            
            newActiveModulePreview.classList.add("active");
            videoView.classList.add("active");
            dispatch(setCurrentVideo(props.url));
        }
    };
    return (
        <div className='module-preview' onClick={(e) => handleClick(e)}>
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