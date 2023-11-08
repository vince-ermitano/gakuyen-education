import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import './Hamburger.css'
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { setLoggedInStatus } from "../../features/LoggedInStatusSlice";
import { toggleLoginSidebar } from "../../features/SidebarSlice";
import { toast } from "sonner";


const Hamburger = () => {

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

        hideHamburger();
    };

    const hideHamburger = () => {
        document.getElementById("toggle1").checked = false;
    }

    useEffect(() => {
        const checkbox = document.getElementById("toggle1");
        const hamburger = document.querySelector(".hamburger-wrapper");

        const checkboxEventHandler = () => {
            if (checkbox.checked) {
                hamburger.classList.add("is-active");
            } else {
                hamburger.classList.remove("is-active");
            }
        }

        checkbox.addEventListener("change", checkboxEventHandler);

        return () => {
            checkbox.removeEventListener("change", checkboxEventHandler);
        }
    })

    return (
        <div className="hamburger-wrapper">
            <section className="p-menu1">
                <nav id="navbar" className="navigation" role="navigation">
                    <input id="toggle1" type="checkbox" />
                    <label className="hamburger1" htmlFor="toggle1">
                        <div className="top"></div>
                        <div className="meat"></div>
                        <div className="bottom"></div>
                    </label>

                    {/* <nav className="menu1">
                        <Link className="link1" to="/">Home</Link>
                        <a className="link1" href="/">Presets</a>
                        <a className="link1" href="/">Masterclass</a>
                        <a className="link1" href="/">Contact</a>
                    </nav> */}
                    <nav className="menu1">
                        <div className="shop-by-category">
                            <h3>Shop By</h3>
                            <hr />
                            <div className="shop-by-category-links">
                                <Link className="link1" to="/store" onClick={hideHamburger}>Presets</Link>
                                <Link className="link1" to="/store" onClick={hideHamburger}>Masterclass</Link>
                                <Link className="link1" to="/" onClick={hideHamburger}>Editing</Link>
                                <Link className="link1" to="/" onClick={hideHamburger}>Workflow</Link>
                                <Link className="link1" to="/" onClick={hideHamburger}>Connection</Link>
                                <Link className="link1" to="/" onClick={hideHamburger}>Gaku's Favorites</Link>
                            </div>
                        </div>
                        <div className="explore-category">
                            <h3>Explore</h3>
                            <hr />
                            <div className="explore-category-links">
                                <Link className="link1" to="/" onClick={hideHamburger}>Home</Link>
                                <Link className="link1" to="/" onClick={hideHamburger}>Free Resources</Link>
                                <Link className="link1" to="/" onClick={hideHamburger}>About Gaku</Link>
                            </div>
                        </div>
                        <div className="connect-category">
                            <h3>Connect</h3>
                            <hr />
                            <div className="connect-category-links">
                                <Link className="link1" to="/" onClick={hideHamburger}>Get in Touch</Link>
                                <Link className="link1" to="/" onClick={hideHamburger}>Frequent Questions</Link>
                                <Link className="link1" to="/dashboard/main" onClick={hideHamburger}>My Account</Link>
                                {loggedIn ? (
                                    <button className="link1" onClick={handleLogout}>Logout</button>
                                ) : (
                                    <button className="link1" onClick={() => {
                                        hideHamburger();
                                        dispatch(toggleLoginSidebar());
                                    }}>Login</button>
                                )}
                            </div>
                        </div>
                    </nav>
                </nav>
            </section>
        </div>
    );
}

export default Hamburger;