import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// import { setTheOdyssey } from "../../../features/CoursesSlice";
import ReactPlayer from "react-player/lazy";
import "./ModuleView.css";
import "./VideoView.css";
import ModulePreview from "./ModulePreview";
import FileButton from "./FileButton";
import { BiArrowBack } from "react-icons/bi";
import { videoDescriptions } from "../../../descriptions/descriptions";


const VideoView = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const playerRef = React.createRef();
    const { moduleId } = useParams();
    const theOdyssey = useSelector((state) => state.courses.theOdyssey);
    const currentVideo = useSelector((state) => state.courses.currentVideo);
    const [ isRehydrated, setIsRehydrated ] = useState(false);
    const [ playing, setPlaying ] = useState(true);
    const videoIndex = currentVideo === null ? 0 : currentVideo.videoId;
    const videoDescription = videoDescriptions[moduleId][videoIndex];
    let hasFiles = location.pathname.includes('videos') && currentVideo;
    hasFiles = hasFiles && isRehydrated && theOdyssey[moduleId].videos[currentVideo.videoId].files.length > 0

    useEffect(() => {
        // click on first video
        const firstVideo = document.querySelector(".module-preview");
        firstVideo.click();
    }, []);


    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Module View | GAKUYEN EDUCATION';

        if (Object.keys(theOdyssey).length > 0) {
            setIsRehydrated(true);
        }
    }, [theOdyssey]);


    const handleGoBack = () => {
        navigate(`/dashboard/modules`);
    }

    const goBackToVideos = () => {

        setPlaying(false);

        const videoView = document.querySelector(".module-content");
        videoView.classList.remove("active");
    }

    return (
        <div className="module-view">
            <div className="module-view-left-side">
                <div className="headers">
                    <h1>Videos</h1>
                    <button onClick={handleGoBack}>
                        <BiArrowBack />
                        Back to Modules
                    </button>
                    {/* <div className="module-filters">
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
                    </div> */}
                </div>
                <div className="modules-container">
                    {/* { Object.keys(theOdyssey).length !== 0 && Object.keys(theOdyssey).map((moduleId) => {
                        return (
                            <ModulePreview
                                key={moduleId}
                                id={moduleId}
                                title={theOdyssey[moduleId].title}
                                description={theOdyssey[moduleId].description}
                                type='video'
                            />
                        );
                    })} */}

                    {Object.keys(theOdyssey).length > 0 &&
                        Object.keys(theOdyssey[moduleId].videos).map(
                            (videoId) => {
                                return (
                                    <ModulePreview
                                        key={videoId}
                                        id={videoId}
                                        moduleId={moduleId}
                                        videoId={videoId}
                                        thumbnail={theOdyssey[moduleId].videos[videoId].image}
                                        title={
                                            theOdyssey[moduleId].videos[videoId]
                                                .title
                                        }
                                        description={
                                            theOdyssey[moduleId].videos[videoId]
                                                .description
                                        }
                                        type="video"
                                        url={
                                            theOdyssey[moduleId].videos[videoId]
                                                .url
                                        }
                                    />
                                );
                            }
                        )}
                    {!isRehydrated && <p>Loading...</p>}
                </div>
            </div>
            <div className="module-content">
                <button className="back-button mobile" onClick={goBackToVideos}>
                    <BiArrowBack />
                    Back to Videos
                </button>
                <div className="video-player-wrapper">
                    <ReactPlayer
                        ref={playerRef}
                        className="react-player"
                        url={currentVideo?.url}
                        width="100%"
                        height="100%"
                        controls
                        playing={playing}
                    />
                </div>
                <h1>{currentVideo?.title}</h1>
                {videoDescription?.map((paragraph, index) => {
                    if (Array.isArray(paragraph)) {
                        return paragraph.map((subParagraph, subIndex) => (
                            <div className="link-container" key={subIndex}>
                                <a href={subParagraph[1]} target="_blank" rel="noopener noreferrer">{subParagraph[0]}</a>
                                <br />
                            </div>
                        ));
                    } else {
                        return <p key={index}>{paragraph}</p>;
                    }
                })}
                {hasFiles && <h2>Attached Files</h2>}
                <div className="file-links">
                    { currentVideo && isRehydrated && theOdyssey[moduleId].videos[currentVideo.videoId].files.map((file, index) => {
                        return (
                            <FileButton
                                key={index}
                                file={file.fileUrl}
                                fileName={file.fileName}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default VideoView;
