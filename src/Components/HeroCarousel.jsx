import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './HeroCarousel.css';

const slides = [
  {
    src: require('../assets/hero1.png'),
    alt: 'Web Development',
    label: 'Innovative IT Solutions For Your Business',
    text: 'We build scalable websites and applications that help your business grow online.',
    buttonText1: 'Read More',
    buttonLink1: '/about',
    buttonText2: 'Contact',
    buttonLink2: '/contact',
  },
  {
    src: require('../assets/hero2.png'),
    alt: 'App Development',
    label: 'Powerful App Development Services',
    text: 'From concept to launch, we craft mobile and web apps built for performance.',
    buttonText1: 'Read More',
    buttonLink1: '/about',
    buttonText2: 'Contact',
    buttonLink2: '/contact',
  },
  {
    src: require('../assets/about.png'),
    alt: 'Digital Growth',
    label: 'Driving Growth Through Technology',
    text: 'SEO, digital marketing, and IT consulting designed to scale with your business.',
    buttonText1: 'Read More',
    buttonLink1: '/about',
    buttonText2: 'Contact',
    buttonLink2: '/contact',
  },
];

const SLIDE_DURATION = 4000;

const HeroCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <div className="hero_carousel_wrap">
      <AnimatePresence mode="sync">
        <motion.img
          key={`img-${index}`}
          className="hm_cousel_img"
          src={slide.src}
          alt={slide.alt}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      <div className="carousel_overlay" />

      <div className="carousel_caption">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${index}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h3>{slide.label}</h3>
            <p>{slide.text}</p>
            <div className="cr_btn_div">
              {slide.buttonText1 && (
                <Link to={slide.buttonLink1} className="cr_btn">
                  {slide.buttonText1}
                </Link>
              )}
              {slide.buttonText2 && (
                <Link to={slide.buttonLink2} className="cr_btn">
                  {slide.buttonText2}
                </Link>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="carousel_dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`carousel_dot ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;