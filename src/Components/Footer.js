import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebookF } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { RiWhatsappFill } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
    return (
        <Container fluid className='footer_fluid'>
            <Container className="text-white">
                <Row className="d-flex justify-content-start align-items-start text-start" >
                    
                    <Col className="footer_col" sm={8} md={4} lg={3} >
                        <div className="">
                            <p className='footer_headings'>DexterityWorld</p>
                            <p className=''>
                                Delivering high-impact digital solutions, custom web development, SEO strategies, and performance marketing to help your business scale and succeed online.
                            </p>
                            <div className='footer_icon_div'>
                                <a style={{textDecoration:"none"}} href="https://www.facebook.com/jmeduinnovationworld" target="_blank" rel="noopener noreferrer"><FaFacebookF className='header_icon' /></a>
                                <a style={{textDecoration:"none"}} href="https://www.instagram.com/jm_edu_innovation/" target="_blank" rel="noopener noreferrer"><FiInstagram className='header_icon' /></a>
                                <a style={{textDecoration:"none"}} href="https://wa.me/7039571383" target="_blank" rel="noopener noreferrer"><RiWhatsappFill className='header_icon' /></a>
                                <a style={{textDecoration:"none"}} href="https://www.linkedin.com/company/jm-edu-innovation/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn className='header_icon' /></a>
                            </div>
                        </div>
                    </Col>
            
                    <Col className="footer_col" sm={8} md={4} lg={3} >
                        <div>
                            <p className='footer_headings'>Quick Links</p>
                            <Link className='footer_atag' to="/about"><p>About Us</p></Link>
                            <Link className='footer_atag' to="/digital"><p>Web Development</p></Link>
                            <Link className='footer_atag' to="/seo"><p>SEO Services</p></Link>
                            <Link className='footer_atag' to="/marketing"><p>Digital Marketing</p></Link>
                            <Link className='footer_atag' to="/performance"><p>Performance Marketing</p></Link>
                            <Link className='footer_atag' to="/creative"><p>Creative & Branding</p></Link>
                            <Link className='footer_atag' to="/contact"><p>Contact Us</p></Link>
                        </div>
                    </Col>

                    <Col className="footer_col" sm={8} md={4} lg={3} >
                        <div>
                            <p className='footer_headings'>Help & Policies</p>
                            <Link className='footer_atag' to="/contact"><p>Terms of Use</p></Link>
                            <Link className='footer_atag' to="/contact"><p>Privacy Policy</p></Link>
                            <Link className='footer_atag' to="/contact"><p>Support & FAQs</p></Link>
                        </div>
                    </Col>
            
                    <Col className="footer_col" sm={8} md={4} lg={3} >
                        <div>
                            <p className='footer_headings'>Contact Us</p>
                            <p className=''>11 Block, Rajendra Nagar</p>
                            <p className=''>Bareilly, Uttar Pradesh, India</p>
                            <p className=''>
                                <a href="mailto:rishabdutt4@gmail.com" style={{ color: '#fff', textDecoration: 'none' }}>
                                    info@dexterityworld.com
                                </a>
                            </p>
                            <p className=''>
                                <a href="tel:+917055255255" style={{ color: '#ff8a00', textDecoration: 'none', fontWeight: 600 }}>
                                    +91 7055255255
                                </a>
                            </p>
                        </div>
                    </Col>
              
                </Row>
            </Container>
        </Container>
    );
};

export default Footer;

              

             


            