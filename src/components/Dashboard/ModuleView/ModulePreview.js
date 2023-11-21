import React from "react";
import './ModulePreview.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentVideo } from "../../../features/CoursesSlice";
import { HiLockClosed, HiLockOpen } from "react-icons/hi2";

const ModulePreview = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let classForPreview;

    if (props.type === 'module' && !props.activated) {
        classForPreview = 'module-preview disabled';
    } else if (props.type === 'module' && props.activated) {
        classForPreview = 'module-preview activated';
    } else {
        classForPreview = 'module-preview';
    }

    const handleClick = (e) => {
        if (props.activated === false) {
            navigate('/?scroll_to=course-banner');
            return;
        }

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
        <div className={classForPreview} onClick={(e) => handleClick(e)}>
            <div className="purchase-note">
                <HiLockClosed className="lock-closed" />
                <HiLockOpen className="lock-open" />
                <p className="purchase-text">Purchase course to unlock</p>
            </div>
            <div className="module-preview-img-container"></div>
            <div className="module-preview-info">
                <h3>{props.title}</h3>
                <p>{props.description}</p>
            </div>
        </div>
    );
};

export default ModulePreview;