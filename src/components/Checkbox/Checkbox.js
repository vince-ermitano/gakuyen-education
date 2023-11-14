import React from "react";
import "./Checkbox.css";

const Checkbox = (props) => {

    return (
        <label className="container">
            <input type="checkbox" onChange={() => {
                props.onClickHandler();
            }} />
            <div className="checkmark"></div>
        </label>
    );
};

export default Checkbox;
