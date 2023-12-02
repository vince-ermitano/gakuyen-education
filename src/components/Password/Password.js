import React, { useState } from "react";

const Password = (props) => {
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === process.env.REACT_APP_WEBSITE_PW) {
            props.setAuthenticated(true);
        } else return;
    };
    return (
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
    );
};

export default Password;
