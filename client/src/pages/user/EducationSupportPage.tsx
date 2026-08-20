import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { GraduationCap, Upload, FileText, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatters';
import api from '../../utils/api';

export const EducationSupportPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [applications, setApplications] = useState<any[]>([]);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const [studentName, setStudentName] = useState('');
  const [relation, setRelation] = useState('Self');
  const [institution, setInstitution] = useState('');
  const [courseName, setCourseName] = useState('');
  const [annualFee, setAnnualFee] = useState('');
  const [requestedGrantAmount, setRequestedGrantAmount] = useState('');
  const [academicPerformance, setAcademicPerformance] = useState('');
  const [financialBackgroundNote, setFinancialBackgroundNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await api.get('/education/my-applications');
        if (res.data.success) {
          setApplications(res.data.applications || []);
        }
      } catch (err) {
        console.error('Failed to load education applications:', err);
      }
    };
    fetchApps();
  }, []);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !institution || !requestedGrantAmount) {
      showToast('Please fill out all mandatory application fields', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post('/education/apply', {
        studentName,
        relation,
        institution,
        courseName,
        annualFee: +annualFee,
        requestedGrantAmount: +requestedGrantAmount,
        academicPerformance,
        financialBackgroundNote,
      });

      if (res.data.success) {
        showToast('Education support grant application submitted successfully!', 'success');
        setApplications([res.data.application, ...applications]);
        setShowApplyModal(false);
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Application submission failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">Education Support Grant Fund</h2>
          <p className="text-xs text-slate-400">
            Merit & need-based higher education tuition grant applications for members and dependents
          </p>
        </div>
        <button
          onClick={() => setShowApplyModal(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2"
        >
          <GraduationCap className="w-4 h-4" />
          <span>Apply for Education Grant</span>
        </button>
      </div>

      {/* Applications List */}
      <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4">
        <h3 className="text-base font-bold text-white">My Grant Applications</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-dark-border text-slate-400 uppercase text-[10px] font-semibold">
                <th className="pb-3">Application ID</th>
                <th className="pb-3">Student Name</th>
                <th className="pb-3">Institution & Course</th>
                <th className="pb-3">Requested Grant</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border/60">
              {applications.length > 0 ? (
                applications.map((app) => (
                  <tr key={app._id} className="hover:bg-dark-bg/50 transition-colors">
                    <td className="py-3.5 font-mono text-brand-400 font-bold">{app.applicationId}</td>
                    <td className="py-3.5 font-semibold text-white">
                      {app.studentName} ({app.relation})
                    </td>
                    <td className="py-3.5 text-slate-300">
                      <div>{app.courseName}</div>
                      <div className="text-[10px] text-slate-500">{app.institution}</div>
                    </td>
                    <td className="py-3.5 font-bold font-mono text-white">
                      {formatCurrency(app.requestedGrantAmount)}
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full ${
                          app.status === 'APPROVED' || app.status === 'DISBURSED'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : app.status === 'REJECTED'
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-400">{formatDate(app.createdAt)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No education grant applications submitted yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grant Application Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-dark-card border border-dark-border rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-dark-border pb-3">
              <h3 className="text-base font-bold text-white">Apply for Education Grant</h3>
              <button onClick={() => setShowApplyModal(false)} className="text-slate-400 hover:text-white text-xs">
                Cancel
              </button>
            </div>

            <form onSubmit={handleApply} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Student Name</label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Relation</label>
                  <select
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white"
                  >
                    <option value="Self">Self</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Ward">Ward</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">College / School / Institution</label>
                <input
                  type="text"
                  required
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="e.g. Delhi Technological University"
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Course / Degree</label>
                  <input
                    type="text"
                    required
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    placeholder="B.Tech / B.Sc / Class 12"
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Requested Grant (₹)</label>
                  <input
                    type="number"
                    required
                    value={requestedGrantAmount}
                    onChange={(e) => setRequestedGrantAmount(e.target.value)}
                    placeholder="25000"
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Academic Background & Marks</label>
                <input
                  type="text"
                  value={academicPerformance}
                  onChange={(e) => setAcademicPerformance(e.target.value)}
                  placeholder="e.g. 88% in previous academic year"
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all mt-2"
              >
                {submitting ? 'Submitting Application...' : 'Submit Grant Application'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
