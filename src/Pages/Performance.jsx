import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Target,
  TrendingDown,
  Crosshair,
  DollarSign,
  Search,
  Share2,
  Repeat,
  MousePointerClick,
  ClipboardList,
  BarChart3,
  Rocket,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Send,
  Plus,
  Minus,
  Check,
  PenSquare,
} from "lucide-react";

/* ---------------------------------------------------------
   DexterityWorld — Performance Marketing
   Reshaped to follow the same section flow as the SEO
   service page: Hero+Capabilities, Benefits, Process (timeline),
   Why Choose Us, How We Work (tabs), Pricing, FAQ,
   Other Services, Contact.
--------------------------------------------------------- */

const styles = `
  .pm-root {
    --bg: #111113;
    --bg-soft: #18181B;
    --surface: #1D1D22;
    --border: rgba(255,255,255,0.12);
    --border-strong: rgba(255,255,255,0.24);
    --orange: #FF6A1A;
    --orange-light: #FFA157;
    --orange-deep: #C2410C;
    --white: #FFFFFF;
    --muted: #B7B7C0;
    --ink: #121214;
    --ink-muted: #5A5A62;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, sans-serif;
  }

  .pm-section { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
  .pm-light { background: #FFFFFF; color: var(--ink); }
  .pm-mist { background: #F7F7F9; color: var(--ink); }
  .pm-dark { background: var(--bg); color: var(--white); }

  .pm-btn-primary, .pm-btn-outline {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 26px; border-radius: 10px; font-size: 14px; font-weight: 700;
    cursor: pointer; border: none; font-family: inherit;
  }
  .pm-btn-primary {
    background: linear-gradient(120deg, var(--orange-light), var(--orange) 60%, var(--orange-deep));
    color: #0A0A0B; box-shadow: 0 8px 24px -8px rgba(255,106,26,0.55);
  }
  .pm-btn-outline { background: transparent; border: 1px solid rgba(10,10,12,0.24); color: var(--ink); }
  .pm-dark .pm-btn-outline { border: 1px solid var(--border-strong); color: var(--white); }

  .pm-eyebrow { font-size: 13px; color: var(--orange); font-weight: 700; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
  .pm-eyebrow::before { content: ""; width: 22px; height: 1.5px; background: var(--orange); display: inline-block; }

  .pm-h2 { font-size: clamp(1.6rem, 3vw, 2.1rem); font-weight: 800; letter-spacing: -0.01em; margin: 0 0 14px; }
  .pm-h2 em { font-style: normal; color: var(--orange); }
  .pm-h2 .on-dark { color: var(--orange-light); }

  /* ---------- HERO ---------- */
  .pm-hero-wrap { padding: 84px 0 70px; }
  .pm-hero-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 40px; align-items: center; }
  @media (max-width: 860px) { .pm-hero-grid { grid-template-columns: 1fr; } }
  .pm-h1 { font-size: clamp(2.3rem, 4.6vw, 3.2rem); line-height: 1.08; font-weight: 800; letter-spacing: -0.02em; margin: 0 0 20px; }
  .pm-h1 .accent { color: var(--orange); }
  .pm-lede { color: var(--ink-muted); font-size: 15.5px; line-height: 1.75; max-width: 480px; margin-bottom: 16px; }
  .pm-dark .pm-lede { color: var(--muted); }
  .pm-btn-row { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 14px; }

  /* Core capabilities card (mirrors the reference SEO hero panel) */
  .pm-capabilities-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: 22px; padding: 26px;
    transition: box-shadow 0.5s ease, border-color 0.5s ease;
  }
  .pm-capabilities-card.highlight {
    border-color: var(--orange);
    box-shadow: 0 0 0 2px rgba(255,106,26,0.5), 0 0 50px 8px rgba(255,106,26,0.28);
  }
  .pm-capabilities-kicker { font-size: 12px; font-weight: 700; letter-spacing: 0.04em; color: var(--muted); margin-bottom: 18px; }
  .pm-capabilities-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  @media (max-width: 480px) { .pm-capabilities-grid { grid-template-columns: 1fr; } }
  .pm-cap-item {
    display: flex; gap: 10px; align-items: flex-start; background: var(--bg-soft); border: 1px solid var(--border);
    border-radius: 12px; padding: 12px; transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
  }
  .pm-cap-item:hover { transform: translateY(-3px); border-color: rgba(255,106,26,0.55); background: rgba(255,106,26,0.08); }
  .pm-cap-icon { width: 32px; height: 32px; border-radius: 9px; background: rgba(255,106,26,0.14); color: var(--orange-light); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .pm-cap-title { font-size: 12.5px; font-weight: 700; line-height: 1.3; }
  .pm-cap-sub { font-size: 11px; color: var(--muted); margin-top: 2px; }

  /* ---------- BENEFITS ---------- */
  .pm-benefits-wrap { padding: 84px 0; text-align: center; }
  .pm-benefits-lede { color: var(--ink-muted); max-width: 560px; margin: 0 auto 40px; font-size: 15px; line-height: 1.7; }
  .pm-benefits-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; text-align: left; }
  @media (max-width: 860px) { .pm-benefits-grid { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 480px) { .pm-benefits-grid { grid-template-columns: 1fr; } }
  .pm-benefit-card {
    background: #F7F7F9; border: 1px solid rgba(10,10,12,0.10); border-radius: 16px; padding: 22px;
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  }
  .pm-benefit-card:hover {
    transform: translateY(-5px); border-color: rgba(255,106,26,0.4);
    box-shadow: 0 16px 34px -18px rgba(194,65,12,0.35);
  }
  .pm-benefit-dot { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: rgba(255,106,26,0.12); color: var(--orange-deep); margin-bottom: 14px; }
  .pm-benefit-title { font-size: 14.5px; font-weight: 700; margin-bottom: 6px; }
  .pm-benefit-desc { font-size: 12.5px; color: var(--ink-muted); line-height: 1.55; }

  /* ---------- PROCESS (timeline) ---------- */
  .pm-process-wrap { padding: 84px 0 96px; text-align: center; }
  .pm-timeline { position: relative; margin-top: 56px; display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; }
  @media (max-width: 900px) { .pm-timeline { grid-template-columns: repeat(3, 1fr); row-gap: 44px; } }
  @media (max-width: 520px) { .pm-timeline { grid-template-columns: 1fr; row-gap: 36px; } }
  .pm-timeline::before {
    content: ""; position: absolute; top: 30px; left: 0; right: 0; height: 1.5px;
    background: #2B2B2E;
  }
  @media (max-width: 900px) { .pm-timeline::before { display: none; } }
  .pm-timeline-step { position: relative; display: flex; flex-direction: column; align-items: center; padding: 0 8px; }
  .pm-timeline-num {
    width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 14px; color: var(--orange); background: #fff;
    margin-bottom: 16px; position: relative; z-index: 1; border: 2.5px solid var(--orange);
    transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease;
  }
  .pm-timeline-step:hover .pm-timeline-num { transform: scale(1.08); background: var(--orange); color: #fff; }
  .pm-timeline-title { font-size: 13.5px; font-weight: 700; margin-bottom: 6px; }
  .pm-timeline-desc { font-size: 12px; color: var(--ink-muted); line-height: 1.55; max-width: 160px; }

  /* ---------- WHY CHOOSE US (dark) ---------- */
  .pm-why-wrap { padding: 84px 0; text-align: center; }
  .pm-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 40px; text-align: left; }
  @media (max-width: 780px) { .pm-why-grid { grid-template-columns: 1fr; } }
  .pm-why-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 26px;
    transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
  }
  .pm-why-card:hover { transform: translateY(-5px); border-color: rgba(255,106,26,0.5); background: #232328; }
  .pm-why-icon { width: 40px; height: 40px; border-radius: 10px; background: rgba(255,106,26,0.14); color: var(--orange-light); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
  .pm-why-title { font-weight: 700; font-size: 15px; margin-bottom: 8px; }
  .pm-why-desc { font-size: 13px; color: var(--muted); line-height: 1.6; }

  /* ---------- HOW WE WORK (static cards, light) ---------- */
  .pm-work-wrap { padding: 84px 0; }
  .pm-work-head { text-align: center; margin-bottom: 44px; }
  .pm-work-lede { color: var(--ink-muted); max-width: 560px; margin: 0 auto; font-size: 15px; line-height: 1.7; }
  .pm-work-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
  @media (max-width: 900px) { .pm-work-grid { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 520px) { .pm-work-grid { grid-template-columns: 1fr; } }
  .pm-work-card {
    background: #fff; border: 1px solid rgba(10,10,12,0.10); border-radius: 18px; padding: 26px;
    transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  }
  .pm-work-card:hover {
    transform: translateY(-6px); border-color: rgba(255,106,26,0.45);
    box-shadow: 0 20px 40px -22px rgba(194,65,12,0.35);
  }
  .pm-work-icon {
    width: 46px; height: 46px; border-radius: 12px; margin-bottom: 18px;
    background: rgba(255,106,26,0.12); color: var(--orange-deep);
    display: flex; align-items: center; justify-content: center;
  }
  .pm-work-title { font-size: 14.5px; font-weight: 700; margin-bottom: 8px; }
  .pm-work-desc { font-size: 12.5px; color: var(--ink-muted); line-height: 1.6; }

  /* ---------- PRICING (dark) ---------- */
  .pm-pricing-wrap { padding: 90px 0; text-align: center; }
  .pm-pricing-sub { color: var(--muted); font-size: 14px; margin-bottom: 44px; }
  .pm-pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; text-align: left; }
  @media (max-width: 860px) { .pm-pricing-grid { grid-template-columns: 1fr; } }
  .pm-price-card {
    position: relative; background: var(--surface); border: 1px solid var(--border); border-radius: 18px; padding: 30px; overflow: hidden;
    transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  }
  .pm-price-card:hover { transform: translateY(-6px); border-color: rgba(255,106,26,0.55); box-shadow: 0 20px 40px -20px rgba(255,106,26,0.35); }
  .pm-price-card.featured { border-color: var(--orange); }
  .pm-price-ribbon {
    position: absolute; top: 14px; right: -30px; transform: rotate(40deg);
    background: var(--orange); color: #0A0A0B; font-size: 10px; font-weight: 800;
    padding: 4px 34px; letter-spacing: 0.04em;
  }
  .pm-price-tier { font-size: 11px; font-weight: 700; letter-spacing: 0.05em; color: var(--muted); margin-bottom: 6px; }
  .pm-price-name { font-size: 22px; font-weight: 800; margin-bottom: 20px; }
  .pm-price-list { list-style: none; margin: 0 0 26px; padding: 0; display: flex; flex-direction: column; gap: 11px; }
  .pm-price-list li { display: flex; align-items: center; gap: 9px; font-size: 13.5px; color: var(--muted); }
  .pm-price-list svg { color: var(--orange-light); flex-shrink: 0; }
  .pm-price-btn { width: 100%; padding: 13px; border-radius: 10px; border: 1px solid var(--border-strong); background: transparent; color: var(--white); font-weight: 700; font-size: 14px; cursor: pointer; font-family: inherit; }
  .pm-price-card.featured .pm-price-btn { border: none; background: linear-gradient(120deg, var(--orange-light), var(--orange)); color: #0A0A0B; }

  /* ---------- FAQ (light) ---------- */
  .pm-faq-wrap { padding: 90px 0; }
  .pm-faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 20px; }
  @media (max-width: 780px) { .pm-faq-grid { grid-template-columns: 1fr; } }
  .pm-faq-item { background: #F7F7F9; border: 1px solid rgba(10,10,12,0.10); border-radius: 14px; padding: 16px 18px; cursor: pointer; }
  .pm-faq-q { display: flex; align-items: center; justify-content: space-between; gap: 12px; font-weight: 700; font-size: 14px; }
  .pm-faq-q svg { color: var(--orange-deep); flex-shrink: 0; }
  .pm-faq-a { font-size: 13.5px; color: var(--ink-muted); line-height: 1.65; margin-top: 10px; }

  /* ---------- OTHER SERVICES (dark) ---------- */
  .pm-services-wrap { padding: 90px 0 100px; text-align: center; }
  .pm-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; text-align: left; margin-top: 40px; }
  @media (max-width: 780px) { .pm-services-grid { grid-template-columns: 1fr; } }
  .pm-service-card { border: 1px solid var(--border); background: var(--surface); border-radius: 18px; padding: 26px; text-align: center; }
  .pm-service-icon { width: 52px; height: 52px; border-radius: 14px; margin: 0 auto 14px; display: flex; align-items: center; justify-content: center; color: #0A0A0B; background: linear-gradient(135deg, var(--orange-light), var(--orange)); }
  .pm-service-name { font-weight: 800; font-size: 16px; margin-bottom: 8px; }
  .pm-service-desc { font-size: 13px; color: var(--muted); line-height: 1.6; }

  /* ---------- CONTACT (dark) ---------- */
  .pm-contact-wrap { padding: 90px 0 100px; }
  .pm-contact-grid { display: grid; grid-template-columns: 1.3fr 0.9fr; gap: 24px; }
  @media (max-width: 860px) { .pm-contact-grid { grid-template-columns: 1fr; } }
  .pm-form-card-dark { background: var(--surface); border: 1px solid var(--border); border-radius: 22px; padding: 34px; }
  .pm-form-heading { font-size: 22px; font-weight: 800; margin-bottom: 22px; }
  .pm-field-dark { margin-bottom: 16px; }
  .pm-field-dark label { display: block; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
  .pm-field-dark input, .pm-field-dark select, .pm-field-dark textarea {
    width: 100%; background: var(--bg-soft); border: 1px solid var(--border); border-radius: 10px;
    padding: 12px 14px; color: var(--white); font-size: 14px; font-family: inherit; outline: none; box-sizing: border-box;
  }
  .pm-field-dark input::placeholder, .pm-field-dark textarea::placeholder { color: #5c5c62; }
  .pm-field-dark input:focus, .pm-field-dark textarea:focus, .pm-field-dark select:focus { border-color: var(--orange); }
  .pm-form-row-dark { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media (max-width: 520px) { .pm-form-row-dark { grid-template-columns: 1fr; } }
  .pm-submit { width: 100%; margin-top: 6px; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 15px; border-radius: 10px; border: none; font-weight: 700; font-size: 14.5px; color: #0A0A0B; background: linear-gradient(100deg, var(--orange-light), var(--orange)); cursor: pointer; }
  .pm-info-card { background: linear-gradient(165deg, #22160C, var(--surface) 55%); border: 1px solid var(--border); border-radius: 22px; padding: 30px; display: flex; flex-direction: column; gap: 22px; height: fit-content; }
  .pm-info-heading { font-size: 18px; font-weight: 800; position: relative; padding-bottom: 12px; }
  .pm-info-heading::after { content: ""; position: absolute; left: 0; bottom: 0; width: 40px; height: 2px; background: var(--orange); }
  .pm-info-row { display: flex; gap: 14px; align-items: flex-start; }
  .pm-info-icon { width: 38px; height: 38px; border-radius: 10px; background: rgba(255,106,26,0.14); color: var(--orange-light); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .pm-info-label { font-size: 13px; font-weight: 700; margin-bottom: 4px; }
  .pm-info-value { font-size: 13px; color: var(--muted); line-height: 1.6; }
  .pm-info-value a { color: var(--orange-light); text-decoration: none; }
`;

