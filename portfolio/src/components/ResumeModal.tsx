import React from 'react';
import { X, Download, Printer, Copy, Check, ExternalLink, Mail, Phone, MapPin, Award, CheckCircle } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, EDUCATION, CERTIFICATIONS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `
VEDANSH GUPTA
${PERSONAL_INFO.phone} | ${PERSONAL_INFO.email} | ${PERSONAL_INFO.location}
GitHub: ${PERSONAL_INFO.github} | LinkedIn: ${PERSONAL_INFO.linkedin}

PROFESSIONAL SUMMARY
Final-year Computer Science and Engineering student specializing in Cybersecurity and Full-Stack Web Development at PSIT Kanpur. Proficient in C++, Java, Python, JavaScript, and modern web frameworks (React 18, Node.js, Express, MongoDB). Experienced in building secure web applications, biometric authentication systems, and atomic transactional ledgers.

EDUCATION
- Pranveer Singh Institute of Technology (PSIT), Kanpur, UP
  B.Tech Computer Science & Engineering (Cybersecurity) — CGPA: 7.40/10.0 (2023 – 2027)
- Spring Dales Higher Secondary School (UP Board), Kanpur, UP
  Class XII: 75.5% (2021 – 2022) | Class X: 83.5% (2019 – 2020)

TECHNICAL SKILLS
- Languages: C++, Java, Python, JavaScript (ES6+), TypeScript, HTML5, CSS3
- Frontend & Backend: React.js, Node.js, Express.js, REST APIs, MongoDB, MySQL, Socket.io, Tailwind CSS, Vite
- Core CS & Security: Data Structures & Algorithms, OOPS, DBMS, Operating Systems, Information Security, TCP/IP, Security Protocols
- Tools & Platforms: Git, GitHub, VS Code, Postman, Vercel, Render, Generative AI Tools

EXPERIENCE
- DevLaunch (IIT Kharagpur) — Tech & Management Intern (Dec 2024 – Mar 2025)
  * Spearheaded targeted outreach campaigns across student communities, accelerating technical user signups.
  * Assisted with frontend enhancements, landing page UI tasks, and technical documentation using HTML, CSS, JavaScript, and Git.
- Event Coordinator — PSIT Vyomnauts
  * Organized technical hackathons and tech exhibitions, directing cross-functional task distribution.

KEY PROJECTS
- Tridrishti: Community Empowerment & Rewards Platform (2026)
  * Engineered a full-stack networking and rewards application featuring 40+ dynamic routes, a 10-tier progression matrix, and atomic points ledger.
  * Implemented secure JWT authentication and role-based access control (RBAC).
  * Built modular RESTful APIs, real-time WebSockets, and MongoDB schemas.
  * Live Demo: https://tridrishti-api.vercel.app
- Guardian-ID: Multi-User Biometric UPI Security Framework (Feb 2026 – Present)
  * Developed an identity-gated security layer mitigating account takeover risks in shared financial platforms.
  * Integrated real-time computer vision face recognition with multi-profile fingerprint validation.
  * Designed a modular architecture providing tokenized RESTful integration across secure open-banking protocols.
- Interactive Music Web Application (Mar 2024 – Jun 2024)
  * Architected a lightweight web audio streaming engine optimized for cross-platform browser playback.
  * Implemented custom queue logic, scrub controls, and responsive playlist management using vanilla JavaScript and HTML5 Audio.

CERTIFICATIONS
- Infosys Technical Certification (HTML, CSS, Python 3)
- AI Tools Specialist (be10x)
`;
    navigator.clipboard.writeText(text.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Modal Card */}
      <div className="bg-[#0D1321] border border-cyan-500/30 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Official Curriculum Vitae</h3>
              <p className="text-xs text-slate-300 font-mono">Vedansh Gupta • Software Engineer & Cybersecurity</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono transition-all"
              title="Copy Raw Text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono transition-all"
              title="Print / Save PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all ml-1"
              title="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-slate-200 text-sm">
          
          {/* Header Strip */}
          <div className="border-b border-slate-800 pb-6 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">VEDANSH GUPTA</h1>
              <p className="text-cyan-400 font-medium text-sm mt-0.5">Full-Stack Developer & Cybersecurity Specialist</p>
            </div>

            <div className="text-xs font-mono text-slate-300 text-center sm:text-right space-y-1">
              <div className="flex items-center sm:justify-end gap-1.5">
                <Phone className="w-3.5 h-3.5 text-cyan-400" /> {PERSONAL_INFO.phone}
              </div>
              <div className="flex items-center sm:justify-end gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" /> {PERSONAL_INFO.email}
              </div>
              <div className="flex items-center sm:justify-end gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" /> {PERSONAL_INFO.location}
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Final-year Computer Science and Engineering student specializing in Cybersecurity and Full-Stack Web Development at PSIT Kanpur. Proficient in C++, Java, Python, and JavaScript, with hands-on experience building secure web applications, biometric authentication systems, and technical operations. Seeking a software engineering role or internship to apply strong technical and leadership skills.
            </p>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1">
              EDUCATION
            </h2>
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-start text-xs sm:text-sm">
                <div>
                  <div className="font-bold text-white">{edu.institution}</div>
                  <div className="text-slate-400 text-xs">{edu.degree} {edu.field && `(${edu.field})`}</div>
                </div>
                <div className="text-right font-mono text-xs">
                  <div className="text-cyan-300 font-semibold">{edu.period}</div>
                  <div className="text-emerald-400 font-bold">{edu.score}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1">
              TECHNICAL SKILLS
            </h2>
            <div className="text-xs space-y-1.5 text-slate-300 leading-relaxed">
              <div><strong className="text-white">Languages:</strong> C++, Java, Python, JavaScript, TypeScript, HTML5, CSS3</div>
              <div><strong className="text-white">Frontend & Backend:</strong> React.js, Node.js, Express.js, REST APIs, MongoDB, MySQL, Socket.io, Tailwind CSS, Vite</div>
              <div><strong className="text-white">Core CS & Security:</strong> Data Structures & Algorithms, OOPS, DBMS, Operating Systems, Information Security, TCP/IP, Security Protocols</div>
              <div><strong className="text-white">Tools & Platforms:</strong> Git, GitHub, VS Code, Postman, Vercel, Render, Generative AI Tools</div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1">
              EXPERIENCE
            </h2>
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="space-y-1.5 text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">{exp.company} — <span className="font-normal text-cyan-300">{exp.role}</span></span>
                  <span className="text-xs font-mono text-slate-400">{exp.period}</span>
                </div>
                <ul className="space-y-1 pl-4 list-disc text-xs text-slate-300">
                  {exp.description.map((d, dIdx) => (
                    <li key={dIdx}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1">
              KEY PROJECTS
            </h2>
            {PROJECTS.map((proj, idx) => (
              <div key={idx} className="space-y-1 text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">{proj.title} <span className="text-xs font-normal text-slate-400">({proj.role})</span></span>
                  <span className="text-xs font-mono text-cyan-300">{proj.period}</span>
                </div>
                {proj.liveUrl && (
                  <div className="text-[11px] font-mono text-cyan-400">
                    Live Demo: <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="underline">{proj.liveUrl}</a>
                  </div>
                )}
                <ul className="space-y-1 pl-4 list-disc text-xs text-slate-300">
                  {proj.highlights.map((h, hIdx) => (
                    <li key={hIdx}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1">
              CERTIFICATIONS & LEADERSHIP
            </h2>
            <ul className="space-y-1.5 pl-4 list-disc text-xs text-slate-300">
              <li><strong className="text-white">Infosys Technical Certification:</strong> Verified competencies in HTML, CSS, and structured Python 3 application development.</li>
              <li><strong className="text-white">AI Tools Specialist (be10x):</strong> Professional validation in deploying modern AI workflows to accelerate full-stack engineering cycles.</li>
              <li><strong className="text-white">Event Coordinator — PSIT Vyomnauts:</strong> Organized technical hackathons and tech exhibitions, directing cross-functional task distribution.</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
