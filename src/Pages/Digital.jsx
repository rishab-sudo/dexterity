import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  PenTool,
  Smartphone,
  ShoppingCart,
  Palette,
  Wrench,
  Zap,
  Database,
  AppWindow,
  Search,
  TrendingUp,
  ShieldCheck,
  Settings2,
  ShoppingBag,
  ArrowRight,
  MapPin,
  Phone,
  Send,
  ChevronDown,
  CheckCircle2,
  Check,
  HelpCircle,
} from "lucide-react";

/* ---------------------------------------------------------
   Same design system as the Digital Marketing section —
   classes prefixed "wd-" so both can live on one page.
   bg        near-black / white alternating bands
   orange    #FF6A1A primary accent / #FFA157 light / #C2410C deep
--------------------------------------------------------- */

const styles = `
  .wd-root {
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

  .wd-theme-light {
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

  .wd-grid-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,106,26,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,106,26,0.06) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
    pointer-events: none;
  }

  .wd-section {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .wd-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--orange);
  }
  .wd-eyebrow::before {
    content: "";
    width: 18px;
    height: 1px;
    background: var(--orange);
  }

  .wd-h1 {
    font-size: clamp(2.2rem, 4.6vw, 3.6rem);
    line-height: 1.05;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin: 18px 0 20px;
  }
  .wd-h1 .accent {
    background: linear-gradient(100deg, var(--orange-light), var(--orange));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .wd-lede {
    color: var(--muted);
    font-size: 16px;
    line-height: 1.7;
    max-width: 520px;
    margin-bottom: 14px;
  }

  .wd-btn-row {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin-top: 30px;
  }

  .wd-btn-primary, .wd-btn-outline {
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
  .wd-btn-primary {
    background: linear-gradient(120deg, var(--orange-light), var(--orange) 60%, var(--orange-deep));
    color: #0A0A0B;
    box-shadow: 0 8px 24px -8px rgba(255,106,26,0.55);
  }
  .wd-btn-outline {
    background: transparent;
    color: var(--white);
    border: 1px solid var(--border-strong);
  }

  .wd-hero-grid {
    display: grid;
    grid-template-columns: 0.9fr 1.1fr;
    gap: 56px;
    align-items: start;
    padding: 110px 0 90px;
  }
  @media (max-width: 880px) {
    .wd-hero-grid { grid-template-columns: 1fr; padding: 70px 0 50px; }
  }

  .wd-cap-panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 22px;
  }
  .wd-cap-title {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 16px;
    padding-left: 4px;
  }
  .wd-cap-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  @media (max-width: 520px) {
    .wd-cap-list { grid-template-columns: 1fr; }
  }
  .wd-cap-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 14px;
    border-radius: 12px;
    border: 1px solid transparent;
    background: var(--bg-soft);
    cursor: pointer;
  }
  .wd-cap-icon {
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
  .wd-cap-name {
    font-size: 13.5px;
    font-weight: 700;
    line-height: 1.3;
  }
  .wd-cap-sub {
    font-size: 11px;
    color: var(--muted);
    margin-top: 2px;
  }

  .wd-section-head {
    text-align: center;
    margin-bottom: 32px;
  }
  .wd-section-title {
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 800;
    letter-spacing: -0.01em;
  }
  .wd-section-title .accent { color: var(--orange); }
  .wd-section-sub {
    text-align: center;
    color: var(--muted);
    font-size: 14px;
    margin-top: 10px;
  }

  .wd-benefits-wrap {
    padding: 90px 0 40px;
  }

  .wd-benefits-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    padding: 0 0 30px;
  }
  @media (max-width: 900px) { .wd-benefits-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 520px) { .wd-benefits-grid { grid-template-columns: 1fr; } }

  .wd-benefit-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 22px 18px;
  }
  .wd-benefit-icon {
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
  .wd-benefit-name {
    font-size: 14.5px;
    font-weight: 700;
    margin-bottom: 6px;
  }
  .wd-benefit-desc {
    font-size: 12.5px;
    color: var(--muted);
    line-height: 1.55;
  }

  .wd-process-wrap {
    padding: 30px 0 110px;
    position: relative;
  }
  .wd-process-track {
    display: flex;
    justify-content: space-between;
    position: relative;
    padding-top: 10px;
  }
  .wd-process-line {
    position: absolute;
    top: 28px;
    left: 28px;
    right: 28px;
    height: 2px;
    background: var(--border);
    transform-origin: left;
  }
  .wd-process-line-fill {
    position: absolute;
    top: 28px;
    left: 28px;
    height: 2px;
    background: linear-gradient(90deg, var(--orange-deep), var(--orange));
    transform-origin: left;
  }
  .wd-process-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 100%;
    position: relative;
    z-index: 1;
  }
  .wd-process-num {
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
  .wd-process-label {
    font-size: 13px;
    font-weight: 700;
    color: var(--white);
  }
  @media (max-width: 700px) {
    .wd-process-track { flex-wrap: wrap; gap: 28px 12px; }
    .wd-process-line, .wd-process-line-fill { display: none; }
  }

  .wd-bento-wrap { padding: 130px 0 110px; }
  .wd-bento-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  @media (max-width: 760px) { .wd-bento-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 520px) { .wd-bento-grid { grid-template-columns: 1fr; } }
  .wd-bento-item {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 26px 22px;
  }
  .wd-bento-check {
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
  .wd-bento-name { font-size: 15px; font-weight: 700; margin-bottom: 8px; }
  .wd-bento-desc { font-size: 13px; color: var(--muted); line-height: 1.6; }

  .wd-how-wrap { padding: 90px 0 110px; }
  .wd-how-row {
    display: flex;
    align-items: stretch;
    gap: 0;
  }
  .wd-how-card {
    flex: 1;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px;
    position: relative;
  }
  .wd-how-num {
    position: absolute;
    top: 16px;
    right: 18px;
    font-size: 34px;
    font-weight: 800;
    color: rgba(255,255,255,0.08);
  }
  .wd-how-title { font-size: 16px; font-weight: 800; margin-bottom: 10px; }
  .wd-how-desc { font-size: 13px; color: var(--muted); line-height: 1.6; max-width: 88%; }
  .wd-how-connector {
    width: 28px;
    flex-shrink: 0;
    align-self: center;
    height: 2px;
    background: var(--border);
    position: relative;
    overflow: hidden;
  }
  .wd-how-connector-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: var(--orange);
  }
  @media (max-width: 880px) {
    .wd-how-row { flex-direction: column; gap: 16px; }
    .wd-how-connector { display: none; }
  }

  .wd-pricing-wrap { padding: 90px 0 110px; }
  .wd-pricing-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    align-items: stretch;
  }
  @media (max-width: 900px) { .wd-pricing-grid { grid-template-columns: 1fr; max-width: 420px; margin: 0 auto; } }
  .wd-price-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }
  .wd-price-card.popular {
    border-color: var(--orange);
    box-shadow: 0 16px 34px -16px rgba(255,106,26,0.45);
  }
  .wd-price-badge {
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
  .wd-price-name {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }
  .wd-price-value {
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 22px;
  }
  .wd-price-feature-list {
    list-style: none;
    padding: 0;
    margin: 0 0 26px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
  }
  .wd-price-feature {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13.5px;
    color: var(--white);
  }
  .wd-price-feature svg { color: var(--orange); flex-shrink: 0; }
  .wd-price-cta {
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
  .wd-price-card.popular .wd-price-cta {
    background: linear-gradient(100deg, var(--orange-light), var(--orange));
    color: #0A0A0B;
    border: none;
  }

  .wd-contact-wrap {
    padding: 90px 0 110px;
    display: grid;
    grid-template-columns: 1.3fr 0.9fr;
    gap: 24px;
  }
  @media (max-width: 880px) { .wd-contact-wrap { grid-template-columns: 1fr; } }

  .wd-form-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 22px;
    padding: 34px;
  }
  .wd-form-heading {
    font-size: 22px;
    font-weight: 800;
    margin-bottom: 22px;
  }
  .wd-form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }
  @media (max-width: 520px) { .wd-form-row { grid-template-columns: 1fr; } }
  .wd-field label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }
  .wd-field input,
  .wd-field select,
  .wd-field textarea {
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
  .wd-field input::placeholder, .wd-field textarea::placeholder { color: #6b6b73; }
  .wd-field input:focus,
  .wd-field select:focus,
  .wd-field textarea:focus {
    border-color: var(--orange);
  }
  .wd-field select { appearance: none; }
  .wd-select-wrap { position: relative; }
  .wd-select-wrap svg {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--muted);
    pointer-events: none;
  }
  .wd-submit {
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

  .wd-info-card {
    background: linear-gradient(165deg, var(--info-grad), var(--surface) 55%);
    border: 1px solid var(--border);
    border-radius: 22px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 22px;
    height: fit-content;
  }
  .wd-info-heading {
    font-size: 18px;
    font-weight: 800;
    position: relative;
    padding-bottom: 12px;
  }
  .wd-info-heading::after {
    content: "";
    position: absolute;
    left: 0; bottom: 0;
    width: 40px;
    height: 2px;
    background: var(--orange);
  }
  .wd-info-row {
    display: flex;
    gap: 14px;
    align-items: flex-start;
  }
  .wd-info-icon {
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
  .wd-info-label {
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 4px;
  }
  .wd-info-value {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.6;
  }
  .wd-info-value a { color: var(--orange-light); text-decoration: none; }

  .wd-faq-wrap { padding: 90px 0 130px; }
  .wd-faq-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    align-items: start;
  }
  @media (max-width: 760px) { .wd-faq-grid { grid-template-columns: 1fr; } }
  .wd-faq-item {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
    cursor: pointer;
  }
  .wd-faq-question {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 16px 18px;
  }
  .wd-faq-q-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .wd-faq-q-icon {
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
  .wd-faq-q-text { font-size: 14px; font-weight: 700; }
  .wd-faq-chevron { color: var(--muted); flex-shrink: 0; }
  .wd-faq-answer-inner {
    padding: 0 18px 18px 54px;
    font-size: 13px;
    color: var(--muted);
    line-height: 1.6;
  }
`;