/* ---------------------------------------------------------
   Content
--------------------------------------------------------- */

const capabilities = [
  { icon: Search, title: "Search Ads", sub: "Higher ROAS" },
  { icon: Share2, title: "Social Ads", sub: "Better targeting" },
  { icon: Target, title: "Retargeting", sub: "Recover lost leads" },
  { icon: MousePointerClick, title: "Landing Page CRO", sub: "More conversions" },
  { icon: ClipboardList, title: "Campaign Strategy", sub: "Clear roadmap" },
  { icon: DollarSign, title: "Budget Optimization", sub: "Lower CPL" },
  { icon: BarChart3, title: "Performance Reporting", sub: "Full transparency" },
  { icon: Repeat, title: "A/B Testing", sub: "Continuous lift" },
];

const benefits = [
  { icon: TrendingDown, title: "Lower Cost Per Lead", desc: "Spend goes toward audiences that actually convert." },
  { icon: Target, title: "Higher Conversion Rate", desc: "Campaigns matched to intent, not just impressions." },
  { icon: Crosshair, title: "Precise Ad Targeting", desc: "Reach the buyers closest to a decision." },
  { icon: DollarSign, title: "Maximised ROI", desc: "Every rupee tracked back to a result." },
];

const processSteps = [
  { n: "01", title: "Audience Research", desc: "Map where your buyers actually are.", icon: Search },
  { n: "02", title: "Strategy & Budgeting", desc: "Channel mix and CPA targets set upfront.", icon: ClipboardList },
  { n: "03", title: "Ad Creative & Setup", desc: "Copy and structure built per platform.", icon: PenSquare },
  { n: "04", title: "Launch & Monitoring", desc: "Live tracking from day one.", icon: Rocket },
  { n: "05", title: "Optimization & Testing", desc: "Ongoing A/B testing on creative and bids.", icon: Repeat },
  { n: "06", title: "Reporting & Scaling", desc: "Plain-number reporting, then scale what works.", icon: BarChart3 },
];

