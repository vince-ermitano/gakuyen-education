import React, { useEffect } from "react";
import "./Dropdown.css";

const Dropdown = (props) => {
    const idForInput = props.idForInput;
    const idForDropdown = props.idForDropdown;

    const info = {
        module: {
            placeholder: "Module Selection",
            options: [
                [
                    "Module 1: Cultivating a Growth Mindset and Balancing Artistry",
                    "M-01",
                ],
                [
                    "Module 2: Essential Tools for Photography and Filmmaking",
                    "M-02",
                ],
                [
                    "Module 3: Building Your Brand in the Creative Market",
                    "M-03",
                ],
                ["Module 4: Financial and Legal Acumen for Creatives", "M-04"],
                ["Module 5: Mastering Client Interaction", "M-05"],
                ["Module 6: The Art of the Shoot", "M-06"],
                ["Module 7: Crafting the Story in Post-Production", "M-07"],
                ["Module 8: Excellence in Client Relations", "M-08"],
                ["Module 9: Influencer Marketing Mastery", "M-09"],
                ["Module 10: AI in Creativity", "M-10"],
                ["Module 11: Staying Inspired and Relevant", "M-11"],
                ["Module 12: Fostering a Creative Community", "M-12"],
                ["Module 13: Impactful Social Media Content", "M-13"],
                [
                    "Module 14: Balancing Personal and Commercial Projects",
                    "M-14",
                ],
            ],
        },
        finance: {
            placeholder: "Financing Option",
            options: [
                "One-Time Payment of $1495.00",
                "6 Month Installment Plan ($249/month)",
            ],
        },
    };

    let relatedInfo = info[props.type];

    useEffect(() => {
        let selectContainer = document.querySelector(
            `#${idForDropdown}.select-container`
        );
        let select = selectContainer.querySelector(".select");
        let input = selectContainer.querySelector("input");
        let options = selectContainer.querySelectorAll(
            ".select-container .option"
        );

        select.onclick = () => {
            selectContainer.classList.toggle("active");
        };

        options.forEach((e) => {
            e.addEventListener("click", () => {
                input.value = e.innerText;
                selectContainer.classList.remove("active");
                options.forEach((e) => {
                    e.classList.remove("selected");
                });
                e.classList.add("selected");
            });
        });

        return () => {
            options.forEach((e) => {
                e.removeEventListener("click", () => {
                    input.value = e.innerText;
                    selectContainer.classList.remove("active");
                    options.forEach((e) => {
                        e.classList.remove("selected");
                    });
                    e.classList.add("selected");
                });
            });
        };
    }, [idForDropdown]);

    return (
        <div className="select-container" id={idForDropdown}>
            <div className="select">
                <input
                    type="text"
                    id={idForInput}
                    placeholder={relatedInfo.placeholder}
                    readOnly
                />
            </div>
            <div className="option-container">
                {/* <div className="option">
                    <label>One-Time Payment of $1495.00</label>
                </div>
                <div className="option">
                    <label>6 Month Installment Plan ($249/month)</label>
                </div> */}

                {relatedInfo.options.map((option, index) => {

                    if (props.type === "module") {
                        return (
                            <div
                                className="option"
                                key={index}
                                data-module={option[1]}
                                onClick={(e) => props.handleModuleSelection(e)}
                            >
                                <label>{option[0]}</label>
                            </div>
                        );
                    }

                    return (
                        <div
                            className="option"
                            key={index}
                        >
                            <label>{option}</label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Dropdown;
