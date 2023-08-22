import React from "react";
import "./PresetLutView.css";
import PresetLutCard from "./PresetLutCard";
import { BsDownload } from "react-icons/bs";

const PresetLutView = () => {
    return (
        <div id="preset-lut-view">
            <section id="preset-lut-view-left">
                <section id="user-owned-presets-luts">
                    <h2>My Presets</h2>
                    <div id="user-owned-presets-luts-container" className="presets-luts-container">
                        <PresetLutCard />
                        <PresetLutCard />
                        <PresetLutCard />
                        <PresetLutCard />
                        <PresetLutCard />
                    </div>
                </section>
                <section id="user-unowned-presets-luts">
                    <h2>Not Yet Owned</h2>
                    <div id="user-unowned-presets-luts-container" className="presets-luts-container">
                        <PresetLutCard />
                        <PresetLutCard />
                        <PresetLutCard />
                        <PresetLutCard />
                        <PresetLutCard />
                    </div>
                </section>
            </section>
            <section id="preset-lut-view-right">
                <div className="preset-lut-image-container">
                </div>
                <h1>Preset Name</h1>
                <p>preset</p>
                <h2>Description</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
ut aliquip ex ea commodo consequat.</p>
                <h3>Info</h3>
                <div id="preset-lut-size-info">
                    <span>Size</span>
                    <span>200 MB</span>
                </div>
                <div id="preset-lut-type-info">
                    <span>Type</span>
                    <span>Preset</span>
                </div>
                <button><pre>Download <BsDownload /></pre>
                </button>
            </section>
        </div>
    );
};

export default PresetLutView;
