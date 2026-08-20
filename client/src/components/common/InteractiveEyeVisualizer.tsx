import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Gift, HeartPulse } from 'lucide-react';

export const InteractiveEyeVisualizer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate angle and bounded distance for pupil tracking
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), 300);
      const angle = Math.atan2(deltaY, deltaX);

      // Max offset in pixels inside the eye socket
      const maxOffset = 18;
      const pupilX = Math.cos(angle) * (distance / 300) * maxOffset;
      const pupilY = Math.sin(angle) * (distance / 300) * (maxOffset * 0.6);

      setMousePos({ x: pupilX, y: pupilY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-lg mx-auto aspect-[16/10] flex items-center justify-center select-none"
    >
      {/* Outer Cyan/Sapphire Atmospheric Glow */}
      <motion.div
        animate={{
          scale: isHovered ? [1, 1.15, 1.08] : [1, 1.05, 1],
          opacity: isHovered ? 0.8 : 0.45,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-600/30 via-cyan-400/25 to-indigo-600/30 blur-3xl pointer-events-none -z-10"
      />

      {/* Floating Orbiting Feature Badges */}
      <motion.div
        animate={{ y: [-8, 8, -8], rotate: [-1, 1, -1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-4 -left-4 sm:left-0 z-20 px-3.5 py-2 rounded-2xl bg-dark-card/90 border border-brand-500/30 backdrop-blur-xl shadow-xl shadow-brand-500/10 flex items-center gap-2"
      >
        <div className="w-7 h-7 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[11px] font-bold text-white">TRI Points</div>
          <div className="text-[9px] text-slate-400">Promotional Rewards</div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [8, -8, 8], rotate: [1, -1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-4 -right-2 sm:right-2 z-20 px-3.5 py-2 rounded-2xl bg-dark-card/90 border border-cyan-500/30 backdrop-blur-xl shadow-xl shadow-cyan-500/10 flex items-center gap-2"
      >
        <div className="w-7 h-7 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
          <HeartPulse className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[11px] font-bold text-white">Healthcare Passes</div>
          <div className="text-[9px] text-emerald-400">NABL & Tele-Consult</div>
        </div>
      </motion.div>

      {/* Main SVG Interactive Eye */}
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <svg
          viewBox="0 0 400 220"
          className="w-full h-full filter drop-shadow-[0_15px_35px_rgba(2,132,199,0.35)] transition-transform duration-300 hover:scale-[1.02]"
        >
          <defs>
            <linearGradient id="interactiveLidGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="40%" stopColor="#38bdf8" />
              <stop offset="70%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>

            <radialGradient id="interactiveIrisGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="35%" stopColor="#38bdf8" />
              <stop offset="70%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#041f36" />
            </radialGradient>

            <clipPath id="interactiveEyeClip">
              <path d="M 30 110 Q 200 15 370 110 Q 200 205 30 110 Z" />
            </clipPath>
          </defs>

          {/* Eye Interior with Dynamic Pupil Tracking */}
          <g clipPath="url(#interactiveEyeClip)">
            {/* Sclera deep background */}
            <rect x="0" y="0" width="400" height="220" fill="#030818" />

            {/* Inner Sclera Ambient Radiance */}
            <circle cx="200" cy="110" r="105" fill="url(#interactiveLidGrad)" opacity="0.12" />

            {/* Dynamic Moving Iris Group (Follows Cursor) */}
            <g transform={`translate(${mousePos.x}, ${mousePos.y})`}>
              {/* Outer Iris */}
              <circle
                cx="200"
                cy="110"
                r="64"
                fill="url(#interactiveIrisGrad)"
                stroke="#38bdf8"
                strokeWidth="2.5"
              />

              {/* Iris Striae / Ring texture */}
              <circle
                cx="200"
                cy="110"
                r="46"
                fill="none"
                stroke="#e0f2fe"
                strokeWidth="1"
                strokeDasharray="2 3"
                opacity="0.5"
              />

              {/* Pupil */}
              <circle cx="200" cy="110" r="25" fill="#02050f" />

              {/* Primary Glint Light (Top-Right) */}
              <circle cx="226" cy="90" r="15" fill="#ffffff" opacity="0.95" />

              {/* Secondary Glint Highlight (Bottom-Left) */}
              <circle cx="182" cy="132" r="7" fill="#ffffff" opacity="0.85" />
            </g>
          </g>

          {/* Upper Eyelid Arch */}
          <path
            d="M 20 110 Q 200 10 380 110"
            fill="none"
            stroke="url(#interactiveLidGrad)"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Lower Eyelid Arch */}
          <path
            d="M 20 110 Q 200 210 380 110"
            fill="none"
            stroke="url(#interactiveLidGrad)"
            strokeWidth="14"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
