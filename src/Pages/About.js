<<<<<<< HEAD
import React, { useEffect, useRef, useState } from 'react'
import { Container } from "react-bootstrap"
import "./About.css"

// Swap these for your real numbers
const stats = [
  { value: 8, suffix: '+', label: 'Years in digital marketing' },
  { value: 240, suffix: '+', label: 'Campaigns launched' },
  { value: 120, suffix: '+', label: 'Brands we\'ve grown' },
  { value: 96, suffix: '%', label: 'Client retention rate' },
]

// Swap these for your real client names / logo images
const brands = [
  'NORTHWIND', 'VERA & CO', 'ORBITAL', 'FIELDNOTE',
  'HALCYON', 'DRIFTLABS', 'MERIDIAN', 'PALETTE',
]

// Counts a number up from 0 to its target once it scrolls into view.
const useCountUp = (target, duration = 1400) => {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const hasRun = useRef(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true
          if (prefersReducedMotion) {
            setValue(target)
            return
          }
          const start = performance.now()
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [target, duration])

  return [ref, value]
}

const Stat = ({ value, suffix, label }) => {
  const [ref, count] = useCountUp(value)
  return (
    <div className="about_stat" ref={ref}>
      <span className="about_stat_number">
        {count}
        <span className="about_stat_suffix">{suffix}</span>
      </span>
      <span className="about_stat_label">{label}</span>
    </div>
  )
}

const About = () => {
  return (
    <Container fluid className='g-0 about_fluid'>

      {/* ---------- Hero ---------- */}
      <Container className='habout_content_container'>
        <div className='habout_image_div'>
          <img src={require("../assets/dwabout1.jpg")} alt="Our team at work" />
          <div className='habout_image_badge'>
            <span className='habout_badge_dot' />
            Actively growing 40+ brands
          </div>
        </div>

        <div className='habout_text_div'>
          <h6 className='page_heading'>About Us</h6>
          <h5 className='page_subheading'>
            About HighTech Agency And Its<br /> Innovative IT Solutions
          </h5>
          <p className='page_text'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur
            quis purus ut interdum. Pellentesque aliquam dolor eget urna ultricies
            tincidunt. Nam volutpat libero sit amet leo cursus, ac viverra eros
            tristique. Morbi quis quam mi. Cras vel gravida eros.
          </p>
          <p className='page_text'>
            Pellentesque aliquam dolor eget urna ultricies tincidunt. Nam volutpat
            libero sit amet leo cursus, ac viverra eros tristique. Morbi quis quam
            mi. Cras vel gravida eros. Proin scelerisque quam nec elementum viverra.
          </p>
          <button className='page_btn habout_btn'>More Details</button>
        </div>
      </Container>

      {/* ---------- Stats / experience strip ---------- */}
      <div className='about_stats_section'>
        <Container className='about_stats_container'>
          {stats.map((s) => (
            <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </Container>
      </div>

      {/* ---------- Brands worked with ---------- */}
      <div className='about_brands_section'>
        <p className='brands_eyebrow'>Trusted by teams at</p>
        <div className='brands_marquee'>
          <div className='brands_track'>
            {[...brands, ...brands].map((name, i) => (
              <span className='brand_chip' key={`${name}-${i}`}>{name}</span>
            ))}
          </div>
        </div>
      </div>

    </Container>
=======
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
>>>>>>> 6c30f0b7cc8334ef48bf96b027dab2fdce147daa
  )
}

export default About