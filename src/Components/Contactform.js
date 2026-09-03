import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import './Contactform.css';

const Cf = () => {
  const form = useRef();

  const [formData, setFormData] = useState({
    fname: '',
    mobileNumber: '',
    email: '',
    service: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fname.trim()) {
      newErrors.fname = 'Please enter your name';
    } else if (!/^[A-Za-z ]{2,}$/.test(formData.fname)) {
      newErrors.fname = 'Enter a valid name';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Please enter mobile number';
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile number must be 10 digits';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter email address';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    emailjs
      .sendForm(
        'service_8h322oq',
        'template_ajwaoiy',
        form.current,
        '3LXSkbjCZ1SGhN6ns'
      )
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'Thank you! We will contact you shortly.',
          confirmButtonColor: '#fd7e14',
        });

        setFormData({
          fname: '',
          mobileNumber: '',
          email: '',
          service: '',
          message: '',
        });

        setErrors({});
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Failed!',
          text: 'Something went wrong. Please try again later.',
          confirmButtonColor: '#fd7e14',
        });
      });
  };

  return (
    <div className="contact-form-wrapper">
      <form ref={form} onSubmit={handleSubmit} className="form-card">
        <h2 className="form_heading section-heading">Get a Quote</h2>

        <div className="form-grid">
          <div className="field_errorbox">
            <label className="top_label">Full Name</label>
            <input
              type="text"
              name="fname"
              className="exp_form_fields"
              value={formData.fname}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Enter your full name"
            />
            {errors.fname && <p className="error">{errors.fname}</p>}
          </div>

          <div className="field_errorbox">
            <label className="top_label">Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              className="exp_form_fields"
              value={formData.mobileNumber}
              onChange={handleChange}
              maxLength={10}
              placeholder="Enter your mobile number"
            />
            {errors.mobileNumber && (
              <p className="error">{errors.mobileNumber}</p>
            )}
          </div>

          <div className="field_errorbox">
            <label className="top_label">Email Address</label>
            <input
              type="email"
              name="email"
              className="exp_form_fields"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Enter your email address"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="field_errorbox">
            <label className="top_label">Select Service</label>
            <select
              name="service"
              className="exp_form_fields"
              value={formData.service}
              onChange={handleChange}
            >
              <option value="">Choose a service</option>
              <option value="Clinical Genomics">Clinical Genomics</option>
              <option value="Research Genomics">Research Genomics</option>
              <option value="Agrigenomics">Agrigenomics</option>
              <option value="Bioinformatics">Bioinformatics</option>
            </select>
            {errors.service && <p className="error">{errors.service}</p>}
          </div>
        </div>

        <div className="field_errorbox full-width">
          <label className="top_label">Your Message</label>
          <textarea
            name="message"
            className="exp_form_fields mssg_field"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here..."
          />
          {errors.message && <p className="error">{errors.message}</p>}
        </div>

        <div className="submit_btndiv">
          <button className="form_submit_btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Cf;