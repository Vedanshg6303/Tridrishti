import React from 'react';
import { ExternalLink, Github, Sparkles, Shield, Music, Layers, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/25 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5" />
            <span>Featured Engineering Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Key Software & Security Projects
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Architected with modern paradigms, verified security protocols, and production-tested performance.
          </p>
        </div>

        {/* Projects Cards List */}
        <div className="space-y-10">
          {PROJECTS.map((project, index) => {
            const isTridrishti = project.id === 'tridrishti';

            return (
              <div
                key={project.id}
                className={`p-7 sm:p-9 rounded-3xl glass-card border transition-all duration-300 ${
                  isTridrishti
                    ? 'border-cyan-500/40 bg-gradient-to-br from-[#0D1321] via-[#0A0F1A] to-[#0D1629] shadow-[0_15px_40px_-15px_rgba(0,240,255,0.15)]'
                    : 'border-slate-800/90 hover:border-cyan-500/30'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Project Details (8 cols) */}
                  <div className="lg:col-span-8 space-y-5">
                    
                    {/* Badge & Period Header */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                          project.badgeColor === 'cyan'
                            ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                            : project.badgeColor === 'violet'
                            ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                            : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        {project.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {project.period}
                      </span>
                      <span className="text-xs font-mono text-slate-400">•</span>
                      <span className="text-xs font-mono text-slate-300">
                        Role: {project.role}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-cyan-300/90 text-sm sm:text-base font-medium mt-1">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Engineering Highlights */}
                    <div className="space-y-2.5 pt-2">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300">
                        Key Architectural Accomplishments:
                      </h4>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="pt-3 flex flex-wrap gap-2">
                      {project.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* Right Action Box & Visuals (4 cols) */}
                  <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-5 lg:pl-4 lg:border-l lg:border-slate-800/80">
                    
                    {/* Visual Card Preview Box */}
                    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
                        <span>PROJECT_STATUS</span>
                        <span className="text-emerald-400 font-bold">ONLINE</span>
                      </div>

                      {isTridrishti ? (
                        <div className="space-y-2.5 text-xs">
                          <div className="flex justify-between text-slate-300">
                            <span>Architecture:</span>
                            <span className="font-semibold text-white">Full-Stack MERN</span>
                          </div>
                          <div className="flex justify-between text-slate-300">
                            <span>Dynamic Pages:</span>
                            <span className="font-mono text-cyan-400">40+ Routes</span>
                          </div>
                          <div className="flex justify-between text-slate-300">
                            <span>Security Engine:</span>
                            <span className="font-mono text-purple-300">JWT + RBAC</span>
                          </div>
                          <div className="flex justify-between text-slate-300">
                            <span>Live Cloud Host:</span>
                            <span className="font-mono text-slate-200">Vercel & Render</span>
                          </div>
                        </div>
                      ) : project.id === 'guardian-id' ? (
                        <div className="space-y-2.5 text-xs">
                          <div className="flex justify-between text-slate-300">
                            <span>Domain:</span>
                            <span className="font-semibold text-white">Biometric UPI</span>
                          </div>
                          <div className="flex justify-between text-slate-300">
                            <span>Security Layer:</span>
                            <span className="font-mono text-purple-400">Computer Vision</span>
                          </div>
                          <div className="flex justify-between text-slate-300">
                            <span>Threat Model:</span>
                            <span className="font-mono text-slate-200">Account Takeover</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2.5 text-xs">
                          <div className="flex justify-between text-slate-300">
                            <span>Type:</span>
                            <span className="font-semibold text-white">Streaming Web Engine</span>
                          </div>
                          <div className="flex justify-between text-slate-300">
                            <span>Audio Engine:</span>
                            <span className="font-mono text-cyan-400">HTML5 Audio API</span>
                          </div>
                          <div className="flex justify-between text-slate-300">
                            <span>Bundle Size:</span>
                            <span className="font-mono text-emerald-400">Zero Bloat</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-col gap-2.5 pt-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all"
                        >
                          <span>Open Live Website</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 hover:border-cyan-500/40 hover:text-cyan-300 transition-all"
                        >
                          <Github className="w-4 h-4 text-slate-400" />
                          <span>View GitHub Repository</span>
                        </a>
                      )}
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