const whyChoose = [
  { icon: Target, title: "Data-Driven Targeting", desc: "Every audience is built and refreshed from live campaign data, not guesswork." },
  { icon: BarChart3, title: "Transparent Reporting", desc: "Leads, cost per lead, and ROAS — reported in plain numbers, not vanity metrics." },
  { icon: Repeat, title: "Continuous Optimization", desc: "Budget is reallocated daily toward what's actually converting." },
];

const tabs = [
  {
    key: "search",
    label: "Search Ads",
    icon: Search,
    body: "We build and manage Google Search and Shopping campaigns around commercial-intent keywords, with tight ad groups, negative keyword lists, and bid strategies tuned to your actual cost-per-acquisition target — not just clicks.",
  },
  {
    key: "social",
    label: "Social Media Ads",
    icon: Share2,
    body: "Meta, Instagram, and LinkedIn campaigns built around audiences that actually convert — lookalikes, retargeting pools, and interest stacks refreshed as the data comes in, with creative rotated before fatigue sets in.",
  },
  {
    key: "retarget",
    label: "Retargeting",
    icon: Repeat,
    body: "Visitors who didn't convert the first time are usually your cheapest next sale. We build sequenced retargeting across search, social, and display to bring them back at the right moment.",
  },
  {
    key: "cro",
    label: "Landing Page & CRO",
    icon: MousePointerClick,
    body: "Traffic is only half the equation — we design and test landing pages against the offer and audience of each campaign, so the clicks you're paying for actually turn into leads.",
  },
];

