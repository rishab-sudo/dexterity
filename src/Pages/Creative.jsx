import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Palette,
  Layers,
  PenTool,
  Package,
  BookOpen,
  Presentation,
  Printer,
  Users2,
  Sparkles,
  FileImage,
  Repeat,
  Share2,
  Layers3,
  ArrowRight,
  Fingerprint,
  Target,
  Search,
  Lightbulb,
  Wand2,
  CheckCircle2,
  Check,
  MapPin,
  Phone,
  Mail,
  Send,
  Plus,
  Minus,
} from "lucide-react";


/* ---------------------------------------------------------
   DexterityWorld — Creative & Brand Communication
   Palette: near-black bg, orange accent (matches site system)
--------------------------------------------------------- */

const styles = `
  .cb-root {
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

  .cb-section { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

  .cb-light { background: #FFFFFF; color: var(--ink); }
  .cb-dark { background: var(--bg); color: var(--white); }

  .cb-btn-primary, .cb-btn-outline {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 26px; border-radius: 10px; font-size: 14px; font-weight: 700;
    cursor: pointer; border: none; font-family: inherit;
  }
  .cb-btn-primary {
    background: linear-gradient(120deg, var(--orange-light), var(--orange) 60%, var(--orange-deep));
    color: #0A0A0B; box-shadow: 0 8px 24px -8px rgba(255,106,26,0.55);
  }
  .cb-btn-outline { background: transparent; border: 1px solid rgba(10,10,12,0.24); color: var(--ink); }

  /* ---------- HERO ---------- */
  .cb-hero-wrap { padding: 80px 0 90px; }
  .cb-hero-grid { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 56px; align-items: start; }
  @media (max-width: 880px) { .cb-hero-grid { grid-template-columns: 1fr; } }

  .cb-cap-panel { background: #F7F7F9; border: 1px solid rgba(10,10,12,0.10); border-radius: 20px; padding: 22px; }
  .cb-cap-title { font-size: 13px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 16px; padding-left: 4px; }
  .cb-cap-list { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  @media (max-width: 520px) { .cb-cap-list { grid-template-columns: 1fr; } }
  .cb-cap-item { display: flex; align-items: flex-start; gap: 10px; padding: 14px; border-radius: 12px; background: #F1F1F4; }
  .cb-cap-icon { flex-shrink: 0; width: 30px; height: 30px; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: rgba(255,106,26,0.12); color: var(--orange-deep); }
  .cb-cap-name { font-size: 13.5px; font-weight: 700; line-height: 1.3; }
  .cb-cap-sub { font-size: 11px; color: var(--ink-muted); margin-top: 2px; }

  .cb-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--orange-deep); margin-bottom: 16px; }
  .cb-eyebrow::before { content: ""; width: 18px; height: 1px; background: var(--orange-deep); }
  .cb-h1 { font-size: clamp(2.1rem, 4.4vw, 3.3rem); line-height: 1.08; font-weight: 800; letter-spacing: -0.02em; margin: 0 0 20px; }
  .cb-h1 .accent { background: linear-gradient(100deg, var(--orange-light), var(--orange)); -webkit-background-clip: text; background-clip: text; color: transparent; display: block; }
  .cb-lede { color: var(--ink-muted); font-size: 15.5px; line-height: 1.75; max-width: 540px; margin-bottom: 16px; }
  .cb-btn-row { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 26px; }

  /* ---------- BENEFITS + PROCESS (dark block) ---------- */
  .cb-dark-block { padding: 90px 0 110px; }
  .cb-section-head { text-align: center; margin-bottom: 34px; }
  .cb-section-title { font-size: clamp(1.6rem, 3vw, 2.15rem); font-weight: 800; letter-spacing: -0.01em; }
  .cb-section-title .accent { color: var(--orange); }

  .cb-benefits-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 90px; }
  @media (max-width: 900px) { .cb-benefits-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 520px) { .cb-benefits-grid { grid-template-columns: 1fr; } }
  .cb-benefit-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 22px 18px; }
  .cb-benefit-icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: rgba(255,106,26,0.10); color: var(--orange); margin-bottom: 14px; }
  .cb-benefit-name { font-size: 14.5px; font-weight: 700; margin-bottom: 4px; }
  .cb-benefit-desc { font-size: 12px; color: var(--muted); line-height: 1.5; }

  .cb-process-track { display: flex; justify-content: space-between; position: relative; padding-top: 10px; }
  .cb-process-line { position: absolute; top: 28px; left: 28px; right: 28px; height: 2px; background: rgba(255,106,26,0.25); }
  .cb-process-line-fill { position: absolute; top: 28px; left: 28px; height: 2px; background: linear-gradient(90deg, var(--orange-deep), var(--orange)); transform-origin: left; }
  .cb-process-step { display: flex; flex-direction: column; align-items: center; gap: 12px; width: 100%; position: relative; z-index: 1; }
  .cb-process-num { width: 56px; height: 56px; border-radius: 50%; background: var(--bg); border: 2px solid var(--orange); color: var(--orange-light); font-weight: 800; font-size: 16px; display: flex; align-items: center; justify-content: center; }
  .cb-process-label { font-size: 13px; font-weight: 700; }
  @media (max-width: 700px) { .cb-process-track { flex-wrap: wrap; gap: 28px 12px; } .cb-process-line, .cb-process-line-fill { display: none; } }

  /* ---------- WHY CHOOSE US (light) ---------- */
  .cb-why-wrap { padding: 90px 0; }
  .cb-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
  @media (max-width: 780px) { .cb-why-grid { grid-template-columns: 1fr; } }
  .cb-why-card { background: #F7F7F9; border: 1px solid rgba(10,10,12,0.10); border-radius: 16px; padding: 26px; }
  .cb-why-icon { width: 40px; height: 40px; border-radius: 10px; background: rgba(255,106,26,0.12); color: var(--orange-deep); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
  .cb-why-title { font-size: 15.5px; font-weight: 800; margin-bottom: 6px; }
  .cb-why-desc { font-size: 13px; color: var(--ink-muted); line-height: 1.6; }

  /* ---------- HOW WE WORK (dark) ---------- */
  .cb-how-wrap { padding: 80px 0 100px; }
  .cb-how-sub { text-align: center; color: var(--muted); font-size: 14px; margin: -14px 0 40px; }
  .cb-how-grid { display: flex; align-items: stretch; gap: 0; }
  .cb-how-card { flex: 1; background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 24px; position: relative; overflow: hidden; }
  @media (max-width: 780px) { .cb-how-grid { flex-direction: column; gap: 16px; } }
  .cb-how-connector { width: 28px; flex-shrink: 0; align-self: center; height: 2px; background: rgba(255,106,26,0.25); position: relative; overflow: hidden; }
  .cb-how-connector-fill { position: absolute; top: 0; left: 0; height: 100%; background: var(--orange); }
  @media (max-width: 780px) { .cb-how-connector { display: none; } }
  .cb-how-num { position: absolute; top: 12px; right: 16px; font-size: 32px; font-weight: 800; color: rgba(255,255,255,0.06); }
  .cb-how-title { font-size: 15.5px; font-weight: 800; margin-bottom: 10px; }
  .cb-how-desc { font-size: 13px; color: var(--muted); line-height: 1.6; max-width: 90%; }

  /* ---------- PRICING (light) ---------- */
  .cb-pricing-wrap { padding: 90px 0; }
  .cb-pricing-sub { text-align: center; color: var(--ink-muted); font-size: 14px; margin: -14px 0 36px; }
  .cb-pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; align-items: stretch; }
  @media (max-width: 860px) { .cb-pricing-grid { grid-template-columns: 1fr; } }
  .cb-price-card { position: relative; background: #F7F7F9; border: 1px solid rgba(10,10,12,0.10); border-radius: 18px; padding: 28px; display: flex; flex-direction: column; overflow: hidden; }
  .cb-price-card.popular { background: var(--ink); color: #fff; border-color: var(--ink); }
  .cb-price-ribbon { position: absolute; top: 16px; right: -34px; transform: rotate(45deg); background: var(--orange); color: #0A0A0B; font-size: 10px; font-weight: 800; letter-spacing: 0.06em; padding: 4px 40px; }
  .cb-price-kicker { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--orange-deep); margin-bottom: 8px; }
  .cb-price-card.popular .cb-price-kicker { color: var(--orange-light); }
  .cb-price-tier { font-size: 22px; font-weight: 800; margin-bottom: 18px; }
  .cb-price-feature { display: flex; align-items: center; gap: 8px; font-size: 13.5px; padding: 7px 0; border-top: 1px solid rgba(10,10,12,0.08); }
  .cb-price-card.popular .cb-price-feature { border-top-color: rgba(255,255,255,0.12); }
  .cb-price-feature:first-of-type { border-top: none; }
  .cb-price-feature svg { color: var(--orange-deep); flex-shrink: 0; }
  .cb-price-card.popular .cb-price-feature svg { color: var(--orange-light); }
  .cb-price-btn { margin-top: 22px; width: 100%; padding: 13px; border-radius: 10px; border: 1px solid rgba(10,10,12,0.18); background: transparent; color: var(--ink); font-weight: 700; font-size: 13.5px; cursor: pointer; font-family: inherit; }
  .cb-price-card.popular .cb-price-btn { background: linear-gradient(120deg, var(--orange-light), var(--orange)); color: #0A0A0B; border: none; }

  /* ---------- CONTACT (dark) ---------- */
  .cb-contact-wrap { padding: 90px 0; }
  .cb-contact-grid { display: grid; grid-template-columns: 1.3fr 0.9fr; gap: 24px; }
  @media (max-width: 880px) { .cb-contact-grid { grid-template-columns: 1fr; } }
  .cb-form-card { background: var(--surface); border: 1px solid var(--border); border-radius: 22px; padding: 34px; }
  .cb-form-heading { font-size: 22px; font-weight: 800; margin-bottom: 22px; }
  .cb-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  @media (max-width: 520px) { .cb-form-row { grid-template-columns: 1fr; } }
  .cb-field label { display: block; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
  .cb-field input, .cb-field select, .cb-field textarea {
    width: 100%; background: var(--bg-soft); border: 1px solid var(--border); border-radius: 10px;
    padding: 12px 14px; color: var(--white); font-size: 14px; font-family: inherit; outline: none; box-sizing: border-box;
  }
  .cb-field input::placeholder, .cb-field textarea::placeholder { color: #5c5c62; }
  .cb-field input:focus, .cb-field textarea:focus, .cb-field select:focus { border-color: var(--orange); }
  .cb-field { margin-bottom: 16px; }
  .cb-submit { width: 100%; margin-top: 6px; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 15px; border-radius: 10px; border: none; font-weight: 700; font-size: 14.5px; color: #0A0A0B; background: linear-gradient(100deg, var(--orange-light), var(--orange)); cursor: pointer; }
  .cb-info-card { background: linear-gradient(165deg, #22160C, var(--surface) 55%); border: 1px solid var(--border); border-radius: 22px; padding: 30px; display: flex; flex-direction: column; gap: 22px; height: fit-content; }
  .cb-info-heading { font-size: 18px; font-weight: 800; position: relative; padding-bottom: 12px; }
  .cb-info-heading::after { content: ""; position: absolute; left: 0; bottom: 0; width: 40px; height: 2px; background: var(--orange); }
  .cb-info-row { display: flex; gap: 14px; align-items: flex-start; }
  .cb-info-icon { width: 38px; height: 38px; border-radius: 10px; background: rgba(255,106,26,0.14); color: var(--orange-light); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .cb-info-label { font-size: 13px; font-weight: 700; margin-bottom: 4px; }
  .cb-info-value { font-size: 13px; color: var(--muted); line-height: 1.6; }
  .cb-info-value a { color: var(--orange-light); text-decoration: none; }

  /* ---------- FAQ (light) ---------- */
  .cb-faq-wrap { padding: 90px 0 110px; }
  .cb-faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 20px; }
  @media (max-width: 780px) { .cb-faq-grid { grid-template-columns: 1fr; } }
  .cb-faq-item { background: #F7F7F9; border: 1px solid rgba(10,10,12,0.10); border-radius: 14px; padding: 16px 18px; cursor: pointer; }
  .cb-faq-q { display: flex; align-items: center; justify-content: space-between; gap: 12px; font-weight: 700; font-size: 14px; }
  .cb-faq-q svg { color: var(--orange-deep); flex-shrink: 0; }
  .cb-faq-a { font-size: 13.5px; color: var(--ink-muted); line-height: 1.65; margin-top: 10px; }
`;

