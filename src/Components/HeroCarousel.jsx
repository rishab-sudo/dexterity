import React from 'react';
import { Carousel } from 'react-bootstrap';
import './HeroCarousel.css';

const slides = [
  {
    src: require('../assets/dwcarousel.jpg'),
    alt: 'Web Development',
    label: 'Innovative IT Solutions For Your Business',
    text: 'We build scalable websites and applications that help your business grow online.',
    buttonText1: 'Read More',
    buttonText2: 'Contact',
  },
  {
    src: require('../assets/dwcarousel.jpg'),
    alt: 'App Development',
    label: 'Powerful App Development Services',
    text: 'From concept to launch, we craft mobile and web apps built for performance.',
    buttonText1: 'Read More',
    buttonText2: 'Contact',
  },
  {
    src: require('../assets/dwcarousel.jpg'),
    alt: 'Digital Growth',
    label: 'Driving Growth Through Technology',
    text: 'SEO, digital marketing, and IT consulting designed to scale with your business.',
    buttonText1: 'Read More',
    buttonText2: 'Contact',
  },
];

const HeroCarousel = () => {
  return (
    <Carousel>
      {slides.map((slide, index) => (
        <Carousel.Item key={index}>
          <img className="hm_cousel_img" src={slide.src} alt={slide.alt} />
          <Carousel.Caption className="carousel_caption">
            <h3>{slide.label}</h3>
            <p>{slide.text}</p>
            <div className='cr_btn_div'>
              {slide.buttonText1 && <button className='cr_btn'>{slide.buttonText1}</button>}
              {slide.buttonText2 && <button className='cr_btn'>{slide.buttonText2}</button>}
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HeroCarousel;