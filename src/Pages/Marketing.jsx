import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Search,
  Share2,
  PenTool,
  Mail,
  BarChart3,
  RefreshCw,
  UserPlus,
  Star,
  Target,
  TrendingUp,
  Award,
  Users,
  DollarSign,
  Zap,
  MessageCircle,
  LineChart,
  ArrowRight,
  MapPin,
  Phone,
  Send,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";

/* ---------------------------------------------------------
   Design tokens
   bg        #0A0A0B  near-black
   surface   #condition15151A / #1B1B1F cards
   orange    #FF6A1A primary accent / #FFA157 light / #C2410C deep
   white     #FFFFFF / #9C9CA3 muted
--------------------------------------------------------- */

const styles = `
  .dm-root {
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

  .dm-theme-light {
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

  .dm-grid-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,106,26,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,106,26,0.06) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
    pointer-events: none;
  }

  .dm-section {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px 0 35px;
  }

  .dm-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--orange);
  }
  .dm-eyebrow::before {
    content: "";
    width: 18px;
    height: 1px;
    background: var(--orange);
  }

  .dm-h1 {
    font-size: clamp(2.2rem, 4.6vw, 3.6rem);
    line-height: 1.05;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin: 18px 0 20px;
  }
  .dm-h1 .accent {
    background: linear-gradient(100deg, var(--orange-light), var(--orange));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .dm-lede {
    color: var(--muted);
    font-size: 16px;
    line-height: 1.7;
    max-width: 520px;
    margin-bottom: 14px;
  }

  .dm-btn-row {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin-top: 30px;
  }

  .dm-btn-primary, .dm-btn-outline {
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
  .dm-btn-primary {
    background: linear-gradient(120deg, var(--orange-light), var(--orange) 60%, var(--orange-deep));
    color: #0A0A0B;
    box-shadow: 0 8px 24px -8px rgba(255,106,26,0.55);
  }
  .dm-btn-outline {
    background: transparent;
    color: var(--white);
    border: 1px solid var(--border-strong);
  }

  .dm-hero-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 56px;
    align-items: start;
    padding: 110px 0 90px;
  }
  @media (max-width: 880px) {
    .dm-hero-grid { grid-template-columns: 1fr; padding: 70px 0 50px; }
  }

  .dm-cap-panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 22px;
  }
  .dm-cap-title {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 16px;
    padding-left: 4px;
  }
  .dm-cap-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  @media (max-width: 520px) {
    .dm-cap-list { grid-template-columns: 1fr; }
  }
  .dm-cap-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 14px;
    border-radius: 12px;
    border: 1px solid transparent;
    background: var(--bg-soft);
    cursor: pointer;
  }
  .dm-cap-icon {
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
  .dm-cap-name {
    font-size: 13.5px;
    font-weight: 700;
    line-height: 1.3;
  }
  .dm-cap-sub {
    font-size: 11px;
    color: var(--muted);
    margin-top: 2px;
  }

  .dm-section-head {
    text-align: center;
    margin-bottom: 44px;
  }
  .dm-section-title {
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 800;
    letter-spacing: -0.01em;
    padding-top: 25px;
  }
  .dm-section-title .accent { color: var(--orange); }

  .dm-benefits-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    padding: 25px 0 50px;
  }
  @media (max-width: 900px) { .dm-benefits-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 520px) { .dm-benefits-grid { grid-template-columns: 1fr; } }

  .dm-benefit-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 22px 18px;
  }
  .dm-benefit-icon {
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
  .dm-benefit-name {
    font-size: 14.5px;
    font-weight: 700;
  }

  .dm-process-wrap {
    padding: 90px 0 110px;
    position: relative;
  }
  .dm-process-track {
    display: flex;
    justify-content: space-between;
    position: relative;
    padding-top: 10px;
  }
  .dm-process-line {
    position: absolute;
    top: 28px;
    left: 28px;
    right: 28px;
    height: 2px;
    background: var(--border);
    transform-origin: left;
  }
  .dm-process-line-fill {
    position: absolute;
    top: 28px;
    left: 28px;
    height: 2px;
    background: linear-gradient(90deg, var(--orange-deep), var(--orange));
    transform-origin: left;
  }
  .dm-process-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 100%;
    position: relative;
    z-index: 1;
  }
  .dm-process-num {
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
  .dm-process-label {
    font-size: 13px;
    font-weight: 700;
    color: var(--white);
  }
  @media (max-width: 700px) {
    .dm-process-track { flex-wrap: wrap; gap: 28px 12px; }
    .dm-process-line, .dm-process-line-fill { display: none; }
  }

  .dm-contact-wrap {
    padding: 90px 0 110px;
    display: grid;
    grid-template-columns: 1.3fr 0.9fr;
    gap: 24px;
  }
  @media (max-width: 880px) { .dm-contact-wrap { grid-template-columns: 1fr; } }

  .dm-form-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 22px;
    padding: 34px;
  }
  .dm-form-heading {
    font-size: 22px;
    font-weight: 800;
    margin-bottom: 22px;
  }
  .dm-form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }
  @media (max-width: 520px) { .dm-form-row { grid-template-columns: 1fr; } }
  .dm-field label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }
  .dm-field input,
  .dm-field select,
  .dm-field textarea {
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
  .dm-field input::placeholder, .dm-field textarea::placeholder { color: #5c5c62; }
  .dm-field input:focus,
  .dm-field select:focus,
  .dm-field textarea:focus {
    border-color: var(--orange);
  }
  .dm-field select { appearance: none; }
  .dm-select-wrap { position: relative; }
  .dm-select-wrap svg {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--muted);
    pointer-events: none;
  }
  .dm-submit {
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

  .dm-info-card {
    background: linear-gradient(165deg, var(--info-grad), var(--surface) 55%);
    border: 1px solid var(--border);
    border-radius: 22px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 22px;
    height: fit-content;
  }
  .dm-info-heading {
    font-size: 18px;
    font-weight: 800;
    position: relative;
    padding-bottom: 12px;
  }
  .dm-info-heading::after {
    content: "";
    position: absolute;
    left: 0; bottom: 0;
    width: 40px;
    height: 2px;
    background: var(--orange);
  }
  .dm-info-row {
    display: flex;
    gap: 14px;
    align-items: flex-start;
  }
  .dm-info-icon {
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
  .dm-info-label {
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 4px;
  }
  .dm-info-value {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.6;
  }
  .dm-info-value a { color: var(--orange-light); text-decoration: none; }
  .dm-bento-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 170px;
    grid-auto-flow: dense;
    gap: 16px;
  }
  .dm-bento-item {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 22px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    overflow: hidden;
  }
  .dm-bento-item.feature {
    grid-column: span 2;
    grid-row: span 2;
    background: linear-gradient(160deg, rgba(255,106,26,0.14), var(--surface) 60%);
  }
  .dm-bento-item.wide { grid-column: span 2; }
  .dm-bento-check {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: rgba(255,106,26,0.14);
    color: var(--orange-light);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 14px;
  }
  .dm-bento-item.feature .dm-bento-check { width: 46px; height: 46px; }
  .dm-bento-name { font-size: 14.5px; font-weight: 700; margin-bottom: 6px; }
  .dm-bento-item.feature .dm-bento-name { font-size: 19px; }
  .dm-bento-desc { font-size: 12.5px; color: var(--muted); line-height: 1.55; max-width: 92%; }
  @media (max-width: 900px) {
    .dm-bento-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 160px; }
    .dm-bento-item.feature { grid-column: span 2; grid-row: span 1; }
  }
  @media (max-width: 560px) {
    .dm-bento-grid { grid-template-columns: 1fr; grid-auto-rows: auto; }
    .dm-bento-item, .dm-bento-item.feature, .dm-bento-item.wide {
      grid-column: span 1 !important;
      grid-row: auto !important;
    }
  }

  .dm-how-wrap { padding: 90px 0 110px; }
  .dm-how-sub {
    text-align: center;
    color: var(--muted);
    font-size: 14px;
    margin-bottom: 40px;
  }
  .dm-how-row {
    display: flex;
    align-items: stretch;
    gap: 0;
  }
  .dm-how-card {
    flex: 1;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px;
    position: relative;
  }
  .dm-how-num {
    position: absolute;
    top: 16px;
    right: 18px;
    font-size: 34px;
    font-weight: 800;
    color: rgba(10,10,12,0.08);
  }
  .dm-how-title { font-size: 16px; font-weight: 800; margin-bottom: 10px; }
  .dm-how-desc { font-size: 13px; color: var(--muted); line-height: 1.6; max-width: 88%; }
  .dm-how-connector {
    width: 28px;
    flex-shrink: 0;
    align-self: center;
    height: 2px;
    background: var(--border);
    position: relative;
    overflow: hidden;
  }
  .dm-how-connector-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: var(--orange);
  }
  @media (max-width: 880px) {
    .dm-how-row { flex-direction: column; gap: 16px; }
    .dm-how-connector { display: none; }
  }
`;

