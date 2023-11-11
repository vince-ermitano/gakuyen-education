import React from "react";
import "./HamburgerMenu.css";
import { Link } from "react-router-dom";
import { toggleHamburger } from "../../helpers";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { setLoggedInStatus } from "../../features/LoggedInStatusSlice";
import { toggleLoginSidebar } from "../../features/SidebarSlice";
import { toast } from "sonner";


const HamburgerMenu = () => {

    const loggedIn = useSelector((state) => state.loggedInStatus.isLoggedIn);
    const dispatch = useDispatch();

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

        toggleHamburger();
    };
    
    return (
        <nav id="hamburger-menu">
            <div className="shop-by-category">
                <h3>Shop By</h3>
                <hr />
                <div className="shop-by-category-links ham-menu-links">
                    <Link className="link1" to="/store" onClick={toggleHamburger}>
                        Presets
                    </Link>
                    <Link className="link1" to="/store" onClick={toggleHamburger}>
                        Masterclass
                    </Link>
                    <Link className="link1" to="/" onClick={toggleHamburger}>
                        Editing
                    </Link>
                    <Link className="link1" to="/" onClick={toggleHamburger}>
                        Workflow
                    </Link>
                    <Link className="link1" to="/" onClick={toggleHamburger}>
                        Connection
                    </Link>
                    <Link className="link1" to="/" onClick={toggleHamburger}>
                        Gaku's Favorites
                    </Link>
                </div>
            </div>
            <div className="explore-category">
                <h3>Explore</h3>
                <hr />
                <div className="explore-category-links ham-menu-links">
                    <Link className="link1" to="/" onClick={toggleHamburger}>
                        Home
                    </Link>
                    <Link className="link1" to="/" onClick={toggleHamburger}>
                        Free Resources
                    </Link>
                    <Link className="link1" to="/" onClick={toggleHamburger}>
                        About Gaku
                    </Link>
                </div>
            </div>
            <div className="connect-category">
                <h3>Connect</h3>
                <hr />
                <div className="connect-category-links ham-menu-links">
                    <Link className="link1" to="/contact" onClick={toggleHamburger}>
                        Get in Touch
                    </Link>
                    <Link className="link1" to="/" onClick={toggleHamburger}>
                        Frequent Questions
                    </Link>
                    <Link
                        className="link1"
                        to="/dashboard/main"
                        onClick={toggleHamburger}
                    >
                        My Account
                    </Link>
                    {loggedIn ? (
                        <button className="link1" onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                        <button
                            className="link1"
                            onClick={() => {
                                toggleHamburger();
                                dispatch(toggleLoginSidebar());
                            }}
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default HamburgerMenu;
