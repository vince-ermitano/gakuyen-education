import React, { useState } from "react";
import "./FAQ_item.css";
import { BiPlus, BiMinus } from "react-icons/bi";

const FAQ_item = () => {

    const [ active, setActive ] = useState(false);

    const toggleAnswer = (e) => {
        const faqItem = e.target.closest(".faq-item");
        faqItem.classList.toggle("active");

        if (active) {
            setActive(false);
        } else {
            setActive(true);
        }
    }
    return (
        <div className="faq-item" onClick={(e) => toggleAnswer(e)}>
            <div className="faq-item-question">
                <p>Question</p>
                {(active ? <BiMinus /> : <BiPlus />)}
            </div>
            <div className="faq-item-answer">
                <p>Answer</p>
            </div>
        </div>
    );
};

export default FAQ_item;
