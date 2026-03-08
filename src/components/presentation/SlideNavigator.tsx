import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CinematicCanvas } from "./CinematicCanvas";
import { Slide01Title } from "./slides/Slide01Title";
import { Slide02Agenda } from "./slides/Slide02Agenda";
import { Slide03ScaleIntro } from "./slides/Slide03ScaleIntro";
import { Slide04Netflix } from "./slides/Slide04Netflix";
import { Slide05Instagram } from "./slides/Slide05Instagram";
import { Slide06WhyCache } from "./slides/Slide06WhyCache";
import { Slide07MentalModel } from "./slides/Slide07MentalModel";
import { Slide08TypesOfCaching } from "./slides/Slide08Types";
import { Slide09L1L2 } from "./slides/Slide09L1L2";
import { Slide10Distributed } from "./slides/Slide10Distributed";
import { Slide11ChallengesA } from "./slides/Slide11ChallengesA";
import { Slide12ChallengesB } from "./slides/Slide12ChallengesB";
import { Slide13Architecture } from "./slides/Slide13Architecture";
import { Slide14Lessons } from "./slides/Slide14Lessons";
import { Slide15Results } from "./slides/Slide15Results";
import { Slide16Closing } from "./slides/Slide16Closing";

const SECTIONS = [
  { label: "TITLE", section: "00" },
  { label: "AGENDA", section: "00" },
  { label: "SCALE", section: "01" },
  { label: "SCALE", section: "01" },
  { label: "SCALE", section: "01" },
  { label: "WHY CACHE", section: "02" },
  { label: "HOW IT WORKS", section: "03" },
  { label: "TYPES", section: "03" },
  { label: "LAYERING", section: "03" },
  { label: "DISTRIBUTED", section: "04" },
  { label: "CHALLENGES", section: "04" },
  { label: "CHALLENGES", section: "04" },
  { label: "ARCHITECTURE", section: "05" },
  { label: "LESSONS", section: "05" },
  { label: "RESULTS", section: "05" },
  { label: "CLOSING", section: "06" },
];

const SLIDES = [
  Slide01Title,
  Slide02Agenda,
  Slide03ScaleIntro,
  Slide04Netflix,
  Slide05Instagram,
  Slide06WhyCache,
  Slide07MentalModel,
  Slide08TypesOfCaching,
  Slide09L1L2,
  Slide10Distributed,
  Slide11ChallengesA,
  Slide12ChallengesB,
  Slide13Architecture,
  Slide14Lessons,
  Slide15Results,
  Slide16Closing,
];

const TOTAL = SLIDES.length;

const slideVariants = {
  enter: (dir: number) => ({
    scale: 0.88,
    opacity: 0,
    x: dir > 0 ? 80 : -80,
  }),
  center: {
    scale: 1,
    opacity: 1,
    x: 0,
  },
  exit: (dir: number) => ({
    scale: 0.88,
    opacity: 0,
    x: dir > 0 ? -80 : 80,
  }),
};

export function SlideNavigator() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const touchStart = useRef<number | null>(null);

  const navigate = useCallback((dir: number) => {
    setDirection(dir);
    setCurrent(prev => Math.max(0, Math.min(TOTAL - 1, prev + dir)));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") navigate(1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") navigate(-1);
      if (e.key === "f" || e.key === "F") {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen?.();
        } else {
          document.exitFullscreen?.();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate]);

  // Touch swipe
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStart.current === null) return;
      const diff = touchStart.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
      touchStart.current = null;
    };
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [navigate]);

  // Mouse parallax
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const SlideComponent = SLIDES[current];
  const section = SECTIONS[current];

  return (
    <div className="w-full h-screen overflow-hidden relative" style={{ background: "#0A0E1A" }}>
      {/* 3D Canvas Background */}
      <CinematicCanvas slideIndex={current} mousePos={mousePos} />

      {/* Section label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`section-${current}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute top-6 left-8 z-20 flex items-center gap-3"
        >
          <span className="font-mono-custom text-xs text-muted-foreground uppercase tracking-widest">
            {section.section} / {section.label}
          </span>
          <span className="font-mono-custom text-xs text-cyan">
            {String(current + 1).padStart(2, "0")}/{TOTAL}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Slide content */}
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
          <SlideComponent />
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      {current > 0 && (
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-cyan transition-colors"
          style={{ background: "rgba(17,24,39,0.8)", border: "1px solid #1E2D40" }}
          aria-label="Previous slide"
        >
          ←
        </button>
      )}
      {current < TOTAL - 1 && (
        <button
          onClick={() => navigate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-cyan transition-colors"
          style={{ background: "rgba(17,24,39,0.8)", border: "1px solid #1E2D40" }}
          aria-label="Next slide"
        >
          →
        </button>
      )}

      {/* Dot progress indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              background: i === current ? "#00D4FF" : "#1E2D40",
              boxShadow: i === current ? "0 0 8px rgba(0,212,255,0.6)" : "none",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Keyboard hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 right-6 z-20 text-xs text-muted-foreground font-mono-custom hidden md:block"
      >
        ← → navigate &nbsp;|&nbsp; F fullscreen
      </motion.div>
    </div>
  );
}
