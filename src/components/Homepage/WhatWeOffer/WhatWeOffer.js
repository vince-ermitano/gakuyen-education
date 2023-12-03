import React from "react";
import "./WhatWeOffer.css";
import { GiMoneyStack, GiLightBulb } from "react-icons/gi";
import { SiAtom } from "react-icons/si";

const WhatWeOffer = () => {
    return (
        <section id="what-we-offer" data-aos="fade-up">
            <h2>What We Offer</h2>
            <div className="offer-container" data-aos="fade-up">
                <div className="offer offer-1">
                    <div className="image-container">
                        <img
                            src="https://i.postimg.cc/26MLbnJJ/JPEG-image.jpg"
                            alt="What we offer"
                        ></img>
                    </div>
                    <div className="text-container">
                        <div className="title-icon-container">
                            <h3>
                                From Concept to Creation: Master High-Quality
                                Content Production
                            </h3>
                            <SiAtom />
                        </div>
                        <p>
                            Embark on a comprehensive journey from the initial
                            client discovery call to the final stages of
                            post-production. Through Modules 5-7, gain
                            step-by-step insights into handling a professional
                            brief, executing production with finesse, and
                            polishing your work in post-production. This course
                            offers you the tools and techniques to create
                            content that stands out for its quality and
                            storytelling.
                        </p>
                    </div>
                </div>
                <div className="offer offer-2">
                    <div className="image-container">
                        <img
                            src="https://i.postimg.cc/qRzCv1my/JPEG-image.jpg"
                            alt="What we offer"
                        ></img>
                    </div>
                    <div className="text-container">
                        <div className="title-icon-container">
                            <h3>
                                Monetize Your Art: Navigate the Business of
                                Creative Entrepreneurship
                            </h3>
                            <GiMoneyStack />
                        </div>
                        <p>
                            Learn the secrets of turning your creative passion
                            into a profitable venture. This course provides
                            in-depth guidance on monetizing your work and
                            navigating the complexities of the creative business
                            landscape. From understanding market dynamics to
                            setting competitive pricing and managing client
                            relationships, empower yourself to thrive as a
                            creative entrepreneur.
                        </p>
                    </div>
                </div>
                <div className="offer offer-3">
                    <div className="image-container">
                        <img
                            src="https://i.postimg.cc/sxWQpvC2/Clean-Shot-2023-09-28-at-15-40-36-2x.jpg"
                            alt="What we offer"
                        ></img>
                    </div>
                    <div className="text-container">
                        <div className="title-icon-container">
                            <h3>
                                Unlock Your Full Potential: Enhance
                                Productivity, Mindset, and Creativity
                            </h3>
                            <GiLightBulb />
                        </div>
                        <p>
                            Elevate your creative career with key strategies in
                            productivity and mindset enhancement. This course
                            offers a wealth of knowledge in developing a growth
                            mindset, adopting effective productivity techniques,
                            and fostering innovative creative practices. Equip
                            yourself with the mindset and skills necessary for
                            long-term success and personal growth in the
                            competitive world of creativity.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatWeOffer;
