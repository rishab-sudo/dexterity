import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', to: '/home' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const SERVICE_LINKS = [
  { label: 'Web Design & Development', to: '/services/web-design-development' },
  { label: 'SEO Optimization', to: '/services/seo-optimization' },
  { label: 'Social Media Marketing', to: '/services/social-media-marketing' },
  { label: 'Performance Marketing', to: '/services/performance-marketing' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light nav_container">
        <div className="container-fluid">
          {/* Logo */}
          <Link className="navbar-brand nav_text" to="/">
            DexterityWorld
          </Link>

          {/* Desktop nav links */}
          <div
            className="collapse navbar-collapse navlink_div d-none d-lg-flex"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              {NAV_LINKS.slice(0, 2).map((link) => (
                <li className="nav-item" key={link.to}>
                  <Link className="nav-link nav_text" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}

              {/* Services Dropdown */}
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle nav_text btn btn-link border-0 p-0"
                  id="navbarDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  type="button"
                >
                  Services
                </button>

                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {SERVICE_LINKS.map((link) => (
                    <li key={link.to}>
                      <Link className="dropdown-item" to={link.to}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {NAV_LINKS.slice(2).map((link) => (
                <li className="nav-item" key={link.to}>
                  <Link className="nav-link nav_text" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Query info - hidden on small screens */}
          <div className="query_div d-none d-lg-flex">
            <div>
              <img
                className="query_icon"
                src={require('../assets/dwcall1.png')}
                alt="Phone support icon"
              />
            </div>

            <div className="d-flex flex-column justify-content-start align-items-start text-white-50">
              <h6 className="nav_text_small">Have any query?</h6>
              <a href="tel:+917055255255" className="nav_text_small text-decoration-none">
                Call : +91 7055255255
              </a>
            </div>
          </div>

          {/* Hamburger - mobile only */}
          <button
            className="hamburger_btn d-lg-none"
            type="button"
            onClick={openMenu}
            aria-label="Open menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`mobile_overlay ${isOpen ? 'show' : ''}`}
        onClick={closeMenu}
      ></div>

      {/* Mobile slider */}
      <div className={`mobile_slider ${isOpen ? 'open' : ''}`}>
        <div className="mobile_slider_top">
          <Link className="navbar-brand nav_text" to="/" onClick={closeMenu}>
            DexterityWorld
          </Link>

          <button
            className="close_btn"
            onClick={closeMenu}
            aria-label="Close menu"
            type="button"
          >
            &times;
          </button>
        </div>

        <div className="mobile_slider_middle">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              className="mobile_link"
              to={link.to}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}

          <span className="mobile_link_heading">Services</span>

          {SERVICE_LINKS.map((link) => (
            <Link
              key={link.to}
              className="mobile_sublink"
              to={link.to}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mobile_slider_bottom">
          <img
            className="query_icon"
            src={require('../assets/dwcall1.png')}
            alt="Phone support icon"
          />

          <div className="d-flex flex-column">
            <h6 className="nav_text_small">Have any query?</h6>
            <a href="tel:+917055255255" className="nav_text_small text-decoration-none">
              Call : +91 7055255255
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;