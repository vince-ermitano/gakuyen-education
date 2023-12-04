import React from "react";
import "./MoneyBackGuarantee.css";
import { Link } from "react-router-dom";

const MoneyBackGuarantee = () => {
    return (
        <section id="money-back-guarantee" className="page-section">
            <div className="money-back-guarantee-container" data-aos="fade-up">
                <h2>
                    Our Unwavering Commitment to Your Satisfaction and Risk-Free
                    Investment
                </h2>
                <h3>
                    We’re dedicated to making this course a decision you feel
                    confident about – we believe you should be enthusiastic
                    about embarking on this journey. 😊
                </h3>
                <hr></hr>
                <p>
                    When we say “complete the course,” we mean engaging with all
                    the primary modules. If you’ve done this and, for any
                    reason, you find yourself dissatisfied, we’re here to help.
                    Send us an email within the first 30 days after your
                    purchase, and we’ll ensure you get a full refund.
                </p>
                <p>
                    Note that our refund policy is in effect only if you’ve gone
                    through the entire course and you explain your reason(s) for
                    opting out in your email to us.
                </p>
                <br></br>
                <Link to="/">Read More</Link>
            </div>
        </section>
    );
};

export default MoneyBackGuarantee;
