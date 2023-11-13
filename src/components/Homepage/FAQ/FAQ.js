import React from "react";
import "./FAQ.css";
import FaqItem from "./FAQ_item";

const FAQ = () => {
    return (
        <section id="faq" className="page-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-questions-container">
                <section className="faq-group">
                    <FaqItem />
                    <FaqItem />
                    <FaqItem />
                    <FaqItem />
                </section>
                <section className="faq-group">
                    <FaqItem />
                    <FaqItem />
                    <FaqItem />
                    <FaqItem />
                </section>
            </div>
        </section>
    );
};

export default FAQ;
