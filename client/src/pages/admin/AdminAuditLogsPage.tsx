import React, { useState, useEffect } from 'react';
import { AuditLog } from '../../types';
import { formatDateTime } from '../../utils/formatters';
import { FileText, Shield, User, Filter, Search } from 'lucide-react';
import api from '../../utils/api';

export const AdminAuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get('/admin/audit-logs');
        if (res.data.success) {
          setLogs(res.data.logs || []);
        }
      } catch (err) {
        console.error('Failed to load audit logs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-white">Immutable System Audit Trail</h2>
        <p className="text-xs text-slate-400">
          Cryptographically recorded log of all administrative actions, rule revisions, and points modifications
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-dark-border text-slate-400 uppercase text-[10px] font-semibold">
                <th className="pb-3">Timestamp</th>
                <th className="pb-3">Action Type</th>
                <th className="pb-3">Performed By</th>
                <th className="pb-3">Target Resource</th>
                <th className="pb-3">Audit Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border/60">
              {logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log._id} className="hover:bg-dark-bg/50 transition-colors">
                    <td className="py-3.5 text-slate-400 font-mono">{formatDateTime(log.timestamp)}</td>
                    <td className="py-3.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px] font-bold font-mono">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <div className="font-semibold text-white">{log.performedByName}</div>
                      <div className="text-[10px] text-slate-500">{log.performedByRole}</div>
                    </td>
                    <td className="py-3.5 font-mono text-slate-300 font-medium">{log.targetResource}</td>
                    <td className="py-3.5 text-slate-300">{log.details}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    No audit records logged yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
