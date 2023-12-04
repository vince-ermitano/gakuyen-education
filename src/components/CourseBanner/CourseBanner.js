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
                <h3>Creative Masterclass ✶ ࣪˖࿐ *</h3>
                <hr></hr>
                <p>
                    <b>Comprehensive</b> wouldn’t do it justice. 14 Modules on{" "}
                    <b>every aspect</b> of the creative process from mindset and
                    shooting techniques to building an <b>AUTHENTIC voice</b>{" "}
                    and <b>monetize</b> your sweat and tears.
                </p>
                <p>
                    The Creator Economy is growing. Let’s <b>lead the charge</b>
                    .{" "}
                </p>
                <p>
                    You can choose to buy The Odyssey with a one-time payment…
                    or split the total cost over 6 months,{" "}
                    <b>completely interest-free</b>.
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
                            if (
                                document.getElementById("financing-option")
                                    .value === ""
                            ) {
                                toast("Please select a financing option");
                                return;
                            }

                            if (
                                document
                                    .getElementById("financing-option")
                                    .value.includes("Month")
                            ) {
                                alert(
                                    'To check if you qualify for financing, please click on the Affirm icon at the bottom of your cart.'
                                );
                            }

                            handleAddToCart(e, dispatch);
                        }}
                    >
                        Add to Cart
                    </button>
                </div>
                <h3 className="claim-heading">
                    Want a FREE MODULE to see what it’s like?{" "}
                </h3>
                <button className="claim-btn" onClick={claimModule}>
                    CLAIM HERE ˘͈ᵕ˘͈
                </button>
            </div>
        </section>
    );
};

export default CourseBanner;
