import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { RiWhatsappFill } from "react-icons/ri";

import "./Footer.css";

const Footer = () => {
    return (
        <Container fluid className="footer_fluid">
            <Container className="text-white footer_container">

                <Row className="footer_row">

                    {/* ================= BRAND / ABOUT ================= */}
                    <Col
                        className="footer_col footer_brand"
                        sm={12}
                        md={6}
                        lg={3}
                    >
                        <div className="footer_section">

                            <p className="footer_headings">
                                DexterityWorld
                            </p>

                            <p className="footer_description">
                                Delivering high-impact digital solutions,
                                custom web development, SEO strategies, and
                                performance marketing to help your business
                                scale and succeed online.
                            </p>

                            {/* Social Icons */}
                            <div className="footer_icon_div">

                                <a
                                    href="https://www.facebook.com/jmeduinnovationworld"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                >
                                    <FaFacebookF className="header_icon" />
                                </a>

                                <a
                                    href="https://www.instagram.com/jm_edu_innovation/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                >
                                    <FiInstagram className="header_icon" />
                                </a>

                                <a
                                    href="https://wa.me/7039571383"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="WhatsApp"
                                >
                                    <RiWhatsappFill className="header_icon" />
                                </a>

                                <a
                                    href="https://www.linkedin.com/company/jm-edu-innovation/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedinIn className="header_icon" />
                                </a>

                            </div>

                        </div>
                    </Col>


                    {/* ================= QUICK LINKS ================= */}
                    <Col
                        className="footer_col footer_quick"
                        sm={12}
                        md={6}
                        lg={2}
                    >
                        <div className="footer_section">

                            <p className="footer_headings">
                                Quick Links
                            </p>

                            <div className="footer_links">

                                <Link
                                    className="footer_atag"
                                    to="/"
                                >
                                    Home
                                </Link>

                                <Link
                                    className="footer_atag"
                                    to="/about"
                                >
                                    About Us
                                </Link>

                                <Link
                                    className="footer_atag"
                                    to="/career"
                                >
                                    Career
                                </Link>

                                <Link
                                    className="footer_atag"
                                    to="/contact"
                                >
                                    Contact Us
                                </Link>

                                <Link
                                    className="footer_atag"
                                    to="/contact"
                                >
                                    Support &amp; FAQs
                                </Link>

                            </div>

                        </div>
                    </Col>


                    {/* ================= SERVICES ================= */}
                    <Col
                        className="footer_col footer_services"
                        sm={12}
                        md={6}
                        lg={3}
                    >
                        <div className="footer_section">

                            <p className="footer_headings">
                                Services
                            </p>

                            <div className="footer_links">

                                <Link
                                    className="footer_atag footer_service_link"
                                    to="/marketing"
                                >
                                    Digital Marketing Strategy
                                </Link>

                                <Link
                                    className="footer_atag footer_service_link"
                                    to="/seo"
                                >
                                    Search Engine Optimization
                                </Link>

                                <Link
                                    className="footer_atag footer_service_link"
                                    to="/marketing"
                                >
                                    Social Media Marketing
                                </Link>

                                <Link
                                    className="footer_atag footer_service_link"
                                    to="/performance"
                                >
                                    Performance Marketing
                                </Link>

                                <Link
                                    className="footer_atag footer_service_link"
                                    to="/digital"
                                >
                                    Web Design &amp; Development
                                </Link>

                                <Link
                                    className="footer_atag footer_service_link"
                                    to="/creative"
                                >
                                    Creative &amp; Brand Communication
                                </Link>

                            </div>

                        </div>
                    </Col>


                    {/* ================= CONTACT ================= */}
                    <Col
                        className="footer_col footer_contact"
                        sm={12}
                        md={6}
                        lg={4}
                    >
                        <div className="footer_section">

                            <p className="footer_headings">
                                Contact Us
                            </p>

                            <div className="contact_details">

                                <p>
                                    11 Block, Rajendra Nagar
                                </p>

                                <p>
                                    Bareilly, Uttar Pradesh, India
                                </p>

                                <p>
                                    <a
                                        href="mailto:info@dexterityworld.com"
                                        className="contact_link"
                                    >
                                        info@dexterityworld.com
                                    </a>
                                </p>

                                <p>
                                    <a
                                        href="tel:+917055255255"
                                        className="contact_phone"
                                    >
                                        +91 7055255255
                                    </a>
                                </p>

                            </div>

                        </div>
                    </Col>

                </Row>

            </Container>
        </Container>
    );
};

export default Footer;