const capabilities = [
  { icon: Search, name: "Google Ads (PPC)" },
  { icon: Share2, name: "Social Media Ads" },
  { icon: PenTool, name: "Content Marketing" },
  { icon: Mail, name: "Email Automation" },
  { icon: BarChart3, name: "Analytics & Data" },
  { icon: RefreshCw, name: "Conversion (CRO)" },
  { icon: UserPlus, name: "Lead Generation" },
  { icon: Star, name: "Online Reputation" },
];

const benefits = [
  { icon: Target, name: "Targeted Reach" },
  { icon: TrendingUp, name: "Measurable ROI" },
  { icon: Award, name: "Brand Awareness" },
  { icon: Users, name: "Lead Generation" },
  { icon: DollarSign, name: "Cost-Effective" },
  { icon: Zap, name: "Real-Time Adjustments" },
  { icon: MessageCircle, name: "Customer Engagement" },
  { icon: LineChart, name: "Data-Driven Insights" },
];

const processSteps = ["Discovery", "Strategy", "Setup", "Execution", "Optimization", "Reporting"];

const whyChooseUs = [
  {
    name: "Brand Awareness",
    desc: "Reach millions of potential customers on platforms they use daily.",
    size: "feature",
  },
  { name: "Community Building", desc: "Create a loyal following that engages with your content." },
  { name: "Customer Service", desc: "Directly communicate with customers and resolve issues quickly." },
  { name: "Targeted Advertising", desc: "Laser-focused ads based on demographics, interests, and behaviors." },
  { name: "Thought Leadership", desc: "Establish your brand as the industry authority." },
  {
    name: "SEO Growth",
    desc: "More content means more keywords and more search traffic.",
    size: "wide",
  },
  { name: "Lead Nurturing", desc: "Educate prospects until they are ready to buy." },
  { name: "Cost Effective", desc: "Content marketing generates 3x as many leads as outbound marketing." },
  { name: "Lower CPA", desc: "Get more customers from your existing traffic spend." },
  {
    name: "Higher Revenue",
    desc: "Direct impact on the bottom line without buying more ads.",
    size: "wide",
  },
  { name: "Better UX", desc: "A smoother experience builds brand loyalty and trust." },
  { name: "Data Backed", desc: "Decisions based on user data, not opinions." },
];

