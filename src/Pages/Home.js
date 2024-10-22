import React from 'react';
import {Carousel,Container,Row, Col}  from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css';
import Contact from './Contact';

const Home = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,

    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
    const cards = [
        {
          img:  require ("../assets/dwcardicon.png"),
          title: 'Web Design & Development',
          text: 'Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.',
          link: '#'
        },
        {
          img:  require ("../assets/dwcardicon.png"),
          title: 'SEO',
          text: 'Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.',
          link: '#'
        },
        {
          img:  require ("../assets/dwcardicon.png"),
          title: 'Card Title 3',
          text: 'Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.',
          link: '#'
        },
        {
          img:  require ("../assets/dwcardicon.png"),
          title: 'Card Title 4',
          text: 'Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.',
          link: '#'
        },
        {
          img:  require ("../assets/dwcardicon.png"),
          title: 'Card Title 5',
          text: 'Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.',
          link: '#'
        },
        {
          img:  require ("../assets/dwcardicon.png"),
          title: 'Card Title 6',
          text: 'Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Aliquam dolor eget urna ultricies tincidunt.',
          link: '#'
        },
      ];
    const slides = [
        {
            src: require('../assets/dwcarousel.jpg'),
            alt: 'First slide',
            label: 'First slide label',
            text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
            buttonText1: 'Read More',
            buttonText2: 'Contact',
        },
        {
            src: require('../assets/dwcarousel.jpg'),
            alt: 'Second slide',
            label: 'Second slide label',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            buttonText1: 'Read More',
            buttonText2: 'Contact',
        },
        {
            src: require('../assets/dwcarousel.jpg'),
            alt: 'Third slide',
            label: 'Third slide label',
            text: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.',
            buttonText1: 'Read More',
            buttonText2: 'Contact',
        },
    ];

    return (
        <>
        <Container fluid className='g-0'>
            <div>
                <Carousel>
                    {slides.map((slide, index) => (
                        <Carousel.Item key={index}>
                            <img className="hm_cousel_img" src={slide.src} alt={slide.alt} />
                            <Carousel.Caption className="carousel_caption">
                                <h3>{slide.label}</h3>
                                <p>{slide.text}</p>
                                <div className='cr_btn_div'>
                                    {slide.buttonText1 && <button className='cr_btn'>{slide.buttonText1}</button>}
                                    {slide.buttonText2 && <button className='cr_btn'>{slide.buttonText2}</button>}
                                </div>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>

            <div className="cr_custom_bottom_container">
                <div className='cr_content_div'>
                    <span className='' style={{ color: "#1842b6", fontWeight: "700" }}>99</span>
                    <span>Success in getting happy <br /> customer</span>
                </div>

                <div className='cr_content_div'>
                    <span style={{ color: "#1842b6", fontWeight: "700" }}>99</span>
                    <span>Success in getting happy <br /> customer</span>
                </div>

                <div className='cr_content_div'>
                    <span style={{ color: "#1842b6", fontWeight: "700" }}>99</span>
                    <span>Success in getting happy <br /> customer</span>
                </div>

                <div className='cr_content_div'>
                    <span style={{ color: "#1842b6", fontWeight: "700" }}>99</span>
                    <span>Success in getting happy <br /> customer</span>
                </div>

            </div>
            </Container>

 <Container fluid className='g-0 hm_service_fluid' >
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

<Container className='g-0 hm_service_fluid '>
    <div className='text-center'>
    <p className='page_heading' style={{color:"#1842b6"}}>Our Service</p>
    <p className='page_subheading'>Services Built Specifically <br/>For Your Business</p>
    </div>
<Container className='hservice_card_container'>
<Row className=''>
        {cards.map((card, index) => (
          <Col md={4} className="mb-4 d-flex justify-content-center align-items-center" key={index}>
            <div className="card " >
              <img src={card.img} className="card-img-top" alt={card.title} />
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text ">{card.text}</p>
                <a href={card.link} className=" hmcard_btn  ">Read More</a>
              </div>
            </div>
          </Col>
        ))}
      </Row>
</Container>
      </Container>

      <Container fluid className='client_fluid'>
      <Container className='client_container'>
        <div className='clinet_heading_wrapper'>
          <p className='page_subheading'>What <span style={{ color: "#1842b6" }}>OUR CLIENTS</span> </p>
          <p className='page_subheading' style={{ marginTop: "-15px" }}>Are Saying</p>
        </div>

        <Slider {...settings} className='slider'>
         
          <div className='review_main_div '>
            <div className='flex_div'>
              <img src={require("../assets/c1.png")} alt="" />
              <p style={{ fontWeight: 600 }}>ankit yadav</p>
             </div>
            <div className='flex_div'>
              <img className='line' src={require("../assets/line.png")} alt="" />
              <p>Firm is having experience & good contacts, specially having all women partners expertise in diversified areas. Excellent designs and work, keep growing.</p>
            </div>
          </div>
            
          <div className='review_main_div'>
            <div className='flex_div' >
              <img src={require("../assets/c2.png")} alt="" />
              <p style={{ fontWeight: 600 }}>shivani gupta</p>
            </div>

            <div className='flex_div'>
              <img className='line' src={require("../assets/line.png")} alt="" />
              <p>Design Connect Studio provides excellent quality, affordable, and timely interior design. Highly recommended!</p>
             </div>
             </div>

             
          <div className='review_main_div'>
            <div className='flex_div'>
              <img src={require("../assets/c1.png")} alt="" />
              <p style={{ fontWeight: 600 }}>ankit yadav</p>
            </div>
            <div className='flex_div'>
              <img className='line' src={require("../assets/line.png")} alt="" />
              <p>Firm is having experience & good contacts, specially having all women partners expertise in diversified areas. Excellent designs and work, keep growing.</p>
            </div>
          </div>
          
         </Slider>
      </Container>
      </Container>

      <Container fuild className="hm_contact_fluid">
        <Contact/>
      </Container>
        </>
    );
};

export default Home;

            
          



// import React from 'react'
// import Carousel from 'react-bootstrap/Carousel';
// import "./Home.css"

// const Home = () => {
//   return (
//     <div>
//  <Carousel>
//       <Carousel.Item>
//         <img className='hm_cousel_img' src={require ("../assets/dwcarousel.jpg")} alt="" text="First slide" />
//         <Carousel.Caption className='carousel_caption'>
//           <h3>First slide label</h3>
//           <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//           <h3>First slide label</h3>
//           <div>
//             <button>Read More</button>
//           </div>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <img className='hm_cousel_img' src={require ("../assets/dwcarousel.jpg")} alt="" text="Second slide" />
//         <Carousel.Caption className='carousel_caption'>
//           <h3>Second slide label</h3>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//           <h3>First slide label</h3>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <img className='hm_cousel_img' src={require ("../assets/dwcarousel.jpg")} alt="" text="Third slide" />
//         <Carousel.Caption className='carousel_caption'>
//           <h3>Third slide label</h3>
//           <p>
//             Praesent commodo cursus magna, vel scelerisque nisl consectetur.
//           </p>
//           <h3>First slide label</h3>
//         </Carousel.Caption>
//       </Carousel.Item>
//     </Carousel>
//     </div>
//   )
// }

// export default Home