const capabilities = [
  { icon: PenTool, name: "Custom Web Design" },
  { icon: Smartphone, name: "Responsive Design" },
  { icon: ShoppingCart, name: "E-Commerce" },
  { icon: Palette, name: "UI/UX Design" },
  { icon: Wrench, name: "Maintenance" },
  { icon: Zap, name: "Performance" },
  { icon: Database, name: "CMS Development" },
  { icon: AppWindow, name: "Custom Web Apps" },
];

const benefits = [
  { icon: Smartphone, name: "Mobile Responsive", desc: "Flawless experience across all devices." },
  { icon: Zap, name: "Fast Loading", desc: "Optimized for lightning-fast speeds." },
  { icon: Search, name: "SEO Friendly", desc: "Built with search engines in mind." },
  { icon: PenTool, name: "Custom Design", desc: "Unique layouts tailored to your brand." },
  { icon: TrendingUp, name: "High Conversion", desc: "UI/UX designed to turn visitors into buyers." },
  { icon: ShieldCheck, name: "Secure & Scalable", desc: "Robust architecture that grows with you." },
  { icon: Settings2, name: "Easy CMS", desc: "Manage content effortlessly without coding." },
  { icon: ShoppingBag, name: "E-Commerce Ready", desc: "Seamless shopping experiences integrated." },
];

