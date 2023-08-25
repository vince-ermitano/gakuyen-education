import React, { useRef, useEffect, useState } from "react";
import "./Sidebar.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
    toggleCreateSidebar,
    toggleLoginSidebar,
} from "../../features/SidebarSlice";
// import { auth } from "../../config/firebaseConfig";
// import { signInWithEmailAndPassword } from "firebase/auth";

const LoginSidebar = () => {
    const dispatch = useDispatch();

    const emailInputRef = useRef(null);

    // states
    const isOpen = useSelector((state) => state.sidebar.loginSidebarIsOpen);
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");

    // functions
    const handleLogin = (e) => {
        e.preventDefault();
    }

    const switchSidebar = () => {
        dispatch(toggleCreateSidebar());
        dispatch(toggleLoginSidebar());
    };

    useEffect(() => {
        if (isOpen) {
            emailInputRef.current.focus();
        }
    }, [isOpen]);

    return (
        <div className="login-sidebar">
            <div className={`sidebar ${isOpen ? "open" : ""} `}>
                <h2>Welcome Back</h2>
                <form onSubmit={handleLogin}>
                    <label htmlFor="login-email">Email</label>
                    <input
                        type="email"
                        value={emailAddress}
                        name="login-email"
                        id="login-email"
                        placeholder="Email"
                        ref={emailInputRef}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        autoFocus
                    />
                    <label htmlFor="login-password">Password</label>
                    <input
                        type="password"
                        name="login-password"
                        id="login-password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="button-group">
                        <button type="submit">Login</button>
                        <button type="button">Forgot Password?</button>
                    </div>
                </form>
                <div className="create-account call-to-action">
                    <span>Don't have an account? &nbsp;</span>
                    <button type="button" onClick={() => switchSidebar()}>
                        Create Account
                    </button>
                </div>
            </div>
            <div
                className={`overlay ${isOpen ? "show-overlay" : ""}`}
                onClick={() => dispatch(toggleLoginSidebar())}
            ></div>
        </div>
    );
};

export default LoginSidebar;
