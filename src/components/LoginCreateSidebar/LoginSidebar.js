import React from "react";
import "./Sidebar.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleCreateSidebar, toggleLoginSidebar } from "../../features/SidebarSlice";


const LoginSidebar = () => {
    const dispatch = useDispatch();

    const isOpen = useSelector((state) => state.sidebar.loginSidebarIsOpen);

    const switchSidebar = () => {
        dispatch(toggleCreateSidebar());
        dispatch(toggleLoginSidebar());
    };

    return (
        <div className="login-sidebar">
            <div className={`sidebar ${isOpen ? "open" : ""} `}>
                <h2>Welcome Back</h2>
                <form>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                    />
                    <label htmlFor="login-password">Password</label>
                    <input
                        type="password"
                        name="login-password"
                        id="login-password"
                        placeholder="Password"
                    />
                    <div className="button-group">
                        <button type="submit">Login</button>
                        <button type="button">Forgot Password?</button>
                    </div>
                </form>
                <div className="create-account call-to-action">
                    <span>Don't have an account? &nbsp;</span>
                    <button type="button" onClick={() => switchSidebar()}>Create Account</button>
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
