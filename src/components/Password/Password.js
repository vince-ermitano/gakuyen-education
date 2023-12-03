import React, { useState } from "react";
import { Toaster, toast } from "sonner";

const Password = (props) => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === process.env.REACT_APP_WEBSITE_PW) {
            props.setAuthenticated(true);
        } else return;
    };

    const handleSignup = (e) => {
        e.preventDefault();

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
    }

    return (
        <section id="password-and-signup">
            <form id="password-page" onSubmit={handleSubmit}>
                <img src="/theodyssey.png" alt="The Odyssey" />
                {/* <Logo /> */}
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            <form id="signup-form" onSubmit={handleSignup}>
                <label htmlFor="email">Don't miss out!</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
            <Toaster position="top-center" richColors />
        </section>
    );
};

export default Password;
