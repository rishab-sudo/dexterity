import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FileText,
  Settings,
  MapPinned,
  Globe,
  Target,
  PenTool,
  ShoppingCart,
  BarChart3,
  TrendingUp,
  Search,
  ShieldCheck,
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
   Same design system as the other service sections —
   classes prefixed "so-" so all three can live on one page.
   Band order for THIS section starts dark (not light):
   Hero(dark) -> Benefits+Process(light) -> Why Choose Us(dark)
   -> How We Work(light) -> Pricing(dark) -> FAQ(light) -> Contact(dark)
--------------------------------------------------------- */

const styles = `
  .so-root {
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

  .so-theme-light {
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

  .so-grid-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,106,26,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,106,26,0.06) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
    pointer-events: none;
  }

  .so-section {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .so-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--orange);
  }
  .so-eyebrow::before {
    content: "";
    width: 18px;
    height: 1px;
    background: var(--orange);
  }

  .so-h1 {
    font-size: clamp(2.2rem, 4.6vw, 3.6rem);
    line-height: 1.05;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin: 18px 0 20px;
  }
  .so-h1 .accent {
    background: linear-gradient(100deg, var(--orange-light), var(--orange));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .so-lede {
    color: var(--muted);
    font-size: 16px;
    line-height: 1.7;
    max-width: 520px;
    margin-bottom: 14px;
  }

  .so-btn-row {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin-top: 30px;
  }

  .so-btn-primary, .so-btn-outline {
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
  .so-btn-primary {
    background: linear-gradient(120deg, var(--orange-light), var(--orange) 60%, var(--orange-deep));
    color: #0A0A0B;
    box-shadow: 0 8px 24px -8px rgba(255,106,26,0.55);
  }
  .so-btn-outline {
    background: transparent;
    color: var(--white);
    border: 1px solid var(--border-strong);
  }

  .so-hero-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 56px;
    align-items: start;
    padding: 110px 0 90px;
  }
  @media (max-width: 880px) {
    .so-hero-grid { grid-template-columns: 1fr; padding: 70px 0 50px; }
  }

  .so-cap-panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 22px;
  }
  .so-cap-title {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 16px;
    padding-left: 4px;
  }
  .so-cap-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  @media (max-width: 520px) {
    .so-cap-list { grid-template-columns: 1fr; }
  }
  .so-cap-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 14px;
    border-radius: 12px;
    border: 1px solid transparent;
    background: var(--bg-soft);
    cursor: pointer;
  }
  .so-cap-icon {
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
  .so-cap-name {
    font-size: 13.5px;
    font-weight: 700;
    line-height: 1.3;
  }
  .so-cap-sub {
    font-size: 11px;
    color: var(--muted);
    margin-top: 2px;
  }

  .so-section-head {
    text-align: center;
    margin-bottom: 32px;
  }
  .so-section-title {
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 800;
    letter-spacing: -0.01em;
  }
  .so-section-title .accent { color: var(--orange); }
  .so-section-sub {
    text-align: center;
    color: var(--muted);
    font-size: 14px;
    margin-top: 10px;
  }

  .so-benefits-wrap {
    padding: 90px 0 40px;
  }

  .so-benefits-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    padding: 0 0 30px;
  }
  @media (max-width: 900px) { .so-benefits-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 520px) { .so-benefits-grid { grid-template-columns: 1fr; } }

  .so-benefit-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 22px 18px;
  }
  .so-benefit-icon {
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
  .so-benefit-name {
    font-size: 14.5px;
    font-weight: 700;
  }

  .so-process-wrap {
    padding: 30px 0 110px;
    position: relative;
  }
  .so-process-track {
    display: flex;
    justify-content: space-between;
    position: relative;
    padding-top: 10px;
  }
  .so-process-line {
    position: absolute;
    top: 28px;
    left: 28px;
    right: 28px;
    height: 2px;
    background: var(--border);
    transform-origin: left;
  }
  .so-process-line-fill {
    position: absolute;
    top: 28px;
    left: 28px;
    height: 2px;
    background: linear-gradient(90deg, var(--orange-deep), var(--orange));
    transform-origin: left;
  }
  .so-process-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 100%;
    position: relative;
    z-index: 1;
  }
  .so-process-num {
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
  .so-process-label {
    font-size: 13px;
    font-weight: 700;
    color: var(--white);
  }
  @media (max-width: 700px) {
    .so-process-track { flex-wrap: wrap; gap: 28px 12px; }
    .so-process-line, .so-process-line-fill { display: none; }
  }
  .so-bento-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  @media (max-width: 760px) { .so-bento-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 520px) { .so-bento-grid { grid-template-columns: 1fr; } }
  .so-bento-item {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 26px 22px;
  }
  .so-bento-check {
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
  .so-bento-name { font-size: 15px; font-weight: 700; margin-bottom: 8px; }
  .so-bento-desc { font-size: 13px; color: var(--muted); line-height: 1.6; }

  .so-how-wrap { padding: 90px 0 110px; }
  .so-how-row {
    display: flex;
    align-items: stretch;
    gap: 0;
  }
  .so-how-card {
    flex: 1;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px;
    position: relative;
  }
  .so-how-num {
    position: absolute;
    top: 16px;
    right: 18px;
    font-size: 34px;
    font-weight: 800;
    color: rgba(10,10,12,0.08);
  }
  .so-how-title { font-size: 16px; font-weight: 800; margin-bottom: 10px; }
  .so-how-desc { font-size: 13px; color: var(--muted); line-height: 1.6; max-width: 88%; }
  .so-how-connector {
    width: 28px;
    flex-shrink: 0;
    align-self: center;
    height: 2px;
    background: var(--border);
    position: relative;
    overflow: hidden;
  }
  .so-how-connector-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: var(--orange);
  }
  @media (max-width: 880px) {
    .so-how-row { flex-direction: column; gap: 16px; }
    .so-how-connector { display: none; }
  }

  .so-pricing-wrap { padding: 90px 0 110px; }
  .so-pricing-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    align-items: stretch;
  }
  @media (max-width: 900px) { .so-pricing-grid { grid-template-columns: 1fr; max-width: 420px; margin: 0 auto; } }
  .so-price-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }
  .so-price-card.popular {
    border-color: var(--orange);
    box-shadow: 0 16px 34px -16px rgba(255,106,26,0.45);
  }
  .so-price-badge {
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
  .so-price-name {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }
  .so-price-value {
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 22px;
  }
  .so-price-feature-list {
    list-style: none;
    padding: 0;
    margin: 0 0 26px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
  }
  .so-price-feature {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13.5px;
    color: var(--white);
  }
  .so-price-feature svg { color: var(--orange); flex-shrink: 0; }
  .so-price-cta {
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
  .so-price-card.popular .so-price-cta {
    background: linear-gradient(100deg, var(--orange-light), var(--orange));
    color: #0A0A0B;
    border: none;
  }

  .so-faq-wrap { padding: 90px 0 110px; }
  .so-faq-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    align-items: start;
  }
  @media (max-width: 760px) { .so-faq-grid { grid-template-columns: 1fr; } }
  .so-faq-item {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
    cursor: pointer;
  }
  .so-faq-question {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 16px 18px;
  }
  .so-faq-q-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .so-faq-q-icon {
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
  .so-faq-q-text { font-size: 14px; font-weight: 700; }
  .so-faq-chevron { color: var(--muted); flex-shrink: 0; }
  .so-faq-answer-inner {
    padding: 0 18px 18px 54px;
    font-size: 13px;
    color: var(--muted);
    line-height: 1.6;
  }

  .so-contact-wrap {
    padding: 90px 0 110px;
    display: grid;
    grid-template-columns: 1.3fr 0.9fr;
    gap: 24px;
  }
  @media (max-width: 880px) { .so-contact-wrap { grid-template-columns: 1fr; } }

  .so-form-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 22px;
    padding: 34px;
  }
  .so-form-heading {
    font-size: 22px;
    font-weight: 800;
    margin-bottom: 22px;
  }
  .so-form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }
  @media (max-width: 520px) { .so-form-row { grid-template-columns: 1fr; } }
  .so-field label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }
  .so-field input,
  .so-field select,
  .so-field textarea {
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
  .so-field input::placeholder, .so-field textarea::placeholder { color: #5c5c62; }
  .so-field input:focus,
  .so-field select:focus,
  .so-field textarea:focus {
    border-color: var(--orange);
  }
  .so-field select { appearance: none; }
  .so-select-wrap { position: relative; }
  .so-select-wrap svg {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--muted);
    pointer-events: none;
  }
  .so-submit {
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

  .so-info-card {
    background: linear-gradient(165deg, var(--info-grad), var(--surface) 55%);
    border: 1px solid var(--border);
    border-radius: 22px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 22px;
    height: fit-content;
  }
  .so-info-heading {
    font-size: 18px;
    font-weight: 800;
    position: relative;
    padding-bottom: 12px;
  }
  .so-info-heading::after {
    content: "";
    position: absolute;
    left: 0; bottom: 0;
    width: 40px;
    height: 2px;
    background: var(--orange);
  }
  .so-info-row {
    display: flex;
    gap: 14px;
    align-items: flex-start;
  }
  .so-info-icon {
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
  .so-info-label {
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 4px;
  }
  .so-info-value {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.6;
  }
  .so-info-value a { color: var(--orange-light); text-decoration: none; }
`;

