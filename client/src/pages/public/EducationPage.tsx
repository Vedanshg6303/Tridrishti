import React from 'react';
import { GraduationCap, CheckCircle2, FileText, ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EducationPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Empowerment Through Learning</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">Education Support Fund</h1>
        <p className="text-base text-slate-300">
          Providing merit and need-based education grant disbursements for eligible members and their children enrolled in school, college, or technical courses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold flex items-center justify-center">
            1
          </div>
          <h3 className="text-lg font-bold text-white">Submit Online Application</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Fill in student details, institution name, course, and fee breakdown directly from your member dashboard.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold flex items-center justify-center">
            2
          </div>
          <h3 className="text-lg font-bold text-white">Committee Verification</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Our education committee verifies marksheets, admission receipts, and background notes against platform policy rules.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center">
            3
          </div>
          <h3 className="text-lg font-bold text-white">Direct Grant Disbursement</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Approved grants are credited directly towards the academic fee account or student bank record with a logged audit receipt.
          </p>
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/register"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-xl shadow-brand-600/30"
        >
          <span>Apply via Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
