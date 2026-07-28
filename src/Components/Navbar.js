import React, { useState } from 'react'
import "./Navbar.css"

const NAV_LINKS = [
  { label: "Home", href: "/home" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SERVICE_LINKS = [
  { label: "Action", href: "#abc" },
  { label: "Another action", href: "#def" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light nav_container">
        <div className="container-fluid">
          <a className="navbar-brand nav_text" href="#">DexterityWorld</a>

          {/* Desktop nav links */}
          <div className="collapse navbar-collapse navlink_div d-none d-lg-flex" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              {NAV_LINKS.slice(0, 2).map(link => (
                <li className="nav-item" key={link.href}>
                  <a className="nav-link active nav_text" aria-current="page" href={link.href}>{link.label}</a>
                </li>
              ))}

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle nav_text" href="/service" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Services
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {SERVICE_LINKS.map(link => (
                    <li key={link.href}><a className="dropdown-item" href={link.href}>{link.label}</a></li>
                  ))}
                </ul>
              </li>

              {NAV_LINKS.slice(2).map(link => (
                <li className="nav-item" key={link.href}>
                  <a className="nav-link active nav_text" aria-current="page" href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Query info - hidden on small screens */}
          <div className='query_div d-none d-lg-flex'>
            <div>
              <img className='query_icon' src={require("../assets/dwcall1.png")} alt="" />
            </div>
            <div className='d-flex flex-column justify-content-start align-items-start text-white-50'>
              <h6 className='nav_text_small'>Have any query?</h6>
              <h6 className='nav_text_small'>Call : +91 7055255255</h6>
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
          <span className="navbar-brand nav_text">DexterityWorld</span>
          <button className="close_btn" onClick={closeMenu} aria-label="Close menu">&times;</button>
        </div>

        <div className="mobile_slider_middle">
          {NAV_LINKS.map(link => (
            <a key={link.href} className="mobile_link" href={link.href} onClick={closeMenu}>{link.label}</a>
          ))}
          <span className="mobile_link_heading">Services</span>
          {SERVICE_LINKS.map(link => (
            <a key={link.href} className="mobile_sublink" href={link.href} onClick={closeMenu}>{link.label}</a>
          ))}
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
  )
}

export default Navbar