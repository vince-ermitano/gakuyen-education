import React from 'react';
import { BiLinkAlt } from 'react-icons/bi';
import './FileButton.css';

const FileButton = (props) => {

    const downloadFile = () => {
        // Create a virtual anchor element
        const anchor = document.createElement("a");
        anchor.href = props.file;

        // Set the download attribute with the desired filename
        anchor.download = props.fileName;

        anchor.target = "_blank";

        // Append the anchor to the body
        document.body.appendChild(anchor);

        // Trigger a click on the anchor to start the download
        anchor.click();

        // Remove the anchor from the body
        document.body.removeChild(anchor);

    }
    return (
        <button className='file-link-button' onClick={downloadFile}>
            <BiLinkAlt />
            <span>{props.fileName}</span>
        </button>
    )
}

export default FileButton;