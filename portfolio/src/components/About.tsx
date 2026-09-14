import React from 'react';
import { User, Shield, Lock, Zap, Server, Globe, GraduationCap, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/25 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <User className="w-3.5 h-3.5" />
            <span>Engineering Profile</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Bridging High-Performance Web Development with Modern Cyber Defense
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            A developer who builds intuitive, real-time user experiences backed by identity-gated security architectures.
          </p>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-7 sm:p-8 rounded-2xl glass-card space-y-5">
              <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                Who I Am & What I Build
              </h3>
              
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                I am a final-year Computer Science and Engineering student at <strong className="text-cyan-300">Pranveer Singh Institute of Technology (PSIT), Kanpur</strong>, with an academic and practical specialization in <strong className="text-white">Cybersecurity</strong>. 
              </p>

              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                My engineering philosophy is rooted in the conviction that security should never be an afterthought. Whether designing a 40-page community ecosystem with atomic referral point ledgers (<strong className="text-white">Tridrishti</strong>) or architecting a multi-user biometric security framework for UPI financial transactions (<strong className="text-white">Guardian-ID</strong>), I prioritize end-to-end data integrity, defensive coding, and responsive UI elegance.
              </p>

              <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-800">
                <div className="space-y-1">
                  <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Location</span>
                  </div>
                  <div className="text-sm font-semibold text-white">Kanpur, UP, India</div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                    <span>Degree</span>
                  </div>
                  <div className="text-sm font-semibold text-white">B.Tech CSE (2023–27)</div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Focus</span>
                  </div>
                  <div className="text-sm font-semibold text-white">Full-Stack & Security</div>
                </div>
              </div>
            </div>

            {/* Core Values / Strengths Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Defensive Architecture</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Zero-trust identity validation, tokenized RESTful endpoints, and strict RBAC authorization layers.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/30 transition-all flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">High-Speed Execution</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Leveraging modern build tools (Vite), WebSockets (Socket.io), and modular TypeScript architectures.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Cards: Quick Facts & Highlights (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl glass-card space-y-4">
              <h4 className="text-base font-bold text-white flex items-center gap-2 font-mono text-cyan-400">
                <span>&gt;</span> ACADEMIC_DISCIPLINE
              </h4>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-slate-800/80">
                  <span className="text-slate-400">University</span>
                  <span className="font-semibold text-white text-right">PSIT Kanpur</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-800/80">
                  <span className="text-slate-400">Specialization</span>
                  <span className="font-semibold text-cyan-400">Cybersecurity</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-800/80">
                  <span className="text-slate-400">Graduation Year</span>
                  <span className="font-semibold text-white">2027</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-800/80">
                  <span className="text-slate-400">Cumulative CGPA</span>
                  <span className="font-mono font-bold text-emerald-400">7.40 / 10.0</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-400">Leadership Role</span>
                  <span className="font-semibold text-purple-300">PSIT Vyomnauts</span>
                </div>
              </div>
            </div>

            {/* Quick Terminal-style Quote */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-cyan-500/20 font-mono text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-1.5 text-slate-400 pb-1 border-b border-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 text-[10px] text-slate-300">vedansh@terminal ~</span>
              </div>
              <p className="text-cyan-300">
                $ echo "Seeking full-stack engineering roles where security, performance, and user delight intersect."
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
