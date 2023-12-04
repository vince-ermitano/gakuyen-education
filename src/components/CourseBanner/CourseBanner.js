import React from "react";
import "./CourseBanner.css";
import Dropdown from "../Dropdown/Dropdown";
import { toggleLoginSidebar } from "../../features/SidebarSlice";
import { useDispatch } from "react-redux";
import { handleAddToCart } from "../../helpers";
import { toast } from "sonner";

const CourseBanner = () => {
    const dispatch = useDispatch();

    const claimModule = () => {
        dispatch(toggleLoginSidebar());
    };

    return (
        <section id="course-banner" className="page-section" data-aos="fade-up">
            <div id="course-banner-content" data-aos="fade-up">
                {/* <h2>The Odyssey</h2> */}
                <img src="/theodysseywhite_no_padding.png" alt="The Odyssey" />
                <h3>Creative Masterclass</h3>
                <hr></hr>
                <p>
                    Step into the spotlight of your creative career with our
                    comprehensive Film and Photography Masterclass, where
                    cutting-edge techniques meet entrepreneurial mastery.
                    Elevate your art, monetize your passion, and join a
                    community of innovators shaping the future of digital
                    storytelling!
                </p>
                <p>
                    You can choose to buy The Odyssey with a one-time payment,
                    or split the total cost over 4-6 months, completely interest
                    free.
                </p>
                <div id="select-financing-group">
                    <Dropdown
                        type={"finance"}
                        idForInput={"financing-option"}
                        idForDropdown={"financing-dropdown"}
                    />
                    <button
                        data-item-id={"MC-01"}
                        onClick={(e) => {
                            if (document.getElementById("financing-option").value === "") {
                                toast("Please select a financing option");
                                return;
                            }

                            if (document.getElementById("financing-option").value.includes("Month")) {
                                alert("To pay in monthly installments\n 1. Click on 'Proceed to Checkout'\n 2. On the Stripe checkout page, select Klarna as your payment method and follow the instructions on the screen")
                            }

                            handleAddToCart(e, dispatch);
                        }}
                    >
                        Add to Cart
                    </button>
                </div>
                <h3 className="claim-heading">Claim Your Free Module NOW!</h3>
                <button className="claim-btn" onClick={claimModule}>
                    CLAIM
                </button>
            </div>
        </section>
    );
};

export default CourseBanner;
