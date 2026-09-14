import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart, Shield } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#06090F] py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo & Copyright */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-cyan-400 text-sm">
              VG
            </div>
            <div>
              <div className="text-sm font-bold text-white">Vedansh Gupta</div>
              <div className="text-xs text-slate-300 font-mono">
                Full-Stack Developer &bull; Cybersecurity Specialist
              </div>
            </div>
          </div>

          {/* Socials Strip */}
          <div className="flex items-center gap-4 text-slate-400">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500 hover:text-cyan-400 transition-all"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500 hover:text-cyan-400 transition-all"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500 hover:text-cyan-400 transition-all"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-all"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-mono gap-2 text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} Vedansh Gupta. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Shield className="w-3 h-3 text-cyan-400" />
            <span>Built with React 18, Vite, TypeScript & Tailwind CSS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
