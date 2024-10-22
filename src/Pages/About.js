import React from 'react'
import {Container} from "react-bootstrap"
import "./About.css"

const About = () => {
  return (
    <Container fluid className='g-0 about_fluid '>
    <Container className='habout_content_container '>
<div>
    <img src={require ("../assets/dwabout1.jpg")} alt=""/>
</div>
<div className='habout_text_div'>
    <h6 className='page_heading' style={{color:"#1842b6"}}>About Us</h6>
    <h5 className='page_subheading'>About HighTech Agency And It's <br/> Innovative IT Solutions</h5>
    <p className='page_text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur quis purus ut interdum. Pellentesque aliquam dolor eget urna ultricies tincidunt. Nam volutpat libero sit amet leo cursus, ac viverra eros tristique. Morbi quis quam mi. Cras vel gravida eros. Proin scelerisque quam nec elementum viverra. Suspendisse viverra hendrerit diam in tempus. Etiam gravida justo nec erat vestibulum, et malesuada augue laoreet.</p>
    <p className='page_text'>Pellentesque aliquam dolor eget urna ultricies tincidunt. Nam volutpat libero sit amet leo cursus, ac viverra eros tristique. Morbi quis quam mi. Cras vel gravida eros. Proin scelerisque quam nec elementum viverra. Suspendisse viverra hendrerit diam in tempus.</p>
    <button className='page_btn habout_btn'> More Details</button>
    </div>
      </Container>
      </Container>
  )
}

export default About