import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Props { active: boolean; }

const rows = [
  { before: "1 DB query per request",   after: "10 MILLION queries / second",  shake: true },
  { before: "Data in one place",        after: "Which of 100 servers has it?", shake: false },
  { before: "100ms response time",      after: "Users leave after 3s waiting",  shake: true },
];

function DbCounter({ active }: { active: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setCount(c => c + Math.floor(Math.random() * 12000 + 8000)), 80);
    return () => clearInterval(id);
  }, [active]);
  return (
    <div className="glass-red rounded-xl p-4 text-center">
      <div className="font-section text-xs mb-1" style={{ color: "var(--ef-gray)" }}>DB QUERIES THIS SECOND</div>
      <div className="font-section font-bold text-2xl animate-pulse-red" style={{ color: "var(--ef-red)" }}>
        {count.toLocaleString()}
      </div>
    </div>
  );
}

export function Section03WhyBreaks({ active }: Props) {
  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display font-bold mb-8"
          style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", color: "var(--ef-white)" }}
        >
          What actually happens inside your server.
        </motion.h2>

        {/* Analogy card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="glass-violet rounded-xl p-5 mb-8 border-l-4"
          style={{ borderLeftColor: "var(--ef-violet)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🍕</span>
            <span className="font-section text-sm font-bold" style={{ color: "var(--ef-violet)" }}>THE PIZZA SHOP ANALOGY</span>
          </div>
          <div className="font-body text-sm leading-relaxed space-y-1" style={{ color: "var(--ef-lgray)" }}>
            <p>1 customer: Chef makes pizza fresh. 10 minutes. Perfect.</p>
            <p>10,000 customers arrive simultaneously.</p>
            <p style={{ color: "var(--ef-red)" }}>Making every pizza from scratch = kitchen collapses.</p>
            <p className="pt-1" style={{ color: "var(--ef-cyan)" }}>You need pre-made pizza slices under heat lamps. That's your cache.</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Rows */}
          <div className="space-y-3">
            {rows.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.25, duration: 0.5 }}
                className="glass rounded-xl p-4"
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-body text-sm" style={{ color: "var(--ef-lgray)" }}>{r.before}</span>
                  <span style={{ color: "var(--ef-gray)" }}>→</span>
                  <span
                    className={`font-section text-sm font-bold ${r.shake && active ? "animate-shake" : ""}`}
                    style={{ color: "var(--ef-red)", textShadow: "0 0 10px rgba(239,68,68,0.4)" }}
                  >
                    {r.after}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Live counter */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <DbCounter active={active} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
