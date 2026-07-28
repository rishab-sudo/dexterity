import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './GetAQuote.css';

const LeadAuditSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    subject: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const validateForm = () => {
    const { name, email, phone, service, subject, message } = formData

    if (!name || !email || !phone || !service || !subject || !message) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill in all required fields.',
      })
      return false
    }

    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
      })
      return false
    }

    const phoneRegex = /^[6-9]\\d{9}$/
    if (!phoneRegex.test(phone)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Phone',
        text: 'Please enter a valid 10-digit Indian mobile number.',
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      const response = await fetch('https://yourdomain.com/send-mail.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.status === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'Thank you! Our team will contact you shortly.',
          confirmButtonColor: '#ff8a00',
        })

        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          subject: '',
          message: '',
        })
      } else {
        throw new Error()
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong',
        text: 'Please try again later.',
      })
    }
  }

  return (
    <section className='audit-section'>
      <div className='audit-container'>
        <div className='audit-form-side'>
          <p className='audit-mini-title'>Let’s grow your business together</p>
          <div className='audit-line' />

          <h2 className='audit-heading'>
            Get a Free SEO & Digital Marketing Audit
          </h2>

          <form className='audit-form' onSubmit={handleSubmit}>
            <div className='form-grid'>
              <div className='form-group'>
                <label>Your Name*</label>
                <input
                  type='text'
                  name='name'
                  placeholder='Your name'
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className='form-group'>
                <label>Your Email*</label>
                <input
                  type='email'
                  name='email'
                  placeholder='you@example.com'
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className='form-group'>
                <label>Your Phone*</label>
                <input
                  type='tel'
                  name='phone'
                  placeholder='9876543210'
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className='form-group'>
                <label>Service Interested In*</label>
                <select
                  name='service'
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value=''>Select a service</option>
                  <option>SEO Optimization</option>
                  <option>Google Ads / PPC</option>
                  <option>Social Media Marketing</option>
                  <option>Website Design & Development</option>
                  <option>Branding & Creative Services</option>
                </select>
              </div>
            </div>

            <div className='form-group'>
              <label>Subject*</label>
              <input
                type='text'
                name='subject'
                placeholder='How can we help?'
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className='form-group'>
              <label>Your Message*</label>
              <textarea
                rows='5'
                name='message'
                placeholder='Tell us about your business, target audience, and marketing goals...'
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <button type='submit' className='audit-btn'>
              Get Free Audit
            </button>
          </form>
        </div>

        <div className='audit-content-side'>
          <p className='audit-mini-title dark'>
            Driven by Strategy, Powered by Results
          </p>
          <div className='audit-line dark' />

          <h2 className='audit-content-heading'>
            Your Growth-Focused Digital Marketing Partner
          </h2>

          <h4>SEO • Google Ads • Social Media • Web Solutions</h4>

          <p>
            We help brands increase their visibility, generate qualified
            leads, and improve conversions through data-driven SEO,
            high-performing Google Ads campaigns, and strategic social media
            marketing.
          </p>

          <p>
            From technical SEO and local search optimization to PPC campaign
            management and conversion-focused landing pages, our team creates
            digital strategies that deliver measurable business growth.
          </p>

          <p>
            Whether you’re a startup, local business, e-commerce store, or an
            established company, we provide customised marketing solutions that
            combine creativity, analytics, and performance.
          </p>

          <div className='audit-stats'>
            <div>
              <h3>300+</h3>
              <span>Projects Delivered</span>
            </div>
            <div>
              <h3>120+</h3>
              <span>Happy Clients</span>
            </div>
            <div>
              <h3>13+</h3>
              <span>Years Experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LeadAuditSection