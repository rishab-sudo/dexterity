import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import './GetAQuote.css';

/* ------------------------------------------------------------------ */
/* Falling pills — inline, no external component needed.               */
/* Colored pills drop from above and settle with a spring bounce the   */
/* instant this container scrolls into view.                          */
/* ------------------------------------------------------------------ */

const SERVICE_TAGS = [
  { text: '#SEO', gradient: 'linear-gradient(120deg,#22d3ee,#0ea5e9)', color: '#0f172a' },
  { text: '#GoogleAds', gradient: 'linear-gradient(120deg,#fb7185,#f43f5e)', color: '#4c0519' },
  { text: '#SocialMedia', gradient: 'linear-gradient(120deg,#a78bfa,#818cf8)', color: '#1e1b4b' },
  { text: '#WebDesign', gradient: 'linear-gradient(120deg,#86efac,#38bdf8)', color: '#0f172a' },
  { text: '#Branding', gradient: 'linear-gradient(120deg,#fcd34d,#fb923c)', color: '#78350f' },
];

const PILL_ROT = [-8, 6, -4, 10, -12];
const PILL_LIFT = [0, 8, -6, 4, -8];
const STAGGER_MS = 320; // was 180 — bigger gap between each pill dropping
const FALLBACK_DROP_FROM = -900; // used only before JS measures the real distance

function makeSpring(stiffness, damping) {
  return { pos: 0, vel: 0, target: 0, stiffness, damping };
}
function stepSpring(s) {
  const force = (s.target - s.pos) * s.stiffness;
  s.vel = (s.vel + force) * s.damping;
  s.pos += s.vel;
  return s;
}
function settled(s) {
  return Math.abs(s.target - s.pos) < 0.05 && Math.abs(s.vel) < 0.05;
}

const FallingPillsRow = () => {
  const wrapRef = useRef(null);
  const itemRefs = useRef([]);
  // lower stiffness + higher damping = slower fall and slower settle
  const springsY = useRef(SERVICE_TAGS.map(() => makeSpring(0.010, 0.90)));
  const springsR = useRef(SERVICE_TAGS.map(() => makeSpring(0.018, 0.88)));
  const rafRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        observer.disconnect();

        // Distance from the very top of the screen down to where this
        // row actually sits right now — so the pills fall the full
        // length of the screen, ending exactly where this row sits
        // (below the paragraph copy).
        const rect = node.getBoundingClientRect();
        const dropFrom = -(Math.max(rect.top, 0) + 40);

        const reduced =
          typeof window !== 'undefined' &&
          window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

        SERVICE_TAGS.forEach((_, i) => {
          const sy = springsY.current[i];
          const sr = springsR.current[i];
          sy.pos = dropFrom;
          sy.vel = 0;
          sy.target = PILL_LIFT[i];
          sr.pos = PILL_ROT[i] + (i % 2 === 0 ? -50 : 50);
          sr.vel = 0;
          sr.target = PILL_ROT[i];
          if (reduced) {
            sy.pos = PILL_LIFT[i];
            sr.pos = PILL_ROT[i];
          }
        });

        if (reduced) {
          itemRefs.current.forEach((el, i) => {
            if (!el) return;
            el.style.transform = `translateY(${PILL_LIFT[i]}px) rotate(${PILL_ROT[i]}deg)`;
            el.style.opacity = '1';
          });
          return;
        }

        const releaseTimes = SERVICE_TAGS.map((_, i) => i * STAGGER_MS);
        const startTime = performance.now();

        const tick = (now) => {
          let moving = false;
          const elapsed = now - startTime;

          SERVICE_TAGS.forEach((_, i) => {
            const el = itemRefs.current[i];
            if (!el) return;
            if (elapsed < releaseTimes[i]) {
              moving = true;
              return;
            }
            const sy = springsY.current[i];
            const sr = springsR.current[i];
            if (!settled(sy)) { stepSpring(sy); moving = true; }
            if (!settled(sr)) { stepSpring(sr); moving = true; }
            el.style.opacity = '1';
            el.style.transform = `translateY(${sy.pos}px) rotate(${sr.pos}deg)`;
          });

          if (moving) rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);
      },
      { threshold: 0, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={wrapRef} className="audit-pills-row">
      {SERVICE_TAGS.map((tag, i) => (
        <span
          key={tag.text}
          ref={(el) => (itemRefs.current[i] = el)}
          className="audit-pill"
          style={{
            background: tag.gradient,
            color: tag.color,
            opacity: 0,
            willChange: 'transform, opacity',
            transform: `translateY(${FALLBACK_DROP_FROM}px) rotate(${PILL_ROT[i]}deg)`,
          }}
        >
          {tag.text}
        </span>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Main section                                                        */
/* ------------------------------------------------------------------ */

const LeadAuditSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { name, email, phone, service, message } = formData;

    if (!name || !email || !phone || !service || !message) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill in all required fields.',
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
      });
      return false;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Phone',
        text: 'Please enter a valid 10-digit Indian mobile number.',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch('https://yourdomain.com/send-mail.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.status === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'Thank you! Our team will contact you shortly.',
          confirmButtonColor: '#ff8a00',
        });

        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong',
        text: 'Please try again later.',
      });
    }
  };

  return (
    <section className='audit-section'>
      <div className='audit-container'>
        {/* Form Side */}
        <div className='audit-form-side'>
          <p className='audit-mini-title'>Let’s grow your business together</p>
          <div className='audit-line' />

          <h2 className='audit-heading section-heading'>
            Get a Free SEO & Marketing Audit
          </h2>

          <form className='audit-form' onSubmit={handleSubmit}>
            <div className='form-grid'>
              <div className='form-group'>
                <label>Your Name*</label>
                <input
                  type='text'
                  name='name'
                  placeholder='Your name'
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className='form-group'>
                <label>Your Email*</label>
                <input
                  type='email'
                  name='email'
                  placeholder='you@example.com'
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className='form-group'>
                <label>Your Phone*</label>
                <input
                  type='tel'
                  name='phone'
                  placeholder='9876543210'
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className='form-group'>
                <label>Service Interested In*</label>
                <select
                  name='service'
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value=''>Select a service</option>
                  <option>SEO Optimization</option>
                  <option>Google Ads / PPC</option>
                  <option>Social Media Marketing</option>
                  <option>Website Design & Development</option>
                  <option>Branding & Creative Services</option>
                </select>
              </div>
            </div>

            <div className='form-group'>
              <label>Your Message*</label>
              <textarea
                rows='2'
                name='message'
                placeholder='Briefly tell us about your goals...'
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <button type='submit' className='audit-btn'>
              Get Free Audit
            </button>
          </form>
        </div>

        {/* Content Side */}
        <div className='audit-content-side'>
          <p className='audit-mini-title dark'>
            Driven by Strategy, Powered by Results
          </p>
          <div className='audit-line dark' />

          <h2 className='audit-content-heading section-heading'>
            Your Digital Growth Partner
          </h2>

          <p>
            We help ambitious brands scale faster with high-impact SEO, high-ROI paid campaigns, and conversion-engineered websites built to generate qualified leads and revenue.
          </p>

          <p>
            Customized, transparent, and performance-driven digital solutions tailored to your unique industry and business goals.
          </p>

          <FallingPillsRow />
        </div>
      </div>
    </section>

  );
};

export default LeadAuditSection;