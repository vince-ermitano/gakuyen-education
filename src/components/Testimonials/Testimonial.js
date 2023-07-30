import React from "react";
import './Testimonial.css';
import { CgQuote } from 'react-icons/cg';

const Testimonial = (props) => {

    return (
        <div className="testimonial-item">
            <p>{props.name}</p>
            <CgQuote />
            <p>{props.testimonial}</p>
        </div>
    );
}

export default Testimonial;