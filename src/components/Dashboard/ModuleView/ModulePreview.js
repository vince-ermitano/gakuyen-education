import React from "react";
import './ModulePreview.css';

const ModulePreview = (props) => {
    return (
        <div className='module-preview'>
            <div className='module-preview-img-container'>

            </div>
            <div className='module-preview-info'>
                <h3>{props.title}</h3>
                <p>{props.description}</p>
            </div>
        </div>
    )
};

export default ModulePreview;