const howWeWork = [
  { title: "Analyze", desc: "Data gathering via analytics and heatmaps." },
  { title: "Hypothesize", desc: "Identifying opportunities for improvement." },
  { title: "Test", desc: "Running A/B tests on live traffic." },
  { title: "Implement", desc: "Rolling out winning variations permanently." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
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

export default function DigitalMarketingSection() {
  const formRef = useRef(null);
  const [highlight, setHighlight] = useState(false);
  const processRef = useRef(null);
  const processInView = useInView(processRef, { once: true, amount: 0.4 });
  const capRef = useRef(null);
  const [capGlow, setCapGlow] = useState(false);
  const [hoveredCap, setHoveredCap] = useState(null);

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

  return (
    <div className="dm-root">
      <style>{styles}</style>
      <div className="dm-grid-bg" />

      {/* HERO */}
      <div className="dm-theme-light">
      <section className="dm-section">
        <div className="dm-hero-grid">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.span className="dm-eyebrow" variants={fadeUp}>
              01. Digital Marketing
            </motion.span>

            <motion.h1 className="dm-h1" variants={fadeUp}>
              Drive Revenue with <span className="accent">Precision Marketing</span>
            </motion.h1>

            <motion.p className="dm-lede" variants={fadeUp}>
              In today's hyper-competitive landscape, visibility alone isn't enough. You need
              strategic, targeted marketing that converts clicks into loyal customers. Our
              Digital Marketing services are engineered entirely around your ROI.
            </motion.p>

            <motion.p className="dm-lede" variants={fadeUp}>
              From highly-tuned Google Ads campaigns to engaging Social Media strategies and
              automated email funnels, we deploy a multi-channel approach to surround your
              target audience with compelling messaging.
            </motion.p>

            <motion.div className="dm-btn-row" variants={fadeUp}>
              <motion.button
                className="dm-btn-primary"
                whileHover={{ scale: 1.035 }}
                whileTap={{ scale: 0.97 }}
                onClick={glowCapabilities}
              >
                View Full Service
                <ArrowRight size={16} />
              </motion.button>

              <motion.button
                className="dm-btn-outline"
                whileHover={{ scale: 1.035, borderColor: "#FF6A1A" }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToForm}
              >
                Start a Campaign
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
              className="dm-cap-panel"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="dm-cap-title">Core Capabilities</div>
              <div className="dm-cap-list">
                {capabilities.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <motion.div
                      className="dm-cap-item"
                      key={c.name}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.35 + i * 0.05 }}
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
                        className="dm-cap-icon"
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
                        <div className="dm-cap-name">{c.name}</div>
                        <div className="dm-cap-sub">Expert execution</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      </div>

      {/* BENEFITS */}
      <section className="dm-section">
        <Reveal>
          <motion.div className="dm-section-head" variants={fadeUp}>
            <h2 className="dm-section-title">
              The Benefits of <span className="accent">Our Approach</span>
            </h2>
          </motion.div>
          <div className="dm-benefits-grid">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <motion.div
                  className="dm-benefit-card"
                  key={b.name}
                  variants={fadeUp}
                  whileHover={{ y: -4, borderColor: "rgba(255,106,26,0.45)" }}
                >
                  <div className="dm-benefit-icon">
                    <Icon size={18} />
                  </div>
                  <div className="dm-benefit-name">{b.name}</div>
                </motion.div>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* WHY CHOOSE US — BENTO */}
      <div className="dm-theme-light">
      <section className="dm-section dm-bento-wrap">
        <Reveal>
          <motion.div className="dm-section-head" variants={fadeUp}>
            {/* <span className="dm-eyebrow">Why Choose Us</span> */}
            <h2 className="dm-section-title" style={{ marginTop: 10 }}>
              Why Choose <span className="accent">Us</span>
            </h2>
          </motion.div>

          <div className="dm-bento-grid">
            {whyChooseUs.map((item) => (
              <motion.div
                key={item.name}
                className={`dm-bento-item ${item.size || ""}`}
                variants={fadeUp}
                whileHover={{ y: -4, borderColor: "rgba(255,106,26,0.45)" }}
              >
                <div className="dm-bento-check">
                  <CheckCircle2 size={item.size === "feature" ? 20 : 16} />
                </div>
                <div className="dm-bento-name">{item.name}</div>
                <div className="dm-bento-desc">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </section>
      </div>

      {/* PROCESS */}
      <section className="dm-section dm-process-wrap" ref={processRef}>
        <Reveal>
          <motion.div className="dm-section-head" variants={fadeUp}>
            <h2 className="dm-section-title">
              Our Marketing <span className="accent">Process</span>
            </h2>
          </motion.div>
        </Reveal>

        <div className="dm-process-track">
          <div className="dm-process-line" />
          <motion.div
            className="dm-process-line-fill"
            initial={{ width: 0 }}
            animate={{ width: processInView ? "calc(100% - 56px)" : 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          />
          {processSteps.map((step, i) => (
            <motion.div
              className="dm-process-step"
              key={step}
              initial={{ opacity: 0, y: 16 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.12 }}
            >
              <div className="dm-process-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="dm-process-label">{step}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW WE WORK */}
      <div className="dm-theme-light">
      <section className="dm-section dm-how-wrap">
        <Reveal>
          <motion.div className="dm-section-head" variants={fadeUp} style={{ marginBottom: 8 }}>
            <h2 className="dm-section-title">
              How We <span className="accent">Work</span>
            </h2>
          </motion.div>
          <motion.p className="dm-how-sub" variants={fadeUp}>
            Our proven methodology ensures consistent results.
          </motion.p>

          <div className="dm-how-row">
            {howWeWork.map((step, i) => (
              <React.Fragment key={step.title}>
                <motion.div className="dm-how-card" variants={fadeUp}>
                  <div className="dm-how-num">{String(i + 1).padStart(2, "0")}</div>
                  <div className="dm-how-title">{step.title}</div>
                  <div className="dm-how-desc">{step.desc}</div>
                </motion.div>

                {i < howWeWork.length - 1 && (
                  <div className="dm-how-connector">
                    <motion.div
                      className="dm-how-connector-fill"
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

      {/* CONTACT */}
      <section className="dm-section" ref={formRef}>
        <motion.div
          className="dm-contact-wrap"
          animate={
            highlight
              ? { boxShadow: "0 0 0 3px rgba(255,106,26,0.55)" }
              : { boxShadow: "0 0 0 0px rgba(255,106,26,0)" }
          }
          transition={{ duration: 0.5 }}
          style={{ borderRadius: 22 }}
        >
          <Reveal>
            <motion.div className="dm-form-card" variants={fadeUp}>
              <div className="dm-form-heading">Send us a Message</div>

              <div className="dm-form-row">
                <div className="dm-field">
                  <label>Name *</label>
                  <input type="text" placeholder="John Doe" />
                </div>
                <div className="dm-field">
                  <label>Email *</label>
                  <input type="email" placeholder="john@example.com" />
                </div>
              </div>

              <div className="dm-form-row">
                <div className="dm-field">
                  <label>Phone *</label>
                  <input type="tel" placeholder="+91 98765 43210" />
                </div>
                <div className="dm-field">
                  <label>Subject</label>
                  <div className="dm-select-wrap">
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

              <div className="dm-field" style={{ marginBottom: 22 }}>
                <label>Message *</label>
                <textarea rows={5} placeholder="Tell us about your project..." />
              </div>

              <motion.button
                className="dm-submit"
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
            <motion.div className="dm-info-card" variants={fadeUp}>
              <div className="dm-info-heading">Contact Information</div>

              <div className="dm-info-row">
                <div className="dm-info-icon">
                  <MapPin size={17} />
                </div>
                <div>
                  <div className="dm-info-label">Our Office</div>
                  <div className="dm-info-value">
                    1st floor, 1, Nyanapahalli Main Rd, Devarachiknahalli, BTM 4th Stage,
                    Bengaluru, Karnataka 560114
                  </div>
                </div>
              </div>

              <div className="dm-info-row">
                <div className="dm-info-icon">
                  <Phone size={17} />
                </div>
                <div>
                  <div className="dm-info-label">Phone</div>
                  <div className="dm-info-value">
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
