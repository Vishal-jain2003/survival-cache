import { motion } from "framer-motion";
import { useState } from "react";

interface Props { active: boolean; }

const LETTERS = "EDGEFABRIC".split("");

const requirements = [
  { name: "API & Client",       desc: "REST + gRPC client libraries" },
  { name: "Traffic Mgmt",       desc: "Rate limiting, circuit breaking" },
  { name: "Data Distribution",  desc: "Consistent hash ring" },
  { name: "Cluster Membership", desc: "SWIM gossip protocol" },
  { name: "Health Checks",      desc: "Active + passive probing" },
  { name: "Rebalancing",        desc: "Online rehash, ≤10% key movement" },
  { name: "Persistence / WAL",  desc: "Write-ahead log + snapshots" },
  { name: "Load Shedding",      desc: "Token bucket, adaptive queuing" },
  { name: "Consistency",        desc: "Tunable per-request + per-tenant" },
  { name: "Observability",      desc: "Metrics, traces, structured logs" },
  { name: "SLOs",               desc: "99.5% avail, P95 ≤10ms" },
  { name: "Agentic / MCP",      desc: "AI-native OBSERVE→EXPLAIN→ACT" },
  { name: "Security / mTLS",    desc: "Zero-downtime cert rotation" },
  { name: "Chaos Testing",      desc: "Fault injection framework" },
  { name: "Cost Design",        desc: "Resource-aware eviction" },
  { name: "CI/CD",              desc: "Blue-green, canary releases" },
  { name: "Docs",               desc: "Runbooks, ADRs, API reference" },
];

const reasons = [
  "① Redis didn't give us tunable consistency per tenant",
  "② We needed MCP-native agentic operations built in from day 1",
  "③ We wanted WAL-backed durability without an external DB dependency",
];

export function Section08EdgeFabric({ active }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        {/* EdgeFabric letter-by-letter */}
        <div className="flex items-baseline gap-1 mb-4">
          {LETTERS.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
              className="font-section font-bold"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "var(--ef-cyan)",
                textShadow: "0 0 20px rgba(0,212,255,0.6)",
                letterSpacing: "0.08em",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="font-body italic mb-6"
          style={{ color: "var(--ef-gray)", fontSize: "1rem" }}
        >
          We didn't use Redis. We didn't use Memcached.{" "}
          <span style={{ color: "var(--ef-white)" }} className="font-semibold not-italic">
            We built our own.
          </span>
        </motion.p>

        {/* Reasons */}
        <div className="space-y-2 mb-8">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 + i * 0.2 }}
              className="font-body text-sm"
              style={{ color: "var(--ef-lgray)" }}
            >
              {r}
            </motion.div>
          ))}
        </div>

        {/* Requirements grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7 }}
          className="glass rounded-xl p-5 mb-6"
        >
          <div className="font-section text-xs mb-3" style={{ color: "var(--ef-cyan)" }}>17 REQUIREMENTS — ALL DESIGNED & BUILT IN-HOUSE</div>
          <div className="flex flex-wrap gap-2">
            {requirements.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8 + i * 0.06 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="relative px-2.5 py-1 rounded text-xs font-section cursor-default transition-all duration-200"
                style={{
                  background: "rgba(0,212,255,0.08)",
                  border: `1px solid ${hovered === i ? "rgba(0,212,255,0.6)" : "rgba(0,212,255,0.2)"}`,
                  color: hovered === i ? "var(--ef-cyan)" : "var(--ef-lgray)",
                  boxShadow: hovered === i ? "0 0 12px rgba(0,212,255,0.3)" : "none",
                }}
              >
                {r.name}
                {hovered === i && (
                  <div className="absolute bottom-full left-0 mb-1 px-2 py-1 rounded text-xs z-50 whitespace-nowrap"
                    style={{ background: "var(--ef-card)", border: "1px solid var(--ef-border)", color: "var(--ef-lgray)" }}>
                    {r.desc}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0 }}
          className="font-section text-sm"
          style={{ color: "var(--ef-cyan)" }}
        >
          Every single one of these — designed, built, and tested by our team.
        </motion.div>
      </div>
    </div>
  );
}
