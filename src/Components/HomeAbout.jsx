import React from 'react';
import { Container } from 'react-bootstrap';
import './HomeAbout.css';

const HomeAbout = () => {
  return (
    <Container fluid className='about-premium-section'>
      <Container className='about-premium-wrapper'>
        {/* Image Side */}
        <div className='about-image-wrap'>
          <img
            src={require('../assets/dwabout1.jpg')}
            alt='About HighTech Agency'
            className='about-image'
          />

          <div className='experience-card'>
            <h3>13+</h3>
            <span>Years Experience</span>
          </div>
        </div>

        {/* Content Side */}
        <div className='about-content'>
          <span className='about-tag'>ABOUT US</span>

          <h2 className='pageheading'>
            Award-Winning Digital <br />
            Marketing & IT Solutions
          </h2>

          <p className='pagedescription'>
            HighTech Agency helps businesses grow through modern web
            development, branding, SEO, performance marketing, and scalable
            digital solutions designed to deliver measurable business impact.
          </p>

          <p className='pagedescription'>
            We combine strategy, creativity, and technology to build fast,
            reliable, and conversion-focused products that are easy to manage
            and built for long-term growth.
          </p>

          <div className='about-stats'>
            <div className='stat-item'>
              <h4>250+</h4>
              <span>Projects Delivered</span>
            </div>

            <div className='stat-item'>
              <h4>120+</h4>
              <span>Happy Clients</span>
            </div>

            <div className='stat-item'>
              <h4>40+</h4>
              <span>Expert Team Members</span>
            </div>
          </div>

          <button className='premium-btn'>
            Explore More
            <span>→</span>
          </button>
        </div>
      </Container>
    </Container>
  )
}

export default HomeAbout;