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
                                Concept to Creation: High Quality
                                Content-Production
                            </h3>
                            <SiAtom />
                        </div>
                        <p>
                            Embark on a comprehensive journey from the initial
                            client discovery call to the final stages of
                            post-production. Through Modules 5-7, gain
                            step-by-step insights into handling a professional
                            brief, executing production with finesse, and
                            polishing your work in post-production. Learn to
                            STAND OUT for your quality and storytelling.
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
                                Monetize Your Art: Let’s Make This Profitable
                            </h3>
                            <GiMoneyStack />
                        </div>
                        <p>
                            Let’s turn your creative passion into a profitable
                            venture, together. This course provides in-depth
                            guidance on monetizing your work and navigating the
                            complexities of the creative business landscape.
                            From understanding market dynamics to setting
                            competitive pricing and managing client
                            relationships - all the hard questions, answered.
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
                                Effective and Actionable Steps: Mind Matters
                            </h3>
                            <GiLightBulb />
                        </div>
                        <p>
                            It all starts in your mind. Let’s shape and identify
                            your goals. From there we can examine productivity
                            techniques and foster new creative practices that
                            will be the foundation for your long-term success
                            and personal growth in this dog-eat-dog world of
                            creative entrepreneurship.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatWeOffer;
