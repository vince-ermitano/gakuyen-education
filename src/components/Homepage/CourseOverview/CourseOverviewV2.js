import React from "react";
import "./CourseOverviewV2.css";
import Dropdown from "../../Dropdown/Dropdown";
import { courseOverviewDescriptions } from "../../../descriptions/descriptions";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCourseOverviewModule } from "../../../features/CoursesSlice";

const CourseOverview = () => {
    const dispatch = useDispatch();
    const currentCourseOverviewModule = useSelector(
        (state) => state.courses.currentCourseOverviewModule
    );
    const theOdyssey = useSelector((state) => state.courses.theOdyssey);
    const isLoading = useSelector((state) => state.courses.isLoading);

    const handleModuleSelection = (e) => {
        dispatch(setCurrentCourseOverviewModule(e.target.dataset.module));
    };

    const handleDropdownSelection = (e) => {
        const target = e.target.closest("div[data-module*=M-]");
        const module = target.dataset.module;
        dispatch(setCurrentCourseOverviewModule(module));
    };

    return (
        <section id="course-overview" className="course-overview">
            <div className="content-wrapper" data-aos="fade-up">
                <h2 className="mobile">What You Will Learn</h2>
                <div className="course-overview-content">
                    <div id="module-selection">
                        <h3>Module Selection</h3>
                        <Dropdown
                            type={"module"}
                            idForInput={"module-dropdown-input"}
                            idForDropdown={"module-dropdown"}
                            handleModuleSelection={handleDropdownSelection}
                        />
                        <ul className="desktop">
                            <li
                                data-module="M-01"
                                onClick={(e) => handleModuleSelection(e)}
                            >
                                <b>Module 1:</b> Cultivating a Growth Mindset and
                                Balancing Artistry
                            </li>
                            <li
                                data-module="M-02"
                                onClick={(e) => handleModuleSelection(e)}
                            >
                                <b>Module 2:</b> Essential Tools for Photography and
                                Filmmaking
                            </li>
                            <li
                                data-module="M-03"
                                onClick={(e) => handleModuleSelection(e)}
                            >
                                <b>Module 3:</b> Building Your Brand in the Creative
                                Market
                            </li>
                            <li
                                data-module="M-04"
                                onClick={(e) => handleModuleSelection(e)}
                            >
                                <b>Module 4:</b> Financial and Legal Acumen for
                                Creatives
                            </li>
                            <li
                                data-module="M-05"
                                onClick={(e) => handleModuleSelection(e)}
                            >
                                <b>Module 5:</b> Mastering Client Interaction
                            </li>
                            <li
                                data-module="M-06"
                                onClick={(e) => handleModuleSelection(e)}
                            >
                                <b>Module 6:</b> The Art of the Shoot
                            </li>
                            <li
                                data-module="M-07"
                                onClick={(e) => handleModuleSelection(e)}
                            >
                                <b>Module 7:</b> Crafting the Story in Post-Production
                            </li>
                            <li
                                data-module="M-08"
                                onClick={(e) => handleModuleSelection(e)}
                            >
                                <b>Module 8:</b> Excellence in Client Relations
                            </li>
                            <li
                                data-module="M-09"
                                onClick={(e) => handleModuleSelection(e)}
                            >
                                <b>Module 9:</b> Influencer Marketing Mastery
                            </li>
                            <li
                                data-module="M-10"
                                onClick={(e) => handleModuleSelection(e)}
                            >
                                <b>Module 10:</b> AI in Creativity
                            </li>
                            <li
                                data-module="M-11"
                                onClick={(e) => handleModuleSelection(e)}
                            >
                                <b>Module 11:</b> Staying Inspired and Relevant
                            </li>
                            <li
                                data-module="M-12"
                                onClick={(e) => handleModuleSelection(e)}
                            >
                                <b>Module 12:</b> Fostering a Creative Community
                            </li>
                            <li
                                data-module="M-13"
                                onClick={(e) => handleModuleSelection(e)}
                            >
                                <b>Module 13:</b> Impactful Social Media Content
                            </li>
                            <li
                                data-module="M-14"
                                onClick={(e) => handleModuleSelection(e)}
                            >
                                <b>Module 14:</b> Balancing Personal and Commercial
                                Projects
                            </li>
                        </ul>
                    </div>
                    {!isLoading && (
                        <div id="module-description">
                            <h2>What You Will Learn</h2>

                            <h3>
                                {theOdyssey[currentCourseOverviewModule].title}
                            </h3>
                            <div className="content">
                                <div className="image-container mobile">
                                    <img
                                        className="odd"
                                        src={
                                            courseOverviewDescriptions[
                                                currentCourseOverviewModule
                                            ][4][0]
                                        }
                                        alt="module"
                                    />
                                </div>
                                <p>
                                    <span>
                                        {
                                            courseOverviewDescriptions[
                                                currentCourseOverviewModule
                                            ][0]
                                        }
                                    </span>
                                    {
                                        courseOverviewDescriptions[
                                            currentCourseOverviewModule
                                        ][1]
                                    }
                                </p>
                                <div className="image-container mobile">
                                    <img
                                        className="odd"
                                        src={
                                            courseOverviewDescriptions[
                                                currentCourseOverviewModule
                                            ][4][1]
                                        }
                                        alt="module"
                                    />
                                </div>
                                <div className={`image-container desktop`}>
                                    <img
                                        className="odd"
                                        src={
                                            courseOverviewDescriptions[
                                                currentCourseOverviewModule
                                            ][4][0]
                                        }
                                        alt="module"
                                    />
                                </div>
                                <div className={`image-container desktop`}>
                                    <img
                                        className="even"
                                        src={
                                            courseOverviewDescriptions[
                                                currentCourseOverviewModule
                                            ][4][1]
                                        }
                                        alt="module"
                                    />
                                </div>
                                <p>
                                    <span>
                                        {
                                            courseOverviewDescriptions[
                                                currentCourseOverviewModule
                                            ][2]
                                        }
                                    </span>
                                    {
                                        courseOverviewDescriptions[
                                            currentCourseOverviewModule
                                        ][3]
                                    }
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CourseOverview;
