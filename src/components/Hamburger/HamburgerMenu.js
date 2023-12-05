import React, { useEffect, useState } from "react";
import "./HamburgerMenu.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toggleHamburger, openNewWindow, checkIfAuthorized } from "../../helpers";
import { useSelector, useDispatch } from "react-redux";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { setLoggedInStatus } from "../../features/LoggedInStatusSlice";
import { toggleLoginSidebar } from "../../features/SidebarSlice";
import { scrollIntoView } from "../../helpers";
import { checkIfPassedMainLaunchDate } from "../../helpers";
import { toast } from "sonner";
import { BiLogoInstagramAlt, BiLogoYoutube, BiLogoTiktok } from "react-icons/bi";


const HamburgerMenu = () => {

    const loggedIn = useSelector((state) => state.loggedInStatus.isLoggedIn);
    console.log(checkIfPassedMainLaunchDate());
    const [linksEnabled, setLinksEnabled] = useState(checkIfPassedMainLaunchDate());
    const location = useLocation();
    const pathname = location.pathname;
    const dispatch = useDispatch();

    

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

    const handleLinkClick = (e) => {
        console.log(linksEnabled);
        if (!linksEnabled) {
            e.preventDefault();
            toggleHamburger('/');
        } else {
            toggleHamburger();
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user && checkIfAuthorized(user.email)) {
                setLinksEnabled(true);
            }
        });
    }, [])
    
    return (
        <nav id="hamburger-menu">
            <div className="shop-by-category">
                <h3>Shop By</h3>
                <hr />
                <div className="shop-by-category-links ham-menu-links">
                    <Link className="link1" to="/store" onClick={(e) => handleLinkClick(e)}>
                        Shop
                    </Link>
                    <Link className="link1" to="/store?filter=preset" onClick={(e) => handleLinkClick(e)}>
                        Presets
                    </Link>
                    <Link className="link1" to="/store" onClick={(e) => handleLinkClick(e)}>
                        LUTs
                    </Link>
                    <Link className="link1" to="/store" onClick={(e) => handleLinkClick(e)}>
                        Editing
                    </Link>
                    <Link className="link1 disabled" to="/" onClick={(e) => handleLinkClick(e)}>
                        Gaku's Favorites <span>soon...</span>
                    </Link>
                </div>
            </div>
            <div className="explore-category">
                <h3>Explore</h3>
                <hr />
                <div className="explore-category-links ham-menu-links">
                    <Link className="link1" to="/" onClick={(e) => handleLinkClick(e)}>
                        Home
                    </Link>
                    <Link className="link1 disabled" to="/" onClick={(e) => handleLinkClick(e)}>
                        Free Resources <span>soon...</span>
                    </Link>
                    <Link className="link1" to="/about" onClick={(e) => handleLinkClick(e)}>
                        About Gaku
                    </Link>
                </div>
            </div>
            <div className="connect-category">
                <h3>Connect</h3>
                <hr />
                <div className="connect-category-links ham-menu-links">
                    <Link className="link1" to="/contact" onClick={(e) => handleLinkClick(e)}>
                        Get in Touch
                    </Link>
                    <Link className="link1" to="/" onClick={(e) => {
                        e.preventDefault();
                        toggleHamburger('/');
                        scrollIntoView("faq");
                    }}>
                        Frequent Questions
                    </Link>
                    <Link
                        className="link1"
                        to="/dashboard/main"
                        onClick={(e) => handleLinkClick(e)}
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
