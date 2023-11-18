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
    }

    const scrollToCourseBanner = () => {
        const courseBanner = document.getElementById("course-banner");
        courseBanner.scrollIntoView({behavior: "smooth"});
    }

    return (
        <section
            id="target-audience"
            className="page-section"
        >
            <div className="content-wrapper" data-aos="fade-up">
                <div className="left-side">
                    <h2>
                        This Course Is<br></br> For You If
                    </h2>
                    <div className="checklist-container">
                        <div className="checklist">
                            <Checkbox onClickHandler={onClickHandler} />
                            <p>
                                You want to learn how to create a successful
                                business
                            </p>
                        </div>
                        <div className="checklist">
                            <Checkbox onClickHandler={onClickHandler} />
                            <p>
                                You want to learn how to create a successful
                                business
                            </p>
                        </div>
                        <div className="checklist">
                            <Checkbox onClickHandler={onClickHandler} />
                            <p>
                                You want to learn how to create a successful
                                business
                            </p>
                        </div>
                        <div className="checklist">
                            <Checkbox onClickHandler={onClickHandler} />
                            <p>
                                You want to learn how to create a successful
                                business
                            </p>
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
