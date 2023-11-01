import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { setTheOdyssey } from "../../../features/CoursesSlice";
import ReactPlayer from "react-player/lazy";
import "./ModuleView.css";
import "./VideoView.css";
import ModulePreview from "./ModulePreview";
import FileButton from "./FileButton";
import { BiArrowBack } from "react-icons/bi";


const VideoView = () => {

    const navigate = useNavigate();
    const playerRef = React.createRef();
    const { moduleId } = useParams();
    const theOdyssey = useSelector((state) => state.courses.theOdyssey);
    const [ isRehydrated, setIsRehydrated ] = useState(false);
    const [ playing, setPlaying ] = useState(true);

    if (Object.keys(theOdyssey).length > 0) {
        console.log(theOdyssey[moduleId]);
    }


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
                    <button onClick={handleGoBack}><BiArrowBack />Back to Modules</button>
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
                                        title={
                                            theOdyssey[moduleId].videos[videoId]
                                                .title
                                        }
                                        description={
                                            theOdyssey[moduleId].videos[videoId]
                                                .description
                                        }
                                        type="video"
                                    />
                                );
                            }
                        )}
                    {!isRehydrated && <p>Loading...</p>}
                </div>
            </div>
            <div className="module-content">
                <button className="back-button mobile" onClick={goBackToVideos}><BiArrowBack />Back to Videos</button>
                <div className="video-player-wrapper">
                    <ReactPlayer
                        ref={playerRef}
                        className="react-player"
                        url="https://www.youtube.com/watch?v=fyNns5amxRk"
                        width="100%"
                        height="100%"
                        controls
                        playing={playing}
                    />
                </div>
                <h1>Video Title</h1>
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
                <div className="file-links">
                    <FileButton />
                    <FileButton />
                    <FileButton />
                    <FileButton />
                    <FileButton />
                    <FileButton />
                    <FileButton />
                    <FileButton />
                    <FileButton />
                </div>
            </div>
        </div>
    );
};

export default VideoView;
