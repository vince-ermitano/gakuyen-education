import React, { useEffect } from "react";
import "./Dropdown.css";

const Dropdown = (props) => {
    const idForInput = props.idForInput;
    const idForDropdown = props.idForDropdown;

    console.log(idForInput);
    console.log(idForDropdown);

    const info = {
        module: {
            placeholder: "Module Selection",
            options: [
                "Mindset for Creative Success",
                "Elevating Your Filmmaking and Photography",
                "Building Your Personal Brand",
                "Content Monetization and Revenue Streams",
                "The Business of Creative Filmmaking and Photography",
                "Influencer Marketing and Brand Collection",
                "Editing Efficiency and High-Quality Output",
                "Client Relations and Professional Etiquette",
                "AI in Creative Filmmaking and Photography",
                "Storytelling Beyond the Lens",
                "Finding Inspiration and Staying Relevant",
                "Building a Supportive Creative Community",
                "Creating Impactful Social Media Content",
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
                    return (
                        <div className="option" key={index}>
                            <label>{option}</label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Dropdown;
