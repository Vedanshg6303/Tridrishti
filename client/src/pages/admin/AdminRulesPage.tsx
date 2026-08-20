import React, { useState, useEffect } from 'react';
import { useToast } from '../../context/ToastContext';
import { RuleConfig } from '../../types';
import { Sliders, Save, ShieldCheck, CheckCircle2, RotateCcw } from 'lucide-react';
import api from '../../utils/api';

export const AdminRulesPage: React.FC = () => {
  const { showToast } = useToast();
  const [rules, setRules] = useState<RuleConfig[]>([]);
  const [editingValues, setEditingValues] = useState<Record<string, any>>({});
  const [savingKey, setSavingKey] = useState<string | null>(null);

  const fetchRules = async () => {
    try {
      const res = await api.get('/admin/rules');
      if (res.data.success) {
        setRules(res.data.rules || []);
        const initValues: Record<string, any> = {};
        (res.data.rules || []).forEach((r: RuleConfig) => {
          initValues[r.key] = r.value;
        });
        setEditingValues(initValues);
      }
    } catch (err) {
      console.error('Failed to load rules:', err);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const handleUpdateRule = async (rule: RuleConfig) => {
    setSavingKey(rule.key);
    try {
      const res = await api.put(`/admin/rules/${rule.key}`, {
        value: editingValues[rule.key],
      });
      if (res.data.success) {
        showToast(`Rule ${rule.name} updated and written to audit log!`, 'success');
        fetchRules();
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Failed to update rule', 'error');
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-white">Dynamic Reward & Level Rules Engine</h2>
        <p className="text-xs text-slate-400">
          Configure point ratios, tier thresholds, anti-fraud parameters, and compliance flags without code changes
        </p>
      </div>

      <div className="space-y-4">
        {rules.map((rule) => (
          <div
            key={rule._id || rule.key}
            className="p-6 rounded-3xl bg-dark-card border border-dark-border flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-slate-600 transition-all"
          >
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  {rule.category}
                </span>
                <span className="text-xs font-mono text-slate-400">{rule.key}</span>
              </div>
              <h3 className="text-base font-bold text-white">{rule.name}</h3>
              <p className="text-xs text-slate-400">{rule.description}</p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="w-full md:w-48">
                {rule.dataType === 'boolean' ? (
                  <select
                    value={editingValues[rule.key]?.toString()}
                    onChange={(e) =>
                      setEditingValues({ ...editingValues, [rule.key]: e.target.value === 'true' })
                    }
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white"
                  >
                    <option value="true">Enabled</option>
                    <option value="false">Disabled</option>
                  </select>
                ) : (
                  <input
                    type={rule.dataType === 'number' ? 'number' : 'text'}
                    value={editingValues[rule.key] ?? ''}
                    onChange={(e) =>
                      setEditingValues({
                        ...editingValues,
                        [rule.key]: rule.dataType === 'number' ? +e.target.value : e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white font-mono"
                  />
                )}
              </div>

              <button
                type="button"
                disabled={savingKey === rule.key}
                onClick={() => handleUpdateRule(rule)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-md shadow-purple-600/30 transition-all shrink-0 flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{savingKey === rule.key ? 'Saving...' : 'Save Rule'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
