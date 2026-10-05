"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
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

  const branchAngles = [-0.88, -0.68, -0.48, -0.28, -0.08, 0.12, 0.32, 0.52, 0.72, 0.92];

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

function createButterflyWingShape(): THREE.Shape {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.12, 0.35, 0.45, 1.15, 1.35, 1.42);
  shape.bezierCurveTo(1.62, 1.3, 1.55, 0.75, 1.18, 0.28);
  shape.bezierCurveTo(1.02, 0.12, 0.92, 0.04, 0.88, 0);
  shape.bezierCurveTo(1.18, -0.26, 1.08, -0.88, 0.68, -1.08);
  shape.bezierCurveTo(0.35, -0.98, 0.15, -0.5, 0, 0);
  return shape;
}

function ButterflyMesh({ lite }: { lite: boolean }) {
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
      butterflyRef.current.position.y = Math.sin(t * 2.4) * 0.09;
      butterflyRef.current.position.z = Math.cos(t * 1.8) * 0.08;

      const px = lite ? 0 : state.pointer.x;
      const py = lite ? 0 : state.pointer.y;

      butterflyRef.current.rotation.y = THREE.MathUtils.damp(butterflyRef.current.rotation.y, px * 0.65, 3.5, dt);
      butterflyRef.current.rotation.x = THREE.MathUtils.damp(butterflyRef.current.rotation.x, -py * 0.45, 3.5, dt);
      butterflyRef.current.rotation.z = THREE.MathUtils.damp(butterflyRef.current.rotation.z, -px * 0.25, 3.5, dt);
    }
  });

  return (
    <group ref={butterflyRef} scale={1.35} rotation={[0.15, 0, 0]}>
      {/* Central Cybernetic Body */}
      <group>
        <mesh position={[0, 0.38, 0.02]}>
          <sphereGeometry args={[0.075, 20, 20]} />
          <meshPhysicalMaterial color="#0b1124" roughness={0.15} metalness={0.8} clearcoat={1} />
        </mesh>
        <mesh position={[-0.045, 0.4, 0.06]}>
          <sphereGeometry args={[0.024, 12, 12]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <mesh position={[0.045, 0.4, 0.06]}>
          <sphereGeometry args={[0.024, 12, 12]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>

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

        <mesh position={[0, 0.13, 0]}>
          <cylinderGeometry args={[0.075, 0.09, 0.38, 16]} />
          <meshPhysicalMaterial color="#0f172a" roughness={0.2} metalness={0.85} clearcoat={1} />
        </mesh>

        <mesh position={[0, -0.32, -0.02]} rotation={[-0.1, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.02, 0.58, 16]} />
          <meshPhysicalMaterial color="#1e293b" roughness={0.25} metalness={0.7} clearcoat={0.9} />
        </mesh>
      </group>

      {/* Left Wing */}
      <group ref={leftWingRef} position={[-0.04, 0.08, 0]}>
        <mesh position={[-0.01, 0, 0]}>
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

      {/* Right Wing */}
      <group ref={rightWingRef} position={[0.04, 0.08, 0]}>
        <group scale={[-1, 1, 1]}>
          <mesh position={[-0.01, 0, 0]}>
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

function ButterflyRig({ lite }: { lite: boolean }) {
  const group = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state, dt) => {
    if (group.current) {
      const px = lite ? 0 : state.pointer.x;
      const py = lite ? 0 : state.pointer.y;
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, px * 0.4, 2.5, dt);
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -py * 0.3, 2.5, dt);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += dt * 0.2;
    }
  });

  return (
    <group ref={group}>
      {/* Orbital Gimbal Rings */}
      <group ref={ringRef}>
        <mesh>
          <torusGeometry args={[1.65, 0.014, 16, 80]} />
          <meshStandardMaterial color={ACCENT} roughness={0.2} metalness={0.7} emissive={ACCENT} emissiveIntensity={0.3} />
        </mesh>
        <mesh rotation={[0.4, 0.3, 0]}>
          <torusGeometry args={[1.9, 0.01, 16, 80]} />
          <meshStandardMaterial color={ACCENT_LIGHT} transparent opacity={0.6} />
        </mesh>
      </group>

      <ButterflyMesh lite={lite} />
    </group>
  );
}

export default function ButterflyScene({
  lite = false,
  active = true,
}: {
  lite?: boolean;
  active?: boolean;
}) {
  return (
    <Canvas
      dpr={lite ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [0, 0, 5.2], fov: 36 }}
      gl={{ antialias: !lite, alpha: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "demand"}
      aria-hidden="true"
    >
      <Environment resolution={lite ? 128 : 256} frames={1}>
        <Lightformer form="rect" intensity={5} position={[-4, 3, 3]} scale={[6, 2, 1]} />
        <Lightformer form="rect" intensity={3} color={ACCENT_GLOW} position={[4, -2, 2]} scale={[5, 3, 1]} />
      </Environment>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <directionalLight position={[-3, -2, 3]} intensity={1.2} color="#a6bbf8" />
      <pointLight position={[0, 0, 2]} intensity={8} color="#38bdf8" />
      <ButterflyRig lite={lite} />
    </Canvas>
  );
}
