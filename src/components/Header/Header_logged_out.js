import React, { useEffect, useState } from "react";
import "./Header_logged_out.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ReactComponent as Logo } from '../logo.svg';
// import Hamburger from "../Hamburger/Hamburger";
import Hamburger from "../Hamburger/Hamburger_v2";
// import HamburgerMenu from "../Hamburger/HamburgerMenu";
import { useSelector, useDispatch } from "react-redux";
import { checkIfPassedMainLaunchDate } from "../../helpers";
import { setLoggedInStatus } from "../../features/LoggedInStatusSlice";
import {
    toggleLoginSidebar,
    toggleCreateSidebar,
    toggleCartSidebar,
} from "../../features/SidebarSlice";
import { BiCartAlt } from "react-icons/bi";
import { getAuth, signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
// import { ToastContainer, toast } from "react-toastify";
import { toast } from "sonner";
import { checkHeaderColor, toggleHamburger, checkIfAuthorized } from "../../helpers";

const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.loggedInStatus.isLoggedIn);
    const [authorized, setAuthorized] = useState(checkIfPassedMainLaunchDate());
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    // Firebase
    const auth = getAuth();

    // functions
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                localStorage.removeItem("sessionToken");
                dispatch(setLoggedInStatus(false));
                checkHeaderColor(currentPath);
                toast.success("Logged out successfully!");
            })
            .catch((error) => {
                // An error happened.
                console.error(error);
                toast.error("Error logging out!");
            });

        // checkHeaderColor(currentPath);
        // hideHamburger();

    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user && checkIfAuthorized(user.email)) {
                setAuthorized(true);
            }
        });
    })

    const headerLoggedOut = (
        <div className="header" >
            {/* <div className="logo">
                    <Link to="/"><span>GAKUYEN EDUCATION</span></Link>
                </div> */}
            <div className="logo img-container">
                {/* <Link to="/"> */}
                {/* <img
                    src="/theodysseywhite_s.png"
                    alt="Gakuyen Education Logo"
                    onClick={() => {
                        navigate("/");
                        toggleHamburger(currentPath);
                    }}
                /> */}
                <Logo onClick={() => {
                    navigate("/");

                    if (document.getElementById("hamburger-menu").classList.contains("is-active")) {
                        toggleHamburger(currentPath);
                    }
                }} />
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
        <div className="header" >
            {/* <div className="logo">
                    <Link to="/"><span>GAKUYEN EDUCATION</span></Link>
                </div> */}
            <div className="logo img-container">
                {/* <Link to="/" >
                    <img src="/theodysseywhite_s.png" alt="Gakuyen Education Logo" />
                </Link> */}
                {/* <img
                    src="/theodysseywhite_s.png"
                    alt="Gakuyen Education Logo"
                    onClick={() => {
                        navigate("/");
                        toggleHamburger(currentPath);
                    }}
                /> */}
                <Logo onClick={() => {
                    navigate("/");
                    if (document.getElementById("hamburger-menu").classList.contains("is-active")) {
                        toggleHamburger(currentPath);
                    }
                }} />
            </div>
            <Hamburger />
            <div className="user-directory">
                <span className="header-text" onClick={() => {
                    if (!authorized) return;
                    navigate('/dashboard/main');
                    }}>
                    {/* <NavLink to="/dashboard/main">DASHBOARD</NavLink> */}
                    DASHBOARD
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
