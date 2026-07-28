import React from 'react'
import { Container } from 'react-bootstrap';
import { MdEmail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { RiWhatsappFill } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa";
import "./Header.css"

const SOCIAL_LINKS = [
  { icon: FaFacebookF, href: "https://www.facebook.com/jmeduinnovationworld" },
  { icon: FiInstagram, href: "https://www.instagram.com/jm_edu_innovation/" },
  { icon: RiWhatsappFill, href: "https://wa.me/7039571383" },
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/company/jm-edu-innovation/" },
];

const TICKER_MESSAGES = [
  "Let's build a thriving future for your business.",
  "Boost your growth with our expert guidance.",
  "Empower your brand with winning strategies.",
];

const Header = () => {
  return (
    <div className='header_main_div'>
      <Container className="head_content_container">
        <div className='d-flex justify-content-start align-items-center'>
          <MdEmail className='email_icon' />
          <a style={{ textDecoration: "none" }} href="mailto:info@gmail.com">
            <h5 className='header_text text-white-50'>info@gmail.com</h5>
          </a>
        </div>

        <div className='header_float_text'>
          <span className='scrolling-text'>
            {TICKER_MESSAGES.join(' \u2022 ')}
          </span>
        </div>

        <div className='header_icons_div'>
          {SOCIAL_LINKS.map(({ icon: Icon, href }) => (
            <a key={href} style={{ textDecoration: "none" }} href={href} target="_blank" rel="noreferrer">
              <Icon className='header_icon' />
            </a>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Header