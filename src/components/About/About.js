import React from "react";
import "./About.css";
import { openNewWindow } from "../../helpers";

const About = () => {

    document.title = "About Gaku | The Odyssey";
    window.scrollTo(0, 0);

    return (
        <section id="about-section">
            <img
                src="https://images.squarespace-cdn.com/content/v1/61a46cc601b4c521a42206d3/2095dc53-4b8b-40c6-a2f1-121b76940192/35DF0C3E-16F0-4AB0-B221-24EC5F16F6AD.jpg?format=2500w"
                alt="about"
            />
            <div className="about-text">
                <h1>hello! 初めまして！</h1>
                <p>
                    My name is <strong>Gaku</strong> - I’ve been creating
                    photographs, videos, and designs for over 13 years.{" "}
                    <br></br>I specialize in executing unique projects through
                    various mixed mediums.
                </p>
                <p className="heading">you can find me on:</p>
                <ul className="socials">
                    <li
                        onClick={() =>
                            openNewWindow("https://www.instagram.com/gakuyen")
                        }
                    >
                        youtube
                    </li>
                    <li className="divider">|</li>
                    <li
                        onClick={() =>
                            openNewWindow("https://www.youtube.com/c/gakulange")
                        }
                    >
                        instagram
                    </li>
                    <li className="divider">|</li>
                    <li
                        onClick={() =>
                            openNewWindow("https://www.tiktok.com/@gakulange")
                        }
                    >
                        tiktok
                    </li>
                </ul>
                <p className="heading">recent press includes:</p>
                <ul className="press">
                    <li
                        onClick={() =>
                            openNewWindow(
                                "https://eyescream.jp/culture/114992/"
                            )
                        }
                    >
                        eyescream
                    </li>
                    <li
                        onClick={() =>
                            openNewWindow(
                                "https://www.houyhnhnm.jp/news/583507/"
                            )
                        }
                    >
                        houyhnhnm
                    </li>
                    <li
                        onClick={() =>
                            openNewWindow(
                                "https://prtimes.jp/main/html/rd/p/000000858.000011969.html"
                            )
                        }
                    >
                        prtimes
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default About;
