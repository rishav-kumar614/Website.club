"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const FRAMES = 7;

/** Nested browser-window frames receding into depth: the brand mark as a portal. */
function Portal({ lite }: { lite: boolean }) {
  const g = useRef<THREE.Group>(null);
  useFrame((state, dt) => {
    if (!g.current) return;
    const px = lite ? 0 : state.pointer.x;
    const py = lite ? 0 : state.pointer.y;
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, -0.35 + px * 0.3, 2, dt);
    g.current.rotation.x = THREE.MathUtils.damp(g.current.rotation.x, 0.12 - py * 0.18, 2, dt);
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
    </group>
  );
}

export default function FinalScene({ lite, active }: { lite: boolean; active: boolean }) {
  return (
    <Canvas
      dpr={lite ? [1, 1.25] : [1, 1.5]}
      camera={{ position: [0, 0, 9], fov: 34 }}
      gl={{ antialias: !lite, alpha: true }}
      frameloop={active ? "always" : "demand"}
      aria-hidden="true"
    >
      <Portal lite={lite} />
    </Canvas>
  );
}
