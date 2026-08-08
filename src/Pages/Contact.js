import React from "react";
import "./Contact.css";
import { Container } from "react-bootstrap";
import Contactform from "../Components/Contactform";
import { Phone, Mail, MapPin } from "lucide-react";
import PageBanner from "../Components/PageBanner";

const Contact = () => {
  return (
    <>
    <PageBanner
        title="Contact Us"
        currentPage="Contact Us"
        videoSrc="/videos/contact-banner.mp4"
      />
    

    <div className="contact_page">
      <Container className="contact_top_container">
        <div className="contact_top_grid">
          <div className="contact_top_item">
            <div className="contact_top_icon">
              <Phone />
            </div>
            <span className="contact_top_label">Phone</span>
            <a href="tel:+919999999999" className="contact_top_value">
              +91 99999 99999
            </a>
          </div>

          <div className="contact_top_divider" />

          <div className="contact_top_item">
            <div className="contact_top_icon">
              <Mail />
            </div>
            <span className="contact_top_label">Email</span>
            <a href="mailto:info@example.com" className="contact_top_value">
              info@example.com
            </a>
          </div>

          <div className="contact_top_divider" />

          <div className="contact_top_item">
            <div className="contact_top_icon">
              <MapPin />
            </div>
            <span className="contact_top_label">Address</span>
            <p className="contact_top_value contact_top_address">
              Leads Genetics, Bareilly, Uttar Pradesh, India
            </p>
          </div>
        </div>
      </Container>

      <Container className="contact_form_section">
        <div className="contact_form_card">
         

          <Contactform />
        </div>
      </Container>

      <Container className="contact_map_section">
        <div className="contact_map_card">
          <iframe
            title="Leads Genetics Location"
            src="https://www.google.com/maps?q=Bareilly,Uttar+Pradesh,India&output=embed"
            width="100%"
            height="420"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Container>
    </div>
        </>
  );
};

export default Contact;