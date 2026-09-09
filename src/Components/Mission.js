import React from "react";
import "./Mission.css";

const PILLARS = [
  {
    key: "mission",
    label: "Our Mission",
    description:
      "To empower businesses across India with data-driven digital marketing strategies that deliver consistent, measurable growth — making world-class digital services accessible to all.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: "vision",
    label: "Our Vision",
    description:
      "To be India's most trusted digital marketing partner — a company known for its integrity, innovation, and the real impact it creates for every client we work with.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2 12C2 12 5.5 5.5 12 5.5C18.5 5.5 22 12 22 12C22 12 18.5 18.5 12 18.5C5.5 18.5 2 12 2 12Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    key: "values",
    label: "Our Values",
    description:
      "Transparency, accountability, and relentless pursuit of results. We treat every client's business as our own and never compromise on the quality of our work or the honesty of our communication.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 20.2c-.3 0-.6-.1-.8-.3-3.2-2.6-8-6.7-8-10.9C3.2 6.2 5.3 4 8 4c1.6 0 3 .8 4 2 .9-1.2 2.4-2 4-2 2.7 0 4.8 2.2 4.8 5 0 4.2-4.8 8.3-8 10.9-.3.2-.5.3-.8.3Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M4 12h3l1.5-3 2 5 1.5-3H20"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Mission() {
  return (
    <section className="mission">
      <div className="mission__container">
        <div className="mission__eyebrow">
          <span className="mission__eyebrow-line" />
          <span className="mission__eyebrow-text">Our Foundation</span>
        </div>

        <h2 className="mission__heading">
          Mission, Vision &amp; <span className="mission__heading-accent">Core Values</span>
        </h2>

        <div className="mission__divider" />

        <p className="mission__subheading">
          Everything we do is guided by a clear purpose — to help businesses
          grow sustainably in the digital world with honesty and expertise.
        </p>

        <div className="mission__grid">
          {PILLARS.map((pillar) => (
            <div className="mission__card" key={pillar.key}>
              <div className="mission__icon-wrap">
                <span className="mission__icon">{pillar.icon}</span>
              </div>
              <h3 className="mission__card-title">{pillar.label}</h3>
              <p className="mission__card-description">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}