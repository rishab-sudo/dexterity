import React from 'react';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Navbar from './Components/Navbar';
import Header from './Components/Header';
import Footer from "./Components/Footer.js";
import ScrollToTop from "./Components/ScrollToTop";
import Home from "./Pages/Home.js";
import About from "./Pages/About.js";
import Contact from "./Pages/Contact.js";
import SEO from "./Pages/SEO.jsx";
import Digital from "./Pages/Digital.jsx";
import Marketing from "./Pages/Marketing.jsx";
import Creative from "./Pages/Creative.jsx";
import Performance from "./Pages/Performance.jsx";
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/seo" element={<SEO />} />
          <Route path="/digital" element={<Digital />} />
          <Route path="/website-designing" element={<Digital />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/creative" element={<Creative />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/service" element={<Digital />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
