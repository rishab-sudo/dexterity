import React from 'react';
import { Container } from 'react-bootstrap';
import './HomeService.css';

const cards = [
  {
    img: require('../assets/gd-black.jpeg'),
    hoverImg: require('../assets/gd-color.jpeg'),
    title: 'Digital Marketing Strategy',
    text: 'Strategic planning and growth-focused digital solutions that help businesses build a strong online presence and achieve measurable results.',
  },
  {
    img: require('../assets/seo-black.jpeg'),
    hoverImg: require('../assets/seo-color.jpeg'),
    title: 'Search Engine Optimization',
    text: 'Improve visibility, attract qualified traffic, and increase long-term search performance with effective SEO strategies.',
  },
  {
    img: require('../assets/smm-black.jpeg'),
    hoverImg: require('../assets/smm-color.jpeg'),
    title: 'Social Media Marketing',
    text: 'Build brand awareness, engage your audience, and grow your community through creative and performance-driven social media campaigns.',
  },
  {
    img: require('../assets/pm-black.jpeg'),
    hoverImg: require('../assets/pm-color.jpeg'),
    title: 'Performance Marketing',
    text: 'Generate high-quality leads and maximise ROI through targeted paid advertising campaigns across search and social platforms.',
  },
  {
    img: require('../assets/web-black.jpeg'),
    hoverImg: require('../assets/web-color.jpeg'),
    title: 'Web Design & Development',
    text: 'Create fast, responsive, and conversion-focused websites that deliver seamless user experiences across all devices.',
  },
  {
    img: require('../assets/wm-black.jpeg'),
    hoverImg: require('../assets/wm-color.jpeg'),
    title: 'Creative & Brand Communication',
    text: 'Strengthen your brand identity with impactful graphic design, creative communication, and customer engagement solutions.',
  },
];

const HomeService = () => {
  return (
    <section className='industry-services-section'>
      <Container fluid className='g-0'>
        <div className='industry-header text-center'>
          <span className='about-tag eyebrow-text'>OUR SERVICES</span>
          <h2 className='section-heading text-white'>
            Complete Digital Growth Solutions
          </h2>
          <p className='section-subHeading text-white-50'>
            From strategy and SEO to paid advertising, web development, and
            creative branding-everything your business needs to grow online.
          </p>
        </div>

        <div className='industry-grid'>
          {cards.map((card, index) => (
            <div
              className='industry-card'
              key={index}
              style={{
                '--bg-image': `url(${card.img})`,
                '--hover-image': `url(${card.hoverImg})`,
              }}
            >
              <div className='industry-overlay'>
                <div className='industry-content'>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>

                  <a href='/' className='industry-btn'>
                    Explore
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HomeService;