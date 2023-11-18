import React from "react";
import "./WhatWeOffer.css";
import { BsCamera } from "react-icons/bs";

const WhatWeOffer = () => {
    return (
        <section id="what-we-offer" data-aos="fade-up">
            <h2>What We Offer</h2>
            <div className="offer-container" data-aos="fade-up">
                <div className="offer offer-1">
                    <div className="image-container">
                        <img
                            src="https://images.squarespace-cdn.com/content/v1/61a46cc601b4c521a42206d3/1645247526671-F8QXSKJO9WXL86EJ8CC6/DSC07768-1-1.jpeg?format=750w"
                            alt="What we offer"
                        ></img>
                    </div>
                    <div className="text-container">
                        <div className="title-icon-container">
                            <h3>Offer 1</h3>
                            <BsCamera />
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>
                </div>
                <div className="offer offer-2">
                    <div className="image-container">
                        <img
                            src="https://images.squarespace-cdn.com/content/v1/61a46cc601b4c521a42206d3/1645248050136-SZU0QNE11HSW5HMNKRIH/Night1-A.jpeg?format=750w"
                            alt="What we offer"
                        ></img>
                    </div>
                    <div className="text-container">
                        <div className="title-icon-container">
                            <h3>Offer 2</h3>
                            <BsCamera />
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>
                </div>
                <div className="offer offer-3">
                    <div className="image-container">
                        <img
                            src="https://images.squarespace-cdn.com/content/v1/61a46cc601b4c521a42206d3/1645247604182-0PY2E2N98QFQI5ITG1BJ/gak-02567-copy-1.jpeg?format=1500w"
                            alt="What we offer"
                        ></img>
                    </div>
                    <div className="text-container">
                        <div className="title-icon-container">
                            <h3>Offer 3</h3>
                            <BsCamera />
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatWeOffer;
