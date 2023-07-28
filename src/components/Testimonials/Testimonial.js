import React from "react";
import './Testimonial.css';

const Testimonial = (props) => {

    return (
        <div className="testimonial-item">
            <p>{props.name}</p>
            <p>{props.testimonial}</p>
        </div>
    );
}

export default Testimonial;