import React from 'react';
import { Container } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Testimonials.css';

const reviews = [
  {
    img: require('../assets/c1.png'),
    name: 'Ankit Yadav',
    review: 'Firm is having experience & good contacts, specially having all women partners expertise in diversified areas. Excellent designs and work, keep growing.',
  },
  {
    img: require('../assets/c2.png'),
    name: 'Shivani Gupta',
    review: 'Design Connect Studio provides excellent quality, affordable, and timely interior design. Highly recommended!',
  },
  {
    img: require('../assets/c1.png'),
    name: 'Ankit Yadav',
    review: 'Firm is having experience & good contacts, specially having all women partners expertise in diversified areas. Excellent designs and work, keep growing.',
  },
];

const Testimonials = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    ],
  };

  return (
    <Container fluid className='client_fluid'>
      <Container className='client_container'>
        <div className='clinet_heading_wrapper'>
          <p className='section-heading'>What <span style={{ color: '#1842b6' }}>OUR CLIENTS</span></p>
          <p className='section-heading' style={{ marginTop: '-15px' }}>Are Saying</p>
        </div>

        <Slider {...settings} className='slider'>
          {reviews.map((review, index) => (
            <div className='review_main_div' key={index}>
              <div className='flex_div'>
                <img src={review.img} alt={review.name} />
                <p style={{ fontWeight: 600 }}>{review.name}</p>
              </div>
              <div className='flex_div'>
                <img className='line' src={require('../assets/line.png')} alt="" />
                <p>{review.review}</p>
              </div>
            </div>
          ))}
        </Slider>
      </Container>
    </Container>
  );
};

export default Testimonials;