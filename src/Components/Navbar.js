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

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Career", href: "/career" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const location = useLocation();

  // Open dropdown
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setDropdownOpen(true);
  };

  // Close dropdown with small delay
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 180);
  };

  // Mobile menu
  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsOpen(false);
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Close mobile menu and dropdown after route change
  useEffect(() => {
    setDropdownOpen(false);
    setIsOpen(false);
  }, [location.pathname]);

  // Check active service
  const isServiceActive = SERVICE_LINKS.some(
    (link) => location.pathname === link.href
  );

  const isPathActive = (href) =>
    href === "/"
      ? location.pathname === "/" || location.pathname === "/home"
      : location.pathname === href;

  return (
    <div className="dw_navbar_wrap">

      {/* ================= TOP UTILITY BAR ================= */}
      <div className="top_bar">
        <div className="top_bar_inner">

          {/* Logo + tagline */}
          <Link to="/" className="brand_block" onClick={closeMenu}>
            <span className="brand_text">
              Dexterity<span className="brand_accent">World</span>
            </span>
            <span className="brand_tagline">
              DIGITAL MARKETING AGENCY &middot; BAREILLY
            </span>
          </Link>

          {/* Right side: phone / services / CTA */}
          <div className="top_bar_actions d-none d-lg-flex">

            <a href="tel:+917055255255" className="phone_link">
              <svg
                className="phone_icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.6 10.8c1.4 2.8 3.7 5.1 6.5 6.5l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.4 21 3 13.6 3 4.6c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1L6.6 10.8Z"
                  fill="currentColor"
                />
              </svg>
              <span>7055255255</span>
            </a>

            {/* Free Consultation -> Career page */}
            <Link to="/career" className="consultation_btn">
              <span>Free Consultation</span>
              <svg
                className="arrow_icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          {/* Mobile Hamburger */}
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
      </div>

      {/* ================= DESKTOP NAV LINK ROW ================= */}
      <nav className="nav_row d-none d-lg-flex">
        <ul className="nav_row_list">

          <li className="nav-item">
            <Link
              className={`nav-link nav_text ${isPathActive("/") ? "active" : ""}`}
              to="/"
            >
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link nav_text ${isPathActive("/about") ? "active" : ""}`}
              to="/about"
            >
              About Us
            </Link>
          </li>

          {/* Services Dropdown */}
          <li
            className={`nav-item dropdown custom-dropdown ${dropdownOpen ? "show" : ""}`}
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`nav-link nav_text border-0 bg-transparent ${
                isServiceActive ? "active-service" : ""
              }`}
              id="navbarDropdown"
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-expanded={dropdownOpen}
            >
              Services
              <svg
                className="chevron_icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <ul
              className={`dropdown-menu custom-dropdown-menu ${dropdownOpen ? "show" : ""}`}
              aria-labelledby="navbarDropdown"
            >
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    className={`dropdown-item custom-dropdown-item ${
                      location.pathname === link.href ? "active-dropdown" : ""
                    }`}
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
              className={`nav-link nav_text ${isPathActive("/contact") ? "active" : ""}`}
              to="/contact"
            >
              Contact Us
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link nav_text ${isPathActive("/career") ? "active" : ""}`}
              to="/career"
            >
              Career
            </Link>
          </li>

        </ul>
      </nav>


      {/* ================= MOBILE MENU ================= */}

      {/* Overlay */}
      <div
        className={`mobile_overlay ${isOpen ? "show" : ""}`}
        onClick={closeMenu}
      ></div>

      {/* Slider */}
      <div className={`mobile_slider ${isOpen ? "open" : ""}`}>

        {/* Mobile Header */}
        <div className="mobile_slider_top">
          <Link to="/" className="navbar-brand nav_text" onClick={closeMenu}>
            DexterityWorld
          </Link>

          <button
            className="close_btn"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="mobile_slider_middle">

          {NAV_LINKS.filter((l) => l.label !== "Contact Us" && l.label !== "Career").map(
            (link) => (
              <Link
                key={link.href}
                className={`mobile_link ${isPathActive(link.href) ? "active-mobile-link" : ""}`}
                to={link.href}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            )
          )}

          {/* Services */}
          <div className="mobile_services_section">
            <span className="mobile_link_heading">Services</span>

            <div className="mobile_services_list">
              {SERVICE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  className={`mobile_sublink ${
                    location.pathname === link.href ? "active-mobile-sublink" : ""
                  }`}
                  to={link.href}
                  onClick={closeMenu}
                >
                  <span className="bullet-dot">&bull;</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            className={`mobile_link ${isPathActive("/contact") ? "active-mobile-link" : ""}`}
            to="/contact"
            onClick={closeMenu}
          >
            Contact Us
          </Link>

          <Link
            className={`mobile_link ${isPathActive("/career") ? "active-mobile-link" : ""}`}
            to="/career"
            onClick={closeMenu}
          >
            Career
          </Link>

          {/* Free Consultation -> Career (mobile) */}
          <Link
            className="consultation_btn mobile_consultation_btn"
            to="/career"
            onClick={closeMenu}
          >
            <span>Free Consultation</span>
            <svg
              className="arrow_icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

        </div>

        {/* Mobile Contact */}
        <div className="mobile_slider_bottom">
          <img
            className="query_icon"
            src={require("../assets/dwcall1.png")}
            alt=""
          />

          <div className="d-flex flex-column">
            <h6 className="nav_text_small">Have any query?</h6>
            <a href="tel:+917055255255" className="nav_text_small">
              Call : +91 7055255255
            </a>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Navbar;