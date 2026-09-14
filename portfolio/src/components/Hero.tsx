import React from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail, Shield, Terminal, Sparkles, CheckCircle2, Code2 } from 'lucide-react';
import { PERSONAL_INFO, METRICS } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Dynamic Background Glows & Grids */}
      <div className="absolute inset-0 bg-grid-cyber pointer-events-none opacity-60" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-48 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs (7 cols) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-xs font-medium text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Open to Software Roles & Internships (2026–2027)</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Hi, I'm{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">
                  Vedansh Gupta
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-slate-300 flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span>Full-Stack Developer</span>
                <span className="text-cyan-400">•</span>
                <span className="text-cyan-300">Cybersecurity Specialist</span>
              </p>
            </div>

            {/* Bio Description */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Computer Science undergraduate at <strong className="text-white">PSIT Kanpur</strong> specializing in Cybersecurity. Experienced in engineering production-grade full-stack web applications, biometric authentication systems, and atomic transactional ledgers.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all"
              >
                <Code2 className="w-4 h-4" />
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResume}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-semibold text-sm border border-slate-700 hover:border-cyan-500/50 hover:text-cyan-300 shadow-md hover:-translate-y-0.5 transition-all"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>View Full Resume</span>
              </button>
            </div>

            {/* Social & Contact Strip */}
            <div className="flex items-center justify-center lg:justify-start gap-5 pt-4 text-slate-400">
              <span className="text-xs uppercase tracking-wider font-mono text-slate-300">Connect:</span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
                title="Email Me"
              >
                <Mail className="w-4 h-4" />
              </a>
              <span className="text-xs font-mono text-slate-300 border-l border-slate-800 pl-4">
                Kanpur, India
              </span>
            </div>
          </div>

          {/* Right Column: Profile Picture with Glowing Rings & Badges (5 cols) */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-72 sm:w-84 md:w-96 aspect-square flex items-center justify-center">
              
              {/* Outer Glowing Spinning Orbit */}
              <div className="absolute inset-0 rounded-full border border-cyan-500/20 border-dashed animate-spin-slow pointer-events-none" />
              
              {/* Radial Glow Halo */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-cyan-500/25 via-blue-600/20 to-purple-600/25 blur-2xl pointer-events-none" />

              {/* Middle Neon Ring */}
              <div className="absolute inset-2 rounded-full p-[3px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_30px_rgba(0,240,255,0.3)]">
                {/* Photo Container */}
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 p-1">
                  <img
                    src="/vedansh.png"
                    alt="Vedansh Gupta - Full-Stack Developer & Cybersecurity Specialist"
                    className="w-full h-full object-cover object-center rounded-full hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Floating Tech Badges */}
              <div className="absolute -bottom-3 -left-3 sm:-left-6 px-3.5 py-2 rounded-xl bg-slate-900/95 border border-cyan-500/40 backdrop-blur-md shadow-xl flex items-center gap-2 text-xs font-semibold text-white animate-float">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>Cybersecurity Specialist</span>
              </div>

              <div className="absolute -top-3 -right-3 sm:-right-6 px-3.5 py-2 rounded-xl bg-slate-900/95 border border-purple-500/40 backdrop-blur-md shadow-xl flex items-center gap-2 text-xs font-semibold text-white">
                <Terminal className="w-4 h-4 text-purple-400" />
                <span>Full-Stack Engineer</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Metrics Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {METRICS.map((metric, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl glass-card glass-card-hover text-center sm:text-left"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-200">
                {metric.value}
              </div>
              <div className="text-sm font-semibold text-white mt-1">
                {metric.label}
              </div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">
                {metric.sub}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
