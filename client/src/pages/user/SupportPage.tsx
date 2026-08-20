import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { LifeBuoy, Plus, MessageSquare, Send, CheckCircle2, Clock } from 'lucide-react';
import { formatDate, formatDateTime } from '../../utils/formatters';
import api from '../../utils/api';

export const SupportPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [tickets, setTickets] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showNewModal, setShowNewModal] = useState(false);

  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Payment Issue');
  const [message, setMessage] = useState('');
  const [replyText, setReplyText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await api.get('/support/my-tickets');
        if (res.data.success) {
          setTickets(res.data.tickets || []);
          if (res.data.tickets && res.data.tickets.length > 0) {
            setSelectedTicket(res.data.tickets[0]);
          }
        }
      } catch (err) {
        console.error('Failed to load tickets:', err);
      }
    };
    fetchTickets();
  }, []);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;

    setSubmitting(true);
    try {
      const res = await api.post('/support/tickets', {
        subject,
        category,
        message,
        priority: 'MEDIUM',
      });
      if (res.data.success) {
        showToast('Support ticket created successfully!', 'success');
        setTickets([res.data.ticket, ...tickets]);
        setSelectedTicket(res.data.ticket);
        setShowNewModal(false);
        setSubject('');
        setMessage('');
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Failed to create ticket', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText || !selectedTicket) return;

    try {
      const res = await api.post(`/support/tickets/${selectedTicket.ticketId}/messages`, {
        message: replyText,
      });
      if (res.data.success) {
        setSelectedTicket(res.data.ticket);
        setReplyText('');
        showToast('Reply sent', 'success');
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Failed to send reply', 'error');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">Support & Grievance Desk</h2>
          <p className="text-xs text-slate-400">
            Submit inquiries, payment questions, or reward assistance requests to our operations team
          </p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg shadow-brand-600/25 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Support Ticket</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Ticket List */}
        <div className="lg:col-span-5 space-y-3">
          {tickets.length > 0 ? (
            tickets.map((t) => (
              <div
                key={t._id}
                onClick={() => setSelectedTicket(t)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedTicket?.ticketId === t.ticketId
                    ? 'bg-dark-card border-brand-500 ring-1 ring-brand-500/50'
                    : 'bg-dark-card/50 border-dark-border hover:border-slate-600'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-mono text-brand-400 font-bold">{t.ticketId}</span>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      t.status === 'RESOLVED' || t.status === 'CLOSED'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {t.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white line-clamp-1">{t.subject}</h4>
                <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2">
                  <span>{t.category}</span>
                  <span>{formatDate(t.updatedAt)}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-slate-500 rounded-2xl bg-dark-card border border-dark-border">
              No tickets created yet.
            </div>
          )}
        </div>

        {/* Selected Ticket Conversation */}
        <div className="lg:col-span-7">
          {selectedTicket ? (
            <div className="p-6 rounded-3xl bg-dark-card border border-dark-border flex flex-col justify-between min-h-[460px] space-y-4">
              <div className="space-y-4">
                <div className="border-b border-dark-border pb-3">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="font-mono text-brand-400">{selectedTicket.ticketId}</span>
                    <span>Category: {selectedTicket.category}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">{selectedTicket.subject}</h3>
                </div>

                {/* Message Thread */}
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {selectedTicket.messages.map((m: any, idx: number) => {
                    const isUser = m.senderRole === 'USER';
                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-2xl text-xs space-y-1 ${
                          isUser
                            ? 'bg-brand-600/15 border border-brand-500/30 text-slate-200 ml-6'
                            : 'bg-purple-600/15 border border-purple-500/30 text-slate-200 mr-6'
                        }`}
                      >
                        <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                          <span>{m.senderName} ({m.senderRole})</span>
                          <span>{formatDateTime(m.createdAt)}</span>
                        </div>
                        <p className="leading-relaxed">{m.message}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reply Input */}
              <form onSubmit={handleSendReply} className="pt-3 border-t border-dark-border flex gap-2">
                <input
                  type="text"
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply to the support desk..."
                  className="flex-1 px-3.5 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-600/25"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-500 rounded-3xl bg-dark-card border border-dark-border">
              Select a ticket to view conversation history.
            </div>
          )}
        </div>
      </div>

      {/* New Ticket Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-dark-card border border-dark-border rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-dark-border pb-3">
              <h3 className="text-base font-bold text-white">Create Support Ticket</h3>
              <button onClick={() => setShowNewModal(false)} className="text-slate-400 hover:text-white text-xs">
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Issue Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white"
                >
                  <option value="Payment Issue">Payment Issue</option>
                  <option value="Reward Issue">Reward Issue</option>
                  <option value="Points Issue">Points Issue</option>
                  <option value="Account Issue">Account Issue</option>
                  <option value="Benefit Issue">Benefit Issue</option>
                  <option value="Order Issue">Order Issue</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Summary of your inquiry..."
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Detailed Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your issue with order ID or context..."
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-xl text-xs text-white"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-600/30 transition-all"
              >
                {submitting ? 'Submitting Ticket...' : 'Open Ticket'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
