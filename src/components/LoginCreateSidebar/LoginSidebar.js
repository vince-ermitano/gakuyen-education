import React from "react";
import "./Sidebar.css";
import { useSelector } from "react-redux";

const LoginSidebar = () => {

    const isOpen = useSelector(state => state.sidebar.isOpen);

    return (
        <div className="login-sidebar">
            <div className={`sidebar ${isOpen ? 'open' : ''} `}>
                <h1>Login Sidebar</h1>
            </div>
            <div className={`overlay ${isOpen ? 'show-overlay' : ''}`}></div>
        </div>
    );
};

export default LoginSidebar;
