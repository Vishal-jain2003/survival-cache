import { motion } from "framer-motion";
import { CountUp } from "../shared";

interface Props { active: boolean; }

const stats = [
  {
    number: 500_000_000,
    label: "Active YouTube users on any given day",
    sub: "Your database gets asked the same questions MILLIONS of times",
  },
  {
    number: 220_000_000,
    label: "Netflix subscribers hitting Play every evening",
    sub: "Without caching, that's 220M simultaneous DB queries",
  },
  {
    number: 2_000_000_000,
    label: "Instagram daily active users",
    sub: "One viral post = half a million identical feed requests in 60 seconds",
  },
];

export function Section02ScaleShock({ active }: Props) {
  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-4xl w-full">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display font-bold mb-2"
          style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", color: "var(--ef-white)" }}
        >
          The day everything broke.
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "40%" }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="h-px mb-10"
          style={{ background: "var(--ef-red)", opacity: 0.5 }}
        />

        {/* Stats */}
        <div className="space-y-7">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.35, duration: 0.6 }}
              className="glass rounded-xl p-5"
            >
              <div
                className="font-section font-bold leading-none mb-2"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  color: "var(--ef-red)",
                  textShadow: "0 0 20px rgba(239,68,68,0.4)",
                }}
              >
                {active ? (
                  <CountUp to={s.number} duration={2000 + i * 200} active={active}
                    format={(n) => n.toLocaleString()} />
                ) : "–"}
              </div>
              <div className="font-body font-semibold mb-1" style={{ color: "var(--ef-lgray)", fontSize: "0.95rem" }}>
                {s.label}
              </div>
              <div className="flex items-start gap-2 font-body text-sm" style={{ color: "var(--ef-gray)" }}>
                <span style={{ color: "var(--ef-orange)" }}>→</span>
                {s.sub}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="glass-cyan rounded-xl p-4 mt-8"
        >
          <p className="font-body text-sm leading-relaxed" style={{ color: "var(--ef-lgray)" }}>
            <span style={{ color: "var(--ef-cyan)" }} className="font-semibold">
              These companies don't have smarter databases.
            </span>{" "}
            They have smarter systems. The secret is caching.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
