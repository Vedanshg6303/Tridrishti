import React from 'react';
import { 
  Code2, 
  Layout, 
  Server, 
  Database, 
  ShieldCheck, 
  Wrench,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-5 h-5" />;
      case 'Layout': return <Layout className="w-5 h-5" />;
      case 'Server': return <Server className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Wrench': return <Wrench className="w-5 h-5" />;
      default: return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <section id="skills" className="py-20 relative bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/25 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Competencies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive Skills & Modern Tooling Matrix
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            From foundational C++/Java algorithms and Python security layers to modern React, Node, and MongoDB production stacks.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl glass-card glass-card-hover space-y-5 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header with Icon */}
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800/80">
                  <div
                    className="p-2.5 rounded-xl border"
                    style={{
                      backgroundColor: `${category.accentColor}15`,
                      borderColor: `${category.accentColor}35`,
                      color: category.accentColor,
                    }}
                  >
                    {getIcon(category.icon)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">
                      {category.title}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-300">
                      {category.skills.length} core competencies
                    </span>
                  </div>
                </div>

                {/* Skills Chips Grid */}
                <div className="pt-4 flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="group/skill flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-cyan-500/30 text-xs text-slate-200 transition-all"
                    >
                      <span className="font-medium text-slate-100">{skill.name}</span>
                      <span className="text-[10px] font-mono text-cyan-400/80 px-1.5 py-0.5 rounded bg-cyan-500/10">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Micro-tag */}
              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-300">
                <span>VERIFIED</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Production-Ready
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
