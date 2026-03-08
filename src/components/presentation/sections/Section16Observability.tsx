import { motion } from "framer-motion";
import { CountUp } from "../shared";

interface Props { active: boolean; }

const sloCards = [
  { icon: "✅", metric: "Availability", value: "99.97%", target: "≥ 99.5%",  headroom: "0.47% headroom",  color: "var(--ef-green)" },
  { icon: "✅", metric: "GET P95",      value: "4.2ms",  target: "≤ 10ms",   headroom: "2.38× faster",    color: "var(--ef-green)" },
  { icon: "✅", metric: "Hit Rate",     value: "94.7%",  target: "≥ 80%",    headroom: "well above target", color: "var(--ef-green)" },
  { icon: "✅", metric: "Rebalance δ",  value: "8.3%",   target: "≤ 10%",    headroom: "key movement",     color: "var(--ef-green)" },
];

function Sparkline({ active }: { active: boolean }) {
  const points = [20, 35, 25, 45, 30, 50, 40, 55, 38, 48, 42, 52, 45, 58, 50];
  const maxP = Math.max(...points);
  const pts = points.map((p, i) => `${(i / (points.length - 1)) * 200},${50 - (p / maxP) * 40}`).join(" ");
  return (
    <svg width="200" height="50" className="overflow-visible">
      <polyline points={pts} fill="none" stroke="var(--ef-cyan)" strokeWidth="1.5"
        style={{ opacity: active ? 1 : 0 }} />
      <circle cx={pts.split(" ").at(-1)?.split(",")[0] ?? "200"} cy={pts.split(" ").at(-1)?.split(",")[1] ?? "10"} r="3"
        fill="var(--ef-cyan)" style={{ filter: "drop-shadow(0 0 4px var(--ef-cyan))" }} />
    </svg>
  );
}

export function Section16Observability({ active }: Props) {
  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold mb-6"
          style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", color: "var(--ef-white)" }}
        >
          You can't fix what you can't see.
        </motion.h2>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-xl overflow-hidden mb-6"
        >
          {/* Dashboard header */}
          <div className="glass p-3 border-b flex items-center justify-between"
            style={{ borderColor: "var(--ef-border)" }}>
            <span className="font-section text-xs" style={{ color: "var(--ef-gray)" }}>
              EdgeFabric Observability Dashboard
            </span>
            <span className="flex items-center gap-1 font-section text-xs animate-pulse-green" style={{ color: "var(--ef-green)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--ef-green)" }} />
              LIVE
            </span>
          </div>

          {/* Metrics row */}
          <div className="grid grid-cols-4 divide-x" style={{ borderColor: "var(--ef-border)", borderBottomWidth: 1, borderBottomColor: "var(--ef-border)" }}>
            {[
              { label: "Cache Hit %", val: 94.7, color: "var(--ef-green)", suffix: "%", icon: "↑" },
              { label: "GET P95",     val: 4.2,  color: "var(--ef-cyan)",  suffix: "ms", icon: "✓" },
              { label: "Availability",val: 99.97, color: "var(--ef-green)", suffix: "%", icon: "✓" },
              { label: "Nodes",       val: 6,    color: "var(--ef-cyan)",  suffix: "/6", icon: "✓" },
            ].map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="p-4 text-center"
                style={{ borderColor: "var(--ef-border)" }}
              >
                <div className="font-section text-xs mb-1" style={{ color: "var(--ef-gray)" }}>{m.label}</div>
                <div className="font-section font-bold text-xl" style={{ color: m.color }}>
                  {active ? (
                    <CountUp to={m.val * 100} duration={1600} active={active}
                      format={(n) => (n / 100).toFixed(m.val < 10 ? 1 : 2)} />
                  ) : "–"}
                  {m.suffix}
                </div>
                <div className="font-section text-xs" style={{ color: m.color }}>{m.icon}</div>
              </motion.div>
            ))}
          </div>

          {/* Charts row */}
          <div className="p-4 grid grid-cols-2 gap-4">
            <div>
              <div className="font-section text-xs mb-2" style={{ color: "var(--ef-cyan)" }}>LATENCY TREND (P50/P95)</div>
              <Sparkline active={active} />
            </div>
            <div>
              <div className="font-section text-xs mb-2" style={{ color: "var(--ef-violet)" }}>HIT RATIO DONUT</div>
              <svg width="60" height="60">
                <circle cx="30" cy="30" r="22" fill="none" stroke="var(--ef-border)" strokeWidth="6" />
                <motion.circle cx="30" cy="30" r="22" fill="none" stroke="var(--ef-cyan)" strokeWidth="6"
                  strokeDasharray="138 38" strokeLinecap="round"
                  initial={{ strokeDasharray: "0 176" }}
                  animate={{ strokeDasharray: active ? "138 38" : "0 176" }}
                  transition={{ delay: 0.6, duration: 1.2 }}
                  style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
                />
                <text x="30" y="34" textAnchor="middle" fill="var(--ef-cyan)" fontSize="8" fontFamily="Space Mono">94.7%</text>
              </svg>
            </div>
          </div>
        </motion.div>

        {/* SLO cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {sloCards.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 + i * 0.1 }}
              className="glass-green rounded-xl p-3 text-center"
            >
              <div className="text-lg">{s.icon}</div>
              <div className="font-section text-xs mt-1" style={{ color: "var(--ef-gray)" }}>{s.metric}</div>
              <div className="font-section font-bold text-base" style={{ color: s.color }}>{s.value}</div>
              <div className="font-section text-xs" style={{ color: "var(--ef-gray)" }}>target {s.target}</div>
              <div className="font-body text-xs mt-0.5" style={{ color: "var(--ef-green)" }}>{s.headroom}</div>
            </motion.div>
          ))}
        </div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="glass rounded-xl p-4 flex flex-wrap gap-4"
        >
          {[
            { label: "mTLS", val: "Enabled on all intra-cluster connections" },
            { label: "Cert rotation", val: "Zero-downtime rolling" },
            { label: "Auth", val: "JWT validation at L7 before any read/write" },
          ].map((s, i) => (
            <div key={i} className="font-section text-xs">
              <span style={{ color: "var(--ef-cyan)" }}>{s.label}:</span>{" "}
              <span style={{ color: "var(--ef-lgray)" }}>{s.val}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
