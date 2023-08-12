import React from "react";
import "./Sidebar.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleCreateSidebar, toggleLoginSidebar } from "../../features/SidebarSlice";

const CreateAccountSidebar = () => {
    const dispatch = useDispatch();

    const isOpen = useSelector((state) => state.sidebar.createSidebarIsOpen);


    const switchSidebar = () => {
        dispatch(toggleCreateSidebar());
        dispatch(toggleLoginSidebar());
    };
    
    return (
        <div className="create-sidebar">
            <div className={`sidebar ${isOpen ? "open" : ""} `}>
                <h2>Create Account</h2>
                <form>
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" name="first-name" id="first-name" placeholder="First Name" />
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" name="last-name" id="last-name"  placeholder="Last Name" />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                    />
                    <label htmlFor="confirm-password"> Confirm Password</label>
                    <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        placeholder="Confirm Password"
                    />
                    <div className="button-group">
                        <button type="submit">Sign Up</button>
                    </div>
                </form>
                <div className="login-to-account call-to-action">
                    <span>Already have an account? &nbsp;</span>
                    <button type="button" onClick={() => switchSidebar()}>Login</button>
                </div>
            </div>
            <div
                className={`overlay ${isOpen ? "show-overlay" : ""}`}
                onClick={() => dispatch(toggleCreateSidebar())}
            ></div>
        </div>
    );
};

export default CreateAccountSidebar;