const devProcessSteps = ["Wireframing", "UI/UX Design", "Development", "Testing", "Launch", "Maintenance"];

const whyChooseUs = [
  { name: "Custom Design", desc: "Unique interfaces tailored to your brand identity." },
  { name: "Responsive Layouts", desc: "Flawless performance across all devices." },
  { name: "Fast Loading", desc: "Optimized for speed to retain users and boost SEO." },
  { name: "Conversion Focused", desc: "Strategic UX/UI design to maximize leads." },
];

const howWeWork = [
  { title: "Discovery", desc: "Understanding your business goals and audience." },
  { title: "Wireframing", desc: "Mapping out the user journey and site structure." },
  { title: "Development", desc: "Coding the front-end and integrating the CMS." },
  { title: "Testing & Launch", desc: "Rigorous QA before going live." },
];

const pricingPlans = [
  {
    name: "Business Site",
    price: "Custom",
    features: ["5-10 Pages", "Responsive Design", "Basic SEO", "Contact Forms"],
    popular: false,
  },
  {
    name: "E-Commerce",
    price: "Custom",
    features: ["Product Catalog", "Payment Gateway", "Inventory Management", "Advanced SEO"],
    popular: true,
  },
  {
    name: "Custom Web App",
    price: "Custom",
    features: ["Complex Features", "User Portals", "API Integrations", "High Scalability"],
    popular: false,
  },
];

