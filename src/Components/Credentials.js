import React from "react";
import "./Credentials.css";

const CREDENTIALS = [
  {
    icon: "🏆",
    title: "Best Digital Agency 2024",
    description:
      "Awarded by Digital India Summit for excellence in SEO and performance marketing.",
  },
  {
    icon: "✅",
    title: "Google Partner Agency",
    description:
      "Officially certified Google Partner with verified expertise in Search, Display, and Shopping Ads.",
  },
  {
    icon: "📘",
    title: "Meta Business Partner",
    description:
      "Recognized as a certified Meta Business Partner for Facebook and Instagram advertising excellence.",
  },
  {
    icon: "⭐",
    title: "Top SEO Company – Clutch",
    description:
      "Listed among India's Top 10 SEO Companies on Clutch.co with a 4.9/5 average client rating.",
  },
];

export default function Credentials() {
  return (
    <section className="credentials">
      <div className="credentials__container">
        <div className="credentials__eyebrow">
          <span className="credentials__eyebrow-line" />
          <span className="credentials__eyebrow-text">Recognition</span>
        </div>

        <h2 className="credentials__heading">
          Awards &amp; <span className="credentials__heading-accent">Certifications</span>
        </h2>

        <div className="credentials__divider" />

        <p className="credentials__subheading">
          Recognized by industry leaders and certified by the world's top
          platforms — our credentials back up our results.
        </p>

        <div className="credentials__grid">
          {CREDENTIALS.map((item) => (
            <div className="credentials__card" key={item.title}>
              <div className="credentials__icon" aria-hidden="true">
                {item.icon}
              </div>
              <h3 className="credentials__card-title">{item.title}</h3>
              <p className="credentials__card-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}