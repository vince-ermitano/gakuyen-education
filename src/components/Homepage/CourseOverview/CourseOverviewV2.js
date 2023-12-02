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
                <h2>What You Will Learn</h2>
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
                                Module 1: Cultivating a Growth Mindset and
                                Balancing Artistry
                            </li>
                            <li
                                data-module="M-02"
                                onClick={(e) => handleModuleSelection(e)}
                            >
                                Module 2: Essential Tools for Photography and
                                Filmmaking
                            </li>
                            <li
                                data-module="M-03"
                                onClick={(e) => handleModuleSelection(e)}
                            >
                                Module 3: Building Your Brand in the Creative
                                Market
                            </li>
                            <li
                                data-module="M-04"
                                onClick={(e) => handleModuleSelection(e)}
                            >
                                Module 4: Financial and Legal Acumen for
                                Creatives
                            </li>
                            <li
                                data-module="M-05"
                                onClick={(e) => handleModuleSelection(e)}
                            >
                                Module 5: Mastering Client Interaction
                            </li>
                            <li
                                data-module="M-06"
                                onClick={(e) => handleModuleSelection(e)}
                            >
                                Module 6: The Art of the Shoot
                            </li>
                            <li
                                data-module="M-07"
                                onClick={(e) => handleModuleSelection(e)}
                            >
                                Module 7: Crafting the Story in Post-Production
                            </li>
                            <li
                                data-module="M-08"
                                onClick={(e) => handleModuleSelection(e)}
                            >
                                Module 8: Excellence in Client Relations
                            </li>
                            <li
                                data-module="M-09"
                                onClick={(e) => handleModuleSelection(e)}
                            >
                                Module 9: Influencer Marketing Mastery
                            </li>
                            <li
                                data-module="M-10"
                                onClick={(e) => handleModuleSelection(e)}
                            >
                                Module 10: AI in Creativity
                            </li>
                            <li
                                data-module="M-11"
                                onClick={(e) => handleModuleSelection(e)}
                            >
                                Module 11: Staying Inspired and Relevant
                            </li>
                            <li
                                data-module="M-12"
                                onClick={(e) => handleModuleSelection(e)}
                            >
                                Module 12: Fostering a Creative Community
                            </li>
                            <li
                                data-module="M-13"
                                onClick={(e) => handleModuleSelection(e)}
                            >
                                Module 13: Impactful Social Media Content
                            </li>
                            <li
                                data-module="M-14"
                                onClick={(e) => handleModuleSelection(e)}
                            >
                                Module 14: Balancing Personal and Commercial
                                Projects
                            </li>
                        </ul>
                    </div>
                    {!isLoading && (
                        <div id="module-description">
                            <h3>
                                {theOdyssey[currentCourseOverviewModule].title}
                            </h3>
                            <div className="content">
                                <div className="image-container mobile">
                                    <img
                                        className="odd"
                                        src="https://via.placeholder.com/400x300"
                                        alt="placeholder"
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
