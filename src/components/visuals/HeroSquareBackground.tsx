"use client";

import { useEffect, useRef } from "react";

interface Square {
  x: number;
  y: number;
  size: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  rot: number;
  rotSpeed: number;
  alpha: number;
  targetAlpha: number;
  color: string;
  isFilled: boolean;
}

export function HeroSquareBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let animationFrameId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Minimal count (only 22 subtle squares)
    const COUNT = 22;
    const squares: Square[] = [];
    const colors = [
      "rgba(58, 100, 240, ", // primary accent blue
      "rgba(115, 138, 255, ", // light blue
      "rgba(40, 60, 130, ",  // dark subtle blue
    ];

    for (let i = 0; i < COUNT; i++) {
      const size = 12 + Math.random() * 24; // clean small square sizes (12px to 36px)
      const x = Math.random() * (width || 1200);
      const y = Math.random() * (height || 700);

      squares.push({
        x,
        y,
        baseX: x,
        baseY: y,
        size,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35 - 0.15,
        rot: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.008,
        alpha: 0.08 + Math.random() * 0.16, // very subtle transparency
        targetAlpha: 0.08 + Math.random() * 0.16,
        color: colors[Math.floor(Math.random() * colors.length)],
        isFilled: Math.random() > 0.65, // mostly wireframe/outline squares
      });
    }

    // Mouse tracking relative to canvas
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let t = 0;

    const render = () => {
      t += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse position
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Draw subtle decorative grid marks (ambient tech aesthetic)
      ctx.save();
      ctx.strokeStyle = "rgba(10, 12, 20, 0.035)";
      ctx.lineWidth = 1;
      const gridSize = 120;
      for (let gx = gridSize; gx < width; gx += gridSize) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
        ctx.stroke();
      }
      for (let gy = gridSize; gy < height; gy += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
        ctx.stroke();
      }
      ctx.restore();

      // Draw & animate floating squares
      for (let i = 0; i < squares.length; i++) {
        const sq = squares[i];

        if (!prefersReducedMotion) {
          sq.x += sq.vx;
          sq.y += sq.vy;
          sq.rot += sq.rotSpeed;

          // Wrap edges smoothly
          if (sq.x < -sq.size) sq.x = width + sq.size;
          if (sq.x > width + sq.size) sq.x = -sq.size;
          if (sq.y < -sq.size) sq.y = height + sq.size;
          if (sq.y > height + sq.size) sq.y = -sq.size;

          // Gentle mouse push
          const dx = sq.x - mouse.x;
          const dy = sq.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140 && dist > 0) {
            const force = (1 - dist / 140) * 1.5;
            sq.x += (dx / dist) * force;
            sq.y += (dy / dist) * force;
          }
        }

        ctx.save();
        ctx.translate(sq.x, sq.y);
        ctx.rotate(sq.rot);

        const half = sq.size / 2;
        const cornerRadius = 3;

        ctx.beginPath();
        ctx.roundRect(-half, -half, sq.size, sq.size, cornerRadius);

        if (sq.isFilled) {
          ctx.fillStyle = `${sq.color}${sq.alpha * 0.6})`;
          ctx.fill();
        }

        ctx.strokeStyle = `${sq.color}${sq.alpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-square-bg"
      aria-hidden="true"
    />
  );
}
