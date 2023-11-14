import React from "react";
import "./Checkbox.css";

const Checkbox = () => {
    return (
        <label className="container">
            <input type="checkbox" />
            <div className="checkmark"></div>
        </label>
    );
};

export default Checkbox;
