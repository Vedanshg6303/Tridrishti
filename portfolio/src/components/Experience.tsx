import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Award } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 relative bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/25 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Professional Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Work Experience & Technical Leadership
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Track record of driving technical initiatives, UI developments, and organizing student engineering communities.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500/40 before:via-purple-500/30 before:to-transparent">
          {EXPERIENCES.map((item, index) => {
            const isWork = item.type === 'Work';

            return (
              <div
                key={index}
                className="relative flex flex-col sm:flex-row gap-6 items-start"
              >
                {/* Timeline Center Node */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center justify-center z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                </div>

                {/* Content Box */}
                <div className="w-full sm:w-[calc(50%-2rem)] ml-12 sm:ml-0 p-6 sm:p-7 rounded-2xl glass-card border border-slate-800/80 hover:border-cyan-500/40 transition-all space-y-4">
                  
                  {/* Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
                      {item.type.toUpperCase()}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      {item.period}
                    </span>
                  </div>

                  {/* Role & Company */}
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {item.role}
                    </h3>
                    <div className="text-sm font-semibold text-cyan-400 flex items-center gap-2 mt-0.5">
                      <span>{item.company}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-xs text-slate-400 font-normal flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-2 pt-1">
                    {item.description.map((desc, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5 border-t border-slate-800/60">
                    {item.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
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
