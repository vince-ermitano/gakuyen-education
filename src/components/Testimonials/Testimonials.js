import React from "react";
import './Testimonials.css';

const Testimonials = () => {
    return (
        <div className="testimonials">
            <div className="slider">
                <input type="radio" name="slider" title="slide1" checked="checked" className="slider__nav" />
                <input type="radio" name="slider" title="slide2" className="slider__nav" />
                <input type="radio" name="slider" title="slide3" className="slider__nav" />
                <input type="radio" name="slider" title="slide4" className="slider__nav" />
                <div className="slider__inner">
                    <div className="slider__contents"><i className="slider__image fa fa-codepen"></i>
                        <h2 className="slider__caption">codepen</h2>
                        <p className="slider__txt">Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cupiditate omnis possimus illo quos, corporis minima!</p>
                    </div>
                    <div className="slider__contents"><i className="slider__image fa fa-newspaper-o"></i>
                        <h2 className="slider__caption">newspaper-o</h2>
                        <p className="slider__txt">Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cupiditate omnis possimus illo quos, corporis minima!</p>
                    </div>
                    <div className="slider__contents"><i className="slider__image fa fa-television"></i>
                        <h2 className="slider__caption">television</h2>
                        <p className="slider__txt">Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cupiditate omnis possimus illo quos, corporis minima!</p>
                    </div>
                    <div className="slider__contents"><i className="slider__image fa fa-diamond"></i>
                        <h2 className="slider__caption">diamond</h2>
                        <p className="slider__txt">Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cupiditate omnis possimus illo quos, corporis minima!</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Testimonials;