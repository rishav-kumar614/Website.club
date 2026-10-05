"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const ACCENT = "#3A64F0";
const ACCENT_GLOW = "#5E8BFF";
const ACCENT_LIGHT = "#9FB2EE";

/** Procedural iridescent butterfly wing texture with delicate organic veins & luminous margins */
function createButterflyWingTexture() {
  if (typeof document === "undefined") return null;
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Rich Iridescent Base (Midnight Cobalt -> Electric Royal Blue -> Sky Cyan -> Luminous Violet)
  const grad = ctx.createLinearGradient(0, size, size, 0);
  grad.addColorStop(0, "#03081a");
  grad.addColorStop(0.25, "#0e3498");
  grad.addColorStop(0.55, "#2563eb");
  grad.addColorStop(0.8, "#38bdf8");
  grad.addColorStop(1, "#a855f7");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // Structural Wing Cells & Fine Vein Architecture
  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
  ctx.lineWidth = 2.8;
  const rootX = 60;
  const rootY = size * 0.52;

  const branchAngles = [
    -0.88, -0.68, -0.48, -0.28, -0.08, 0.12, 0.32, 0.52, 0.72, 0.92
  ];

  for (const ang of branchAngles) {
    ctx.beginPath();
    ctx.moveTo(rootX, rootY);
    const len = size * 0.88;
    const cp1x = rootX + Math.cos(ang) * (len * 0.45);
    const cp1y = rootY + Math.sin(ang) * (len * 0.45);
    const endX = rootX + Math.cos(ang) * len;
    const endY = rootY + Math.sin(ang) * len;
    ctx.quadraticCurveTo(cp1x, cp1y, endX, endY);
    ctx.stroke();

    // Secondary Capillary Veins
    for (let s = 1; s <= 4; s++) {
      const sx = rootX + (endX - rootX) * (s / 5);
      const sy = rootY + (endY - rootY) * (s / 5);
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx + 36 * Math.cos(ang + 0.55), sy + 36 * Math.sin(ang + 0.55));
      ctx.strokeStyle = "rgba(210, 235, 255, 0.45)";
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }
  }

  // Margin Luminous Spots
  for (let i = 0; i < 45; i++) {
    const angle = -0.9 + (i / 45) * 1.95;
    const r = size * 0.9 + (Math.random() - 0.5) * 32;
    const px = rootX + Math.cos(angle) * r;
    const py = rootY + Math.sin(angle) * r;
    ctx.beginPath();
    ctx.arc(px, py, 4 + Math.random() * 5.5, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
    ctx.fill();
  }

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/** Wing shape polygon for procedural mesh generation */
function createButterflyWingShape(): THREE.Shape {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);

  // Upper Forewing outward sweep
  shape.bezierCurveTo(0.12, 0.35, 0.45, 1.15, 1.35, 1.42);
  shape.bezierCurveTo(1.62, 1.3, 1.55, 0.75, 1.18, 0.28);

  // Middle notch between forewing and hindwing
  shape.bezierCurveTo(1.02, 0.12, 0.92, 0.04, 0.88, 0);

  // Lower Hindwing graceful curve
  shape.bezierCurveTo(1.18, -0.26, 1.08, -0.88, 0.68, -1.08);
  shape.bezierCurveTo(0.35, -0.98, 0.15, -0.5, 0, 0);

  return shape;
}