const faqs = [
  { q: "What is website design?", a: "The process of creating the visual look, layout, and user experience of a website." },
  { q: "What is web development?", a: "The coding and technical programming that makes the website function." },
  { q: "Do you build responsive design websites?", a: "Yes, all our websites are fully responsive and optimized for mobile devices." },
  { q: "What is UX design vs UI design?", a: "UX (User Experience) focuses on the journey and usability; UI (User Interface) focuses on visual elements." },
  { q: "Do you build e-commerce websites?", a: "Yes, we build robust e-commerce websites on platforms like Shopify and WooCommerce." },
  { q: "Do you offer mobile app design?", a: "Yes, we design intuitive interfaces for native and progressive web apps." },
  { q: "What is website optimization?", a: "Improving elements to enhance user engagement and conversion rates." },
  { q: "How do you handle performance optimization?", a: "We optimize code, compress images, and use CDNs to ensure lightning-fast page speed." },
  { q: "Is website security included?", a: "Yes, we implement SSL, secure hosting environments, and robust security protocols." },
  { q: "What CMS do you use?", a: "We specialize in WordPress, Shopify, and custom React/Node.js builds." },
  { q: "How do you improve conversion rate?", a: "Through strategic placement of CTAs, clear messaging, and frictionless checkout processes." },
  { q: "Do you use Figma or Adobe XD?", a: "We primarily use Figma for collaborative, high-fidelity UI/UX design." },
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
    <motion.div className="wd-faq-item" variants={fadeUp} onClick={onToggle} layout="position">
      <div className="wd-faq-question">
        <div className="wd-faq-q-left">
          <div className="wd-faq-q-icon">
            <HelpCircle size={14} />
          </div>
          <div className="wd-faq-q-text">{item.q}</div>
        </div>
        <motion.div
          className="wd-faq-chevron"
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
            <div className="wd-faq-answer-inner">{item.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function WebDesigningSection() {
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
    <div className="wd-root">
      <style>{styles}</style>
      <div className="wd-grid-bg" />

      {/* HERO */}
      <div className="wd-theme-light">
      <section className="wd-section">
        <div className="wd-hero-grid">
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
              className="wd-cap-panel"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="wd-cap-title">Core Capabilities</div>
              <div className="wd-cap-list">
                {capabilities.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <motion.div
                      className="wd-cap-item"
                      key={c.name}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.25 + i * 0.05 }}
                      whileHover={{
                        y: -3,
                        borderColor: "rgba(255,106,26,0.55)",
                        backgroundColor: "#EDEDF1",
                        boxShadow: "0 10px 22px -12px rgba(0,0,0,0.22)",
                      }}
                      onHoverStart={() => setHoveredCap(i)}
                      onHoverEnd={() => setHoveredCap(null)}
                    >
                      <motion.div
                        className="wd-cap-icon"
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
                        <div className="wd-cap-name">{c.name}</div>
                        <div className="wd-cap-sub">Expert solution</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.span className="wd-eyebrow" variants={fadeUp}>
              02. Web Designing
            </motion.span>

            <motion.h1 className="wd-h1" variants={fadeUp}>
              Digital Experiences <span className="accent">That Captivate</span>
            </motion.h1>

            <motion.p className="wd-lede" variants={fadeUp}>
              Your website is your ultimate digital storefront. A poor design costs you
              credibility and revenue. We build blazing-fast, aesthetically stunning
              websites meticulously optimized for user experience and conversions.
            </motion.p>

            <motion.p className="wd-lede" variants={fadeUp}>
              Whether you need a sleek corporate portfolio, a robust e-commerce platform,
              or a custom web application, our development team utilizes the latest tech
              stacks to ensure your site is secure, scalable, and responsive on all devices.
            </motion.p>

            <motion.div className="wd-btn-row" variants={fadeUp}>
              <motion.button
                className="wd-btn-primary"
                whileHover={{ scale: 1.035 }}
                whileTap={{ scale: 0.97 }}
                onClick={glowCapabilities}
              >
                View Full Service
                <ArrowRight size={16} />
              </motion.button>

              <motion.button
                className="wd-btn-outline"
                whileHover={{ scale: 1.035, borderColor: "#FF6A1A" }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToForm}
              >
                Request a Redesign
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      </div>

      {/* BENEFITS + DEVELOPMENT PROCESS */}
      <section className="wd-section wd-benefits-wrap">
        <Reveal>
          <motion.div className="wd-section-head" variants={fadeUp}>
            <h2 className="wd-section-title">
              The Benefits of <span className="accent">Our Websites</span>
            </h2>
          </motion.div>
          <div className="wd-benefits-grid">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <motion.div
                  className="wd-benefit-card"
                  key={b.name}
                  variants={fadeUp}
                  whileHover={{ y: -4, borderColor: "rgba(255,106,26,0.45)" }}
                >
                  <div className="wd-benefit-icon">
                    <Icon size={18} />
                  </div>
                  <div className="wd-benefit-name">{b.name}</div>
                  <div className="wd-benefit-desc">{b.desc}</div>
                </motion.div>
              );
            })}
          </div>
        </Reveal>

        <div className="wd-process-wrap" ref={processRef}>
          <Reveal>
            <motion.div className="wd-section-head" variants={fadeUp} style={{ marginBottom: 30 }}>
              <h2 className="wd-section-title">
                Our Development <span className="accent">Process</span>
              </h2>
            </motion.div>
          </Reveal>

          <div className="wd-process-track">
            <div className="wd-process-line" />
            <motion.div
              className="wd-process-line-fill"
              initial={{ width: 0 }}
              animate={{ width: processInView ? "calc(100% - 56px)" : 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            />
            {devProcessSteps.map((step, i) => (
              <motion.div
                className="wd-process-step"
                key={step}
                initial={{ opacity: 0, y: 16 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
              >
                <div className="wd-process-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="wd-process-label">{step}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <div className="wd-theme-light">
      <section className="wd-section wd-bento-wrap">
        <Reveal>
          <motion.div className="wd-section-head" variants={fadeUp}>
            <h2 className="wd-section-title">
              Why Choose <span className="accent">Us</span>
            </h2>
          </motion.div>

          <div className="wd-bento-grid">
            {whyChooseUs.map((item) => (
              <motion.div
                key={item.name}
                className="wd-bento-item"
                variants={fadeUp}
                whileHover={{ y: -4, borderColor: "rgba(255,106,26,0.45)" }}
              >
                <div className="wd-bento-check">
                  <CheckCircle2 size={16} />
                </div>
                <div className="wd-bento-name">{item.name}</div>
                <div className="wd-bento-desc">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </section>
      </div>

      {/* HOW WE WORK */}
      <section className="wd-section wd-how-wrap">
        <Reveal>
          <motion.div className="wd-section-head" variants={fadeUp} style={{ marginBottom: 8 }}>
            <h2 className="wd-section-title">
              How We <span className="accent">Work</span>
            </h2>
          </motion.div>
          <motion.p className="wd-section-sub" variants={fadeUp} style={{ marginBottom: 40 }}>
            Our proven methodology ensures consistent results.
          </motion.p>

          <div className="wd-how-row">
            {howWeWork.map((step, i) => (
              <React.Fragment key={step.title}>
                <motion.div className="wd-how-card" variants={fadeUp}>
                  <div className="wd-how-num">{String(i + 1).padStart(2, "0")}</div>
                  <div className="wd-how-title">{step.title}</div>
                  <div className="wd-how-desc">{step.desc}</div>
                </motion.div>

                {i < howWeWork.length - 1 && (
                  <div className="wd-how-connector">
                    <motion.div
                      className="wd-how-connector-fill"
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

      {/* PRICING */}
      <div className="wd-theme-light">
      <section className="wd-section wd-pricing-wrap">
        <Reveal>
          <motion.div className="wd-section-head" variants={fadeUp} style={{ marginBottom: 8 }}>
            <h2 className="wd-section-title">
              Transparent <span className="accent">Pricing</span>
            </h2>
          </motion.div>
          <motion.p className="wd-section-sub" variants={fadeUp} style={{ marginBottom: 44 }}>
            Choose the plan that fits your growth goals.
          </motion.p>

          <div className="wd-pricing-grid">
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.name}
                className={`wd-price-card ${plan.popular ? "popular" : ""}`}
                variants={fadeUp}
                whileHover={{ y: -6 }}
              >
                {plan.popular && <div className="wd-price-badge">Popular</div>}
                <div className="wd-price-name">{plan.name}</div>
                <div className="wd-price-value">{plan.price}</div>
                <ul className="wd-price-feature-list">
                  {plan.features.map((f) => (
                    <li className="wd-price-feature" key={f}>
                      <Check size={16} />
                      {f}
                    </li>
                  ))}
                </ul>
                <motion.button
                  className="wd-price-cta"
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
      </div>

      {/* CONTACT */}
      <section className="wd-section" ref={formRef}>
        <motion.div
          className="wd-contact-wrap"
          animate={
            highlight
              ? { boxShadow: "0 0 0 3px rgba(255,106,26,0.55)" }
              : { boxShadow: "0 0 0 0px rgba(255,106,26,0)" }
          }
          transition={{ duration: 0.5 }}
          style={{ borderRadius: 22 }}
        >
          <Reveal>
            <motion.div className="wd-form-card" variants={fadeUp}>
              <div className="wd-form-heading">Send us a Message</div>

              <div className="wd-form-row">
                <div className="wd-field">
                  <label>Name *</label>
                  <input type="text" placeholder="John Doe" />
                </div>
                <div className="wd-field">
                  <label>Email *</label>
                  <input type="email" placeholder="john@example.com" />
                </div>
              </div>

              <div className="wd-form-row">
                <div className="wd-field">
                  <label>Phone *</label>
                  <input type="tel" placeholder="+91 98765 43210" />
                </div>
                <div className="wd-field">
                  <label>Subject</label>
                  <div className="wd-select-wrap">
                    <select defaultValue="General Inquiry">
                      <option>General Inquiry</option>
                      <option>New Website</option>
                      <option>Redesign</option>
                      <option>Partnership</option>
                    </select>
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              <div className="wd-field" style={{ marginBottom: 22 }}>
                <label>Message *</label>
                <textarea rows={5} placeholder="Tell us about your project..." />
              </div>

              <motion.button
                className="wd-submit"
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
            <motion.div className="wd-info-card" variants={fadeUp}>
              <div className="wd-info-heading">Contact Information</div>

              <div className="wd-info-row">
                <div className="wd-info-icon">
                  <MapPin size={17} />
                </div>
                <div>
                  <div className="wd-info-label">Our Office</div>
                  <div className="wd-info-value">
                    1st floor, 1, Nyanapahalli Main Rd, Devarachiknahalli, BTM 4th Stage,
                    Bengaluru, Karnataka 560114
                  </div>
                </div>
              </div>

              <div className="wd-info-row">
                <div className="wd-info-icon">
                  <Phone size={17} />
                </div>
                <div>
                  <div className="wd-info-label">Phone</div>
                  <div className="wd-info-value">
                    <a href="tel:+917090170524">+91 70901 70524</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </motion.div>
      </section>

      {/* FAQ */}
      <div className="wd-theme-light">
      <section className="wd-section wd-faq-wrap">
        <Reveal>
          <motion.div className="wd-section-head" variants={fadeUp}>
            <h2 className="wd-section-title">
              Frequently Asked <span className="accent">Questions</span>
            </h2>
          </motion.div>

          <div className="wd-faq-grid">
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
    </div>
  );
}
