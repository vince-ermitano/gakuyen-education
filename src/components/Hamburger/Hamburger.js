import React from "react";
import './Hamburger.css'

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

                    <nav className="menu1">
                        <a className="link1" href="/">Home</a>
                        <a className="link1" href="/">Presets</a>
                        <a className="link1" href="/">Masterclass</a>
                        <a className="link1" href="/">Contact</a>
                    </nav>
                </nav>
            </section>
        </div>
    );
}

export default Hamburger;