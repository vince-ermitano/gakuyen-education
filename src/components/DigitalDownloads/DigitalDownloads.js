import React from "react";
import "./DigitalDownloads.css";
import { BsDownload } from "react-icons/bs";

const DigitalDownloads = () => {
    return (
        <section id="digital-downloads">
            <h1>Your Downloads</h1>
            <div className="download-container">
                <h2>Product name</h2>
                <a href="/">
                    <BsDownload />
                </a>
            </div>
            <div className="download-container">
                <h2>Product name</h2>
                <a href="/">
                    <BsDownload />
                </a>
            </div>
            <div className="download-container">
                <h2>Product name</h2>
                <a href="/">
                    <BsDownload />
                </a>
            </div>
            <p>
                Make sure you complete the downloads! These links will expire
                after 24 hours.
            </p>
        </section>
    );
};

export default DigitalDownloads;
