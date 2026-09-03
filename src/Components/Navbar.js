import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Navbar.css";

const SERVICE_LINKS = [
  { label: "SEO", href: "/seo" },
  { label: "Website Designing", href: "/digital" },
  { label: "Marketing", href: "/marketing" },
  { label: "Creative & Branding", href: "/creative" },
  { label: "Performance Marketing", href: "/performance" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const location = useLocation();

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 180);
  };

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(false);
    setDropdownOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Close dropdown & mobile menu on route change
  useEffect(() => {
    setDropdownOpen(false);
    setIsOpen(false);
  }, [location.pathname]);

  const isServiceActive = SERVICE_LINKS.some(link => location.pathname === link.href);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light nav_container">
        <div className="container-fluid">
          <Link className="navbar-brand nav_text" to="/">DexterityWorld</Link>

          {/* Desktop nav links */}
          <div className="collapse navbar-collapse navlink_div d-none d-lg-flex" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link nav_text ${location.pathname === '/' || location.pathname === '/home' ? 'active' : ''}`}
                  to="/"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link nav_text ${location.pathname === '/about' ? 'active' : ''}`}
                  to="/about"
                >
                  About
                </Link>
              </li>

              <li
                className={`nav-item dropdown custom-dropdown ${dropdownOpen ? 'show' : ''}`}
                ref={dropdownRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`nav-link dropdown-toggle nav_text border-0 bg-transparent ${isServiceActive ? 'active-service' : ''}`}
                  id="navbarDropdown"
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  aria-expanded={dropdownOpen}
                >
                  Services
                </button>
                <ul className={`dropdown-menu custom-dropdown-menu ${dropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                  {SERVICE_LINKS.map(link => (
                    <li key={link.href}>
                      <Link
                        className={`dropdown-item custom-dropdown-item ${location.pathname === link.href ? 'active-dropdown' : ''}`}
                        to={link.href}
                        onClick={() => setDropdownOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link nav_text ${location.pathname === '/contact' ? 'active' : ''}`}
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Query info - hidden on small screens */}
          <div className='query_div d-none d-lg-flex'>
            <div>
              <img className='query_icon' src={require("../assets/dwcall1.png")} alt="" />
            </div>
            <div className='d-flex flex-column justify-content-start align-items-start text-white-50'>
              <h6 className='nav_text_small'>Have any query?</h6>
              <a href="tel:+917055255255" className='nav_text_small text-decoration-none'>Call : +91 7055255255</a>
            </div>
          </div>

          {/* Hamburger - mobile only, right side */}
          <button className="hamburger_btn d-lg-none" type="button" onClick={openMenu} aria-label="Open menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Slide-in mobile menu */}
      <div className={`mobile_overlay ${isOpen ? 'show' : ''}`} onClick={closeMenu}></div>
      <div className={`mobile_slider ${isOpen ? 'open' : ''}`}>
        <div className="mobile_slider_top">
          <Link to="/" className="navbar-brand nav_text" onClick={closeMenu}>DexterityWorld</Link>
          <button className="close_btn" onClick={closeMenu} aria-label="Close menu">&times;</button>
        </div>

        <div className="mobile_slider_middle">
          <Link className={`mobile_link ${location.pathname === '/' || location.pathname === '/home' ? 'active-mobile-link' : ''}`} to="/" onClick={closeMenu}>
            Home
          </Link>
          <Link className={`mobile_link ${location.pathname === '/about' ? 'active-mobile-link' : ''}`} to="/about" onClick={closeMenu}>
            About
          </Link>

          <div className="mobile_services_section">
            <span className="mobile_link_heading">Services</span>
            <div className="mobile_services_list">
              {SERVICE_LINKS.map(link => (
                <Link
                  key={link.href}
                  className={`mobile_sublink ${location.pathname === link.href ? 'active-mobile-sublink' : ''}`}
                  to={link.href}
                  onClick={closeMenu}
                >
                  <span className="bullet-dot">•</span> {link.label}
                </Link>
              ))}
            </div>
          </div>

          <Link className={`mobile_link ${location.pathname === '/contact' ? 'active-mobile-link' : ''}`} to="/contact" onClick={closeMenu}>
            Contact
          </Link>
        </div>

        <div className="mobile_slider_bottom">
          <img className='query_icon' src={require("../assets/dwcall1.png")} alt="" />
          <div className='d-flex flex-column'>
            <h6 className='nav_text_small'>Have any query?</h6>
            <a href="tel:+917055255255" className='nav_text_small'>Call : +91 7055255255</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

