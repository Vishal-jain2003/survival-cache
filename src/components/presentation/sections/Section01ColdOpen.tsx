import { motion } from "framer-motion";
import { CountUp } from "../shared";

const bullets = [
  "Why giant systems slow down at scale",
  "How caching fixes it at every layer",
  "The real architecture behind EdgeFabric",
  "What we got wrong — and what we fixed",
];

interface Props { active: boolean; }

export function Section01ColdOpen({ active }: Props) {
  return (
    <div className="slide-container px-8 md:px-16">
      {/* Decorative circles top-right */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "rgba(124,58,237,0.06)", transform: "translate(30%, -30%)" }} />
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "rgba(0,212,255,0.05)", transform: "translate(15%, -15%)" }} />

      {/* Cyan vertical bar */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        className="absolute left-8 top-[12%] bottom-[12%] w-[3px] rounded-full glow-cyan-strong"
        style={{ background: "var(--ef-cyan)", originY: 0 }}
      />

      <div className="max-w-5xl w-full pl-10">
        {/* Pre-tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="font-section text-xs tracking-[0.25em] mb-4"
          style={{ color: "var(--ef-cyan)" }}
        >
          TECH TALK 2025
        </motion.div>

        {/* Sweep line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 0.3, ease: "easeOut" }}
          className="h-px mb-6 max-w-sm"
          style={{ background: "var(--ef-cyan)", opacity: 0.4 }}
        />

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="font-display font-bold leading-tight mb-2"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--ef-white)" }}
        >
          Caching Is
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 120, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.7, type: "spring", stiffness: 100, damping: 12 }}
          className="font-display font-black tracking-[0.12em] animate-glow-pulse"
          style={{
            fontSize: "clamp(3rem, 9vw, 6.5rem)",
            color: "var(--ef-cyan)",
            textShadow: "0 0 30px rgba(0,212,255,0.6), 0 0 60px rgba(0,212,255,0.3)",
            lineHeight: 1,
          }}
        >
          SURVIVAL
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.5 }}
          className="font-body italic mt-3 mb-8"
          style={{ color: "var(--ef-gray)", fontSize: "clamp(0.9rem, 1.8vw, 1.15rem)" }}
        >
          Architecture Behind Scalable Systems
        </motion.div>

        {/* HR sweep */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "60%" }}
          transition={{ delay: 2.1, duration: 0.5, ease: "easeOut" }}
          className="h-px mb-7"
          style={{ background: "linear-gradient(to right, var(--ef-cyan), transparent)" }}
        />

        {/* Bullets */}
        <div className="space-y-3 mb-10">
          {bullets.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.3 + i * 0.2, duration: 0.5 }}
              className="flex items-start gap-3 font-body"
              style={{ color: "var(--ef-lgray)", fontSize: "clamp(0.85rem, 1.5vw, 1rem)" }}
            >
              <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                style={{ background: "var(--ef-cyan)", boxShadow: "0 0 8px rgba(0,212,255,0.6)" }} />
              {b}
            </motion.div>
          ))}
        </div>

        {/* Stat cards */}
        <div className="flex gap-4 flex-wrap">
          {[
            { label: "Netflix req/sec at peak",     to: 10, suffix: "M+",      delay: 3.2 },
            { label: "Cache read latency",           to: 1,  prefix: "~", suffix: "ms", delay: 3.4 },
            { label: "EdgeFabric availability",      to: 99.97, suffix: "%",   delay: 3.6, decimals: 2 },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: s.delay, duration: 0.5 }}
              className="glass rounded-xl px-5 py-3 text-center min-w-[120px] animate-pulse-cyan"
            >
              <div className="font-section font-bold text-xl" style={{ color: "var(--ef-cyan)" }}>
                {active ? (
                  <>
                    {s.prefix ?? ""}
                    <CountUp to={s.decimals ? s.to * 100 : s.to} duration={1800} active={active}
                      format={(n) => s.decimals ? (n / 100).toFixed(s.decimals) : n.toString()} />
                    {s.suffix}
                  </>
                ) : "–"}
              </div>
              <div className="font-body text-xs mt-0.5 uppercase tracking-wider" style={{ color: "var(--ef-gray)" }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
