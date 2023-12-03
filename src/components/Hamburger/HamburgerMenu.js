import React from "react";
import "./HamburgerMenu.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toggleHamburger, openNewWindow } from "../../helpers";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { setLoggedInStatus } from "../../features/LoggedInStatusSlice";
import { toggleLoginSidebar } from "../../features/SidebarSlice";
import { toast } from "sonner";
import { BiLogoInstagramAlt, BiLogoYoutube, BiLogoTiktok } from "react-icons/bi";


const HamburgerMenu = () => {

    const loggedIn = useSelector((state) => state.loggedInStatus.isLoggedIn);
    const location = useLocation();
    const pathname = location.pathname;
    const dispatch = useDispatch();

    console.log("pathname: ", pathname);
    

    const handleLogout = () => {
        console.log('logging out')
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

        toggleHamburger(pathname);
    };
    
    return (
        <nav id="hamburger-menu">
            <div className="shop-by-category">
                <h3>Shop By</h3>
                <hr />
                <div className="shop-by-category-links ham-menu-links">
                    <Link className="link1" to="/store" onClick={toggleHamburger}>
                        Shop
                    </Link>
                    <Link className="link1" to="/store?filter=preset" onClick={toggleHamburger}>
                        Presets
                    </Link>
                    <Link className="link1" to="/store?filter=masterclass" onClick={toggleHamburger}>
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
                    <Link className="link1" to="/" onClick={() => toggleHamburger('/')}>
                        Home
                    </Link>
                    <Link className="link1" to="/" onClick={toggleHamburger}>
                        Free Resources
                    </Link>
                    <Link className="link1" to="/about" onClick={toggleHamburger}>
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
                    <ul id="socials-list">
                        <li onClick={() => openNewWindow('https://www.instagram.com/gakuyen')}><BiLogoInstagramAlt /></li>
                        <li onClick={() => openNewWindow('https://www.youtube.com/c/gakulange')}><BiLogoYoutube /></li>
                        <li onClick={() => openNewWindow('https://www.tiktok.com/@gakulange')}><BiLogoTiktok /></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default HamburgerMenu;
