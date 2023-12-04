import React from "react";
import "./FAQ.css";
import FaqItem from "./FAQ_item";

const FAQ = () => {
    return (
        <section id="faq" className="page-section" data-aos="fade-up">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-questions-container">
                <section className="faq-group">
                    <FaqItem
                        question={
                            <>
                                What <b>Practical Skills</b> Will I Gain from
                                This Course?
                            </>
                        }
                        answer="You'll acquire a comprehensive skill set ranging from advanced techniques in photography and filmmaking to post-production expertise. The course also covers effective strategies for social media engagement and brand collaborations, ensuring you're equipped with both creative and digital marketing skills."
                    />
                    <FaqItem
                        question={
                            <>
                                How Will This Course Help Me <b>Monetize</b> My
                                Creative Work?
                            </>
                        }
                        answer="This course provides detailed insights into turning creative talents into financial gain. You'll learn about business management in the creative industry, including how to price your work, market your services effectively, and attract and retain clients, all essential for monetizing your skills."
                    />
                    <FaqItem
                        question={
                            <>
                                Is This Course Suitable for <b>Beginners</b> or{" "}
                                <b>Advanced</b> Creatives?
                            </>
                        }
                        answer={
                            <>
                                Our course is designed to cater to a wide range
                                of skill levels. While <b>beginners</b> can
                                build a strong foundation, <b>advanced</b>{" "}
                                creatives can refine their skills and learn new,
                                cutting-edge techniques, especially in areas
                                like AI integration and advanced
                                post-production.
                            </>
                        }
                    />
                    <FaqItem
                        question={
                            <>
                                What <b>Unique Insights</b> Does This Course
                                Offer Compared to Other Online Courses?
                            </>
                        }
                        answer="Unlike many other courses, we provide hands-on experience with real-world briefs, from initial concept through to final production. Our unique modules on AI and technology in creativity, along with expert industry insights, set our course apart."
                    />
                </section>
                <section className="faq-group">
                    <FaqItem
                        question={
                            <>
                                Can I <b>Balance This Course</b> with My
                                Full-Time Job or Studies?
                            </>
                        }
                        answer="Absolutely. The course is designed with flexibility in mind, allowing you to engage with the content and complete projects at your own pace. This makes it feasible to integrate the course with your professional or academic life."
                    />
                    <FaqItem
                        question={
                            <>
                                What <b>Support</b> and <b>Resources</b> Are
                                Available to Students During and After the
                                Course?
                            </>
                        }
                        answer="During the course, students have access to a range of resources including community forums, expert mentorship, and comprehensive learning materials. Post-course, we offer networking opportunities and continued access to course updates and alumni groups."
                    />
                    <FaqItem
                        question={
                            <>
                                Are There <b>Real-World Applications</b> and
                                Projects in the Course?
                            </>
                        }
                        answer={
                            <>
                                Yes, the course includes several real-world
                                projects and applications. You'll work through a
                                professional brief from start to finish,
                                applying your learning in a practical setting
                                that mimics real industry challenges.
                            </>
                        }
                    />
                    <FaqItem
                        question={
                            <>
                                What Is the <b>Return on Investment</b> for
                                Completing This Course
                            </>
                        }
                        answer="By completing this course, you'll gain valuable skills and insights that can significantly enhance your career opportunities in the creative industry. The course aims to elevate your creative capabilities, business acumen, and technical knowledge, leading to potential career advancement, higher earning opportunities, and a stronger personal brand."
                    />
                </section>
            </div>
        </section>
    );
};

export default FAQ;
