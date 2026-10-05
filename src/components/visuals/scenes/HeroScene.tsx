"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const ACCENT = "#3A64F0";
const ACCENT_GLOW = "#5E8BFF";
const ACCENT_LIGHT = "#9FB2EE";

/** Procedural high-definition Iris texture with radial stroma fibers, depth & collarette. */
function createIrisCanvasTexture() {
  if (typeof document === "undefined") return null;
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 12;

  // Base Iris Radial Gradient
  const baseGrad = ctx.createRadialGradient(cx, cy, radius * 0.12, cx, cy, radius);
  baseGrad.addColorStop(0, "#081028");
  baseGrad.addColorStop(0.2, "#13317d");
  baseGrad.addColorStop(0.48, "#255cd8");
  baseGrad.addColorStop(0.78, "#4285f4");
  baseGrad.addColorStop(0.92, "#1d3d8f");
  baseGrad.addColorStop(1, "#060c1c");
  ctx.fillStyle = baseGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();

  // Hundreds of Organic Radial Fibers
  ctx.save();
  ctx.translate(cx, cy);
  const fiberCount = 480;
  for (let i = 0; i < fiberCount; i++) {
    const angle = (i / fiberCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.025;
    const rStart = radius * (0.24 + Math.random() * 0.08);
    const rEnd = radius * (0.94 + Math.random() * 0.06);

    ctx.save();
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(rStart, 0);
    const midR = (rStart + rEnd) / 2;
    const curveOffset = (Math.random() - 0.5) * 7;
    ctx.quadraticCurveTo(midR, curveOffset, rEnd, 0);

    const colors = [
      "rgba(180, 220, 255, 0.5)",
      "rgba(110, 180, 255, 0.55)",
      "rgba(220, 240, 255, 0.4)",
      "rgba(45, 110, 240, 0.6)",
      "rgba(255, 255, 255, 0.35)",
    ];
    ctx.strokeStyle = colors[i % colors.length];
    ctx.lineWidth = 1.0 + Math.random() * 1.8;
    ctx.stroke();
    ctx.restore();
  }

  // Collarette Ring (Zigzag Undulating Band)
  ctx.beginPath();
  const collarettePts = 56;
  for (let i = 0; i <= collarettePts; i++) {
    const a = (i / collarettePts) * Math.PI * 2;
    const r = radius * (0.48 + Math.sin(a * 9) * 0.045 + Math.cos(a * 13) * 0.025);
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.strokeStyle = "rgba(220, 240, 255, 0.75)";
  ctx.lineWidth = 3.2;
  ctx.stroke();

  // Dark Outer Limbal Ring
  const limbalGrad = ctx.createRadialGradient(0, 0, radius * 0.82, 0, 0, radius);
  limbalGrad.addColorStop(0, "rgba(4, 9, 22, 0)");
  limbalGrad.addColorStop(0.65, "rgba(4, 9, 22, 0.75)");
  limbalGrad.addColorStop(1, "rgba(2, 4, 12, 1)");
  ctx.fillStyle = limbalGrad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  // Black Pupil Core
  ctx.fillStyle = "#010204";
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.28, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/** Layer container for depth-based drift on scroll and parallax. */
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

/** The centerpiece 3D Eyeball with real-time cursor tracking. */
function InteractiveEyeBall({ lite }: { lite: boolean }) {
  const eyeBallRef = useRef<THREE.Group>(null);
  const [irisTexture, setIrisTexture] = useState<THREE.CanvasTexture | null>(null);
  const segs = lite ? 40 : 64;

  useEffect(() => {
    const tex = createIrisCanvasTexture();
    setIrisTexture(tex);
    return () => {
      tex?.dispose();
    };
  }, []);

  useFrame((state, dt) => {
    if (!eyeBallRef.current) return;
    const px = lite ? 0 : state.pointer.x;
    const py = lite ? 0 : state.pointer.y;

    const saccadeX = Math.sin(state.clock.elapsedTime * 2.2) * 0.012;
    const saccadeY = Math.cos(state.clock.elapsedTime * 2.7) * 0.01;

    const targetRotY = px * 0.65 + saccadeX;
    const targetRotX = -py * 0.5 + saccadeY;

    eyeBallRef.current.rotation.y = THREE.MathUtils.damp(eyeBallRef.current.rotation.y, targetRotY, 4.5, dt);
    eyeBallRef.current.rotation.x = THREE.MathUtils.damp(eyeBallRef.current.rotation.x, targetRotX, 4.5, dt);
  });

  return (
    <group ref={eyeBallRef}>
      {/* Sclera White Globe */}
      <mesh>
        <sphereGeometry args={[1.05, segs, segs]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.14}
          metalness={0.04}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={1.4}
        />
      </mesh>

      {/* Iris Disc on front (+Z = 1.0) */}
      <group position={[0, 0, 1.0]}>
        <mesh position={[0, 0, 0.01]}>
          <circleGeometry args={[0.58, segs]} />
          {irisTexture ? (
            <meshStandardMaterial
              map={irisTexture}
              roughness={0.2}
              metalness={0.3}
              envMapIntensity={1.6}
              side={THREE.DoubleSide}
            />
          ) : (
            <meshStandardMaterial color={ACCENT} />
          )}
        </mesh>
        <mesh position={[0, 0, 0.015]}>
          <ringGeometry args={[0.56, 0.59, segs]} />
          <meshBasicMaterial color="#050a18" />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <circleGeometry args={[0.18, 32]} />
          <meshBasicMaterial color="#020306" />
        </mesh>
      </group>

      {/* Glossy Cornea Lens Dome */}
      <mesh position={[0, 0, 0.74]}>
        <sphereGeometry args={[0.65, segs, Math.floor(segs / 2), 0, Math.PI * 2, 0, Math.PI * 0.44]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.02}
          transmission={0.96}
          ior={1.42}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.02}
          envMapIntensity={2.8}
          transparent
        />
      </mesh>
    </group>
  );
}

/** Complete Rich 3D Composition with Eye, Glass Panels, UI Slabs & Holographic Gyro Brackets. */
function EyeSceneRig({ lite }: { lite: boolean }) {
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const apertureRing = useRef<THREE.Group>(null);
  const viewport = useThree((s) => s.viewport);

  useFrame((state, dt) => {
    const g = outer.current;
    const layers = inner.current;
    if (!g || !layers) return;

    const px = lite ? 0 : state.pointer.x;
    const py = lite ? 0 : state.pointer.y;

    // Overall 3D Scene Parallax Tilt
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, -0.25 + px * 0.2, 2.4, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.1 - py * 0.12, 2.4, dt);

    // Scroll-driven layer depth expansion
    const s = Math.min(1, window.scrollY / (window.innerHeight * 0.9));
    const spread = 0.35 + s * 0.4;
    for (const c of layers.children) {
      const d = c.userData.depth as number | undefined;
      if (d !== undefined) c.position.z = THREE.MathUtils.damp(c.position.z, d * spread, 3.5, dt);
    }

    // Slow rotation of aperture rings
    if (apertureRing.current) {
      apertureRing.current.rotation.z += dt * 0.15;
    }
  });

  const scale = Math.min(0.92, viewport.width / 6.6);

  return (
    <group ref={outer} scale={scale}>
      {/* Floating Light Dust Particles */}
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
        <pointsMaterial size={0.024} color={ACCENT} transparent opacity={0.65} sizeAttenuation depthWrite={false} />
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
          {/* Top-right UI Pills */}
          {[0.9, 1.5, 2.1].map((x, i) => (
            <Slab key={i} pos={[x, 1.32, 0.04]} size={[0.4, 0.06, 0.03]} color="#9aa0b4" edge={false} r={0.02} />
          ))}
        </Layer>

        {/* Layer 2: Left Content Cards & Glass UI Mockups */}
        <Layer depth={2}>
          {/* Main Headline Slab Placeholder */}
          <Slab pos={[-1.4, 0.7, 0]} size={[1.5, 0.18, 0.04]} color="#14161f" edge={false} r={0.03} />
          <Slab pos={[-1.52, 0.44, 0]} size={[1.25, 0.18, 0.04]} color="#14161f" edge={false} r={0.03} />
          <Slab pos={[-1.6, 0.16, 0]} size={[1.05, 0.07, 0.03]} color="#9aa0b4" edge={false} r={0.02} />
          {/* Accent CTA Button */}
          <Slab pos={[-1.5, -0.22, 0]} size={[0.85, 0.22, 0.05]} color={ACCENT} edge={false} r={0.08} />
          {/* Metric Badge */}
          <Slab pos={[-1.5, -0.72, 0]} size={[1.2, 0.35, 0.04]} color="#e7ebf8" edge={ACCENT_LIGHT} r={0.06} />
        </Layer>

        {/* Layer 3: Glass Stage Panel behind the Eye */}
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

        {/* Layer 4: Orbital Holographic Gyro Aperture surrounding Eye */}
        <Layer depth={3.2}>
          <group ref={apertureRing} position={[0.88, 0.08, 0]}>
            {/* Outer Ring */}
            <mesh>
              <torusGeometry args={[1.45, 0.016, 16, 80]} />
              <meshStandardMaterial color={ACCENT} roughness={0.2} metalness={0.7} emissive={ACCENT} emissiveIntensity={0.25} />
            </mesh>
            {/* Inner Dashed Ring */}
            <mesh rotation={[0.4, 0.3, 0]}>
              <torusGeometry args={[1.7, 0.012, 16, 80]} />
              <meshStandardMaterial color={ACCENT_LIGHT} transparent opacity={0.65} />
            </mesh>
            {/* Orbital Marker Nodes */}
            {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((ang, idx) => (
              <mesh key={idx} position={[Math.cos(ang) * 1.45, Math.sin(ang) * 1.45, 0]}>
                <sphereGeometry args={[0.045, 12, 12]} />
                <meshStandardMaterial color={idx === 0 ? ACCENT_GLOW : "#ffffff"} roughness={0.1} metalness={0.9} />
              </mesh>
            ))}
          </group>
        </Layer>

        {/* Layer 5: The Interactive 3D Eyeball Centerpiece */}
        <Layer depth={4.5}>
          <group position={[0.88, 0.08, 0]}>
            <InteractiveEyeBall lite={lite} />
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

export default function HeroScene({
  lite,
  active,
  onReady,
}: {
  lite: boolean;
  active: boolean;
  onReady: () => void;
}) {
  return (
    <Canvas
      dpr={lite ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [0, 0, 8.4], fov: 32 }}
      gl={{ antialias: !lite, alpha: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "demand"}
      onCreated={() => onReady()}
      aria-hidden="true"
    >
      <Environment resolution={lite ? 128 : 256} frames={1}>
        <Lightformer form="rect" intensity={6} position={[-5, 4, 4]} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={3.5} color={ACCENT_GLOW} position={[5, -2, 3]} scale={[6, 4, 1]} />
        <Lightformer form="ring" intensity={4} position={[0, 5, -4]} scale={4} />
      </Environment>
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 4, 6]} intensity={2.2} />
      <directionalLight position={[-3, -2, 4]} intensity={1.2} color="#a6bbf8" />
      <pointLight position={[-4, -1, 3]} intensity={16} color={ACCENT_GLOW} />
      <pointLight position={[3, 2, 5]} intensity={8} color="#ffffff" />
      <EyeSceneRig lite={lite} />
    </Canvas>
  );
}
