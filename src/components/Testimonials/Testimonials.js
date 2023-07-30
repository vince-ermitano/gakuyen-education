import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
import Testimonial from './Testimonial';
import './Testimonials.css';

register();


const testimonials = [
    {
        name: "Vince Ermitano",
        testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        id: 1
    },
    {
        name: "Kai Lange",
        testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        id: 2
    },
    {
        name: "Peace Gates",
        testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        id: 3
    },
]

export const Testimonials = () => {
  const swiperElRef = useRef(null);

  useEffect(() => {
    // listen for Swiper events using addEventListener
    // swiperElRef.current.addEventListener('progress', (e) => {
    //   const [swiper, progress] = e.detail;
    //   console.log(progress);
    // });

    swiperElRef.current.addEventListener('slidechange', (e) => {
      console.log('slide changed');
    });
  }, []);

  return (
    <div className="testimonials-container page-section">
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