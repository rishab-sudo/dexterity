import React, { useState, useEffect, useRef } from 'react';
import { Container } from "react-bootstrap"
import { GoPerson } from "react-icons/go"
import { MdOutlineMailOutline } from 'react-icons/md';
import { AiOutlinePhone, } from 'react-icons/ai';
import { SiMailgun } from 'react-icons/si';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import "./Contactform.css"

const Cf = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    fname: '',
    mobileNumber: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fname) {
      newErrors.fname = 'Name is required';
    }
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile number must be 10 digits';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message) {
      newErrors.message = 'Message is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      emailjs
        .sendForm(
          'service_8h322oq',
          'template_ajwaoiy',
          form.current,
          '3LXSkbjCZ1SGhN6ns'
        )
        .then(
          (result) => {
            console.log(result.text);
            // Use SweetAlert2 for success
            Swal.fire({
              icon: 'success',
              title: 'SUCCESS!',
              text: 'Your message has been sent successfully!',
            }).then(() => {
              setFormData({
                fname: '',
                mobileNumber: '',
                email: '',
                message: '',
              });
            });
          },
          (error) => {
            console.log(error.text);
            // Use SweetAlert2 for error
            Swal.fire({
              icon: 'error',
              title: 'FAILED...',
              text: 'Something went wrong. Please try again later.',
            });
          }
        );
    }
  };

  useEffect(() => {
    // Delay showing the form for 1 second
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (

    <form ref={form} onSubmit={handleSubmit} className="form">
      <Container> <p className='form_heading '>get a quote </p></Container>
      <div className="field_errorbox">
        <div className="exp_field_group">
          <input
            id=""
            required
            type="text"
            name="fname"
            className="exp_form_fields"
            value={formData.fname}
            onChange={handleChange}
            autoComplete="off"

          />
          <label className="exp_form_labels" htmlFor="fnameInput">
            Name
          </label>
          <img src={require("../assets/user.png")}
            style={{ height: '20px', width: '20px', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
          />
        </div>
        <div>{errors.fname && <p className="error">{errors.fname}</p>}</div>
      </div>

      <div className="field_errorbox">
        <div className="exp_field_group">
          <input
            required
            type="number"
            name="mobileNumber"
            className="exp_form_fields"
            value={formData.mobileNumber}
            onChange={handleChange}
            autoComplete="off"

          />
          <img src={require("../assets/call.png")}
            style={{ height: '20px', width: '20px', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
          />
          <label className="exp_form_labels" htmlFor="fnameInput">
            Mobile Number
          </label>
        </div>
        <div>
          {errors.mobileNumber && (
            <p className="error">{errors.mobileNumber}</p>
          )}
        </div>
      </div>

      <div className="field_errorbox">
        <div className="exp_field_group ">
          <input
            required
            type="email"
            name="email"
            className="exp_form_fields"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
          />
          <img src={require("../assets/email.png")}
            style={{ height: '20px', width: '20px', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
          />
          <label className="exp_form_labels" htmlFor="fnameInput">
            Email
          </label>
        </div>
        <div>{errors.email && <p className="error">{errors.email}</p>}</div>
      </div>

      <div className="field_errorbox">
        <div className="exp_field_group mss_field">
          <textarea
            required
            name="message"
            className="exp_form_fields mssg_field"
            value={formData.message}
            onChange={handleChange}
          />
          <img src={require("../assets/message.png")}
            style={{ height: '20px', width: '20px', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
          />
          <label className="exp_form_labels" htmlFor="fnameInput">
            Message
          </label>
        </div>
        <div>
          {errors.message && <p className="error">{errors.message}</p>}
        </div>
      </div>
      <div className="submit_btndiv">
        <button className="form_submit_btn" type="submit">
          Submit
        </button>
      </div>
    </form>
  )
}

export default Cf