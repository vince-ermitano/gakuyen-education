import React from 'react';
import { BiLinkAlt } from 'react-icons/bi';
import './FileButton.css';

const FileButton = () => {
    return (
        <button className='file-link-button'>
            <BiLinkAlt />
            <span>*filename*</span>
        </button>
    )
}

export default FileButton;