import React from 'react'
import "./Contact.css"
import { Container } from 'react-bootstrap'
import Contactform from "../Components/Contactform"
const Contact = () => {
  return (
 <Container fluid className='contact_fluid'>
<Container className='content_content_container'>
  <div>
    <img  src={require ("../assets/dwabout1.jpg")}alt=""/>
    </div>

    <div>
<Contactform/>
    </div>
</Container>
 </Container>
  )
}

export default Contact