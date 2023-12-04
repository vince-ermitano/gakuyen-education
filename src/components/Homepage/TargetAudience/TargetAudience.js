import React, { useState, useRef, useEffect } from "react";
import "./TargetAudience.css";
import Checkbox from "../../Checkbox/Checkbox";
import { register } from "swiper/element/bundle";
import Swiper from "swiper";

register();

const TargetAudience = () => {
    const swiperElRef = useRef(null);
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

    useEffect(() => {
        new Swiper(".mySwiper", {
            spaceBetween: 30,
            effect: "fade",
            fadeEffect: {
                crossFade: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    });

    return (
        <section id="target-audience" className="page-section">
            <div className="content-wrapper" data-aos="fade-up">
                <div className="left-side">
                    <h2>This Course Is FOR</h2>
                    <div className="checklist-container">
                        <div className="checklist">
                            <Checkbox onClickHandler={onClickHandler} />
                            <div className="checklist-text">
                                <p>
                                    The Aspiring and Professional Creator /
                                    Creative ⋆｡°✩
                                </p>
                                <p>
                                    There’s a feeling you get from the creation
                                    process. It’s fulfilling. Exciting.
                                    Confusing, at times. But there’s always{" "}
                                    <b>room for growth</b> - whether that be
                                    technical skills, technological know-how, or
                                    just a new perspective. Advanced techniques
                                    on how to approach the <b>ENTIRE creative
                                    process</b> flow deep throughout the 14 modules.
                                </p>
                            </div>
                        </div>
                        <div className="checklist">
                            <Checkbox onClickHandler={onClickHandler} />
                            <div className="checklist-text">
                                <p>
                                    The “What’s NEXT in my Career”? Individual
                                    ✮⋆˙
                                </p>
                                <p>
                                    You're looking to <b>transition</b> into a creative
                                    career or <b>elevate</b> your current position.
                                    This course covers the <b>important aspects</b> of
                                    personal branding, client relations, and the
                                    key business elements of the creative
                                    industry.
                                </p>
                            </div>
                        </div>
                        <div className="checklist">
                            <Checkbox onClickHandler={onClickHandler} />
                            <div className="checklist-text">
                                <p>
                                    The Creative Entrepreneur and Freelancer ⋆˙⟡
                                </p>
                                <p>
                                    Solo creators, freelancers, and small
                                    business owners in the creative sector -
                                    gather round. Let’s master financial
                                    management, the <b>legal</b> and <b>squirrely  aspects </b>
                                    of freelancing, and learn strategies for
                                    building a <b>sustainable</b> and <b>diversified</b>
                                    personal business model.
                                </p>
                            </div>
                        </div>
                        <div className="checklist">
                            <Checkbox onClickHandler={onClickHandler} />
                            <div className="checklist-text">
                                <p>Influencers and Content Creators ⋆.˚—̳͟͞͞✰</p>
                                <p>
                                    Let’s <b>MAXIMIZE your impact</b> on platforms like
                                    Instagram, TikTok, and YouTube. We dissect
                                    and explain effective social media
                                    strategies, audience engagement, and brand
                                    collaboration opportunities. We all want to
                                    build and <b>monetize authentically</b>.
                                </p>
                            </div>
                        </div>
                        {/* <div className="checklist">
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
                        </div> */}
                    </div>
                    <button
                        disabled={!oneChecked}
                        onClick={scrollToCourseBanner}
                    >
                        Enroll Now
                    </button>
                </div>
                <div className="right-side">
                    <swiper-container
                        className="mySwiper"
                        ref={swiperElRef}
                        slides-per-view="1"
                        navigation="false"
                        loop="true"
                        autoplay="true"
                        effect="fade"
                    >
                        <swiper-slide>
                            <div className="carousel-img-container">
                                <img
                                    src="https://i.postimg.cc/FH9S6Mds/1.jpg"
                                    alt="slider content"
                                    loading="lazy"
                                />
                                <div className="swiper-lazy-preloader"></div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div className="carousel-img-container">
                                <img
                                    src="https://i.postimg.cc/PrbZ2XqR/2.jpg"
                                    alt="slider content"
                                    loading="lazy"
                                />
                                <div className="swiper-lazy-preloader"></div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div className="carousel-img-container">
                                <img
                                    src="https://i.postimg.cc/TYvgVLTb/3.jpg"
                                    alt="slider content"
                                    loading="lazy"
                                />
                                <div className="swiper-lazy-preloader"></div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div className="carousel-img-container">
                                <img
                                    src="https://i.postimg.cc/MpQw4Wxf/4.jpg"
                                    alt="slider content"
                                    loading="lazy"
                                />
                                <div className="swiper-lazy-preloader"></div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div className="carousel-img-container">
                                <img
                                    src="https://i.postimg.cc/6QxKxD5j/5.jpg"
                                    alt="slider content"
                                    loading="lazy"
                                />
                                <div className="swiper-lazy-preloader"></div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div className="carousel-img-container">
                                <img
                                    src="https://i.postimg.cc/W4yJht9h/6.jpg"
                                    alt="slider content"
                                    loading="lazy"
                                />
                                <div className="swiper-lazy-preloader"></div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div className="carousel-img-container">
                                <img
                                    src="https://i.postimg.cc/XNC9Bc63/7.jpg"
                                    alt="slider content"
                                    loading="lazy"
                                />
                                <div className="swiper-lazy-preloader"></div>
                            </div>
                        </swiper-slide>
                    </swiper-container>
                    {/* <div className="multiple-img-container mobile">
                        <img
                            src="https://i.postimg.cc/FH9S6Mds/1.jpg"
                            alt="slider content"
                            loading="lazy"
                        />
                        <img
                            src="https://i.postimg.cc/PrbZ2XqR/2.jpg"
                            alt="slider content"
                            loading="lazy"
                        />
                        <img
                            src="https://i.postimg.cc/TYvgVLTb/3.jpg"
                            alt="slider content"
                            loading="lazy"
                        />
                        <img
                            src="https://i.postimg.cc/MpQw4Wxf/4.jpg"
                            alt="slider content"
                            loading="lazy"
                        />
                        <img
                            src="https://i.postimg.cc/6QxKxD5j/5.jpg"
                            alt="slider content"
                            loading="lazy"
                        />
                        <img
                            src="https://i.postimg.cc/W4yJht9h/6.jpg"
                            alt="slider content"
                            loading="lazy"
                        />
                        <img
                            src="https://i.postimg.cc/XNC9Bc63/7.jpg"
                            alt="slider content"
                            loading="lazy"
                        />
                    </div> */}
                </div>
            </div>
        </section>
    );
};

export default TargetAudience;
