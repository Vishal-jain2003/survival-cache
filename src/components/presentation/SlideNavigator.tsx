import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CinematicCanvas } from "./CinematicCanvas";

// ── Section imports ────────────────────────────────────────────────────
import { Section01ColdOpen }     from "./sections/Section01ColdOpen";
import { Section02ScaleShock }   from "./sections/Section02ScaleShock";
import { Section03WhyBreaks }    from "./sections/Section03WhyBreaks";
import { Section04Netflix }      from "./sections/Section04Netflix";
import { Section05Viral }        from "./sections/Section05Viral";
import { Section06MentalModel }  from "./sections/Section06MentalModel";
import { Section07TypesOfCaching } from "./sections/Section07TypesOfCaching";
import { Section08EdgeFabric }   from "./sections/Section08EdgeFabric";
import { Section09Architecture } from "./sections/Section09Architecture";
import { Section10HashRing }     from "./sections/Section10HashRing";
import { Section11Gossip }       from "./sections/Section11Gossip";
import { Section12WAL }          from "./sections/Section12WAL";
import { Section13Consistency }  from "./sections/Section13Consistency";
import { Section14Challenges }   from "./sections/Section14Challenges";
import { Section15MCP }          from "./sections/Section15MCP";
import { Section16Observability } from "./sections/Section16Observability";
import { Section17Closing }      from "./sections/Section17Closing";

const SECTIONS = [
  { label: "COLD OPEN",     code: "01" },
  { label: "SCALE SHOCK",   code: "02" },
  { label: "WHY IT BREAKS", code: "03" },
  { label: "NETFLIX",       code: "04" },
  { label: "VIRAL SPIKE",   code: "05" },
  { label: "MENTAL MODEL",  code: "06" },
  { label: "TYPES",         code: "07" },
  { label: "EDGEFABRIC",    code: "08" },
  { label: "ARCHITECTURE",  code: "09" },
  { label: "HASH RING",     code: "10" },
  { label: "GOSSIP/SWIM",   code: "11" },
  { label: "WAL",           code: "12" },
  { label: "CONSISTENCY",   code: "13" },
  { label: "CHALLENGES",    code: "14" },
  { label: "AGENTIC / MCP", code: "15" },
  { label: "OBSERVABILITY", code: "16" },
  { label: "CLOSING",       code: "17" },
];

const COMPONENTS = [
  Section01ColdOpen,
  Section02ScaleShock,
  Section03WhyBreaks,
  Section04Netflix,
  Section05Viral,
  Section06MentalModel,
  Section07TypesOfCaching,
  Section08EdgeFabric,
  Section09Architecture,
  Section10HashRing,
  Section11Gossip,
  Section12WAL,
  Section13Consistency,
  Section14Challenges,
  Section15MCP,
  Section16Observability,
  Section17Closing,
];

const TOTAL = COMPONENTS.length;

const slideVariants = {
  enter: (dir: number) => ({
    scale: 0.9,
    opacity: 0,
    x: dir > 0 ? 100 : -100,
  }),
  center: { scale: 1, opacity: 1, x: 0 },
  exit: (dir: number) => ({
    scale: 0.9,
    opacity: 0,
    x: dir > 0 ? -100 : 100,
  }),
};

export function SlideNavigator() {
  const [current, setCurrent]   = useState(0);
  const [direction, setDirection] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showHint, setShowHint] = useState(true);
  const touchStart = useRef<number | null>(null);
  const isAnimating = useRef(false);

  const navigate = useCallback((dir: number) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setDirection(dir);
    setCurrent(prev => Math.max(0, Math.min(TOTAL - 1, prev + dir)));
    setTimeout(() => { isAnimating.current = false; }, 500);
  }, []);

  const goTo = useCallback((idx: number) => {
    if (isAnimating.current || idx === current) return;
    isAnimating.current = true;
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
    setTimeout(() => { isAnimating.current = false; }, 500);
  }, [current]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown")  navigate(1);
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")    navigate(-1);
      if (e.key === "f" || e.key === "F") {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
        else document.exitFullscreen?.();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate]);

  // Touch swipe
  useEffect(() => {
    const onStart = (e: TouchEvent) => { touchStart.current = e.touches[0].clientX; };
    const onEnd   = (e: TouchEvent) => {
      if (touchStart.current === null) return;
      const diff = touchStart.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
      touchStart.current = null;
    };
    window.addEventListener("touchstart", onStart);
    window.addEventListener("touchend", onEnd);
    return () => { window.removeEventListener("touchstart", onStart); window.removeEventListener("touchend", onEnd); };
  }, [navigate]);

  // Mouse parallax
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth  - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  // Auto-hide hint
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(t);
  }, []);

  const SectionComponent = COMPONENTS[current];
  const section = SECTIONS[current];
  const progress = ((current) / (TOTAL - 1)) * 100;

  return (
    <div className="w-full h-screen overflow-hidden relative" style={{ background: "var(--ef-bg)" }}>
      {/* 3D Canvas */}
      <CinematicCanvas sectionIndex={current} mousePos={mousePos} />

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-ef-border">
        <motion.div
          className="h-full"
          style={{ background: "var(--ef-cyan)", boxShadow: "0 0 8px rgba(0,212,255,0.8)" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Section indicator */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`sec-${current}`}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 left-6 z-40 flex items-center gap-3"
        >
          <span className="font-section text-xs" style={{ color: "var(--ef-cyan)" }}>
            {section.code}
          </span>
          <span className="font-section text-xs tracking-widest uppercase" style={{ color: "var(--ef-gray)" }}>
            / {section.label}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Slide count */}
      <div className="fixed top-4 right-6 z-40 font-section text-xs" style={{ color: "var(--ef-gray)" }}>
        {String(current + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
      </div>

      {/* Section content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0 z-10"
        >
          <SectionComponent active={true} />
        </motion.div>
      </AnimatePresence>

      {/* Nav arrows */}
      {current > 0 && (
        <button
          onClick={() => navigate(-1)}
          className="fixed left-3 top-1/2 -translate-y-1/2 z-40 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(17,24,39,0.9)", border: "1px solid var(--ef-border)", color: "var(--ef-gray)" }}
          aria-label="Previous"
        >
          ←
        </button>
      )}
      {current < TOTAL - 1 && (
        <button
          onClick={() => navigate(1)}
          className="fixed right-3 top-1/2 -translate-y-1/2 z-40 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(17,24,39,0.9)", border: "1px solid var(--ef-border)", color: "var(--ef-gray)" }}
          aria-label="Next"
        >
          →
        </button>
      )}

      {/* Dot progress */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5">
        {SECTIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width:      i === current ? 18 : 5,
              height:     5,
              background: i === current ? "var(--ef-cyan)" : "var(--ef-border)",
              boxShadow:  i === current ? "0 0 8px rgba(0,212,255,0.6)" : "none",
            }}
            aria-label={`Section ${i + 1}`}
          />
        ))}
      </div>

      {/* Keyboard hint */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-5 right-5 z-40 font-section text-xs hidden md:block"
            style={{ color: "var(--ef-gray)" }}
          >
            ← → navigate &nbsp;|&nbsp; F fullscreen
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
