import React from 'react'
import { Container } from 'react-bootstrap';
import { MdEmail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { RiWhatsappFill } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa";
import "./Header.css"

const Header = () => {
  return (
    <div className='header_main_div'>
<Container className="head_content_container">
 <div className='d-flex justify-content-start align-items-center'>
 <MdEmail  className='email_icon'/>
 <a style={{textDecoration:"none"}} href="mailto:rishabdutt4@gmail.com"><h5 className='header_text text-white-50'>info@gmail.com</h5></a>
</div>

<div className='text-white-50 header_float_text'>
<text className='scrolling-text'>"Let's build a thriving future for your business."</text>
<text className='scrolling-text'>"Boost your growth with our expert guidance."</text>
<text className='scrolling-text'>"Empower your brand with winning strategies."</text>
</div>

<div className='header_icons_div'>
<a style={{textDecoration:"none"}} href="https://www.facebook.com/jmeduinnovationworld"><FaFacebookF className='header_icon' /></a>
<a style={{textDecoration:"none"}} href="https://www.instagram.com/jm_edu_innovation/"><FiInstagram className='header_icon' /></a>
<a style={{textDecoration:"none"}} href="https://wa.me/7039571383"><RiWhatsappFill className='header_icon' /></a>
<a style={{textDecoration:"none"}} href="https://www.linkedin.com/company/jm-edu-innovation/"><FaLinkedinIn className='header_icon' /></a>
{/* <a className='footer_links' href="tel:7039571383"><p>+91-7039571383</p></a> */}
 </div>
</Container>
    </div>
  )
}

export default Header