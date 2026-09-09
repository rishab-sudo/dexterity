import React from "react";
import "./WhyUs.css";

const REASONS = [
  {
    key: "results",
    title: "Results-First Approach",
    description:
      "We measure success in your terms — traffic, leads, sales. Every strategy is built around your business goals with clear KPIs and monthly reporting.",
    highlight: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 17l5-5 4 4 8-9"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 7h6v6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: "transparent",
    title: "100% Transparent",
    description:
      "No smoke and mirrors. You get full access to your campaign data, detailed monthly reports, and honest updates — good news or bad.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 3v11"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M7 8l5-5 5 5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 14c0 3.9 3.1 7 7 7s7-3.1 7-7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    key: "team",
    title: "Dedicated Team",
    description:
      "You get a dedicated account manager and a specialist team — not a rotating cast of freelancers. We know your business inside and out.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="17" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M15.5 14.2c2.6.4 4.5 2.7 4.5 5.8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    key: "certified",
    title: "Google Certified",
    description:
      "Our team holds active Google, Meta, and HubSpot certifications. We stay ahead of algorithm updates so your rankings never slip unexpectedly.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M8.5 12.3l2.2 2.2 4.8-5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: "pricing",
    title: "Honest Pricing",
    description:
      "No hidden fees, no lock-in contracts. Our pricing is straightforward and our packages are tailored to your budget and actual needs.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7 4h9M7 8h9M7 4c3 0 5.5 1.8 5.5 4S10 12 7 12h9M7 12l7 8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: "support",
    title: "24×7 Support",
    description:
      "Your business doesn't sleep, and neither does our support team. Reach us any time via phone, WhatsApp, or email for any query or concern.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4 13v-1a8 8 0 0116 0v1"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <rect
          x="3"
          y="13"
          width="4"
          height="6"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <rect
          x="17"
          y="13"
          width="4"
          height="6"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M20 19v1a2 2 0 01-2 2h-3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function WhyUs() {
  return (
    <section className="why-us">
      <div className="why-us__container">
        <div className="why-us__eyebrow">
          <span className="why-us__eyebrow-line" />
          <span className="why-us__eyebrow-text">Why Dextirity</span>
        </div>

        <h2 className="why-us__heading">
          What Makes Us <span className="why-us__heading-accent">Different</span> from
          the Rest
        </h2>

        <div className="why-us__divider" />

        <p className="why-us__subheading">
          We've built our reputation on results, relationships, and relentless
          dedication to our clients' growth. Here's why 500+ businesses trust
          us.
        </p>

        <div className="why-us__grid">
          {REASONS.map((reason) => (
            <div
              className={`why-us__card${reason.highlight ? " why-us__card--highlight" : ""}`}
              key={reason.key}
            >
              <div className="why-us__icon-wrap">
                <span className="why-us__icon">{reason.icon}</span>
              </div>
              <h3 className="why-us__card-title">{reason.title}</h3>
              <p className="why-us__card-description">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}