const capabilities = [
  { icon: Fingerprint, name: "Brand Identity Design" },
  { icon: PenTool, name: "Logo Design" },
  { icon: Palette, name: "Graphic Design" },
  { icon: Package, name: "Packaging Design" },
  { icon: BookOpen, name: "Brand Guidelines" },
  { icon: Share2, name: "Social Media Creatives" },
  { icon: Presentation, name: "Presentation Design" },
  { icon: Printer, name: "Print Design" },
];

const benefits = [
  { icon: Fingerprint, name: "Consistent Branding", desc: "One visual language across every touchpoint." },
  { icon: Sparkles, name: "Eye-Catching Visuals", desc: "Designs built to stop the scroll." },
  { icon: Users2, name: "Audience Engagement", desc: "Creative that speaks directly to your customers." },
  { icon: Layers, name: "Custom Design", desc: "Original work, never a stock template." },
  { icon: FileImage, name: "Print & Digital Ready", desc: "Assets delivered for every format you need." },
  { icon: Repeat, name: "Brand Recall", desc: "Visuals people actually remember." },
  { icon: Share2, name: "Easy Collaboration", desc: "Structured feedback rounds, no back-and-forth chaos." },
  { icon: Layers3, name: "Scalable Assets", desc: "A system that grows cleanly with your brand." },
];

