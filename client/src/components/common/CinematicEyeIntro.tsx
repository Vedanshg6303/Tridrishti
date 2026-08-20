import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface Props {
  onComplete?: () => void;
}

export const CinematicEyeIntro: React.FC<Props> = ({ onComplete }) => {
  const [stage, setStage] = useState<'closed' | 'opening' | 'open' | 'reveal_text' | 'completed'>('closed');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user already saw intro in current session (optional - or allow replay)
    const hasSeen = sessionStorage.getItem('tridrishti_intro_seen');
    
    // Timeline sequence
    // 0ms: Closed with ambient pulse
    // 600ms: Eyelids start opening & iris glows
    const t1 = setTimeout(() => setStage('opening'), 400);
    // 1600ms: Eye fully open, pupil dilates, light bursts
    const t2 = setTimeout(() => setStage('open'), 1300);
    // 2400ms: Brand text TRIDRISHTI reveals
    const t3 = setTimeout(() => setStage('reveal_text'), 2100);
    // 3800ms: Fade out intro
    const t4 = setTimeout(() => {
      setStage('completed');
      setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem('tridrishti_intro_seen', 'true');
        if (onComplete) onComplete();
      }, 700);
    }, 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsVisible(false);
    sessionStorage.setItem('tridrishti_intro_seen', 'true');
    if (onComplete) onComplete();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[100] bg-[#02040a] flex flex-col items-center justify-center overflow-hidden select-none"
      >
        {/* Ambient background energy nebula */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              scale: stage === 'open' || stage === 'reveal_text' ? [1, 1.4, 1.2] : 1,
              opacity: stage === 'closed' ? 0.3 : 0.8,
            }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-radial from-brand-600/30 via-cyan-500/10 to-transparent blur-3xl pointer-events-none"
          />
          {/* Subtle grid rays */}
          <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
        </div>

        {/* Center Container */}
        <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center max-w-lg">
          {/* Animated SVG Eye Logo Representation */}
          <div className="relative w-72 h-44 sm:w-96 sm:h-56 flex items-center justify-center">
            {/* Pulsing Backlight Shockwave */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={
                stage === 'open' || stage === 'reveal_text'
                  ? { scale: [0.8, 1.5, 1.2], opacity: [0, 0.9, 0.4] }
                  : { scale: 0.6, opacity: 0 }
              }
              transition={{ duration: 1.2 }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-500/40 via-cyan-400/50 to-blue-600/40 blur-2xl -z-10"
            />

            {/* Custom Interactive SVG Eye Matching User's Logo */}
            <svg
              viewBox="0 0 400 220"
              className="w-full h-full filter drop-shadow-[0_0_25px_rgba(14,165,233,0.5)]"
            >
              <defs>
                {/* Iris Outer Gradient */}
                <linearGradient id="eyeLidGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="40%" stopColor="#38bdf8" />
                  <stop offset="70%" stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="#0369a1" />
                </linearGradient>

                {/* Iris Gradient */}
                <radialGradient id="irisGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#7dd3fc" />
                  <stop offset="45%" stopColor="#0ea5e9" />
                  <stop offset="80%" stopColor="#0369a1" />
                  <stop offset="100%" stopColor="#082f49" />
                </radialGradient>

                {/* Clip Path for Eyelids (Opens from horizontal slit to full almond eye) */}
                <clipPath id="eyeClip">
                  <motion.path
                    initial={{
                      d: 'M 30 110 Q 200 108 370 110 Q 200 112 30 110 Z',
                    }}
                    animate={{
                      d:
                        stage === 'closed'
                          ? 'M 30 110 Q 200 108 370 110 Q 200 112 30 110 Z'
                          : stage === 'opening'
                          ? 'M 30 110 Q 200 45 370 110 Q 200 175 30 110 Z'
                          : 'M 30 110 Q 200 10 370 110 Q 200 210 30 110 Z', // Fully Open Eye
                    }}
                    transition={{
                      duration: 0.9,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                </clipPath>
              </defs>

              {/* Eye Interior (Behind Eyelids) */}
              <g clipPath="url(#eyeClip)">
                {/* Sclera / Background Inside Eye */}
                <rect x="0" y="0" width="400" height="220" fill="#030816" />

                {/* Sclera Cyan Ambient Radiance */}
                <circle cx="200" cy="110" r="100" fill="url(#eyeLidGradient)" opacity="0.15" />

                {/* Iris Outer Ring */}
                <motion.circle
                  cx="200"
                  cy="110"
                  r="62"
                  fill="url(#irisGrad)"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  initial={{ scale: 0.7 }}
                  animate={
                    stage === 'open' || stage === 'reveal_text'
                      ? { scale: [0.7, 1.05, 1] }
                      : { scale: 0.7 }
                  }
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />

                {/* Deep Pupil */}
                <motion.circle
                  cx="200"
                  cy="110"
                  fill="#010612"
                  initial={{ r: 18 }}
                  animate={
                    stage === 'open' || stage === 'reveal_text'
                      ? { r: [18, 30, 24] }
                      : { r: 18 }
                  }
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                />

                {/* Primary Gleaming White Reflection Light (Top Right) */}
                <motion.circle
                  cx="228"
                  cy="88"
                  r="15"
                  fill="#ffffff"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    stage === 'open' || stage === 'reveal_text'
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0 }
                  }
                  transition={{ delay: 0.3, duration: 0.4 }}
                />

                {/* Secondary Gleaming Highlight (Bottom Left) */}
                <motion.circle
                  cx="180"
                  cy="135"
                  r="7"
                  fill="#ffffff"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    stage === 'open' || stage === 'reveal_text'
                      ? { opacity: 0.9, scale: 1 }
                      : { opacity: 0, scale: 0 }
                  }
                  transition={{ delay: 0.4, duration: 0.4 }}
                />

                {/* Inner Iris Radial Streaks */}
                <motion.g
                  initial={{ opacity: 0, rotate: 0 }}
                  animate={
                    stage === 'open' || stage === 'reveal_text'
                      ? { opacity: 0.6, rotate: 45 }
                      : { opacity: 0 }
                  }
                  transition={{ duration: 2, ease: 'linear' }}
                  style={{ transformOrigin: '200px 110px' }}
                >
                  <circle cx="200" cy="110" r="45" fill="none" stroke="#67e8f9" strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
                </motion.g>
              </g>

              {/* Upper Eyelid Arch Shape */}
              <motion.path
                initial={{
                  d: 'M 20 110 Q 200 108 380 110',
                }}
                animate={{
                  d:
                    stage === 'closed'
                      ? 'M 20 110 Q 200 108 380 110'
                      : stage === 'opening'
                      ? 'M 20 110 Q 200 40 380 110'
                      : 'M 20 110 Q 200 5 380 110', // Upper Arch
                }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                fill="none"
                stroke="url(#eyeLidGradient)"
                strokeWidth="14"
                strokeLinecap="round"
              />

              {/* Lower Eyelid Arch Shape */}
              <motion.path
                initial={{
                  d: 'M 20 110 Q 200 112 380 110',
                }}
                animate={{
                  d:
                    stage === 'closed'
                      ? 'M 20 110 Q 200 112 380 110'
                      : stage === 'opening'
                      ? 'M 20 110 Q 200 180 380 110'
                      : 'M 20 110 Q 200 215 380 110', // Lower Arch
                }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                fill="none"
                stroke="url(#eyeLidGradient)"
                strokeWidth="14"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Bold Brand Name TRIDRISHTI Revealing */}
          <motion.div
            initial={{ opacity: 0, y: 25, letterSpacing: '0.1em' }}
            animate={
              stage === 'reveal_text' || stage === 'completed'
                ? { opacity: 1, y: 0, letterSpacing: '0.25em' }
                : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 space-y-2"
          >
            <h1 className="text-4xl sm:text-5xl font-display font-black text-white tracking-[0.25em] drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
              TRIDRISHTI
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={stage === 'reveal_text' || stage === 'completed' ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xs sm:text-sm font-semibold tracking-widest text-cyan-400 uppercase flex items-center justify-center gap-2"
            >
              <span>Connect</span>
              <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
              <span>Grow</span>
              <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
              <span>Empower</span>
            </motion.p>
          </motion.div>
        </div>

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="absolute bottom-8 right-8 px-4 py-1.5 rounded-full bg-dark-card/60 hover:bg-dark-card border border-dark-border/80 text-[11px] text-slate-400 hover:text-white transition-all backdrop-blur-md"
        >
          Skip Intro →
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
