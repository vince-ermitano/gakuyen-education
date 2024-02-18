import React from "react";
import "./MoneyBackGuarantee.css";
import { VscClose } from "react-icons/vsc";

const MoneyBackGuarantee = () => {
    const handleClickOutsideDialog = (event) => {
        const moneyBackDialog = document.getElementById("money_back_dialog");

        if (event.target === moneyBackDialog) {
            moneyBackDialog.close();
        }
    };

    return (
        <section id="money-back-guarantee" className="page-section">
            <div className="money-back-guarantee-container" data-aos="fade-up">
                {/* <h2>
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
                <Link to="/">Read More</Link> */}
                <h2>Money Back Guarantee</h2>
                <h3>
                    When I sat down and wrote this course - I compiled
                    everything I wish I had known years ago. How to create
                    impactful content and monetize my work while building an
                    authentic and unique voice in the digital space.
                </h3>
                <hr></hr>
                <p>
                    These tips and secrets would have saved me hundreds of hours
                    and tens of thousands of dollars in mistakes and ignorance.
                </p>
                <p>
                    If you’ve completed the course and, for any reason, you find
                    yourself dissatisfied, we’re here to help. To
                    process your refund, we ask that you provide a brief but
                    specific explanation of what didn't meet your expectations.
                    This helps us understand your needs better and improve our
                    course for future learners. Please send us an email within
                    the first 7 days after your purchase detailing your reasons
                    for dissatisfaction, and we’ll ensure you get a full
                    refund.*
                </p>
                <br></br>
                <button
                    onClick={() =>
                        document.getElementById("money_back_dialog").showModal()
                    }
                >
                    Read More*
                </button>
            </div>
            <dialog id="money_back_dialog" onClick={handleClickOutsideDialog}>
                <div className="dialog__content">
                    <VscClose
                        onClick={() =>
                            document.getElementById("money_back_dialog").close()
                        }
                    />
                    <h2>Refund Information</h2>
                    <p>
                    Note: Refund requests without a specified reason may not be eligible for a full refund.
                    </p>
                    <p>
                        Following the approval of a refund request, you will
                        receive a reimbursement equivalent to the entire course
                        fee, excluding any processing charges associated with
                        the Stripe payment processor. The precise amount of
                        these fees is contingent upon the selected payment
                        method and whether currency conversion to USD was
                        necessary at the time of payment.
                    </p>
                    <p className="more_info">
                        For more information on Stripe's processing fees, here
                        are some helpful links:
                    </p>
                    <ul>
                        <li>
                            <a
                                href="https://stripe.com/docs/refunds#:~:text=Additionally%2C%20Stripe%20doesn't%20return,original%20transaction%20if%20it's%20refunded."
                                target="_blank"
                                rel="noreferrer"
                            >
                                Refund and Cancel Payments | Stripe
                                Documentation
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://stripe.com/pricing/local-payment-methods"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Processing Fees Breakdown | Stripe Official Site
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://stripe.com/pricing"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Pricing & Fees | Stripe Official Site
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://support.stripe.com/questions/understanding-fees-for-refunded-payments#:~:text=To%20address%20these%20underlying%20payment%20processing%20costs%20and%20continue%20providing%20these%20services%20as%20part%20of%20our%20standard%20pricing,%20Stripe%20does%20not%20return%20our%20fees%20when%20a%20payment%20is%20refunded."
                                target="_blank"
                                rel="noreferrer"
                            >
                                Understanding fees for refunded payments |
                                Stripe Help & Support
                            </a>
                        </li>
                    </ul>
                </div>
            </dialog>
        </section>
    );
};

export default MoneyBackGuarantee;
