"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface CubeData {
  baseX: number;
  baseY: number;
  baseZ: number;
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  scale: number;
  phase: number;
  floatSpeed: number;
}

export function FloatingCubesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent background
    container.appendChild(renderer.domElement);

    // 2. Geometry & Instanced Mesh
    const COUNT = 160;
    const size = 0.42;
    const geometry = new THREE.BoxGeometry(size, size, size);

    // Material: semi-translucent glass with accent sheen
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x4f6ef7,
      emissive: 0x162045,
      emissiveIntensity: 0.3,
      roughness: 0.2,
      metalness: 0.85,
      transparent: true,
      opacity: 0.6,
      clearcoat: 0.4,
      clearcoatRoughness: 0.1,
    });

    const instancedMesh = new THREE.InstancedMesh(geometry, material, COUNT);
    instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(instancedMesh);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x4f6ef7, 30, 40);
    pointLight1.position.set(10, 12, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8ba2f5, 20, 30);
    pointLight2.position.set(-12, -8, 8);
    scene.add(pointLight2);

    // 4. Cube Instances Data
    const dummy = new THREE.Object3D();
    const cubes: CubeData[] = [];

    const colors = [
      new THREE.Color(0x4f6ef7), // Studio Accent Blue
      new THREE.Color(0x6b83f5), // Electric Blue
      new THREE.Color(0x354ea3), // Deep Indigo
      new THREE.Color(0x9cb1fc), // Ice Blue
      new THREE.Color(0x283870), // Dark Accent
    ];

    for (let i = 0; i < COUNT; i++) {
      // Spread across 3D volume
      const spreadX = 38;
      const spreadY = 28;
      const spreadZ = 24;

      const x = (Math.random() - 0.5) * spreadX;
      const y = (Math.random() - 0.5) * spreadY;
      const z = (Math.random() - 0.5) * spreadZ - 2;

      const scale = 0.5 + Math.random() * 1.3;

      cubes.push({
        baseX: x,
        baseY: y,
        baseZ: z,
        x,
        y,
        z,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        rotSpeedX: (Math.random() - 0.5) * 0.015,
        rotSpeedY: (Math.random() - 0.5) * 0.018,
        rotSpeedZ: (Math.random() - 0.5) * 0.012,
        scale,
        phase: Math.random() * Math.PI * 2,
        floatSpeed: 0.3 + Math.random() * 0.6,
      });

      // Random color variation per instance
      const selectedColor = colors[Math.floor(Math.random() * colors.length)];
      instancedMesh.setColorAt(i, selectedColor);
    }
    instancedMesh.instanceColor!.needsUpdate = true;

    // 5. Mouse & Scroll Interaction Trackers
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollY = 0;
    let targetScrollY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onScroll = () => {
      targetScrollY = window.scrollY || window.pageYOffset;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // 6. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Smooth scroll lerp
      scrollY += (targetScrollY - scrollY) * 0.06;

      // Camera parallax tilt & subtle depth
      camera.position.x = mouse.x * 2.5;
      camera.position.y = mouse.y * 2.0;
      camera.lookAt(0, 0, 0);

      // Light follows mouse softly
      pointLight1.position.x = mouse.x * 14 + 6;
      pointLight1.position.y = mouse.y * 10 + 6;

      // Update each cube instance
      for (let i = 0; i < COUNT; i++) {
        const cube = cubes[i];

        if (!prefersReducedMotion) {
          // Floating organic motion
          cube.y = cube.baseY + Math.sin(elapsedTime * cube.floatSpeed + cube.phase) * 1.0;
          cube.x = cube.baseX + Math.cos(elapsedTime * (cube.floatSpeed * 0.7) + cube.phase) * 0.7;

          // Rotation
          cube.rotX += cube.rotSpeedX;
          cube.rotY += cube.rotSpeedY;
          cube.rotZ += cube.rotSpeedZ;

          // Mouse proximity wave / interaction
          const dx = cube.x - (mouse.x * 12);
          const dy = cube.y - (mouse.y * 10);
          const dist = Math.sqrt(dx * dx + dy * dy);

          let dynamicScale = cube.scale;
          if (dist < 6) {
            const force = 1 - dist / 6;
            cube.rotY += force * 0.035;
            cube.rotX += force * 0.025;
            dynamicScale = cube.scale * (1 + force * 0.35);
          }

          dummy.position.set(cube.x, cube.y, cube.z);
          dummy.rotation.set(cube.rotX, cube.rotY, cube.rotZ);
          dummy.scale.set(dynamicScale, dynamicScale, dynamicScale);
        } else {
          dummy.position.set(cube.baseX, cube.baseY, cube.baseZ);
          dummy.rotation.set(cube.rotX, cube.rotY, cube.rotZ);
          dummy.scale.set(cube.scale, cube.scale, cube.scale);
        }

        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
      }

      instancedMesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="floating-cubes-bg"
      aria-hidden="true"
    />
  );
}
