import React, { useState, useRef } from 'react';
import { NetworkTreeNode } from '../../types';
import { getLevelColor, formatDate, formatPoints } from '../../utils/formatters';
import { ZoomIn, ZoomOut, RotateCcw, ChevronDown, ChevronRight, User as UserIcon, Shield, Search, Sparkles } from 'lucide-react';

interface NetworkTreeProps {
  data: NetworkTreeNode | null;
  onSelectNode?: (node: NetworkTreeNode) => void;
}

export const NetworkTree: React.FC<NetworkTreeProps> = ({ data, onSelectNode }) => {
  const [zoom, setZoom] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [collapsedNodes, setCollapsedNodes] = useState<Record<string, boolean>>({});
  const [selectedNode, setSelectedNode] = useState<NetworkTreeNode | null>(null);

  const toggleCollapse = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCollapsedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.15, 1.8));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.15, 0.5));
  const handleResetZoom = () => setZoom(1);

  const matchesSearch = (node: NetworkTreeNode): boolean => {
    if (!searchQuery.trim()) return false;
    const query = searchQuery.toLowerCase();
    return (
      node.name.toLowerCase().includes(query) ||
      node.referralCode.toLowerCase().includes(query) ||
      node.email.toLowerCase().includes(query)
    );
  };

  const renderNode = (node: NetworkTreeNode, depth: number = 0) => {
    const isCollapsed = collapsedNodes[node.id];
    const hasChildren = node.children && node.children.length > 0;
    const levelStyle = getLevelColor(node.level);
    const isHighlighted = matchesSearch(node);

    return (
      <div key={node.id} className="flex flex-col items-center">
        {/* Node Card */}
        <div
          onClick={() => {
            setSelectedNode(node);
            if (onSelectNode) onSelectNode(node);
          }}
          className={`relative group cursor-pointer transition-all duration-300 p-4 rounded-2xl border backdrop-blur-md bg-dark-card/90 min-w-[240px] max-w-[260px] text-left hover:scale-105 ${
            isHighlighted
              ? 'ring-2 ring-brand-400 border-brand-400 bg-brand-950/40 shadow-[0_0_25px_rgba(59,130,246,0.4)]'
              : `hover:border-slate-500 ${levelStyle.border}`
          }`}
        >
          {/* Level Pill */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span
              className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full uppercase border ${levelStyle.bg} ${levelStyle.text} ${levelStyle.border}`}
            >
              LEVEL {node.level} • {node.levelName}
            </span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] text-slate-400">Active</span>
            </div>
          </div>

          {/* User Details */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-brand-500/20 shrink-0">
              {node.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-sm font-semibold text-white truncate group-hover:text-brand-300 transition-colors">
                {node.name}
              </h4>
              <p className="text-xs text-brand-400 font-mono font-medium truncate">{node.referralCode}</p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-dark-border text-[11px]">
            <div>
              <span className="text-slate-400 block text-[10px]">TRI Points</span>
              <span className="font-semibold text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                {formatPoints(node.points)}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Team Size</span>
              <span className="font-semibold text-slate-200">
                {node.directReferrals} direct ({node.teamSize} total)
              </span>
            </div>
          </div>

          {/* Expand/Collapse Button */}
          {hasChildren && (
            <button
              onClick={(e) => toggleCollapse(node.id, e)}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-800 border border-slate-600 hover:border-brand-400 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-md z-10"
            >
              {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        {/* Downline Children Connections */}
        {hasChildren && !isCollapsed && (
          <div className="relative pt-8 flex flex-col items-center">
            {/* Vertical stem from parent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-brand-500/50 to-slate-700"></div>

            <div className="flex gap-8 items-start relative">
              {/* Horizontal crossbar if multiple children */}
              {node.children!.length > 1 && (
                <div
                  className="absolute top-0 h-0.5 bg-slate-700"
                  style={{
                    left: `calc(50% / ${node.children!.length})`,
                    right: `calc(50% / ${node.children!.length})`,
                  }}
                ></div>
              )}

              {node.children!.map((child) => (
                <div key={child.id} className="relative flex flex-col items-center">
                  {/* Vertical stem into child */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-700"></div>
                  {renderNode(child, depth + 1)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative w-full rounded-2xl bg-dark-bg border border-dark-border overflow-hidden flex flex-col min-h-[560px]">
      {/* Controls Bar */}
      <div className="p-4 border-b border-dark-border bg-dark-card/50 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 z-20">
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search member by name or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-dark-bg border border-dark-border rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 bg-dark-border rounded-lg"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomIn}
            className="p-2 bg-dark-card hover:bg-dark-cardHover border border-dark-border rounded-xl text-slate-300 hover:text-white transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 bg-dark-card hover:bg-dark-cardHover border border-dark-border rounded-xl text-slate-300 hover:text-white transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-2 bg-dark-card hover:bg-dark-cardHover border border-dark-border rounded-xl text-slate-300 hover:text-white transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-slate-400 ml-1">{Math.round(zoom * 100)}%</span>
        </div>
      </div>

      {/* Network Canvas */}
      <div className="flex-1 overflow-auto p-12 flex justify-center items-start min-h-[460px] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px]">
        {data ? (
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
              transition: 'transform 0.15s ease-out',
            }}
          >
            {renderNode(data)}
          </div>
        ) : (
          <div className="text-center py-24 text-slate-400">
            <UserIcon className="w-12 h-12 mx-auto mb-3 text-slate-600" />
            <p>No network connections to display yet.</p>
          </div>
        )}
      </div>

      {/* Node Preview Modal */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-dark-card border border-dark-border rounded-3xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                  {selectedNode.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedNode.name}</h3>
                  <p className="text-xs text-brand-400 font-mono">{selectedNode.referralCode}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-slate-400 hover:text-white p-2 rounded-xl bg-dark-bg border border-dark-border text-xs"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-dark-border">
                <span className="text-slate-400">Membership Level</span>
                <span className="font-semibold text-white">
                  Level {selectedNode.level} ({selectedNode.levelName})
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-dark-border">
                <span className="text-slate-400">TRI Points</span>
                <span className="font-semibold text-amber-400">{formatPoints(selectedNode.points)} pts</span>
              </div>
              <div className="flex justify-between py-2 border-b border-dark-border">
                <span className="text-slate-400">Direct Referrals</span>
                <span className="font-semibold text-white">{selectedNode.directReferrals} members</span>
              </div>
              <div className="flex justify-between py-2 border-b border-dark-border">
                <span className="text-slate-400">Total Team Reach</span>
                <span className="font-semibold text-white">{selectedNode.teamSize} members</span>
              </div>
              <div className="flex justify-between py-2 border-b border-dark-border">
                <span className="text-slate-400">Joined Platform</span>
                <span className="font-semibold text-slate-200">{formatDate(selectedNode.joinedAt)}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-dark-border flex justify-end">
              <button
                onClick={() => setSelectedNode(null)}
                className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold transition-all shadow-lg shadow-brand-500/25"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
