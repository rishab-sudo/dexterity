import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Search,
  Share2,
  Repeat,
  MousePointerClick,
  ClipboardList,
  DollarSign,
  BarChart3,
  LayoutGrid,
  Target,
  TrendingDown,
  Crosshair,
  Rocket,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Send,
  ChevronDown,
  CheckCircle2,
  Check,
  HelpCircle,
} from "lucide-react";

/* ---------------------------------------------------------
   Same design system as the SEO section — classes prefixed
   "pm-" so both can live on one page.
   Band order: Hero(dark) -> Benefits+Process(light) ->
   Why Choose Us(dark) -> How We Work(light) -> Pricing(dark)
   -> FAQ(light) -> Contact(dark)
--------------------------------------------------------- */

const styles = `
  .pm-root {
    --bg: #111113;
    --bg-soft: #18181B;
    --surface: #1D1D22;
    --surface-hover: #25252C;
    --border: rgba(255,255,255,0.12);
    --border-strong: rgba(255,255,255,0.24);
    --orange: #FF6A1A;
    --orange-light: #FFA157;
    --orange-deep: #C2410C;
    --white: #FFFFFF;
    --muted: #B7B7C0;
    --info-grad: #22160C;
    background: var(--bg);
    color: var(--white);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, sans-serif;
    position: relative;
    overflow: hidden;
  }

  .pm-theme-light {
    --bg: #FFFFFF;
    --bg-soft: #F1F1F4;
    --surface: #F7F7F9;
    --surface-hover: #EFEFF2;
    --border: rgba(10,10,12,0.10);
    --border-strong: rgba(10,10,12,0.24);
    --white: #121214;
    --muted: #5A5A62;
    --orange-light: #E85A00;
    --info-grad: #FFF1E4;
    background: var(--bg);
    color: var(--white);
  }

  .pm-grid-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,106,26,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,106,26,0.06) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
    pointer-events: none;
  }

  .pm-section {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 30px 0 30px;
  }

  .pm-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--orange);
  }
  .pm-eyebrow::before {
    content: "";
    width: 18px;
    height: 1px;
    background: var(--orange);
  }

  .pm-h1 {
    font-size: clamp(2.2rem, 4.6vw, 3.6rem);
    line-height: 1.05;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin: 18px 0 20px;
  }
  .pm-h1 .accent {
    background: linear-gradient(100deg, var(--orange-light), var(--orange));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .pm-lede {
    color: var(--muted);
    font-size: 16px;
    line-height: 1.7;
    max-width: 520px;
    margin-bottom: 14px;
  }

  .pm-btn-row {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin-top: 30px;
  }

  .pm-btn-primary, .pm-btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 26px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    border: none;
    font-family: inherit;
  }
  .pm-btn-primary {
    background: linear-gradient(120deg, var(--orange-light), var(--orange) 60%, var(--orange-deep));
    color: #0A0A0B;
    box-shadow: 0 8px 24px -8px rgba(255,106,26,0.55);
  }
  .pm-btn-outline {
    background: transparent;
    color: var(--white);
    border: 1px solid var(--border-strong);
  }

  .pm-hero-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 56px;
    align-items: start;
    padding: 110px 0 90px;
  }
  @media (max-width: 880px) {
    .pm-hero-grid { grid-template-columns: 1fr; padding: 70px 0 50px; }
  }

  .pm-cap-panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 22px;
  }
  .pm-cap-title {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 16px;
    padding-left: 4px;
  }
  .pm-cap-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  @media (max-width: 520px) {
    .pm-cap-list { grid-template-columns: 1fr; }
  }
  .pm-cap-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 14px;
    border-radius: 12px;
    border: 1px solid transparent;
    background: var(--bg-soft);
    cursor: pointer;
  }
  .pm-cap-icon {
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,106,26,0.12);
    color: var(--orange-light);
    transition: background 0.2s ease, color 0.2s ease;
  }
  .pm-cap-name {
    font-size: 13.5px;
    font-weight: 700;
    line-height: 1.3;
  }
  .pm-cap-sub {
    font-size: 11px;
    color: var(--muted);
    margin-top: 2px;
  }

  .pm-section-head {
    text-align: center;
    margin-bottom: 32px;
  }
  .pm-section-title {
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 800;
    letter-spacing: -0.01em;
  }
  .pm-section-title .accent { color: var(--orange); }
  .pm-section-sub {
    text-align: center;
    color: var(--muted);
    font-size: 14px;
    margin-top: 10px;
  }

  .pm-benefits-wrap {
    padding: 90px 0 40px;
  }

  .pm-benefits-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    padding: 0 0 30px;
  }
  @media (max-width: 900px) { .pm-benefits-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 520px) { .pm-benefits-grid { grid-template-columns: 1fr; } }

  .pm-benefit-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 22px 18px;
  }
  .pm-benefit-icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,106,26,0.10);
    color: var(--orange);
    margin-bottom: 14px;
  }
  .pm-benefit-name {
    font-size: 14.5px;
    font-weight: 700;
  }

  .pm-process-wrap {
    padding: 30px 0 110px;
    position: relative;
  }
  .pm-process-track {
    display: flex;
    justify-content: space-between;
    position: relative;
    padding-top: 10px;
  }
  .pm-process-line {
    position: absolute;
    top: 28px;
    left: 28px;
    right: 28px;
    height: 2px;
    background: var(--border);
    transform-origin: left;
  }
  .pm-process-line-fill {
    position: absolute;
    top: 28px;
    left: 28px;
    height: 2px;
    background: linear-gradient(90deg, var(--orange-deep), var(--orange));
    transform-origin: left;
  }
  .pm-process-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 100%;
    position: relative;
    z-index: 1;
  }
  .pm-process-num {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--bg);
    border: 2px solid var(--orange);
    color: var(--orange-light);
    font-weight: 800;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pm-process-label {
    font-size: 13px;
    font-weight: 700;
    color: var(--white);
  }
  @media (max-width: 700px) {
    .pm-process-track { flex-wrap: wrap; gap: 28px 12px; }
    .pm-process-line, .pm-process-line-fill { display: none; }
  }
  .pm-bento-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  @media (max-width: 760px) { .pm-bento-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 520px) { .pm-bento-grid { grid-template-columns: 1fr; } }
  .pm-bento-item {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 26px 22px;
  }
  .pm-bento-check {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: rgba(255,106,26,0.14);
    color: var(--orange-light);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  }
  .pm-bento-name { font-size: 15px; font-weight: 700; margin-bottom: 8px; }
  .pm-bento-desc { font-size: 13px; color: var(--muted); line-height: 1.6; }

  .pm-how-wrap { padding: 90px 0 110px; }
  .pm-how-row {
    display: flex;
    align-items: stretch;
    gap: 0;
  }
  .pm-how-card {
    flex: 1;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px;
    position: relative;
  }
  .pm-how-num {
    position: absolute;
    top: 16px;
    right: 18px;
    font-size: 34px;
    font-weight: 800;
    color: rgba(10,10,12,0.08);
  }
  .pm-how-title { font-size: 16px; font-weight: 800; margin-bottom: 10px; }
  .pm-how-desc { font-size: 13px; color: var(--muted); line-height: 1.6; max-width: 88%; }
  .pm-how-connector {
    width: 28px;
    flex-shrink: 0;
    align-self: center;
    height: 2px;
    background: var(--border);
    position: relative;
    overflow: hidden;
  }
  .pm-how-connector-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: var(--orange);
  }
  @media (max-width: 880px) {
    .pm-how-row { flex-direction: column; gap: 16px; }
    .pm-how-connector { display: none; }
  }

  .pm-pricing-wrap { padding: 90px 0 110px; }
  .pm-pricing-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    align-items: stretch;
  }
  @media (max-width: 900px) { .pm-pricing-grid { grid-template-columns: 1fr; max-width: 420px; margin: 0 auto; } }
  .pm-price-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }
  .pm-price-card.popular {
    border-color: var(--orange);
    box-shadow: 0 16px 34px -16px rgba(255,106,26,0.45);
  }
  .pm-price-badge {
    position: absolute;
    top: 18px;
    right: -32px;
    background: var(--orange);
    color: #0A0A0B;
    font-size: 11px;
    font-weight: 800;
    padding: 5px 36px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    transform: rotate(45deg);
  }
  .pm-price-name {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }
  .pm-price-value {
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 22px;
  }
  .pm-price-feature-list {
    list-style: none;
    padding: 0;
    margin: 0 0 26px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
  }
  .pm-price-feature {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13.5px;
    color: var(--white);
  }
  .pm-price-feature svg { color: var(--orange); flex-shrink: 0; }
  .pm-price-cta {
    width: 100%;
    padding: 13px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    background: var(--bg-soft);
    color: var(--white);
    border: 1px solid var(--border-strong);
    font-family: inherit;
  }
  .pm-price-card.popular .pm-price-cta {
    background: linear-gradient(100deg, var(--orange-light), var(--orange));
    color: #0A0A0B;
    border: none;
  }

  .pm-faq-wrap { padding: 90px 0 110px; }
  .pm-faq-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    align-items: start;
  }
  @media (max-width: 760px) { .pm-faq-grid { grid-template-columns: 1fr; } }
  .pm-faq-item {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
    cursor: pointer;
  }
  .pm-faq-question {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 16px 18px;
  }
  .pm-faq-q-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .pm-faq-q-icon {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: rgba(255,106,26,0.14);
    color: var(--orange);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .pm-faq-q-text { font-size: 14px; font-weight: 700; }
  .pm-faq-chevron { color: var(--muted); flex-shrink: 0; }
  .pm-faq-answer-inner {
    padding: 0 18px 18px 54px;
    font-size: 13px;
    color: var(--muted);
    line-height: 1.6;
  }

  .pm-contact-wrap {
    padding: 90px 0 110px;
    display: grid;
    grid-template-columns: 1.3fr 0.9fr;
    gap: 24px;
  }
  @media (max-width: 880px) { .pm-contact-wrap { grid-template-columns: 1fr; } }

  .pm-form-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 22px;
    padding: 34px;
  }
  .pm-form-heading {
    font-size: 22px;
    font-weight: 800;
    margin-bottom: 22px;
  }
  .pm-form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }
  @media (max-width: 520px) { .pm-form-row { grid-template-columns: 1fr; } }
  .pm-field label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }
  .pm-field input,
  .pm-field select,
  .pm-field textarea {
    width: 100%;
    background: var(--bg-soft);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 14px;
    color: var(--white);
    font-size: 14px;
    font-family: inherit;
    outline: none;
    box-sizing: border-box;
  }
  .pm-field input::placeholder, .pm-field textarea::placeholder { color: #5c5c62; }
  .pm-field input:focus,
  .pm-field select:focus,
  .pm-field textarea:focus {
    border-color: var(--orange);
  }
  .pm-field select { appearance: none; }
  .pm-select-wrap { position: relative; }
  .pm-select-wrap svg {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--muted);
    pointer-events: none;
  }
  .pm-submit {
    width: 100%;
    margin-top: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 15px;
    border-radius: 10px;
    border: none;
    font-weight: 700;
    font-size: 14.5px;
    color: #0A0A0B;
    background: linear-gradient(100deg, var(--orange-light), var(--orange));
    cursor: pointer;
  }

  .pm-info-card {
    background: linear-gradient(165deg, var(--info-grad), var(--surface) 55%);
    border: 1px solid var(--border);
    border-radius: 22px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 22px;
    height: fit-content;
  }
  .pm-info-heading {
    font-size: 18px;
    font-weight: 800;
    position: relative;
    padding-bottom: 12px;
  }
  .pm-info-heading::after {
    content: "";
    position: absolute;
    left: 0; bottom: 0;
    width: 40px;
    height: 2px;
    background: var(--orange);
  }
  .pm-info-row {
    display: flex;
    gap: 14px;
    align-items: flex-start;
  }
  .pm-info-icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: rgba(255,106,26,0.14);
    color: var(--orange-light);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .pm-info-label {
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 4px;
  }
  .pm-info-value {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.6;
  }
  .pm-info-value a { color: var(--orange-light); text-decoration: none; }
`;

