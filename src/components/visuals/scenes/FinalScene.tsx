"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const FRAMES = 7;
const ACCENT = "#3A64F0";
const ACCENT_CYAN = "#38BDF8";
const ACCENT_LIGHT = "#9FB2EE";

function InteractiveCube({ lite }: { lite: boolean }) {
  const outerCubeRef = useRef<THREE.Group>(null);
  const innerCoreRef = useRef<THREE.Group>(null);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const px = lite ? 0 : state.pointer.x;
    const py = lite ? 0 : state.pointer.y;

    if (outerCubeRef.current) {
      const targetRotY = t * 0.45 + px * 0.8;
      const targetRotX = t * 0.35 - py * 0.7;
      const targetRotZ = Math.sin(t * 0.5) * 0.2;

      outerCubeRef.current.rotation.y = THREE.MathUtils.damp(outerCubeRef.current.rotation.y, targetRotY, 3, dt);
      outerCubeRef.current.rotation.x = THREE.MathUtils.damp(outerCubeRef.current.rotation.x, targetRotX, 3, dt);
      outerCubeRef.current.rotation.z = THREE.MathUtils.damp(outerCubeRef.current.rotation.z, targetRotZ, 2.5, dt);
      outerCubeRef.current.position.y = Math.sin(t * 2) * 0.08;
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y = -t * 0.85;
      innerCoreRef.current.rotation.x = -t * 0.65;
    }
  });

  return (
    <group ref={outerCubeRef} scale={1.15}>
      {/* Outer Frosted Crystal Glass Box */}
      <RoundedBox args={[1.4, 1.4, 1.4]} radius={0.12} smoothness={4}>
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.08}
          metalness={0.15}
          transmission={0.88}
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
      {[-0.7, 0.7].map((x) =>
        [-0.7, 0.7].map((y) =>
          [-0.7, 0.7].map((z) => (
            <mesh key={`${x}-${y}-${z}`} position={[x, y, z]}>
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshStandardMaterial color="#ffffff" emissive={ACCENT_CYAN} emissiveIntensity={1.6} roughness={0.1} metalness={0.9} />
            </mesh>
          ))
        )
      )}

      {/* Inner Counter-Rotating Tesseract Core */}
      <group ref={innerCoreRef}>
        <RoundedBox args={[0.7, 0.7, 0.7]} radius={0.08} smoothness={3}>
          <meshStandardMaterial
            color="#0a1a4a"
            roughness={0.2}
            metalness={0.8}
            emissive={ACCENT}
            emissiveIntensity={0.85}
          />
          <Edges threshold={15} color="#60a5fa" />
        </RoundedBox>

        <mesh>
          <sphereGeometry args={[0.2, 20, 20]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </group>
    </group>
  );
}

/** Nested browser-window frames receding into depth: the brand mark as a portal. */
function Portal({ lite }: { lite: boolean }) {
  const g = useRef<THREE.Group>(null);
  useFrame((state, dt) => {
    if (!g.current) return;
    const px = lite ? 0 : state.pointer.x;
    const py = lite ? 0 : state.pointer.y;
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, -0.28 + px * 0.25, 2, dt);
    g.current.rotation.x = THREE.MathUtils.damp(g.current.rotation.x, 0.1 - py * 0.15, 2, dt);
  });
  return (
    <group ref={g}>
      {Array.from({ length: FRAMES }).map((_, i) => {
        const k = i / (FRAMES - 1);
        return (
          <RoundedBox
            key={i}
            args={[5.2 - i * 0.55, 3.3 - i * 0.35, 0.02]}
            radius={0.1}
            smoothness={2}
            position={[0, 0, -i * 0.55 + 1.6]}
          >
            <meshBasicMaterial transparent opacity={0.03} color="#5E8BFF" />
            <Edges threshold={20} color={new THREE.Color("#c9d4f7").lerp(new THREE.Color("#3A64F0"), 1 - k)} />
          </RoundedBox>
        );
      })}

      {/* Floating Centerpiece 3D Crystal Cube */}
      <group position={[0, 0, 0.6]}>
        <InteractiveCube lite={lite} />
      </group>
    </group>
  );
}

export default function FinalScene({ lite, active }: { lite: boolean; active: boolean }) {
  return (
    <Canvas
      dpr={lite ? [1, 1.25] : [1, 1.5]}
      camera={{ position: [0, 0, 8.8], fov: 34 }}
      gl={{ antialias: !lite, alpha: true }}
      frameloop={active ? "always" : "demand"}
      aria-hidden="true"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <directionalLight position={[-3, -2, 3]} intensity={1.2} color="#93c5fd" />
      <pointLight position={[0, 0, 3]} intensity={10} color="#38bdf8" />
      <Portal lite={lite} />
    </Canvas>
  );
}