const processSteps = ["Brief & Research", "Concept Design", "Design Development", "Client Review", "Finalization", "Delivery"];

const whyChooseUs = [
  { icon: Fingerprint, title: "Custom Identity", desc: "A unique visual identity built around your brand, not a template." },
  { icon: Layers, title: "Consistent Branding", desc: "Every touchpoint — digital or print — speaks the same visual language." },
  { icon: Target, title: "Engagement Focused", desc: "Design decisions made to connect with your actual audience." },
];

const howWeWork = [
  { title: "Discovery", desc: "Understanding your brand goals and audience.", icon: Search },
  { title: "Concept", desc: "Sketching initial creative directions.", icon: Lightbulb },
  { title: "Design", desc: "Refining visuals into polished assets.", icon: Wand2 },
  { title: "Delivery", desc: "Handing off final files, ready to use.", icon: CheckCircle2 },
];

const pricingTiers = [
  {
    kicker: "Starter Pack",
    tier: "Essentials",
    features: ["Logo Design", "Business Card", "Brand Color Palette", "2 Revisions"],
    popular: false,
  },
  {
    kicker: "Brand Identity",
    tier: "Growth",
    features: ["Full Logo Suite", "Brand Guidelines", "Social Media Kit", "Stationery Design"],
    popular: true,
  },
  {
    kicker: "Custom Campaign",
    tier: "Enterprise",
    features: ["Complete Brand System", "Packaging Design", "Campaign Creatives", "Dedicated Designer"],
    popular: false,
  },
];

const faqs = [
  { q: "What is brand identity design?", a: "It's the full visual system for your business — logo, colors, typography, and guidelines that keep everything consistent." },
  { q: "What's included in a brand guideline?", a: "Logo usage rules, color codes, typography, imagery style, and do's-and-don'ts so anyone can apply your brand correctly." },
  { q: "Do you design packaging?", a: "Yes — from concept through print-ready dielines for boxes, labels, and pouches." },
  { q: "How many revisions are included?", a: "Each package lists its revision rounds; additional rounds can be added if needed." },
  { q: "Can you design print and digital together?", a: "Yes — we build assets so your brand looks consistent across both from day one." },
  { q: "Do you offer social media creative kits?", a: "Yes — templated, on-brand post and story kits so your feed stays consistent." },
  { q: "How long does a project take?", a: "A logo/identity project typically runs 2–3 weeks; full brand systems take longer depending on scope." },
  { q: "Do I own the final files?", a: "Yes — you receive full source files and usage rights once the project is complete." },
  { q: "Can you redesign an existing brand?", a: "Yes — we can evolve your current identity or rebuild it from scratch." },
  { q: "Do you offer ongoing creative support?", a: "Yes — retainer options are available for brands that need creative on a recurring basis." },
];

const fadeUp = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };

function Reveal({ children, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div ref={ref} className={className} initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}>
      {children}
    </motion.div>
  );
}

export default function CreativeBrandCommunication() {
  const [openFaq, setOpenFaq] = useState(0);
  const formRef = useRef(null);
  const capRef = useRef(null);
  const [capGlow, setCapGlow] = useState(false);
  const [formGlow, setFormGlow] = useState(false);

  const glowCapabilities = () => {
    capRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setCapGlow(true);
    window.setTimeout(() => setCapGlow(false), 1800);
  };

  const goToRedesignForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setFormGlow(true);
    window.setTimeout(() => setFormGlow(false), 1800);
  };

  return (
    <div className="cb-root">
      <style>{styles}</style>

      {/* HERO */}
      <section className="cb-light cb-hero-wrap">
        <div className="cb-section cb-hero-grid">
          <motion.div
            ref={capRef}
            initial={{ opacity: 0, y: 24 }}
            animate={
              capGlow
                ? { opacity: 1, y: 0, boxShadow: "0 0 0 2px rgba(255,106,26,0.65), 0 0 46px 10px rgba(255,106,26,0.35)" }
                : { opacity: 1, y: 0, boxShadow: "0 0 0 0px rgba(255,106,26,0), 0 0 0px 0px rgba(255,106,26,0)" }
            }
            transition={{ duration: 0.5 }}
            style={{ borderRadius: 20 }}
          >
            <div className="cb-cap-panel">
              <div className="cb-cap-title">Core Capabilities</div>
              <div className="cb-cap-list">
                {capabilities.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <motion.div
                      className="cb-cap-item"
                      key={c.name}
                      whileHover={{ y: -3, backgroundColor: "#EDEDF1", boxShadow: "0 10px 22px -12px rgba(0,0,0,0.22)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="cb-cap-icon"><Icon size={16} /></div>
                      <div>
                        <div className="cb-cap-name">{c.name}</div>
                        <div className="cb-cap-sub">Expert solution</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.span className="cb-eyebrow" variants={fadeUp}>06. Creative Design</motion.span>
            <motion.h1 className="cb-h1" variants={fadeUp}>
              Creative & Brand
              <span className="accent">Communication</span>
            </motion.h1>
            <motion.p className="cb-lede" variants={fadeUp}>
              Strengthen your brand identity with impactful graphic design, creative
              communication, and customer engagement solutions.
            </motion.p>
            <motion.p className="cb-lede" variants={fadeUp}>
              From logo and identity systems to packaging, presentations, and social creatives,
              our design team builds a visual language that's consistent, memorable, and built to
              scale with your business.
            </motion.p>
            <motion.div className="cb-btn-row" variants={fadeUp}>
              <motion.button
                className="cb-btn-primary"
                whileHover={{ scale: 1.035 }}
                whileTap={{ scale: 0.97 }}
                onClick={glowCapabilities}
              >
                View Full Service <ArrowRight size={16} />
              </motion.button>
              <motion.button
                className="cb-btn-outline"
                whileHover={{ scale: 1.035, borderColor: "#FF6A1A" }}
                whileTap={{ scale: 0.97 }}
                onClick={goToRedesignForm}
              >
                Request a Redesign
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* BENEFITS + PROCESS */}
      <section className="cb-dark cb-dark-block">
        <div className="cb-section">
          <Reveal>
            <motion.div className="cb-section-head" variants={fadeUp}>
              <h2 className="cb-section-title">The Benefits of <span className="accent">Our Creative Work</span></h2>
            </motion.div>
            <div className="cb-benefits-grid">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <motion.div
                    className="cb-benefit-card"
                    key={b.name}
                    variants={fadeUp}
                    whileHover={{ y: -6, borderColor: "rgba(255,106,26,0.5)", backgroundColor: "#232329" }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div className="cb-benefit-icon" whileHover={{ backgroundColor: "#FF6A1A", color: "#0A0A0B" }} transition={{ duration: 0.2 }}>
                      <Icon size={18} />
                    </motion.div>
                    <div className="cb-benefit-name">{b.name}</div>
                    <div className="cb-benefit-desc">{b.desc}</div>
                  </motion.div>
                );
              })}
            </div>
          </Reveal>

          <Reveal>
            <motion.div className="cb-section-head" variants={fadeUp}>
              <h2 className="cb-section-title">Our Creative <span className="accent">Process</span></h2>
            </motion.div>
            <div className="cb-process-track">
              <div className="cb-process-line" />
              <motion.div
                className="cb-process-line-fill"
                initial={{ width: 0 }}
                whileInView={{ width: "calc(100% - 56px)" }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
              {processSteps.map((step, i) => (
                <motion.div
                  className="cb-process-step"
                  key={step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="cb-process-num">{String(i + 1).padStart(2, "0")}</div>
                  <div className="cb-process-label">{step}</div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="cb-light cb-why-wrap">
        <div className="cb-section">
          <Reveal>
            <motion.div className="cb-section-head" variants={fadeUp}>
              <h2 className="cb-section-title">Why Choose <span className="accent">Us</span></h2>
            </motion.div>
            <div className="cb-why-grid">
              {whyChooseUs.map((w) => {
                const Icon = w.icon;
                return (
                  <motion.div className="cb-why-card" key={w.title} variants={fadeUp}>
                    <div className="cb-why-icon"><Icon size={20} /></div>
                    <div className="cb-why-title">{w.title}</div>
                    <div className="cb-why-desc">{w.desc}</div>
                  </motion.div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="cb-dark cb-how-wrap">
        <div className="cb-section">
          <Reveal>
            <motion.div className="cb-section-head" variants={fadeUp} style={{ marginBottom: 6 }}>
              <h2 className="cb-section-title">How We <span className="accent">Work</span></h2>
            </motion.div>
            <motion.p className="cb-how-sub" variants={fadeUp}>Our proven methodology ensures consistent results.</motion.p>
            <div className="cb-how-grid">
              {howWeWork.map((s, i) => (
                <React.Fragment key={s.title}>
                  <motion.div className="cb-how-card" variants={fadeUp}>
                    <div className="cb-how-num">{String(i + 1).padStart(2, "0")}</div>
                    <div className="cb-how-title">{s.title}</div>
                    <div className="cb-how-desc">{s.desc}</div>
                  </motion.div>
                  {i < howWeWork.length - 1 && (
                    <div className="cb-how-connector">
                      <motion.div
                        className="cb-how-connector-fill"
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
        </div>
      </section>

      {/* PRICING */}
      <section className="cb-light cb-pricing-wrap">
        <div className="cb-section">
          <Reveal>
            <motion.div className="cb-section-head" variants={fadeUp} style={{ marginBottom: 6 }}>
              <h2 className="cb-section-title">Transparent <span className="accent">Pricing</span></h2>
            </motion.div>
            <motion.p className="cb-pricing-sub" variants={fadeUp}>Choose the plan that fits your brand's growth goals.</motion.p>
            <div className="cb-pricing-grid">
              {pricingTiers.map((p) => (
                <motion.div className={`cb-price-card ${p.popular ? "popular" : ""}`} key={p.tier} variants={fadeUp}>
                  {p.popular && <div className="cb-price-ribbon">POPULAR</div>}
                  <div className="cb-price-kicker">{p.kicker}</div>
                  <div className="cb-price-tier">{p.tier}</div>
                  {p.features.map((f) => (
                    <div className="cb-price-feature" key={f}><Check size={15} /> {f}</div>
                  ))}
                  <button className="cb-price-btn" onClick={goToRedesignForm}>Get Started</button>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section className="cb-dark cb-contact-wrap">
        <div className="cb-section cb-contact-grid">
          <motion.div
            ref={formRef}
            animate={
              formGlow
                ? { boxShadow: "0 0 0 2px rgba(255,106,26,0.65), 0 0 46px 10px rgba(255,106,26,0.35)" }
                : { boxShadow: "0 0 0 0px rgba(255,106,26,0), 0 0 0px 0px rgba(255,106,26,0)" }
            }
            transition={{ duration: 0.5 }}
            style={{ borderRadius: 22 }}
          >
            <motion.div
              className="cb-form-card"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
            >
              <motion.div className="cb-form-heading" variants={fadeUp}>Send us a Message</motion.div>
              <motion.div className="cb-form-row" variants={fadeUp}>
                <div className="cb-field"><label>Name *</label><input type="text" placeholder="John Doe" /></div>
                <div className="cb-field"><label>Email *</label><input type="email" placeholder="john@example.com" /></div>
              </motion.div>
              <motion.div className="cb-form-row" variants={fadeUp}>
                <div className="cb-field"><label>Phone *</label><input type="tel" placeholder="+91 98765 43210" /></div>
                <div className="cb-field">
                  <label>Subject</label>
                  <select defaultValue="General Inquiry">
                    <option>General Inquiry</option>
                    <option>Brand Identity Project</option>
                    <option>Packaging Design</option>
                    <option>Partnership</option>
                  </select>
                </div>
              </motion.div>
              <motion.div className="cb-field" variants={fadeUp}>
                <label>Message *</label>
                <textarea rows={5} placeholder="Tell us about your project..." />
              </motion.div>
              <motion.button className="cb-submit" variants={fadeUp} onClick={(e) => e.preventDefault()}>
                <Send size={16} /> Send Message
              </motion.button>
            </motion.div>
          </motion.div>

          <Reveal className="cb-info-card">
            <motion.div className="cb-info-heading" variants={fadeUp}>Contact Information</motion.div>
            <motion.div className="cb-info-row" variants={fadeUp}>
              <div className="cb-info-icon"><MapPin size={17} /></div>
              <div>
                <div className="cb-info-label">Our Office</div>
                <div className="cb-info-value">11 Block, Rajendra Nagar, Bareilly, Uttar Pradesh, India</div>
              </div>
            </motion.div>
            <motion.div className="cb-info-row" variants={fadeUp}>
              <div className="cb-info-icon"><Phone size={17} /></div>
              <div>
                <div className="cb-info-label">Phone</div>
                <div className="cb-info-value"><a href="tel:+917055255255">+91 7055255255</a></div>
              </div>
            </motion.div>
            <motion.div className="cb-info-row" variants={fadeUp}>
              <div className="cb-info-icon"><Mail size={17} /></div>
              <div>
                <div className="cb-info-label">Email</div>
                <div className="cb-info-value"><a href="mailto:info@dexterityworld.com">info@dexterityworld.com</a></div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="cb-light cb-faq-wrap">
        <div className="cb-section">
          <Reveal>
            <motion.div className="cb-section-head" variants={fadeUp}>
              <h2 className="cb-section-title">Frequently Asked <span className="accent">Questions</span></h2>
            </motion.div>
            <div className="cb-faq-grid">
              {faqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <motion.div className="cb-faq-item" key={f.q} variants={fadeUp} onClick={() => setOpenFaq(open ? -1 : i)}>
                    <div className="cb-faq-q">
                      {f.q}
                      {open ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                    <AnimatePresence>
                      {open && (
                        <motion.div
                          className="cb-faq-a"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                        >
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
    </div>
  );
}