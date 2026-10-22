import React, { useEffect, useRef } from 'react';
import { ambientSynth } from './UrbikAudioEngine';

export type VisualPreset = 'particles' | 'waves' | 'warp';

interface UrbikCanvasProps {
  preset: VisualPreset;
}

export const UrbikCanvas: React.FC<UrbikCanvasProps> = ({ preset }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; radius: number }>({ x: -1000, y: -1000, radius: 150 });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initElements();
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Particles system
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      baseAlpha: number;
    }> = [];

    // Warp stars
    let stars: Array<{
      x: number;
      y: number;
      z: number;
      pz: number;
    }> = [];

    const initElements = () => {
      // 1. Constellation particles
      const count = Math.min(Math.floor((width * height) / 9000), 120);
      particles = [];
      const colors = ['#d3ff3f', '#6b3fff', '#f1f1ec', '#9d9f9b'];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          size: Math.random() * 2.2 + 0.8,
          color: colors[Math.floor(Math.random() * colors.length)],
          baseAlpha: Math.random() * 0.6 + 0.3,
        });
      }

      // 2. Warp stars
      stars = [];
      const starCount = 350;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: (Math.random() - 0.5) * width * 2,
          y: (Math.random() - 0.5) * height * 2,
          z: Math.random() * width,
          pz: Math.random() * width,
        });
      }
    };

    initElements();

    let waveTime = 0;

    const render = () => {
      // Audio boost
      let audioBoost = 1;
      if (ambientSynth.getStatus()) {
        const freqData = ambientSynth.getFrequencyData();
        const avg = freqData.slice(0, 10).reduce((a, b) => a + b, 0) / 10;
        audioBoost = 1 + (avg / 255) * 0.8;
      }

      ctx.clearRect(0, 0, width, height);

      if (preset === 'particles') {
        // PRESET 1: CONSTELLATION & PARTICLE MESH
        const mouse = mouseRef.current;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx * audioBoost;
          p.y += p.vy * audioBoost;

          // Bounce walls
          if (p.x < 0) p.x = width;
          else if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          else if (p.y > height) p.y = 0;

          // Mouse repulsion
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= (dx / dist) * force * 4;
            p.y -= (dy / dist) * force * 4;
          }

          // Draw node
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (audioBoost > 1.2 ? 1.4 : 1), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.baseAlpha;
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Connect neighbours
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const pDx = p.x - p2.x;
            const pDy = p.y - p2.y;
            const pDist = Math.sqrt(pDx * pDx + pDy * pDy);
            const maxDist = 130;
            if (pDist < maxDist) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = p.color === '#d3ff3f' ? '#d3ff3f' : '#6b3fff';
              ctx.globalAlpha = (1 - pDist / maxDist) * 0.28 * audioBoost;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
        ctx.globalAlpha = 1;
      } else if (preset === 'waves') {
        // PRESET 2: CYBER MATRIX & DIGITAL WAVES
        waveTime += 0.015 * audioBoost;
        const rows = 18;
        const spacingY = height / rows;

        for (let r = 0; r < rows; r++) {
          const yBase = r * spacingY;
          ctx.beginPath();
          for (let x = 0; x <= width; x += 15) {
            const angle1 = (x * 0.005) + waveTime + (r * 0.2);
            const angle2 = (x * 0.01) - (waveTime * 0.5);
            const mDist = Math.hypot(x - mouseRef.current.x, yBase - mouseRef.current.y);
            const mEffect = mDist < 160 ? Math.sin((160 - mDist) / 25) * 30 : 0;
            const waveY = yBase + Math.sin(angle1) * 25 * audioBoost + Math.cos(angle2) * 15 + mEffect;

            if (x === 0) ctx.moveTo(x, waveY);
            else ctx.lineTo(x, waveY);
          }
          ctx.strokeStyle = r % 2 === 0 ? 'rgba(211, 255, 63, 0.25)' : 'rgba(107, 63, 255, 0.22)';
          ctx.lineWidth = 1.2;
          ctx.shadowBlur = 8;
          ctx.shadowColor = r % 2 === 0 ? '#d3ff3f' : '#6b3fff';
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      } else if (preset === 'warp') {
        // PRESET 3: HYPERSPACE SPEED WARP
        const speed = 12 * audioBoost;
        const cx = width / 2;
        const cy = height / 2;

        for (let i = 0; i < stars.length; i++) {
          const star = stars[i];
          star.pz = star.z;
          star.z -= speed;

          if (star.z <= 0) {
            star.z = width;
            star.pz = width;
            star.x = (Math.random() - 0.5) * width * 2;
            star.y = (Math.random() - 0.5) * height * 2;
          }

          const k = 250 / star.z;
          const px = star.x * k + cx;
          const py = star.y * k + cy;

          const pk = 250 / star.pz;
          const prevX = star.x * pk + cx;
          const prevY = star.y * pk + cy;

          if (px >= 0 && px <= width && py >= 0 && py <= height) {
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(px, py);
            ctx.strokeStyle = i % 3 === 0 ? '#d3ff3f' : i % 3 === 1 ? '#6b3fff' : '#ffffff';
            ctx.globalAlpha = Math.min(1, (1 - star.z / width) * 1.5);
            ctx.lineWidth = Math.max(0.6, (1 - star.z / width) * 2.5);
            ctx.stroke();
          }
        }
        ctx.globalAlpha = 1;
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [preset]);

  return (
    <div id="canvas-container">
      <canvas ref={canvasRef} />
      <div className="canvas-vignette" />
      <div className="canvas-scanlines" />
    </div>
  );
};
