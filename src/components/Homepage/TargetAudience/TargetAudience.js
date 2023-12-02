import React, { useState } from "react";
import "./TargetAudience.css";
import Checkbox from "../../Checkbox/Checkbox";

const TargetAudience = () => {
    const [oneChecked, setOneChecked] = useState(false);

    const onClickHandler = () => {
        const checkBoxes = document.querySelectorAll(".container input");
        let isOneChecked = false;

        checkBoxes.forEach((e) => {
            if (e.checked) {
                isOneChecked = true;
            }
        });

        if (!isOneChecked) {
            setOneChecked(false);
        } else {
            setOneChecked(true);
        }
    };

    const scrollToCourseBanner = () => {
        const courseBanner = document.getElementById("course-banner");
        courseBanner.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section id="target-audience" className="page-section">
            <div className="content-wrapper" data-aos="fade-up">
                <div className="left-side">
                    <h2>
                        This Course Is<br></br> For You If
                    </h2>
                    <div className="checklist-container">
                        <div className="checklist">
                            <Checkbox onClickHandler={onClickHandler} />
                            <div className="checklist-text">
                                <p>
                                    Aspiring and Professional Creatives in Film
                                    and Photography:
                                </p>
                                <p>
                                    You're an aspiring or established filmmaker
                                    or photographer seeking to enhance your
                                    creative skills, learn advanced techniques
                                    in shooting and post-production, and stay
                                    updated with the latest tools and
                                    technologies in the industry.
                                </p>
                            </div>
                        </div>
                        <div className="checklist">
                            <Checkbox onClickHandler={onClickHandler} />
                            <div className="checklist-text">
                                <p>
                                    Individuals Seeking Career Growth in the
                                    Creative Industry:
                                </p>
                                <p>
                                    You're looking to transition into a creative
                                    career or elevate your current position in
                                    the fields of film and photography, and you
                                    desire a deeper understanding of personal
                                    branding, client relations, and the business
                                    aspects of the creative industry.
                                </p>
                            </div>
                        </div>
                        <div className="checklist">
                            <Checkbox onClickHandler={onClickHandler} />
                            <div className="checklist-text">
                                <p>Creative Entrepreneurs and Freelancers:</p>
                                <p>
                                    You're a solo creator, freelancer, or small
                                    business owner in the creative sector who
                                    wants to master financial management, legal
                                    aspects of freelancing, and learn strategies
                                    for building a sustainable and diversified
                                    business model.
                                </p>
                            </div>
                        </div>
                        <div className="checklist">
                            <Checkbox onClickHandler={onClickHandler} />
                            <div className="checklist-text">
                                <p>
                                    Influencers and Social Media Content
                                    Creators:
                                </p>
                                <p>
                                    You're an influencer or content creator
                                    aiming to maximize your impact on platforms
                                    like Instagram, TikTok, and YouTube, looking
                                    for insights into effective social media
                                    strategies, audience engagement, and brand
                                    collaboration opportunities.
                                </p>
                            </div>
                        </div>
                        <div className="checklist">
                            <Checkbox onClickHandler={onClickHandler} />
                            <div className="checklist-text">
                                <p>Innovators and Tech-Savvy Creatives:</p>
                                <p>
                                    You're interested in the intersection of
                                    creativity and technology, particularly in
                                    how AI is reshaping the creative landscape,
                                    and you're eager to explore and integrate
                                    cutting-edge tools and trends into your
                                    creative workflow.
                                </p>
                            </div>
                        </div>
                    </div>
                    <button
                        disabled={!oneChecked}
                        onClick={scrollToCourseBanner}
                    >
                        Enroll Now
                    </button>
                </div>
                <div className="right-side"></div>
            </div>
        </section>
    );
};

export default TargetAudience;