const capabilities = [
  { icon: FileText, name: "On-Page SEO" },
  { icon: Settings, name: "Technical SEO" },
  { icon: MapPinned, name: "Local SEO" },
  { icon: Globe, name: "Link Building" },
  { icon: Target, name: "Keyword Research" },
  { icon: PenTool, name: "Content SEO" },
  { icon: ShoppingCart, name: "E-commerce SEO" },
  { icon: BarChart3, name: "Competitor Analysis" },
];

const benefits = [
  { icon: TrendingUp, name: "Organic Traffic" },
  { icon: Search, name: "Higher Rankings" },
  { icon: MapPinned, name: "Local Dominance" },
  { icon: ShieldCheck, name: "Brand Authority" },
  { icon: Settings, name: "Technical Excellence" },
  { icon: Globe, name: "Quality Backlinks" },
  { icon: PenTool, name: "Content Relevance" },
  { icon: BarChart3, name: "Long-Term Results" },
];

const seoProcessSteps = ["Audit", "Keyword Research", "On-Page SEO", "Technical SEO", "Link Building", "Tracking"];

const whyChooseUs = [
  { name: "Organic Traffic", desc: "Drive high-quality, sustainable traffic without paying per click." },
  { name: "Higher Rankings", desc: "Dominate Google search results for keywords your customers are using." },
  { name: "Brand Authority", desc: "Establish your brand as an industry leader through top search placements." },
  { name: "Technical Excellence", desc: "Fast, mobile-friendly, and perfectly structured websites." },
];