const capabilities = [
  { icon: Search, name: "Search Ads" },
  { icon: Share2, name: "Social Media Ads" },
  { icon: LayoutGrid, name: "Display & Programmatic" },
  { icon: Repeat, name: "Retargeting" },
  { icon: MousePointerClick, name: "Landing Page CRO" },
  { icon: ClipboardList, name: "Campaign Strategy" },
  { icon: DollarSign, name: "Budget Optimization" },
  { icon: BarChart3, name: "Performance Reporting" },
];

const benefits = [
  { icon: TrendingDown, name: "Lower Cost Per Lead" },
  { icon: Target, name: "Higher Conversion Rate" },
  { icon: Crosshair, name: "Precise Ad Targeting" },
  { icon: DollarSign, name: "Maximised ROI" },
  { icon: Rocket, name: "Faster Time To Results" },
  { icon: Share2, name: "Multi-Channel Reach" },
  { icon: Repeat, name: "Real-Time Optimization" },
  { icon: BarChart3, name: "Transparent Reporting" },
];

const pmProcessSteps = ["Research", "Strategy & Budgeting", "Ad Creative", "Launch", "Optimization", "Reporting"];

const whyChooseUs = [
  { name: "Data-Driven Targeting", desc: "Every audience is built and refreshed from live campaign data, not guesswork." },
  { name: "Transparent Reporting", desc: "Leads, cost per lead, and ROAS — reported in plain numbers, not vanity metrics." },
  { name: "Continuous Optimization", desc: "Budget is reallocated daily toward what's actually converting." },
];

