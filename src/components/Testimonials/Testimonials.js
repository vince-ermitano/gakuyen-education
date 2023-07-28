import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
import Testimonial from './Testimonial';
import './Testimonials.css';

register();


const testimonials = [
    {
        name: "Vince Ermitano",
        testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        id: 1
    },
    {
        name: "Vince Ermitano",
        testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        id: 2
    },
    {
        name: "Vince Ermitano",
        testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        id: 3
    },
]

export const Testimonials = () => {
  const swiperElRef = useRef(null);

  useEffect(() => {
    // listen for Swiper events using addEventListener
    swiperElRef.current.addEventListener('progress', (e) => {
      const [swiper, progress] = e.detail;
      console.log(progress);
    });

    swiperElRef.current.addEventListener('slidechange', (e) => {
      console.log('slide changed');
    });
  }, []);

  return (
    <div className="testimonials-container">
      <h2>Testimonials</h2>
      <swiper-container ref={swiperElRef} slides-per-view="1" navigation="true">
        {testimonials.map((testimonial) => (
            <swiper-slide key={testimonial.id}>
                <Testimonial name={testimonial.name} testimonial={testimonial.testimonial}></Testimonial>
            </swiper-slide>
        ))}
      </swiper-container>
    </div>
  );
};

export default Testimonials;