const pricingPlans = [
  {
    tier: "SEARCH ONLY",
    name: "Starter",
    features: ["Google Search Ads", "Keyword & Negative Lists", "Conversion Tracking Setup", "Monthly Reporting"],
    featured: false,
  },
  {
    tier: "FULL FUNNEL",
    name: "Growth",
    features: ["Search + Social Ads", "Retargeting Campaigns", "Landing Page CRO", "Weekly Optimization", "Dedicated Manager"],
    featured: true,
  },
  {
    tier: "ENTERPRISE",
    name: "Scale",
    features: ["All Channels + Display", "Advanced Audience Modeling", "Creative Production", "Daily Budget Monitoring"],
    featured: false,
  },
];

const faqs = [
  { q: "What is performance marketing?", a: "Paid advertising where every rupee is tied to a measurable outcome — a lead, a sale, or a sign-up — rather than impressions alone." },
  { q: "How is it different from traditional advertising?", a: "Traditional ads chase visibility; performance marketing is built, tracked, and optimised around a specific action and cost target." },
  { q: "Which platforms do you run ads on?", a: "Google Search & Shopping, Meta, Instagram, LinkedIn, YouTube, and programmatic display, depending on where your audience actually is." },
  { q: "How much should I budget for ads?", a: "It depends on your industry and target CPA — we'll size a starting budget after a short audit of your funnel and competition." },
  { q: "How do you measure ROI?", a: "Through conversion tracking tied to actual leads or revenue, not just clicks or impressions." },
  { q: "How soon will I see results?", a: "Search campaigns often show early signal within 2–3 weeks; most accounts hit a stable optimisation rhythm by month two." },
  { q: "Do you handle landing pages too?", a: "Yes — campaign performance is only as good as the page it sends traffic to, so we design and test those as well." },
  { q: "Can you scale winning campaigns?", a: "Yes — once a campaign hits its target CPA, we scale budget in controlled steps to protect performance." },
];

