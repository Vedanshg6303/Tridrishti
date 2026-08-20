import React, { useState, useEffect } from 'react';
import { NetworkTree } from '../../components/network/NetworkTree';
import { NetworkTreeNode } from '../../types';
import api from '../../utils/api';
import { Users, Info, Shield } from 'lucide-react';

export const NetworkTreePage: React.FC = () => {
  const [treeData, setTreeData] = useState<NetworkTreeNode | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const res = await api.get('/network/tree?depth=4');
        if (res.data.success) {
          setTreeData(res.data.tree);
        }
      } catch (err) {
        console.error('Failed to load network tree:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTree();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">Interactive Community Tree</h2>
          <p className="text-xs text-slate-400">
            Explore downline relationships, member levels, qualifying activities, and team reach
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-card border border-dark-border text-xs text-slate-300">
          <Info className="w-3.5 h-3.5 text-brand-400" />
          <span>Zoom, Pan & Click any node for detailed profile</span>
        </div>
      </div>

      {/* Network Tree Visualizer Component */}
      {loading ? (
        <div className="w-full h-96 rounded-2xl bg-dark-card border border-dark-border flex items-center justify-center text-xs text-slate-400">
          Loading Community Tree Topology...
        </div>
      ) : (
        <NetworkTree data={treeData} />
      )}

      {/* Compliance Note */}
      <div className="p-4 rounded-2xl bg-dark-card/40 border border-dark-border text-center text-xs text-slate-400">
        Notice: The community tree maps verified referral attributions for platform activities. Tridrishti strictly disallows pyramid money circulation or commissions based purely on head-hunting recruitment.
      </div>
    </div>
  );
};
