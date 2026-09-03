import React, { useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './HomeAbout.css';

// Rolling number counter hook
const useCounter = (target, duration = 1600) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();

          const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * target));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [target, duration]);

  return [ref, count];
};

const AnimatedStat = ({ target, suffix, label }) => {
  const [ref, count] = useCounter(target);
  return (
    <div className='stat-item' ref={ref}>
      <h4>{count}{suffix}</h4>
      <span>{label}</span>
    </div>
  );
};

const ExperienceCard = ({ target, suffix, label }) => {
  const [ref, count] = useCounter(target);
  return (
    <div className='experience-card' ref={ref}>
      <h3>{count}{suffix}</h3>
      <span>{label}</span>
    </div>
  );
};

const HomeAbout = () => {
  return (
    <Container fluid className='about-premium-section'>
      <Container className='about-premium-wrapper'>
        {/* Image Side */}
        <div className='about-image-wrap'>
          <img
            src={require('../assets/dwabout1.jpg')}
            alt='About DexterityWorld'
            className='about-image'
          />

          <ExperienceCard target={13} suffix='+' label='Years Experience' />
        </div>

        {/* Content Side */}
        <div className='about-content'>
          <span className='about-tag eyebrow-text'>ABOUT US</span>

          <h2 className='section-heading'>
            Award-Winning Digital <br />
            Marketing & IT Solutions
          </h2>

          <p className='section-para'>
            DexterityWorld helps businesses grow through modern web
            development, branding, SEO, performance marketing, and scalable
            digital solutions designed to deliver measurable business impact.
          </p>

          <p className='section-para'>
            We combine strategy, creativity, and technology to build fast,
            reliable, and conversion-focused products that are easy to manage
            and built for long-term growth.
          </p>

          <div className='about-stats'>
            <AnimatedStat target={250} suffix='+' label='Projects Delivered' />
            <AnimatedStat target={120} suffix='+' label='Happy Clients' />
            <AnimatedStat target={40} suffix='+' label='Expert Team Members' />
          </div>

          <Link to='/about' className='premium-btn' style={{ textDecoration: 'none' }}>
            Explore More
            <span>→</span>
          </Link>
        </div>
      </Container>
    </Container>
  );
};

export default HomeAbout;