/** The centerpiece 3D Animated Cybernetic Butterfly */
function InteractiveButterfly({ lite }: { lite: boolean }) {
  const butterflyRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Group>(null);
  const rightWingRef = useRef<THREE.Group>(null);
  const [wingTexture, setWingTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    const tex = createButterflyWingTexture();
    setWingTexture(tex);
    return () => {
      tex?.dispose();
    };
  }, []);

  const wingShape = useMemo(() => createButterflyWingShape(), []);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const flapSpeed = 10;
    // Graceful flutter animation
    const flap = Math.sin(t * flapSpeed) * 0.72;
    const pitch = Math.cos(t * flapSpeed) * 0.14;

    if (leftWingRef.current) {
      leftWingRef.current.rotation.y = flap;
      leftWingRef.current.rotation.z = pitch;
    }
    if (rightWingRef.current) {
      rightWingRef.current.rotation.y = -flap;
      rightWingRef.current.rotation.z = -pitch;
    }

    if (butterflyRef.current) {
      // Natural floating bobbing & drift
      butterflyRef.current.position.y = Math.sin(t * 2.4) * 0.09;
      butterflyRef.current.position.z = Math.cos(t * 1.8) * 0.08;

      const px = lite ? 0 : state.pointer.x;
      const py = lite ? 0 : state.pointer.y;

      // Smooth pointer tracking and organic banking
      butterflyRef.current.rotation.y = THREE.MathUtils.damp(butterflyRef.current.rotation.y, px * 0.65, 3.5, dt);
      butterflyRef.current.rotation.x = THREE.MathUtils.damp(butterflyRef.current.rotation.x, -py * 0.45, 3.5, dt);
      butterflyRef.current.rotation.z = THREE.MathUtils.damp(butterflyRef.current.rotation.z, -px * 0.25, 3.5, dt);
    }
  });

  return (
    <group ref={butterflyRef} scale={1.22} rotation={[0.15, 0, 0]}>
      {/* Central Cybernetic Body */}
      <group>
        {/* Head */}
        <mesh position={[0, 0.38, 0.02]}>
          <sphereGeometry args={[0.075, 20, 20]} />
          <meshPhysicalMaterial color="#0b1124" roughness={0.15} metalness={0.8} clearcoat={1} />
        </mesh>

        {/* Glowing Optical Eyes */}
        <mesh position={[-0.045, 0.4, 0.06]}>
          <sphereGeometry args={[0.024, 12, 12]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <mesh position={[0.045, 0.4, 0.06]}>
          <sphereGeometry args={[0.024, 12, 12]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>

        {/* Antennae */}
        <group position={[0, 0.43, 0.03]}>
          <mesh position={[-0.07, 0.16, 0.04]} rotation={[0.2, -0.4, -0.4]}>
            <cylinderGeometry args={[0.006, 0.008, 0.32, 8]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[-0.13, 0.3, 0.09]}>
            <sphereGeometry args={[0.016, 10, 10]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>

          <mesh position={[0.07, 0.16, 0.04]} rotation={[0.2, 0.4, 0.4]}>
            <cylinderGeometry args={[0.006, 0.008, 0.32, 8]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0.13, 0.3, 0.09]}>
            <sphereGeometry args={[0.016, 10, 10]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>

        {/* Thorax */}
        <mesh position={[0, 0.13, 0]}>
          <cylinderGeometry args={[0.075, 0.09, 0.38, 16]} />
          <meshPhysicalMaterial color="#0f172a" roughness={0.2} metalness={0.85} clearcoat={1} />
        </mesh>

        {/* Abdomen (Tapered) */}
        <mesh position={[0, -0.32, -0.02]} rotation={[-0.1, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.02, 0.58, 16]} />
          <meshPhysicalMaterial color="#1e293b" roughness={0.25} metalness={0.7} clearcoat={0.9} />
        </mesh>
      </group>

      {/* Left Wing Group (Flaps from Root X = -0.04) */}
      <group ref={leftWingRef} position={[-0.04, 0.08, 0]}>
        <mesh position={[-0.01, 0, 0]} rotation={[0, 0, 0]}>
          <shapeGeometry args={[wingShape]} />
          <meshPhysicalMaterial
            map={wingTexture ?? undefined}
            color="#ffffff"
            roughness={0.15}
            metalness={0.25}
            transmission={0.65}
            thickness={0.12}
            ior={1.46}
            clearcoat={1}
            clearcoatRoughness={0.1}
            emissive={ACCENT}
            emissiveIntensity={0.28}
            side={THREE.DoubleSide}
            transparent
            opacity={0.96}
          />
        </mesh>
      </group>

      {/* Right Wing Group (Mirrored on X) */}
      <group ref={rightWingRef} position={[0.04, 0.08, 0]}>
        <group scale={[-1, 1, 1]}>
          <mesh position={[-0.01, 0, 0]} rotation={[0, 0, 0]}>
            <shapeGeometry args={[wingShape]} />
            <meshPhysicalMaterial
              map={wingTexture ?? undefined}
              color="#ffffff"
              roughness={0.15}
              metalness={0.25}
              transmission={0.65}
              thickness={0.12}
              ior={1.46}
              clearcoat={1}
              clearcoatRoughness={0.1}
              emissive={ACCENT}
              emissiveIntensity={0.28}
              side={THREE.DoubleSide}
              transparent
              opacity={0.96}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
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

/** Complete Rich 3D Composition with Butterfly, Glass Panels, UI Slabs & Holographic Gyro Brackets. */
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

        {/* Layer 5: The Interactive 3D Cyber Butterfly Centerpiece */}
        <Layer depth={4.5}>
          <group position={[0.88, 0.08, 0]}>
            <InteractiveButterfly lite={lite} />
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
