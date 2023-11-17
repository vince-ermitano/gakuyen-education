import React from "react";
import "./Header_logged_out.css";
import { useNavigate } from "react-router-dom";
// import Hamburger from "../Hamburger/Hamburger";
import Hamburger from "../Hamburger/Hamburger_v2";
// import HamburgerMenu from "../Hamburger/HamburgerMenu";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedInStatus } from "../../features/LoggedInStatusSlice";
import { NavLink, Link } from "react-router-dom";
import {
    toggleLoginSidebar,
    toggleCreateSidebar,
    toggleCartSidebar,
} from "../../features/SidebarSlice";
import { BiCartAlt } from "react-icons/bi";
import { getAuth, signOut } from "firebase/auth";
// import { ToastContainer, toast } from "react-toastify";
import { toast } from "sonner";

const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.loggedInStatus.isLoggedIn);
    const navigate = useNavigate();

    // Firebase
    const auth = getAuth();

    // functions
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                dispatch(setLoggedInStatus(false));
                toast.success("Logged out successfully!");
            })
            .catch((error) => {
                // An error happened.
                console.error(error);
                toast.error("Error logging out!");
            });

        // hideHamburger();
    };

    // const hideHamburger = () => {
    //     document.getElementById("toggle1").checked = false;
    // }

    const headerLoggedOut = (
        <div className="header">
            {/* <div className="logo">
                    <Link to="/"><span>GAKUYEN EDUCATION</span></Link>
                </div> */}
            <div className="logo img-container">
                {/* <Link to="/"> */}
                <img
                    src="/theodysseywhite_s.png"
                    alt="Gakuyen Education Logo"
                    onClick={() => navigate("/")}
                />
                {/* </Link> */}
            </div>
            <Hamburger />
            <div className="user-directory">
                <span
                    className="header-text"
                    onClick={() => dispatch(toggleLoginSidebar())}
                >
                    LOGIN
                </span>
                <span
                    className="header-text"
                    onClick={() => dispatch(toggleCreateSidebar())}
                >
                    GET STARTED
                </span>
                <div
                    className="icon-wrapper"
                    onClick={() => dispatch(toggleCartSidebar())}
                >
                    <BiCartAlt className="header-text" />
                </div>
            </div>
            {/* <HamburgerMenu /> */}
        </div>
    );

    // const headerLoggedIn = (
    //     <div className="header">
    //         <div className="logo">
    //             <span>GAKUYEN EDUCATION</span>
    //         </div>
    //         <Hamburger />
    //         <div className="user-directory">
    //             <span>MY ACCOUNT</span>
    //             <span>CART</span>
    //         </div>
    //     </div>
    // );

    const headerLoggedIn = (
        <div className="header">
            {/* <div className="logo">
                    <Link to="/"><span>GAKUYEN EDUCATION</span></Link>
                </div> */}
            <div className="logo img-container">
                <Link to="/">
                    <img src="/theodysseywhite_s.png" alt="Gakuyen Education Logo" />
                </Link>
            </div>
            <Hamburger />
            <div className="user-directory">
                <span className="header-text">
                    <NavLink to="/dashboard/main">DASHBOARD</NavLink>
                </span>
                <span
                    className="header-text"
                    onClick={() => handleLogout()}
                >
                    LOGOUT
                </span>
                <div className="icon-wrapper" onClick={() => dispatch(toggleCartSidebar())}>
                    <BiCartAlt className="header-text"/>
                </div>
            </div>
            {/* <HamburgerMenu /> */}
        </div>
    );

    return (
        <div>
            {isLoggedIn ? headerLoggedIn : headerLoggedOut}

            {/* <ToastContainer /> */}
            {/* <button
                id="mock-log"
                onClick={() => {
                    dispatch(setLoggedInStatus());
                }}
            >
                Toggle Logged In Status
            </button> */}
            {/* {isLoggedIn ? <span>Logged In</span> : <span>Logged Out</span>} */}
        </div>
    );
};

export default Header;
