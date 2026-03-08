import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Terminal } from "../shared";

interface Props { active: boolean; }

type AgentState = "idle" | "observe" | "explain" | "propose" | "act" | "done";

const AGENT_LINES = {
  observe: [
    { text: "→ ALERT: node-3 hit ratio: 91% → 62% (last 5m)", color: "var(--ef-orange)", delay: 0 },
    { text: "→ Calling edgefabric.metrics(nodeId=\"node-3\")", color: "var(--ef-cyan)", delay: 400 },
    { text: "→ Calling edgefabric.topology()", color: "var(--ef-cyan)", delay: 900 },
  ],
  explain: [
    { text: '→ "node-3 receiving disproportionate traffic"', color: "var(--ef-lgray)", delay: 0 },
    { text: '   Hot key: "campaign:summer-2025:offers"', color: "var(--ef-amber)", delay: 500 },
    { text: "   847 req/sec to this key alone.", color: "var(--ef-red)", delay: 900 },
  ],
  propose: [
    { text: '→ RECOMMENDED: Replicate hot key to all nodes', color: "var(--ef-cyan)", delay: 0 },
    { text: "  + Enable local L1 cache.", color: "var(--ef-cyan)", delay: 400 },
    { text: "  Awaiting human approval...", color: "var(--ef-gray)", delay: 800 },
  ],
  act: [
    { text: "✓ APPROVED — executing...", color: "var(--ef-green)", delay: 0 },
    { text: '→ edgefabric.hotkey.replicate(key="campaign:summer-2025:offers")', color: "var(--ef-cyan)", delay: 500 },
    { text: "→ Enabling L1 cache on all nodes...", color: "var(--ef-cyan)", delay: 1200 },
    { text: "→ node-3 hit ratio: 62% → 89% in 45 seconds.", color: "var(--ef-green)", delay: 2200 },
  ],
};

const tools = [
  { group: "OBSERVE", color: "var(--ef-cyan)", items: ["edgefabric.metrics(window='5m')", "edgefabric.topology()", "edgefabric.health(nodeId='node-4')"] },
  { group: "EXPLAIN", color: "var(--ef-violet)", items: ["edgefabric.rootcause(alertId='alert-882')", "edgefabric.explain.hotkey(key='trending:feed')"] },
  { group: "ACT ⚠️ Requires Human Approval", color: "var(--ef-orange)", items: ["edgefabric.rebalance(strategy='gradual')", "edgefabric.drain(nodeId='node-2')", "edgefabric.scale(delta=+2)"] },
];

export function Section15MCP({ active }: Props) {
  const [agentState, setAgentState] = useState<AgentState>("idle");
  const [lines, setLines] = useState<{ text: string; color?: string; delay: number }[]>([]);
  const [approved, setApproved] = useState(false);

  const startDemo = () => {
    setAgentState("observe");
    setLines(AGENT_LINES.observe);
    setApproved(false);
  };

  useEffect(() => {
    if (agentState === "observe") {
      const t = setTimeout(() => { setAgentState("explain"); setLines(AGENT_LINES.explain); }, 2000);
      return () => clearTimeout(t);
    }
    if (agentState === "explain") {
      const t = setTimeout(() => { setAgentState("propose"); setLines(AGENT_LINES.propose); }, 2500);
      return () => clearTimeout(t);
    }
    if (agentState === "act" && approved) {
      const t = setTimeout(() => setAgentState("done"), 3500);
      return () => clearTimeout(t);
    }
  }, [agentState, approved]);

  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold mb-6"
          style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.9rem)", color: "var(--ef-white)" }}
        >
          EdgeFabric doesn't just expose metrics. It can explain and act.
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Tool panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-xl overflow-hidden"
          >
            <div className="glass rounded-none p-3 border-b border-ef-border flex items-center justify-between">
              <span className="font-section text-xs" style={{ color: "var(--ef-gray)" }}>EdgeFabric MCP Agent</span>
              <span className="flex items-center gap-1 font-section text-xs" style={{ color: "var(--ef-green)" }}>
                <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse-green" style={{ background: "var(--ef-green)" }} />
                CONNECTED
              </span>
            </div>
            <div className="p-4 space-y-3">
              {tools.map((t, i) => (
                <div key={i}>
                  <div className="font-section text-xs mb-1" style={{ color: t.color }}>[{t.group}]</div>
                  {t.items.map((item, j) => (
                    <div key={j} className="font-section text-xs ml-2 mb-0.5" style={{ color: "var(--ef-lgray)" }}>
                      → {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Agent demo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            <Terminal
              lines={agentState === "idle" ? [{ text: "$ Waiting for demo...", color: "var(--ef-gray)", delay: 0 }] : lines}
              active={active && agentState !== "idle"}
              title="agent-demo"
              className="text-xs"
            />

            {/* Controls */}
            <div className="glass rounded-xl p-4">
              {agentState === "idle" && (
                <button
                  onClick={startDemo}
                  className="w-full py-2 rounded font-section text-xs font-bold transition-all"
                  style={{ background: "rgba(0,212,255,0.12)", border: "1px solid var(--ef-cyan)", color: "var(--ef-cyan)" }}
                >
                  ▶ Run Demo Scenario
                </button>
              )}

              {agentState === "propose" && !approved && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    <p className="font-body text-xs mb-2" style={{ color: "var(--ef-lgray)" }}>
                      Agent proposes: replicate hot key + enable L1 cache
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setApproved(true); setAgentState("act"); setLines(AGENT_LINES.act); }}
                        className="flex-1 py-2 rounded font-section text-xs font-bold"
                        style={{ background: "rgba(16,185,129,0.15)", border: "1px solid var(--ef-green)", color: "var(--ef-green)" }}
                      >
                        ✓ APPROVE
                      </button>
                      <button
                        onClick={() => { setAgentState("idle"); setLines([]); }}
                        className="flex-1 py-2 rounded font-section text-xs"
                        style={{ background: "rgba(239,68,68,0.1)", border: "1px solid var(--ef-red)", color: "var(--ef-red)" }}
                      >
                        ✗ REJECT
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}

              {agentState === "done" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                  <div className="font-section text-sm" style={{ color: "var(--ef-green)" }}>✓ Incident resolved autonomously</div>
                  <button onClick={() => { setAgentState("idle"); setLines([]); }}
                    className="mt-2 text-xs font-section" style={{ color: "var(--ef-gray)" }}>
                    ↺ Run again
                  </button>
                </motion.div>
              )}
            </div>

            <div className="glass-amber rounded-xl p-3">
              <p className="font-body text-xs" style={{ color: "var(--ef-lgray)" }}>
                <span style={{ color: "var(--ef-amber)" }} className="font-semibold">Every ACT tool requires explicit human approval.</span>{" "}
                The agent proposes. Humans decide. Always.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
