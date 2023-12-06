import React, { useState, useEffect, useRef } from "react";
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
import { AES } from "crypto-js";
import CryptoJS from "crypto-js";
import _debounce from "lodash.debounce";


const VideoView = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const playerRef = useRef(null);
    const { moduleId } = useParams();
    const theOdyssey = useSelector((state) => state.courses.theOdyssey);
    let userOwnedItems;
    const isPurchasedItemsLoaded = useSelector((state) => state.user.isPurchasedItemsLoaded);
    const currentVideo = useSelector((state) => state.courses.currentVideo);
    const videoId = currentVideo?.videoId;
    const [ isRehydrated, setIsRehydrated ] = useState(false);
    // const [ playing, setPlaying ] = useState(true);
    // let videoIndex = currentVideo === null ? 0 : currentVideo.videoId;

    // const videoDescription = videoDescriptions[moduleId][videoIndex];
    let hasFiles = location.pathname.includes('videos') && currentVideo;
    hasFiles = hasFiles && isRehydrated && theOdyssey[moduleId].videos[currentVideo.videoId].files.length > 0;
    userOwnedItems = isPurchasedItemsLoaded ? userOwnedItems = JSON.parse(
        AES.decrypt(
            localStorage.getItem("purchasedItems"),
            process.env.REACT_APP_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8)
    ) : {};

    const [url, setUrl] = useState(currentVideo?.url);
    const delayedSetUrl = _debounce(setUrl, 1000);
    const [playing, setPlaying] = useState(true);

    // useEffect(() => {
    //     // click on first video
    //     const firstVideo = document.querySelector(".module-preview.activated");
    //     setVideoDescription(videoDescriptions[moduleId][firstVideo.dataset.videoId]);
    //     firstVideo.click();
    // }, []);

    // useEffect(() => {
    //     if (!currentVideo) return;
    //     playerRef.current = new Vimeo("vimeo-player", {
    //         url: currentVideo?.url,
    //     })
    // }, [currentVideo]);

    useEffect(() => {
        if (!currentVideo) return;
        delayedSetUrl(currentVideo.url);

    }, [currentVideo, delayedSetUrl]);


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
                                const isActivated = ('MC-01' in userOwnedItems) || (moduleId === "M-03" && [0, 3].includes(parseInt(videoId)));
                                console.log('ModuleId: ', moduleId, 'VideoId: ', videoId, 'isActivated: ', isActivated);
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
                                        activated={isActivated}
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

                    { currentVideo && (
                    <ReactPlayer
                        ref={playerRef}
                        className="react-player"
                        url={url}
                        width="100%"
                        height="100%"
                        controls
                        playing={playing}
                    />
                    )}
                    <div id="vimeo-player"></div>
                </div>
                <h1>{currentVideo?.title}</h1>
                {videoDescriptions[moduleId][videoId]?.map((paragraph, index) => {
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
