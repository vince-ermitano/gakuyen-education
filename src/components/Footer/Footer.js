import React, { useState } from "react";
import './Footer.css';
import { toast } from "sonner";
// import { FaCode } from 'react-icons/fa';

const Footer = () => {

    const [email, setEmail] = useState("");

    // const handleOnSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log("Form submitted!");
    //     console.log(email);

    //     fetch(`${process.env.REACT_APP_SERVER_URL}/newsletter-signup`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             email: email,
    //         }),
    //     })
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error(
    //                     "Error in fetch request: (newsletter signup)"
    //                 );
    //             }
    //             return response.text();
    //         })
    //         .then((data) => {
    //             toast.success("Email added to newsletter successfully!");
    //             setEmail("");
    //         })
    //         .catch((error) => {
    //             console.error("Error:", error);
    //             toast.error("Failed to add email to newsletter. Please try again.");
    //         });
    // };

    const addToEmailContacts = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/add-email-contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                })
            })

            if (!response.ok) {
                const errorJSON = await response.json();
                throw new Error(errorJSON.error);
            }

            const json = await response.json();
            toast.success(json.message);
        } catch(e) {
            console.error(e.message);
            toast.error(e.message);
        }
    }
    return (
        <div className="footer page-section">
            {/* <FaCode style={{ fontSize: 32 }}/> */}
            <div className="footer-logo">
                <img src="/theodyssey_s.png" alt="Gakuyen Education Logo" />
            </div>
            <p>ミ★ Perhaps Today! ★彡</p>
            {/* <div className="newsletter-form">
                <span>Join the newsletter:</span>
                <input type="text" placeholder="Email Address"></input>
            </div> */}
            <form className="newsletter-form" onSubmit={addToEmailContacts}>
                <span>Join the newsletter:</span>
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
            </form>
            <p>Odyssey Global LLC Copyright 2023. All Rights Reserved.</p>
        </div>
    );
}

export default Footer;