const howWeWork = [
  { title: "Audit & Analysis", desc: "Comprehensive technical and on-page website review." },
  { title: "Keyword Strategy", desc: "Identifying high-intent keywords to target." },
  { title: "On-Page Optimization", desc: "Optimizing content, meta tags, and internal links." },
  { title: "Off-Page & Links", desc: "Building high-quality backlinks and domain authority." },
];

const pricingPlans = [
  {
    name: "Local SEO",
    price: "Custom",
    features: ["GMB Optimization", "Local Citations", "Basic On-Page", "Monthly Reporting"],
    popular: false,
  },
  {
    name: "National SEO",
    price: "Custom",
    features: ["Comprehensive On-Page", "Content Strategy", "Link Building", "Technical SEO"],
    popular: true,
  },
  {
    name: "E-Commerce SEO",
    price: "Custom",
    features: ["Product Optimization", "Category Structuring", "Advanced Schema", "Scale Link Building"],
    popular: false,
  },
];

const faqs = [
  { q: "How long does SEO take to show results?", a: "Typically, significant results take 3-6 months depending on competition and baseline authority." },
  { q: "What is the difference between organic and paid search?", a: "Organic search relies on SEO for free traffic, whereas paid search requires paying for ad placement." },
  { q: "What is on-page SEO?", a: "Optimizing elements on your website like content, meta tags, and internal links to improve rankings." },
  { q: "How do you build quality backlinks?", a: "Through digital PR, content marketing, guest posting, and relationship building with authoritative sites." },
  { q: "What is technical SEO?", a: "Ensuring your website meets the technical requirements of modern search engines like speed, mobile-friendliness, and crawlability." },
  { q: "Do you offer local SEO in Bangalore?", a: "Yes, our local SEO Bangalore services optimize your Google Business Profile and local citations to dominate regional searches." },
  { q: "How do you measure SEO ROI?", a: "We track organic traffic growth, keyword ranking improvements, and organic lead generation via Google Analytics." },
  { q: "What tools do you use for SEO?", a: "We utilize industry-leading tools including Google Search Console, Ahrefs, SEMrush, and Screaming Frog." },
  { q: "Is mobile SEO important?", a: "Crucially important. With Google's mobile-first indexing, mobile SEO is mandatory for high search engine rankings." },
  { q: "Do you implement schema markup?", a: "Yes, we implement advanced schema markup (JSON-LD) to help search engines understand your content and earn rich snippets." },
  { q: "What are Core Web Vitals?", a: "They are speed, responsiveness, and visual stability metrics that Google uses as ranking signals." },
  { q: "Do you handle content optimization?", a: "Absolutely. We ensure all website content is optimized for target keywords, user intent, and search engine algorithms." },
  { q: "Can you fix Google penalties?", a: "Yes, we conduct comprehensive SEO audits to identify and resolve algorithmic or manual penalties." },
  { q: "Why is keyword targeting important?", a: "Keyword targeting aligns your website content with the exact phrases your potential customers are searching for." },
  { q: "Do you provide monthly SEO reports?", a: "Yes, we provide transparent, detailed monthly reports tracking rankings, traffic, and conversions." },
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
    <motion.div className="so-faq-item" variants={fadeUp} onClick={onToggle} layout="position">
      <div className="so-faq-question">
        <div className="so-faq-q-left">
          <div className="so-faq-q-icon">
            <HelpCircle size={14} />
          </div>
          <div className="so-faq-q-text">{item.q}</div>
        </div>
        <motion.div
          className="so-faq-chevron"
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
            <div className="so-faq-answer-inner">{item.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SeoServicesSection() {
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
    <div className="so-root">
      <style>{styles}</style>
      <div className="so-grid-bg" />

      {/* HERO — dark */}
      <section className="so-section">
        <div className="so-hero-grid">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.span className="so-eyebrow" variants={fadeUp}>
              03. SEO Services
            </motion.span>

            <motion.h1 className="so-h1" variants={fadeUp}>
              Dominate Organic <span className="accent">Search Results</span>
            </motion.h1>

            <motion.p className="so-lede" variants={fadeUp}>
              Stop paying for every single click. Build a sustainable, long-term
              acquisition engine with our aggressive, white-hat SEO strategies. We don't
              just chase vanity metrics; we target high-intent keywords that bring buyers
              to your site.
            </motion.p>

            <motion.p className="so-lede" variants={fadeUp}>
              From deep technical audits and on-page optimization to authoritative link
              building and local map pack dominance, our comprehensive SEO methodology
              ensures you outrank the competition and capture the lion's share of your
              market.
            </motion.p>

            <motion.div className="so-btn-row" variants={fadeUp}>
              <motion.button
                className="so-btn-primary"
                whileHover={{ scale: 1.035 }}
                whileTap={{ scale: 0.97 }}
                onClick={glowCapabilities}
              >
                View Full Service
                <ArrowRight size={16} />
              </motion.button>

              <motion.button
                className="so-btn-outline"
                whileHover={{ scale: 1.035, borderColor: "#FF6A1A" }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToForm}
              >
                Get SEO Audit
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
              className="so-cap-panel"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="so-cap-title">Core Capabilities</div>
              <div className="so-cap-list">
                {capabilities.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <motion.div
                      className="so-cap-item"
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
                        className="so-cap-icon"
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
                        <div className="so-cap-name">{c.name}</div>
                        <div className="so-cap-sub">Rank higher</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* BENEFITS + SEO PROCESS — light */}
      <div className="so-theme-light">
      <section className="so-section so-benefits-wrap">
        <Reveal>
          <motion.div className="so-section-head" variants={fadeUp}>
            <h2 className="so-section-title">
              The Benefits of <span className="accent">Our SEO</span>
            </h2>
          </motion.div>
          <div className="so-benefits-grid">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <motion.div
                  className="so-benefit-card"
                  key={b.name}
                  variants={fadeUp}
                  whileHover={{ y: -4, borderColor: "rgba(255,106,26,0.45)" }}
                >
                  <div className="so-benefit-icon">
                    <Icon size={18} />
                  </div>
                  <div className="so-benefit-name">{b.name}</div>
                </motion.div>
              );
            })}
          </div>
        </Reveal>

        <div className="so-process-wrap" ref={processRef}>
          <Reveal>
            <motion.div className="so-section-head" variants={fadeUp} style={{ marginBottom: 30 }}>
              <h2 className="so-section-title">
                Our SEO <span className="accent">Process</span>
              </h2>
            </motion.div>
          </Reveal>

          <div className="so-process-track">
            <div className="so-process-line" />
            <motion.div
              className="so-process-line-fill"
              initial={{ width: 0 }}
              animate={{ width: processInView ? "calc(100% - 56px)" : 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            />
            {seoProcessSteps.map((step, i) => (
              <motion.div
                className="so-process-step"
                key={step}
                initial={{ opacity: 0, y: 16 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
              >
                <div className="so-process-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="so-process-label">{step}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      </div>

      {/* WHY CHOOSE US — dark */}
      <section className="so-section so-bento-wrap">
        <Reveal>
          <motion.div className="so-section-head" variants={fadeUp}>
            <h2 className="so-section-title">
              Why Choose <span className="accent">Us</span>
            </h2>
          </motion.div>

          <div className="so-bento-grid">
            {whyChooseUs.map((item) => (
              <motion.div
                key={item.name}
                className="so-bento-item"
                variants={fadeUp}
                whileHover={{ y: -4, borderColor: "rgba(255,106,26,0.45)" }}
              >
                <div className="so-bento-check">
                  <CheckCircle2 size={16} />
                </div>
                <div className="so-bento-name">{item.name}</div>
                <div className="so-bento-desc">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* HOW WE WORK — light */}
      <div className="so-theme-light">
      <section className="so-section so-how-wrap">
        <Reveal>
          <motion.div className="so-section-head" variants={fadeUp} style={{ marginBottom: 8 }}>
            <h2 className="so-section-title">
              How We <span className="accent">Work</span>
            </h2>
          </motion.div>
          <motion.p className="so-section-sub" variants={fadeUp} style={{ marginBottom: 40 }}>
            Our proven methodology ensures consistent results.
          </motion.p>

          <div className="so-how-row">
            {howWeWork.map((step, i) => (
              <React.Fragment key={step.title}>
                <motion.div className="so-how-card" variants={fadeUp}>
                  <div className="so-how-num">{String(i + 1).padStart(2, "0")}</div>
                  <div className="so-how-title">{step.title}</div>
                  <div className="so-how-desc">{step.desc}</div>
                </motion.div>

                {i < howWeWork.length - 1 && (
                  <div className="so-how-connector">
                    <motion.div
                      className="so-how-connector-fill"
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
      <section className="so-section so-pricing-wrap">
        <Reveal>
          <motion.div className="so-section-head" variants={fadeUp} style={{ marginBottom: 8 }}>
            <h2 className="so-section-title">
              Transparent <span className="accent">Pricing</span>
            </h2>
          </motion.div>
          <motion.p className="so-section-sub" variants={fadeUp} style={{ marginBottom: 44 }}>
            Choose the plan that fits your growth goals.
          </motion.p>

          <div className="so-pricing-grid">
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.name}
                className={`so-price-card ${plan.popular ? "popular" : ""}`}
                variants={fadeUp}
                whileHover={{ y: -6 }}
              >
                {plan.popular && <div className="so-price-badge">Popular</div>}
                <div className="so-price-name">{plan.name}</div>
                <div className="so-price-value">{plan.price}</div>
                <ul className="so-price-feature-list">
                  {plan.features.map((f) => (
                    <li className="so-price-feature" key={f}>
                      <Check size={16} />
                      {f}
                    </li>
                  ))}
                </ul>
                <motion.button
                  className="so-price-cta"
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
      <div className="so-theme-light">
      <section className="so-section so-faq-wrap">
        <Reveal>
          <motion.div className="so-section-head" variants={fadeUp}>
            <h2 className="so-section-title">
              Frequently Asked <span className="accent">Questions</span>
            </h2>
          </motion.div>

          <div className="so-faq-grid">
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
      <section className="so-section" ref={formRef}>
        <motion.div
          className="so-contact-wrap"
          animate={
            highlight
              ? { boxShadow: "0 0 0 3px rgba(255,106,26,0.55)" }
              : { boxShadow: "0 0 0 0px rgba(255,106,26,0)" }
          }
          transition={{ duration: 0.5 }}
          style={{ borderRadius: 22 }}
        >
          <Reveal>
            <motion.div className="so-form-card" variants={fadeUp}>
              <div className="so-form-heading">Send us a Message</div>

              <div className="so-form-row">
                <div className="so-field">
                  <label>Name *</label>
                  <input type="text" placeholder="John Doe" />
                </div>
                <div className="so-field">
                  <label>Email *</label>
                  <input type="email" placeholder="john@example.com" />
                </div>
              </div>

              <div className="so-form-row">
                <div className="so-field">
                  <label>Phone *</label>
                  <input type="tel" placeholder="+91 98765 43210" />
                </div>
                <div className="so-field">
                  <label>Subject</label>
                  <div className="so-select-wrap">
                    <select defaultValue="General Inquiry">
                      <option>General Inquiry</option>
                      <option>SEO Audit Request</option>
                      <option>Local SEO</option>
                      <option>Partnership</option>
                    </select>
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              <div className="so-field" style={{ marginBottom: 22 }}>
                <label>Message *</label>
                <textarea rows={5} placeholder="Tell us about your project..." />
              </div>

              <motion.button
                className="so-submit"
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
            <motion.div className="so-info-card" variants={fadeUp}>
              <div className="so-info-heading">Contact Information</div>

              <div className="so-info-row">
                <div className="so-info-icon">
                  <MapPin size={17} />
                </div>
                <div>
                  <div className="so-info-label">Our Office</div>
                  <div className="so-info-value">
                    1st floor, 1, Nyanapahalli Main Rd, Devarachiknahalli, BTM 4th Stage,
                    Bengaluru, Karnataka 560114
                  </div>
                </div>
              </div>

              <div className="so-info-row">
                <div className="so-info-icon">
                  <Phone size={17} />
                </div>
                <div>
                  <div className="so-info-label">Phone</div>
                  <div className="so-info-value">
                    <a href="tel:+917090170524">+91 70901 70524</a>
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