// const otherServices = [
//   { icon: Search, name: "Search Engine Optimisation", desc: "Rank for the terms your customers are already searching." },
//   { icon: Share2, name: "Social Media Marketing", desc: "Build an audience that actually engages with your brand." },
//   { icon: PenSquare, name: "Creative & Brand Communication", desc: "Impactful design that strengthens your brand identity." },
// ];

const fadeUp = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

function Reveal({ children, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div ref={ref} className={className} initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}>
      {children}
    </motion.div>
  );
}

export default function PerformanceMarketing() {
  const [openFaq, setOpenFaq] = useState(0);
  const [capHighlight, setCapHighlight] = useState(false);
  const formRef = useRef(null);
  const capabilitiesRef = useRef(null);

  const goToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const goToCapabilities = () => {
    capabilitiesRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setCapHighlight(true);
    window.setTimeout(() => setCapHighlight(false), 1800);
  };

  return (
    <div className="pm-root">
      <style>{styles}</style>

      {/* HERO + CORE CAPABILITIES */}
      <section className="pm-dark pm-hero-wrap">
        <div className="pm-section pm-hero-grid">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div className="pm-eyebrow" variants={fadeUp}>04. PERFORMANCE MARKETING</motion.div>
            <motion.h1 className="pm-h1" variants={fadeUp}>
              Turn Ad Spend Into <span className="accent">Predictable Revenue</span>
            </motion.h1>
            <motion.p className="pm-lede" variants={fadeUp}>
              Stop paying for clicks that don't convert. Build a paid acquisition engine across
              search and social that's accountable to one number — return on ad spend.
            </motion.p>
            <motion.p className="pm-lede" variants={fadeUp}>
              From campaign strategy and creative to landing pages and daily optimisation, we run
              the full funnel so every rupee is tied to a lead, a sale, or a clear reason it
              didn't work.
            </motion.p>
            <motion.div className="pm-btn-row" variants={fadeUp}>
              <button className="pm-btn-primary" onClick={goToCapabilities}>
                View Full Service <ArrowRight size={16} />
              </button>
              <button className="pm-btn-outline" onClick={goToForm}>Get Free Audit</button>
            </motion.div>
          </motion.div>

          <motion.div
            ref={capabilitiesRef}
            className={`pm-capabilities-card ${capHighlight ? "highlight" : ""}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="pm-capabilities-kicker">CORE CAPABILITIES</div>
            <div className="pm-capabilities-grid">
              {capabilities.map((c) => {
                const Icon = c.icon;
                return (
                  <div className="pm-cap-item" key={c.title}>
                    <div className="pm-cap-icon"><Icon size={16} /></div>
                    <div>
                      <div className="pm-cap-title">{c.title}</div>
                      <div className="pm-cap-sub">{c.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="pm-light pm-benefits-wrap">
        <div className="pm-section">
          <Reveal>
            <motion.h2 className="pm-h2" variants={fadeUp}>
              The Benefits of <em>Our Performance Marketing</em>
            </motion.h2>
            <motion.p className="pm-benefits-lede" variants={fadeUp}>
              Paid campaigns built as one system across channels, not five disconnected accounts
              burning the same budget.
            </motion.p>
            <div className="pm-benefits-grid">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <motion.div className="pm-benefit-card" key={b.title} variants={fadeUp}>
                    <div className="pm-benefit-dot"><Icon size={17} /></div>
                    <div className="pm-benefit-title">{b.title}</div>
                    <div className="pm-benefit-desc">{b.desc}</div>
                  </motion.div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROCESS (timeline) */}
      <section className="pm-mist pm-process-wrap">
        <div className="pm-section">
          <Reveal>
            <motion.h2 className="pm-h2" variants={fadeUp}>
              Our Performance Marketing <em>Process</em>
            </motion.h2>
          </Reveal>
          <div className="pm-timeline">
            {processSteps.map((s, i) => (
              <motion.div
                className="pm-timeline-step"
                key={s.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div className="pm-timeline-num">{s.n}</div>
                <div className="pm-timeline-title">{s.title}</div>
                <div className="pm-timeline-desc">{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="pm-dark pm-why-wrap">
        <div className="pm-section">
          <Reveal>
            <motion.h2 className="pm-h2" variants={fadeUp}>
              Why Choose <em className="on-dark">Us</em>
            </motion.h2>
            <div className="pm-why-grid">
              {whyChoose.map((w) => {
                const Icon = w.icon;
                return (
                  <motion.div className="pm-why-card" key={w.title} variants={fadeUp}>
                    <div className="pm-why-icon"><Icon size={18} /></div>
                    <div className="pm-why-title">{w.title}</div>
                    <div className="pm-why-desc">{w.desc}</div>
                  </motion.div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="pm-light pm-work-wrap">
        <div className="pm-section">
          <Reveal className="pm-work-head">
            <motion.h2 className="pm-h2" variants={fadeUp}>
              How We <em>Work</em>
            </motion.h2>
            <motion.p className="pm-work-lede" variants={fadeUp}>
              Four channels, run as one system — each built around the same cost-per-result
              target.
            </motion.p>
          </Reveal>

          <Reveal className="pm-work-grid">
            {tabs.map((t) => {
              const Icon = t.icon;
              return (
                <motion.div className="pm-work-card" key={t.key} variants={fadeUp}>
                  <div className="pm-work-icon"><Icon size={20} /></div>
                  <div className="pm-work-title">{t.label}</div>
                  <div className="pm-work-desc">{t.body}</div>
                </motion.div>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* TRANSPARENT PRICING */}
      <section className="pm-dark pm-pricing-wrap">
        <div className="pm-section">
          <Reveal>
            <motion.h2 className="pm-h2" variants={fadeUp}>
              Transparent <em className="on-dark">Pricing</em>
            </motion.h2>
            <motion.div className="pm-pricing-sub" variants={fadeUp}>Choose the plan that fits your growth goals.</motion.div>
            <div className="pm-pricing-grid">
              {pricingPlans.map((p) => (
                <motion.div className={`pm-price-card ${p.featured ? "featured" : ""}`} key={p.name} variants={fadeUp}>
                  {p.featured && <div className="pm-price-ribbon">POPULAR</div>}
                  <div className="pm-price-tier">{p.tier}</div>
                  <div className="pm-price-name">{p.name}</div>
                  <ul className="pm-price-list">
                    {p.features.map((f) => (
                      <li key={f}><Check size={15} />{f}</li>
                    ))}
                  </ul>
                  <button className="pm-price-btn" onClick={goToForm}>Get Started</button>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="pm-light pm-faq-wrap">
        <div className="pm-section">
          <Reveal>
            <motion.h2 className="pm-h2" variants={fadeUp} style={{ textAlign: "center", marginBottom: 32 }}>
              Frequently Asked <em>Questions</em>
            </motion.h2>
            <div className="pm-faq-grid">
              {faqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <motion.div className="pm-faq-item" key={f.q} variants={fadeUp} onClick={() => setOpenFaq(open ? -1 : i)}>
                    <div className="pm-faq-q">
                      {f.q}
                      {open ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                    <AnimatePresence>
                      {open && (
                        <motion.div className="pm-faq-a" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}>
                          {f.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>
{/* 
      OTHER SERVICES
      <section className="pm-dark pm-services-wrap">
        <div className="pm-section">
          <Reveal>
            <motion.h2 className="pm-h2" variants={fadeUp}>
              Our <em className="on-dark">Other Services</em> For You!
            </motion.h2>
            <div className="pm-services-grid">
              {otherServices.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.div className="pm-service-card" key={s.name} variants={fadeUp} whileHover={{ y: -4, borderColor: "rgba(255,106,26,0.45)" }}>
                    <div className="pm-service-icon"><Icon size={22} /></div>
                    <div className="pm-service-name">{s.name}</div>
                    <div className="pm-service-desc">{s.desc}</div>
                  </motion.div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section> */}

      {/* CONTACT */}
      <section className="pm-dark pm-contact-wrap" ref={formRef}>
        <div className="pm-section pm-contact-grid">
          <motion.div className="pm-form-card-dark" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <motion.div className="pm-form-heading" variants={fadeUp}>Send us a Message</motion.div>
            <motion.div className="pm-form-row-dark" variants={fadeUp}>
              <div className="pm-field-dark"><label>Name *</label><input type="text" placeholder="John Doe" /></div>
              <div className="pm-field-dark"><label>Email *</label><input type="email" placeholder="john@example.com" /></div>
            </motion.div>
            <motion.div className="pm-form-row-dark" variants={fadeUp}>
              <div className="pm-field-dark"><label>Phone *</label><input type="tel" placeholder="+91 98765 43210" /></div>
              <div className="pm-field-dark">
                <label>Subject</label>
                <select defaultValue="General Inquiry">
                  <option>General Inquiry</option>
                  <option>Campaign Setup</option>
                  <option>Reporting Question</option>
                  <option>Partnership</option>
                </select>
              </div>
            </motion.div>
            <motion.div className="pm-field-dark" variants={fadeUp}>
              <label>Message *</label>
              <textarea rows={5} placeholder="Tell us about your project..." />
            </motion.div>
            <motion.button className="pm-submit" variants={fadeUp} onClick={(e) => e.preventDefault()}>
              <Send size={16} /> Send Message
            </motion.button>
          </motion.div>

          <Reveal className="pm-info-card">
            <motion.div className="pm-info-heading" variants={fadeUp}>Contact Information</motion.div>
            <motion.div className="pm-info-row" variants={fadeUp}>
              <div className="pm-info-icon"><MapPin size={17} /></div>
              <div>
                <div className="pm-info-label">Our Office</div>
                <div className="pm-info-value">11 Block, Rajendra Nagar, Bareilly, Uttar Pradesh, India</div>
              </div>
            </motion.div>
            <motion.div className="pm-info-row" variants={fadeUp}>
              <div className="pm-info-icon"><Phone size={17} /></div>
              <div>
                <div className="pm-info-label">Phone</div>
                <div className="pm-info-value"><a href="tel:+917055255255">+91 7055255255</a></div>
              </div>
            </motion.div>
            <motion.div className="pm-info-row" variants={fadeUp}>
              <div className="pm-info-icon"><Mail size={17} /></div>
              <div>
                <div className="pm-info-label">Email</div>
                <div className="pm-info-value"><a href="mailto:info@dexterityworld.com">info@dexterityworld.com</a></div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}