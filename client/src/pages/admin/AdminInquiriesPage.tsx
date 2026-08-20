import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, Clock, CheckCircle2, User, Search, RefreshCw } from 'lucide-react';
import { formatDateTime } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';
import api from '../../utils/api';

export const AdminInquiriesPage: React.FC = () => {
  const { showToast } = useToast();
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await api.get('/support/contact-messages');
      if (res.data.success) {
        setMessages(res.data.messages || []);
        if (res.data.messages?.length > 0 && !selectedMessage) {
          setSelectedMessage(res.data.messages[0]);
        }
      }
    } catch (err) {
      console.error('Failed to load contact messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const res = await api.put(`/support/contact-messages/${id}`, { status });
      if (res.data.success) {
        showToast(`Message marked as ${status}`, 'success');
        fetchMessages();
        if (selectedMessage?._id === id) {
          setSelectedMessage({ ...selectedMessage, status });
        }
      }
    } catch (err: any) {
      showToast('Failed to update status', 'error');
    }
  };

  const filtered = messages.filter(
    (m) =>
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase()) ||
      m.subject?.toLowerCase().includes(search.toLowerCase()) ||
      m.message?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">Contact & Public Inquiries Inbox</h2>
          <p className="text-xs text-slate-400">
            Incoming messages received through the public Contact page form
          </p>
        </div>
        <button
          onClick={fetchMessages}
          className="p-2.5 rounded-xl bg-dark-card border border-dark-border text-slate-300 hover:text-white flex items-center gap-2 text-xs font-semibold"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Messages List Column */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search inquiries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-dark-card border border-dark-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filtered.length > 0 ? (
              filtered.map((msg) => {
                const isSelected = selectedMessage?._id === msg._id;
                return (
                  <div
                    key={msg._id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-dark-card border-brand-500 ring-1 ring-brand-500/50 shadow-lg'
                        : 'bg-dark-card/60 border-dark-border hover:border-slate-600'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-white text-xs truncate max-w-[180px]">{msg.name}</span>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          msg.status === 'REPLIED'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {msg.status || 'UNREAD'}
                      </span>
                    </div>
                    <h4 className="text-xs text-slate-300 font-medium line-clamp-1">{msg.subject}</h4>
                    <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2 font-mono">
                      <span>{msg.email}</span>
                      <span>{formatDateTime(msg.createdAt)}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs text-slate-500 rounded-2xl bg-dark-card border border-dark-border">
                No inquiries found matching criteria.
              </div>
            )}
          </div>
        </div>

        {/* Selected Message Detailed View */}
        <div className="lg:col-span-7">
          {selectedMessage ? (
            <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-border pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedMessage.subject}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <span className="font-semibold text-white">{selectedMessage.name}</span>
                    <span>•</span>
                    <a href={`mailto:${selectedMessage.email}`} className="text-brand-400 hover:underline font-mono">
                      {selectedMessage.email}
                    </a>
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  {formatDateTime(selectedMessage.createdAt)}
                </div>
              </div>

              {/* Message Body */}
              <div className="p-5 rounded-2xl bg-dark-bg border border-dark-border text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                  className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-600/25 transition-all flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Reply via Email</span>
                </a>

                <button
                  onClick={() =>
                    handleUpdateStatus(
                      selectedMessage._id,
                      selectedMessage.status === 'REPLIED' ? 'UNREAD' : 'REPLIED'
                    )
                  }
                  className="px-4 py-2.5 rounded-xl bg-dark-bg hover:bg-dark-border border border-dark-border text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>
                    {selectedMessage.status === 'REPLIED' ? 'Mark as Unread' : 'Mark as Replied'}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-500 rounded-3xl bg-dark-card border border-dark-border">
              Select an inquiry on the left to read full details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