const howWeWork = [
  { title: "Audience Research", desc: "Mapping where your buyers are and what they respond to." },
  { title: "Campaign Strategy", desc: "Setting the channel mix, budget, and target CPA upfront." },
  { title: "Ad Creative & Launch", desc: "Building copy and creative, then launching with close monitoring." },
  { title: "Optimize & Scale", desc: "Testing, reallocating budget, and scaling what converts." },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "Custom",
    features: ["Google Search Ads", "Keyword & Negative Lists", "Conversion Tracking", "Monthly Reporting"],
    popular: false,
  },
  {
    name: "Growth",
    price: "Custom",
    features: ["Search + Social Ads", "Retargeting Campaigns", "Landing Page CRO", "Weekly Optimization"],
    popular: true,
  },
  {
    name: "Scale",
    price: "Custom",
    features: ["All Channels + Display", "Advanced Audience Modeling", "Creative Production", "Daily Monitoring"],
    popular: false,
  },
];

const faqs = [
  { q: "What is performance marketing?", a: "Paid advertising where every rupee is tied to a measurable outcome — a lead, a sale, or a sign-up — rather than impressions alone." },
  { q: "How is it different from traditional advertising?", a: "Traditional ads chase visibility; performance marketing is built, tracked, and optimised around a specific action and cost target." },
  { q: "Which platforms do you run ads on?", a: "Google Search & Shopping, Meta, Instagram, LinkedIn, YouTube, and programmatic display, depending on where your audience actually is." },
  { q: "How much should I budget for ads?", a: "It depends on your industry and target CPA — we size a starting budget after a short audit of your funnel and competition." },
  { q: "How do you measure ROI?", a: "Through conversion tracking tied to actual leads or revenue, not just clicks or impressions." },
  { q: "What is a good CPL or CPA?", a: "It varies by industry — we benchmark against your sector and your own historical numbers, not a generic figure." },
  { q: "Do you handle landing pages too?", a: "Yes, campaign performance is only as good as the page it sends traffic to, so we design and test those as well." },
  { q: "How soon will I see results?", a: "Search campaigns often show early signal within 2-3 weeks; most accounts hit a stable rhythm by month two." },
  { q: "Can you scale winning campaigns?", a: "Yes, once a campaign hits its target CPA, we scale budget in controlled steps to protect performance." },
  { q: "Do you offer remarketing or retargeting?", a: "Yes, sequenced retargeting across search, social, and display is part of most campaign builds." },
  { q: "What tools do you use for tracking?", a: "We use Google Ads, Meta Ads Manager, GA4, and server-side conversion tracking depending on the setup." },
  { q: "Do you write the ad creative too?", a: "Yes, copy and creative direction are part of the build, tuned to each platform's format." },
  { q: "How often do you optimise campaigns?", a: "Budgets and bids are reviewed daily; creative and audiences are refreshed on a weekly cycle." },
  { q: "Do you run e-commerce ad campaigns?", a: "Yes, including Shopping ads, catalog-based social ads, and dynamic retargeting for product catalogs." },
  { q: "Do you provide monthly reports?", a: "Yes, transparent monthly reporting on leads, cost per lead, and return on ad spend." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

function Reveal({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={stagger}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <motion.div className="pm-faq-item" variants={fadeUp} onClick={onToggle} layout="position">
      <div className="pm-faq-question">
        <div className="pm-faq-q-left">
          <div className="pm-faq-q-icon">
            <HelpCircle size={14} />
          </div>
          <div className="pm-faq-q-text">{item.q}</div>
        </div>
        <motion.div
          className="pm-faq-chevron"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="pm-faq-answer-inner">{item.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PerformanceMarketingSection() {
  const formRef = useRef(null);
  const [highlight, setHighlight] = useState(false);
  const processRef = useRef(null);
  const processInView = useInView(processRef, { once: true, amount: 0.4 });
  const capRef = useRef(null);
  const [capGlow, setCapGlow] = useState(false);
  const [hoveredCap, setHoveredCap] = useState(null);
  const [openFaq, setOpenFaq] = useState(new Set([0]));

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setHighlight(true);
    window.setTimeout(() => setHighlight(false), 1800);
  };

  const glowCapabilities = () => {
    capRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setCapGlow(true);
    window.setTimeout(() => setCapGlow(false), 1800);
  };

  const toggleFaq = (i) => {
    setOpenFaq((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <div className="pm-root">
      <style>{styles}</style>
      <div className="pm-grid-bg" />

      {/* HERO — dark */}
      <section className="pm-section">
        <div className="pm-hero-grid">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.span className="pm-eyebrow" variants={fadeUp}>
              04. Performance Marketing
            </motion.span>

            <motion.h1 className="pm-h1" variants={fadeUp}>
              Turn Ad Spend Into <span className="accent">Predictable Revenue</span>
            </motion.h1>

            <motion.p className="pm-lede" variants={fadeUp}>
              Stop paying for clicks that don't convert. Build a paid acquisition engine
              across search and social that's accountable to one number — return on ad
              spend.
            </motion.p>

            <motion.p className="pm-lede" variants={fadeUp}>
              From campaign strategy and creative to landing pages and daily optimisation,
              we run the full funnel so every rupee is tied to a lead, a sale, or a clear
              reason it didn't work.
            </motion.p>

            <motion.div className="pm-btn-row" variants={fadeUp}>
              <motion.button
                className="pm-btn-primary"
                whileHover={{ scale: 1.035 }}
                whileTap={{ scale: 0.97 }}
                onClick={glowCapabilities}
              >
                View Full Service
                <ArrowRight size={16} />
              </motion.button>

              <motion.button
                className="pm-btn-outline"
                whileHover={{ scale: 1.035, borderColor: "#FF6A1A" }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToForm}
              >
                Get Free Audit
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            ref={capRef}
            animate={
              capGlow
                ? {
                    boxShadow:
                      "0 0 0 2px rgba(255,106,26,0.6), 0 0 46px 10px rgba(255,106,26,0.38)",
                  }
                : {
                    boxShadow: "0 0 0 0px rgba(255,106,26,0), 0 0 0px 0px rgba(255,106,26,0)",
                  }
            }
            transition={{ duration: 0.5 }}
            style={{ borderRadius: 20 }}
          >
            <motion.div
              className="pm-cap-panel"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="pm-cap-title">Core Capabilities</div>
              <div className="pm-cap-list">
                {capabilities.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <motion.div
                      className="pm-cap-item"
                      key={c.name}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.35 + i * 0.05 }}
                      whileHover={{
                        y: -3,
                        borderColor: "rgba(255,106,26,0.55)",
                        backgroundColor: "#25252C",
                        boxShadow: "0 10px 22px -12px rgba(0,0,0,0.35)",
                      }}
                      onHoverStart={() => setHoveredCap(i)}
                      onHoverEnd={() => setHoveredCap(null)}
                    >
                      <motion.div
                        className="pm-cap-icon"
                        animate={
                          hoveredCap === i
                            ? { backgroundColor: "#FF6A1A", color: "#0A0A0B" }
                            : { backgroundColor: "rgba(255,106,26,0.12)", color: "var(--orange-light)" }
                        }
                        transition={{ duration: 0.2 }}
                      >
                        <Icon size={16} />
                      </motion.div>
                      <div>
                        <div className="pm-cap-name">{c.name}</div>
                        <div className="pm-cap-sub">Proven results</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* BENEFITS + PROCESS — light */}
      <div className="pm-theme-light">
      <section className="pm-section pm-benefits-wrap">
        <Reveal>
          <motion.div className="pm-section-head" variants={fadeUp}>
            <h2 className="pm-section-title">
              The Benefits of <span className="accent">Our Performance Marketing</span>
            </h2>
          </motion.div>
          <div className="pm-benefits-grid">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <motion.div
                  className="pm-benefit-card"
                  key={b.name}
                  variants={fadeUp}
                  whileHover={{ y: -4, borderColor: "rgba(255,106,26,0.45)" }}
                >
                  <div className="pm-benefit-icon">
                    <Icon size={18} />
                  </div>
                  <div className="pm-benefit-name">{b.name}</div>
                </motion.div>
              );
            })}
          </div>
        </Reveal>

        <div className="pm-process-wrap" ref={processRef}>
          <Reveal>
            <motion.div className="pm-section-head" variants={fadeUp} style={{ marginBottom: 30 }}>
              <h2 className="pm-section-title">
                Our Performance Marketing <span className="accent">Process</span>
              </h2>
            </motion.div>
          </Reveal>

          <div className="pm-process-track">
            <div className="pm-process-line" />
            <motion.div
              className="pm-process-line-fill"
              initial={{ width: 0 }}
              animate={{ width: processInView ? "calc(100% - 56px)" : 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            />
            {pmProcessSteps.map((step, i) => (
              <motion.div
                className="pm-process-step"
                key={step}
                initial={{ opacity: 0, y: 16 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
              >
                <div className="pm-process-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="pm-process-label">{step}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      </div>

      {/* WHY CHOOSE US — dark */}
      <section className="pm-section pm-bento-wrap">
        <Reveal>
          <motion.div className="pm-section-head" variants={fadeUp}>
            <h2 className="pm-section-title">
              Why Choose <span className="accent">Us</span>
            </h2>
          </motion.div>

          <div className="pm-bento-grid">
            {whyChooseUs.map((item) => (
              <motion.div
                key={item.name}
                className="pm-bento-item"
                variants={fadeUp}
                whileHover={{ y: -4, borderColor: "rgba(255,106,26,0.45)" }}
              >
                <div className="pm-bento-check">
                  <CheckCircle2 size={16} />
                </div>
                <div className="pm-bento-name">{item.name}</div>
                <div className="pm-bento-desc">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* HOW WE WORK — light */}
      <div className="pm-theme-light">
      <section className="pm-section pm-how-wrap">
        <Reveal>
          <motion.div className="pm-section-head" variants={fadeUp} style={{ marginBottom: 8 }}>
            <h2 className="pm-section-title">
              How We <span className="accent">Work</span>
            </h2>
          </motion.div>
          <motion.p className="pm-section-sub" variants={fadeUp} style={{ marginBottom: 40 }}>
            Our proven methodology ensures consistent results.
          </motion.p>

          <div className="pm-how-row">
            {howWeWork.map((step, i) => (
              <React.Fragment key={step.title}>
                <motion.div className="pm-how-card" variants={fadeUp}>
                  <div className="pm-how-num">{String(i + 1).padStart(2, "0")}</div>
                  <div className="pm-how-title">{step.title}</div>
                  <div className="pm-how-desc">{step.desc}</div>
                </motion.div>

                {i < howWeWork.length - 1 && (
                  <div className="pm-how-connector">
                    <motion.div
                      className="pm-how-connector-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </Reveal>
      </section>
      </div>

      {/* PRICING — dark */}
      <section className="pm-section pm-pricing-wrap">
        <Reveal>
          <motion.div className="pm-section-head" variants={fadeUp} style={{ marginBottom: 8 }}>
            <h2 className="pm-section-title">
              Transparent <span className="accent">Pricing</span>
            </h2>
          </motion.div>
          <motion.p className="pm-section-sub" variants={fadeUp} style={{ marginBottom: 44 }}>
            Choose the plan that fits your growth goals.
          </motion.p>

          <div className="pm-pricing-grid">
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.name}
                className={`pm-price-card ${plan.popular ? "popular" : ""}`}
                variants={fadeUp}
                whileHover={{ y: -6 }}
              >
                {plan.popular && <div className="pm-price-badge">Popular</div>}
                <div className="pm-price-name">{plan.name}</div>
                <div className="pm-price-value">{plan.price}</div>
                <ul className="pm-price-feature-list">
                  {plan.features.map((f) => (
                    <li className="pm-price-feature" key={f}>
                      <Check size={16} />
                      {f}
                    </li>
                  ))}
                </ul>
                <motion.button
                  className="pm-price-cta"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={scrollToForm}
                >
                  Get Started
                </motion.button>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* FAQ — light, above the contact form */}
      <div className="pm-theme-light">
      <section className="pm-section pm-faq-wrap">
        <Reveal>
          <motion.div className="pm-section-head" variants={fadeUp}>
            <h2 className="pm-section-title">
              Frequently Asked <span className="accent">Questions</span>
            </h2>
          </motion.div>

          <div className="pm-faq-grid">
            {faqs.map((item, i) => (
              <FaqItem
                key={item.q}
                item={item}
                isOpen={openFaq.has(i)}
                onToggle={() => toggleFaq(i)}
              />
            ))}
          </div>
        </Reveal>
      </section>
      </div>

      {/* CONTACT — dark, last section */}
      <section className="pm-section" ref={formRef}>
        <motion.div
          className="pm-contact-wrap"
          animate={
            highlight
              ? { boxShadow: "0 0 0 3px rgba(255,106,26,0.55)" }
              : { boxShadow: "0 0 0 0px rgba(255,106,26,0)" }
          }
          transition={{ duration: 0.5 }}
          style={{ borderRadius: 22 }}
        >
          <Reveal>
            <motion.div className="pm-form-card" variants={fadeUp}>
              <div className="pm-form-heading">Send us a Message</div>

              <div className="pm-form-row">
                <div className="pm-field">
                  <label>Name *</label>
                  <input type="text" placeholder="John Doe" />
                </div>
                <div className="pm-field">
                  <label>Email *</label>
                  <input type="email" placeholder="john@example.com" />
                </div>
              </div>

              <div className="pm-form-row">
                <div className="pm-field">
                  <label>Phone *</label>
                  <input type="tel" placeholder="+91 98765 43210" />
                </div>
                <div className="pm-field">
                  <label>Subject</label>
                  <div className="pm-select-wrap">
                    <select defaultValue="General Inquiry">
                      <option>General Inquiry</option>
                      <option>Campaign Setup</option>
                      <option>Reporting Question</option>
                      <option>Partnership</option>
                    </select>
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              <div className="pm-field" style={{ marginBottom: 22 }}>
                <label>Message *</label>
                <textarea rows={5} placeholder="Tell us about your project..." />
              </div>

              <motion.button
                className="pm-submit"
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => e.preventDefault()}
              >
                <Send size={16} />
                Send Message
              </motion.button>
            </motion.div>
          </Reveal>

          <Reveal delay={0.1}>
            <motion.div className="pm-info-card" variants={fadeUp}>
              <div className="pm-info-heading">Contact Information</div>

              <div className="pm-info-row">
                <div className="pm-info-icon">
                  <MapPin size={17} />
                </div>
                <div>
                  <div className="pm-info-label">Our Office</div>
                  <div className="pm-info-value">
                    11 Block, Rajendra Nagar, Bareilly, Uttar Pradesh, India
                  </div>
                </div>
              </div>

              <div className="pm-info-row">
                <div className="pm-info-icon">
                  <Phone size={17} />
                </div>
                <div>
                  <div className="pm-info-label">Phone</div>
                  <div className="pm-info-value">
                    <a href="tel:+917055255255">+91 7055255255</a>
                  </div>
                </div>
              </div>

              <div className="pm-info-row">
                <div className="pm-info-icon">
                  <Mail size={17} />
                </div>
                <div>
                  <div className="pm-info-label">Email</div>
                  <div className="pm-info-value">
                    <a href="mailto:info@dexterityworld.com">info@dexterityworld.com</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </motion.div>
      </section>
    </div>
  );
}