import React from 'react'
import "./Contact.css"
import { Container } from 'react-bootstrap'
import Contactform from "../Components/Contactform"
<<<<<<< HEAD

// Swap these for your real details
const contactDetails = [
  {
    label: 'Email',
    value: 'hello@hightechagency.com',
    href: 'mailto:hello@hightechagency.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '+1 (555) 234 7890',
    href: 'tel:+15552347890',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.9.6 2.7a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z" />
      </svg>
    ),
  },
  {
    label: 'Studio',
    value: '128 Market Street, San Francisco, CA',
    href: 'https://maps.google.com/?q=128+Market+Street+San+Francisco+CA',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M21 10.5c0 6.5-9 11.5-9 11.5s-9-5-9-11.5a9 9 0 1 1 18 0z" />
        <circle cx="12" cy="10.5" r="3" />
      </svg>
    ),
  },
]

const Contact = () => {
  return (
    <Container fluid className='contact_fluid'>

      {/* Main content */}
      <Container className='content_content_container'>

        <div className='contact_intro'>

          <ul className='contact_details_list'>
            {contactDetails.map((item) => (
              <li key={item.label} className='contact_details_item'>
                <a
                  href={item.href}
                  className='contact_details_link'
                  target={item.label === 'Studio' ? '_blank' : undefined}
                  rel={item.label === 'Studio' ? 'noopener noreferrer' : undefined}
                >
                  <span className='contact_details_icon'>{item.icon}</span>
                  <span className='contact_details_text'>
                    <span className='contact_details_label'>{item.label}</span>
                    <span className='contact_details_value'>{item.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className='contact_hours'>
            <span className='contact_hours_label'>Office Hours</span>
            <span className='contact_hours_value'>Mon &ndash; Fri, 9:00 AM &ndash; 6:00 PM PST</span>
          </div>

          <div className='contact_map'>
            <iframe
              title="Studio location"
              src="https://www.google.com/maps?q=128+Market+Street+San+Francisco+CA&output=embed"
              width="100%"
              height="220"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

        <div className='contact_form_card'>
          <h3 className='contact_form_title'>Send us a message</h3>
          <p className='contact_form_subtitle'>
            Fill out the form below and our team will reach out shortly.
          </p>
          <Contactform />
        </div>

      </Container>
    </Container>
=======
const Contact = () => {
  return (
 <Container fluid className='contact_fluid'>
<Container className='content_content_container'>
  <div>
    <img  src={require ("../assets/dwabout1.jpg")}alt=""/>
    </div>

    <div>
<Contactform/>
    </div>
</Container>
 </Container>
>>>>>>> 6c30f0b7cc8334ef48bf96b027dab2fdce147daa
  )
}

export default Contact