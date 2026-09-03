import React, { useState, useRef } from "react";
import "./OurWork.css";

const OurWork = () => {
  const [activeIndex, setActiveIndex] = useState(2);

  const startX = useRef(0);
  const isDragging = useRef(false);

  const projects = [
    {
      id: 1,
      logo: "b",
      logoClass: "logo-blue",
    },
    {
      id: 2,
      logo: "RDI",
      logoClass: "logo-rdi",
    },
    {
      id: 3,
      logo: "redBus",
      logoClass: "logo-redbus",
    },
    {
      id: 4,
      logo: "SOBHA",
      logoClass: "logo-sobha",
    },
    {
      id: 5,
      logo: "TONGGUY",
      logoClass: "logo-tongguy",
    },
  ];

  const goToSlide = (index) => {
    if (index < 0) {
      setActiveIndex(projects.length - 1);
    } else if (index >= projects.length) {
      setActiveIndex(0);
    } else {
      setActiveIndex(index);
    }
  };

  const handlePointerDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;

    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;

    const currentX = e.clientX;
    const difference = currentX - startX.current;

    // Minimum swipe distance
    if (Math.abs(difference) > 70) {
      if (difference < 0) {
        goToSlide(activeIndex + 1);
      } else {
        goToSlide(activeIndex - 1);
      }

      isDragging.current = false;
    }
  };

  const handlePointerUp = (e) => {
    isDragging.current = false;

    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    } catch (error) {
      // Ignore pointer capture errors
    }
  };

  const getCardClass = (index) => {
    const total = projects.length;

    let difference = index - activeIndex;

    // Circular positioning
    if (difference > Math.floor(total / 2)) {
      difference -= total;
    }

    if (difference < -Math.floor(total / 2)) {
      difference += total;
    }

    if (difference === 0) {
      return "our-work-card is-center";
    }

    if (difference === -1) {
      return "our-work-card is-left";
    }

    if (difference === 1) {
      return "our-work-card is-right";
    }

    if (difference === -2) {
      return "our-work-card is-far-left";
    }

    if (difference === 2) {
      return "our-work-card is-far-right";
    }

    return "our-work-card is-hidden";
  };

  return (
    <section className="our-work-section">
      <div className="our-work-container">

        {/* Heading */}
        <div className="our-work-heading">
          <span className="our-work-eyebrow">
            CASE STUDIES
          </span>

          <h2>
            <span className="heading-red">We Make</span>{" "}
            <span className="heading-dark">Designs</span>
            <br />
            <span className="heading-dark">That </span>
            <span className="heading-red">Leads</span>
            <span className="heading-dark"> &amp; Inspire</span>
          </h2>
        </div>

        {/* Slider */}
        <div
          className="our-work-slider"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div className="our-work-slider-stage">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={getCardClass(index)}
                onClick={() => setActiveIndex(index)}
              >
                <div className="our-work-card-inner">

                  {/* Logo */}
                  <div className={`our-work-logo ${project.logoClass}`}>
                    {project.logo === "redBus" ? (
                      <>
                        <span className="redbus-icon">▱</span>
                        <span>redBus</span>
                      </>
                    ) : (
                      project.logo
                    )}
                  </div>

                  {/* Background */}
                  <div className="our-work-card-bg">
                    <div className="building building-one"></div>
                    <div className="building building-two"></div>
                    <div className="building building-three"></div>
                    <div className="building building-four"></div>
                    <div className="building building-five"></div>
                  </div>

                  <div className="our-work-card-overlay"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Dots */}
        <div className="our-work-dots">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              aria-label={`Go to project ${index + 1}`}
              className={
                index === activeIndex
                  ? "our-work-dot active"
                  : "our-work-dot"
              }
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurWork;