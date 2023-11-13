import React from "react";
import "./FAQ.css";
import FaqItem from "./FAQ_item";

const FAQ = () => {
    return (
        <section id="faq" className="page-section">
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
        </section>
    );
};

export default FAQ;
