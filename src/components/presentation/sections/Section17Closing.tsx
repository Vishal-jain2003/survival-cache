import { motion } from "framer-motion";
import { CountUp } from "../shared";

interface Props { active: boolean; }

const lines = [
  "Cache early.",
  "Cache smart.",
  "Survive scale.",
];

const takeaways = [
  "At scale, the same data is requested millions of times — cache is the only answer",
  "WAL + SWIM + consistent hashing: the three pillars that kept us running at 3AM",
  "Agentic ops isn't the future — it's what we shipped",
  "99.97% availability isn't luck. It's architecture.",
];

const metrics = [
  { label: "Availability",    value: 9997,  format: (n: number) => `${(n/100).toFixed(2)}%` },
  { label: "GET P95",         value: 420,   format: (n: number) => `${(n/100).toFixed(1)}ms` },
  { label: "Hit Rate",        value: 9470,  format: (n: number) => `${(n/100).toFixed(1)}%` },
  { label: "Key Movement",    value: 830,   format: (n: number) => `≤${(n/100).toFixed(1)}%` },
  { label: "Data Loss",       value: 0,     format: () => "0 bytes" },
  { label: "Requirements Met",value: 17,   format: (n: number) => `${n}/17` },
];

export function Section17Closing({ active }: Props) {
  return (
    <div className="slide-container px-8 md:px-16">
      {/* Violet glow backdrop */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,58,237,0.07) 0%, transparent 70%)" }} />

      <div className="max-w-5xl w-full relative z-10">
        {/* Main lines */}
        <div className="mb-10">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.5, duration: 0.7, type: "spring", damping: 14 }}
              className="font-display font-black leading-tight"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
                color: i === 2 ? "var(--ef-cyan)" : "var(--ef-white)",
                textShadow: i === 2 ? "0 0 30px rgba(0,212,255,0.5)" : "none",
              }}
            >
              {line}
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0 }}
            className="font-section text-sm mt-2 text-right max-w-lg"
            style={{ color: "var(--ef-cyan)" }}
          >
            — EdgeFabric
          </motion.div>
        </div>

        {/* Takeaways */}
        <div className="space-y-2 mb-8">
          {takeaways.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.3 + i * 0.3 }}
              className="flex items-start gap-3 font-body text-sm"
              style={{ color: "var(--ef-lgray)" }}
            >
              <span style={{ color: "var(--ef-green)" }} className="flex-shrink-0">✓</span>
              {t}
            </motion.div>
          ))}
        </div>

        {/* Metric strip */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.6 + i * 0.15 }}
              className="glass rounded-xl p-3 text-center"
            >
              <div className="font-section font-bold text-base" style={{ color: "var(--ef-cyan)" }}>
                {active ? <CountUp to={m.value} duration={2000 + i * 100} active={active} format={m.format} /> : "–"}
              </div>
              <div className="font-body text-xs mt-0.5" style={{ color: "var(--ef-gray)" }}>{m.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.8 }}
          className="text-center"
          style={{ animation: "glow-pulse 3s ease-in-out infinite" }}
        >
          <div className="font-section text-lg font-bold" style={{ color: "var(--ef-cyan)", textShadow: "0 0 20px rgba(0,212,255,0.4)" }}>
            EF
          </div>
          <div className="font-body text-sm mt-2" style={{ color: "var(--ef-gray)" }}>
            Questions? Let's go deeper.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
