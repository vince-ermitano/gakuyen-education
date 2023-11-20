import React from "react";
import "./CourseOverviewV2.css";
import Dropdown from "../../Dropdown/Dropdown";

const CourseOverview = () => {


    return (
        <section
            id="course-overview"
            className="course-overview"
        >
            <div className="content-wrapper" data-aos="fade-up">
                <h2>What You Will Learn</h2>
                <div className="course-overview-content">
                    <div id="module-selection">
                        <h3>Module Selection</h3>
                        <Dropdown
                            type={"module"}
                            idForInput={"module-dropdown-input"}
                            idForDropdown={"module-dropdown"}
                        />
                        <ul className="desktop">
                            <li>Mindset for Creative Success</li>
                            <li>Elevating Your Filmmaking and Photography</li>
                            <li>Building Your Personal Brand</li>
                            <li>Content Monetization and Revenue Streams</li>
                            <li>
                                The Business of Creative Filmmaking and
                                Photography
                            </li>
                            <li>Influencer Marketing and Brand Collection</li>
                            <li>Editing Efficiency and High-Quality Output</li>
                            <li>Client Relations and Professional Etiquette</li>
                            <li>AI in Creative Filmmaking and Photography</li>
                            <li>Storytelling Beyond the Lens</li>
                            <li>Finding Inspiration and Staying Relevant</li>
                            <li>Building a Supportive Creative Community</li>
                            <li>Creating Impactful Social Media Content</li>
                        </ul>
                    </div>
                    <div id="module-description">
                        <h3>Module Title</h3>
                        <div className="content">
                            <div className="image-container mobile">
                                <img
                                    className="odd"
                                    src="https://via.placeholder.com/400x300"
                                    alt="placeholder"
                                />
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.
                            </p>
                            <div className="image-container desktop">
                                <img
                                    className="odd"
                                    src="https://via.placeholder.com/400x300"
                                    alt="placeholder"
                                />
                            </div>
                            <div className="image-container desktop">
                                <img
                                    className="even"
                                    src="https://via.placeholder.com/400x300"
                                    alt="placeholder"
                                />
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.
                            </p>
                            {/* <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.
                            </p>
                            <div className="image-container desktop">
                                <img
                                    className="odd"
                                    src="https://via.placeholder.com/400x300"
                                    alt="placeholder"
                                />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CourseOverview;
