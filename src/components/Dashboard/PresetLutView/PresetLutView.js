import React from "react";
import "./PresetLutView.css";
import PresetLutCard from "./PresetLutCard";

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
        </div>
    );
};

export default PresetLutView;
