import React, { useEffect, useRef, useState } from 'react'
import { Container } from "react-bootstrap"
import { Link } from 'react-router-dom'
import "./About.css"
import PageBanner from '../Components/PageBanner'
import Falling from '../Components/Falling'
import OurWork from '../Components/OurWork'

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
    <>
       <PageBanner
        title="About Us"
        currentPage="About Us"
        videoSrc="/videos/contact-banner.mp4"
      />

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
          <h6 className='page_heading eyebrow-text'>About Us</h6>
          <h5 className='section-heading'>
            About DexterityWorld And Its<br /> Innovative IT Solutions
          </h5>
          <p className='section-para'>
            At DexterityWorld, we empower ambitious brands to thrive in the digital age. 
            We engineer high-performance web applications, drive organic search rankings through advanced SEO, 
            and design conversion-focused marketing campaigns tailored to your business goals.
          </p>
          <p className='section-para'>
            With a team of seasoned strategists, developers, and creative designers, we turn complex technical 
            challenges into scalable, profitable digital experiences that deliver real, measurable ROI.
          </p>
          <Link to='/contact' className='page_btn habout_btn' style={{ textDecoration: 'none', display: 'inline-block' }}>
            Contact Us
          </Link>
        </div>
      </Container>

      <Falling/>


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

      <OurWork/>

    </Container>
    </>
  )
}

export default About