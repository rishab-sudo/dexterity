import React from "react";
import "./Culture.css";

const PERKS = [
  {
    key: "learning",
    icon: "⚡",
    title: "Fast Learning",
    description:
      "Weekly training sessions, certifications, and industry conferences keep our team sharp.",
  },
  {
    key: "wins",
    icon: "🏆",
    title: "Celebrating Wins",
    description:
      "We celebrate every client milestone and every team achievement — big or small.",
  },
  {
    key: "balance",
    icon: "❤️",
    title: "Work–Life Balance",
    description:
      "Flexible hours, hybrid work options, and a genuine respect for personal time.",
  },
  {
    key: "team",
    icon: "👥",
    title: "Inclusive Team",
    description:
      "Diverse backgrounds, zero hierarchy. Every voice matters and every idea is heard.",
  },
];

const IMAGES = {
  main:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
  mainAlt: "Team collaborating with a notebook during a meeting",
  lounge:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=80",
  loungeAlt: "Modern office lounge seating area",
  sketch:
    "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=700&q=80",
  sketchAlt: "Sketchbook and notebook on a desk",
};

export default function Culture() {
  return (
    <section className="culture">
      <div className="culture__container">
        <div className="culture__text">
          <div className="culture__eyebrow">
            <span className="culture__eyebrow-line" />
            <span className="culture__eyebrow-text">Life at Dextirity</span>
          </div>

          <h2 className="culture__heading">
            A Culture Built on <span className="culture__heading-accent">Passion</span>
            <br />
            <span className="culture__heading-accent">&amp; Purpose</span>
          </h2>

          <div className="culture__divider" />

          <p className="culture__subheading">
            We believe happy teams make happy clients. At Dextirity, we
            foster a culture of learning, collaboration, and creative freedom
            — where every team member is empowered to do their best work.
          </p>

          <div className="culture__grid">
            {PERKS.map((perk) => (
              <div className="culture__card" key={perk.key}>
                <div className="culture__icon" aria-hidden="true">
                  {perk.icon}
                </div>
                <h3 className="culture__card-title">{perk.title}</h3>
                <p className="culture__card-description">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="culture__media">
          <div className="culture__media-main">
            <img src={IMAGES.main} alt={IMAGES.mainAlt} loading="lazy" />
          </div>
          <div className="culture__media-row">
            <div className="culture__media-small">
              <img src={IMAGES.lounge} alt={IMAGES.loungeAlt} loading="lazy" />
            </div>
            <div className="culture__media-small">
              <img src={IMAGES.sketch} alt={IMAGES.sketchAlt} loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}