"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const ACCENT = "#3A64F0";
const ACCENT_CYAN = "#38BDF8";
const ACCENT_GLOW = "#5E8BFF";
const ACCENT_LIGHT = "#9FB2EE";

function Layer({ depth, children }: { depth: number; children: React.ReactNode }) {
  return <group userData={{ depth }}>{children}</group>;
}

function Slab({
  pos,
  size,
  color = "#ffffff",
  edge = "#9fb2ee",
  r = 0.05,
  metalness = 0.1,
  roughness = 0.2,
  opacity = 1,
  transparent = false,
}: {
  pos: [number, number, number];
  size: [number, number, number];
  color?: string;
  edge?: string | false;
  r?: number;
  metalness?: number;
  roughness?: number;
  opacity?: number;
  transparent?: boolean;
}) {
  return (
    <RoundedBox args={size} radius={r} smoothness={2} position={pos}>
      <meshPhysicalMaterial
        color={color}
        roughness={roughness}
        metalness={metalness}
        clearcoat={1}
        clearcoatRoughness={0.1}
        envMapIntensity={1.2}
        opacity={opacity}
        transparent={transparent}
      />
      {edge && <Edges threshold={20} color={edge} />}
    </RoundedBox>
  );
}

/** The centerpiece Interactive 3D Isometric Crystal Cube / Tesseract */
function InteractiveCube({ lite }: { lite: boolean }) {
  const outerCubeRef = useRef<THREE.Group>(null);
  const innerCoreRef = useRef<THREE.Group>(null);
  const gyroRingRef = useRef<THREE.Group>(null);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const px = lite ? 0 : state.pointer.x;
    const py = lite ? 0 : state.pointer.y;

    if (outerCubeRef.current) {
      // Continuous smooth 3D tumble + mouse cursor interaction
      const targetRotY = t * 0.45 + px * 0.9;
      const targetRotX = t * 0.35 - py * 0.8;
      const targetRotZ = Math.sin(t * 0.5) * 0.25;

      outerCubeRef.current.rotation.y = THREE.MathUtils.damp(outerCubeRef.current.rotation.y, targetRotY, 3, dt);
      outerCubeRef.current.rotation.x = THREE.MathUtils.damp(outerCubeRef.current.rotation.x, targetRotX, 3, dt);
      outerCubeRef.current.rotation.z = THREE.MathUtils.damp(outerCubeRef.current.rotation.z, targetRotZ, 2.5, dt);

      // Gentle floating levitation
      outerCubeRef.current.position.y = Math.sin(t * 2) * 0.08;
    }

    if (innerCoreRef.current) {
      // Inner tesseract core counter-rotates faster
      innerCoreRef.current.rotation.y = -t * 0.85;
      innerCoreRef.current.rotation.x = -t * 0.65;
      innerCoreRef.current.rotation.z = t * 0.4;
    }

    if (gyroRingRef.current) {
      gyroRingRef.current.rotation.z += dt * 0.2;
    }
  });

  return (
    <group>
      {/* Outer Floating Gyro Rings */}
      <group ref={gyroRingRef}>
        <mesh>
          <torusGeometry args={[1.5, 0.014, 16, 80]} />
          <meshStandardMaterial color={ACCENT} roughness={0.2} metalness={0.8} emissive={ACCENT} emissiveIntensity={0.3} />
        </mesh>
        <mesh rotation={[0.5, 0.4, 0]}>
          <torusGeometry args={[1.75, 0.012, 16, 80]} />
          <meshStandardMaterial color={ACCENT_LIGHT} transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Main 3D Interactive Isometric Cube */}
      <group ref={outerCubeRef} scale={0.92}>
        {/* Outer Frosted Crystal Glass Box */}
        <RoundedBox args={[1.5, 1.5, 1.5]} radius={0.12} smoothness={4}>
          <meshPhysicalMaterial
            color="#ffffff"
            roughness={0.08}
            metalness={0.15}
            transmission={0.85}
            thickness={0.8}
            ior={1.52}
            clearcoat={1}
            clearcoatRoughness={0.06}
            envMapIntensity={2.5}
            transparent
            opacity={0.92}
          />
          <Edges threshold={15} color={ACCENT_CYAN} />
        </RoundedBox>

        {/* 8 Glowing Corner Nodes */}
        {[-0.75, 0.75].map((x) =>
          [-0.75, 0.75].map((y) =>
            [-0.75, 0.75].map((z) => (
              <mesh key={`${x}-${y}-${z}`} position={[x, y, z]}>
                <sphereGeometry args={[0.045, 12, 12]} />
                <meshStandardMaterial color="#ffffff" emissive={ACCENT_CYAN} emissiveIntensity={1.5} roughness={0.1} metalness={0.9} />
              </mesh>
            ))
          )
        )}

        {/* Inner Counter-Rotating Holographic Tesseract Core */}
        <group ref={innerCoreRef}>
          <RoundedBox args={[0.78, 0.78, 0.78]} radius={0.08} smoothness={3}>
            <meshStandardMaterial
              color="#0e2360"
              roughness={0.2}
              metalness={0.8}
              emissive={ACCENT}
              emissiveIntensity={0.8}
            />
            <Edges threshold={15} color="#60a5fa" />
          </RoundedBox>

          {/* Inner Pulsating Photon Sphere */}
          <mesh>
            <sphereGeometry args={[0.22, 24, 24]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function CubeSceneRig({ lite }: { lite: boolean }) {
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const viewport = useThree((s) => s.viewport);

  useFrame((state, dt) => {
    const g = outer.current;
    const layers = inner.current;
    if (!g || !layers) return;

    const px = lite ? 0 : state.pointer.x;
    const py = lite ? 0 : state.pointer.y;

    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, -0.22 + px * 0.18, 2.4, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.08 - py * 0.1, 2.4, dt);

    const s = Math.min(1, window.scrollY / (window.innerHeight * 0.9));
    const spread = 0.35 + s * 0.4;
    for (const c of layers.children) {
      const d = c.userData.depth as number | undefined;
      if (d !== undefined) c.position.z = THREE.MathUtils.damp(c.position.z, d * spread, 3.5, dt);
    }
  });

  const scale = Math.min(0.92, viewport.width / 6.6);

  return (
    <group ref={outer} scale={scale}>
      {/* Floating Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              useMemo(() => {
                const arr = new Float32Array(120 * 3);
                for (let i = 0; i < 120; i++) {
                  arr[i * 3] = (Math.random() - 0.5) * 12;
                  arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
                  arr[i * 3 + 2] = (Math.random() - 0.5) * 7;
                }
                return arr;
              }, []),
              3,
            ]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.024} color={ACCENT_CYAN} transparent opacity={0.65} sizeAttenuation depthWrite={false} />
      </points>

      {/* Perspective Ground Grid */}
      <gridHelper args={[14, 28, "#a9b8ee", "#dfe4f4"]} position={[0, -2.2, -1.2]} />

      <group ref={inner}>
        {/* Layer 0: Back Architectural Studio Slab */}
        <Layer depth={0}>
          <Slab pos={[0, 0, 0]} size={[4.8, 3.1, 0.08]} color="#ffffff" edge="#9fb2ee" r={0.08} />
        </Layer>

        {/* Layer 1: Top Navigation Bar Slab + Browser Action Nodes */}
        <Layer depth={1}>
          <Slab pos={[0, 1.32, 0]} size={[4.6, 0.26, 0.05]} color="#f0f2f8" edge="#b4c2f0" r={0.05} />
          {[-2.05, -1.9, -1.75].map((x, i) => (
            <mesh key={i} position={[x, 1.32, 0.04]}>
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshStandardMaterial color={i === 2 ? ACCENT : "#b9bfd2"} />
            </mesh>
          ))}
          {[0.9, 1.5, 2.1].map((x, i) => (
            <Slab key={i} pos={[x, 1.32, 0.04]} size={[0.4, 0.06, 0.03]} color="#9aa0b4" edge={false} r={0.02} />
          ))}
        </Layer>

        {/* Layer 2: Left Content Cards & Glass UI Mockups */}
        <Layer depth={2}>
          <Slab pos={[-1.4, 0.7, 0]} size={[1.5, 0.18, 0.04]} color="#14161f" edge={false} r={0.03} />
          <Slab pos={[-1.52, 0.44, 0]} size={[1.25, 0.18, 0.04]} color="#14161f" edge={false} r={0.03} />
          <Slab pos={[-1.6, 0.16, 0]} size={[1.05, 0.07, 0.03]} color="#9aa0b4" edge={false} r={0.02} />
          <Slab pos={[-1.5, -0.22, 0]} size={[0.85, 0.22, 0.05]} color={ACCENT} edge={false} r={0.08} />
          <Slab pos={[-1.5, -0.72, 0]} size={[1.2, 0.35, 0.04]} color="#e7ebf8" edge={ACCENT_LIGHT} r={0.06} />
        </Layer>

        {/* Layer 3: Glass Stage Panel behind the Cube */}
        <Layer depth={2.2}>
          <Slab
            pos={[0.88, 0.08, 0]}
            size={[2.6, 1.9, 0.06]}
            color="#eef2fc"
            edge={ACCENT}
            r={0.08}
            roughness={0.1}
            metalness={0.2}
          />
        </Layer>

        {/* Layer 5: The Centerpiece 3D Interactive Cube */}
        <Layer depth={4.5}>
          <group position={[0.88, 0.08, 0]}>
            <InteractiveCube lite={lite} />
          </group>
        </Layer>

        {/* Layer 6: Floating Foreground Mini Metric Cards */}
        <Layer depth={5.2}>
          {[-1.35, 0, 1.35].map((x, i) => (
            <Slab key={i} pos={[x, -1.05, 0]} size={[1.2, 0.45, 0.05]} color="#ffffff" edge="#b4c2f0" r={0.06} />
          ))}
        </Layer>
      </group>
    </group>
  );
}

export default function CubeScene({
  lite,
  active,
  onReady,
}: {
  lite: boolean;
  active: boolean;
  onReady?: () => void;
}) {
  return (
    <Canvas
      dpr={lite ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [0, 0, 8.4], fov: 32 }}
      gl={{ antialias: !lite, alpha: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "demand"}
      onCreated={() => onReady?.()}
      aria-hidden="true"
    >
      <Environment resolution={lite ? 128 : 256} frames={1}>
        <Lightformer form="rect" intensity={6} position={[-5, 4, 4]} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={3.5} color={ACCENT_GLOW} position={[5, -2, 3]} scale={[6, 4, 1]} />
        <Lightformer form="ring" intensity={4} position={[0, 5, -4]} scale={4} />
      </Environment>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 6]} intensity={2.4} />
      <directionalLight position={[-3, -2, 4]} intensity={1.2} color="#a6bbf8" />
      <pointLight position={[-4, -1, 3]} intensity={16} color={ACCENT_GLOW} />
      <pointLight position={[3, 2, 5]} intensity={8} color="#ffffff" />
      <CubeSceneRig lite={lite} />
    </Canvas>
  );
}
