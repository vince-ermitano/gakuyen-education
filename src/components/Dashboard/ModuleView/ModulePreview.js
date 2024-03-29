import React from "react";
import './ModulePreview.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentVideo } from "../../../features/CoursesSlice";
import { HiLockClosed, HiLockOpen } from "react-icons/hi2";

const ModulePreview = (props) => {

    const thumbnailStyle = {
        backgroundImage: `url('${props.thumbnail}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let classForPreview;

    if (!props.activated) {
        classForPreview = 'module-preview disabled';
    } else if (props.activated) {
        classForPreview = 'module-preview activated';
    } else {
        classForPreview = 'module-preview';
    }

    const convertTitleToJSX = (title) => {
        if (props.type !== "module") return (<span>{title}</span>);

        const titleArray = title.split(":");
        return (
            <>
                <span>{titleArray[0]}:</span>
                <br></br>
                <span>{titleArray[1]}</span>
            </>
        )
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
            dispatch(setCurrentVideo({
                moduleId: props.moduleId,
                videoId: props.videoId,
                url: props.url,
                title: props.title,
            }));
        }
    };
    return (
        <div className={classForPreview} onClick={(e) => handleClick(e)} data-key={props.id}>
            <div className="purchase-note">
                <HiLockClosed className="lock-closed" />
                <HiLockOpen className="lock-open" />
                <p className="purchase-text">Purchase course to unlock</p>
            </div>
            <div className="module-preview-img-container" style={thumbnailStyle}></div>
            <div className="module-preview-info">
                <h3>{convertTitleToJSX(props.title)}</h3>
                {/* <p>{props.description}</p> */}
            </div>
        </div>
    );
};

export default ModulePreview;