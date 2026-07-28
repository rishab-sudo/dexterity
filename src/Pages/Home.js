import React from 'react';
import { Container } from 'react-bootstrap';
import HeroCarousel from '../Components/HeroCarousel';

import AboutSection from '../Components/HomeAbout';
import HomeService from '../Components/HomeService';
import Testimonials from '../Components/Testimonials';
import GetAQuote from '../Components/GetAQuote';
import FAQ from "../Components/FAQ"


const Home = () => {
  return (
    <>
      <Container fluid className='g-0'>
        <HeroCarousel />
     
      </Container>

      <AboutSection />
      <HomeService />
      <Testimonials/>
      <GetAQuote />
<FAQ/>
    </>
  );
};

export default Home;