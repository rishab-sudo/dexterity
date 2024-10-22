import React from 'react'
import "./Navbar.css"

const Navbar = () => {
  return (
    <div>
     <nav className="navbar navbar-expand-lg navbar-light nav_container">
  <div className="container-fluid">
    <a className="navbar-brand nav_text" href="#">DexterityWorld</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse navlink_div" id="navbarSupportedContent" >
      <ul className="navbar-nav  mb-2 mb-lg-0 ">
        <li className="nav-item">
          <a className="nav-link active nav_text " aria-current="page" href="/home">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active nav_text" aria-current="page" href="/about">About</a>
        </li>
       
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle nav_text" href="/service" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Services
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#abc">Action</a></li>
            <li><a className="dropdown-item" href="#def">Another action</a></li>
          </ul>
        </li>

        <li className="nav-item">
          <a className="nav-link active nav_text" aria-current="page" href="/contact">Contact</a>
        </li>
      </ul>
 </div>
     
 <div className='query_div'>
        <div>
          <img className='query_icon' src={ require ("../assets/dwcall1.png")} alt=""/>
        </div>
        <div className='d-flex flex-column justify-content-start align-items-start text-white-50'>
<h5 className='nav_text'> Have any query ?</h5>
<h5 className='nav_text'>Call : +91 7055255255 </h5>

        </div>
      </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar