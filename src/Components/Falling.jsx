import { useEffect, useRef, useState } from "react";

/**
 * FallingTagsSection
 * ---------------------------------------------------------------
 * A row of colored pill "tags" that drop from above and land with
 * a springy bounce into a scattered, overlapping, rotated layout —
 * triggered the instant the section scrolls into view (no delay).
 *
 * No animation library required (no Framer Motion / GSAP / Matter.js) —
 * it's a small hand-rolled spring integrator driven by
 * requestAnimationFrame, so it drops straight into any React app.
 *
 * Usage:
 *   <FallingTagsSection />
 *   <FallingTagsSection triggerOnce={false} />   // re-drop every time it re-enters view
 */

// --- Tag data -------------------------------------------------------
// rotate:  final resting angle (deg)
// lift:    vertical offset from baseline, px (negative = higher up)
// overlap: negative margin-left to pull it toward the previous tag, px
const TAGS = [
  { text: "#Strategy",   gradient: "linear-gradient(135deg,#fbe8ff,#f1e6ff)", color: "#5b21b6", rotate: -90, lift: 0,   overlap: 0,   pad: "34px 14px" },
  { text: "#Awesome!",   gradient: "linear-gradient(120deg,#8fc4ff,#c2a9ff)", color: "#1e2033", rotate: -4,  lift: 34,  overlap: 8 },
  { text: "#Development",gradient: "linear-gradient(120deg,#a6b2f5,#8b93ef)", color: "#1e2033", rotate: -2,  lift: 34,  overlap: -8 },
  { text: "#leads",      gradient: "linear-gradient(160deg,#22d3ee,#0ea5e9)", color: "#0f172a", rotate: -58, lift: -22, overlap: 4 },
  { text: "#seo",        gradient: "linear-gradient(160deg,#a78bfa,#f97316)", color: "#0f172a", rotate: 122, lift: 30,  overlap: -46 },
  { text: "#Designing",  gradient: "linear-gradient(120deg,#fdba74,#fed7aa)", color: "#7c2d12", rotate: -3,  lift: -6,  overlap: -6 },
  { text: "#Sales",      gradient: "linear-gradient(120deg,#bbf7d0,#86efac)", color: "#14532d", rotate: -3,  lift: 34,  overlap: -8 },
  { text: "#Searches",   gradient: "linear-gradient(150deg,#fef9c3,#fde68a)", color: "#713f12", rotate: -22, lift: -20, overlap: 30 },
  { text: "#Conversion", gradient: "linear-gradient(150deg,#e5e7eb,#f3f4f6)", color: "#1f2937", rotate: -16, lift: 30,  overlap: -34 },
  { text: "#Creatives",  gradient: "linear-gradient(150deg,#86efac,#38bdf8)", color: "#0f172a", rotate: -20, lift: -18, overlap: 26 },
  { text: "#Marketing",  gradient: "linear-gradient(120deg,#f0abfc,#e9d5ff)", color: "#4a044e", rotate: -6,  lift: 34,  overlap: -30 },
  { text: "#Branding",   gradient: "linear-gradient(120deg,#5eead4,#67e8f9)", color: "#083344", rotate: -3,  lift: -8,  overlap: 14 },
  { text: "#Analytics",  gradient: "linear-gradient(160deg,#818cf8,#6366f1)", color: "#1e1b4b", rotate: -14, lift: 28,  overlap: -10 },
];

// --- tiny spring integrator ------------------------------------------
// Semi-implicit Euler spring: gives a natural overshoot + settle
// (a stand-in for "falls, bounces once, comes to rest").
function makeSpring(stiffness = 0.022, damping = 0.86) {
  return { pos: 0, vel: 0, target: 0, stiffness, damping };
}
function stepSpring(s) {
  const force = (s.target - s.pos) * s.stiffness;
  s.vel = (s.vel + force) * s.damping;
  s.pos += s.vel;
  return s;
}
function springSettled(s) {
  return Math.abs(s.target - s.pos) < 0.05 && Math.abs(s.vel) < 0.05;
}

function useInView({ triggerOnce = true, threshold = 0.15, root = null, rootMargin = '0px' } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) observer.disconnect();
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold, root, rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [triggerOnce, threshold, root, rootMargin]);

  return [ref, inView];
}

export default function FallingTagsSection({ triggerOnce = true }) {
  const [sectionRef, inView] = useInView({ triggerOnce });
  const tagRefs = useRef([]);
  const springsY = useRef([]);
  const springsR = useRef([]);
  const rafRef = useRef(null);
  const startedRef = useRef(false);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    springsY.current = TAGS.map(() => makeSpring(0.022, 0.86));
    springsR.current = TAGS.map(() => makeSpring(0.03, 0.84));
  }, []);

  useEffect(() => {
    if (!inView) {
      if (triggerOnce === false) startedRef.current = false;
      return;
    }
    if (startedRef.current) return;
    startedRef.current = true;

    const reduced = prefersReducedMotion.current;

    TAGS.forEach((tag, i) => {
      const sy = springsY.current[i];
      const sr = springsR.current[i];
      sy.pos = -340; // start well above the section
      sy.vel = 0;
      sy.target = tag.lift;
      sr.pos = tag.rotate + (i % 2 === 0 ? -70 : 70); // tumble in
      sr.vel = 0;
      sr.target = tag.rotate;

      if (reduced) {
        sy.pos = tag.lift;
        sr.pos = tag.rotate;
      }
    });

    if (reduced) {
      tagRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.transform = `translateY(${TAGS[i].lift}px) rotate(${TAGS[i].rotate}deg)`;
        el.style.opacity = "1";
      });
      return;
    }

    // stagger: each tag "releases" a beat after the last one, but the
    // FIRST tag starts the instant the section is visible — no wait.
    const STAGGER_MS = 220;
    const releaseTimes = TAGS.map((_, i) => i * STAGGER_MS);
    const startTime = performance.now();

    const tick = (now) => {
      let stillMoving = false;
      const elapsed = now - startTime;

      TAGS.forEach((tag, i) => {
        const el = tagRefs.current[i];
        if (!el) return;
        if (elapsed < releaseTimes[i]) {
          stillMoving = true;
          return; // hasn't been released yet
        }

        const sy = springsY.current[i];
        const sr = springsR.current[i];
        if (!springSettled(sy)) { stepSpring(sy); stillMoving = true; }
        if (!springSettled(sr)) { stepSpring(sr); stillMoving = true; }

        el.style.opacity = "1";
        el.style.transform = `translateY(${sy.pos}px) rotate(${sr.pos}deg)`;
      });

      if (stillMoving) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, [inView, triggerOnce]);

  return (
    <section
      ref={sectionRef}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "28px 0",
        padding: "96px 24px",
        overflow: "hidden",
      }}
    >
      {TAGS.map((tag, i) => (
        <span
          key={tag.text}
          ref={(el) => (tagRefs.current[i] = el)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            whiteSpace: "nowrap",
            padding: tag.pad || "12px 22px",
            marginLeft: i === 0 ? 0 : tag.overlap,
            borderRadius: 999,
            background: tag.gradient,
            color: tag.color,
            fontWeight: 600,
            fontSize: "1.05rem",
            fontFamily:
              "'Poppins','Segoe UI',system-ui,-apple-system,sans-serif",
            boxShadow: "0 6px 16px rgba(20,20,43,0.10)",
            opacity: 0,
            willChange: "transform, opacity",
            transform: `translateY(-340px) rotate(${tag.rotate}deg)`,
            position: "relative",
            zIndex: i + 1,
          }}
        >
          {tag.text}
        </span>
      ))}
    </section>
  );
}