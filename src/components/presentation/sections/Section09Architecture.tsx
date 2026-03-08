import { motion } from "framer-motion";

interface Props { active: boolean; }

const layers = [
  {
    label: "LAYER 0 — CLIENT",
    color: "var(--ef-cyan)",
    items: ["HTTP Client", "gRPC Client"],
    detail: "Thin client libraries with connection pooling and automatic retry",
  },
  {
    label: "LAYER 1 — LOAD BALANCER (L4/L7)",
    color: "var(--ef-violet)",
    items: ["Consistent hashing for key stickiness", "Circuit breaking + timeout enforcement", "Token bucket rate limiting", "Slow-start for new nodes"],
    detail: "Key-aware routing ensures the same key always hits the same primary node",
  },
  {
    label: "LAYER 2 — CACHE NODES (Cluster)",
    color: "var(--ef-cyan)",
    items: ["Node A: keys 0–25%", "Node B: keys 26–50%", "Node C: keys 51–75%", "Node D: keys 76–99%"],
    detail: "Each node: in-memory KV store + WAL on local NVMe disk",
  },
  {
    label: "LAYER 3 — REPLICATION",
    color: "var(--ef-green)",
    items: ["Replication factor ≥ 2", "Each write → 2+ nodes", "Read repair on divergence", "Anti-entropy scrubbing every 30s"],
    detail: "Quorum writes on strong consistency path; async on eventual",
  },
  {
    label: "LAYER 4 — GOSSIP (SWIM Protocol)",
    color: "var(--ef-violet)",
    items: ["No central coordinator", "Suspect → Failed → Removed", "O(log N) convergence rounds"],
    detail: "Every 500ms: each node probes 2 random neighbors",
  },
  {
    label: "LAYER 5 — PERSISTENCE",
    color: "var(--ef-amber)",
    items: ["WAL on local disk (fsync)", "Periodic snapshots", "Recovery: snapshot restore → WAL replay"],
    detail: "Zero data loss even on abrupt power failure",
  },
  {
    label: "LAYER 6 — OBSERVABILITY",
    color: "var(--ef-orange)",
    items: ["Hit ratio, P50/P95 latency, evictions", "Distributed traces", "Structured logs", "Dashboard JSON export"],
    detail: "All metrics exported in OpenTelemetry format",
  },
];

export function Section09Architecture({ active }: Props) {
  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold mb-8"
          style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.4rem)", color: "var(--ef-white)" }}
        >
          The Full EdgeFabric Architecture
        </motion.h2>

        <div className="space-y-2">
          {layers.map((layer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.18, duration: 0.5 }}
              className="glass rounded-xl p-4 border-l-4 group"
              style={{ borderLeftColor: layer.color }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="font-section text-xs mb-2" style={{ color: layer.color }}>
                    {layer.label}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {layer.items.map((item, j) => (
                      <span key={j} className="font-body text-xs px-2 py-0.5 rounded"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--ef-border)", color: "var(--ef-lgray)" }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="font-body text-xs max-w-[220px] text-right opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "var(--ef-gray)" }}>
                  {layer.detail}
                </div>
              </div>
              {i < layers.length - 1 && (
                <div className="mt-2 flex items-center gap-1 ml-4">
                  <div className="w-px h-3" style={{ background: "rgba(0,212,255,0.2)" }} />
                  <span className="text-xs" style={{ color: "rgba(0,212,255,0.3)" }}>↓</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="font-body text-xs mt-3"
          style={{ color: "var(--ef-gray)" }}
        >
          💡 Hover each layer for implementation detail
        </motion.p>
      </div>
    </div>
  );
}
