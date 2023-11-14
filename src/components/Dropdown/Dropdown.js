import React, { useEffect } from "react";
import "./Dropdown.css";

const Dropdown = () => {
    useEffect(() => {
        let selectContainer = document.querySelector(".select-container");
        let select = document.querySelector(".select");
        let input = document.getElementById("input");
        let options = document.querySelectorAll(".select-container .option");


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
    }, []);

    return (
        <div className="select-container">
            <div className="select">
                <input
                    type="text"
                    id="input"
                    placeholder="Payment Option"
                    readOnly
                />
            </div>
            <div className="option-container">
                <div className="option">
                    <label>One-Time Payment of $1495.00</label>
                </div>
                <div className="option">
                    <label>6 Month Installment Plan ($249/month)</label>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
