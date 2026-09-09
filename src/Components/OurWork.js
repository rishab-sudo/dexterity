import React, { useState, useRef, useEffect, useCallback } from "react";
import "./OurWork.css";

const AUTOPLAY_DELAY = 3000; // ms between auto-advances
const RESUME_DELAY = 4000; // ms to wait after user interaction before resuming autoplay

const OurWork = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isPaused, setIsPaused] = useState(false);

  const startX = useRef(0);
  const isDragging = useRef(false);

  const autoplayTimerRef = useRef(null);
  const resumeTimeoutRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "SEO & Search Dominance",
      category: "Search Optimization",
      tag: "SEO",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
      tagColor: "#FF6A1A",
    },
    {
      id: 2,
      title: "Performance Ad Campaigns",
      category: "Paid Media",
      tag: "Performance",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
      tagColor: "#7C3AED",
    },
    {
      id: 3,
      title: "Brand Identity & Creative",
      category: "Creative Design",
      tag: "Branding",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&auto=format&fit=crop&q=80",
      tagColor: "#0EA5E9",
    },
    {
      id: 4,
      title: "Web Development & UX",
      category: "Digital Products",
      tag: "Web Dev",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&auto=format&fit=crop&q=80",
      tagColor: "#10B981",
    },
    {
      id: 5,
      title: "Digital Marketing Funnels",
      category: "Growth Marketing",
      tag: "Marketing",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop&q=80",
      tagColor: "#F59E0B",
    },
  ];

  const goToSlide = useCallback(
    (index) => {
      if (index < 0) {
        setActiveIndex(projects.length - 1);
      } else if (index >= projects.length) {
        setActiveIndex(0);
      } else {
        setActiveIndex(index);
      }
    },
    [projects.length]
  );

  // Pause autoplay for a while after any manual interaction, then resume.
  const pauseAutoplayTemporarily = useCallback(() => {
    setIsPaused(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, RESUME_DELAY);
  }, []);

  // Autoplay: advance to the next slide automatically on an interval.
  useEffect(() => {
    if (isPaused) return undefined;

    autoplayTimerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, AUTOPLAY_DELAY);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isPaused, projects.length]);

  // Cleanup any pending resume timeout on unmount.
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const handlePointerDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    pauseAutoplayTemporarily();
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const difference = e.clientX - startX.current;
    if (Math.abs(difference) > 70) {
      goToSlide(difference < 0 ? activeIndex + 1 : activeIndex - 1);
      isDragging.current = false;
    }
  };

  const handlePointerUp = (e) => {
    isDragging.current = false;
    try { e.currentTarget.releasePointerCapture?.(e.pointerId); } catch (_) {}
  };

  const handleManualNav = (index) => {
    goToSlide(index);
    pauseAutoplayTemporarily();
  };

  const getCardClass = (index) => {
    const total = projects.length;
    let diff = index - activeIndex;
    if (diff > Math.floor(total / 2)) diff -= total;
    if (diff < -Math.floor(total / 2)) diff += total;

    if (diff === 0) return "our-work-card is-center";
    if (diff === -1) return "our-work-card is-left";
    if (diff === 1) return "our-work-card is-right";
    if (diff === -2) return "our-work-card is-far-left";
    if (diff === 2) return "our-work-card is-far-right";
    return "our-work-card is-hidden";
  };

  const active = projects[activeIndex];

  return (
    <section className="our-work-section">
      <div className="our-work-container">

        {/* Heading */}
        <div className="our-work-heading">
          <span className="our-work-eyebrow">CASE STUDIES</span>
          <h2>
            <span className="heading-orange">We Create</span>{" "}
            <span className="heading-dark">Digital</span>
            <br />
            <span className="heading-dark">Work That </span>
            <span className="heading-orange">Drives</span>
            <span className="heading-dark"> Results</span>
          </h2>
        </div>

        {/* Active project info */}
        <div className="our-work-active-info">
          <span
            className="our-work-active-tag"
            style={{ background: active.tagColor }}
          >
            {active.tag}
          </span>
          <p className="our-work-active-title">{active.title}</p>
          <p className="our-work-active-category">{active.category}</p>
        </div>

        {/* Slider */}
        <div
          className="our-work-slider"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="our-work-slider-stage">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={getCardClass(index)}
                onClick={() => handleManualNav(index)}
              >
                <div className="our-work-card-inner">
                  <img
                    className="our-work-card-img"
                    src={project.image}
                    alt={project.title}
                    draggable={false}
                  />
                  <div className="our-work-card-overlay">
                    <span
                      className="our-work-card-tag"
                      style={{ background: project.tagColor }}
                    >
                      {project.tag}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nav arrows */}
        <div className="our-work-nav">
          <button
            className="our-work-arrow"
            aria-label="Previous project"
            onClick={() => handleManualNav(activeIndex - 1)}
          >
            &#8592;
          </button>

          {/* Dots */}
          <div className="our-work-dots">
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                aria-label={`Go to project ${index + 1}`}
                className={index === activeIndex ? "our-work-dot active" : "our-work-dot"}
                onClick={() => handleManualNav(index)}
              />
            ))}
          </div>

          <button
            className="our-work-arrow"
            aria-label="Next project"
            onClick={() => handleManualNav(activeIndex + 1)}
          >
            &#8594;
          </button>
        </div>

      </div>
    </section>
  );
};

export default OurWork;