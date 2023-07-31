import React from "react";
import './Hamburger.css'
import { Link } from "react-router-dom";

const Hamburger = () => {
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
                                <Link className="link1" to="/store">Presets</Link>
                                <Link className="link1" to="/store">Masterclass</Link>
                                <Link className="link1" to="/">Editing</Link>
                                <Link className="link1" to="/">Workflow</Link>
                                <Link className="link1" to="/">Connection</Link>
                                <Link className="link1" to="/">Gaku's Favorites</Link>
                            </div>
                        </div>
                        <div className="explore-category">
                            <h3>Explore</h3>
                            <hr />
                            <div className="explore-category-links">
                                <Link className="link1" to="/">Home</Link>
                                <Link className="link1" to="/">Free Resources</Link>
                                <Link className="link1" to="/">About Gaku</Link>
                            </div>
                        </div>
                        <div className="connect-category">
                            <h3>Connect</h3>
                            <hr />
                            <div className="connect-category-links">
                                <Link className="link1" to="/">Get in Touch</Link>
                                <Link className="link1" to="/">Frequent Questions</Link>
                                <Link className="link1" to="/">My Account</Link>
                            </div>
                        </div>
                    </nav>
                </nav>
            </section>
        </div>
    );
}

export default Hamburger;