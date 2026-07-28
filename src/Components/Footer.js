import React from 'react'
import { Link } from "react-router-dom"
import { Container,Row, Col } from 'react-bootstrap'
import { MdEmail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { RiWhatsappFill } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa";
import "./Footer.css"

const Footer = () => {
    return (
        <Container fluid className='footer_fluid'>
            <Container className="text-white">
                <Row className="d-flex justify-content-start align-items-start text-start" >
                    
                    <Col className="footer_col" sm={8} md={4} lg={3} >
                        <div className="">
                            <p className='footer_headings'> HighTech</p>
                            <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta facere delectus qui placeat inventore consectetur
                                repellendus optio debitis.</p>
                            <div className='footer_icon_div'>
                            <a style={{textDecoration:"none"}} href="https://www.facebook.com/jmeduinnovationworld"><FaFacebookF className='header_icon' /></a>
<a style={{textDecoration:"none"}} href="https://www.instagram.com/jm_edu_innovation/"><FiInstagram className='header_icon' /></a>
<a style={{textDecoration:"none"}} href="https://wa.me/7039571383"><RiWhatsappFill className='header_icon' /></a>
<a style={{textDecoration:"none"}} href="https://www.linkedin.com/company/jm-edu-innovation/"><FaLinkedinIn className='header_icon' /></a>
                            </div>
                        </div>
                    </Col>
            
            <Col className="footer_col" sm={8} md={4} lg={3} >
                        <div>
                            <p className='footer_headings' >Short Links</p>
                                <a className='footer_atag' href="/about"> <p>About us</p></a>
                                <a className='footer_atag' href="/service"> <p>Our Services</p></a>
                                <a className='footer_atag' href="/contact"> <p>Contact Us</p></a>
                          
                        </div>
                    </Col>

                    <Col className="footer_col" sm={8} md={4} lg={3} >
                        <div>
                            <p className='footer_headings'>Help Links</p>
                           
                                <a className='footer_atag' href="/contact"> <p>Terms of use</p></a>
                                <a className='footer_atag' href="/contact"> <p>Privacy Policy</p></a>
                                <a className='footer_atag' href="/contact"> <p>FAQs</p></a>
                          
                        </div>
                    </Col>
            
                    <Col className="footer_col" sm={8} md={4} lg={3} >
                        <div>
                            <p className='footer_headings'>Contact Us</p>
                            <p className=''> 11 Block, Rajendra Nagar </p>
                            <p className=''>Bareilly, Uttar Pradesh, India</p>
                            <p className=''>info@gmail.com</p>
                        </div>
                    </Col>
              
</Row>
            </Container>
        </Container>
    )
}

export default Footer

              

             


            