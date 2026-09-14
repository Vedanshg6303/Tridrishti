import React from 'react';
import { GraduationCap, Award, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { EDUCATION, CERTIFICATIONS } from '../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/25 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education & Verified Certifications
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Formal foundations in Computer Science, Cybersecurity protocols, and verified technical credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Education Timeline (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <span>Formal Education</span>
            </h3>

            <div className="space-y-4">
              {EDUCATION.map((edu, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl glass-card border border-slate-800/80 hover:border-cyan-500/40 transition-all space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono text-cyan-400 font-semibold px-2.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                      {edu.period}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {edu.score}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white">
                      {edu.degree}
                    </h4>
                    {edu.field && (
                      <p className="text-xs sm:text-sm text-cyan-300/90 font-medium">
                        {edu.field}
                      </p>
                    )}
                    <p className="text-xs text-slate-400 mt-1">
                      {edu.institution} • {edu.location}
                    </p>
                  </div>

                  {edu.highlights && (
                    <ul className="space-y-1.5 pt-2 border-t border-slate-800/60">
                      {edu.highlights.map((item, hIdx) => (
                        <li key={hIdx} className="text-xs text-slate-300 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Box (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              <span>Verified Certifications</span>
            </h3>

            <div className="space-y-4">
              {CERTIFICATIONS.map((cert, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl glass-card border border-purple-500/25 hover:border-purple-500/45 transition-all space-y-3"
                >
                  <div className="flex items-center gap-2 text-purple-400 text-xs font-mono font-semibold">
                    <Sparkles className="w-4 h-4" />
                    <span>{cert.issuer}</span>
                  </div>

                  <h4 className="text-base font-bold text-white">
                    {cert.name}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {cert.description}
                  </p>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-emerald-400">
                    <span>STATUS: VERIFIED</span>
                    <span>CREDENTIAL CONFIRMED</span>
                  </div>
                </div>
              ))}

              {/* Leadership Callout */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-purple-950/40 border border-cyan-500/30 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 uppercase">
                  <span>Leadership Milestone</span>
                </div>
                <h4 className="text-base font-bold text-white">
                  Event Coordinator @ PSIT Vyomnauts
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Directed cross-functional logistics, technical challenges, and live team collaboration for university-level hackathons and robotics exhibitions.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
