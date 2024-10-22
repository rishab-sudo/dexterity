import { Route, Routes, BrowserRouter as Router, Link } from "react-router-dom"
import Navbar from './Components/Navbar';
import Header from './Components/Header';
import Home from "./Pages/Home.js"
import About from "./Pages/About.js"
import Service from "./Pages/Service.js"
import Contact from "./Pages/Contact.js"
import Footer from "./Components/Footer.js"
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
<Navbar/>
<Router>
  <Routes>
  <Route path="*" element={<Home />} />
  <Route path="/Home" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/service" element={<Service />} />
  {/* <Route path="/JEE" element={<JEE />} />
  <Route path="/Neet" element={<Neet />} />
  <Route path="/Smart" element={<Smart />} /> */}
  <Route path="/contact" element={<Contact />} />
</Routes>
</Router>
<Footer/>

    </div>
  );
}

export default App;
