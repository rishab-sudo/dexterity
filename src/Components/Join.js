import React from "react";
import { Link } from "react-router-dom";
import "./Join.css";

export default function CareerCTA() {
  return (
    <section className="career-cta">
      <div className="career-cta__grid" aria-hidden="true" />

      <div className="career-cta__container">
        <div className="career-cta__eyebrow">
          <span className="career-cta__eyebrow-line" />
          <span className="career-cta__eyebrow-text">Join Our Team</span>
        </div>

        <h2 className="career-cta__heading">
          Build Your Career at{" "}
          <span className="career-cta__heading-accent">Dexterity</span>
        </h2>

        <p className="career-cta__subheading">
          We're always looking for talented, passionate individuals to join
          our growing team. Send us your CV and let's build something amazing
          together.
        </p>

        <Link to="/career" className="career-cta__button">
          <svg
            className="career-cta__button-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 3L11 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 3L14.5 21C14.44 21.14 14.33 21.14 14.27 21L11 13L3 9.73C2.86 9.67 2.86 9.56 3 9.5L21 3Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Send Your CV
        </Link>
      </div>
    </section>
  );
}