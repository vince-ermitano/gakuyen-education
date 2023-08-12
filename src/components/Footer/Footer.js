import React from "react";
import './Footer.css';
// import { FaCode } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="footer page-section">
            {/* <FaCode style={{ fontSize: 32 }}/> */}
            <div className="footer-logo">
                <img src="/theodyssey_s.png" alt="Gakuyen Education Logo" />
            </div>
            <p>Lorem ipsum dolor sit amet</p>
            <p>Consectetur adipiscing elit, sed do eiusmod tempor </p>
            <p>Incididunt ut labore et dolore magna aliqua</p>
            <div className="newsletter-form">
                <span>Join the newsletter:</span>
                <input type="text" placeholder="Email Address"></input>
            </div>
        </div>
    )
}

export default Footer;