import { motion } from "framer-motion";
import { useTypewriter } from "../useCountUp";

const nodes = [
  { label: "App Server 1", x: 20, y: 10, color: "#00D4FF" },
  { label: "App Server 2", x: 50, y: 10, color: "#00D4FF" },
  { label: "App Server 3", x: 80, y: 10, color: "#00D4FF" },
  { label: "Cache Node A", x: 25, y: 55, color: "#7C3AED" },
  { label: "Cache Node B", x: 50, y: 55, color: "#7C3AED" },
  { label: "Cache Node C", x: 75, y: 55, color: "#7C3AED" },
];

export function Slide10Distributed() {
  const typed = useTypewriter(
    'hash("user:42") % 3 = Node B\n→ Always routes to same node\n→ No duplicates, no confusion',
    30,
    true
  );

  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-5xl text-foreground mb-6"
        >
          Distributed <span className="text-cyan">Caching Architecture</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Architecture diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="card-cinematic rounded-xl p-5 relative"
            style={{ minHeight: 280 }}
          >
            {/* App servers row */}
            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-3">App Servers</div>
            <div className="flex justify-around mb-4">
              {[1, 2, 3].map((n, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  className="rounded-lg p-2 text-center text-xs font-mono-custom border border-cyan"
                  style={{ background: "rgba(0,212,255,0.08)" }}
                >
                  <div className="text-cyan mb-1">🖥</div>
                  <div className="text-cyan">App {n}</div>
                </motion.div>
              ))}
            </div>

            {/* Connecting lines */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex justify-around mb-3"
            >
              {[0, 1, 2].map(i => (
                <div key={i} className="flex flex-col items-center">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.9 + i * 0.1, duration: 0.4 }}
                    className="w-px h-8 origin-top"
                    style={{ background: "linear-gradient(#00D4FF, #7C3AED)" }}
                  />
                </div>
              ))}
            </motion.div>

            {/* Cache cluster label */}
            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Redis Cache Cluster</div>

            {/* Cache nodes */}
            <div className="flex justify-around">
              {["A", "B", "C"].map((n, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + i * 0.15 }}
                  className="rounded-full p-3 text-center text-xs font-mono-custom border border-violet animate-pulse-cyan"
                  style={{ background: "rgba(124,58,237,0.15)", width: 64, height: 64, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
                >
                  <div className="text-violet font-bold">Node</div>
                  <div className="text-violet font-bold">{n}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Consistent hashing explanation */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="card-cinematic rounded-xl p-5 flex flex-col gap-4"
          >
            <div className="text-cyan font-mono-custom text-xs uppercase tracking-widest">Consistent Hashing</div>
            <div className="card-cinematic rounded-lg p-3 font-mono-custom text-sm whitespace-pre-wrap text-green-success">
              {typed}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-green-success ml-0.5"
              />
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              {[
                "Each key always maps to the same node",
                "Adding a node only moves ~1/N of the keys",
                "Removing a node redistributes minimally",
                "No central coordinator — pure hash math",
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 + i * 0.2 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-cyan text-xs">▸</span>
                  {t}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
