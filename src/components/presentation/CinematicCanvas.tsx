import { useRef, useMemo, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CanvasProps {
  slideIndex: number;
  mousePos: { x: number; y: number };
}

const SLIDE_SPEEDS: Record<number, number> = {
  0: 2.0,  // title - fast
  3: 2.5,  // netflix - very fast
  10: 1.8, // challenges - orange tint
  11: 1.8, // more challenges
  15: 0.4, // closing - gentle drift
};

function ParticleField({ slideIndex, mouse }: { slideIndex: number; mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Points>(null);
  const nodeRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { size } = useThree();

  const speed = SLIDE_SPEEDS[slideIndex] ?? 1.0;

  const particleCount = 300;
  const nodeCount = 20;

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.015;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return { positions, velocities };
  }, []);

  const nodePositions = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  const linePositions = useMemo(() => {
    const lines: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodePositions[i * 3] - nodePositions[j * 3];
        const dy = nodePositions[i * 3 + 1] - nodePositions[j * 3 + 1];
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 6) {
          lines.push(
            nodePositions[i * 3], nodePositions[i * 3 + 1], nodePositions[i * 3 + 2],
            nodePositions[j * 3], nodePositions[j * 3 + 1], nodePositions[j * 3 + 2]
          );
        }
      }
    }
    return new Float32Array(lines);
  }, [nodePositions]);

  // Determine colors based on slide
  const isAlert = slideIndex === 10 || slideIndex === 11;

  const particleColor = isAlert ? "#FF6B35" : "#00D4FF";
  const nodeColor = isAlert ? "#EF4444" : "#7C3AED";
  const lineColor = isAlert ? "#FF6B35" : "#00D4FF";

  useFrame((state) => {
    if (!meshRef.current) return;
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime * speed;
    const mx = mouse.current.x * 0.3;
    const my = mouse.current.y * 0.3;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += velocities[i * 3] * speed;
      positions[i * 3 + 1] += velocities[i * 3 + 1] * speed;
      positions[i * 3 + 2] += velocities[i * 3 + 2] * speed * 0.5;

      // Parallax shift toward cursor
      positions[i * 3] += mx * 0.001;
      positions[i * 3 + 1] += my * 0.001;

      // Wrap around
      if (positions[i * 3] > 11) positions[i * 3] = -11;
      if (positions[i * 3] < -11) positions[i * 3] = 11;
      if (positions[i * 3 + 1] > 7) positions[i * 3 + 1] = -7;
      if (positions[i * 3 + 1] < -7) positions[i * 3 + 1] = 7;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;

    if (nodeRef.current) {
      const np = nodeRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < nodeCount; i++) {
        np[i * 3] += Math.sin(t * 0.3 + i) * 0.003 + mx * 0.0005;
        np[i * 3 + 1] += Math.cos(t * 0.2 + i) * 0.002 + my * 0.0005;
      }
      nodeRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (linesRef.current) {
      linesRef.current.material = new THREE.LineBasicMaterial({ color: lineColor, transparent: true, opacity: 0.15 });
    }
  });

  return (
    <group>
      {/* Particle field */}
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={particleCount}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={particleColor}
          size={0.05}
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>

      {/* Node spheres */}
      <points ref={nodeRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={nodePositions}
            count={nodeCount}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={nodeColor}
          size={0.18}
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Connection lines */}
      {linePositions.length > 0 && (
        <lineSegments ref={linesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={linePositions}
              count={linePositions.length / 3}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={lineColor} transparent opacity={0.12} />
        </lineSegments>
      )}
    </group>
  );
}

export function CinematicCanvas({ slideIndex, mousePos }: CanvasProps) {
  const mouseRef = useRef(mousePos);
  useEffect(() => { mouseRef.current = mousePos; }, [mousePos]);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "#0A0E1A" }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ width: "100%", height: "100%" }}
        dpr={[1, 1.5]}
      >
        <ParticleField slideIndex={slideIndex} mouse={mouseRef} />
      </Canvas>
    </div>
  );
}
