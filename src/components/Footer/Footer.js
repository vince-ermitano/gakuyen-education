import React, { useState } from "react";
import './Footer.css';
import { toast } from "sonner";
// import { FaCode } from 'react-icons/fa';

const Footer = () => {

    const [email, setEmail] = useState("");

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted!");
        console.log(email);

        fetch(`${process.env.REACT_APP_SERVER_URL}/newsletter-signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        "Error in fetch request: (newsletter signup)"
                    );
                }
                return response.text();
            })
            .then((data) => {
                toast.success("Email added to newsletter successfully!");
                setEmail("");
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error("Failed to add email to newsletter. Please try again.");
            });
    };
    return (
        <div className="footer page-section">
            {/* <FaCode style={{ fontSize: 32 }}/> */}
            <div className="footer-logo">
                <img src="/theodyssey_s.png" alt="Gakuyen Education Logo" />
            </div>
            <p>Lorem ipsum dolor sit amet</p>
            <p>Consectetur adipiscing elit, sed do eiusmod tempor </p>
            <p>Incididunt ut labore et dolore magna aliqua</p>
            {/* <div className="newsletter-form">
                <span>Join the newsletter:</span>
                <input type="text" placeholder="Email Address"></input>
            </div> */}
            <form className="newsletter-form" onSubmit={handleOnSubmit}>
                <span>Join the newsletter:</span>
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
            </form>
        </div>
    );
}

export default Footer;